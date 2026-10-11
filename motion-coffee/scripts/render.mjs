// Render CLI: node scripts/render.mjs --from 0 --to 25 --fps 30 --scale 1 [--out dir] [--video file.mp4] [--sheet file.jpg --cols 6]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map(s => { const [k, ...v] = s.trim().split(' '); return [k, v.join(' ') || true]; }));
const mb = parseInt(args.mb ?? 1), from = parseFloat(args.from ?? 0), fps = parseFloat(args.fps ?? 30), scale = parseFloat(args.scale ?? 1);

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.otf': 'font/otf', '.ttf': 'font/ttf', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/src/index.html?scale=${scale}`);
await page.waitForFunction(() => window.ready || window.initError, null, { timeout: 180000 });
const err = await page.evaluate(() => window.initError);
if (err) { console.error(err); process.exit(1); }
const to = parseFloat(args.to ?? await page.evaluate(() => window.DURATION));
const n = Math.max(1, Math.round((to - from) * fps));
const times = args.times ? String(args.times).split(",").map(Number) : Array.from({ length: n }, (_, i) => from + i / fps);
const t0 = Date.now();

if (args.sheet) {
  const url = await page.evaluate(([ts, c, m]) => window.renderSheet(ts, c, m), [times, parseInt(args.cols ?? 6), mb]);
  fs.mkdirSync(path.dirname(args.sheet), { recursive: true });
  fs.writeFileSync(args.sheet, Buffer.from(url.split(',')[1], 'base64'));
  console.log(`sheet ${args.sheet} (${n} frames, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
} else {
  let ff = null;
  if (args.video) {
    fs.mkdirSync(path.dirname(args.video), { recursive: true });
    ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', String(fps), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', args.video], { stdio: ['pipe', 'inherit', 'inherit'] });
  }
  if (args.out) fs.mkdirSync(args.out, { recursive: true });
  for (let i = 0; i < n; i++) {
    const url = await page.evaluate(a => window.renderFrame(a[0], 0.97, a[1]), [times[i], mb]);
    const buf = Buffer.from(url.split(',')[1], 'base64');
    if (args.out) fs.writeFileSync(path.join(args.out, `f_${String(i).padStart(5, '0')}.jpg`), buf);
    if (ff && !ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 30 === 0) console.log(`frame ${i}/${n}  t=${times[i].toFixed(2)}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  if (ff) { ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
  console.log(`done ${n} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
await browser.close(); server.close();
