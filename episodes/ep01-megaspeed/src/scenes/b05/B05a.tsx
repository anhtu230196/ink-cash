// B05a · THE APPROACH — voice/05a_the-approach.mp3 → lines b05_001…b05_036 (98.4 s). No chapter card (house rule since 2026-11-16).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotAccountants, ShotAlice, ShotArm, ShotAssets, ShotCertificate, ShotCoaster, ShotDealer, ShotDeliveryClose, ShotDeliveryWide, ShotFilings, ShotLemonade,
  ShotModelQ, ShotModelSteps, ShotNewPlate, ShotOldPlate, ShotPitchClose, ShotPitchWide, ShotRevenue, ShotSameName, ShotShopping, ShotTower, ShotWhyMalaysia,
} from "./shots";

const LINES = lineRange("b05", 1, 36);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  { key: "tower", at: 0, node: <ShotTower /> },
  { key: "old-plate", at: T("b05_002"), node: <ShotOldPlate /> },
  { key: "cloth", at: T("b05_003"), node: <ShotNewPlate /> },
  { key: "megaspeed", at: T("b05_004"), node: <ShotNewPlate reveal /> },
  { key: "coaster", at: T("b05_005"), node: <ShotCoaster /> },
  { key: "alice", at: T("b05_006"), node: <ShotAlice /> },
  { key: "same-name", at: T("b05_007"), node: <ShotSameName /> },
  { key: "zero", at: T("b05_008"), node: <ShotSameName zero /> },
  // the business model
  { key: "model-q", at: T("b05_009"), node: <ShotModelQ /> },
  { key: "model", at: T("b05_010"), node: <ShotModelSteps /> },
  { key: "partner", at: T("b05_011"), node: <ShotCertificate /> },
  { key: "dealer", at: T("b05_012"), node: <ShotDealer /> },
  { key: "wins", at: T("b05_013"), node: <ShotDealer win /> },
  { key: "accountants", at: T("b05_014"), node: <ShotAccountants /> },
  // Speedmatrix
  { key: "arm", at: T("b05_015"), node: <ShotArm /> },
  { key: "why", at: T("b05_016"), node: <BlackCard text="Why Malaysia?" /> },
  { key: "reasons", at: T("b05_017"), node: <ShotWhyMalaysia /> },
  // skit: the delivery
  { key: "del-1", at: T("b05_018"), node: <ShotDeliveryWide line="b05_018" who="salesman" text="Delivery for Speedmatrix! Where do these plug in?" se="happy" te="neutral" /> },
  { key: "del-2", at: T("b05_019"), node: <ShotDeliveryClose line="b05_019" who="tech" text="Right across the bridge from Singapore." te="happy" ta="point" /> },
  { key: "del-3", at: T("b05_020"), node: <ShotDeliveryClose line="b05_020" who="salesman" text="And how many servers are we talking about?" se="happy" /> },
  { key: "del-4", at: T("b05_021"), node: <ShotDeliveryClose line="b05_021" who="tech" text="Yes." te="smug" /> },
  { key: "del-5", at: T("b05_022"), node: <ShotDeliveryClose line="b05_022" who="salesman" text="That's— that's not a number." se="worried" /> },
  { key: "del-6", at: T("b05_023"), node: <ShotDeliveryWide line="b05_023" who="tech" text="It will be… Keep unloading." se="worried" te="smug" ta="point" stack={4} grow /> },
  // the shopping spree
  { key: "shopping", at: T("b05_024"), node: <ShotShopping /> },
  { key: "filings", at: T("b05_025"), node: <ShotFilings /> },
  { key: "assets-33", at: T("b05_026"), node: <ShotAssets /> },
  { key: "assets-2024", at: T("b05_027"), node: <ShotAssets year2024 /> },
  { key: "three-billion", at: T("b05_028"), node: <BlackCard text="Three BILLION dollars." /> },
  { key: "revenue", at: T("b05_029"), node: <ShotRevenue /> },
  { key: "lemonade", at: T("b05_030"), node: <ShotLemonade /> },
  // skit: the pitch deck
  { key: "pitch-1", at: T("b05_031"), node: <ShotPitchWide line="b05_031" who="i1" text="Wait. This tiny company gets Nvidia's best chips?" e1="surprised" slide={1} /> },
  { key: "pitch-2", at: T("b05_032"), node: <ShotPitchClose line="b05_032" who="i2" text="Easily… according to the pitch." e2="smug" slide={1} /> },
  { key: "pitch-3", at: T("b05_033"), node: <ShotPitchClose line="b05_033" who="i1" text="Everyone else has been waiting for months!" e1="worried" slide={2} /> },
  { key: "pitch-4", at: T("b05_034"), node: <ShotPitchClose line="b05_034" who="i2" text="Does that seem suspicious to you?" e2="smug" slide={2} /> },
  { key: "pitch-5", at: T("b05_035"), node: <ShotPitchClose line="b05_035" who="i1" text="It seems like a great investment to me!" e1="happy" slide={0} /> },
  { key: "pitch-6", at: T("b05_036"), node: <ShotPitchWide line="b05_036" who="i2" text="Those are… sometimes the same thing." e1="happy" e2="neutral" slide={0} /> },
];

export const B05A_FRAMES = f(total);
export const B05a: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B05A_SHOT_FRAMES = shotFrames(LINES, SHOTS);
