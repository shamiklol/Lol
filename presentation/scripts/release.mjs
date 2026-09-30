// Produce release files from dist/index.html:
//  · release/Prompt-Logic-Shams-labs.html — full offline document (double-click to present)
//  · release/artifact.html — same page without the document skeleton, for claude.ai Artifact publishing
import fs from 'node:fs';
const s = fs.readFileSync('dist/index.html', 'utf8');
fs.mkdirSync('../release', { recursive: true });
fs.writeFileSync('../release/Prompt-Logic-Shams-labs.html', s);

const title = s.slice(s.indexOf('<title>'), s.indexOf('</title>') + 8);
const scriptStart = s.indexOf('<script type="module"');
const scriptEnd = s.indexOf('</script>', scriptStart) + 9;
const styleStart = s.indexOf('<style', scriptEnd);
const styleEnd = s.indexOf('</style>', styleStart) + 8;
const body = s.slice(s.indexOf('<body>') + 6, s.lastIndexOf('</body>'));
// The tokenizer vocabulary holds U+FFFD inside plain JS template literals; escaping it keeps the
// value identical and lets the Artifact publisher accept the file.
const script = s
  .slice(scriptStart, scriptEnd)
  .replace('<script type="module" crossorigin>', '<script type="module">')
  .replaceAll('\uFFFD', '\\uFFFD');
const style = s.slice(styleStart, styleEnd).replace(/<style[^>]*>/, '<style>');
fs.writeFileSync('../release/artifact.html', `${title}\n${style}\n${body.trim()}\n${script}\n`);
console.log('release written', (s.length / 1024 / 1024).toFixed(2), 'MB');
