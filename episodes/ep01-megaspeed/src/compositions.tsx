// ep01 — Megaspeed / alleged spy. Every composition id starts with "ep01-".
// Character sheets for this cast: lab composition "CharacterSheets" with props {"episode":"ep01-megaspeed","id":"…"}.
import React from "react";
import { Composition, Folder } from "remotion";
import { HairCompare } from "./dev/HairCompare";
import { Open, OPEN_FRAMES } from "./scenes/open/Open";
import { B02a, B02A_FRAMES } from "./scenes/b02/B02a";
import { B02b, B02B_FRAMES } from "./scenes/b02/B02b";
import { B03, B03_FRAMES } from "./scenes/b03/B03";
import { B04, B04_FRAMES } from "./scenes/b04/B04";
import { B05a, B05A_FRAMES } from "./scenes/b05/B05a";
import { B05b, B05B_FRAMES } from "./scenes/b05/B05b";
import { B06, B06_FRAMES } from "./scenes/b06/B06";
import { B07a, B07A_FRAMES } from "./scenes/b07/B07a";
import { B07b, B07B_FRAMES } from "./scenes/b07/B07b";
import { B08, B08_FRAMES } from "./scenes/b08/B08";
import { B09a, B09A_FRAMES } from "./scenes/b09/B09a";
import { B09b, B09B_FRAMES } from "./scenes/b09/B09b";
import { Thumbnail } from "./thumbnail/Thumbnail";

export const Compositions: React.FC = () => (
  <>
    <Folder name="ep01-sections">
      <Composition id="ep01-Open" component={Open} durationInFrames={OPEN_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B02a" component={B02a} durationInFrames={B02A_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B02b" component={B02b} durationInFrames={B02B_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B03" component={B03} durationInFrames={B03_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B04" component={B04} durationInFrames={B04_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B05a" component={B05a} durationInFrames={B05A_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B05b" component={B05b} durationInFrames={B05B_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B06" component={B06} durationInFrames={B06_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B07a" component={B07a} durationInFrames={B07A_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B07b" component={B07b} durationInFrames={B07B_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B08" component={B08} durationInFrames={B08_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B09a" component={B09a} durationInFrames={B09A_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="ep01-B09b" component={B09b} durationInFrames={B09B_FRAMES} fps={30} width={1920} height={1080} />
    </Folder>
    <Composition id="ep01-Thumbnail" component={Thumbnail} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{ variant: "nvidia" as const }} />
    <Composition id="ep01-HairCompare" component={HairCompare} durationInFrames={1} fps={30} width={1920} height={1080} />
  </>
);
