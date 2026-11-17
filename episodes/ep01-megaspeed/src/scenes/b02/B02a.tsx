// B02 part a — voice/02a_the-man-with-the-keys.mp3 → lines b02_001…b02_037 (94.6 s, 39 shots).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotBooth1993, ShotBoothClose, ShotBoothWide, ShotCRT, ShotCalculusKid, ShotDinerExterior, ShotFactory, ShotFreeGame, ShotGiantsQueue,
  ShotGpuReveal, ShotGridToChip, ShotH100, ShotHomework, ShotKidsWide, ShotLab, ShotPasteKid, ShotPrice, ShotProfessor, ShotQueue,
  ShotSyncColor, ShotTrillions, ShotYearsMontage,
} from "./shots";

const LINES = lineRange("b02", 1, 37);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "exterior", at: 0, node: <ShotDinerExterior /> },
  { key: "booth-1993", at: T("b02_002"), node: <ShotBooth1993 /> },
  { key: "years", at: T("b02_003"), node: <ShotYearsMontage /> },
  // skit: present-day Jensen + GPU at the same booth
  { key: "skit-1", at: T("b02_004"), node: <ShotBoothWide line="b02_004" speaker="jensen" text="Three engineers, one booth…" /> },
  { key: "skit-2", at: T("b02_005"), node: <ShotBoothClose line="b02_005" who="gpu" text="Did you have a business plan?" gExpr="neutral" /> },
  { key: "skit-3", at: T("b02_006"), node: <ShotBoothClose line="b02_006" who="jensen" text="We had an idea. And a LOT of refills." jExpr="smug" /> },
  { key: "skit-4", at: T("b02_007"), node: <ShotBoothClose line="b02_007" who="gpu" text="And the leather jacket?" gExpr="worried" /> },
  { key: "skit-5", at: T("b02_008"), node: <ShotBoothClose line="b02_008" who="jensen" text="The jacket came later." jExpr="happy" /> },
  { key: "skit-6", at: T("b02_009"), node: <ShotBoothClose line="b02_009" who="gpu" text="So… I was born in a diner." gExpr="awkward" /> },
  { key: "skit-7", at: T("b02_010"), node: <ShotBoothWide line="b02_010" speaker="jensen" text="The best ones usually are." jExpr="happy" /> },
  // games → professor → kindergarten
  { key: "goal", at: T("b02_011"), node: <BlackCard text="His original goal?" /> },
  { key: "crt", at: T("b02_012"), node: <ShotCRT /> },
  { key: "prof", at: T("b02_013"), node: <ShotProfessor /> },
  { key: "prof-brilliant", at: T("b02_014"), node: <ShotProfessor close="brilliant" /> },
  { key: "prof-serious", at: T("b02_015"), node: <ShotProfessor close="serious" /> },
  { key: "queue", at: T("b02_016"), node: <ShotQueue /> },
  { key: "gpu", at: T("b02_017"), node: <ShotGpuReveal /> },
  { key: "kids", at: T("b02_018"), node: <ShotKidsWide /> },
  { key: "calculus", at: T("b02_019"), node: <ShotCalculusKid /> },
  { key: "paste", at: T("b02_020"), node: <ShotPasteKid /> },
  { key: "sync", at: T("b02_021"), node: <ShotSyncColor /> },
  { key: "grid-chip", at: T("b02_022"), node: <ShotGridToChip /> },
  { key: "factory", at: T("b02_023"), node: <ShotFactory /> },
  { key: "lab", at: T("b02_024"), node: <ShotLab /> },
  { key: "training", at: T("b02_025"), node: <BlackCard text="What is AI training?" /> },
  { key: "trillions", at: T("b02_026"), node: <ShotTrillions /> },
  { key: "kids-fast", at: T("b02_027"), node: <ShotKidsWide cols={28} rows={12} label={false} fast /> },
  // skit: GPU and GPU 2 doing homework
  { key: "hw-1", at: T("b02_028"), node: <ShotHomework line="b02_028" who="gpu" close text="I used to draw dragons…" e1="sad" /> },
  { key: "hw-2", at: T("b02_029"), node: <ShotHomework line="b02_029" who="gpu2" close text="Now you do math. Keep coloring." e2="smug" /> },
  { key: "hw-3", at: T("b02_030"), node: <ShotHomework line="b02_030" who="gpu" text="How many problems are left?" e1="worried" e2="neutral" /> },
  { key: "hw-4", at: T("b02_031"), node: <ShotHomework line="b02_031" who="gpu2" close text="A few trillion… give or take." e2="neutral" /> },
  { key: "hw-5", at: T("b02_032"), node: <ShotHomework line="b02_032" who="gpu" close melt text="My crayons are melting!" e1="sad" /> },
  { key: "hw-6", at: T("b02_033"), node: <ShotHomework line="b02_033" who="gpu2" melt text="That means it's working. Welcome to AI." e1="sad" e2="smug" /> },
  // the H100 rush
  { key: "giants", at: T("b02_034"), node: <ShotGiantsQueue /> },
  { key: "h100", at: T("b02_034", 2.6), node: <ShotH100 /> },
  { key: "price", at: T("b02_035"), node: <ShotPrice /> },
  { key: "free-game", at: T("b02_036"), node: <ShotFreeGame /> },
  { key: "no", at: T("b02_037"), node: <BlackCard text="Not a chance." /> },
];

export const B02A_FRAMES = f(total);
export const B02a: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B02A_SHOT_FRAMES = shotFrames(LINES, SHOTS);
