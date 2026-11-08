import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {designDataFor} from '../data/approved-design-content.mjs';

export const DESIGN_BLOCKS=Object.freeze(['FAQ','CONTACT','SERVICES','WHEN','STEPS','CASES']);
const PAGES=resolve(process.cwd(),'src/legacy/pages');
const PARTIALS=resolve(process.cwd(),'templates/partials');

export function faqItemsFor(sourcePath){
  const source=readFileSync(resolve(PAGES,sourcePath),'utf8');
  const ld=[...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if(!ld.length)throw new Error('Expected JSON-LD on '+sourcePath);
  // New bilingual GEO sector pages keep page metadata and FAQ in separate valid
  // JSON-LD scripts, while existing pages retain their single-graph structure.
  const graph=ld.flatMap(m=>{const parsed=JSON.parse(m[1]);return parsed['@graph']||[parsed]});
  const matches=graph.filter(n=>n['@type']==='FAQPage');
  if(matches.length!==1)throw new Error('Expected one FAQPage on '+sourcePath);
  const questions=matches[0].mainEntity;
  if(!Array.isArray(questions)||!questions.length)throw new Error('FAQ has no content on '+sourcePath);
  return questions.map((q,i)=>{
    const question=q.name,answer=q.acceptedAnswer?.text;
    if(typeof question!=='string'||!question.trim()||typeof answer!=='string'||!answer.trim())
      throw new Error('Invalid FAQ question '+(i+1)+' on '+sourcePath);
    // FAQ citations can turn numbered markers in the canonical answer into
    // accessible source-file links without changing the visible or JSON-LD text.
    const citations=q.citation??[];
    if(!Array.isArray(citations))throw new Error('FAQ citations must be an array on '+sourcePath);
    const answerSegments=[];
    if(citations.length){
      const markers=[...answer.matchAll(/\((\d+)\)/g)].map(m=>Number(m[1]));
      if(markers.length!==citations.length || markers.some((n,j)=>n!==j+1))
        throw new Error('FAQ citation markers must be numbered (1)..('+citations.length+') on '+sourcePath);
      const sources=citations.map((reference,j)=>{
        const href=reference?.url, label=reference?.name;
        if(typeof href!=='string' || !/^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/blob\/[\w.-]+\/[\w./-]+$/.test(href))
          throw new Error('Invalid FAQ source URL '+(j+1)+' on '+sourcePath);
        if(typeof label!=='string' || !label.trim())throw new Error('Missing FAQ source label on '+sourcePath);
        return {href,label};
      });
      for(const part of answer.split(/(\(\d+\))/g).filter(Boolean)){
        const m=part.match(/^\((\d+)\)$/);
        answerSegments.push(m?{text:part,...sources[Number(m[1])-1]}:{text:part});
      }
    }else answerSegments.push({text:answer});
    return {question,answer,answerSegments};
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
