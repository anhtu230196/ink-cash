// Các composition của tập __ID__. Mọi id bắt đầu bằng "__PFX__-" để không trùng tập khác.
// Âm thanh: staticFile(audioFile("__ID__", "n1")) hoặc useMouth(audioFile("__ID__", "d1")) — file ở public/__ID__/audio/.
import React from "react";
import { Composition } from "remotion";
import { Placeholder } from "./scenes/Placeholder";

export const Compositions: React.FC = () => (
  <>
    <Composition id="__PFX__-Placeholder" component={Placeholder} durationInFrames={90} fps={30} width={1920} height={1080} />
  </>
);
