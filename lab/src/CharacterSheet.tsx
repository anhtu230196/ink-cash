import React from "react";
import { AbsoluteFill } from "remotion";
import { CastEntry } from "../../kit/cast";
import { Character, CharacterLook, CustomsDog, Expression, GpuCharacter } from "../../kit/Character";
import { ageLook, ageScale, lookAt, stageOf } from "../../kit/age";
import { HAND_FONT, INK } from "../../kit/theme";
import { castOf } from "../../src/episodes";

const SLOTS = [340, 820, 1260, 1680];
const LABELS = ["Dáng chính", "Biểu cảm 1", "Biểu cảm 2", "Biểu cảm 3"];
const MOOD_VI: Record<Expression, string> = {
  neutral: "bình thường", happy: "vui", smug: "đắc ý", worried: "lo lắng", awkward: "ngượng",
  angry: "bực", surprised: "ngạc nhiên", sad: "buồn",
};

const Figure: React.FC<{ c: CastEntry; x: number; main: boolean; mood: Expression }> = ({ c, x, main, mood }) => {
  const y = 930;
  if (c.kind === "gpu") return <GpuCharacter x={x} y={y} scale={(main ? 1.25 : 1.05) * c.scale} color={c.color} label="GPU" expression={mood} arm={main ? "wave" : "down"} />;
  if (c.kind === "dog") return <CustomsDog x={x - (main ? 60 : 50)} y={y} scale={main ? 1.25 : 1.0} expression={mood} />;
  return <Character {...c.look} x={x} y={y} scale={main ? 1.0 : 0.88} expression={mood} arm={main ? c.pose : "down"} />;
};

/** One sheet per character. Props: episode (folder name, e.g. "ep01-megaspeed") + character id. */
export const CharacterSheet: React.FC<{ episode: string; id: string }> = ({ episode, id }) => {
  const CAST = castOf(episode);
  const c = CAST.find((x) => x.id === id) ?? CAST[0];
  const moods: Expression[] = [c.moods[0], ...c.moods];
  return (
    <AbsoluteFill style={{ background: "#EEECE6", fontFamily: HAND_FONT, color: INK }}>
      <div style={{ position: "absolute", left: 70, top: 40, fontSize: 76 }}>{c.name}</div>
      <div style={{ position: "absolute", left: 74, top: 128, fontSize: 36, color: "#55524C" }}>{c.role}</div>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d="M 600 230 L 600 1050" stroke="#D3CFC6" strokeWidth={3} strokeDasharray="10 10" />
        <path d="M 60 935 L 1860 935" stroke="#D3CFC6" strokeWidth={3} />
        {SLOTS.map((x, i) => <Figure key={i} c={c} x={x} main={i === 0} mood={moods[i]} />)}
      </svg>
      {SLOTS.map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x - 160, width: 320, top: 990, textAlign: "center", fontSize: 34 }}>
          {i === 0 ? LABELS[0] : `${MOOD_VI[moods[i]]}`}
        </div>
      ))}
    </AbsoluteFill>
  );
};

/**
 * Age sheet. Real person with `eras`: one figure per era + present day, labelled with year and age.
 * Anyone else: the generic ladder from kit/age.ts (ageLook) at 8, 16, 28, 40, 50, 63, 78.
 * Props: episode + id, e.g. {"episode":"ep01-megaspeed","id":"jensen"}.
 */
export const AgeSheet: React.FC<{ episode: string; id: string }> = ({ episode, id }) => {
  const CAST = castOf(episode);
  const c = CAST.find((x) => x.id === id) ?? CAST[0];
  if (c.kind !== "human") return <CharacterSheet episode={episode} id={id} />;
  const now = 2026;
  const figures: { label: string; sub: string; look: CharacterLook; scale: number }[] = c.eras && c.born
    ? [
        ...c.eras.map((e) => ({ label: e.label, sub: `${e.from}–${e.to}`, look: lookAt(c, e.from + Math.min(13, e.to - e.from)), scale: 1 })),
        { label: `${now} · ${now - c.born} tuổi`, sub: "hiện tại", look: c.look, scale: 1 },
      ]
    : [8, 16, 28, 40, 50, 63, 78].map((a) => ({ label: `${a} tuổi`, sub: stageOf(a), look: ageLook(c.look, a), scale: ageScale(a) }));
  const n = figures.length;
  const xs = figures.map((_, i) => 1920 / (n + 1) * (i + 1));
  const big = n <= 4 ? 1.15 : 0.9;
  return (
    <AbsoluteFill style={{ background: "#EEECE6", fontFamily: HAND_FONT, color: INK }}>
      <div style={{ position: "absolute", left: 70, top: 40, fontSize: 76 }}>{c.name} · theo tuổi</div>
      <div style={{ position: "absolute", left: 74, top: 128, fontSize: 36, color: "#55524C" }}>{c.eras ? "các thời kỳ khai báo trong cast.ts (eras)" : "thang tuổi mặc định của kit/age.ts"}</div>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d="M 60 935 L 1860 935" stroke="#D3CFC6" strokeWidth={3} />
        {figures.map((f, i) => <Character key={i} {...f.look} x={xs[i]} y={930} scale={big * f.scale} expression="neutral" arm="down" />)}
      </svg>
      {figures.map((f, i) => (
        <div key={i} style={{ position: "absolute", left: xs[i] - 180, width: 360, top: 960, textAlign: "center" }}>
          <div style={{ fontSize: 40 }}>{f.label}</div>
          <div style={{ fontSize: 28, color: "#77736E" }}>{f.sub}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
