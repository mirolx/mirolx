import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Direction } from "../components/CutFrame";
import { ease, easeInOut, lerp, prog } from "../theme";
import { B, BoldFrame, Col, Lead, Pill, Ring, STAGGER } from "./kit";

type P = { showDirections?: boolean };
const d = (cut: string, timecode: string, cue: string, note: string): Direction => ({ cut: `BOLD ${cut}`, timecode, cue, note });
const out = (frame: number, at: number, dur = 16) => 1 - prog(frame, at, dur, easeInOut);
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 22 }) => (
  <div style={{ display: "flex", gap, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

/* 01 — Hook */
export const Bold01: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  return (
    <BoldFrame showDirections={showDirections} direction={d("01 / HOOK", "0:00–0:12", "Have you ever disliked someone…", "Ring draws as you ask the question; each pill lands on its phrase. Tag row pops in on 'Today, I want to explore'.")}>
      <Ring start={8} big="?" label="about you" bigSize={260} />
      <Col>
        <Lead start={30}>what if the people you dislike…</Lead>
        <Pill start={72} size={64}>
          are more like <span style={{ color: "#C98A0B" }}>you</span>
        </Pill>
        <Pill start={104} size={64}>than you think?</Pill>
        <div style={{ height: 30 }} />
        <Row gap={16}>
          {["projection", "the shadow", "fear of being perceived"].map((t, i) => (
            <Pill key={t} start={210 + i * STAGGER} size={30}>
              {t}
            </Pill>
          ))}
        </Row>
      </Col>
    </BoldFrame>
  );
};

/* 02 — Case file */
export const Bold02: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const focus = prog(frame, 214, 8, ease);
  const layers = ["01  I don’t relate to the message", "02  it feels performative", "03  not my aesthetic", "04  my ex-boyfriend liked her"];
  return (
    <BoldFrame showDirections={showDirections} direction={d("02 / CASE FILE", "≈2:00–2:13 (Ch.2)", "…simply a matter of taste.", "One pill per reason, on the VO. Pill 04 turns mustard on 'my ex-boyfriend actually liked her'; the others step back.")}>
      <Ring start={8} big="4" label="layers" />
      <Col gap={22}>
        <Lead start={18}>why don’t I like her?</Lead>
        {layers.map((t, i) => (
          <Pill key={t} start={56 + i * 30} size={40} accent={i === 3 ? focus : 0} dim={i === 3 ? 0 : focus}>
            {t}
          </Pill>
        ))}
        <div style={{ height: 18 }} />
        <Pill start={262} size={42}>
          “what does he actually see in her?”
        </Pill>
      </Col>
      <div style={{ position: "absolute", right: 80, top: 70, width: 440, textAlign: "right", fontSize: 17, fontWeight: 500, color: B.slate, opacity: prog(frame, 30, 12) }}>
        My taste and interpretation of an artistic persona, not a claim about anyone’s real intentions.
      </div>
    </BoldFrame>
  );
};

/* 03 — The AI mirror */
export const Bold03: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const pick = prog(frame, 120, 5, ease);
  const swap = out(frame, 290, 18);
  const opts = ["A  happy, I like those qualities", "B  uncomfortable, I don’t want to be seen that way", "C  defensive, that’s not me", "D  it depends"];
  return (
    <BoldFrame showDirections={showDirections} direction={d("03 / THE AI MIRROR", "2:40–3:50 (Ch.3)", "And one particular discovery really stood out to me.", "Options pop as a group; B snaps to mustard like a tap. Swap to the key line on 'I realized'. Music dips under it.")}>
      <Ring start={112} big="B" label="my answer" />
      <div style={{ position: "absolute", left: 80, top: 66, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: B.slate, opacity: prog(frame, 4, 10) }}>
        THE AI MIRROR · EP. 01
      </div>
      <div style={{ position: "absolute", right: 80, top: 70, fontSize: 18, fontWeight: 500, color: B.slate, opacity: prog(frame, 20, 12) }}>
        AI as a reflection partner, not a mind reader
      </div>
      {frame < 310 && (
        <div style={{ opacity: swap }}>
          <Col gap={18}>
            <Lead start={20} size={40}>
              if someone described you like her, you’d feel…
            </Lead>
            {opts.map((o, i) => (
              <Pill key={o} start={40 + i * STAGGER} size={32} accent={i === 1 ? pick : 0} dim={i === 1 ? 0 : pick}>
                {o}
              </Pill>
            ))}
          </Col>
        </div>
      )}
      {frame >= 296 && (
        <Col gap={26}>
          <Lead start={300} size={46}>
            I might not dislike the qualities I share with her.
          </Lead>
          <Pill start={336} size={50}>I might dislike being perceived</Pill>
          <Pill start={344} size={50} accent={prog(frame, 380, 8, ease)}>
            the way I perceive her.
          </Pill>
        </Col>
      )}
    </BoldFrame>
  );
};

