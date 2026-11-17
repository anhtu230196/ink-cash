// B04 · THE WAY AROUND — voice/04_the-way-around.mp3 → lines b04_001…b04_027 (66.0 s).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotBan, ShotCable, ShotChecklist, ShotCloud, ShotDataCenter, ShotDogBox, ShotDogWifi, ShotGap, ShotKidThink, ShotNeedLicense, ShotNeighborBuy,
  ShotNeighborHouse, ShotPort, ShotRemember, ShotRent, ShotSingapore, ShotYardClose, ShotYardWide,
} from "./shots";

const LINES = lineRange("b04", 1, 27);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "port", at: 0, node: <ShotPort /> },
  { key: "dog-box", at: T("b04_002"), node: <ShotDogBox /> },
  { key: "dog-wifi", at: T("b04_003"), node: <ShotDogWifi /> },
  // the analogy: the neighbor's long cable
  { key: "ban", at: T("b04_004"), node: <ShotBan /> },
  { key: "think", at: T("b04_005"), node: <ShotKidThink /> },
  { key: "ten", at: T("b04_006"), node: <ShotNeighborBuy /> },
  { key: "his-house", at: T("b04_007"), node: <ShotNeighborHouse /> },
  { key: "cable", at: T("b04_008"), node: <ShotCable /> },
  { key: "stays", at: T("b04_009"), node: <ShotCable arrows /> },
  { key: "game", at: T("b04_010"), node: <BlackCard text="You just move the game." /> },
  { key: "cloud", at: T("b04_011"), node: <ShotCloud /> },
  // the rules
  { key: "license", at: T("b04_012"), node: <ShotNeedLicense /> },
  { key: "malaysia", at: T("b04_013"), node: <ShotDataCenter /> },
  { key: "legal", at: T("b04_014"), node: <ShotDataCenter check /> },
  { key: "rent", at: T("b04_015"), node: <ShotRent /> },
  { key: "also-legal", at: T("b04_016"), node: <ShotChecklist /> },
  // skit: the official and the tech
  { key: "yard-1", at: T("b04_017"), node: <ShotYardWide line="b04_017" who="official" text="Did any of these chips go to China?" oe="neutral" te="happy" /> },
  { key: "yard-2", at: T("b04_018"), node: <ShotYardClose line="b04_018" who="tech" text="Nope. The servers stay riiight here." te="happy" /> },
  { key: "yard-3", at: T("b04_019"), node: <ShotYardClose line="b04_019" who="official" text="Then what leaves the building?" oe="neutral" /> },
  { key: "yard-4", at: T("b04_020"), node: <ShotYardWide line="b04_020" who="tech" text="Just the login… and the answers." te="smug" ta="shrug" leak /> },
  { key: "yard-5", at: T("b04_021"), node: <ShotYardClose line="b04_021" who="official" text="Is there a form for answers?" oe="worried" ta="shrug" /> },
  { key: "yard-6", at: T("b04_022"), node: <ShotYardClose line="b04_022" who="tech" text="You tell me, man." te="smug" ta="shrug" /> },
  { key: "yard-7", at: T("b04_023"), node: <ShotYardWide line="b04_023" who="official" text="…Fill out form seven." oe="neutral" te="awkward" ta="shrug" formDrop /> },
  // the loophole
  { key: "gap", at: T("b04_024"), node: <ShotGap /> },
  { key: "loophole", at: T("b04_025"), node: <BlackCard text="The cloud loophole." /> },
  { key: "remember", at: T("b04_026"), node: <ShotRemember /> },
  { key: "singapore", at: T("b04_027"), node: <ShotSingapore /> },
];

export const B04_FRAMES = f(total);
export const B04: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B04_SHOT_FRAMES = shotFrames(LINES, SHOTS);
