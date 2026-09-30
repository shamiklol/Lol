import { gsap } from './fx.js';

const W = 1920;
const H = 1080;

/** Jittered grid of shard polygons that tile the stage. */
function shardPolys(cols = 4, rows = 3, jitter = 0.34) {
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts[r] = [];
    for (let c = 0; c <= cols; c++) {
      const edgeX = c === 0 || c === cols;
      const edgeY = r === 0 || r === rows;
      const jx = edgeX ? 0 : (Math.random() - 0.5) * jitter * (W / cols);
      const jy = edgeY ? 0 : (Math.random() - 0.5) * jitter * (H / rows);
      pts[r][c] = [(c / cols) * W + jx, (r / rows) * H + jy];
    }
  }
  const polys = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
      // split each cell diagonally for sharper shards
      if ((r + c) % 2) {
        polys.push([a, b, e], [a, e, d]);
      } else {
        polys.push([a, b, d], [b, e, d]);
      }
    }
  }
  return polys;
}

/**
 * Break a slide into glass shards that fly toward the viewer.
 * Used once per act change: the old world cracks, the new one arrives.
 */
export function shatter(slideEl, container) {
  const tl = gsap.timeline();
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;perspective:1400px;transform-style:preserve-3d;z-index:30';
  container.appendChild(layer);

  const polys = shardPolys();
  const crack = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  crack.setAttribute('viewBox', `0 0 ${W} ${H}`);
  crack.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible';
  const paths = [];
  polys.forEach((p) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${p.map((q) => q.join(',')).join('L')}Z`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(200,240,255,0.9)');
    path.setAttribute('stroke-width', '1.6');
    path.style.filter = 'drop-shadow(0 0 6px #3fe0ff)';
    crack.appendChild(path);
    paths.push(path);
  });

  const shards = polys.map((p) => {
    const s = slideEl.cloneNode(true);
    s.classList.remove('is-active', 'is-leaving');
    s.removeAttribute('id');
    s.setAttribute('aria-hidden', 'true');
    s.style.visibility = 'visible';
    s.style.opacity = '1';
    s.style.clipPath = `polygon(${p.map(([x, y]) => `${x}px ${y}px`).join(',')})`;
    const cx = p.reduce((m, q) => m + q[0], 0) / p.length;
    const cy = p.reduce((m, q) => m + q[1], 0) / p.length;
    s.style.transformOrigin = `${cx}px ${cy}px`;
    s._c = [cx, cy];
    layer.appendChild(s);
    return s;
  });
  layer.appendChild(crack);

  tl.fromTo(paths, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.28, ease: 'power2.out', stagger: 0.004 }, 0);
  shards.forEach((s) => {
    const [cx, cy] = s._c;
    const dx = cx - W / 2;
    const dy = cy - H / 2;
    const dist = Math.hypot(dx, dy) / Math.hypot(W / 2, H / 2);
    tl.to(
      s,
      {
        x: dx * (0.5 + Math.random() * 0.5),
        y: dy * (0.5 + Math.random() * 0.5) + 120,
        z: 300 + Math.random() * 500,
        rotationX: (Math.random() - 0.5) * 120,
        rotationY: (Math.random() - 0.5) * 120,
        rotationZ: (Math.random() - 0.5) * 60,
        autoAlpha: 0,
        filter: 'blur(3px) brightness(1.6)',
        duration: 1.05,
        ease: 'power3.in',
      },
      0.22 + dist * 0.12,
    );
  });
  tl.to(crack, { autoAlpha: 0, duration: 0.3 }, 0.3);
  tl.add(() => layer.remove());
  return tl;
}
