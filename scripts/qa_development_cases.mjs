import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';

const slugs=['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours'];
const root=resolve(process.cwd(),'dist');
let count=0;
for(const slug of slugs)for(const lang of ['ru','en']){
 const route='/'+(lang==='en'?'en/':'')+'cases/'+slug+'/';
 const path=resolve(root,route.slice(1),'index.html');
 assert.ok(existsSync(path),'Missing case: '+route);
 const html=readFileSync(path,'utf8');
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Canonical '+route);
 assert.ok(html.includes('property="og:url" content="https://gaeo.ru'+route+'"'),'OG '+route);
 for(const alt of ['ru','en']){
  const target='https://gaeo.ru/'+(alt==='en'?'en/':'')+'cases/'+slug+'/';
  assert.ok(html.includes('hreflang="'+alt+'" href="'+target+'"'),'Hreflang '+route);
 }
 assert.equal((html.match(/<h1/g)||[]).length,1,'H1 count '+route);
 const data=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(data,'Schema '+route);
 const entities=JSON.parse(data[1])['@graph'];
 const article=entities.find(x=>x['@type']==='Article');
 const faq=entities.find(x=>x['@type']==='FAQPage');
 assert.equal(article.dateModified,'2026-10-26','Date modified '+route);
 assert.ok(article.image && !article.image.endsWith('gaeo-social-preview.jpg'),'Cover '+route);
 assert.equal(faq.mainEntity.length,3,'FAQ length '+route);
 const updated=lang==='en'?'Updated: October 26, 2026':'Обновлено: 26 октября 2026';
 assert.ok(html.includes(updated),'Visible date '+route);
 count++;
}
console.log('DEVELOPMENT_CASE_QA=PASS; pages='+count);
