// B07b · WHAT THEY ALLEGEDLY WANTED, part 2 — voice/07b_what-they-allegedly-wanted.mp3 → lines b07_023…b07_050 (85.2 s).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import { ShotMemoClaim } from "./shots";
import {
  ShotBankApp, ShotDebateClose, ShotDebateWide, ShotFine1, ShotFine2, ShotFine3, ShotFine4, ShotFine5, ShotFine6, ShotFine7, ShotFinePrint, ShotGoalTwo,
  ShotLawyers, ShotPapers, ShotPause, ShotRetireClose, ShotRetireWide, ShotSixPercent, ShotTenThousand,
} from "./shotsB";

const LINES = lineRange("b07", 23, 50);
const { T, total } = lineStarts(LINES);
const ROMANCE = ["Alleged: a romance between", "Alice Huang and Jensen Huang"];

const SHOTS: Shot[] = [
  { key: "goal-two", at: 0, node: <ShotGoalTwo /> },
  { key: "link", at: T("b07_024"), node: <ShotMemoClaim title="FT REPORTS" rows={["Alleged:", "a personal link"]} hi={1} source="Source: Financial Times" /> },
  { key: "romance", at: T("b07_025"), node: <ShotMemoClaim title="FT REPORTS" rows={ROMANCE} source="Source: Financial Times" /> },
  { key: "pause", at: T("b07_026"), node: <ShotPause rows={ROMANCE} /> },
  { key: "lawyers", at: T("b07_027"), node: <ShotLawyers /> },
  { key: "fine-print", at: T("b07_028"), node: <ShotFinePrint /> },
  { key: "fine-1", at: T("b07_029"), node: <ShotFine1 /> },
  { key: "fine-2", at: T("b07_030"), node: <ShotFine2 /> },
  { key: "fine-3", at: T("b07_031"), node: <ShotFine3 /> },
  { key: "fine-4", at: T("b07_032"), node: <ShotFine4 /> },
  { key: "fine-5", at: T("b07_033"), node: <ShotFine5 /> },
  { key: "fine-6", at: T("b07_034"), node: <ShotFine6 /> },
  { key: "fine-7", at: T("b07_035"), node: <ShotFine7 /> },
  { key: "not-one", at: T("b07_036"), node: <BlackCard text="Not one charge." /> },
  // skit: the debate
  { key: "db-1", at: T("b07_037"), node: <ShotDebateWide line="b07_037" who="hawk" text="This is a spy operation!" he="angry" /> },
  { key: "db-2", at: T("b07_038"), node: <ShotDebateClose line="b07_038" who="industry" text="It's a leaked memo… that nobody has seen." ie="neutral" /> },
  { key: "db-3", at: T("b07_039"), node: <ShotDebateClose line="b07_039" who="hawk" text="There were wiretaps!" he="angry" /> },
  { key: "db-4", at: T("b07_040"), node: <ShotDebateClose line="b07_040" who="industry" text="Reported wiretaps. And how many indictments?" ie="smug" /> },
  { key: "db-5", at: T("b07_041"), node: <ShotDebateClose line="b07_041" who="hawk" text="…None. So far." he="worried" /> },
  { key: "db-6", at: T("b07_042"), node: <ShotDebateWide line="b07_042" who="industry" text="Call me when “so far” is over." he="worried" ie="smug" /> },
  // your money
  { key: "bank", at: T("b07_043"), node: <ShotBankApp /> },
  { key: "six", at: T("b07_044"), node: <ShotSixPercent /> },
  { key: "ten-k", at: T("b07_045"), node: <ShotTenThousand /> },
  { key: "six-hundred", at: T("b07_046"), node: <BlackCard text="About 600 dollars of it is Nvidia." /> },
  // skit: the red app
  { key: "rt-1", at: T("b07_047"), node: <ShotRetireWide line="b07_047" who="i1" text="Nobody is charged?" e1="surprised" /> },
  { key: "rt-2", at: T("b07_048"), node: <ShotRetireClose line="b07_048" who="i2" text="Nobody." e2="neutral" /> },
  { key: "rt-3", at: T("b07_049"), node: <ShotRetireClose line="b07_049" who="i1" text="Tell that to my 401(k)!" e1="angry" /> },
  { key: "papers", at: T("b07_050"), node: <ShotPapers /> },
];

export const B07B_FRAMES = f(total);
export const B07b: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B07B_SHOT_FRAMES = shotFrames(LINES, SHOTS);
