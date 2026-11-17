// Shared building blocks for every ep01 section: shot wrappers, cast lookup and the voice-synced timeline.
import React from "react";
import { AbsoluteFill, Audio, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CharacterLook } from "../../../../kit/Character";
import { lookAt } from "../../../../kit/age";
import { Grain, Vignette } from "../../../../kit/look/cinematic";
import { audioFile } from "../../../../kit/lipsync";
import { Camera, Stage } from "../../../../kit/ui";
import { CAST } from "../cast";
import timing from "../timing.json";

export const EP = "ep01-megaspeed";
export const FPS = 30;
export const AMBER = "#F2B544";
export const DUR = timing as Record<string, number>;

/** Look of a human cast member, optionally in a given year (eras in cast.ts). */
export const look = (id: string, year?: number): CharacterLook => {
  const c = CAST.find((x) => x.id === id);
  if (!c || c.kind !== "human") throw new Error(`no human cast entry ${id}`);
  return lookAt(c, year);
};

export const usePop = (delay: number, damping = 11) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness: 170 } });
};

/** Dark story shot: camera push + lighting + vignette + grain. Tags go in `overlay` (stay sharp, outside the camera). */
export const StoryShot: React.FC<{
  children: React.ReactNode; lighting: React.ReactNode; overlay?: React.ReactNode;
  from?: number; to?: number; originX?: number; originY?: number; vignette?: number;
}> = ({ children, lighting, overlay, from = 1.02, to = 1.07, originX = 960, originY = 540, vignette = 0.6 }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Camera from={from} to={to} originX={originX} originY={originY}>
      <Stage>{children}</Stage>
      {lighting}
    </Camera>
    <Vignette strength={vignette} />
    <Grain opacity={0.09} />
    {overlay}
  </AbsoluteFill>
);

/** Bright explainer shot: plain limbo, light vignette, no grade. */
export const ExplainShot: React.FC<{ children: React.ReactNode; overlay?: React.ReactNode; from?: number; to?: number; originX?: number; originY?: number; bg?: string }> = ({
  children, overlay, from = 1, to = 1.05, originX = 960, originY = 540, bg = "#EDE6D6",
}) => (
  <AbsoluteFill style={{ background: bg }}>
    <Camera from={from} to={to} originX={originX} originY={originY}>
      <Stage>{children}</Stage>
    </Camera>
    <Vignette strength={0.25} />
    <Grain opacity={0.05} />
    {overlay}
  </AbsoluteFill>
);

/**
 * Re-frame the same stage closer: scale `s` around stage point (cx, cy) and put that point at screen (tx, ty).
 * Use for close-ups inside a skit so the set is drawn once.
 */
export const Closer: React.FC<{ s: number; cx: number; cy: number; tx?: number; ty?: number; children: React.ReactNode }> = ({ s, cx, cy, tx = 960, ty = 540, children }) => (
  <AbsoluteFill style={{ transform: `translate(${tx - cx}px, ${ty - cy}px) scale(${s})`, transformOrigin: `${cx}px ${cy}px` }}>{children}</AbsoluteFill>
);

export type Shot = { key: string; at: number; node: React.ReactNode };

/** Start time (s) of each line when the lines play back to back. */
export const lineStarts = (lines: string[]) => {
  const start: Record<string, number> = {};
  let acc = 0;
  for (const id of lines) {
    start[id] = acc;
    acc += DUR[id];
  }
  return { start, total: acc, T: (id: string, off = 0) => start[id] + off };
};

export const f = (sec: number) => Math.round(sec * FPS);

/** Lines b02_001…b02_037 → ["b02_001", …]. */
export const lineRange = (beat: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${beat}_${String(from + i).padStart(3, "0")}`);

/** A section: shots cut on the voice timeline, and every voice line played at its own start. */
export const Section: React.FC<{ lines: string[]; shots: Shot[] }> = ({ lines, shots }) => {
  const { start, total } = lineStarts(lines);
  const end = f(total);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {shots.map((s, i) => {
        const from = f(s.at);
        const to = i + 1 < shots.length ? f(shots[i + 1].at) : end;
        return (
          <Sequence key={s.key} name={s.key} from={from} durationInFrames={Math.max(1, to - from)}>
            {s.node}
          </Sequence>
        );
      })}
      {lines.map((id) => (
        <Sequence key={id} name={id} from={f(start[id])} durationInFrames={f(DUR[id]) + 2}>
          <Audio src={staticFile(audioFile(EP, id))} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Frame ranges of each shot (for review stills). */
export const shotFrames = (lines: string[], shots: Shot[]) => {
  const end = f(lineStarts(lines).total);
  return shots.map((s, i) => ({ key: s.key, from: f(s.at), to: i + 1 < shots.length ? f(shots[i + 1].at) : end }));
};
