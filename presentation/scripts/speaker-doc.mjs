// Build speaker/nutq-matni.md from the slide notes and planned times (single source of truth: notes.js).
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?nogl&shots');
await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
const defs = await page.evaluate(() => window.__deck.defs.map((d) => ({ title: d.title, time: d.time || 60, notes: d.notes || '', steps: d.steps })));
await browser.close();
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const md = (h) =>
  h
    .replace(/<span class="cue">(\w+)<\/span>/g, '**[$1]**')
    .replace(/<b>(.*?)<\/b>/g, '**$1**')
    .replace(/<\/p>\s*<p>/g, '\n\n')
    .replace(/<\/?p>/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
let acc = 0;
const parts = defs.map((d, i) => {
  const start = acc;
  acc += d.time;
  return `### ${i + 1}. ${d.title}\n\n⏱ ${mmss(d.time)} · boshlanishi ${mmss(start)} · kliklar: ${d.steps}\n\n${md(d.notes)}\n`;
});
const head = fs.readFileSync('scripts/speaker-head.md', 'utf8');
fs.writeFileSync('../speaker/nutq-matni.md', `${head}\n## Slaydma-slayd matn\n\nJami reja: **${mmss(acc)}** (qolgan vaqt — savol-javob va pauzalar uchun).\n\n${parts.join('\n')}`);
console.log('written', defs.length, 'slides', mmss(acc));
