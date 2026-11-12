(() => {
  'use strict';
  const steps=[
    ['Choose Verse by Verse','On Learn & Practice, choose Verse by Verse. Word by Word is a future learning project, Insha Allah.'],
    ['Choose your preferred translation','Select Urdu + English, Urdu Only, or English Only. Each translation collection has its own learning material.'],
    ['Select a Para and one of four sections','Choose one of the 30 Paras and then select First, Second, Third or Fourth Quarter to begin.'],
    ['Choose a question range or group','Choose All or one of the smaller question groups. You can adjust the start and end numbers, then select Generate Flashcards.'],
    ['Practise each Ayat with comfortable reading size','Choose MCQ or Classic Flashcard, then Learning or Test Mode. Use the Reading Size slider, −, + or Reset to adjust Arabic and translation text.'],
    ['Review and switch groups safely','Use Previous, Next and the question navigation grid to practise. Back to Question Groups takes you to another set. Restart asks for confirmation before discarding the current attempt.']
  ];
  const $=id=>document.getElementById(id);
  let current=0;
  function showStep(index){
    current=Math.max(0,Math.min(steps.length-1,index));
    $('iqGuideCount').textContent=`STEP ${current+1} OF ${steps.length}`;
    $('iqGuideTitle').textContent=steps[current][0];
    $('iqGuideDescription').textContent=steps[current][1];
    $('iqGuidePrevious').disabled=current===0;
    $('iqGuideNext').disabled=current===steps.length-1;
    document.querySelectorAll('[data-iq-guide-step]').forEach(button=>{const active=Number(button.dataset.iqGuideStep)===current;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  }
  function embedVideo(){
    const url=window.DETLENG_TUTORIAL_URL;
    if(typeof url!=='string'||!url.trim())return;
    let parsed;
    try{parsed=new URL(url.trim());}catch{return;}
    let id='';
    if(['www.youtube.com','youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(parsed.hostname)){
      id=parsed.searchParams.get('v')||'';
      if(!id&&parsed.pathname.startsWith('/shorts/'))id=parsed.pathname.split('/')[2]||'';
      if(!id&&parsed.pathname.startsWith('/embed/'))id=parsed.pathname.split('/')[2]||'';
    } else if(parsed.hostname==='youtu.be'||parsed.hostname==='www.youtu.be') id=parsed.pathname.slice(1).split('/')[0];
    if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube-nocookie.com/embed/${id}`;
    iframe.title='Irfan-ul-Quran video learning guide';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    iframe.loading='lazy';
    $('iqVideoSlot').replaceChildren(iframe);
    $('iqVideoYoutube').href=`https://www.youtube.com/watch?v=${id}`;
    $('iqVideoYoutube').hidden=false;
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-iq-guide-step]').forEach(b=>b.addEventListener('click',()=>showStep(Number(b.dataset.iqGuideStep))));
    $('iqGuidePrevious').addEventListener('click',()=>showStep(current-1));
    $('iqGuideNext').addEventListener('click',()=>showStep(current+1));
    $('guideMenuToggle').addEventListener('click',()=>{const n=$('guideNav');n.classList.toggle('open');$('guideMenuToggle').setAttribute('aria-expanded',String(n.classList.contains('open')))});
    $('guideThemeBtn').addEventListener('click',()=>{document.body.classList.toggle('dark');$('guideThemeBtn').textContent=document.body.classList.contains('dark')?'☀':'☾'});
    showStep(0);embedVideo();
  });
})();
