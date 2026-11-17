// B09b · THE EMPTY CHAIR, part 2 — voice/09b_the-empty-chair.mp3 → lines b09_026…b09_046 (70.3 s). Ends on a fade to black.
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import { ShotBlocked } from "../b03/shots";
import { ShotRent } from "../b04/shots";
import { ShotChairScreens } from "./shots";
import {
  ShotBlinking, ShotLeak, ShotLogin, ShotOfficeClose, ShotOfficeWide, ShotOverWall, ShotProbeOpen, ShotSenate, ShotVaultField, ShotWatch,
} from "./shotsB";

const LINES = lineRange("b09", 26, 46);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "leak", at: 0, node: <ShotLeak /> },
  { key: "maybe", at: T("b09_027"), node: <BlackCard text="Maybe… but not the way you picture it." /> },
  { key: "rented", at: T("b09_028"), node: <ShotRent /> },
  { key: "stayed", at: T("b09_029"), node: <ShotBlocked /> },
  { key: "held", at: T("b09_030"), node: <ShotOverWall /> },
  { key: "vault", at: T("b09_031"), node: <ShotVaultField /> },
  // skit: the empty CEO desk
  { key: "of-1", at: T("b09_032"), node: <ShotOfficeWide line="b09_032" who="salesman" text="So… the CEO is gone." se="worried" /> },
  { key: "of-2", at: T("b09_033"), node: <ShotOfficeClose line="b09_033" who="official" text="And where are the 240,000 chips?" oe="neutral" /> },
  { key: "of-3", at: T("b09_034"), node: <ShotOfficeClose line="b09_034" who="salesman" text="Still humming away overseas." se="happy" /> },
  { key: "of-4", at: T("b09_035"), node: <ShotOfficeClose line="b09_035" who="official" text="So did the wall work, or not?" oe="angry" /> },
  { key: "of-5", at: T("b09_036"), node: <ShotOfficeClose line="b09_036" who="salesman" text="Define… “work.”" se="smug" /> },
  { key: "of-6", at: T("b09_037"), node: <ShotOfficeWide line="b09_037" who="official" text="…Fill out form seven." se="awkward" oe="neutral" formDrop /> },
  // what's next
  { key: "login", at: T("b09_038"), node: <ShotLogin /> },
  { key: "watch", at: T("b09_039"), node: <ShotWatch title="what to watch next" /> },
  { key: "nov17", at: T("b09_040"), node: <ShotWatch day="17" title="Nvidia earnings" sub="first without Jensen as CEO" source="Source: Gotrade market news" /> },
  { key: "nov18", at: T("b09_041"), node: <ShotWatch day="18" title="requested House briefing" sub="three committee chairs asked" source="Source: House Select Committee on the CCP" /> },
  { key: "nov18-q", at: T("b09_042"), node: <ShotWatch day="18" title="requested House briefing" sub="still happening? unknown" mark="?" /> },
  { key: "senate", at: T("b09_043"), node: <ShotSenate /> },
  { key: "probe", at: T("b09_044"), node: <ShotProbeOpen /> },
  { key: "chair", at: T("b09_045"), node: <ShotChairScreens jacket /> },
  { key: "green", at: T("b09_046"), node: <ShotBlinking /> },
];

export const B09B_FRAMES = f(total);
export const B09b: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B09B_SHOT_FRAMES = shotFrames(LINES, SHOTS);
