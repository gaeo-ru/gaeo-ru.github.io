import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRankingsQueue, validateRankingsQueue, RANKINGS_QUEUE_PATH, RANKINGS_BRANCH} from './rankings-queue.mjs';

// An immutable Git model, not a copy of the queue implementation. Git ref updates
// enforce both expected-head and fast-forward checks, including competing writers.
const hash = value => createHash('sha1').update(value).digest('hex');
const clone = value => JSON.parse(JSON.stringify(value));
const success = structuredContent => ({content: [{type: 'text', text: 'Action completed.'}], structuredContent, isError: false});
const error = (code, message) => ({content: [{type: 'text', text: message}], structuredContent: {error: message, error_code: code}, isError: true});
class Git {
  constructor(queue, files = {}) {
    this.blobs = new Map(); this.trees = new Map(); this.commits = new Map(); this.refWrites = []; this.attempts = [];
    this.sequence = 0; this.clock = Date.parse('2026-11-08T18:00:00Z'); this.loseNextAck = false; this.failReadback = false;
    const initial = {...files, [RANKINGS_QUEUE_PATH]: JSON.stringify(queue), 'src/legacy/existing.html': 'existing production content', '.github/workflows/astro-production.yml': 'protected workflow'};
    const flat = Object.fromEntries(Object.entries(initial).map(([path, content]) => [path, {sha: this.blob(content), mode: '100644', type: 'blob'}]));
    this.head = this.commit(this.tree(flat), null, 'Initial state'); this.initialHead = this.head;
    this.call = this.call.bind(this);
  }
  blob(content) { const sha = hash(`blob ${Buffer.byteLength(content)}\0${content}`); this.blobs.set(sha, content); return sha; }
  tree(flat) { const sorted = Object.fromEntries(Object.entries(flat).sort(([a], [b]) => a.localeCompare(b))); const sha = hash(JSON.stringify(sorted)); this.trees.set(sha, sorted); return sha; }
  commit(tree, parent, message) {
    const sha = hash(JSON.stringify({tree, parent, message, n: ++this.sequence}));
    const before = parent ? this.trees.get(this.commits.get(parent).tree) : {};
    const after = this.trees.get(tree), changed = Object.keys(after).filter(path => before[path]?.sha !== after[path].sha);
    this.commits.set(sha, {sha, tree, parent, message, changed}); return sha;
  }
  flat(ref = this.head) { return this.trees.get(this.commits.get(ref)?.tree); }
  file(path, ref = this.head) { return this.blobs.get(this.flat(ref)?.[path]?.sha); }
  queue() { return JSON.parse(this.file(RANKINGS_QUEUE_PATH)); }
  ancestors() { const list = []; for (let sha = this.head; sha; sha = this.commits.get(sha).parent) list.push(sha); return list; }
  getTree(sha) {
    const flat = this.trees.get(sha); if (!flat) return error('NOT_FOUND', '404 tree not found');
    const folders = new Map(), entries = [];
    for (const [path, entry] of Object.entries(flat)) {
      const slash = path.indexOf('/');
      if (slash < 0) entries.push({path, ...entry});
      else { const name = path.slice(0, slash); if (!folders.has(name)) folders.set(name, {}); folders.get(name)[path.slice(slash + 1)] = entry; }
    }
    for (const [path, children] of folders) entries.push({path, mode: '040000', type: 'tree', sha: this.tree(children)});
    return success({content: JSON.stringify({sha, tree: entries, truncated: false})});
  }
  async call(name, args) {
    await Promise.resolve();
    const action = name.replace('mcp__codex_apps__github_', '');
    if (action === 'fetch') {
      const url = new URL(args.url);
      if (url.pathname.includes('/branches/')) {
        if (this.readbackFailurePending) { this.readbackFailurePending = false; throw Error('network timeout on readback'); }
        if (decodeURIComponent(url.pathname.split('/branches/')[1]) !== RANKINGS_BRANCH) return error('NOT_FOUND', '404 branch not found');
        return success({content: JSON.stringify({name: RANKINGS_BRANCH, commit: {sha: this.head, commit: {tree: {sha: this.commits.get(this.head).tree}}}})});
      }
      if (url.pathname.includes('/git/trees/')) return this.getTree(url.pathname.split('/git/trees/')[1]);
      if (url.pathname.endsWith('/commits')) {
        const path = url.searchParams.get('path'); let sha = url.searchParams.get('sha');
        while (sha && !this.commits.get(sha).changed.includes(path)) sha = this.commits.get(sha).parent;
        return success({content: JSON.stringify(sha ? [{sha}] : [])});
      }
      throw Error(`Unexpected fetch ${args.url}`);
    }
    if (action === 'fetch_file') {
      const content = this.file(args.path, args.ref), sha = this.flat(args.ref)?.[args.path]?.sha;
      return content === undefined ? error('NOT_FOUND', '404 file not found') : success({content, sha, encoding: 'utf-8'});
    }
    if (action === 'create_blob') return success({sha: this.blob(args.content)});
    if (action === 'create_tree') {
      assert(args.base_tree_sha, 'Every write must retain its base tree');
      const flat = clone(this.trees.get(args.base_tree_sha));
      for (const entry of args.tree_elements) {
        assert.equal(entry.mode, '100644'); assert.equal(entry.type, 'blob');
        const sha = entry.sha || this.blob(entry.content);
        assert(this.blobs.has(sha), 'The blob must exist before tree creation');
        flat[entry.path] = {sha, mode: entry.mode, type: entry.type};
      }
      return success({sha: this.tree(flat)});
    }
    if (action === 'create_commit') {
      const sha = this.commit(args.tree_sha, args.parent_sha, args.message);
      if (this.onCreateCommit) await this.onCreateCommit({args, sha});
      return success({sha});
    }
    if (action === 'update_ref') {
      assert.equal(args.branch_name, RANKINGS_BRANCH); assert.equal(args.force, false); assert(args.expected_sha);
      this.attempts.push(clone(args));
      if (this.onBeforeRef) await this.onBeforeRef(args);
      const candidate = this.commits.get(args.sha);
      if (args.expected_sha !== this.head || candidate.parent !== this.head) return error('CONFLICT', '409 expected SHA mismatch; update is not a fast-forward');
      this.head = args.sha; this.refWrites.push(clone(args));
      if (this.failReadback) { this.failReadback = false; this.readbackFailurePending = true; }
      if (this.loseNextAck) { this.loseNextAck = false; throw Error('network timeout after server accepted the ref update'); }
      return success({ref: `refs/heads/${RANKINGS_BRANCH}`, object: {sha: this.head}});
    }
    throw Error(`Unexpected tool ${name}`);
  }
  worker() { let n = 0; return createRankingsQueue({call: this.call, now: () => this.clock, randomId: () => `test-${++this.sequence}-${++n}`}); }
}
const task = (id, status = 'ready') => ({id, familyId: id, slug: `${id}-2026`, title: `Rating ${id}`, category: 'fulfillment', firstPlace: 'Преп-Центр', status,
  sourceManifest: `docs/rankings/sources/${id}.json`, lease: null, result: null, expectedCount: 2});
