import React from "react";
import { useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Kicker, Words } from "../components/Text";
import { C, F, inOut, lerp, prog } from "../theme";

export const C05_DURATION = 450;

const direction: Direction = {
  cut: "CUT 05 / THREE SELVES",
  timecode: "≈5:20–5:55 (Ch.4, Theory 2)",
  cue: "Our actual self… our ideal self… and our ought self.",
  note: "Each ring lands on its word in the VO. My own lines write in underneath. The gap line draws on 'I sometimes deliberately downplay my achievements.'",
};

const selves = [
  { x: 470, name: "Actual self", def: "who I believe I am", mine: "ambitious · creative" },
  { x: 960, name: "Ideal self", def: "who I want to become", mine: "building things · successful" },
  { x: 1450, name: "Ought self", def: "who I believe I should be", mine: "never a show-off" },
];
const CY = 540;
const R = 175;

export const C05ThreeSelves: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const gap = prog(frame, 290, 50);
  const idealDim = lerp(1, 0.35, prog(frame, 282, 20));

  return (
    <CutFrame bg={C.paper} direction={direction} showDirections={showDirections}>
      <div style={{ position: "absolute", left: 140, top: 86 }}>
        <Kicker color={C.rose} opacity={inOut(frame, 4)}>Theory 02 · E. Tory Higgins, 1987</Kicker>
        <div style={{ fontFamily: F.serif, fontSize: 76, color: C.ink, marginTop: 12, fontWeight: 500 }}>
          <Words text="Self-discrepancy theory" start={8} stagger={5} />
        </div>
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {selves.map((s, i) => {
          const p = prog(frame, 40 + i * 40, 34);
          const dim = i === 1 ? idealDim : 1;
          return (
            <g key={s.name} opacity={dim}>
              <circle
                cx={s.x}
                cy={CY}
                r={R}
                fill="none"
                stroke={i === 1 ? C.mute : C.ink}
                strokeWidth={2}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
                transform={`rotate(-90 ${s.x} ${CY})`}
              />
              <text x={s.x} y={CY + 6} textAnchor="middle" fontFamily={F.serif} fontWeight={500} fontSize={52} fill={C.ink} opacity={p}>
                {s.name}
              </text>
              <text x={s.x} y={CY + 52} textAnchor="middle" fontFamily={F.sans} fontSize={20} fill={C.inkSoft} opacity={p}>
                {s.def}
              </text>
              <text
                x={s.x}
                y={CY + R + 62}
                textAnchor="middle"
                fontFamily={F.serif}
                fontStyle="italic"
                fontSize={38}
                fill={C.rose}
                opacity={prog(frame, 170 + i * 26, 22)}
              >
                {s.mine}
              </text>
            </g>
          );
        })}

        {/* the gap between actual and ought */}
        <path
          d={`M ${selves[0].x} ${CY - R - 20} C ${selves[0].x + 180} ${CY - R - 120}, ${selves[2].x - 180} ${CY - R - 120}, ${selves[2].x} ${CY - R - 20}`}
          fill="none"
          stroke={C.rose}
          strokeWidth={3}
          strokeDasharray="10 12"
          opacity={gap}
          strokeDashoffset={lerp(200, 0, gap)}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 830,
          textAlign: "center",
          fontFamily: F.serif,
          fontSize: 46,
          color: C.ink,
        }}
      >
        <Words text="The gap: I downplay my achievements so I won’t be seen as arrogant." start={330} stagger={3} wordStyle={(_, i) => (i < 2 ? { color: C.rose, fontStyle: "italic" } : undefined)} />
      </div>
    </CutFrame>
  );
};