/* 04 — The shadow */
export const Bold04: React.FC<P> = ({ showDirections }) => {
  const traits = ["ambition", "confidence", "assertiveness", "being admired"];
  return (
    <BoldFrame showDirections={showDirections} direction={d("04 / THE SHADOW", "≈4:40–5:05 (Ch.4)", "Then there’s Carl Jung’s concept of the shadow.", "Navy ring = the part of you out of view. Trait pills land word-by-word with the VO; mustard pill holds on 'not necessarily negative'.")}>
      <Ring start={8} big="01" label="theory" color={B.navy} />
      <Col gap={24}>
        <Lead start={18}>Carl Jung’s</Lead>
        <Pill start={34} size={84}>the shadow</Pill>
        <Lead start={70} size={36}>
          parts of me I don’t accept as “me”
        </Lead>
        <Row gap={16}>
          {traits.map((t, i) => (
            <Pill key={t} start={150 + i * 22} size={34}>
              {t}
            </Pill>
          ))}
        </Row>
        <Pill start={262} size={44} accent={1}>
          not necessarily negative
        </Pill>
      </Col>
    </BoldFrame>
  );
};

/* 05 — Three selves */
export const Bold05: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const idealDim = lerp(1, 0.3, prog(frame, 282, 14, easeInOut));
  const gap = prog(frame, 290, 30, easeInOut);
  const selves = [
    { cx: 400, big: "actual", mine: "ambitious · creative", at: 40 },
    { cx: 960, big: "ideal", mine: "build things · succeed", at: 80 },
    { cx: 1520, big: "ought", mine: "never a show-off", at: 120 },
  ];
  return (
    <BoldFrame showDirections={showDirections} direction={d("05 / THREE SELVES", "≈5:20–5:55 (Ch.4)", "Our actual self…", "Each ring draws on its word. Your lines pop under them. Ideal steps back, the gap arc draws, and the mustard pill lands on 'I sometimes deliberately downplay my achievements'.")}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
        <Lead start={6} size={44}>
          self-discrepancy theory · Higgins, 1987
        </Lead>
      </div>
      {selves.map((s, i) => (
        <AbsoluteFill key={s.big} style={{ opacity: i === 1 ? idealDim : 1 }}>
          <Ring start={s.at} big={s.big} label="self" cx={s.cx} cy={470} r={175} bigSize={56} color={i === 1 ? "#C9C4BB" : B.mustard} />
          <div style={{ position: "absolute", left: s.cx - 300, width: 600, top: 700, textAlign: "center" }}>
            <Pill start={170 + i * 26} size={30}>
              {s.mine}
            </Pill>
          </div>
        </AbsoluteFill>
      ))}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path
          d="M 400 250 C 700 110, 1220 110, 1520 250"
          fill="none"
          stroke={B.navy}
          strokeWidth={5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - gap}
        />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 830, textAlign: "center" }}>
        <Pill start={330} size={40} accent={1}>
          the gap: I downplay my achievements
        </Pill>
      </div>
    </BoldFrame>
  );
};

