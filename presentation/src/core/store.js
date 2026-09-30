// Per-viewer conveniences only. Storage can be missing (private windows,
// sandboxed previews), so every access is guarded and has a default.
const PREFIX = 'pl-deck:';

export const store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(PREFIX + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* ignore */
    }
  },
  del(key) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch (e) {
      /* ignore */
    }
  },
};
