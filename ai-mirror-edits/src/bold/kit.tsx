import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Direction, Slate } from "../components/CutFrame";
import { ease, easeInOut, lerp, prog } from "../theme";

// "Bold" variant: clean creator-explainer look. Cream canvas, navy type,
// one mustard accent, white pill callouts, ring counters.
export const B = {
  bg: "#EEEBE5",
  navy: "#1D2B3A",
  slate: "#56606B",
  mustard: "#F4B740",
  mustardSoft: "#FBE3A8",
  white: "#FFFFFF",
  font: 'Poppins, "Helvetica Neue", Arial, sans-serif',
  shadow: "0 14px 34px rgba(29,43,58,0.09), 0 2px 6px rgba(29,43,58,0.05)",
};

// Motion budget (animations.dev): entrances ~10 frames (333ms) ease-out from scale 0.95,
// on-screen moves ease-in-out, group stagger 2 frames (67ms).
export const POP = 10;
export const STAGGER = 2;

const useBoldFonts = () => {
  const [h] = useState(() => delayRender("bold fonts"));
  useEffect(() => {
    Promise.all(["600", "700", "800"].map((w) => document.fonts.load(`${w} 40px Poppins`)))
      .catch(() => undefined)
      .then(() => continueRender(h));
  }, [h]);
};

export const BoldFrame: React.FC<{ direction: Direction; showDirections?: boolean; children: React.ReactNode }> = ({
  direction,
  showDirections = true,
  children,
}) => {
  useBoldFonts();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Handles: 6-frame cut-in from the bg colour (not black: this look is bright), 6-frame out.
  const veil = interpolate(frame, [0, 6, durationInFrames - 6, durationInFrames], [1, 0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: B.bg, fontFamily: B.font, overflow: "hidden" }}>
      {children}
      {showDirections && <Slate d={direction} dark={false} />}
      <AbsoluteFill style={{ background: B.bg, opacity: veil, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

/** Pop-in: opacity 0→1, scale 0.95→1, rise 12px. Never from scale(0). */
export const pop = (frame: number, start: number) => {
  const p = prog(frame, start, POP, ease);
  return { opacity: p, transform: `translateY(${lerp(12, 0, p)}px) scale(${lerp(0.95, 1, p)})` };
};

export const Pill: React.FC<{
  start: number;
  children: React.ReactNode;
  size?: number;
  accent?: number; // 0..1 mustard fill
  dim?: number; // 0..1
  strike?: number; // 0..1
  style?: React.CSSProperties;
}> = ({ start, children, size = 52, accent = 0, dim = 0, strike = 0, style }) => {
  const frame = useCurrentFrame();
  const p = pop(frame, start);
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        padding: `${size * 0.42}px ${size * 0.72}px`,
        borderRadius: 999,
        background: B.white,
        boxShadow: B.shadow,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.15,
        color: B.navy,
        letterSpacing: -0.5,
        whiteSpace: "nowrap",
        ...style,
        opacity: p.opacity * lerp(1, 0.35, dim),
        transform: p.transform,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background: B.mustard,
          opacity: accent,
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
      {strike > 0 && (
        <div
          style={{
            position: "absolute",
            left: size * 0.55,
            right: size * 0.55,
            top: "50%",
            height: Math.max(4, size * 0.08),
            borderRadius: 4,
            background: B.mustard,
            transform: `scaleX(${strike})`,
            transformOrigin: "left center",
          }}
        />
      )}
    </div>
  );
};

/** Ring counter: mustard ring draws on (ease-in-out, it travels), number pops (ease-out). */
export const Ring: React.FC<{
  start: number;
  big: string;
  label?: string;
  cx?: number;
  cy?: number;
  r?: number;
  color?: string;
  bigSize?: number;
}> = ({ start, big, label, cx = 470, cy = 540, r = 250, color = B.mustard, bigSize = 210 }) => {
  const frame = useCurrentFrame();
  const draw = prog(frame, start, 24, easeInOut);
  const inner = pop(frame, start + 6);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={34}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...inner,
        }}
      >
        <div style={{ fontSize: bigSize, fontWeight: 800, color: B.navy, lineHeight: 0.95, letterSpacing: -6 }}>{big}</div>
        {label && <div style={{ fontSize: 46, fontWeight: 700, color: B.slate, marginTop: 18 }}>{label}</div>}
      </div>
    </>
  );
};

/** Grey bold lead-in line, like "the first 30 seconds show…". */
export const Lead: React.FC<{ start: number; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  start,
  children,
  size = 56,
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ fontSize: size, fontWeight: 700, color: B.slate, letterSpacing: -0.5, ...pop(frame, start), ...style }}>{children}</div>
  );
};

export const Col: React.FC<{ children: React.ReactNode; left?: number; gap?: number }> = ({ children, left = 880, gap = 30 }) => (
  <div
    style={{
      position: "absolute",
      left,
      right: 80,
      top: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap,
    }}
  >
    {children}
  </div>
);
