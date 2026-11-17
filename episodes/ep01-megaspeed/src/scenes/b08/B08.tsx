// B08 · HOW IT CAME OUT — voice/08_how-it-came-out.mp3 → lines b08_001…b08_018 (58.2 s). No chapter card.
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import { QuoteCard } from "../b02/shotsB";
import {
  ShotBoard, ShotCongressReads, ShotEmail, ShotEmptyChair, ShotLetter, ShotLetterFlies, ShotMarketClose, ShotMonitors, ShotStockDrop, ShotTechQ, ShotTimesReports,
  ShotTornContract,
} from "./shots";

const LINES = lineRange("b08", 1, 18);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "monitors", at: 0, node: <ShotMonitors first /> },
  { key: "letter-flies", at: T("b08_002"), node: <ShotLetterFlies /> },
  { key: "letter", at: T("b08_003"), node: <ShotLetter /> },
  { key: "two-words", at: T("b08_004"), node: <ShotLetter magnify /> },
  { key: "publicly", at: T("b08_005"), node: <BlackCard text="“Publicly reported.”" /> },
  { key: "congress-reads", at: T("b08_006"), node: <ShotCongressReads /> },
  { key: "times", at: T("b08_007"), node: <ShotTimesReports /> },
  { key: "all-staff", at: T("b08_008"), node: <ShotMonitors from="From: Jensen" /> },
  { key: "email", at: T("b08_009"), node: <ShotEmail /> },
  { key: "quote", at: T("b08_010"), node: <QuoteCard quote="I was unfaithful to my wife." who="Jensen Huang, memo to Nvidia employees, Nov 8, 2026" /> },
  { key: "board", at: T("b08_011"), node: <ShotBoard /> },
  { key: "tech-q", at: T("b08_012"), node: <ShotTechQ /> },
  { key: "vault", at: T("b08_013"), node: <ShotTechQ vault /> },
  { key: "contract", at: T("b08_014"), node: <ShotTornContract /> },
  { key: "stock", at: T("b08_015"), node: <ShotStockDrop /> },
  { key: "bad-1", at: T("b08_016"), node: <ShotMarketClose line="b08_016" who="i1" text="Is that bad?" e1="worried" /> },
  { key: "bad-2", at: T("b08_017"), node: <ShotMarketClose line="b08_017" who="i2" text="Ask me… Thursday." e2="smug" /> },
  { key: "chair", at: T("b08_018"), node: <ShotEmptyChair /> },
];

export const B08_FRAMES = f(total);
export const B08: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B08_SHOT_FRAMES = shotFrames(LINES, SHOTS);
