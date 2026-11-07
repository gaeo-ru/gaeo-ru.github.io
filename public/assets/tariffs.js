/* Accessible progressive enhancement. Prices are supplied by the canonical build-time model. */
(()=>{
 document.querySelectorAll('[data-tariff-calculator]').forEach(root=>{
  const config=JSON.parse(root.querySelector('[data-tariff-config]').textContent);
  const en=config.lang==='en',format=n=>en?'RUB '+n.toLocaleString('en-US'):n.toLocaleString('ru-RU')+' ₽';
  const planSelect=root.querySelector('[name="plan"]'),blocksInput=root.querySelector('[name="blocks"]');
  function update(){
   const plan=config.plans.find(p=>p.id===planSelect.value)||config.plans[0];
   const checked=[...root.querySelectorAll('[name="platform"]:checked')];
   const blocks=Math.max(0,Math.min(100,Math.trunc(Number(blocksInput.value)||0)));
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
  root.addEventListener('input',update);
  root.addEventListener('change',()=>{blocksInput.value=String(Math.max(0,Math.min(100,Math.trunc(Number(blocksInput.value)||0))));update();});
  update();
 });
})();
