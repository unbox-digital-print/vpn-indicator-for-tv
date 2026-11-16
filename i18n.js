'use strict';
(() => {
  const supported = ['de', 'en', 'fr', 'es'];
  const storageKey = 'vpn-indicator-site-language';
  const dictionary = window.VPN_TRANSLATIONS;
  const textNodes = [];
  const attributes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script,style,svg,[data-no-i18n],#preview-status,#disconnect-test,#opacity-value')) continue;
    const source = node.nodeValue.trim();
    if (dictionary[source]) textNodes.push({node, source, leading:node.nodeValue.match(/^\s*/)[0], trailing:node.nodeValue.match(/\s*$/)[0]});
  }
  document.querySelectorAll('[aria-label],img[alt]').forEach(element => {
    if (element.closest('[data-no-i18n]')) return;
    for (const attribute of ['aria-label', 'alt']) {
      const source = element.getAttribute(attribute);
      if (source && dictionary[source]) attributes.push({element, attribute, source});
    }
  });
  let language = 'de';
  function t(source) {
    if (language === 'de') return source;
    return dictionary[source]?.[supported.indexOf(language) - 1] ?? source;
  }
  function normalize(value) { return String(value || '').toLowerCase().split(/[-_]/)[0]; }
  function setLanguage(next, remember = false) {
    if (!supported.includes(next)) return;
    language = next;
    document.documentElement.lang = next;
    textNodes.forEach(({node,source,leading,trailing}) => { node.nodeValue = leading + t(source) + trailing; });
    attributes.forEach(({element,attribute,source}) => element.setAttribute(attribute, t(source)));
    document.querySelector('#language-code').textContent = next.toUpperCase();
    document.querySelector('#language-flag').src = `assets/flags/${next}.svg`;
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language === next)));
    document.querySelector('.language-menu').open = false;
    const description = t('Dein VPN-Status. Direkt im Bild. Kostenloser APK-Download für Fire TV, Android TV und Google TV.');
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:description"]').content = description;
    if (remember) {
      try { localStorage.setItem(storageKey, next); } catch { /* Storage is optional. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    }
    document.dispatchEvent(new CustomEvent('languagechange', {detail:next}));
  }
  window.SiteLanguage = {t, set:setLanguage, get:() => language};
  const requested = normalize(new URL(location.href).searchParams.get('lang'));
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch { /* Fall back to the browser. */ }
  const detected = (navigator.languages || [navigator.language]).map(normalize).find(code => supported.includes(code));
  setLanguage(supported.includes(requested) ? requested : supported.includes(saved) ? saved : detected || 'en');
  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start'}));
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language, true));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.language-menu')) document.querySelector('.language-menu').open = false;
  });
  document.querySelector('.language-menu').addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary').focus(); }
  });
})();
