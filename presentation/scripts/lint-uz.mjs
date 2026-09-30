// Uzbek text lint: apostrophe characters and common misspellings, over what the audience sees.
// usage: node scripts/lint-uz.mjs [dump.txt]  (dump produced by scripts/dump-text.mjs)
import fs from 'node:fs';
const file = process.argv[2] || 'text-dump.txt';
const text = fs.readFileSync(file, 'utf8');
const lines = text.split('\n');
const rules = [
  [/[oOgG]['‘’`´]/g, 'oʻ/gʻ must use ʻ (U+02BB)'],
  [/[oOgG]ʼ/g, 'after o/g use ʻ (U+02BB), not ʼ'],
  [/(?<![oOgG])ʻ/g, 'ʻ only after o/g; tutuq belgisi is ʼ (U+02BC)'],
  [/\b(ma|ta|sa|na|ba|qa|a)'([a-z])/g, 'tutuq belgisi must be ʼ (U+02BC)'],
  [/\bqaer/gi, 'qayer…'],
  [/\btsikl/gi, 'sikl'],
  [/\bxozir/gi, 'hozir'],
  [/\bhato\b/gi, 'xato'],
  [/\bxamma\b/gi, 'hamma'],
  [/\bxisob/gi, 'hisob'],
  [/\boktyabr/gi, 'oktabr'],
  [/\bsentyabr/gi, 'sentabr'],
  [/\bxar bir\b/gi, 'har bir'],
  [/\bproektor/gi, 'proyektor'],
  [/\bxulosa/g, null],
  [/  +/g, 'double space'],
  [/\bi\b(?= )/g, null],
];
let n = 0;
lines.forEach((l, i) => {
  for (const [re, msg] of rules) {
    if (!msg) continue;
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(l))) {
      // skip identifiers and code-ish lines
      if (/[{}<>=;]|_|\.(js|md|json)\b/.test(l.slice(Math.max(0, m.index - 12), m.index + 12)) && !/[ʻʼ]/.test(m[0])) continue;
      n++;
      console.log(`${i + 1}: ${msg}: …${l.slice(Math.max(0, m.index - 25), m.index + 25)}…`);
    }
  }
});
console.log(n ? `${n} issue(s)` : 'clean');
