/* Page flow only. Original DOCX parser, deck construction and scoring in app.js remain unchanged. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  function stage(name, scroll = true) {
    document.body.classList.remove('iq-stage-selection','iq-stage-groups','iq-stage-practice');
    document.body.classList.add('iq-stage-' + name);
    const heading = document.querySelector('#workspace .section-head h2');
    if (heading) heading.textContent = name === 'groups' ? 'Choose Your Question Group' : 'Practice Each Ayat';
    if (scroll) {
      const target = name === 'selection' ? $('learn') : $('workspace');
      if (target) requestAnimationFrame(() => target.scrollIntoView({behavior:'smooth',block:'start'}));
    }
    window.iqExperienceStage = name;
  }
  window.iqShowStage = stage;
  // Wrap presentation transition; original createDeck still builds/resumes the questions.
  const originalCreateDeck = window.createDeck;
  if (typeof originalCreateDeck === 'function') {
    window.createDeck = function (...args) {
      const result = originalCreateDeck.apply(this,args);
      const feedback = $('status')?.textContent || '';
      if (/^(Ready!|Resumed )/.test(feedback)) stage('practice');
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', () => {
    stage('selection',false);
    window.addEventListener('iq:section-loaded',()=>stage('groups'));
    window.addEventListener('iq:language-changed',()=>stage('selection',false));
    $('backToGroupsBtn').addEventListener('click',()=>stage('groups'));
    $('groupsToParasBtn').addEventListener('click',()=>stage('selection'));
    const safeRestart = $('restartSafeBtn');
    safeRestart.addEventListener('click',()=>{
      if (window.confirm('Restart this question set? Your current attempt and its saved answers will be reset. This cannot be undone.')) $('restartBtn').click();
    });
    const changePara = $('changeParaBtn');
    changePara.addEventListener('click',()=>stage('selection',false));
    // The built-in keyboard handler is preserved; only avoid collisions in views without cards.
    document.addEventListener('keydown', e => {
      if (window.iqExperienceStage !== 'practice' && ['ArrowRight','ArrowLeft','Space'].includes(e.code) && e.target === document.body) {
        e.stopImmediatePropagation();
      }
    },true);
  });
})();
