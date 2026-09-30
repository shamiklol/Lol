// Frames of the agent-assembly timeline at chosen seconds (visual QA).
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const out = process.argv[2] || 'shots-agent';
const times = (process.argv[3] || '3,10,20,30,37,45,52,58,66,70').split(',').map(Number);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?shots');
await page.waitForFunction(() => window.__deck && window.__agentShow, null, { timeout: 30000 });
const idx = await page.evaluate(() => window.__deck.defs.findIndex((d) => d.id === 'assembly'));
await page.evaluate((i) => { window.__deck.go(i, { instant: true }); window.__agentShow.prepare(); }, idx);
await page.waitForTimeout(800);
for (const t of times) {
  await page.evaluate((t) => window.__agentShow.seek(t), t);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/t${String(t).padStart(2, '0')}.png` });
  console.log('t', t);
}
if (errors.length) console.log('ERRORS', errors);
await browser.close();
