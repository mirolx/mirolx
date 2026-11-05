import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CutFrame, Direction } from "../components/CutFrame";
import { Typed, Words } from "../components/Text";
import { C, easeInOut, F, inOut, lerp, prog } from "../theme";

export const C07_DURATION = 480;

const direction: Direction = {
  cut: "CUT 07 / THE REFRAME",
  timecode: "≈9:05–9:30 (Ch.7)",
  cue: "instead of immediately asking, “What’s wrong with them?”",
  note: "Strike lands on the word 'ask:'. New question types in sync with the VO. Fade to night for the closing line; music resolves and the ending holds 2s.",
};

export const C07Reframe: React.FC<{ showDirections?: boolean }> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const strike = prog(frame, 76, 18);
  const lift = prog(frame, 104, 26, easeInOut);
  const night = prog(frame, 262, 30);

  return (
    <CutFrame bg={C.paper} dark={night > 0.5} direction={direction} showDirections={showDirections} pushIn={0.025}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 - night }}>
        <div
          style={{
            position: "relative",
            fontFamily: F.serif,
            fontSize: 96,
            color: C.ink,
            transform: `translateY(${lerp(0, -110, lift)}px) scale(${lerp(1, 0.62, lift)})`,
            opacity: lerp(1, 0.4, lift),
          }}
        >
          <Typed text="“What’s wrong with them?”" start={10} cps={18} caret={frame < 76} caretColor={C.rose} />
          <div
            style={{
              position: "absolute",
              left: -10,
              top: "54%",
              height: 5,
              width: `calc(${strike * 100}% + 20px)`,
              background: C.rose,
              borderRadius: 3,
            }}
          />
        </div>
        <div style={{ position: "absolute", top: 560, fontFamily: F.serif, fontStyle: "italic", fontSize: 104, color: C.ink }}>
          <Typed text="“Why does this bother me so much?”" start={132} cps={18} caretColor={C.rose} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: C.night, opacity: night, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontFamily: F.serif, fontSize: 104, lineHeight: 1.1, color: C.paper, fontWeight: 500 }}>
          <Words text="Humility doesn’t require" start={300} stagger={5} />
          <br />
          <Words text="self-minimization." start={330} stagger={5} style={{ fontStyle: "italic", color: C.roseSoft }} />
        </div>
        <div style={{ marginTop: 70, fontFamily: F.sans, fontSize: 22, letterSpacing: 4, color: "rgba(238,232,223,0.55)", opacity: inOut(frame, 390) }}>
          LEARNING TO LET MYSELF BE SEEN
        </div>
      </AbsoluteFill>
    </CutFrame>
  );
};
