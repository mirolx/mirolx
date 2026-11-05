import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Words } from "../components/Text";
import { C, F, inOut, lerp, prog } from "../theme";

export const C06_DURATION = 450;

const direction: Direction = {
  cut: "CUT 06 / WHO I’M NOT",
  timecode: "≈7:20–7:55 (Ch.5)",
  cue: "We also want to establish who we are not.",
  note: "Each pair lands on its VO line, with a beat of silence between. Then the overlap pulls apart on 'Similarity doesn’t mean identity.' Let it breathe for 2s.",
};

const pairs = [
  ["I can be ambitious", "without being arrogant."],
  ["I can be creative", "without being self-important."],
  ["I can be confident", "without constantly proving myself."],
];

export const C06WhoImNot: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const phase1 = 1 - prog(frame, 200, 20);
  const venn = prog(frame, 216, 24);
  const apart = prog(frame, 290, 60);
  const sep = lerp(150, 330, apart);

  return (
    <CutFrame bg={C.night} dark direction={direction} showDirections={showDirections}>
      {frame < 225 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: phase1 }}>
          <div style={{ fontFamily: F.sans, fontSize: 24, letterSpacing: 3, color: "rgba(238,232,223,0.55)", marginBottom: 60, opacity: inOut(frame, 4) }}>
            We don’t just define who we are. We define who we are not.
          </div>
          {pairs.map(([a, b], i) => (
            <div key={a} style={{ fontFamily: F.serif, fontSize: 68, lineHeight: 1.5, color: C.paper, textAlign: "center" }}>
              <Words text={a} start={26 + i * 48} stagger={3} />{" "}
              <Words text={b} start={42 + i * 48} stagger={3} style={{ fontStyle: "italic", color: C.roseSoft }} />
            </div>
          ))}
        </AbsoluteFill>
      )}

      {frame >= 200 && (
        <AbsoluteFill style={{ opacity: venn }}>
          <svg width={1920} height={1080}>
            <circle cx={960 - sep} cy={470} r={260} fill="rgba(217,179,170,0.10)" stroke={C.roseSoft} strokeWidth={2} />
            <circle cx={960 + sep} cy={470} r={260} fill="rgba(238,232,223,0.06)" stroke={C.paper} strokeWidth={2} />
            <text x={960 - sep - 90} y={480} textAnchor="middle" fontFamily={F.serif} fontStyle="italic" fontSize={56} fill={C.roseSoft}>
              her
            </text>
            <text x={960 + sep + 90} y={480} textAnchor="middle" fontFamily={F.serif} fontStyle="italic" fontSize={56} fill={C.paper}>
              me
            </text>
            <g opacity={1 - apart}>
              {["ambition", "creativity", "drive"].map((t, i) => (
                <text key={t} x={960} y={425 + i * 44} textAnchor="middle" fontFamily={F.sans} fontSize={24} letterSpacing={2} fill={C.paper}>
                  {t}
                </text>
              ))}
            </g>
          </svg>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 820,
              textAlign: "center",
              fontFamily: F.serif,
              fontSize: 78,
              color: C.paper,
            }}
          >
            <Words text="Similarity doesn’t mean identity." start={330} stagger={5} />
          </div>
        </AbsoluteFill>
      )}
    </CutFrame>
  );
};
