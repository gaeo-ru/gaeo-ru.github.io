/* Accessible progressive enhancement. Prices are supplied by the canonical build-time model. */
(()=>{
 document.querySelectorAll('[data-tariff-calculator]').forEach(root=>{
  const config=JSON.parse(root.querySelector('[data-tariff-config]').textContent);
  const en=config.lang==='en',format=n=>en?'RUB '+n.toLocaleString('en-US'):n.toLocaleString('ru-RU')+' ₽';
  const planSelect=root.querySelector('[name="plan"]'),blocksInput=root.querySelector('[name="blocks"]');
  const clampBlocks=()=>Math.max(0,Math.min(100,Math.trunc(Number(blocksInput.value)||0)));
  // Enhance the native selector only after installing all handlers.
  const picker=root.querySelector('[data-plan-picker]');
  if(picker){
   const trigger=picker.querySelector('[data-plan-trigger]');
   const choicesPanel=picker.querySelector('[data-plan-options]');
   const current=picker.querySelector('[data-plan-current]');
   const choices=[...picker.querySelectorAll('[data-plan-choice]')];
   const syncPicker=()=>{
    const plan=config.plans.find(p=>p.id===planSelect.value)||config.plans[0];
    current.textContent=plan.name;
    choices.forEach(choice=>choice.setAttribute('aria-selected',String(choice.dataset.planChoice===plan.id)));
   };
   const closePicker=(focusTrigger=false)=>{
    choicesPanel.hidden=true;
    trigger.setAttribute('aria-expanded','false');
    if(focusTrigger)trigger.focus();
   };
   const openPicker=(focusChoice=false)=>{
    choicesPanel.hidden=false;
    trigger.setAttribute('aria-expanded','true');
    if(focusChoice)(choices.find(choice=>choice.dataset.planChoice===planSelect.value)||choices[0]).focus();
   };
   trigger.addEventListener('click',()=>{
    if(choicesPanel.hidden)openPicker();else closePicker();
   });
   picker.addEventListener('click',event=>{
    const choice=event.target.closest('[data-plan-choice]');
    if(!choice||!picker.contains(choice))return;
    planSelect.value=choice.dataset.planChoice;
    syncPicker();
    closePicker(true);
    planSelect.dispatchEvent(new Event('change',{bubbles:true}));
   });
   picker.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
     if(!choicesPanel.hidden){event.preventDefault();closePicker(true);}
     return;
    }
    if(event.key==='Tab'){closePicker();return;}
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    event.preventDefault();
    if(choicesPanel.hidden)openPicker();
    const activeIndex=choices.indexOf(document.activeElement);
    const selectedIndex=choices.findIndex(choice=>choice.dataset.planChoice===planSelect.value);
    const index=activeIndex<0?Math.max(0,selectedIndex):activeIndex;
    const next=event.key==='Home'?0:event.key==='End'?choices.length-1:
     activeIndex<0?index:event.key==='ArrowDown'?(index+1)%choices.length:(index+choices.length-1)%choices.length;
    choices[next].focus();
   });
   picker.addEventListener('focusout',()=>{
    requestAnimationFrame(()=>{if(!picker.contains(document.activeElement))closePicker();});
   });
   document.addEventListener('pointerdown',event=>{
    if(!picker.contains(event.target))closePicker();
   });
   planSelect.addEventListener('change',syncPicker);
   syncPicker();
   planSelect.hidden=true;
   picker.hidden=false;
  }
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
   root.querySelector('[data-quote-inquiry]').dataset.gaeoRequest=en?`GEO estimate: ${plan.name}. ${prompts} prompts. Platforms: ${names||'to be agreed'}. Additional platforms: ${extra}; additional prompt blocks: ${blocks}. From ${format(total)}/month.`:`Расчет продвижения в нейросетях: ${plan.name}. ${prompts} запросов. Нейросети: ${names||'согласуем'}. Дополнительных нейросетей: ${extra}; пакетов запросов: ${blocks}. От ${format(total)}/мес.`;
   // Return only stable, non-personal dimensions. The detailed scope
   // is used only to prefill the real lead form, not to report analytics.
   return {
    key:plan.id+'|'+checked.map(input=>input.value).sort().join(',')+'|'+blocks,
    params:{plan_id:plan.id,platform_count:count,prompt_blocks:blocks,total_amount:total,lang:config.lang}
   };
  }
  let lastCommittedCalculation=update().key;
  function emitCalculationGoal(goalName){
   const state=update();
   if(state.key===lastCommittedCalculation)return;
   lastCommittedCalculation=state.key;
   if(window.GAEOAnalytics && typeof window.GAEOAnalytics.goal==='function'){
    window.GAEOAnalytics.goal(goalName,state.params);
   }
  }
  root.addEventListener('click',event=>{
   const button=event.target.closest('[data-prompt-adjust]');
   if(!button||!root.contains(button))return;
   blocksInput.value=String(Math.max(0,Math.min(100,clampBlocks()+Number(button.dataset.promptAdjust))));
   emitCalculationGoal('tariff_calculation_change');
  });
  root.addEventListener('input',update);
  root.addEventListener('change',event=>{
   blocksInput.value=String(clampBlocks());
   emitCalculationGoal(event.target===planSelect?'tariff_plan_select':'tariff_calculation_change');
  });
 });

 /* Align both CTA controls in each desktop row with the longest tariff card.
    The baseline is recalculated after font loading, resizing, and card toggles. */
 const alignTariffRows=()=>{
  for(const grid of document.querySelectorAll('.tariff-plans')){
   const cards=[...grid.children].filter(el=>el.matches('details.tariff-plan[open]'));
   for(const card of cards)card.querySelector('.tariff-actions').style.transform='';
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
      if(offset>.5)card.querySelector('.tariff-actions').style.transform='translateY('+offset+'px)';
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
