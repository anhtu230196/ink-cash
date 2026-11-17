/**
 * Ages for cartoon characters.
 *
 * Two ways to age someone:
 *  - Real people (known history): give the cast entry `born` + explicit `eras` (hair colour, outfit,
 *    glasses… as they really were), then pick the look with `lookAt(entry, year)`.
 *  - Fictional people: `ageLook(look, age)` greys the hair and adds face lines from the age alone.
 *
 * Rules and the reference table live in .claude/skills/cartoon-explainer-video/references/characters-by-age.md.
 */
import { CharacterLook } from "./Character";
import { CastEntry } from "./cast";

export type AgeStage = "child" | "teen" | "young" | "adult" | "middle" | "senior" | "elder";

/** Visual defaults per stage. `scale` multiplies the character's normal scale (adults = 1). */
export const AGE_STAGES: Record<AgeStage, { from: number; to: number; grey: number; wrinkles: 0 | 1 | 2 | 3; scale: number }> = {
  child: { from: 0, to: 12, grey: 0, wrinkles: 0, scale: 0.68 },
  teen: { from: 13, to: 19, grey: 0, wrinkles: 0, scale: 0.88 },
  young: { from: 20, to: 34, grey: 0, wrinkles: 0, scale: 1 },
  adult: { from: 35, to: 44, grey: 0.12, wrinkles: 0, scale: 1 },
  middle: { from: 45, to: 54, grey: 0.4, wrinkles: 1, scale: 1 },
  senior: { from: 55, to: 69, grey: 0.82, wrinkles: 2, scale: 1 },
  elder: { from: 70, to: 200, grey: 1, wrinkles: 3, scale: 0.97 },
};

export const stageOf = (age: number): AgeStage =>
  (Object.keys(AGE_STAGES) as AgeStage[]).find((k) => age >= AGE_STAGES[k].from && age <= AGE_STAGES[k].to) ?? "adult";

/** Silver for "fully grey", near-white for the very old. */
export const SILVER = "#C9CCCF";
export const WHITE_HAIR = "#ECECEA";

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const toHex = (rgb: number[]) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** Blend a natural hair colour toward silver. amount 0 = natural, 1 = fully silver. */
export const greyHair = (natural: string, amount: number, target = SILVER) => {
  const a = hex(natural);
  const b = hex(target);
  return toHex(a.map((v, i) => v + (b[i] - v) * Math.max(0, Math.min(1, amount))));
};

/** Generic ageing for fictional characters: hair greys and face lines appear by stage. */
export const ageLook = (look: CharacterLook, age: number): CharacterLook => {
  const st = AGE_STAGES[stageOf(age)];
  const target = st.grey >= 1 ? WHITE_HAIR : SILVER;
  return {
    ...look,
    hairColor: greyHair(look.hairColor, st.grey, target),
    facialHairColor: look.facialHairColor ? greyHair(look.facialHairColor, st.grey, target) : undefined,
    wrinkles: look.wrinkles ?? st.wrinkles,
  };
};

/** Size multiplier for an age (children and teens are smaller; adults 1). */
export const ageScale = (age: number) => AGE_STAGES[stageOf(age)].scale;

/** The look of a real person in a given year: the matching era's overrides on top of the present-day look. */
export const lookAt = (entry: CastEntry, year?: number): CharacterLook => {
  if (entry.kind !== "human") throw new Error(`${entry.id} is not a human cast entry`);
  if (year === undefined || !entry.eras) return entry.look;
  const era = entry.eras.find((e) => year >= e.from && year <= e.to);
  return era ? { ...entry.look, ...era.look } : entry.look;
};

/** Age in a given year, if the cast entry has `born`. */
export const ageIn = (entry: CastEntry, year: number) => (entry.kind === "human" && entry.born ? year - entry.born : undefined);
