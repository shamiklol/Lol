import * as THREE from 'three';

export function glowTexture(size = 128, inner = 'rgba(255,255,255,1)', mid = 'rgba(255,255,255,0.35)') {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.18, mid);
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Real sub-word pieces as a tokenizer would cut them (Uzbek, English, code).
export const TOKENS = [
  'prompt', ' agent', 'tool_use', ' Agar', ' oʻ', 'zg', 'lar', '{', '}', '</', 'json', ' model',
  'ing', ' the', ' kontekst', ' vosita', ' sikl', 'stop_reason', ' MCP', ' zanjir', 'iy', 'ʼ',
  ' maqsad', ' think', ' act', ' observe', 'input_schema', ' result', ' tahl', 'il', ' javob', ' token',
  '=>', ' if', ' else', ' return', ' loop', ' memory', ' skill', ' chain', 'tool_result', '"name"',
  ' Sun', 'elle', 'kt', ' bug', 'un', ' xot', 'ira', ' reja', '<maqsad>', ' natija', ' format', '[]',
  ' qadam', ' shart', ' misol', ' baho', 'lash', ' user', ' assistant', ' system',
];

export function tokenAtlas(fontFamily = 'IBM Plex Mono') {
  const cols = 4;
  const rows = Math.ceil(TOKENS.length / cols);
  const cw = 512;
  const ch = 80;
  const c = document.createElement('canvas');
  c.width = cols * cw;
  c.height = rows * ch;
  const g = c.getContext('2d');
  g.fillStyle = '#fff';
  g.textBaseline = 'middle';
  g.textAlign = 'center';
  g.font = `500 44px "${fontFamily}", monospace`;
  TOKENS.forEach((t, i) => {
    const x = (i % cols) * cw + cw / 2;
    const y = Math.floor(i / cols) * ch + ch / 2;
    g.fillText(t.replace(/^ /, '·'), x, y);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, cols, rows, count: TOKENS.length };
}
