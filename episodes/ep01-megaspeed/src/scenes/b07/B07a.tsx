// B07a · WHAT THEY ALLEGEDLY WANTED — voice/07a_what-they-allegedly-wanted.mp3 → lines b07_001…b07_022 (71.5 s). No chapter card.
import React from "react";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotAnonymous, ShotDeparts, ShotGoalOne, ShotListenClose, ShotListenWide, ShotListening, ShotMemoClaim, ShotMemoOpen, ShotMemoSlides, ShotOversaw,
  ShotPassportBack, ShotSpyAgency, ShotSurveillance, ShotWashington,
} from "./shots";

const LINES = lineRange("b07", 1, 22);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "washington", at: 0, node: <ShotWashington /> },
  { key: "passport", at: T("b07_002"), node: <ShotPassportBack /> },
  { key: "departs", at: T("b07_003"), node: <ShotDeparts /> },
  { key: "memo", at: T("b07_004"), node: <ShotMemoSlides /> },
  { key: "anonymous", at: T("b07_005"), node: <ShotAnonymous /> },
  { key: "oversaw", at: T("b07_006"), node: <ShotOversaw /> },
  { key: "surveillance", at: T("b07_007"), node: <ShotSurveillance /> },
  { key: "listening", at: T("b07_008"), node: <ShotListening /> },
  // skit: the listeners
  { key: "ls-1", at: T("b07_009"), node: <ShotListenWide line="b07_009" who="a1" text="This could be… big." e1="worried" /> },
  { key: "ls-2", at: T("b07_010"), node: <ShotListenClose line="b07_010" who="a2" text="How big?" e2="neutral" /> },
  { key: "ls-3", at: T("b07_011"), node: <ShotListenClose line="b07_011" who="a1" text="Write-a-memo big." e1="surprised" /> },
  { key: "ls-4", at: T("b07_012"), node: <ShotListenClose line="b07_012" who="a2" text="Ugh… I hate memos." e2="awkward" /> },
  { key: "ls-5", at: T("b07_013"), node: <ShotListenClose line="b07_013" who="a1" text="Should we tell somebody first?" e1="worried" /> },
  { key: "ls-6", at: T("b07_014"), node: <ShotListenClose line="b07_014" who="a2" text="First, we schedule a meeting." e2="neutral" /> },
  { key: "ls-7", at: T("b07_015"), node: <ShotListenClose line="b07_015" who="a1" text="A meeting about what?" e1="awkward" /> },
  { key: "ls-8", at: T("b07_016"), node: <ShotListenWide line="b07_016" who="a2" text="About… the meeting." e1="awkward" e2="smug" meeting /> },
  // what the memo allegedly said
  { key: "memo-open", at: T("b07_017"), node: <ShotMemoOpen /> },
  { key: "claim", at: T("b07_018"), node: <ShotMemoClaim title="CLAIM" rows={["Recruited by China's", "Ministry of State Security"]} hi={1} source="As reported by The New York Times" /> },
  { key: "mss", at: T("b07_019"), node: <ShotSpyAgency /> },
  { key: "cia-fbi", at: T("b07_020"), node: <ShotSpyAgency joke /> },
  { key: "goals", at: T("b07_021"), node: <ShotMemoClaim title="TWO GOALS" rows={["Goal 1: ______", "Goal 2: ______"]} source="As reported by The New York Times" /> },
  { key: "goal-one", at: T("b07_022"), node: <ShotGoalOne /> },
];

export const B07A_FRAMES = f(total);
export const B07a: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B07A_SHOT_FRAMES = shotFrames(LINES, SHOTS);
