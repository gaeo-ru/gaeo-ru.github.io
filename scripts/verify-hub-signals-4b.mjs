/**
 * GAEO 4B, read-only evidence check. No website POST, fake leads, or paid measurements.
 * Dry run is CI-safe and explicitly does not certify Metrika or indexing.
 * Authorized runs require credentials only in environment variables.
 */
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {getIndustryCatalog} from '../src/data/industry-catalog.mjs';

const GOALS = ['lead_form_open', 'tariff_plan_select', 'tariff_calculation_change', 'industry_catalog_filter'];
const COUNTER_ID = 109744589;
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = (name, fallback) => {const n = args.indexOf(name); return n === -1 ? fallback : args[n + 1];};
const dry = has('--dry-run');
const output = resolve(value('--out', 'visual-hub-funnel/gaeo-phase4b-evidence.json'));
const today = new Date();
const fromDate = new Date(today.getTime() - 6 * 86400000).toISOString().slice(0, 10);
const from = value('--from', fromDate);
const to = value('--to', today.toISOString().slice(0, 10));
if (![from,to].every(d => /^\d{4}-\d{2}-\d{2}$/.test(d)) || from > to) throw Error('Date range must be YYYY-MM-DD and from <= to');
if (args.some((a,i) => ['--from','--to','--out','--limit'].includes(a) && !args[i + 1])) throw Error('Missing CLI flag value');
const inspectionLimit = Number(value('--limit','214'));
if (!Number.isInteger(inspectionLimit) || inspectionLimit < 1 || inspectionLimit > 214) throw Error('--limit must be 1..214');

const entries = [];
for (const lang of ['ru','en']) for (const item of getIndustryCatalog(lang)) {
  entries.push({id:item.number,lang,url:'https://gaeo.ru'+item.detailLink});
}
if (entries.length !== 214 || new Set(entries.map(x=>x.url)).size !== 214) throw Error('Catalog must contain exactly 214 unique RU/EN routes');

const report = {
  batch:'4B', mode:dry?'dry_run':'authorized_read_only', generated_at:new Date().toISOString(),
  disclaimer:'Technical indexability is not search indexing. Browser goal() calls are not proof of goal receipt. A zero reach count is not proof of defective tracking.',
  expected_routes:214, checked_period:{from,to},
  metrika:{counter_id:COUNTER_ID, status:'not_checked', goals:GOALS.map(name=>({name,configured:null,reaches:null})), goal_receipt_verified:false},
  search_console:{status:'not_checked', property:null, checked_urls:0, indexed:0, not_indexed:0, other_canonical:0, unknown:214, indexing_statuses_verified:false, routes:[]},
  errors:[],
};

async function json(url, token, options={}) {
  const resp=await fetch(url,{
    ...options, headers:{Authorization:'OAuth '+token,Accept:'application/json',...(options.headers||{})},
    signal:AbortSignal.timeout(20000),
  });
  if(!resp.ok) throw Error('HTTP '+resp.status+' ('+new URL(url).hostname+')');
  return resp.json();
}

async function checkMetrika(token){
  report.metrika.status='checked';
  const response=await json('https://api-metrika.yandex.net/management/v1/counter/'+COUNTER_ID+'/goals',token);
  if(!Array.isArray(response.goals)) throw Error('Metrika returned no goals array');
  let allObserved=true;
  for(const out of report.metrika.goals){
    const matching=response.goals.filter(g=>g.type==='action' && Array.isArray(g.conditions) && g.conditions.some(c=>c && c.type==='exact' && c.url===out.name));
    if(matching.length!==1){out.configured=false;out.configuration_issue=matching.length?'duplicate_matching_conditions':'goal_identifier_not_configured';allObserved=false;continue;}
    const target=matching[0];out.configured=true;out.goal_id=target.id;
    const qs=new URLSearchParams({id:String(COUNTER_ID),date1:from,date2:to,metrics:'ym:s:goal'+target.id+'reaches'});
    const stats=await json('https://api-metrika.yandex.net/stat/v1/data?'+qs,token);
    const reaches=stats.totals?.[0];
    if(typeof reaches!=='number' || !Number.isFinite(reaches) || reaches<0) throw Error('No numeric reaches for '+out.name);
    out.reaches=reaches;
    if(reaches===0) allObserved=false;
  }
  report.metrika.goal_receipt_verified=allObserved;
  report.metrika.status=allObserved?'all_four_goals_observed': 'incomplete_or_no_observed_reaches';
}

