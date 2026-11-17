// B05b · THE APPROACH, part 2 — voice/05b_the-approach.mp3 → lines b05_037…b05_062 (91.1 s).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  ShotAnalystClose, ShotAnalystWide, ShotDeclaration, ShotLoan, ShotMonitor, ShotNotices, ShotNvidiaResponse, ShotPartyClose, ShotPartyWide, ShotPassport,
  ShotPhotos, ShotPitch2025, ShotQuiet, ShotRolling,
} from "./shotsB";

const LINES = lineRange("b05", 37, 62);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  // the 2025 pitch (Financial Times)
  { key: "pitch", at: 0, node: <ShotPitch2025 kind="intro" /> },
  { key: "no-problem", at: T("b05_038"), node: <ShotPitch2025 kind="chips" /> },
  { key: "client", at: T("b05_039"), node: <ShotPitch2025 kind="client" /> },
  { key: "loan", at: T("b05_040"), node: <ShotLoan /> },
  // Taipei photos
  { key: "photos", at: T("b05_041"), node: <ShotPhotos /> },
  { key: "no-audio", at: T("b05_042"), node: <ShotPhotos noAudio /> },
  // skit (dramatization): the party
  { key: "party-1", at: T("b05_043"), node: <ShotPartyWide line="b05_043" who="jensen" text="I don't think we've met. And I meet everybody." je="happy" ae="neutral" /> },
  { key: "party-2", at: T("b05_044"), node: <ShotPartyClose line="b05_044" who="alice" text="Alice. Megaspeed. We're a cloud company in Singapore." ae="happy" /> },
  { key: "party-3", at: T("b05_045"), node: <ShotPartyClose line="b05_045" who="jensen" text="Cloud! I love cloud. How big are you?" je="happy" /> },
  { key: "party-4", at: T("b05_046"), node: <ShotPartyClose line="b05_046" who="alice" text="Oh — small. For now." ae="awkward" /> },
  { key: "party-5", at: T("b05_047"), node: <ShotPartyClose line="b05_047" who="jensen" text="Everybody says “for now.” How many chips do you need?" je="smug" /> },
  { key: "party-6", at: T("b05_048"), node: <ShotPartyClose line="b05_048" who="alice" text="How many do you have?" ae="smug" /> },
  { key: "party-7", at: T("b05_049"), node: <ShotPartyWide line="b05_049" who="jensen" text="I LIKE her. Somebody get her a chair!" je="happy" ae="happy" chair /> },
  { key: "nvidia", at: T("b05_050"), node: <ShotNvidiaResponse /> },
  // skit: the analysts and the photo
  { key: "an-1", at: T("b05_051"), node: <ShotAnalystWide line="b05_051" who="a1" text="Look at this. Same party… same table." e1="worried" /> },
  { key: "an-2", at: T("b05_052"), node: <ShotAnalystClose line="b05_052" who="a2" text="It's a trade show. Everyone's at the same table." e2="neutral" /> },
  { key: "an-3", at: T("b05_053"), node: <ShotMonitor line="b05_053" who="a1" text="She's standing RIGHT next to him." circle="her" /> },
  { key: "an-4", at: T("b05_054"), node: <ShotMonitor line="b05_054" who="a2" text="So is… the shrimp buffet." circle="shrimp" /> },
  { key: "an-5", at: T("b05_055"), node: <ShotAnalystClose line="b05_055" who="a1" text="So it's nothing?" e1="awkward" /> },
  { key: "an-6", at: T("b05_056"), node: <ShotAnalystWide line="b05_056" who="a2" text="It's networking. Write that down." e1="awkward" e2="smug" write /> },
  // Singapore investigates
  { key: "notices", at: T("b05_057"), node: <ShotNotices /> },
  { key: "declaration", at: T("b05_058"), node: <ShotDeclaration /> },
  { key: "passport", at: T("b05_059"), node: <ShotPassport /> },
  { key: "quiet", at: T("b05_060"), node: <ShotQuiet /> },
  { key: "nothing", at: T("b05_061"), node: <BlackCard text="Nothing visible happens." /> },
  { key: "rolling", at: T("b05_062"), node: <ShotRolling /> },
];

export const B05B_FRAMES = f(total);
export const B05b: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B05B_SHOT_FRAMES = shotFrames(LINES, SHOTS);
