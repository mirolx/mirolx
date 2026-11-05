import React from "react";
import { Composition, Series } from "remotion";
import { C01ColdOpen, C01_DURATION } from "./cuts/C01ColdOpen";
import { C02CaseFile, C02_DURATION } from "./cuts/C02CaseFile";
import { C03AIMirror, C03_DURATION } from "./cuts/C03AIMirror";
import { C04Shadow, C04_DURATION } from "./cuts/C04Shadow";
import { C05ThreeSelves, C05_DURATION } from "./cuts/C05ThreeSelves";
import { C06WhoImNot, C06_DURATION } from "./cuts/C06WhoImNot";
import { C07Reframe, C07_DURATION } from "./cuts/C07Reframe";
import { FPS, H, W } from "./theme";

type CutProps = { showDirections?: boolean };

export const CUTS: { id: string; component: React.FC<CutProps>; duration: number }[] = [
  { id: "Cut01-ColdOpen", component: C01ColdOpen, duration: C01_DURATION },
  { id: "Cut02-CaseFile", component: C02CaseFile, duration: C02_DURATION },
  { id: "Cut03-AIMirror", component: C03AIMirror, duration: C03_DURATION },
  { id: "Cut04-Shadow", component: C04Shadow, duration: C04_DURATION },
  { id: "Cut05-ThreeSelves", component: C05ThreeSelves, duration: C05_DURATION },
  { id: "Cut06-WhoImNot", component: C06WhoImNot, duration: C06_DURATION },
  { id: "Cut07-Reframe", component: C07Reframe, duration: C07_DURATION },
];

const Reel: React.FC<CutProps> = ({ showDirections }) => (
  <Series>
    {CUTS.map((c) => (
      <Series.Sequence key={c.id} durationInFrames={c.duration}>
        <c.component showDirections={showDirections} />
      </Series.Sequence>
    ))}
  </Series>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="DirectionReel"
      component={Reel}
      durationInFrames={CUTS.reduce((s, c) => s + c.duration, 0)}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{ showDirections: true }}
    />
    {CUTS.map((c) => (
      <Composition
        key={c.id}
        id={c.id}
        component={c.component}
        durationInFrames={c.duration}
        fps={FPS}
        width={W}
        height={H}
        // set false to export clean graphics for your edit timeline
        defaultProps={{ showDirections: false }}
      />
    ))}
  </>
);
