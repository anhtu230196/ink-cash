import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HAND_FONT, INK } from "./theme";

/** Slow push-in on every shot so stills never feel frozen. */
export const Camera: React.FC<{ children: React.ReactNode; from?: number; to?: number; originX?: number; originY?: number; shake?: boolean }> = ({
  children, from = 1, to = 1.05, originX = 960, originY = 540, shake = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, durationInFrames], [from, to], { extrapolateRight: "clamp" });
  const dx = shake && frame < 10 ? Math.sin(frame * 3) * (10 - frame) : 0;
  return (
    <AbsoluteFill style={{ transform: `translateX(${dx}px) scale(${s})`, transformOrigin: `${originX}px ${originY}px` }}>
      {children}
    </AbsoluteFill>
  );
};

export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
    {children}
  </svg>
);

/** Reveal characters over a fraction of the shot, like the narrator is writing it. */
export const useTypewriter = (text: string, startFrame = 0, endFrac = 0.7) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const n = Math.round(interpolate(frame, [startFrame, durationInFrames * endFrac], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return text.slice(0, n);
};

export const BlackCard: React.FC<{ text: string; size?: number }> = ({ text, size = 84 }) => {
  const shown = useTypewriter(text, 2, 0.75);
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: HAND_FONT, color: "#fff", fontSize: size, maxWidth: 1150, textAlign: "center", lineHeight: 1.25 }}>
        {shown}
        <span style={{ visibility: "hidden" }}>{text.slice(shown.length)}</span>
      </div>
    </AbsoluteFill>
  );
};

/** Speech bubble positioned in 1920x1080 space; tail points at (tailX, tailY). */
export const SpeechBubble: React.FC<{ x: number; y: number; w: number; text: string; tailX: number; tailY: number; delay?: number }> = ({
  x, y, w, text, tailX, tailY, delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
  const shown = useTypewriter(text, delay + 3, 0.55);
  const h = 110;
  const baseX = Math.min(Math.max(tailX, x + 60), x + w - 60);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${pop})`, transformOrigin: `${tailX}px ${tailY}px`, opacity: pop > 0.01 ? 1 : 0 }}>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute" }}>
        <path d={`M ${baseX - 28} ${y + h - 4} L ${tailX} ${tailY} L ${baseX + 22} ${y + h - 4}`} fill="#fff" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <rect x={x} y={y} width={w} height={h} rx={42} fill="#fff" stroke={INK} strokeWidth={5} />
        <rect x={baseX - 30} y={y + h - 14} width={56} height={12} fill="#fff" />
      </svg>
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT, fontSize: 58, color: INK }}>
        <span>{shown}<span style={{ visibility: "hidden" }}>{text.slice(shown.length)}</span></span>
      </div>
    </div>
  );
};
