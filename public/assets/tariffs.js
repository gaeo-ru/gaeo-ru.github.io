/* Accessible progressive enhancement. Prices are supplied by the canonical build-time model. */
(()=>{
 document.querySelectorAll('[data-tariff-calculator]').forEach(root=>{
  const config=JSON.parse(root.querySelector('[data-tariff-config]').textContent);
  const en=config.lang==='en',format=n=>en?'RUB '+n.toLocaleString('en-US'):n.toLocaleString('ru-RU')+' ₽';
  const planSelect=root.querySelector('[name="plan"]'),blocksInput=root.querySelector('[name="blocks"]');
  const clampBlocks=()=>Math.max(0,Math.min(100,Math.trunc(Number(blocksInput.value)||0)));
  function update(){
   const plan=config.plans.find(p=>p.id===planSelect.value)||config.plans[0];
   const checked=[...root.querySelectorAll('[name="platform"]:checked')];
   const blocks=clampBlocks();
   root.querySelector('[data-prompt-adjust="-1"]').disabled=blocks===0;
   root.querySelector('[data-prompt-adjust="1"]').disabled=blocks===100;
   const count=checked.length,extra=Math.max(0,count-config.basePlatforms),prompts=config.basePrompts+blocks*config.promptBlock;
   const platformsCost=extra*config.platformPrice,promptsCost=blocks*config.promptPrice,total=plan.amount+platformsCost+promptsCost;
   root.querySelector('[data-base]').textContent=format(plan.amount);
   root.querySelector('[data-platform-price]').textContent=format(platformsCost);
   root.querySelector('[data-prompt-price]').textContent=format(promptsCost);
   root.querySelector('[data-total]').textContent=format(total);
   root.querySelector('[data-scope]').textContent=en?`${prompts} prompts · ${count} selected platforms`:`${prompts} запросов · выбрано нейросетей: ${count}`;
   root.querySelector('[data-platform-count]').textContent=en?`${count} selected. ${extra} additional. ${count<5?'The plan includes 5; the remaining choices can be agreed before launch.':''}`:`Выбрано ${count}. Дополнительных: ${extra}. ${count<5?'В тариф входит 5, оставшиеся согласуем до начала работ.':''}`;
   const names=checked.map(input=>input.parentElement.querySelector('span').textContent).join(', ');
   root.querySelector('[data-quote-inquiry]').dataset.gaeoRequest=en?`GEO estimate: ${plan.name}. ${prompts} prompts. Platforms: ${names||'to be agreed'}. Additional platforms: ${extra}; additional prompt blocks: ${blocks}. From ${format(total)}/month.`:`Расчет GEO: ${plan.name}. ${prompts} запросов. Нейросети: ${names||'согласуем'}. Дополнительных нейросетей: ${extra}; пакетов запросов: ${blocks}. От ${format(total)}/мес.`;
  }
  root.addEventListener('click',event=>{
   const button=event.target.closest('[data-prompt-adjust]');
   if(!button||!root.contains(button))return;
   blocksInput.value=String(Math.max(0,Math.min(100,clampBlocks()+Number(button.dataset.promptAdjust))));
   update();
  });
  root.addEventListener('input',update);
  root.addEventListener('change',()=>{blocksInput.value=String(clampBlocks());update();});
  update();
 });

 /* Align both CTA controls in each desktop row with the longest tariff card.
    The baseline is recalculated after font loading, resizing, and card toggles. */
 const alignTariffRows=()=>{
  for(const grid of document.querySelectorAll('.tariff-plans')){
   const cards=[...grid.children].filter(el=>el.matches('details.tariff-plan[open]'));
   for(const card of cards)card.querySelector('.tariff-actions').style.marginTop='';
   if(window.innerWidth>720){
    const rows=[];
    for(const card of cards){
     const top=card.getBoundingClientRect().top;
     let row=rows.find(items=>Math.abs(items[0].getBoundingClientRect().top-top)<2);
     if(!row){row=[];rows.push(row)}
     row.push(card);
    }
    for(const row of rows){
     if(row.length<2)continue;
     const buttons=row.map(card=>card.querySelector('.tariff-actions .button'));
     const tops=buttons.map(button=>button.getBoundingClientRect().top);
     const lowest=Math.max(...tops);
     row.forEach((card,i)=>{
      const offset=Math.max(0,lowest-tops[i]);
      if(offset>.5)card.querySelector('.tariff-actions').style.marginTop=offset+'px';
     });
    }
   }
   grid.dataset.ctaAligned='true';
  }
 };
 let alignQueued=false;
 const scheduleAlignment=()=>{
  if(alignQueued)return;
  alignQueued=true;
  window.requestAnimationFrame(()=>{alignQueued=false;alignTariffRows()});
 };
 scheduleAlignment();
 document.fonts?.ready.then(scheduleAlignment);
 window.addEventListener('resize',scheduleAlignment);
 document.querySelectorAll('.tariff-plans details.tariff-plan').forEach(card=>{
  card.addEventListener('toggle',scheduleAlignment);
 });
})();
