import { useAudioData } from "@remotion/media-utils";
import { useMemo } from "react";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/** Path (relative to public/) of one voice line: `public/<episode>/audio/<line>.wav`. */
export const audioFile = (episode: string, line: string) => `${episode}/audio/${line}.wav`;

/**
 * Mouth openness 0..1 for the current frame, from the RMS loudness of the line's audio.
 * Each frame's RMS is compared with the loudest frame of the same line, so syllables open
 * the mouth and the gaps between them close it.
 * Usage: `useMouth(audioFile("ep01-megaspeed", "d1"))`.
 */
export const useMouth = (file: string) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = useAudioData(staticFile(file));

  const envelope = useMemo(() => {
    if (!data) return null;
    const ch = data.channelWaveforms[0];
    const per = Math.floor(data.sampleRate / fps);
    const out: number[] = [];
    for (let i = 0; i + per <= ch.length; i += per) {
      let sum = 0;
      for (let j = i; j < i + per; j++) sum += ch[j] * ch[j];
      out.push(Math.sqrt(sum / per));
    }
    const peak = Math.max(...out, 1e-6);
    return out.map((v) => v / peak);
  }, [data, fps]);

  if (!envelope || frame >= envelope.length) return 0;
  const v = envelope[frame];
  if (v < 0.18) return 0;
  return Math.min(1, (v - 0.18) / 0.7);
};