/* 06 — Who I'm not */
export const Bold06: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const p1 = out(frame, 196, 16);
  const venn = prog(frame, 210, 10, ease);
  const apart = prog(frame, 290, 40, easeInOut);
  const sep = lerp(130, 300, apart);
  const pairs = [
    ["ambitious", "arrogant"],
    ["creative", "self-important"],
    ["confident", "always proving myself"],
  ];
  return (
    <BoldFrame showDirections={showDirections} direction={d("06 / WHO I’M NOT", "≈7:20–7:55 (Ch.5)", "We also want to establish who we are not.", "Each 'not' gets struck as you say it. Then the rings pull apart on 'Similarity doesn’t mean identity.' Hold 2s.")}>
      {frame < 214 && (
        <AbsoluteFill style={{ opacity: p1 }}>
          <Ring start={4} big="≠" label="who I’m not" />
          <Col gap={26}>
            <Lead start={10}>I can be…</Lead>
            {pairs.map(([yes, no], i) => (
              <Row key={yes}>
                <Pill start={26 + i * 48} size={46} accent={1}>
                  {yes}
                </Pill>
                <Pill start={40 + i * 48} size={46} strike={prog(frame, 52 + i * 48, 10, ease)} dim={prog(frame, 56 + i * 48, 10, ease) * 0.6}>
                  {no}
                </Pill>
              </Row>
            ))}
          </Col>
        </AbsoluteFill>
      )}
      {frame >= 200 && (
        <AbsoluteFill style={{ opacity: venn, transform: `scale(${lerp(0.96, 1, venn)})` }}>
          <svg width={1920} height={1080}>
            <circle cx={960 - sep} cy={450} r={230} fill="none" stroke={B.mustard} strokeWidth={30} />
            <circle cx={960 + sep} cy={450} r={230} fill="none" stroke={B.navy} strokeWidth={30} />
          </svg>
          <div style={{ position: "absolute", left: 960 - sep - 130 - 80 * (1 - apart), width: 260, top: 410, opacity: apart, textAlign: "center", fontSize: 64, fontWeight: 800, color: B.navy }}>her</div>
          <div style={{ position: "absolute", left: 960 + sep - 130 + 80 * (1 - apart), width: 260, top: 410, opacity: apart, textAlign: "center", fontSize: 64, fontWeight: 800, color: B.navy }}>me</div>
          <div style={{ position: "absolute", left: 760, width: 400, top: 395, textAlign: "center", fontSize: 28, fontWeight: 700, lineHeight: 1.5, color: B.slate, opacity: 1 - apart }}>
            ambition
            <br />
            creativity
            <br />
            drive
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 790, textAlign: "center" }}>
            <Pill start={330} size={60}>
              similarity ≠ identity
            </Pill>
          </div>
        </AbsoluteFill>
      )}
    </BoldFrame>
  );
};

/* 07 — Reframe */
export const Bold07: React.FC<P> = ({ showDirections }) => {
  const frame = useCurrentFrame();
  const p1 = out(frame, 256, 16);
  return (
    <BoldFrame showDirections={showDirections} direction={d("07 / THE REFRAME", "≈9:05–9:30 (Ch.7)", "instead of immediately asking, “What’s wrong with them?”", "Strike on 'ask:'; the new question snaps to mustard. Swap to the closing line; hold it 2s for the outro.")}>
      {frame < 274 && (
        <AbsoluteFill style={{ opacity: p1 }}>
          <Ring start={6} big="?" label="next time" bigSize={260} />
          <Col gap={34}>
            <Lead start={14}>instead of asking…</Lead>
            <Pill start={24} size={52} strike={prog(frame, 76, 10, ease)} dim={prog(frame, 84, 10, ease) * 0.6}>
              “what’s wrong with them?”
            </Pill>
            <Lead start={120}>try asking…</Lead>
            <Pill start={132} size={42} accent={prog(frame, 200, 8, ease)}>
              “why does this bother me so much?”
            </Pill>
          </Col>
        </AbsoluteFill>
      )}
      {frame >= 266 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 34 }}>
          <Lead start={276} size={84} style={{ color: B.navy, fontWeight: 800 }}>
            humility doesn’t require
          </Lead>
          <Pill start={300} size={96} accent={1}>
            self-minimization.
          </Pill>
          <Lead start={380} size={28} style={{ letterSpacing: 4, marginTop: 24 }}>
            LEARNING TO LET MYSELF BE SEEN
          </Lead>
        </AbsoluteFill>
      )}
    </BoldFrame>
  );
};
