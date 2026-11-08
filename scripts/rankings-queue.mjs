/**
 * GAEO rankings worker queue, v1. No Node, network, filesystem, or runtime imports.
 * Run through the connected GitHub tools: createRankingsQueue({call:(name,args)=>tools[name](args)}).
 * Only rankings-staging can be mutated. A branch update is always a fast-forward
 * with expected_sha; a stale writer rebuilds its own narrow change on the new head.
 */
export const RANKINGS_QUEUE_VERSION = 1;
export const RANKINGS_REPOSITORY = 'gaeo-ru/gaeo-ru.github.io';
export const RANKINGS_BRANCH = 'rankings-staging';
export const RANKINGS_QUEUE_PATH = 'docs/rankings/queue.json';

const PREFIX = 'mcp__codex_apps__github_';
const CATEGORIES = new Set(['products', 'tourism', 'wms', 'fulfillment', 'branding', 'website-performance', 'orienteering', 'cultural-education']);
const STATUSES = new Set(['ready', 'reserved', 'committed', 'needs_work_source', 'blocked_access', 'needs_review', 'excluded']);
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const OP_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{5,159}$/;
const SHA = /^[a-f0-9]{40}$/;
const IMAGE = /\.(?:avif|gif|jpe?g|png|webp)$/i;
const clone = value => JSON.parse(JSON.stringify(value));
const iso = value => new Date(value).toISOString();
const text = value => typeof value === 'string' && value.trim().length > 0;
const canonical = value => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']'
  : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}'
  : JSON.stringify(value);

