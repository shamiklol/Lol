// Dump every slide's visible text (all steps revealed) and speaker notes for proofreading.
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?nogl&shots');
await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
const out = await page.evaluate(() => {
  const d = window.__deck;
  return d.defs.map((def, i) => {
    const el = d.els[i];
    const clone = el.cloneNode(true);
    clone.querySelectorAll('pre, code, .code, svg text, textarea').forEach((n) => n.setAttribute('data-code', '1'));
    const text = [...el.querySelectorAll('*')]
      .filter((n) => n.childNodes.length && [...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()))
      .filter((n) => !n.closest('pre, code, .code, .tk-chips, .tr-b'))
      .map((n) => [...n.childNodes].filter((c) => c.nodeType === 3).map((c) => c.textContent.trim()).join(' ').trim())
      .filter(Boolean);
    const code = [...el.querySelectorAll('pre, textarea')].map((n) => n.textContent || n.value).join('\n');
    const notes = (def.notes || '').replace(/<span class="cue">(\w+)<\/span>/g, '[$1]').replace(/<[^>]+>/g, '').replace(/\n+/g, '\n').trim();
    return `### ${i + 1}. ${def.title}\n${[...new Set(text)].join('\n')}\n--- kod/prompt ---\n${code}\n--- eslatma ---\n${notes}\n`;
  });
});
fs.writeFileSync(process.argv[2] || 'text-dump.txt', out.join('\n'));
await browser.close();
console.log('ok');
