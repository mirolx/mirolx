import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Kicker, Typed, Words } from "../components/Text";
import { C, F, inOut, lerp, prog } from "../theme";

export const C02_DURATION = 390;

const direction: Direction = {
  cut: "CUT 02 / CASE FILE",
  timecode: "≈2:00–2:13 (Ch.2)",
  cue: "So, initially, I thought it was simply a matter of taste.",
  note: "Hard cut from A-roll. Cards land on each reason. Red circle hits on 'My ex-boyfriend actually liked her.' No artist photos: keep it about my reaction, not her.",
};

const layers = [
  { n: "01", title: "Intellectual disagreement", quote: "“I understand the message. I just don’t relate to it.”" },
  { n: "02", title: "Perceived authenticity", quote: "“It feels like a wealthy person talking about capitalism.”" },
  { n: "03", title: "Aesthetic preference", quote: "“I’m just not drawn to her image.”" },
  { n: "04", title: "Personal association", quote: "“My ex-boyfriend actually liked her.”" },
];

export const C02CaseFile: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const focus = prog(frame, 200, 24); // dims cards 1–3
  const circle = prog(frame, 214, 30);

  return (
    <CutFrame bg={C.paper} direction={direction} showDirections={showDirections}>
      {/* journal ruling + margin line */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 53px, ${C.line} 53px, ${C.line} 54px)`,
          opacity: 0.6,
        }}
      />
      <div style={{ position: "absolute", left: 104, top: 0, bottom: 0, width: 2, background: "rgba(176,113,106,0.35)" }} />

      <div style={{ position: "absolute", left: 140, top: 96 }}>
        <Kicker color={C.rose} opacity={inOut(frame, 6)}>Case study 01 · my reaction</Kicker>
        <div style={{ fontFamily: F.serif, fontSize: 92, color: C.ink, marginTop: 14, fontWeight: 500 }}>
          <Words text="Why don’t I like her?" start={14} stagger={5} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 140, top: 360, display: "flex", gap: 32 }}>
        {layers.map((l, i) => {
          const p = prog(frame, 56 + i * 30, 26);
          const isKey = i === 3;
          const dim = isKey ? 1 : lerp(1, 0.32, focus);
          return (
            <div
              key={l.n}
              style={{
                position: "relative",
                width: 390,
                height: 300,
                padding: "30px 30px",
                boxSizing: "border-box",
                background: "#F7F3EC",
                borderRadius: 6,
                boxShadow: "0 18px 40px rgba(29,26,23,0.10), 0 2px 6px rgba(29,26,23,0.08)",
                transform: `translateY(${lerp(80, 0, p)}px) rotate(${lerp(i % 2 ? 3 : -3, i % 2 ? 0.8 : -0.8, p)}deg)`,
                opacity: p * dim,
              }}
            >
              <div style={{ fontFamily: F.mono, fontSize: 18, color: C.rose, letterSpacing: 3 }}>LAYER {l.n}</div>
              <div style={{ fontFamily: F.serif, fontSize: 40, lineHeight: 1.08, color: C.ink, marginTop: 16, fontWeight: 500 }}>{l.title}</div>
              <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 28, lineHeight: 1.25, color: C.inkSoft, marginTop: 22 }}>
                {l.quote}
              </div>
              {isKey && (
                <svg width={470} height={380} style={{ position: "absolute", left: -40, top: -40, overflow: "visible" }}>
                  <path
                    d="M 60 60 C 180 -10, 420 0, 450 140 C 475 260, 370 370, 210 360 C 70 352, 0 260, 22 150 C 34 92, 90 52, 150 40"
                    fill="none"
                    stroke={C.rose}
                    strokeWidth={5}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1 - circle}
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 140,
          top: 760,
          fontFamily: F.serif,
          fontStyle: "italic",
          fontSize: 64,
          color: C.ink,
        }}
      >
        <Typed text="“What does he actually see in her?”" start={262} cps={20} caretColor={C.rose} />
      </div>

      <div
        style={{
          position: "absolute",
          right: 80,
          top: 110,
          width: 420,
          textAlign: "right",
          fontFamily: F.sans,
          fontSize: 18,
          lineHeight: 1.5,
          color: C.inkSoft,
          opacity: inOut(frame, 40) * 0.9,
        }}
      >
        My personal taste and interpretation of an artistic persona, not a claim about anyone’s real intentions.
      </div>
    </CutFrame>
  );
};
