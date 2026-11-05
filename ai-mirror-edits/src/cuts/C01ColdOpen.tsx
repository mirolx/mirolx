import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Kicker, Words } from "../components/Text";
import { C, F, inOut, lerp, prog } from "../theme";

export const C01_DURATION = 360;

const direction: Direction = {
  cut: "CUT 01 / COLD OPEN",
  timecode: "0:00–0:12",
  cue: "Have you ever disliked someone so much…",
  note: "Open on black, no music. Text speaks from both sides of a mirror seam. Seam wipes to paper on 'questioning why' → title. Music enters on the title.",
};

/** Two lines spoken into a mirror: the reflection lags, softer and blurred, then catches up. */
const MirrorLine: React.FC<{ text: string; y: number; start: number; out: number }> = ({ text, y, start, out }) => {
  const frame = useCurrentFrame();
  const o = inOut(frame, start, out, 16);
  // reflection lags ~10 frames then sharpens — it "recognises" the line
  const rp = prog(frame, start + 10, 50);
  const block = (mirrored: boolean) => (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 960,
        top: y,
        paddingRight: 56,
        paddingLeft: 60,
        boxSizing: "border-box",
        textAlign: "right",
        fontFamily: F.serif,
        fontStyle: "italic",
        fontSize: 56,
        color: C.paper,
        opacity: mirrored ? o * lerp(0.0, 0.32, rp) : o,
        filter: mirrored ? `blur(${lerp(10, 1.5, rp)}px)` : undefined,
      }}
    >
      {mirrored ? text : <Words text={text} start={start} stagger={3} />}
    </div>
  );
  return (
    <>
      {block(false)}
      <AbsoluteFill style={{ transform: "scaleX(-1)" }}>{block(true)}</AbsoluteFill>
    </>
  );
};

export const C01ColdOpen: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const seamH = interpolate(frame, [14, 60], [0, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wipe = prog(frame, 168, 34);
  const dark = frame < 185;

  return (
    <CutFrame bg={C.night} dark={dark} direction={direction} showDirections={showDirections} pushIn={0.02}>
      {/* mirror seam */}
      <div
        style={{
          position: "absolute",
          left: 960 - lerp(1, 960, wipe),
          width: lerp(2, 1920, wipe),
          top: 540 - lerp(seamH / 2, 540, wipe),
          height: lerp(seamH, 1080, wipe),
          background: wipe > 0 ? C.paper : "linear-gradient(transparent, rgba(238,232,223,0.75), transparent)",
          boxShadow: "0 0 40px rgba(238,232,223,0.25)",
        }}
      />
      {frame < 190 && (
        <>
          <MirrorLine text="Have you ever disliked someone" y={410} start={34} out={160} />
          <MirrorLine text="so much you started questioning why?" y={510} start={84} out={160} />
        </>
      )}

      {/* title card */}
      {frame >= 190 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Kicker color={C.rose} opacity={inOut(frame, 196)} style={{ marginBottom: 36 }}>
            A personal psychology experiment
          </Kicker>
          <div style={{ fontFamily: F.serif, fontSize: 108, lineHeight: 1.04, color: C.ink, fontWeight: 500 }}>
            <Words text="What if the people you dislike" start={206} stagger={4} />
            <br />
            <Words
              text="are more like you than you think?"
              start={236}
              stagger={4}
              wordStyle={(w, i) => (w === "you" && i === 3 ? { fontStyle: "italic", color: C.rose } : undefined)}
            />
          </div>
          <div
            style={{
              marginTop: 44,
              height: 1,
              width: lerp(0, 520, prog(frame, 280, 30)),
              background: C.ink,
              opacity: 0.4,
            }}
          />
          <div style={{ marginTop: 26, fontFamily: F.sans, fontSize: 24, letterSpacing: 2, color: C.inkSoft, opacity: inOut(frame, 296) }}>
            projection · the shadow · the fear of being perceived
          </div>
        </AbsoluteFill>
      )}
    </CutFrame>
  );
};
