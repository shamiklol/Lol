// Measure the build for the meta slide: slides, lines of code, QA screenshots, video frames.
// usage: node scripts/build-stats.mjs <qa-screenshot-root> <videoSeconds> <fps>
import fs from 'node:fs';
import path from 'node:path';
const [root, secs = '71', fps = '60'] = process.argv.slice(2);
const walk = (d, f = []) => {
  if (!fs.existsSync(d)) return f;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && !['node_modules', 'dist'].includes(e.name)) walk(p, f);
    else if (e.isFile()) f.push(p);
  }
  return f;
};
const code = [...walk('src'), ...walk('scripts'), 'index.html', 'vite.config.js', ...walk('../skills')].filter(
  (f) => /\.(js|mjs|css|html|md|py)$/.test(f) && !f.endsWith('thumbs.js') && !f.includes('/dist/'),
);
const loc = code.reduce((n, f) => n + fs.readFileSync(f, 'utf8').split('\n').filter((l) => l.trim()).length, 0);
const shots = walk(root).filter((f) => f.endsWith('.png')).length;
const slides = (fs.readFileSync('src/content/notes.js', 'utf8').match(/^  \w+: `/gm) || []).length;
const frames = Math.round(+secs * +fps) + 1;
const fmt = (n) => n.toLocaleString('en-US').replace(/,/g, ' ');
const file = 'src/content/buildStats.js';
let s = fs.readFileSync(file, 'utf8');
s = s.replace(/stats: \[[\s\S]*?\],\n\};/, `stats: [\n    ['${slides}', 'slayd'],\n    ['${fmt(loc)}', 'qator kod'],\n    ['${fmt(shots)}', 'skrinshot tekshiruvi'],\n    ['${fmt(frames)}', 'video kadr'],\n  ],\n};`);
fs.writeFileSync(file, s);
console.log({ slides, loc, shots, frames });
