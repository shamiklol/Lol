// Fast preview loop: node scripts/preview.mjs <from> <to> [fps=8] [scale=0.25] [cols=6]
import { execFileSync } from 'node:child_process';
const [from = 0, to = 25, fps = 8, scale = 0.25, cols = 6] = process.argv.slice(2);
execFileSync('node', ['scripts/render.mjs', '--from', from, '--to', to, '--fps', fps, '--scale', scale,
  '--sheet', `renders/previews/sheet_${from}-${to}.jpg`, '--cols', cols], { stdio: 'inherit' });
