/* Presentation-only enhancements. The original app.js / DOCX parsing / scoring remain untouched. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const AR = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
  const extraneousCircle = /([\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff])\s*[Oo○◯](?=\s*(?:$|[–—-]\s))/g;
  // O/o is a converter artifact when immediately following Arabic script. Preserve real punctuation/harakat.
  function cleanDisplay(value) {
    return String(value).replace(extraneousCircle, '$1').trim();
  }
  function separateLanguages(value) {
    const clean = cleanDisplay(value);
    const breaks = /\s+[–—]\s+/g;
    for (const m of clean.matchAll(breaks)) {
      const left = clean.slice(0,m.index).trim();
      const right = clean.slice(m.index+m[0].length).trim();
      if (AR.test(left) && /[a-zA-Z]/.test(right) && left && right) {
        return { urdu:cleanDisplay(left), english:cleanDisplay(right) };
      }
    }
    return null;
  }
  function span(cls, value, attrs={}) {
    const result=document.createElement('span');
    result.className=cls;
    result.textContent=value;
    for(const [name,val] of Object.entries(attrs)) result.setAttribute(name,val);
    return result;
  }
  function fillTranslation(el, value) {
    const pair=separateLanguages(value);
    el.replaceChildren();
    if(pair) {
      el.classList.add('iq-bilingual-content');
      el.append(span('iq-translation-urdu',pair.urdu,{lang:'ur',dir:'rtl'}));
      el.append(span('iq-translation-english',pair.english,{lang:'en'}));
    } else {
      el.classList.remove('iq-bilingual-content');
      const content=cleanDisplay(value);
      const lang=AR.test(content)?'ur':'en';
      el.append(span(lang==='ur'?'iq-translation-urdu':'iq-translation-english',content,{lang,dir:lang==='ur'?'rtl':'ltr'}));
    }
  }
  function decorateCard() {
    const root=$('cardContent');
    if(!root) return;
    const heading=root.querySelector('.question-text');
    if(heading) {
      const text=cleanDisplay(heading.textContent);
      const match=text.match(/^(P\d+\s*[-–—]\s*S\d+\s*[-–—]\s*\d+)\s*[-–—]\s*([\s\S]+)$/i);
      heading.replaceChildren();
      heading.classList.add('iq-question-display');
      if(match) {
        heading.append(span('iq-arabic-verse',cleanDisplay(match[2]),{lang:'ar',dir:'rtl'}));
        heading.append(span('iq-verse-reference',match[1].replace(/\s+/g,'')));
      } else {
        heading.append(span('iq-arabic-verse',text,{dir:AR.test(text)?'rtl':'auto'}));
      }
    }
    root.querySelectorAll('.option').forEach(button=>{
      const parts=[...button.children];
      const label=parts.find(n=>n.classList?.contains('option-letter'));
      const textPart=parts.find(n=>n!==label);
      if(!textPart) return;
      const original=textPart.textContent;
      textPart.classList.add('iq-option-meaning');
      fillTranslation(textPart,original);
    });
    const answer=root.querySelector('.answer-value');
    if(answer){
      const value=answer.textContent;
      const answerLabel=value.match(/^([ABC])\.\s+/);
      answer.replaceChildren();
      if(answerLabel){ answer.append(span('iq-answer-letter',answerLabel[1]+'.')); }
      const body=span('iq-answer-meaning','');
      fillTranslation(body,answerLabel?value.slice(answerLabel[0].length):value);
      answer.append(body);
    }
  }
  function decorateFileSummary(){
    const el=$('fileSummary');if(!el)return;
    if(!/\.docx\b/i.test(el.textContent))return;
    const found=el.textContent.match(/(\d+) question\(s\) extracted[^\d]*Numbers\s*(\d+)[–-](\d+)/i);
    const title=document.createElement('strong');title.textContent='✓ Learning section ready';
    const details=document.createElement('span');
    details.textContent=found?`${found[1]} Ayat questions · ${found[2]}–${found[3]}`:'Ready for practice';
    el.replaceChildren(title,document.createElement('br'),details);
  }
  function clamp(v) {return Math.max(18,Math.min(40,Math.round(v/2)*2));}
  function initReading(){
    const slider=$('iqReadSlider');if(!slider)return;
    let initial=28;
    try {initial=clamp(Number(localStorage.getItem('iq-reading-size')||28));}catch{}
    function set(value){
      const size=clamp(Number(value)||28);
      document.documentElement.style.setProperty('--iq-reading-size',size+'px');
      slider.value=size;
      $('iqReadValue').textContent=size+'px';
      try{localStorage.setItem('iq-reading-size',String(size));}catch{}
    }
    slider.addEventListener('input',()=>set(slider.value));
    $('iqReadMinus').addEventListener('click',()=>set(Number(slider.value)-2));
    $('iqReadPlus').addEventListener('click',()=>set(Number(slider.value)+2));
    $('iqReadReset').addEventListener('click',()=>set(28));
    set(initial);
  }
  function initMotivation(){
    const buttons=document.querySelectorAll('[data-iq-motivation]');
    for(const button of buttons){
      button.addEventListener('click',()=>{
        const language=button.dataset.iqMotivation;
        for(const b of buttons){const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
        $('iqMotivationUrdu').hidden=language!=='urdu';
        $('iqMotivationEnglish').hidden=language!=='english';
      });
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    initReading();initMotivation();
    const area=$('cardContent');
    if(area){
      new MutationObserver(()=>decorateCard()).observe(area,{childList:true,subtree:false});
      decorateCard();
    }
    const summary=$('fileSummary');
    if(summary){new MutationObserver(decorateFileSummary).observe(summary,{childList:true,subtree:false});decorateFileSummary();}
  });
})();
