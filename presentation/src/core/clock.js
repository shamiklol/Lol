// A single time source for every animation. In video-render mode the
// renderer seeks it frame by frame, so 3D motion is deterministic.
let manual = null;
const t0 = performance.now();

export const clock = {
  now() {
    return manual ?? (performance.now() - t0) / 1000;
  },
  setManual(t) {
    manual = t;
  },
  get manualMode() {
    return manual !== null;
  },
};
