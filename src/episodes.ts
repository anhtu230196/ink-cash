// Registry of every episode. tools/new-episode.sh adds a line to each list below.
import React from "react";
import { CastEntry } from "../kit/cast";
import { Compositions as Ep00 } from "../episodes/ep00-leo-coffee/src/compositions";
import { Compositions as Ep01 } from "../episodes/ep01-megaspeed/src/compositions";
import { CAST as Ep01Cast } from "../episodes/ep01-megaspeed/src/cast";
import { Compositions as Ep02 } from "../episodes/ep02-after-jensen/src/compositions";
import { CAST as Ep02Cast } from "../episodes/ep02-after-jensen/src/cast";
// @new-episode-import

export const EPISODES: { id: string; Compositions: React.FC }[] = [
  { id: "ep00-leo-coffee", Compositions: Ep00 },
  { id: "ep01-megaspeed", Compositions: Ep01 },
  { id: "ep02-after-jensen", Compositions: Ep02 },
  // @new-episode-entry
];

export const CASTS: Record<string, CastEntry[]> = {
  "ep01-megaspeed": Ep01Cast,
  "ep02-after-jensen": Ep02Cast,
  // @new-episode-cast
};

export const castOf = (episode: string): CastEntry[] => CASTS[episode] ?? Object.values(CASTS)[0];
