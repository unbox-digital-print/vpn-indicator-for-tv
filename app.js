'use strict';
// A visual example only: no network or VPN detection takes place in this page.
const indicator = document.querySelector('#demo-indicator');
const statusLabel = document.querySelector('#preview-status');
const statusDot = document.querySelector('#preview-dot');
const testButton = document.querySelector('#disconnect-test');
const opacity = document.querySelector('#opacity');
let activeColor = '#69e3ad';
let disconnected = false;
let demoPhase = 'connected';
let hideTimer;
let restoreTimer;
const t = source => window.SiteLanguage ? window.SiteLanguage.t(source) : source;
function renderDemoText() {
  const messages = {connected:'Demo: VPN verbunden', disconnected:'Demo: VPN getrennt · Hinweis für 3 Sek.', hidden:'Demo: Abbruchhinweis ausgeblendet'};
  statusLabel.textContent = t(messages[demoPhase]);
  testButton.innerHTML = t(disconnected ? 'Demo zurücksetzen' : 'Abbruch simulieren') + ' <span>↗</span>';
}
document.addEventListener('languagechange', renderDemoText);
renderDemoText();

function selectButton(group, selected) {
  group.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
}
document.querySelector('#symbol-options').addEventListener('click', event => {
  const button = event.target.closest('button[data-symbol]');
  if (!button) return;
  indicator.dataset.symbol = button.dataset.symbol;
  selectButton(event.currentTarget, button);
});
document.querySelector('#color-options').addEventListener('click', event => {
  const button = event.target.closest('button[data-color]');
  if (!button) return;
  activeColor = button.dataset.color;
  if (!disconnected) indicator.style.setProperty('--indicator-color', activeColor);
  selectButton(event.currentTarget, button);
});
document.querySelector('#position-options').addEventListener('click', event => {
  const button = event.target.closest('button[data-position]');
  if (!button) return;
  indicator.dataset.position = button.dataset.position;
  selectButton(event.currentTarget, button);
});
opacity.addEventListener('input', () => {
  document.querySelector('#opacity-value').value = `${opacity.value} %`;
  if (!disconnected) indicator.style.opacity = Number(opacity.value) / 100;
});
function restoreDemo() {
  clearTimeout(hideTimer);
  clearTimeout(restoreTimer);
  disconnected = false;
  demoPhase = 'connected';
  indicator.style.setProperty('--indicator-color', activeColor);
  indicator.style.opacity = Number(opacity.value) / 100;
  statusDot.style.background = '';
  renderDemoText();
}
testButton.addEventListener('click', () => {
  if (disconnected) { restoreDemo(); return; }
  disconnected = true;
  demoPhase = 'disconnected';
  indicator.style.setProperty('--indicator-color', '#f27e81');
  indicator.style.opacity = Number(opacity.value) / 100;
  statusDot.style.background = '#f27e81';
  renderDemoText();
  hideTimer = setTimeout(() => {
    indicator.style.opacity = '0';
    demoPhase = 'hidden';
    renderDemoText();
  }, 3000);
  restoreTimer = setTimeout(restoreDemo, 7500);
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function showInstall(platform, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.id === `tab-${platform}`;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    if (selected && focus) tab.focus();
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showInstall(tab.id.replace('tab-', '')));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); showInstall(next.id.replace('tab-', ''), true); }
  });
});
document.querySelectorAll('[data-show-install]').forEach(link => {
  link.addEventListener('click', () => showInstall(link.dataset.showInstall));
});

// Enable only with the owner's verified public recipient URLs.
// Direct links keep third-party payment scripts off the landing page.
fetch('support.json', {cache: 'no-cache'})
  .then(response => { if (!response.ok) throw new Error('Support configuration unavailable'); return response.json(); })
  .then(config => {
    const providers = [
      ['paypal', config.paypal, new Set(['www.paypal.com', 'paypal.com', 'paypal.me', 'www.paypal.me'])],
      ['coffee', config.buyMeACoffee, new Set(['buymeacoffee.com', 'www.buymeacoffee.com'])]
    ];
    let enabled = false;
    providers.forEach(([id, address, hosts]) => {
      if (!address) return;
      let url;
      try { url = new URL(address); } catch { return; }
      if (url.protocol !== 'https:' || !hosts.has(url.hostname) || url.username || url.password) return;
      const button = document.getElementById(`support-${id}`);
      const link = document.createElement('a');
      link.id = button.id;
      link.className = 'bmc-button';
      link.href = url.href;
      link.rel = 'noopener noreferrer'; link.target = '_blank';
      const img = document.createElement('img');
      img.src = id === 'paypal' ? 'assets/paypal-donate.svg' : 'assets/buy-me-a-coffee.png';
      img.width = 217; img.height = 60;
      img.alt = id === 'paypal' ? 'Donate with PayPal' : 'Buy Me a Coffee';
      link.append(img);
      button.replaceWith(link);
      enabled = true;
    });
    if (enabled) document.querySelector('.support-options > p').textContent = 'Du wechselst zum jeweiligen Zahlungsanbieter.';
  })
  .catch(() => { /* Keep the clearly labelled, disabled future options. */ });
