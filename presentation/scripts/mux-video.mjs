// Join video parts rendered with render-video.mjs --noaudio and add the full soundtrack.
// Long renders are split into parts so each fits a time-limited job; the soundtrack is
// synthesized once for the whole timeline so there is no seam in the audio.
// usage: node scripts/mux-video.mjs out.mp4 part1.mp4 part2.mp4 ...
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const [outArg, ...parts] = process.argv.slice(2);
const out = path.resolve(outArg);
const ffmpeg = process.env.FFMPEG || execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

const list = out.replace(/\.mp4$/, '.parts.txt');
fs.writeFileSync(list, parts.map((p) => `file '${path.resolve(p)}'`).join('\n') + '\n');
const joined = out.replace(/\.mp4$/, '.video.mp4');
execFileSync(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined], { stdio: 'inherit' });

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?shots&render');
await page.waitForFunction(() => window.__deck && window.__agentShow, null, { timeout: 30000 });
const wavB64 = await page.evaluate(async () => {
  const d = window.__deck;
  d.go(d.defs.findIndex((x) => x.id === 'assembly'), { instant: true });
  window.__agentShow.prepare();
  return window.__agentShow.soundtrack(0, window.__agentShow.duration);
});
await browser.close();

const wav = out.replace(/\.mp4$/, '.wav');
fs.writeFileSync(wav, Buffer.from(wavB64, 'base64'));
execFileSync(ffmpeg, ['-y', '-i', joined, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
for (const f of [list, joined, wav]) fs.unlinkSync(f);
console.log('written', out, (fs.statSync(out).size / 1024 / 1024).toFixed(1), 'MB');
