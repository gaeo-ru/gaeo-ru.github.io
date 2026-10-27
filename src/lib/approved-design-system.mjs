import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {designDataFor} from '../data/approved-design-content.mjs';

export const DESIGN_BLOCKS=Object.freeze(['FAQ','CONTACT','SERVICES','WHEN','STEPS','CASES']);
const PAGES=resolve(process.cwd(),'src/legacy/pages');
const PARTIALS=resolve(process.cwd(),'templates/partials');

export function faqItemsFor(sourcePath){
  const source=readFileSync(resolve(PAGES,sourcePath),'utf8');
  const ld=[...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if(ld.length!==1)throw new Error('Expected one JSON-LD graph on '+sourcePath);
  const graph=JSON.parse(ld[0][1])['@graph']||[];
  const matches=graph.filter(n=>n['@type']==='FAQPage');
  if(matches.length!==1)throw new Error('Expected one FAQPage on '+sourcePath);
  const questions=matches[0].mainEntity;
  if(!Array.isArray(questions)||!questions.length)throw new Error('FAQ has no content on '+sourcePath);
  return questions.map((q,i)=>{
    const question=q.name,answer=q.acceptedAnswer?.text;
    if(typeof question!=='string'||!question.trim()||typeof answer!=='string'||!answer.trim())
      throw new Error('Invalid FAQ question '+(i+1)+' on '+sourcePath);
    return {question,answer};
  });
}

export function approvedLeadFor(sourcePath){
  const lang=sourcePath.startsWith('en/')?'en':'ru';
  const source=readFileSync(resolve(PARTIALS,'hub-cta-'+lang+'.html'),'utf8');
  const m=source.match(/^<div class="page-cta"><h2>([^<]+)<\/h2><p>([^<]+)<\/p><a class="button" href="([^"]+)">([^<]+)<\/a><\/div>\s*$/);
  if(!m)throw new Error('Canonical '+lang+' lead partial is not parseable');
  return {title:m[1],description:m[2],href:m[3],label:m[4]};
}

export function approvedCardsFor(sourcePath,block){
  return designDataFor(sourcePath,block.toLowerCase());
}
