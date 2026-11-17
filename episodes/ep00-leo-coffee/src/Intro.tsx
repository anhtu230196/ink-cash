import React from "react";
import { Audio, Series, staticFile } from "remotion";
import { BlackCard, DateCard, S1Office, S2Chart, S5Customer, S5Leo, S6Closeup } from "./scenes";
import timing from "./timing.json";

export const FPS = 30;
const T = timing as Record<string, number>;
const len = (id: string, pad: number) => Math.ceil(T[id] * FPS) + pad;

type Shot = { key: string; audio: string; frames: number; node: React.ReactNode };

export const SHOTS: Shot[] = [
  { key: "office", audio: "n1", frames: len("n1", 14), node: <S1Office /> },
  { key: "chart", audio: "n2", frames: len("n2", 8), node: <S2Chart /> },
  { key: "card-worst", audio: "n3", frames: len("n3", 8), node: <BlackCard text="But ten years ago, Leo made the worst coffee in Seattle." /> },
  { key: "date", audio: "n4", frames: len("n4", 6), node: <DateCard year="2016" place="Seattle, Washington" /> },
  { key: "customer", audio: "d1", frames: len("d1", 6), node: <S5Customer /> },
  { key: "leo", audio: "d2", frames: len("d2", 10), node: <S5Leo /> },
  { key: "closeup", audio: "n5", frames: len("n5", 8), node: <S6Closeup /> },
  { key: "card-question", audio: "n6", frames: len("n6", 18), node: <BlackCard text="So how did the worst barista in Seattle build a billion-dollar empire?" size={76} /> },
];

export const TOTAL_FRAMES = SHOTS.reduce((s, x) => s + x.frames, 0);

export const Intro: React.FC = () => (
  <Series>
    {SHOTS.map((s) => (
      <Series.Sequence key={s.key} durationInFrames={s.frames}>
        {s.node}
        <Audio src={staticFile(`ep00-leo-coffee/audio/${s.audio}.wav`)} />
      </Series.Sequence>
    ))}
  </Series>
);
