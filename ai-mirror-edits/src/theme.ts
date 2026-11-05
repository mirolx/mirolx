import { Easing, interpolate } from "remotion";

// Calm, introspective palette: warm journal paper by day, soft charcoal by night,
// one dusty-rose accent used only for emphasis.
export const C = {
  paper: "#EEE8DF",
  paperDeep: "#E2D9CC",
  ink: "#1D1A17",
  inkSoft: "#5B544D",
  mute: "#9A9088",
  rose: "#B0716A",
  roseSoft: "#D9B3AA",
  night: "#121315",
  nightSoft: "#1B1D20",
  line: "rgba(29,26,23,0.14)",
  highlight: "rgba(214,170,98,0.55)",
};

export const F = {
  serif: '"Cormorant Garamond", Georgia, serif',
  sans: 'Inter, "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", Menlo, monospace',
};

export const FPS = 30;
export const W = 1920;
export const H = 1080;

// Strong curves (animations.dev): ease-out for things entering, ease-in-out for things moving on screen.
export const ease = Easing.bezier(0.23, 1, 0.32, 1);
export const easeInOut = Easing.bezier(0.77, 0, 0.175, 1);

/** 0→1 progress between `start` and `start + dur`, eased and clamped. */
export const prog = (frame: number, start: number, dur: number, easing = ease) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Opacity that fades in at `inAt` and (optionally) out at `outAt`. */
export const inOut = (frame: number, inAt: number, outAt?: number, dur = 18) => {
  const a = prog(frame, inAt, dur);
  const b = outAt === undefined ? 0 : prog(frame, outAt, dur);
  return a * (1 - b);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
