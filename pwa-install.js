/* Irfan-ul-Quran PWA install controls. Does not touch learning or scoring. */
(() => {
  'use strict';
  let deferredPrompt = null;
  const $ = id => document.getElementById(id);
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function sync() {
    const label = standalone() ? '✓ App Installed' : '↓ Install App';
    for (const id of ['iqPwaHeroBtn','iqPwaCardBtn']) {
      const b = $(id); if (b) b.textContent = label;
    }
  }
  function help() {
    const title=$('iqPwaHelpTitle'), message=$('iqPwaHelpText'), dialog=$('iqPwaHelpDialog');
    if (!title || !message) return;
    if (standalone()) {
      title.textContent='Already installed';
      message.textContent='You are using the installed Irfan-ul-Quran app. May your learning be blessed!';
    } else if (ios()) {
      title.textContent='Install on iPhone or iPad';
      message.textContent='Open this site in Safari, tap Share, choose Add to Home Screen, then tap Add.';
    } else {
      title.textContent='Install Irfan-ul-Quran';
      message.textContent='In Chrome or Edge, open the browser menu (⋮), then choose Install app or Add to Home screen. If this option is unavailable, the website still works in your browser.';
    }
    if (dialog && typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
    else if (!dialog || typeof dialog.showModal !== 'function') alert(title.textContent+'\n\n'+message.textContent);
  }
  async function install() {
    if (standalone() || !deferredPrompt) {help();return;}
    const event=deferredPrompt;deferredPrompt=null;
    try { await event.prompt(); await event.userChoice; } catch {help();}
    sync();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    for (const id of ['iqPwaHeroBtn','iqPwaCardBtn']) $(id)?.addEventListener('click',install);
    $('iqPwaHelpClose')?.addEventListener('click',()=>$('iqPwaHelpDialog')?.close());
    window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;sync();});
    window.addEventListener('appinstalled',()=>{deferredPrompt=null;sync();});
    sync();
    if ('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')) {
      window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(err=>console.warn('PWA service worker:',err)));
    }
  });
})();
