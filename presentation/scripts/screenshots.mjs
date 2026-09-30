// Render every slide (and optionally every step) to PNG for visual QA and overview thumbnails.
// usage: node scripts/screenshots.mjs [outDir] [--steps] [--only=3,5] [--wait=2600] [--nogl]
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const out = args.find((a) => !a.startsWith('--')) || 'shots';
const steps = args.includes('--steps');
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean).map(Number);
const wait = +((args.find((a) => a.startsWith('--wait=')) || '').slice(7) || 2600);
const nogl = args.includes('--nogl');
const file = path.resolve(args.find((a) => a.startsWith('--file='))?.slice(7) || 'dist/index.html');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
await page.goto(pathToFileURL(file).href + '?shots' + (nogl ? '&nogl' : ''));
await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
await page.waitForTimeout(1500);
const total = await page.evaluate(() => window.__deck.total);
const list = only.length ? only.map((n) => n - 1) : [...Array(total).keys()];
for (const i of list) {
  const nsteps = await page.evaluate((i) => window.__deck.defs[i].steps, i);
  const stepList = steps ? [...Array(nsteps + 1).keys()] : [nsteps];
  for (const s of stepList) {
    await page.evaluate(([i, s]) => {
      const d = window.__deck;
      if (d.index !== i) d.go(i, { step: 0 });
      for (let k = d.step; k < s; k++) d.setStep(k + 1, { dir: 1 });
    }, [i, s]);
    await page.waitForTimeout(wait);
    const name = `${String(i + 1).padStart(2, '0')}${steps ? '-' + s : ''}.png`;
    await page.screenshot({ path: path.join(out, name) });
    console.log('shot', name);
  }
}
if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].join('\n'));
await browser.close();