async function inspectUrl(entry, token, siteUrl){
  const resp=await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',{
    method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({inspectionUrl:entry.url,siteUrl}),signal:AbortSignal.timeout(20000),
  });
  if(!resp.ok) throw Error('Google Search Console HTTP '+resp.status);
  const result=(await resp.json()).inspectionResult?.indexStatusResult;
  if(!result) throw Error('No indexStatusResult for '+entry.url);
  const canon=result.googleCanonical || null;
  const comparison = s => String(s||'').replace(/\/$/,'');
  let status='unknown';
  if(result.verdict==='PASS') status=canon && comparison(canon)!==comparison(entry.url)?'other_canonical':'indexed';
  else if(['FAIL','NEUTRAL'].includes(result.verdict)) status='not_indexed';
  return {id:entry.id,lang:entry.lang,url:entry.url,status,verdict:result.verdict||null,
    coverage_state:result.coverageState||null,google_canonical:canon,last_crawl_time:result.lastCrawlTime||null};
}

async function checkGSC(token,siteUrl){
  if(!siteUrl || !(siteUrl==='sc-domain:gaeo.ru'||siteUrl==='https://gaeo.ru/')) throw Error('GSC_SITE_URL must be verified property sc-domain:gaeo.ru or https://gaeo.ru/');
  report.search_console.property=siteUrl;
  const targets=entries.slice(0,inspectionLimit);
  // Small batches respect quotas and stop quickly after account or API errors.
  for(let i=0;i<targets.length;i+=3){
    const batch=targets.slice(i,i+3);
    const rows=await Promise.all(batch.map(async item=>{
      try{return await inspectUrl(item,token,siteUrl);}catch(e){return {...item,status:'unknown',error:String(e.message||e)};}
    }));
    report.search_console.routes.push(...rows);
    if(rows.some(x=>x.error)) {report.errors.push('GSC inspection blocked after '+(i+rows.length)+' URLs; remaining statuses unknown');break;}
  }
  const ss=report.search_console;
  ss.checked_urls=ss.routes.filter(x=>!x.error).length;
  ss.indexed=ss.routes.filter(x=>x.status==='indexed').length;
  ss.not_indexed=ss.routes.filter(x=>x.status==='not_indexed').length;
  ss.other_canonical=ss.routes.filter(x=>x.status==='other_canonical').length;
  ss.unknown=214-ss.indexed-ss.not_indexed-ss.other_canonical;
  ss.indexing_statuses_verified=ss.checked_urls===214 && !report.errors.length;
  ss.status=ss.indexing_statuses_verified?'all_routes_inspected':ss.checked_urls?'partial_inspection':'failed_or_missing';
}

if(!dry){
  const mt=process.env.YANDEX_METRIKA_READ_TOKEN;
  const gt=process.env.GSC_READ_ACCESS_TOKEN;
  if(!mt&&!gt) throw Error('Set YANDEX_METRIKA_READ_TOKEN or GSC_READ_ACCESS_TOKEN, or use --dry-run');
  if(mt){try{await checkMetrika(mt);}catch(e){report.metrika.status='error';report.errors.push('Metrika: '+String(e.message||e));}}
  if(gt){try{await checkGSC(gt,process.env.GSC_SITE_URL);}catch(e){report.search_console.status='error';report.errors.push('GSC: '+String(e.message||e));}}
}
mkdirSync(dirname(output),{recursive:true});
writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log('GAEO 4B evidence: '+report.metrika.status+'; GSC '+report.search_console.checked_urls+'/214; indexed '+report.search_console.indexed+'; errors '+report.errors.length+'; '+output);
if(report.errors.length) process.exitCode=1;
