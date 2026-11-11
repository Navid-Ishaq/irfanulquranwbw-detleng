/* Irfan-ul-Quran Para / quarter selector.
   Original DeTLeng app.js, handleFile, parseDocx and study functions are not modified. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const grid = $('paraGrid');
  const modal = $('quarterDialog');
  const coming = $('comingSoonDialog');
  const notice = $('paraLanguageNotice');
  const quarterLabels = [
    ['First Quarter', 'پہلا ربع'],
    ['Second Quarter', 'نصف'],
    ['Third Quarter', 'تیسرا ربع'],
    ['Fourth Quarter', 'آخری ربع']
  ];
  let selectedPara = 1;
  let selectedQuarter = 1;
  let requestId = 0;
  let lastFocus = null;
  const pad = n => String(n).padStart(2, '0');
  let selectedLanguage = 'bilingual';
  const languages = {
    bilingual: {label:'Urdu + English',folder:'verse-bilingual',prefix:'IQV'},
    urdu: {label:'Urdu Only',folder:'verse-urdu',prefix:'UR-IQV'},
    english: {label:'English Only',folder:'verse-english',prefix:'EN-IQV'}
  };
  const filename = (p,q) => `${languages[selectedLanguage].prefix}-Para-${pad(p)}-${pad(q)}.docx`;
  window.iqCurrentLanguage = () => selectedLanguage;

  function renderParaGrid() {
    const frag = document.createDocumentFragment();
    for (let p = 1; p <= 30; p++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'para-card';
      btn.dataset.para = String(p);
      btn.setAttribute('aria-label', `Para ${pad(p)}, choose learning section`);
      btn.innerHTML = `<span class="para-number">${pad(p)}</span><span class="para-word" lang="ur" dir="rtl">پارہ</span>`;
      btn.addEventListener('click', () => openQuarter(p));
      frag.append(btn);
    }
    grid.replaceChildren(frag);
  }
  function renderQuarters() {
    $('quarterTitle').textContent = `Para ${pad(selectedPara)} — Select Learning Section`;
    $('quarterOptions').replaceChildren();
    quarterLabels.forEach(([eng, ur], i) => {
      const quarter = i + 1;
      const label = document.createElement('label');
      label.className = 'iq-quarter-option';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'learningQuarter';
      radio.value = String(quarter);
      radio.checked = selectedQuarter === quarter;
      radio.addEventListener('change', () => {
        selectedQuarter = quarter;
        syncQuarterSelection();
      });
      const span = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = eng;
      const urdu = document.createElement('span');
      urdu.lang = 'ur'; urdu.dir = 'rtl'; urdu.className = 'iq-urdu-label'; urdu.textContent = ur;
      span.append(strong, urdu);
      label.append(radio, span);
      $('quarterOptions').append(label);
    });
    syncQuarterSelection();
  }
  function syncQuarterSelection() {
    $('selectedFileName').textContent = filename(selectedPara, selectedQuarter);
    $('quarterOptions').querySelectorAll('.iq-quarter-option').forEach((label, i) => label.classList.toggle('is-selected', i + 1 === selectedQuarter));
  }
  function openQuarter(para) {
    requestId++;
    selectedPara = para;
    selectedQuarter = 1;
    lastFocus = document.activeElement;
    $('quarterStatus').textContent = '';
    $('continueLearning').disabled = false;
    $('continueLearning').textContent = 'Continue to Learning →';
    renderQuarters();
    modal.showModal();
    $('quarterOptions').querySelector('input').focus();
  }
  function closeQuarter() {
    if (modal.open) modal.close();
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
  }
  function showComingSoon(details) {
    $('comingSoonDetail').textContent = details || 'This learning section is being carefully prepared. Insha Allah, its flashcards will be available in a future update.';
    if (!coming.open) coming.showModal();
  }
  async function loadQuarter() {
    const p = selectedPara, q = selectedQuarter;
    const fileName = filename(p, q);
    const currentLanguage = selectedLanguage;
    const request = ++requestId;
    const button = $('continueLearning');
    button.disabled = true;
    button.textContent = 'Loading section…';
    $('quarterStatus').textContent = `Opening ${fileName}…`;
    try {
      const response = await fetch(`data/${languages[currentLanguage].folder}/${fileName}`, {cache: 'no-cache'});
      if (!response.ok) {
        if (response.status === 404) throw new Error('not-ready');
        throw new Error(`The file could not be downloaded (HTTP ${response.status}).`);
      }
      const blob = await response.blob();
      if (request !== requestId) return;
      if (blob.size < 200) throw new Error('not-ready');
      // Only a preflight: check the real, unmodified parser can find valid rows.
      // An empty template is Coming Soon rather than showing blank quiz cards.
      let rows;
      try { rows = await parseDocx(await blob.arrayBuffer()); }
      catch (e) {
        // All parser validation failures are treated as not-ready, including empty templates.
        console.info('Section not ready:', fileName, e.message);
        throw new Error('not-ready');
      }
      if (!Array.isArray(rows) || rows.length === 0) throw new Error('not-ready');
      if (request !== requestId) return;
      const file = new File([blob], fileName, {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      // Original, tested data path. No changes to parsing or flashcard behavior.
      await handleFile(file);
      if (request !== requestId) return;
      if ($('fileSummary').classList.contains('hidden')) throw new Error('The Word document could not be opened.');
      $('selectedParaLabel').textContent = `Para ${pad(p)} · ${quarterLabels[q - 1][0]} · ${languages[currentLanguage].label}`;
      window.dispatchEvent(new CustomEvent('iq:section-loaded',{detail:{para:p,quarter:q,language:currentLanguage}}));
      grid.querySelectorAll('.para-card').forEach(x => x.classList.toggle('selected', Number(x.dataset.para) === p));
      notice.textContent = `Para ${pad(p)}, ${quarterLabels[q - 1][0]} is ready. Choose a question range or group below.`;
      closeQuarter();
      $('workspace').scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (error) {
      if (request !== requestId) return;
      if (error.message === 'not-ready') {
        closeQuarter();
        showComingSoon(`Para ${pad(p)} · ${quarterLabels[q - 1][0]} is being prepared. Insha Allah, this learning section will be available in a future update. Please remember this project in your duas.`);
      } else {
        $('quarterStatus').textContent = error.message;
        console.error('DOCX loading issue:', error);
      }
    } finally {
      if (request === requestId) {
        button.disabled = false;
        button.textContent = 'Continue to Learning →';
      }
    }
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    if (selectedLanguage === button.dataset.language) return;
    selectedLanguage = button.dataset.language;
    requestId++;
    document.querySelectorAll('[data-language]').forEach(b=>{
      const active=b.dataset.language===selectedLanguage;
      b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));
    });
    notice.textContent = `${languages[selectedLanguage].label} selected. Choose a Para and learning section.`;
    if (modal.open) syncQuarterSelection();
    window.dispatchEvent(new CustomEvent('iq:language-changed',{detail:{language:selectedLanguage}}));
  }));
  $('wordFutureBtn').addEventListener('click',()=>{
    showComingSoon('Our Word-by-Word Qur’anic vocabulary learning experience is planned for a future phase. For now, explore Verse-by-Verse learning and strengthen your understanding of the Holy Qur’an, one Ayat at a time.');
  });
  $('verseModeBtn').addEventListener('click',()=>document.querySelector('.iq-language-picker').scrollIntoView({behavior:'smooth',block:'center'}));
  $('closeQuarter').addEventListener('click', closeQuarter);
  modal.addEventListener('click', e => { if (e.target === modal) closeQuarter(); });
  $('continueLearning').addEventListener('click', loadQuarter);
  $('changeParaBtn').addEventListener('click', () => {
    $('learn').scrollIntoView({behavior: 'smooth', block: 'start'});
    const current = grid.querySelector('.para-card.selected');
    if (current) current.focus({preventScroll: true});
  });
  $('closeComingSoon').addEventListener('click', () => coming.close());
  $('okayComingSoon').addEventListener('click', () => coming.close());
  coming.addEventListener('click', e => { if (e.target === coming) coming.close(); });
  renderParaGrid();
})();
