import React from "react";
import { useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Kicker, Words } from "../components/Text";
import { C, easeInOut, F, inOut, lerp, prog } from "../theme";

export const C04_DURATION = 390;

const direction: Direction = {
  cut: "CUT 04 / THE SHADOW",
  timecode: "≈4:40–5:05 (Ch.4, Theory 1)",
  cue: "The shadow represents aspects of ourselves that we don’t fully recognize…",
  note: "Full-screen graphic over VO. The shadow grows as if a light has shifted. Qualities drift in on 'ambition, confidence, assertiveness'. Hold on 'not necessarily negative.'",
};

const self = { x: 1320, y: 470, r: 170 };
const shadow = { x: 1450, y: 600, r: 275 };

const traits = [
  { t: "ambition", from: [1840, 860], to: [1620, 720], at: 150 },
  { t: "confidence", from: [1860, 520], to: [1610, 600], at: 172 },
  { t: "assertiveness", from: [1500, 1060], to: [1450, 820], at: 194 },
  { t: "being admired", from: [1100, 1000], to: [1330, 735], at: 216 },
];

export const C04Shadow: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const grow = prog(frame, 40, 80, easeInOut);
  const dx = lerp(0, shadow.x - self.x, grow);
  const dy = lerp(0, shadow.y - self.y, grow);
  const r = lerp(self.r, shadow.r, grow);

  return (
    <CutFrame bg={C.paper} direction={direction} showDirections={showDirections}>
      <div style={{ position: "absolute", left: 140, top: 210, width: 760 }}>
        <Kicker color={C.rose} opacity={inOut(frame, 4)}>Theory 01 · Carl Jung</Kicker>
        <div style={{ fontFamily: F.serif, fontSize: 150, color: C.ink, lineHeight: 1, marginTop: 18, fontWeight: 500 }}>
          <Words text="The Shadow" start={10} stagger={7} />
        </div>
        <div style={{ fontFamily: F.serif, fontSize: 40, lineHeight: 1.3, color: C.inkSoft, marginTop: 40 }}>
          <Words text="The parts of ourselves we don’t recognise, or don’t accept, as part of who we are." start={60} stagger={2} />
        </div>
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 54, color: C.rose, marginTop: 56 }}>
          <Words text="Not necessarily negative." start={262} stagger={5} />
        </div>
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <circle cx={self.x + dx} cy={self.y + dy} r={r} fill={C.ink} opacity={0.92 * prog(frame, 30, 20)} filter="url(#soft)" />
        <circle
          cx={self.x}
          cy={self.y}
          r={self.r}
          fill="#F7F3EC"
          stroke={C.ink}
          strokeWidth={2}
          opacity={prog(frame, 14, 20)}
        />
        <text x={self.x} y={self.y - 6} textAnchor="middle" fontFamily={F.serif} fontSize={40} fill={C.ink} opacity={prog(frame, 24, 20)}>
          who I think
        </text>
        <text x={self.x} y={self.y + 40} textAnchor="middle" fontFamily={F.serif} fontStyle="italic" fontSize={40} fill={C.ink} opacity={prog(frame, 24, 20)}>
          I am
        </text>
        {traits.map((tr) => {
          const p = prog(frame, tr.at, 60, easeInOut);
          const x = lerp(tr.from[0], tr.to[0], p);
          const y = lerp(tr.from[1], tr.to[1], p);
          return (
            <text
              key={tr.t}
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily={F.serif}
              fontStyle="italic"
              fontSize={36}
              fill={C.paper}
              opacity={prog(frame, tr.at, 16) * lerp(0.6, 1, p)}
            >
              {tr.t}
            </text>
          );
        })}
      </svg>
    </CutFrame>
  );
};
