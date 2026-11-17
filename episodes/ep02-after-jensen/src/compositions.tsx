// Các composition của tập ep02-after-jensen. Mọi id bắt đầu bằng "ep02-" để không trùng tập khác.
// Âm thanh: staticFile(audioFile("ep02-after-jensen", "n1")) hoặc useMouth(audioFile("ep02-after-jensen", "d1")) — file ở public/ep02-after-jensen/audio/.
import React from "react";
import { Composition } from "remotion";
import { Placeholder } from "./scenes/Placeholder";

export const Compositions: React.FC = () => (
  <>
    <Composition id="ep02-Placeholder" component={Placeholder} durationInFrames={90} fps={30} width={1920} height={1080} />
  </>
);
