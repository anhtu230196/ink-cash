// B03 · THE LOCKED DOOR — voice/03_the-locked-door.mp3 → lines b03_001…b03_033 (84.8 s).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotBannedChip, ShotBlocked, ShotCharge, ShotDeskClose, ShotDeskWide, ShotDoors, ShotFerrari, ShotFormBricks, ShotGov, ShotLicense, ShotNoStamp,
  ShotPacificWall, ShotParty, ShotPastSign, ShotSpeedLimit, ShotStampBlocked, ShotToBeijing, ShotTricycle, ShotWatch, ShotWorkbench,
} from "./shots";

const LINES = lineRange("b03", 1, 33);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "gov", at: 0, node: <ShotGov /> },
  { key: "pacific", at: T("b03_002"), node: <ShotPacificWall /> },
  { key: "forms", at: T("b03_003"), node: <ShotFormBricks /> },
  { key: "blocked", at: T("b03_004"), node: <ShotBlocked /> },
  { key: "stamp", at: T("b03_004", 3.1), node: <ShotStampBlocked /> },
  // the speed limit
  { key: "limit", at: T("b03_005"), node: <ShotSpeedLimit /> },
  { key: "too-fast", at: T("b03_006"), node: <ShotPastSign mode="fast" /> },
  { key: "license", at: T("b03_007"), node: <ShotLicense /> },
  { key: "beijing", at: T("b03_008"), node: <ShotToBeijing /> },
  { key: "no-stamp", at: T("b03_009"), node: <ShotNoStamp /> },
  { key: "respond", at: T("b03_010"), node: <BlackCard text="So how does Nvidia respond?" /> },
  { key: "slower", at: T("b03_011"), node: <ShotWorkbench from={1} to={0.8} sticker="CHINA EDITION" /> },
  { key: "solved", at: T("b03_012"), node: <ShotPastSign mode="legal" /> },
  { key: "not-long", at: T("b03_013"), node: <BlackCard text="Not for long." /> },
  { key: "lower", at: T("b03_014"), node: <ShotSpeedLimit limit={0.7} to={0.45} sam date="October 2023" /> },
  { key: "banned", at: T("b03_015"), node: <ShotBannedChip stampText="BANNED" /> },
  { key: "h20", at: T("b03_016"), node: <ShotWorkbench from={0.8} to={0.4} sticker="H20" label="H20" /> },
  { key: "ferrari", at: T("b03_017"), node: <ShotFerrari /> },
  // skit: H20 on tricycle wheels
  { key: "tri-1", at: T("b03_018"), node: <ShotTricycle line="b03_018" who="gpu" text="Why am I so slow?" /> },
  { key: "tri-2", at: T("b03_019"), node: <ShotTricycle line="b03_019" who="gpu2" text="You're the LEGAL model." close /> },
  { key: "restrict", at: T("b03_020"), node: <ShotBannedChip stampText="RESTRICTED" label="H20" sam date="April 2025" /> },
  { key: "charge", at: T("b03_021"), node: <ShotCharge /> },
  { key: "party", at: T("b03_022"), node: <ShotParty /> },
  // skit: the official and the salesman
  { key: "desk-1", at: T("b03_023"), node: <ShotDeskWide line="b03_023" who="official" text="This chip is too fast for China." /> },
  { key: "desk-2", at: T("b03_024"), node: <ShotDeskClose line="b03_024" who="salesman" text="No problem! We made a slower one." box="slower" /> },
  { key: "desk-3", at: T("b03_025"), node: <ShotDeskClose line="b03_025" who="official" text="That one is also too fast." box="slower" /> },
  { key: "desk-4", at: T("b03_026"), node: <ShotDeskClose line="b03_026" who="salesman" text="So we made an even slower one!" box="slowest" /> },
  { key: "desk-5", at: T("b03_027"), node: <ShotDeskWide line="b03_027" who="official" text="Still… too fast." box="slowest" se="worried" /> },
  { key: "desk-6", at: T("b03_028"), node: <ShotDeskClose line="b03_028" who="salesman" text="What if I just ship the empty box?" box="empty" se="awkward" /> },
  { key: "desk-7", at: T("b03_029"), node: <ShotDeskWide line="b03_029" who="official" text="Fill out form seven." box="empty" se="surprised" formDrop /> },
  // locked doors, but the math floats over
  { key: "doors", at: T("b03_030"), node: <ShotDoors /> },
  { key: "watch", at: T("b03_032"), node: <ShotWatch /> },
  { key: "math", at: T("b03_033"), node: <BlackCard text="Not where the math goes." /> },
];

export const B03_FRAMES = f(total);
export const B03: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B03_SHOT_FRAMES = shotFrames(LINES, SHOTS);
