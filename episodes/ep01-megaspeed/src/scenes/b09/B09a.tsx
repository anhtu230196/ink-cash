// B09a · THE EMPTY CHAIR — voice/09a_the-empty-chair.mp3 → lines b09_001…b09_025 (94.0 s). No chapter card.
import React from "react";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import { ShotRemember } from "../b04/shots";
import { ShotTotal } from "../b06/shots";
import { ShotBankApp, ShotDebateClose, ShotDebateWide } from "../b07/shotsB";
import { ShotStockDrop } from "../b08/shots";
import {
  ShotCableLicense, ShotChairScreens, ShotDarkTruck, ShotFiftyDollars, ShotFourSides, ShotInterim, ShotResigns, ShotRetirement, ShotSlice, ShotToSEA, ShotVote,
} from "./shots";

const LINES = lineRange("b09", 1, 25);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "chair", at: 0, node: <ShotChairScreens tags /> },
  { key: "resigns", at: T("b09_002"), node: <ShotResigns /> },
  { key: "interim", at: T("b09_003"), node: <ShotInterim /> },
  { key: "stock", at: T("b09_004"), node: <ShotStockDrop pct="≈ −9%" when="NVDA · early trading, Nov 12" source="Source: The Washington Post; CNN" /> },
  // your money
  { key: "bank", at: T("b09_005"), node: <ShotBankApp /> },
  { key: "slice", at: T("b09_006"), node: <ShotSlice /> },
  { key: "fifty", at: T("b09_007"), node: <ShotFiftyDollars /> },
  { key: "retirement", at: T("b09_008"), node: <ShotRetirement /> },
  // four sides
  { key: "four", at: T("b09_009"), node: <ShotFourSides /> },
  { key: "hawks", at: T("b09_010"), node: <ShotFourSides focus={0} /> },
  { key: "nvidia", at: T("b09_011"), node: <ShotFourSides focus={1} /> },
  { key: "megaspeed", at: T("b09_012"), node: <ShotFourSides focus={2} /> },
  { key: "beijing", at: T("b09_013"), node: <ShotFourSides focus={3} /> },
  // skit: the debate, round two
  { key: "db-1", at: T("b09_014"), node: <ShotDebateWide line="b09_014" who="hawk" text="Ban the cloud rentals. All of them!" he="angry" /> },
  { key: "db-2", at: T("b09_015"), node: <ShotDebateClose line="b09_015" who="industry" text="Then China builds its own chips even faster." ie="neutral" /> },
  { key: "db-3", at: T("b09_016"), node: <ShotDebateClose line="b09_016" who="hawk" text="Then we write faster rules!" he="angry" /> },
  { key: "db-4", at: T("b09_017"), node: <ShotDebateClose line="b09_017" who="industry" text="How fast can you write a rule?" ie="smug" /> },
  { key: "db-5", at: T("b09_018"), node: <ShotDebateClose line="b09_018" who="hawk" text="Eighteen months! If we hurry." he="smug" /> },
  { key: "db-6", at: T("b09_019"), node: <ShotDebateWide line="b09_019" who="industry" text="Wonderful… Very fast paperwork." he="smug" ie="smug" /> },
  // the cable gets a rule
  { key: "remember", at: T("b09_020"), node: <ShotRemember /> },
  { key: "vote", at: T("b09_021"), node: <ShotVote /> },
  { key: "license", at: T("b09_022"), node: <ShotCableLicense /> },
  { key: "how", at: T("b09_023"), node: <ShotTotal label="So how did this end up in the story?" dollars="$7.5 BILLION" chips="of chips" fill={1} /> },
  { key: "truck", at: T("b09_024"), node: <ShotDarkTruck /> },
  { key: "sea", at: T("b09_025"), node: <ShotToSEA /> },
];

export const B09A_FRAMES = f(total);
export const B09a: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B09A_SHOT_FRAMES = shotFrames(LINES, SHOTS);
