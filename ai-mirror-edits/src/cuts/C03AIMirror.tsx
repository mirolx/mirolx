import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Kicker, Typed, Words } from "../components/Text";
import { C, easeInOut, F, inOut, lerp, prog } from "../theme";

export const C03_DURATION = 480;

const direction: Direction = {
  cut: "CUT 03 / THE AI MIRROR",
  timecode: "2:40–3:50 (Ch.3)",
  cue: "And one particular discovery really stood out to me.",
  note: "Stylised chat stands in for your screen recording; swap in the real one if you like, but keep the punch-in. Music dips to a single pad under the highlighted line.",
};

const options = [
  "Happy, because those are qualities I appreciate",
  "Slightly uncomfortable, because I don’t want to be perceived that way",
  "Defensive, because those qualities don’t describe me",
  "It depends on how the person expresses them",
];

export const C03AIMirror: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const toKey = prog(frame, 300, 34); // chat recedes, key line takes over
  const pick = prog(frame, 262, 5);
  const hl = prog(frame, 380, 40, easeInOut);

  return (
    <CutFrame bg={C.night} dark direction={direction} showDirections={showDirections} pushIn={0.03}>
      <div style={{ position: "absolute", left: 80, top: 64, opacity: inOut(frame, 4) }}>
        <Kicker color={C.roseSoft}>The AI Mirror · ep. 01</Kicker>
      </div>

      {/* chat panel */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: lerp(1, 0.12, toKey),
          filter: `blur(${lerp(0, 10, toKey)}px)`,
          transform: `scale(${lerp(1, 0.94, toKey)})`,
        }}
      >
        <div
          style={{
            width: 1180,
            height: 820,
            borderRadius: 28,
            background: "#191B1E",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            padding: "28px 56px",
            boxSizing: "border-box",
            fontFamily: F.sans,
            color: C.paper,
            opacity: prog(frame, 0, 12),
            transform: `translateY(${lerp(24, 0, prog(frame, 0, 12))}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, color: "rgba(238,232,223,0.5)", paddingBottom: 22, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: C.rose }} />
            reflection session · why do I dislike her?
          </div>

          {/* my question */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 34, opacity: prog(frame, 16, 10) }}>
            <div style={{ maxWidth: 720, background: C.paper, color: C.ink, borderRadius: 22, padding: "18px 26px", fontSize: 26, lineHeight: 1.4 }}>
              <Typed text="I don’t want you to tell me why I dislike her. Help me examine my own reaction." start={18} cps={34} caretColor={C.rose} />
            </div>
          </div>

          {/* reply */}
          <div style={{ marginTop: 34, maxWidth: 940, fontSize: 26, lineHeight: 1.5, color: "rgba(238,232,223,0.88)" }}>
            <Words
              text="Let’s not assume it’s a defect. We’ll look at projection, Jung’s shadow, and self-discrepancy, then test each one against your answers."
              start={108}
              stagger={2}
              dur={14}
            />
          </div>

          {/* quiz */}
          <div style={{ marginTop: 34, opacity: prog(frame, 190, 16) }}>
            <div style={{ fontSize: 21, color: "rgba(238,232,223,0.6)", marginBottom: 14 }}>
              If someone described you with the same traits you see in her, you’d feel…
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {options.map((o, i) => {
                const chosen = i === 1;
                const p = prog(frame, 200 + i * 2, 10);
                return (
                  <div
                    key={o}
                    style={{
                      opacity: p * (chosen ? 1 : lerp(1, 0.4, pick)),
                      transform: `translateX(${lerp(20, 0, p)}px)`,
                      padding: "12px 20px",
                      borderRadius: 14,
                      fontSize: 21,
                      border: `1px solid ${chosen ? `rgba(176,113,106,${lerp(0.2, 1, pick)})` : "rgba(255,255,255,0.1)"}`,
                      background: chosen ? `rgba(176,113,106,${lerp(0, 0.28, pick)})` : "transparent",
                    }}
                  >
                    <span style={{ fontFamily: F.mono, color: C.roseSoft, marginRight: 14 }}>{"ABCD"[i]}</span>
                    {o}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* the key line — punch-in */}
      {frame >= 300 && (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 220px" }}>
          <div style={{ fontFamily: F.serif, fontSize: 70, lineHeight: 1.2, color: C.paper }}>
            <Words text="I might not dislike the qualities I share with her." start={312} stagger={3} />
          </div>
          <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 70, lineHeight: 1.2, color: C.paper, marginTop: 18, position: "relative" }}>
            <span
              style={{
                backgroundImage: "linear-gradient(rgba(176,113,106,0.5), rgba(176,113,106,0.5))",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${hl * 100}% 42%`,
                backgroundPosition: "0 88%",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              <Words text="I might dislike the possibility of being perceived the way I perceive her." start={344} stagger={3} />
            </span>
          </div>
        </AbsoluteFill>
      )}

      <div
        style={{
          position: "absolute",
          right: 80,
          top: 66,
          fontFamily: F.sans,
          fontSize: 18,
          color: "rgba(238,232,223,0.5)",
          opacity: inOut(frame, 30),
        }}
      >
        AI as a reflection partner, not a mind reader
      </div>
    </CutFrame>
  );
};