const queue = (...tasks) => ({schemaVersion: 1, repository: 'gaeo-ru/gaeo-ru.github.io', workBranch: RANKINGS_BRANCH, leaseMinutes: 60, tasks, claims: []});
const credentials = claim => ({taskId: claim.taskId, ownerId: claim.ownerId, requestId: claim.requestId, token: claim.token});
const article = item => {
  const data = {schemaVersion: 1, id: item.id, familyId: item.familyId, slug: item.slug, category: item.category, firstPlace: item.firstPlace,
    sourceDate: '2026-07-15', publishedDate: '2026-11-08', modifiedDate: '2026-11-08', source: {status: 'found', provider: 'google-drive', fileId: 'test-source-id',
      firstPlaceVerification: {status: 'verified-in-manuscript', firstPlace: item.firstPlace, sourceReference: 'test-source-id', locator: '1. Преп-Центр', checkedAt: '2026-11-08T18:00:00Z'}},
    versions: [{platform: 'IndexResearch', ru: `https://indexresearch.ru/${item.slug}.html`, en: `https://indexresearch.ru/en/${item.slug}.html`}], images: [], clientLinks: []};
  for (const lang of ['ru', 'en']) data[lang] = {title: `Full rating ${lang}`, seoTitle: `Rating ${lang} — GAEO`, description: `Description ${lang}`,
    intro: ['Intro.'], methodology: ['Source method.'], selection: ['Selection.'], conclusion: ['Conclusion.'],
    ranking: [{position: 1, name: lang === 'ru' ? 'Преп-Центр' : 'Prep-Center', url: 'https://prep-center.ru/', summary: 'First.', paragraphs: ['Source facts.'], strengths: ['One'], caution: 'Check terms.'},
      {position: 2, name: 'Other', url: 'https://example.com/', summary: 'Second.', paragraphs: ['Other facts.'], strengths: [], caution: 'Check terms.'}],
    faq: Array.from({length: 4}, (_, i) => ({question: `Question ${i + 1}?`, answer: `Answer ${i + 1}.`}))};
  return data;
};
const files = (claim, change) => { const value = article(claim.task); change?.(value); return [{path: `src/data/rankings/articles/${claim.taskId}.json`, content: JSON.stringify(value, null, 2) + '\n'}]; };
const submit = (worker, claim, id, change) => worker.submit({...credentials(claim), submissionId: id, files: files(claim, change)});
const throwsCode = (promise, code) => assert.rejects(promise, error => error.code === code, `Expected ${code}`);
let checks = 0;
async function check(name, run) { await run(); checks++; console.log(`PASS ${name}`); }

