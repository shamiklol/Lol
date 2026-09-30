import { gsap } from './fx.js';
import { CONFIG } from '../config.js';

export const STATIONS = [
  { name: 'Prompt', c: 'var(--prompt)' },
  { name: 'Logika', c: 'var(--prompt)' },
  { name: 'Chain', c: 'var(--model)' },
  { name: 'Tool’lar', c: 'var(--tool)' },
  { name: 'Agent', c: 'var(--data)' },
];

export const ACTS = ['Kirish', 'I · Prompt Logic', 'II · Tool Chaining', 'Yakun'];

export const sunMark = (id = 'sm') => `
<svg class="sun-mark" viewBox="0 0 32 32" aria-hidden="true">
  <defs><radialGradient id="${id}" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff9d3a"/>
  </radialGradient></defs>
  <circle cx="16" cy="16" r="5.2" fill="url(#${id})"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const r = i % 2 ? 11.5 : 12.8;
    return `<circle cx="${(16 + Math.cos(a) * r).toFixed(2)}" cy="${(16 + Math.sin(a) * r).toFixed(2)}" r="${i % 2 ? 1 : 1.5}" fill="#ffc15e" opacity="${i % 2 ? 0.6 : 1}"/>`;
  }).join('')}
</svg>`;

export function createHud(root, deck) {
  const defs = deck.defs;
  const n = defs.length;
  // station start = first slide that belongs to it
  const starts = STATIONS.map((_, s) => defs.findIndex((d) => (d.station ?? 0) >= s));
  const pos = (i) => (n <= 1 ? 0 : i / (n - 1)) * 100;

  root.innerHTML = `
    <div class="hud-top">
      <div class="hud-brand">${sunMark('hud-sun')}<b>${CONFIG.brand}</b><span class="hud-sep"></span><span class="hud-act"></span></div>
      <div class="hud-count tabular"><b class="hud-i">01</b> / ${String(n).padStart(2, '0')}</div>
    </div>
    <div class="metro" aria-hidden="true">
      <div class="metro-track"></div>
      <div class="metro-fill"></div>
      ${STATIONS.map(
        (s, i) => {
          const close = i > 0 && Math.abs(pos(starts[i]) - pos(starts[i - 1])) < 7;
          return `<div class="metro-station${close ? ' is-up' : ''}" style="left:${pos(Math.max(0, starts[i]))}%;--c:${s.c}"><i></i><span>${s.name}</span></div>`;
        },
      ).join('')}
      <div class="metro-head"></div>
    </div>`;

  const actEl = root.querySelector('.hud-act');
  const iEl = root.querySelector('.hud-i');
  const fill = root.querySelector('.metro-fill');
  const head = root.querySelector('.metro-head');
  const stations = [...root.querySelectorAll('.metro-station')];

  deck.addEventListener('change', ({ detail }) => {
    const { index, def } = detail;
    root.classList.toggle('hud-hidden', !!def.hideHud);
    actEl.textContent = ACTS[def.act] || '';
    iEl.textContent = String(index + 1).padStart(2, '0');
    const p = pos(index);
    gsap.to(fill, { width: `${p}%`, duration: 1.1, ease: 'expo.out' });
    gsap.to(head, { left: `${p}%`, duration: 1.1, ease: 'expo.out' });
    const st = def.station ?? 0;
    stations.forEach((el, i) => {
      el.classList.toggle('is-past', i <= st);
      el.classList.toggle('is-now', i === st);
    });
  });
}
