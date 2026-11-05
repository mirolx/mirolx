import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "../theme";

const useFonts = () => {
  const [handle] = useState(() => delayRender("Loading fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load('400 40px "Cormorant Garamond"'),
      document.fonts.load('italic 400 40px "Cormorant Garamond"'),
      document.fonts.load('500 40px "Cormorant Garamond"'),
      document.fonts.load('italic 500 40px "Cormorant Garamond"'),
      document.fonts.load("400 20px Inter"),
      document.fonts.load("500 20px Inter"),
      document.fonts.load('400 20px "JetBrains Mono"'),
    ])
      .catch(() => undefined)
      .then(() => continueRender(handle));
  }, [handle]);
};

/** Animated film grain — keeps flat graphics feeling like they belong next to camera footage. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.35 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none",
    }}
  />
);

export type Direction = {
  cut: string;
  timecode: string;
  cue: string;
  note: string;
};

/** Editor's slate: which line of the script this cut lands on, and how to cut into it. */
export const Slate: React.FC<{ d: Direction; dark: boolean }> = ({ d, dark }) => {
  const fg = dark ? "rgba(238,232,223,0.72)" : "rgba(29,26,23,0.66)";
  const bg = dark ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.5)";
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        bottom: 34,
        maxWidth: 1100,
        padding: "12px 18px",
        borderRadius: 10,
        background: bg,
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        fontFamily: F.mono,
        fontSize: 15,
        lineHeight: 1.55,
        color: fg,
      }}
    >
      <div style={{ letterSpacing: 1.5 }}>
        <span style={{ color: C.rose }}>● {d.cut}</span> · {d.timecode} · CUE “{d.cue}”
      </div>
      <div style={{ opacity: 0.85 }}>{d.note}</div>
    </div>
  );
};

/**
 * Shared wrapper for every cut: background, slow push-in, grain, vignette,
 * dip-from/to-black handles and the optional direction slate.
 */
export const CutFrame: React.FC<{
  bg: string;
  dark?: boolean;
  direction: Direction;
  showDirections?: boolean;
  pushIn?: number;
  children: React.ReactNode;
}> = ({ bg, dark = false, direction, showDirections = true, pushIn = 0.035, children }) => {
  useFonts();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1, 1 + pushIn]);
  const dip = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [1, 0, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>{children}</AbsoluteFill>
      <Grain opacity={dark ? 0.12 : 0.08} />
      <Vignette strength={dark ? 0.5 : 0.18} />
      {showDirections && <Slate d={direction} dark={dark} />}
      <AbsoluteFill style={{ background: "#000", opacity: dip, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
