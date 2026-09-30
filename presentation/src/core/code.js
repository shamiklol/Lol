// Small, dependency-free highlighter for the few languages on the slides.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const RULES = {
  json: [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, 't-key'],
    [/"(?:[^"\\]|\\.)*"/y, 't-str'],
    [/-?\d+(?:\.\d+)?/y, 't-num'],
    [/\b(?:true|false|null)\b/y, 't-kw'],
    [/[{}[\],:]/y, 't-pun'],
  ],
  js: [
    [/\/\/[^\n]*/y, 't-com'],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/y, 't-str'],
    [/\b(?:const|let|if|else|for|of|while|return|function|await|async|true|false|break|new)\b/y, 't-kw'],
    [/\b\d+(?:\.\d+)?\b/y, 't-num'],
    [/\b[a-zA-Z_]\w*(?=\()/y, 't-fn'],
    [/[{}()[\];,.=<>!+*/-]/y, 't-pun'],
  ],
  py: [
    [/#[^\n]*/y, 't-com'],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y, 't-str'],
    [/\b(?:while|True|False|if|break|for|in|return|def|not|and|or|None)\b/y, 't-kw'],
    [/\b\d+\b/y, 't-num'],
    [/\b[a-zA-Z_]\w*(?=\()/y, 't-fn'],
    [/[{}()[\]:,.=<>!+*/-]/y, 't-pun'],
  ],
  // prompt text: XML-ish tags, {{variables}}, keywords of the logic
  prompt: [
    [/<\/?[\wʻʼ_-]+>/y, 't-tag'],
    [/\{\{[^}]+\}\}/y, 't-var'],
    [/\b(?:Agar|agar|Aks holda|aks holda|Har bir|har bir|Faqat|faqat|Hech qachon)\b/y, 't-kw'],
    [/→/y, 't-fn'],
  ],
};

export function highlight(code, lang = 'json') {
  const rules = RULES[lang] || [];
  let out = '';
  let i = 0;
  let plain = '';
  const flush = () => {
    if (plain) out += esc(plain);
    plain = '';
  };
  outer: while (i < code.length) {
    for (const [re, cls] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m.index === i && m[0].length) {
        flush();
        out += `<span class="${cls}">${esc(m[0])}</span>`;
        i += m[0].length;
        continue outer;
      }
    }
    plain += code[i++];
  }
  flush();
  return out;
}

/** Highlight and wrap every line so slides can light up single lines. */
export function codeLines(code, lang) {
  return highlight(code.replace(/^\n/, '').replace(/\s+$/, ''), lang)
    .split('\n')
    .map((l, i) => `<span class="line" data-l="${i + 1}">${l || ' '}</span>`)
    .join('');
}
