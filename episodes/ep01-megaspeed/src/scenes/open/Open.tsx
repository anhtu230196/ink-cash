// B01 · OPEN — 16 shots over voice/01_open.mp3 (cut into b01_001…b01_011 by tools/split_voice.py).
// Shot starts are pinned to line starts (+ offsets in seconds, read off the Whisper word timings),
// so if the voice is re-recorded the cuts follow the new timing.json.
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotBigMoney, ShotCaseFile, ShotConveyor, ShotDiner, ShotHQ, ShotLeakyWall, ShotOffice, ShotSilhouette, ShotSkitAsk,
  ShotSkitDefine, ShotThirtyThree, ShotTwoQuestions, ShotWanted, ShotWarehouse,
} from "./shots";

const LINES = lineRange("b01", 1, 11);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "hq", at: 0, node: <ShotHQ /> },
  { key: "office", at: T("b01_002"), node: <ShotOffice /> },
  { key: "33", at: T("b01_002", 2.7), node: <ShotThirtyThree stampAt={2.12} /> },
  { key: "casefile", at: T("b01_003"), node: <ShotCaseFile /> },
  { key: "silhouette", at: T("b01_003", 1.55), node: <ShotSilhouette noteAt={2.45} /> },
  { key: "card", at: T("b01_004"), node: <BlackCard text="She hasn't been charged with any crime." size={74} /> },
  { key: "skit-ask", at: T("b01_005"), node: <ShotSkitAsk /> },
  { key: "skit-define", at: T("b01_006"), node: <ShotSkitDefine /> },
  { key: "questions", at: T("b01_007"), node: <ShotTwoQuestions /> },
  { key: "money", at: T("b01_008"), node: <ShotBigMoney numberAt={0.5} /> },
  { key: "conveyor", at: T("b01_008", 2.73), node: <ShotConveyor /> },
  { key: "leak", at: T("b01_009"), node: <ShotLeakyWall /> },
  { key: "wanted", at: T("b01_010"), node: <ShotWanted /> },
  { key: "warehouse", at: T("b01_010", 2.84), node: <ShotWarehouse /> },
  { key: "diner", at: T("b01_011"), node: <ShotDiner /> },
];

export const OPEN_FRAMES = f(total);
export const Open: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const OPEN_SHOT_FRAMES = shotFrames(LINES, SHOTS);