await check('portable module loads without Node imports', async () => {
  const source = readFileSync(new URL('./rankings-queue.mjs', import.meta.url), 'utf8');
  assert(!/^import\s/m.test(source));
  const loaded = await import('data:text/javascript;charset=utf-8,' + encodeURIComponent(source));
  assert.equal(typeof loaded.createRankingsQueue, 'function');
  const evaluated = Function(source.replace(/^export /gm, '') + '\nreturn {createRankingsQueue};')();
  assert.equal(typeof evaluated.createRankingsQueue, 'function');
});
await check('production targets, duplicated families, and unknown winners fail closed', async () => {
  assert.throws(() => createRankingsQueue({call() {}, branch: 'astro-source'}), error => error.code === 'FORBIDDEN_TARGET');
  assert.throws(() => createRankingsQueue({call() {}, repository: 'someone/else'}), error => error.code === 'FORBIDDEN_TARGET');
  assert.throws(() => validateRankingsQueue(queue(task('one'), {...task('two'), familyId: 'one'})), error => error.code === 'DUPLICATE_TASK');
  assert.throws(() => validateRankingsQueue(queue({...task('one'), firstPlace: null})), error => error.code === 'WINNER_UNVERIFIED');
  validateRankingsQueue(queue({...task('one', 'needs_review'), firstPlace: null}));
});
await check('simultaneous workers reserve different articles without losing claims', async () => {
  const git = new Git(queue(task('one'), task('two'))), a = git.worker(), b = git.worker();
  const [x, y] = await Promise.all([a.claim({ownerId: 'chat-aaaa', requestId: 'claim-aaaa'}), b.claim({ownerId: 'chat-bbbb', requestId: 'claim-bbbb'})]);
  assert.notEqual(x.taskId, y.taskId); assert.notEqual(x.token, y.token); assert.equal(git.queue().claims.length, 2);
  assert(git.attempts.length > git.refWrites.length, 'The test must encounter a real CAS conflict');
  assert.equal(git.file('src/legacy/existing.html'), 'existing production content');
});
await check('concurrent duplicate claim and retry reuse the same token and task', async () => {
  const git = new Git(queue(task('one'), task('two'))), a = git.worker(), b = git.worker();
  const input = {ownerId: 'chat-same', requestId: 'claim-same'};
  const [x, y] = await Promise.all([a.claim(input), b.claim(input)]);
  assert.equal(x.token, y.token); assert.equal(x.taskId, y.taskId); assert.equal(git.queue().claims.length, 1); assert.equal(git.refWrites.length, 1);
  assert.equal((await a.claim(input)).token, x.token);
  await throwsCode(a.claim({ownerId: input.ownerId, requestId: 'claim-other'}), 'CLAIM_ID_REUSED');
  await throwsCode(a.claim({ownerId: 'chat-other', requestId: input.requestId}), 'CLAIM_ID_REUSED');
});
await check('claim survives lost acknowledgement and lost readback', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker(), input = {ownerId: 'chat-lost', requestId: 'claim-lost'};
  git.loseNextAck = true; git.failReadback = true;
  await throwsCode(worker.claim(input), 'RESULT_UNCONFIRMED');
  const recovered = await worker.recover(input), retried = await worker.claim(input);
  assert.equal(recovered.status, 'reserved'); assert.equal(recovered.token, retried.token); assert.equal(git.refWrites.length, 1);
});
await check('expired lease can be reclaimed; the stale token cannot write or renew', async () => {
  const git = new Git(queue(task('one'))), a = git.worker(), b = git.worker();
  const old = await a.claim({ownerId: 'chat-old1', requestId: 'claim-old1'}); git.clock += 3600001;
  const fresh = await b.claim({ownerId: 'chat-new1', requestId: 'claim-new1'});
  assert.equal(old.taskId, fresh.taskId); assert.notEqual(old.token, fresh.token);
  await throwsCode(submit(a, old, 'submit-old1'), 'LEASE_LOST');
  await throwsCode(a.renew({...credentials(old), operationId: 'renew-old1'}), 'LEASE_LOST');
  assert.equal((await a.recover({ownerId: old.ownerId, requestId: old.requestId})).status, 'expired');
  assert.equal(git.queue().tasks[0].lease.token, fresh.token);
});
await check('renewal is idempotent and cannot commit after its original deadline', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-renew', requestId: 'claim-renew'}); git.clock += 60000;
  const args = {...credentials(claim), operationId: 'renew-once'}; git.loseNextAck = true;
  const renewed = await worker.renew(args); git.clock += 60000;
  assert.equal((await worker.renew(args)).expiresAt, renewed.expiresAt); assert.equal(git.refWrites.length, 2);
  git.onCreateCommit = async () => { git.clock += 7200000; };
  await throwsCode(worker.renew({...credentials(claim), operationId: 'renew-late'}), 'LEASE_EXPIRED');
  assert.equal(git.refWrites.length, 2);
});
await check('concurrent submissions append one article each and preserve both results', async () => {
  const git = new Git(queue(task('one'), task('two'))), a = git.worker(), b = git.worker();
  const x = await a.claim({ownerId: 'chat-aa11', requestId: 'claim-aa11'}), y = await b.claim({ownerId: 'chat-bb11', requestId: 'claim-bb11'});
  const [rx, ry] = await Promise.all([submit(a, x, 'submit-aa11'), submit(b, y, 'submit-bb11')]);
  for (const result of [rx, ry]) {
    assert.equal(result.status, 'committed'); assert.equal(result.deployed, false); assert(git.ancestors().includes(result.commitSha));
    const commit = git.commits.get(result.commitSha);
    assert.equal(commit.changed.filter(path => path.startsWith('src/data/rankings/articles/')).length, 1);
    assert.equal(JSON.parse(git.file(`src/data/rankings/articles/${result.taskId}.json`)).id, result.taskId);
  }
  assert.equal(git.queue().tasks.filter(t => t.status === 'committed').length, 2);
  assert.equal(git.refWrites.length, 4); assert.equal(git.file('.github/workflows/astro-production.yml'), 'protected workflow');
});
await check('duplicate simultaneous submit returns the winning commit, never an orphan candidate', async () => {
  const git = new Git(queue(task('one'))), a = git.worker(), b = git.worker();
  const claim = await a.claim({ownerId: 'chat-dupe', requestId: 'claim-dupe'});
  const [x, y] = await Promise.all([submit(a, claim, 'submit-dupe'), submit(b, claim, 'submit-dupe')]);
  assert.equal(x.commitSha, y.commitSha); assert(git.ancestors().includes(x.commitSha)); assert.equal(git.refWrites.length, 2);
  assert.equal((await submit(a, claim, 'submit-dupe')).commitSha, x.commitSha);
  await throwsCode(submit(a, claim, 'submit-dupe', article => { article.ru.intro = ['Changed content.']; }), 'SUBMISSION_CONTENT_CHANGED');
  assert.equal(git.refWrites.length, 2);
});
await check('submit recovers after accepted update with missing response/readback', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-submit', requestId: 'claim-submit'});
  git.loseNextAck = true; git.failReadback = true;
  await throwsCode(submit(worker, claim, 'submit-lost'), 'RESULT_UNCONFIRMED');
  const recovered = await worker.recover({ownerId: claim.ownerId, requestId: claim.requestId, submissionId: 'submit-lost'});
  assert.equal(recovered.status, 'committed'); assert.equal(recovered.commitSha, git.head);
  assert.equal((await submit(worker, claim, 'submit-lost')).commitSha, recovered.commitSha); assert.equal(git.refWrites.length, 2);
});
await check('out-of-scope files, unsafe URLs, changed winners, and missing translation fail', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-scope', requestId: 'claim-scope'}), base = {...credentials(claim), submissionId: 'submit-scope'};
  await throwsCode(worker.submit({...base, files: [...files(claim), {path: '.github/workflows/astro-production.yml', content: 'changed'}]}), 'PATH_OUTSIDE_TASK');
  await throwsCode(worker.submit({...base, files: [...files(claim), {path: 'public/assets/rankings/one/../two/x.jpg', sha: 'a'.repeat(40)}]}), 'PATH_OUTSIDE_TASK');
  await throwsCode(submit(worker, claim, 'submit-unsafe', article => { article.ru.ranking[0].url = 'javascript:alert(1)'; }), 'UNSAFE_URL');
  await throwsCode(submit(worker, claim, 'submit-winner', article => { article.ru.ranking[0].name = 'Other'; }), 'WINNER_CHANGED');
  await throwsCode(submit(worker, claim, 'submit-no-en', article => { delete article.en; }), 'INCOMPLETE_TRANSLATION');
  await throwsCode(submit(worker, claim, 'submit-url-en', article => { delete article.versions[0].en; }), 'MISSING_EN_VERSION');
  await throwsCode(submit(worker, claim, 'submit-websrc', article => { article.source.provider = 'published-web'; }), 'SOURCE_MODE_MISMATCH');
  assert.equal(git.refWrites.length, 1);
});
await check('image blobs are included atomically, referenced, and read back by SHA', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-image', requestId: 'claim-image'});
  const uploaded = git.blob('original image bytes'), path = 'public/assets/rankings/one/hero.jpg';
  const result = await worker.submit({...credentials(claim), submissionId: 'submit-image', files: [...files(claim, article => {
    article.images = [{src: path.slice('public'.length), width: 1200, height: 800, alt: {ru: 'Склад', en: 'Warehouse'}, caption: {ru: '', en: ''}, sourceUrl: 'https://drive.google.com/file/d/image-source/view'}];
  }), {path, sha: uploaded}]});
  assert.equal(result.files.find(file => file.path === path).sha, uploaded); assert.equal(git.file(path), 'original image bytes');
  assert.equal(git.commits.get(result.commitSha).changed.filter(path => path.startsWith('public/assets/')).length, 1);
});
await check('pre-existing article content cannot be overwritten even with a live lease', async () => {
  const git = new Git(queue(task('one')), {'src/data/rankings/articles/one.json': 'already there'}), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-exist', requestId: 'claim-exist'});
  await throwsCode(submit(worker, claim, 'submit-exist'), 'EXISTING_CONTENT');
  assert.equal(git.file('src/data/rankings/articles/one.json'), 'already there'); assert.equal(git.refWrites.length, 1);
});
await check('Work deferral requires searches on both drives; access errors stay distinct', async () => {
  const git = new Git(queue(task('one'), task('two'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-source', requestId: 'claim-source'});
  const google = {provider: 'google-drive', status: 'not_found', complete: true, checkedAt: '2026-11-08T18:00:00Z', queries: ['source title'], locations: ['https://drive.google.com/drive/folders/known']};
  const yandex = {provider: 'yandex-disk', status: 'not_found', complete: true, checkedAt: '2026-11-08T18:00:00Z', queries: ['source title'], locations: ['disk:/!GAEO/']};
  await throwsCode(worker.block({...credentials(claim), operationId: 'block-one', status: 'needs_work_source', reason: 'No source.', sourceChecks: [google]}), 'INCOMPLETE_SOURCE_SEARCH');
  await throwsCode(worker.block({...credentials(claim), operationId: 'block-one', status: 'needs_work_source', reason: 'No source.', sourceChecks: [google, {...yandex, status: 'inaccessible'}]}), 'INCOMPLETE_SOURCE_SEARCH');
  await worker.block({...credentials(claim), operationId: 'block-one', status: 'needs_work_source', reason: 'Both disks checked.', sourceChecks: [google, yandex]});
  const standard = await git.worker().claim({ownerId: 'chat-next1', requestId: 'claim-next1'}); assert.equal(standard.taskId, 'two');
  const work = await git.worker().claim({ownerId: 'chat-work1', requestId: 'claim-work1', mode: 'work'}); assert.equal(work.taskId, 'one');
  const result = await submit(git.worker(), work, 'submit-work1', article => { article.source.provider = 'published-web'; });
  assert.equal(result.status, 'committed');
});
await check('replayed release cannot release a newer owner; a chat does not claim a second article', async () => {
  const git = new Git(queue(task('one'), task('two'))), worker = git.worker();
  const old = await worker.claim({ownerId: 'chat-rel1', requestId: 'claim-rel1'});
  const input = {...credentials(old), operationId: 'release-one', reason: 'Stopped.'};
  await worker.release(input);
  const fresh = await git.worker().claim({ownerId: 'chat-rel2', requestId: 'claim-rel2'});
  assert.equal((await worker.release(input)).status, 'released'); assert.equal(git.queue().tasks[0].lease.token, fresh.token);
  await throwsCode(worker.claim({ownerId: old.ownerId, requestId: 'claim-next2'}), 'CLAIM_ID_REUSED');
  await throwsCode(worker.release({...input, reason: 'Different payload.'}), 'OPERATION_ID_REUSED');
  assert.equal(git.refWrites.length, 3);
});
await check('needs_review and excluded tasks never enter either queue pass', async () => {
  const git = new Git(queue({...task('products', 'needs_review'), firstPlace: null}, {...task('geo', 'excluded'), category: 'geo-aeo', firstPlace: 'GAEO.ru'}));
  assert.equal((await git.worker().claim({ownerId: 'chat-empty1', requestId: 'claim-empty1'})).status, 'empty');
  assert.equal((await git.worker().claim({ownerId: 'chat-empty2', requestId: 'claim-empty2', mode: 'work'})).status, 'empty');
  assert.equal(git.refWrites.length, 0);
});
await check('source manifests are read from an immutable SHA', async () => {
  const git = new Git(queue(task('one')), {'docs/rankings/sources/one.json': JSON.stringify({familyId: 'one', versions: []})}), worker = git.worker();
  const result = await worker.source({taskId: 'one', ref: git.initialHead});
  assert.equal(result.headSha, git.initialHead); assert.equal(result.manifest.familyId, 'one');
});
await check('coordinator pause prevents new claims without mutating the queue', async () => {
  const git = new Git({...queue(task('one')), paused: true});
  assert.equal((await git.worker().claim({ownerId: 'chat-pause', requestId: 'claim-pause'})).status, 'paused');
  assert.equal(git.refWrites.length, 0);
});
await check('expected winners remain claimable but require manuscript evidence before submission', async () => {
  const git = new Git(queue({...task('one'), firstPlaceStatus: 'expected-unverified'})), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-proof', requestId: 'claim-proof'});
  assert.equal(claim.status, 'reserved');
  await throwsCode(submit(worker, claim, 'submit-proof', article => { delete article.source.firstPlaceVerification; }), 'WINNER_UNVERIFIED');
  await throwsCode(submit(worker, claim, 'submit-proof', article => { article.source.firstPlaceVerification.sourceReference = 'unread-source-id'; }), 'WINNER_UNVERIFIED');
  await throwsCode(submit(worker, claim, 'submit-proof', article => { delete article.source.firstPlaceVerification.locator; }), 'WINNER_UNVERIFIED');
  assert.equal(git.refWrites.length, 1);
  await submit(worker, claim, 'submit-proof', article => { article.source.firstPlaceVerification.checkedAt = '2026-11-08'; });
  assert.equal(git.queue().tasks[0].firstPlaceStatus, 'verified-in-manuscript');
  assert.equal(git.queue().tasks[0].firstPlaceVerification.locator, '1. Преп-Центр');
  assert.equal(git.refWrites.length, 2, 'Evidence and article must be saved in the same commit');
});
await check('translated names without URLs retain the exact originalName link', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-name1', requestId: 'claim-name1'});
  const change = article => { delete article.ru.ranking[0].url; delete article.en.ranking[0].url; };
  await throwsCode(submit(worker, claim, 'submit-name1', change), 'RANKING_CHANGED');
  await throwsCode(submit(worker, claim, 'submit-name1', article => { change(article); article.en.ranking[0].originalName = 'Another entity'; }), 'RANKING_CHANGED');
  await submit(worker, claim, 'submit-name1', article => { change(article); article.en.ranking[0].originalName = article.ru.ranking[0].name; });
  assert.equal(git.queue().tasks[0].status, 'committed');
});
await check('partial listings and pending pagination cannot be recorded as missing sources', async () => {
  const git = new Git(queue(task('one'))), worker = git.worker();
  const claim = await worker.claim({ownerId: 'chat-pages', requestId: 'claim-pages'});
  const base = {status: 'not_found', complete: true, checkedAt: '2026-11-08T18:00:00Z', queries: ['exact title'], locations: ['actual folder']};
  const google = {...base, provider: 'google-drive'}, yandex = {...base, provider: 'yandex-disk'};
  const args = {...credentials(claim), operationId: 'block-pages', status: 'needs_work_source', reason: 'Sources absent.'};
  for (const incomplete of [{complete: false}, {complete: undefined}, {next_offset: 20000}, {nextOffset: 0}, {nextPageToken: 'another-page'},
    {next_page_token: 'another-page'}, {truncated: true}, {pagination: {next_offset: 20000}}, {partial: true}]) {
    await throwsCode(worker.block({...args, sourceChecks: [google, {...yandex, ...incomplete}]}), 'INCOMPLETE_SOURCE_SEARCH');
  }
  await throwsCode(worker.block({...args, sourceChecks: [google, yandex, {...yandex, nextOffset: 20000}]}), 'INCOMPLETE_SOURCE_SEARCH');
  assert.equal(git.refWrites.length, 1);
  await worker.block({...args, sourceChecks: [{...google, nextPageToken: null}, {...yandex, next_offset: null}]});
  assert.equal(git.queue().tasks[0].status, 'needs_work_source');
});
console.log(`\nPASS ${checks} rankings queue checks. No production branches or remote tools were used.`);
