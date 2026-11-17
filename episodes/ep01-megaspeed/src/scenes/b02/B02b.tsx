// B02 part b — voice/02b_the-man-with-the-keys.mp3 → lines b02_038…b02_073 (94.5 s).
import React from "react";
import { BlackCard } from "../../../../../kit/ui";
import { Section, Shot, f, lineRange, lineStarts, shotFrames } from "../common";
import {
  QuoteCard, ShotBackfire, ShotBeijing, ShotBolts, ShotCodePlug, ShotComputex, ShotGamingChip, ShotHearingClose, ShotHearingWide, ShotKeynoteClose,
  ShotKeynoteWide, ShotKeys, ShotMiddle, ShotOnlyShovels, ShotRace, ShotRopeClose, ShotRopeWide, ShotShare, ShotShovels, ShotWarning, ShotWeapons,
} from "./shotsB";

const LINES = lineRange("b02", 38, 73);
const { T, total } = lineStarts(LINES);

const SHOTS: Shot[] = [
  // skit: two investors at the velvet rope
  { key: "rope-1", at: 0, node: <ShotRopeWide line="b02_038" who="i1" text="How much is one of these chips?" e1="surprised" /> },
  { key: "rope-2", at: T("b02_039"), node: <ShotRopeClose line="b02_039" who="i2" text="Tens of thousands of dollars… Each." e2="neutral" /> },
  { key: "rope-3", at: T("b02_040"), node: <ShotRopeClose line="b02_040" who="i1" text="Great. I'll take ten thousand!" e1="happy" /> },
  { key: "rope-4", at: T("b02_041"), node: <ShotRopeWide line="b02_041" who="i2" text="So will everyone else… There's a waitlist." e1="surprised" e2="smug" list={[0.02, 0.3]} /> },
  { key: "rope-5", at: T("b02_042"), node: <ShotRopeClose line="b02_042" who="i1" text="How LONG is the waitlist?!" e1="worried" list={[0.3, 0.45]} /> },
  { key: "rope-6", at: T("b02_043"), node: <ShotRopeWide line="b02_043" who="i2" text="Well… how long is your patience?" e1="worried" e2="smug" list={[0.45, 1]} /> },
  // only shovels
  { key: "shovels", at: T("b02_044"), node: <ShotShovels /> },
  { key: "only", at: T("b02_045"), node: <ShotOnlyShovels /> },
  { key: "switch", at: T("b02_046"), node: <BlackCard text="Why can't buyers just switch brands?" /> },
  { key: "plug", at: T("b02_047"), node: <ShotCodePlug /> },
  // Beijing → why it matters
  { key: "beijing", at: T("b02_048"), node: <ShotBeijing /> },
  { key: "gaming", at: T("b02_049"), node: <ShotGamingChip /> },
  { key: "race", at: T("b02_050"), node: <ShotRace /> },
  { key: "weapons", at: T("b02_051"), node: <ShotWeapons /> },
  // skit: Hawk vs. Industry
  { key: "hk-1", at: T("b02_052"), node: <ShotHearingWide line="b02_052" who="hawk" text="That chip is a missile brain!" screen="missile" /> },
  { key: "hk-2", at: T("b02_053"), node: <ShotHearingClose line="b02_053" who="industry" text="It's a very fast… calculator." ie="smug" /> },
  { key: "hk-3", at: T("b02_054"), node: <ShotHearingClose line="b02_054" who="hawk" text="A calculator that does missile math!" screen="missile" /> },
  { key: "hk-4", at: T("b02_055"), node: <ShotHearingWide line="b02_055" who="industry" text="Mostly, it makes cat videos." ie="happy" screen="cat" /> },
  { key: "hk-5", at: T("b02_056"), node: <ShotHearingClose line="b02_056" who="hawk" text="And what do the cats want?" he="worried" screen="cat" /> },
  { key: "hk-6", at: T("b02_057"), node: <ShotHearingClose line="b02_057" who="industry" text="…I'm going to need a minute." ie="awkward" screen="cat" sweat /> },
  // the man with the keys
  { key: "middle", at: T("b02_058"), node: <ShotMiddle /> },
  { key: "keys", at: T("b02_059"), node: <ShotKeys /> },
  { key: "backfire", at: T("b02_060"), node: <ShotBackfire /> },
  { key: "computex", at: T("b02_061"), node: <ShotComputex /> },
  { key: "quote", at: T("b02_062"), node: <QuoteCard quote="All in all, the export control was a failure." who="Jensen Huang, Computex, May 21, 2025" /> },
  { key: "share-95", at: T("b02_063"), node: <ShotShare phase="before" /> },
  { key: "share-may", at: T("b02_064"), node: <ShotShare phase="may" /> },
  { key: "fifty", at: T("b02_065"), node: <BlackCard text="Down to fifty percent." /> },
  // skit: keynote, Hawk heckles (DRAMATIZATION)
  { key: "kn-1", at: T("b02_066"), node: <ShotKeynoteWide line="b02_066" who="jensen" text="If you block our chips, China builds its own." /> },
  { key: "kn-2", at: T("b02_067"), node: <ShotKeynoteClose line="b02_067" who="hawk" text="Then we'll block those too!" /> },
  { key: "kn-3", at: T("b02_068"), node: <ShotKeynoteWide line="b02_068" who="jensen" text="Chips made in China? By China? For China?" je="happy" he="surprised" slide="made-in" build /> },
  { key: "kn-4", at: T("b02_069"), node: <ShotKeynoteClose line="b02_069" who="hawk" text="We'll… find a way." he="worried" slide="made-in" /> },
  { key: "kn-5", at: T("b02_070"), node: <ShotKeynoteClose line="b02_070" who="jensen" text="With what, exactly?" je="smug" slide="made-in" /> },
  { key: "kn-6", at: T("b02_071"), node: <ShotKeynoteWide line="b02_071" who="hawk" text="More paperwork!" he="smug" je="awkward" slide="paper" papers /> },
  // the door bolts → B03 "The Paper Wall"
  { key: "warning", at: T("b02_072"), node: <ShotWarning /> },
  { key: "bolts", at: T("b02_073"), node: <ShotBolts /> },
];

export const B02B_FRAMES = f(total);
export const B02b: React.FC = () => <Section lines={LINES} shots={SHOTS} />;
export const B02B_SHOT_FRAMES = shotFrames(LINES, SHOTS);
