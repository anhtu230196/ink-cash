import { ArmPose, CharacterLook, Expression } from "./Character";

/**
 * One period of someone's life with its own look (hair colour, outfit…). `look` holds only what differs
 * from the entry's present-day look. Pick it with `lookAt(entry, year)` from kit/age.ts.
 */
export type Era = { label: string; from: number; to: number; look: Partial<CharacterLook> };

/** One role in an episode's cast. Each episode lists its own in `episodes/<id>/src/cast.ts`. */
export type CastEntry =
  | {
      id: string; kind: "human"; name: string; role: string; real?: boolean;
      /** Present-day look (the year the episode is set in). */
      look: CharacterLook;
      pose: ArmPose; moods: [Expression, Expression, Expression];
      /** Birth year: lets scenes compute age and pick an era. */
      born?: number;
      /** Earlier looks, oldest first. Years outside every era use `look`. */
      eras?: Era[];
    }
  | { id: string; kind: "gpu"; name: string; role: string; color: string; scale: number; moods: [Expression, Expression, Expression] }
  | { id: string; kind: "dog"; name: string; role: string; moods: [Expression, Expression, Expression] };
