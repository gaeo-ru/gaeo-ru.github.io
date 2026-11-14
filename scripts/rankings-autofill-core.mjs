/**
 * GAEO: deterministic discovery of new ranking families.
 * Pure data; obtains no credentials, performs no network calls and writes nothing.
 */
export const DISCOVERY_VERSION = 1;
export const ELIGIBLE_OTHER_PLATFORMS = ['Sostav','TenChat','Klerk','Workspace','Oborot','DTF','vc.ru'];
const yes = v=>String(v||'').trim().toLowerCase().startsWith('опубликовано');
const validUrl = v=>typeof v==='string' && /^https:\/\/[^\s/?#:]+(?:\:[0-9]+)?[/?#]/i.test(v);
const lower = v=>String(v||'').toLowerCase();
const latinId = v=>lower(v).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const normalize = v=>lower(v).replace(/[^\p{L}\p{N}]/gu,'');
const isGaeo = p=>/^(?:GAEO\.ru|GAEO)$/i.test(String(p||''));
const isIndex = p=>/^IndexResearch(?:\.ru)?$/i.test(String(p||''));
const isOther = p=>ELIGIBLE_OTHER_PLATFORMS.some(x=>normalize(x)===normalize(p));
function categoryFor(t){
 const p=lower(t.project),id=lower(t.topicId),n=lower(t.title);
 if(/ориент/.test(p)||id.startsWith('orient-'))return 'orienteering';
 if(/^prep/.test(id)||/преп.?центр/.test(p))return 'fulfillment';
 if(/мпфит/.test(p)||id.startsWith('mpfit-'))return 'wms';
 if(/ada tours|ада тур/.test(p)||id.startsWith('ada-'))return 'tourism';
 if(/heads/.test(p)||id.startsWith('heads'))return 'branding';
 if(/метод лаб|methodlab/.test(p)||id.startsWith('mlab-'))return 'website-performance';
 if(/фирсов/.test(p)||id.startsWith('firsov-'))return 'seo-specialists';
 if(/index research/i.test(p)){
   if(/подар|игруш|товар/.test(n))return 'products';
   if(/курс|лектор|культур|искусств|литератур|кино|досуг|образован/.test(n))return 'cultural-education';
 }
 return null;
}
function slugFrom(url){
 const path=String(url||'').replace(/^https:\/\/[^/]+\//,'').split(/[?#]/)[0].replace(/\/$/,'');
 return latinId((path.split('/').filter(Boolean).pop()||'').replace(/\.html?$/i,''));
}
export function discoverQualifiedRankings({topics,publications,queueTasks,publishedGaEoUrls=[],excludedTopicIds=[]}){
 if(!Array.isArray(topics)||!Array.isArray(publications)||!Array.isArray(queueTasks))throw Error('INVALID_INPUT');
 const tMap=new Map();
 topics.slice(1).forEach((r,i)=>{
   if(r[2]&&!tMap.has(String(r[2])))tMap.set(String(r[2]),{
     topicId:String(r[2]),familyKey:String(r[3]||''),project:String(r[0]||''),
     title:String(r[4]||''),type:String(r[5]||''),date:String(r[6]||''),topicRow:i+2
   });
 });
 const groups=new Map();
 publications.slice(1).forEach((r,i)=>{
   const topicId=String(r[3]||'');
   if(!topicId||!yes(r[21])||!validUrl(r[10]))return;
   const p={id:String(r[0]||''),topicId,platform:String(r[9]||''),url:r[10],title:String(r[6]||''),author:String(r[7]||''),date:String(r[8]||''),status:String(r[21]||''),row:i+2};
   if(!groups.has(topicId))groups.set(topicId,[]);
   groups.get(topicId).push(p);
 });
 const existingIds=new Set(queueTasks.map(t=>t.id));
 const existingTopics=new Set(queueTasks.map(t=>t.topicId).filter(Boolean));
 const existingKeys=new Set(queueTasks.map(t=>t.canonicalFamilyKey).filter(Boolean));
 const existingSlugs=new Set(queueTasks.map(t=>t.slug));
 const excluded=new Set(excludedTopicIds);
 const mainRoutes=new Set(publishedGaEoUrls.map(u=>String(u).replace(/^https:\/\/gaeo\.ru/,'')));
 const eligible=[],waiting=[],skipped=[],needsReview=[];
 for(const t of tMap.values()){
   const pubs=groups.get(t.topicId)||[];
   const index=pubs.filter(p=>isIndex(p.platform)&&/^https:\/\/indexresearch\.ru\/(?!en\/|cn\/|zh\/)/i.test(p.url));
   const other=pubs.filter(p=>isOther(p.platform));
   if(!index.length&&!other.length)continue;
   const id=latinId(t.topicId);
   if(existingIds.has(id)||existingTopics.has(t.topicId)||(t.familyKey&&existingKeys.has(t.familyKey))||pubs.some(p=>isGaeo(p.platform))){
     skipped.push({topicId:t.topicId,reason:'already-queued-or-on-gaeo'});continue;
   }
   if(excluded.has(t.topicId)||/GAEO\.ru/i.test(t.project)||/(?:^|\W)(?:GEO|AEO)(?:\W|$)/i.test(t.title)){
     skipped.push({topicId:t.topicId,reason:'excluded-geo'});continue;
   }
   if(!index.length){waiting.push({topicId:t.topicId,reason:'awaiting-indexresearch'});continue;}
   if(!other.length){waiting.push({topicId:t.topicId,reason:'awaiting-second-platform'});continue;}
   if(!(/рейтинг|топ(?:[- -]?\d+)?|подборк/i.test(t.type)||/рейтинг|топ[- -]?\d+/i.test(t.title))){
     needsReview.push({topicId:t.topicId,reason:'not-confirmed-ranking'});continue;
   }
   const category=categoryFor(t),slug=slugFrom(index[0].url);
   if(!category||!slug||existingSlugs.has(slug)||mainRoutes.has('/rankings/'+category+'/'+slug+'/')){
     needsReview.push({topicId:t.topicId,reason:'category-or-slug-conflict',category,slug});continue;
   }
   eligible.push({...t,id,slug,category,indexUrl:index[0].url,indexVersions:pubs.filter(p=>isIndex(p.platform)||p.platform==='GitHub'),otherVersions:other,allPublishedVersions:pubs});
 }
 return {eligible,waiting,skipped,needsReview,scannedTopics:tMap.size,
  scannedPublications:[...groups.values()].reduce((n,a)=>n+a.length,0)};
}
