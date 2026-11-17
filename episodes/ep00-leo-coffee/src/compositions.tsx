// ep00 — 25-second "Leo's Coffee" pipeline test (2026-11-12). Frozen: it keeps its own older
// copies of the components in ./components so changes to kit/ never break it.
import React from "react";
import { Composition } from "remotion";
import { FPS, Intro, TOTAL_FRAMES } from "./Intro";

export const Compositions: React.FC = () => (
  <Composition id="ep00-Intro" component={Intro} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
);