function fail(code, message, details = {}) {
  const error = new Error(message);
  error.name = 'RankingsQueueError';
  error.code = code;
  error.details = details;
  throw error;
}
function need(condition, code, message, details) { if (!condition) fail(code, message, details); }
function operationId(value, label) { need(typeof value === 'string' && OP_ID.test(value), 'INVALID_ID', `${label} must be a stable 6–160 character identifier.`); return value; }
function taskId(value) { need(typeof value === 'string' && ID.test(value) && value.length <= 160, 'INVALID_TASK_ID', 'Task id must contain lower-case Latin letters, numbers, and single hyphens.'); return value; }
function date(value, label) {
  need(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && iso(Date.parse(value)).slice(0, 10) === value, 'INVALID_DATE', `Invalid ${label}.`);
}
function safeUrl(value, label) {
  // Deliberately portable: code-mode environments do not always expose URL.
  need(typeof value === 'string' && /^https:\/\/[^\s/?#:@]+(?::\d+)?(?:[/?#][^\s]*)?$/i.test(value)
    && !/[\u0000-\u001f\u007f\\<>"']/.test(value), 'UNSAFE_URL', `${label} must be an absolute HTTPS URL without credentials.`);
}
function excluded(task) {
  return task.status === 'excluded' || task.excluded === true || task.excludeFromRankings === true
    || !CATEGORIES.has(task.category) || /^(?:gaeo(?:\.ru)?|алексей\s+яковлев|alexey\s+yakovlev)$/i.test(String(task.firstPlace || '').trim());
}
function live(lease, at) { return lease && Number.isFinite(Date.parse(lease.expiresAt)) && Date.parse(lease.expiresAt) > at; }
function completedSearch(check) {
  const pendingKeys = ['next_offset', 'nextOffset', 'next_page_token', 'nextPageToken', 'next_cursor', 'nextCursor'];
  const pages = [check, check.pagination || {}];
  return check.complete === true && pages.every(page => page.complete !== false && page.hasMore !== true && page.has_more !== true
    && page.partial !== true && page.truncated !== true
    && pendingKeys.every(key => page[key] === undefined || page[key] === null || page[key] === ''));
}
function articlePath(id) { return `src/data/rankings/articles/${id}.json`; }
function receiptPath(id) { return `docs/rankings/receipts/${id}.json`; }
function publicImagePath(id, path) {
  return typeof path === 'string' && path.startsWith(`public/assets/rankings/${id}/`)
    && !path.includes('\\') && !path.includes('%') && !path.split('/').some(part => !part || part === '.' || part === '..')
    && /^public\/assets\/rankings\/[a-z0-9-]+\/[A-Za-z0-9._/-]+$/.test(path) && IMAGE.test(path);
}

export function validateRankingsQueue(queue) {
  need(queue && queue.schemaVersion === 1 && Array.isArray(queue.tasks), 'INVALID_QUEUE', 'Unsupported rankings queue schema.');
  need(!queue.repository || queue.repository === RANKINGS_REPOSITORY, 'WRONG_REPOSITORY', 'Queue repository mismatch.');
  need(!queue.workBranch || queue.workBranch === RANKINGS_BRANCH, 'WRONG_BRANCH', 'Queue must use rankings-staging.');
  const seen = {id: new Set(), familyId: new Set(), slug: new Set()};
  for (const task of queue.tasks) {
    taskId(task.id);
    need(STATUSES.has(task.status), 'INVALID_QUEUE', `Unknown status on ${task.id}.`);
    for (const key of ['id', 'familyId', 'slug']) {
      need(text(task[key]) && !seen[key].has(task[key]), 'DUPLICATE_TASK', `Missing or duplicate ${key}: ${task[key]}.`);
      seen[key].add(task[key]);
    }
    taskId(task.slug);
    if (['ready', 'reserved', 'committed'].includes(task.status)) {
      need(!excluded(task), 'EXCLUDED_TASK', `${task.id} cannot be worked in the rankings queue.`);
      need(text(task.firstPlace), 'WINNER_UNVERIFIED', `${task.id}: a verified winner is required; use needs_review until it is known.`);
    }
    if (task.status === 'reserved') {
      need(task.lease && text(task.lease.token) && text(task.lease.ownerId) && text(task.lease.requestId)
        && ['standard', 'work'].includes(task.lease.mode) && Number.isFinite(Date.parse(task.lease.expiresAt)), 'INVALID_LEASE', `Invalid lease on ${task.id}.`);
    }
  }
  need(queue.claims === undefined || Array.isArray(queue.claims), 'INVALID_QUEUE', 'claims must be an array.');
  const requests = new Set(), owners = new Set();
  for (const claim of queue.claims || []) {
    need(seen.id.has(claim.taskId) && !requests.has(claim.requestId) && !owners.has(claim.ownerId), 'INVALID_CLAIMS', 'A request or chat owner was assigned more than once.');
    requests.add(claim.requestId); owners.add(claim.ownerId);
  }
  return queue;
}

export function validateRankingsSubmission(article, task, filePaths) {
  need(article && article.schemaVersion === 1, 'INVALID_ARTICLE', 'Unsupported article schema.');
  for (const key of ['id', 'familyId', 'category', 'slug', 'firstPlace']) need(article[key] === task[key], 'ARTICLE_MISMATCH', `${key} differs from the reserved task.`, {taskId: task.id});
  need(!excluded(task) && !article.excluded, 'EXCLUDED_TASK', 'This material is excluded from rankings.');
  for (const key of ['sourceDate', 'publishedDate', 'modifiedDate']) date(article[key], key);
  need(article.sourceDate <= article.publishedDate && article.publishedDate <= article.modifiedDate, 'INVALID_DATE', 'Article dates are out of chronological order.');
  need(article.source && article.source.status === 'found', 'SOURCE_UNVERIFIED', 'A verified text source is required.');
  for (const key of ['url', 'sourceUrl']) if (article.source[key]) safeUrl(article.source[key], `Text source ${key}`);
  const proof = article.source.firstPlaceVerification;
  const checkedAt = proof?.checkedAt || proof?.checkedDate;
  const references = [article.source.url, article.source.sourceUrl, article.source.fileId, article.source.googleDriveFileId,
    article.source.documentId, article.source.path].filter(text);
  need(proof?.status === 'verified-in-manuscript' && proof.firstPlace === article.firstPlace && text(proof.sourceReference)
    && references.includes(proof.sourceReference) && text(proof.locator), 'WINNER_UNVERIFIED',
    'Record the verified winner, the selected source URL/file ID/path, and its heading or paragraph locator before submission.');
  need(typeof checkedAt === 'string' && /^\d{4}-\d{2}-\d{2}(?:T[^\s]+)?$/.test(checkedAt) && !Number.isNaN(Date.parse(checkedAt)),
    'WINNER_UNVERIFIED', 'The winner verification needs its actual checkedAt or checkedDate; a real date-only record is acceptable.');
  date(checkedAt.slice(0, 10), 'winner verification date');
  need(Array.isArray(article.versions) && article.versions.length > 0, 'MISSING_VERSIONS', 'Published versions are required.');
  for (const version of article.versions) {
    need(text(version.platform) && (version.ru || version.url), 'MISSING_VERSIONS', 'Every version needs a platform and a confirmed RU or common URL.');
    for (const key of ['ru', 'en', 'url']) if (version[key]) safeUrl(version[key], `${version.platform}.${key}`);
    if (/indexresearch|github/i.test(version.platform)) need(text(version.en), 'MISSING_EN_VERSION', `A verified English ${version.platform} URL is required.`);
  }
  need(Array.isArray(article.images), 'INVALID_IMAGES', 'Use images: [] when source images were not found.');
  const imageFiles = new Set();
  for (const image of article.images) {
    const path = 'public' + image.src;
    need(publicImagePath(task.id, path), 'PATH_OUTSIDE_TASK', 'An image is outside the reserved task directory.');
    need(!imageFiles.has(path), 'DUPLICATE_FILE', 'An image is listed twice.');
    need(Number.isInteger(image.width) && image.width > 0 && Number.isInteger(image.height) && image.height > 0
      && text(image.alt?.ru) && text(image.alt?.en), 'INVALID_IMAGES', 'Image dimensions and bilingual alt text are required.');
    safeUrl(image.sourceUrl, 'Image source URL');
    imageFiles.add(path);
  }
  need(Array.isArray(article.clientLinks), 'INVALID_LINKS', 'clientLinks must be an array.');
  for (const link of article.clientLinks) {
    safeUrl(link.url, 'Client URL');
    need(text(link.label?.ru) && text(link.label?.en), 'INVALID_LINKS', 'Client links need bilingual labels.');
    need(link.relation === 'sponsored', 'INVALID_LINKS', 'Client promotion links must retain relation: sponsored.');
  }
  for (const lang of ['ru', 'en']) {
    const content = article[lang];
    need(content && ['title', 'seoTitle', 'description'].every(key => text(content[key])), 'INCOMPLETE_TRANSLATION', `Missing ${lang} metadata.`);
    for (const key of ['intro', 'methodology', 'selection', 'conclusion']) need(Array.isArray(content[key]) && content[key].length > 0 && content[key].every(text), 'INCOMPLETE_TRANSLATION', `Missing ${lang}.${key}.`);
    need(Array.isArray(content.ranking) && content.ranking.length >= 2, 'INVALID_RANKING', `${lang} ranking is incomplete.`);
    content.ranking.forEach((entry, index) => {
      need(entry.position === index + 1 && text(entry.name) && text(entry.summary)
        && Array.isArray(entry.paragraphs) && entry.paragraphs.length > 0 && entry.paragraphs.every(text), 'INVALID_RANKING', `Invalid ${lang} ranking entry ${index + 1}.`);
      if (entry.url) safeUrl(entry.url, 'Ranked entity URL');
    });
    need(Array.isArray(content.faq) && content.faq.length >= 4 && content.faq.every(item => text(item.question) && text(item.answer))
      && new Set(content.faq.map(item => item.question)).size === content.faq.length, 'INVALID_FAQ', `${lang} requires at least 4 complete, distinct FAQ entries.`);
    need(!/[<>]/.test(JSON.stringify(content)) && !/\[\[(?:AGENT|ВСТАВИТЬ)|\[ИЗОБРАЖЕНИЕ|TODO|TBD/i.test(JSON.stringify(content)), 'UNFINISHED_ARTICLE', `${lang} contains HTML or unfinished placeholders.`);
  }
  need(article.ru.ranking[0].name === task.firstPlace, 'WINNER_CHANGED', 'The first-place entity differs from the source task.');
  need(article.ru.ranking.length === article.en.ranking.length, 'RANKING_CHANGED', 'RU/EN ranking lengths differ.');
  if (task.expectedCount) need(article.ru.ranking.length === task.expectedCount, 'RANKING_CHANGED', 'The number of ranked entries differs from the source task.');
  article.ru.ranking.forEach((entry, index) => {
    const translated = article.en.ranking[index];
    need(entry.position === translated.position && (entry.url || '') === (translated.url || '')
      && String(entry.score || '') === String(translated.score || ''), 'RANKING_CHANGED', `RU/EN entity order, URL, or score differs at ${index + 1}.`);
    if (translated.originalName !== undefined) need(translated.originalName === entry.name, 'RANKING_CHANGED', `The originalName link differs from the RU entity at ${index + 1}.`);
    // A shared entity URL or an explicit originalName preserves identity when a
    // source has no official URL (for example sports or Cyrillic brand names).
    if (!entry.url) need(entry.name === translated.name || translated.originalName === entry.name || (task.ranking?.[index]?.aliases?.en || []).includes(translated.name)
      || (index === 0 && (task.firstPlaceAliases?.en || []).includes(translated.name)), 'RANKING_CHANGED', `Unverified translated entity name at ${index + 1}.`);
    if (Array.isArray(task.ranking)) {
      const source = task.ranking[index];
      need(source && source.position === entry.position && (source.name === entry.name || (source.aliases?.ru || []).includes(entry.name)), 'RANKING_CHANGED', `Entry ${index + 1} differs from the source ranking.`);
    }
  });
  if (Array.isArray(task.ranking)) need(task.ranking.length === article.ru.ranking.length, 'RANKING_CHANGED', 'The source ranking has a different number of entries.');
  const paths = new Set(filePaths);
  need(paths.has(articlePath(task.id)), 'MISSING_ARTICLE', 'The bilingual article JSON is required.');
  for (const path of imageFiles) need(paths.has(path), 'MISSING_IMAGE', `Missing image blob: ${path}.`);
  for (const path of paths) need(path === articlePath(task.id) || imageFiles.has(path), 'UNREFERENCED_ASSET', `Unreferenced upload: ${path}.`);
  return {languages: ['ru', 'en'], entries: article.ru.ranking.length, firstPlace: article.firstPlace,
    firstPlaceVerification: clone(proof), images: imageFiles.size};
}

function unpack(result, tool) {
  const payload = result?.structuredContent ?? result;
  if (result?.isError || payload?.error) {
    const message = payload?.error || result?.content?.filter(item => item.type === 'text').map(item => item.text).join('\n') || `${tool} failed.`;
    fail(payload?.error_code || 'GITHUB_ERROR', String(message), {tool});
  }
  return payload;
}
function apiData(result, tool) {
  const payload = unpack(result, tool);
  if (typeof payload?.content === 'string') {
    try { return JSON.parse(payload.content); } catch { /* mutation responses can already be normalized objects */ }
  }
  if (payload?.structuredContent && typeof payload.structuredContent.content === 'string') {
    try { return JSON.parse(payload.structuredContent.content); } catch { /* fall through */ }
  }
  return payload;
}
function returnedSha(result, tool) {
  const data = apiData(result, tool);
  const sha = typeof data === 'string' ? data : data?.sha || data?.commit_sha || data?.tree_sha || data?.blob_sha || data?.commit?.sha;
  need(SHA.test(sha || ''), 'INVALID_GITHUB_RESPONSE', `${tool} did not return a Git object SHA.`);
  return sha;
}

/**
 * `call(name,args)` is the only required capability. Do not pass credentials.
 * Test-only clocks/ID generators may be injected; real callers leave them out.
 */
export function createRankingsQueue({call, repository = RANKINGS_REPOSITORY, branch = RANKINGS_BRANCH,
  now = () => Date.now(), randomId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`,
  maxAttempts = 12} = {}) {
  need(typeof call === 'function', 'MISSING_TRANSPORT', 'Provide call(name,args) for the connected GitHub tools.');
  need(repository === RANKINGS_REPOSITORY && branch === RANKINGS_BRANCH, 'FORBIDDEN_TARGET', 'Workers may write only gaeo-ru/gaeo-ru.github.io:rankings-staging.');
  need(Number.isInteger(maxAttempts) && maxAttempts >= 1 && maxAttempts <= 30, 'INVALID_CONFIG', 'maxAttempts must be between 1 and 30.');
  const api = `https://api.github.com/repos/${repository}`;
  const invoke = (name, args) => call(PREFIX + name, args);
  async function get(url) { return apiData(await invoke('fetch', {url}), 'fetch'); }
  async function file(path, ref) {
    const result = unpack(await invoke('fetch_file', {repository_full_name: repository, path, ref, encoding: 'utf-8'}), 'fetch_file');
    need(typeof result?.content === 'string', 'INVALID_GITHUB_RESPONSE', `No UTF-8 content returned for ${path}.`);
    return result;
  }
  async function read() {
    const current = await get(`${api}/branches/${encodeURIComponent(branch)}`);
    const headSha = current?.commit?.sha, treeSha = current?.commit?.commit?.tree?.sha;
    need(SHA.test(headSha || '') && SHA.test(treeSha || ''), 'MISSING_STAGING_BRANCH', 'rankings-staging must already exist; a worker must not create or substitute a branch.');
    const source = await file(RANKINGS_QUEUE_PATH, headSha);
    let queue;
    try { queue = JSON.parse(source.content); } catch { fail('INVALID_QUEUE', 'The rankings queue is not valid JSON.'); }
    validateRankingsQueue(queue);
    return {headSha, treeSha, queue};
  }
  function getTask(queue, id) {
    const task = queue.tasks.find(item => item.id === id);
    need(task, 'UNKNOWN_TASK', `Unknown task ${id}.`);
    return task;
  }
  function identity(args) {
    taskId(args.taskId); operationId(args.ownerId, 'ownerId'); operationId(args.requestId, 'requestId');
    need(text(args.token), 'MISSING_TOKEN', 'The persisted lease token is required.');
  }
  function getClaim(queue, args) {
    const claim = (queue.claims || []).find(item => item.requestId === args.requestId);
    need(claim && claim.ownerId === args.ownerId && claim.taskId === args.taskId && claim.token === args.token, 'LEASE_LOST', 'The task is not owned by this saved claim.');
    return claim;
  }
  function requireLease(queue, args, at) {
    const task = getTask(queue, args.taskId), claim = getClaim(queue, args);
    need(!excluded(task), 'EXCLUDED_TASK', 'The reserved material is excluded.');
    need(task.status === 'reserved' && task.lease?.token === args.token && task.lease.ownerId === args.ownerId
      && task.lease.requestId === args.requestId, 'LEASE_LOST', 'Another claim or a completed operation owns this task.');
    need(live(task.lease, at), 'LEASE_EXPIRED', 'The lease expired. Do not write files; a new chat may reclaim this task.');
    return {task, claim};
  }
  function duration(queue) {
    const minutes = queue.leaseMinutes ?? 360;
    need(Number.isInteger(minutes) && minutes >= 15 && minutes <= 1440, 'INVALID_QUEUE', 'leaseMinutes must be between 15 and 1440.');
    return minutes * 60000;
  }
  function claimView(snapshot, record) {
    const task = getTask(snapshot.queue, record.taskId);
    let status = record.outcome;
    if (task.lease?.token === record.token && task.status === 'reserved') status = live(task.lease, now()) ? 'reserved' : 'expired';
    else if (record.outcome === 'reserved') status = 'lease_lost';
    return {status, taskId: task.id, ownerId: record.ownerId, requestId: record.requestId, token: record.token,
      mode: record.mode, expiresAt: task.lease?.token === record.token ? task.lease.expiresAt : record.expiresAt,
      task: clone(task), headSha: snapshot.headSha, replayed: true};
  }
  async function pathEntries(treeSha, paths) {
    const cache = new Map();
    const tree = sha => {
      if (!cache.has(sha)) cache.set(sha, get(`${api}/git/trees/${sha}`).then(value => {
        need(Array.isArray(value?.tree) && !value.truncated, 'INCOMPLETE_TREE', 'GitHub returned an incomplete tree.'); return value.tree;
      }));
      return cache.get(sha);
    };
    const pairs = await Promise.all(paths.map(async path => {
      let sha = treeSha, entry = null;
      const parts = path.split('/');
      for (let index = 0; index < parts.length; index++) {
        entry = (await tree(sha)).find(item => item.path === parts[index]);
        if (!entry) return [path, null];
        if (index < parts.length - 1) {
          need(entry.type === 'tree', 'PATH_COLLISION', `A parent of ${path} is not a directory.`); sha = entry.sha;
        }
      }
      return [path, entry];
    }));
    return new Map(pairs);
  }
  async function completeReceipt(snapshot, task, candidateSha) {
    const result = task.result;
    need(result && result.receiptPath === receiptPath(task.id) && Array.isArray(result.files) && result.files.length > 0,
      'RECEIPT_MISSING', 'The task has no durable submission receipt.');
    need(result.files.some(item => item.path === articlePath(task.id)) && new Set(result.files.map(item => item.path)).size === result.files.length
      && result.files.every(item => SHA.test(item.sha || '') && (item.path === articlePath(task.id) || publicImagePath(task.id, item.path))),
      'RECEIPT_INVALID', 'The receipt contains duplicate or out-of-scope files.');
    const stored = await file(result.receiptPath, snapshot.headSha);
    let receipt;
    try { receipt = JSON.parse(stored.content); } catch { fail('RECEIPT_INVALID', 'The stored submission receipt is not valid JSON.'); }
    need(receipt.taskId === task.id && receipt.submissionId === result.submissionId && receipt.ownerId === result.ownerId
      && receipt.requestId === result.requestId && canonical(receipt.files) === canonical(result.files), 'RECEIPT_INVALID', 'The receipt does not match the queue result.');
    const entries = await pathEntries(snapshot.treeSha, result.files.map(item => item.path));
    for (const item of result.files) need(entries.get(item.path)?.sha === item.sha && entries.get(item.path)?.type === 'blob'
      && entries.get(item.path)?.mode === '100644', 'CONTENT_NOT_CONFIRMED', `Readback mismatch: ${item.path}.`);
    let commitSha = candidateSha;
    if (!commitSha) {
      const commits = await get(`${api}/commits?sha=${snapshot.headSha}&path=${encodeURIComponent(result.receiptPath)}&per_page=1`);
      commitSha = commits?.[0]?.sha;
      need(SHA.test(commitSha || ''), 'COMMIT_NOT_CONFIRMED', 'The receipt exists but its introducing commit could not be resolved.');
    }
    return {status: 'committed', taskId: task.id, submissionId: result.submissionId, commitSha,
      commitUrl: `https://github.com/${repository}/commit/${commitSha}`, branch, deployed: false,
      receiptPath: result.receiptPath, files: clone(result.files), headSha: snapshot.headSha, replayed: !candidateSha};
  }

  async function atomic({inspect, build, finish = async (snapshot, value, sha) => ({...value, headSha: snapshot.headSha, commitSha: sha || null})}) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const snapshot = await read();
      const prior = await inspect(snapshot);
      if (prior) return finish(snapshot, prior, null);
      const plan = await build(snapshot);
      if (plan.noop) return {...plan.result, headSha: snapshot.headSha};
      validateRankingsQueue(plan.queue);
      const ensureDeadline = () => { if (plan.deadline) need(now() < plan.deadline, 'LEASE_EXPIRED', 'The lease expired before the atomic ref update. No article was committed.'); };
      ensureDeadline();
      const treeSha = returnedSha(await invoke('create_tree', {repository_full_name: repository, base_tree_sha: snapshot.treeSha,
        tree_elements: [{path: RANKINGS_QUEUE_PATH, mode: '100644', type: 'blob', content: JSON.stringify(plan.queue, null, 2) + '\n'}, ...(plan.entries || [])]}), 'create_tree');
      const commitSha = returnedSha(await invoke('create_commit', {repository_full_name: repository, parent_sha: snapshot.headSha, tree_sha: treeSha, message: plan.message}), 'create_commit');
      ensureDeadline();
      let updateError;
      try {
        unpack(await invoke('update_ref', {repository_full_name: repository, branch_name: branch, sha: commitSha,
          expected_sha: snapshot.headSha, force: false}), 'update_ref');
      } catch (error) { updateError = error; }
      let fresh;
      try { fresh = await read(); } catch (error) {
        fail('RESULT_UNCONFIRMED', 'The ref update result could not be read back. Repeat the same saved operation identifiers; do not create a new claim or submission.',
          {candidateCommitSha: commitSha, updateError: updateError?.code || null, readError: error.code || error.message});
      }
      const applied = await inspect(fresh);
      // A duplicate caller can observe the winning sibling commit, while its own
      // candidate is an unreferenced object. Only report the candidate if it is
      // the observed head; otherwise resolve the article commit from its receipt.
      if (applied) return finish(fresh, applied, fresh.headSha === commitSha ? commitSha : null);
      if (!updateError) fail('RESULT_UNCONFIRMED', 'GitHub acknowledged a ref update, but its operation marker is absent. Repeat the same saved identifiers.', {candidateCommitSha: commitSha});
      lastError = updateError;
      // Never reinterpret an access/policy rejection as a concurrency conflict.
      if (/403|401|forbidden|denied|permission|approval|not.found|404/i.test(updateError.message || '')) throw updateError;
      if (fresh.headSha === snapshot.headSha && !/409|422|conflict|mismatch|expected|non.fast.forward|timeout|temporar|connection|network|5\d\d/i.test(updateError.message || '')) throw updateError;
      // CAS race: the next iteration reads the new head and rebuilds only this task's change.
    }
    fail('CAS_RETRIES_EXHAUSTED', 'Concurrent updates prevented confirmation. Resume with the same saved identifiers.', {lastError: lastError?.message});
  }

  async function claim({ownerId, requestId, taskId: preferredId, mode = 'standard'} = {}) {
    operationId(ownerId, 'ownerId'); operationId(requestId, 'requestId'); if (preferredId) taskId(preferredId);
    need(['standard', 'work'].includes(mode), 'INVALID_MODE', 'Mode must be standard or work.');
    const token = 'rk-' + randomId();
    const inspect = snapshot => {
      const records = snapshot.queue.claims || [];
      const record = records.find(item => item.ownerId === ownerId || item.requestId === requestId);
      if (!record) return null;
      need(record.ownerId === ownerId && record.requestId === requestId && record.mode === mode
        && (!preferredId || record.taskId === preferredId), 'CLAIM_ID_REUSED', 'This owner/request already belongs to another claim. One chat handles one article.');
      return claimView(snapshot, record);
    };
    return atomic({inspect, build: async snapshot => {
      const queue = clone(snapshot.queue), at = now(), targetStatus = mode === 'work' ? 'needs_work_source' : 'ready';
      if (queue.paused === true) return {noop: true, result: {status: 'paused', mode, reason: 'The coordinator paused new claims for reconciliation or publication.'}};
      queue.claims ||= [];
      const task = queue.tasks.find(item => (!preferredId || item.id === preferredId) && !excluded(item) && text(item.firstPlace)
        && (item.status === targetStatus || (item.status === 'reserved' && item.lease?.mode === mode && !live(item.lease, at))));
      if (!task) return {noop: true, result: {status: 'empty', mode, reason: preferredId ? 'Requested task is unavailable in this pass.' : 'No unreserved tasks are available in this pass.'}};
      const previousStatus = task.lease?.previousStatus || targetStatus;
      if (task.lease) {
        const previous = queue.claims.find(item => item.token === task.lease.token);
        if (previous) { previous.outcome = 'expired'; previous.expiredAt = iso(at); }
      }
      const lease = {ownerId, requestId, token, mode, claimedAt: iso(at), expiresAt: iso(at + duration(queue)), previousStatus};
      task.status = 'reserved'; task.lease = lease; task.leaseVersion = (task.leaseVersion || 0) + 1;
      queue.claims.push({...lease, taskId: task.id, outcome: 'reserved', operations: []});
      queue.updatedAt = iso(at);
      return {queue, deadline: Date.parse(lease.expiresAt), message: `Reserve ranking ${task.id} [skip ci]`};
    }});
  }

  function operationReplay(queue, args, kind, signature) {
    const claim = getClaim(queue, args), operation = (claim.operations || []).find(item => item.id === args.operationId);
    if (!operation) return null;
    need(operation.kind === kind && operation.signature === signature, 'OPERATION_ID_REUSED', 'The operationId was reused with a different action or payload.');
    return {...clone(operation.result), replayed: true, currentStatus: getTask(queue, args.taskId).status};
  }
  async function leaseOperation(kind, args, payload, change) {
    identity(args); operationId(args.operationId, 'operationId');
    const signature = canonical(payload);
    return atomic({inspect: snapshot => operationReplay(snapshot.queue, args, kind, signature), build: async snapshot => {
      const queue = clone(snapshot.queue), at = now(), {task, claim} = requireLease(queue, args, at);
      const deadline = Date.parse(task.lease.expiresAt), result = change(queue, task, claim, at);
      claim.operations ||= [];
      claim.operations.push({id: args.operationId, kind, signature, at: iso(at), result: clone(result)});
      queue.updatedAt = iso(at);
      return {queue, deadline, message: `${kind === 'renew' ? 'Renew' : kind === 'block' ? 'Record source block for' : 'Release'} ranking ${task.id} [skip ci]`};
    }});
  }
  async function renew(args) {
    return leaseOperation('renew', args, {}, (queue, task, claim, at) => {
      task.lease.expiresAt = iso(at + duration(queue)); task.lease.renewedAt = iso(at); claim.expiresAt = task.lease.expiresAt;
      return {status: 'renewed', taskId: task.id, token: args.token, expiresAt: task.lease.expiresAt};
    });
  }
  async function release(args) {
    const reason = args.reason || 'Worker stopped before producing an article.';
    need(text(reason), 'INVALID_REASON', 'A release reason is required.');
    return leaseOperation('release', args, {reason}, (queue, task, claim, at) => {
      task.status = task.lease.previousStatus || 'ready'; task.lease = null;
      task.lastRelease = {at: iso(at), ownerId: args.ownerId, reason}; claim.outcome = 'released';
      return {status: 'released', taskId: task.id, queueStatus: task.status};
    });
  }
  async function block(args) {
    const {status, reason, sourceChecks = []} = args;
    need(['needs_work_source', 'blocked_access', 'needs_review'].includes(status) && text(reason), 'INVALID_BLOCK', 'Use a precise supported block status and reason.');
    need(Array.isArray(sourceChecks), 'INVALID_SOURCE_CHECKS', 'sourceChecks must be an array.');
    if (status === 'needs_work_source') {
      for (const provider of ['google-drive', 'yandex-disk']) {
        const checks = sourceChecks.filter(check => check.provider === provider);
        need(checks.length > 0 && checks.every(check => check.status === 'not_found' && completedSearch(check)
          && text(check.checkedAt) && Number.isFinite(Date.parse(check.checkedAt)) && Array.isArray(check.queries) && check.queries.some(text)
          && Array.isArray(check.locations) && check.locations.some(text)), 'INCOMPLETE_SOURCE_SEARCH',
          `A completed, recorded ${provider} search with complete:true and no pending pagination is required before deferring to Work.`);
      }
      need(sourceChecks.every(check => check.status !== 'inaccessible' && check.status !== 'error'), 'INCOMPLETE_SOURCE_SEARCH', 'An access error is not proof that a source is absent. Use blocked_access.');
    }
    if (status === 'blocked_access') need(sourceChecks.some(check => ['inaccessible', 'error'].includes(check.status)), 'INVALID_SOURCE_CHECKS', 'blocked_access needs a recorded access error. Editorial ambiguities use needs_review.');
    return leaseOperation('block', args, {status, reason, sourceChecks}, (queue, task, claim, at) => {
      task.status = status; task.block = {reason, sourceChecks: clone(sourceChecks), at: iso(at), ownerId: args.ownerId}; task.lease = null;
      claim.outcome = status;
      return {status, taskId: task.id, reason};
    });
  }

  async function submit(args) {
    identity(args); operationId(args.submissionId, 'submissionId');
    need(Array.isArray(args.files) && args.files.length >= 1 && args.files.length <= 65, 'INVALID_FILES', 'Submit the article and at most 64 image blobs.');
    const seen = new Set(), prepared = [], rawArticle = args.files.find(item => item.path === articlePath(args.taskId));
    need(rawArticle && typeof rawArticle.content === 'string' && !rawArticle.sha, 'MISSING_ARTICLE', 'Supply the bilingual article JSON as UTF-8 content, not an unvalidated blob.');
    let article;
    try { article = JSON.parse(rawArticle.content); } catch { fail('INVALID_ARTICLE', 'Article content must be valid JSON.'); }
    for (const item of args.files) {
      need(item && typeof item.path === 'string' && !seen.has(item.path), 'DUPLICATE_FILE', 'Submission paths must be distinct.');
      need(Object.keys(item).every(key => ['path', 'sha', 'content'].includes(key)), 'INVALID_FILES', 'Only path/content for the article and path/sha for image blobs are accepted.');
      need(item.path === articlePath(args.taskId) || publicImagePath(args.taskId, item.path), 'PATH_OUTSIDE_TASK', `Path outside the reserved task: ${item.path}.`);
      if (item.path !== articlePath(args.taskId)) need(SHA.test(item.sha || '') && item.content === undefined, 'INVALID_IMAGE_BLOB', 'Upload existing image bytes once, then pass the confirmed GitHub blob SHA.');
      seen.add(item.path);
    }
    // Validate before creating even immutable blobs; revalidate after every CAS race.
    const initial = await read(), initialTask = getTask(initial.queue, args.taskId);
    validateRankingsSubmission(article, initialTask, [...seen]);
    const initialClaim = getClaim(initial.queue, args);
    if (!initialTask.result) requireLease(initial.queue, args, now());
    if (initialClaim.mode === 'standard' && !['google-drive', 'yandex-disk'].includes(article.source.provider)) fail('SOURCE_MODE_MISMATCH', 'Ordinary chats must use a verified Drive/Yandex text source; recovered published-page sources belong to the Work pass.');
    for (const item of args.files) prepared.push({path: item.path, sha: item.path === articlePath(args.taskId)
      ? returnedSha(await invoke('create_blob', {repository_full_name: repository, content: item.content, encoding: 'utf-8'}), 'create_blob') : item.sha});
    prepared.sort((a, b) => a.path.localeCompare(b.path));
    const sameSubmission = snapshot => {
      const task = getTask(snapshot.queue, args.taskId);
      const duplicate = snapshot.queue.tasks.find(item => item.id !== args.taskId && item.result?.submissionId === args.submissionId);
      need(!duplicate, 'SUBMISSION_ID_REUSED', 'This submissionId belongs to another article.');
      if (!task.result) return null;
      need(task.status === 'committed' && task.result.submissionId === args.submissionId && task.result.ownerId === args.ownerId
        && task.result.requestId === args.requestId && task.result.token === args.token, 'ALREADY_COMMITTED', 'This article already has a different committed result.');
      need(canonical(task.result.files) === canonical(prepared), 'SUBMISSION_CONTENT_CHANGED', 'The same submissionId was retried with different file bytes. Recover the stored result; do not overwrite it.');
      return task;
    };
    return atomic({inspect: sameSubmission, finish: (snapshot, task, candidate) => completeReceipt(snapshot, task, candidate), build: async snapshot => {
      const queue = clone(snapshot.queue), at = now(), {task, claim} = requireLease(queue, args, at);
      const validation = validateRankingsSubmission(article, task, prepared.map(item => item.path));
      const receiptFile = receiptPath(task.id), entries = await pathEntries(snapshot.treeSha, [...prepared.map(item => item.path), receiptFile]);
      for (const [path, entry] of entries) need(!entry, 'EXISTING_CONTENT', `Existing content cannot be overwritten by a worker: ${path}.`);
      const deadline = Date.parse(task.lease.expiresAt);
      const receipt = {schemaVersion: 1, taskId: task.id, familyId: task.familyId, slug: task.slug, ownerId: args.ownerId,
        requestId: args.requestId, submissionId: args.submissionId, submittedAt: iso(at), mode: claim.mode,
        baseCommit: snapshot.headSha, files: prepared, validation, deployed: false};
      task.result = {submissionId: args.submissionId, ownerId: args.ownerId, requestId: args.requestId, token: args.token,
        receiptPath: receiptFile, committedAt: iso(at), files: prepared, baseCommit: snapshot.headSha};
      task.firstPlaceStatus = 'verified-in-manuscript'; task.firstPlaceVerification = clone(article.source.firstPlaceVerification);
      task.status = 'committed'; task.lease = null; task.block = null; claim.outcome = 'committed'; claim.submissionId = args.submissionId;
      queue.updatedAt = iso(at);
      return {queue, deadline, message: `Add bilingual ranking ${task.id}: ${task.title || task.slug} [skip ci]`, entries: [
        ...prepared.map(item => ({path: item.path, mode: '100644', type: 'blob', sha: item.sha})),
        {path: receiptFile, mode: '100644', type: 'blob', content: JSON.stringify(receipt, null, 2) + '\n'}]};
    }});
  }

  async function recover({ownerId, requestId, submissionId} = {}) {
    operationId(ownerId, 'ownerId'); operationId(requestId, 'requestId');
    const snapshot = await read(), record = (snapshot.queue.claims || []).find(item => item.requestId === requestId);
    if (!record) return {status: 'not_claimed', ownerId, requestId, headSha: snapshot.headSha};
    need(record.ownerId === ownerId, 'CLAIM_ID_REUSED', 'The request belongs to another chat owner.');
    const task = getTask(snapshot.queue, record.taskId);
    if (task.result?.requestId === requestId) {
      need(!submissionId || task.result.submissionId === submissionId, 'SUBMISSION_ID_REUSED', 'The stored result has another submissionId.');
      return completeReceipt(snapshot, task, null);
    }
    return claimView(snapshot, record);
  }
  async function status() {
    const snapshot = await read(), counts = {};
    for (const task of snapshot.queue.tasks) counts[task.status] = (counts[task.status] || 0) + 1;
    return {branch, headSha: snapshot.headSha, counts, tasks: clone(snapshot.queue.tasks)};
  }
  async function source({taskId: id, ref} = {}) {
    taskId(id);
    const snapshot = await read(), task = getTask(snapshot.queue, id);
    need(!ref || SHA.test(ref), 'INVALID_REF', 'A source read may be pinned only to a full commit SHA.');
    need(typeof task.sourceManifest === 'string' && task.sourceManifest.startsWith('docs/rankings/sources/')
      && !task.sourceManifest.includes('..') && /^docs\/rankings\/sources\/[a-z0-9-]+\.json$/.test(task.sourceManifest), 'INVALID_SOURCE_PATH', 'Missing or unsafe source manifest path.');
    const result = await file(task.sourceManifest, ref || snapshot.headSha);
    return {taskId: id, headSha: ref || snapshot.headSha, path: task.sourceManifest, manifest: JSON.parse(result.content)};
  }
  return Object.freeze({claim, renew, release, block, submit, recover, status, source});
}
