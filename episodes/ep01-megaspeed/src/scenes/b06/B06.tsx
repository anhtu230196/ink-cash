// B06 · THE PIPELINE — voice/06_the-pipeline.mp3 → lines b06_001…b06_036 (110.2 s). No chapter card.
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import { ShotPitchClose } from "../b05/shots";
import {
  ShotAirfield, ShotBoxClose, ShotBoxWide, ShotCalcClose, ShotCalcWide, ShotCompare, ShotCount, ShotCouches, ShotDoorway, ShotGapBars, ShotHeadlines,
  ShotMonths, ShotNewsrooms, ShotPerChip, ShotPerHour, ShotPipeline, ShotShrink, ShotStatement, ShotTooSmall, ShotTotal,
} from "./shots";

const LINES = lineRange("b06", 1, 36);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "airfield", at: 0, node: <ShotAirfield /> },
  { key: "pipeline", at: T("b06_002"), node: <ShotPipeline /> },
  { key: "newsrooms", at: T("b06_003"), node: <ShotNewsrooms /> },
  { key: "three-counts", at: T("b06_004"), node: <BlackCard text="Three counts came back." /> },
  // count one
  { key: "count-1", at: T("b06_005"), node: <ShotCount n={1} /> },
  { key: "total-1", at: T("b06_006"), node: <ShotTotal label="COUNT 1 · Bloomberg · at least" dollars="$4.6 BILLION" chips="136,000 Nvidia chips" fill={0.57} /> },
  { key: "lot", at: T("b06_007"), node: <ShotPitchClose line="b06_007" who="i1" text="That's a LOT of chips!" e1="surprised" slide={1} /> },
  { key: "count-one", at: T("b06_008"), node: <ShotPitchClose line="b06_008" who="i2" text="That was… count one." e2="smug" slide={1} /> },
  // count two
  { key: "count-2", at: T("b06_009"), node: <ShotCount n={2} /> },
  { key: "total-2", at: T("b06_010"), node: <ShotTotal label="COUNT 2 · The New York Times · at least" dollars="$4.8 BILLION" fill={0.6} /> },
  // count three
  { key: "count-3", at: T("b06_011"), node: <ShotCount n={3} /> },
  { key: "total-3", at: T("b06_012"), node: <ShotTotal label="COUNT 3 · The Information" dollars="$7.5 BILLION" chips="~240,000 chips" fill={1} /> },
  { key: "different", at: T("b06_013"), node: <BlackCard text="Different records. Different totals." /> },
  // shrink it down
  { key: "shrink", at: T("b06_014"), node: <ShotShrink /> },
  { key: "per-chip", at: T("b06_015"), node: <ShotPerChip /> },
  { key: "car", at: T("b06_016"), node: <ShotPerChip car /> },
  { key: "months", at: T("b06_017"), node: <ShotMonths /> },
  { key: "per-hour", at: T("b06_018"), node: <ShotPerHour /> },
  { key: "compare", at: T("b06_019"), node: <ShotCompare /> },
  // skit: the calculator
  { key: "calc-1", at: T("b06_020"), node: <ShotCalcWide line="b06_020" who="i1" text="Three hundred thousand an hour?" e1="surprised" /> },
  { key: "calc-2", at: T("b06_021"), node: <ShotCalcClose line="b06_021" who="i2" text="Every. Hour." e2="neutral" /> },
  { key: "calc-3", at: T("b06_022"), node: <ShotCalcClose line="b06_022" who="i1" text="Even on Sundays?" e1="worried" /> },
  { key: "calc-4", at: T("b06_023"), node: <ShotCalcWide line="b06_023" who="i2" text="Especially Sundays." e1="surprised" e2="smug" spark={1} shown="ERROR" /> },
  // the studio apartment
  { key: "gap", at: T("b06_024"), node: <ShotGapBars /> },
  { key: "too-small", at: T("b06_025"), node: <ShotTooSmall /> },
  { key: "couches", at: T("b06_026"), node: <ShotCouches /> },
  // skit: inside the box
  { key: "box-1", at: T("b06_027"), node: <ShotBoxWide line="b06_027" who="g1" text="Are we training AI yet?" e1="happy" /> },
  { key: "box-2", at: T("b06_028"), node: <ShotBoxClose line="b06_028" who="g2" text="Shh! Not yet." e2="angry" /> },
  { key: "box-3", at: T("b06_029"), node: <ShotBoxClose line="b06_029" who="g1" text="Then why is it so dark?" e1="worried" /> },
  { key: "box-4", at: T("b06_030"), node: <ShotBoxClose line="b06_030" who="g2" text="Because… we're still in the box." e2="neutral" /> },
  { key: "box-5", at: T("b06_031"), node: <ShotBoxClose line="b06_031" who="g1" text="When do we get plugged in?" e1="sad" /> },
  { key: "box-6", at: T("b06_032"), node: <ShotBoxWide line="b06_032" who="g2" text="When they find a bigger apartment." e1="sad" e2="smug" /> },
  // the part headlines skip
  { key: "headlines", at: T("b06_033"), node: <ShotHeadlines /> },
  { key: "no-evidence", at: T("b06_034"), node: <BlackCard text="Bloomberg found NO evidence the chips went to China." size={72} /> },
  { key: "statement", at: T("b06_035"), node: <ShotStatement /> },
  { key: "why", at: T("b06_036"), node: <ShotDoorway /> },
];

export const B06_FRAMES = f(total);
export const B06: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B06_SHOT_FRAMES = shotFrames(LINES, SHOTS);
