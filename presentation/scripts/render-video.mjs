// Render the agent-assembly showpiece frame by frame to MP4 (H.264, 1080p) with a synthesized soundtrack.
// usage: node scripts/render-video.mjs out.mp4 [fps=60] [--from=0] [--to=71] [--noaudio]
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const args = process.argv.slice(2);
const out = path.resolve(args.find((a) => !a.startsWith('--') && a.endsWith('.mp4')) || 'agent-assembly.mp4');
const fps = +(args.find((a) => /^\d+$/.test(a)) || 60);
const from = +((args.find((a) => a.startsWith('--from=')) || '').slice(7) || 0);
const toArg = (args.find((a) => a.startsWith('--to=')) || '').slice(5);
const noAudio = args.includes('--noaudio');
const ffmpeg = process.env.FFMPEG || execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?shots&render');
await page.waitForFunction(() => window.__deck && window.__agentShow, null, { timeout: 30000 });
const duration = await page.evaluate(() => {
  const d = window.__deck;
  const i = d.defs.findIndex((x) => x.id === 'assembly');
  d.go(i, { instant: true });
  window.__agentShow.prepare();
  return window.__agentShow.duration;
});
const to = toArg ? +toArg : duration;
await page.waitForTimeout(1000);

const tmpVideo = out.replace(/\.mp4$/, '.video.mp4');
const ff = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', tmpVideo], { stdio: ['pipe', 'ignore', 'inherit'] });

const frames = Math.round((to - from) * fps);
const t0 = Date.now();
for (let f = 0; f <= frames; f++) {
  const t = from + f / fps;
  await page.evaluate((t) => window.__agentShow.seek(t), t);
  const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (f % fps === 0) {
    const el = (Date.now() - t0) / 1000;
    console.log(`t=${t.toFixed(1)}s  frame ${f}/${frames}  ${(el / (f + 1)).toFixed(3)} s/frame  eta ${(((frames - f) * el) / (f + 1) / 60).toFixed(1)} min`);
  }
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));

if (noAudio) {
  fs.renameSync(tmpVideo, out);
} else {
  // synthesize the soundtrack in the page with OfflineAudioContext, timed to the same timeline
  const wavB64 = await page.evaluate(async ({ from, to }) => window.__agentShow.soundtrack(from, to), { from, to });
  const wav = out.replace(/\.mp4$/, '.wav');
  fs.writeFileSync(wav, Buffer.from(wavB64, 'base64'));
  execFileSync(ffmpeg, ['-y', '-i', tmpVideo, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
  fs.unlinkSync(tmpVideo);
  fs.unlinkSync(wav);
}
await browser.close();
console.log('done', out);
