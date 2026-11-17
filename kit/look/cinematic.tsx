/**
 * Cinematic look kit: turns flat SVG cartoon art into a lit, graded shot.
 *
 * Draw the scene in neutral "daylight" colours, then stack (bottom → top):
 *   scene art → <Lighting> (darkness + light pools + glow) → <Vignette> → <Grain> → UI tags
 * Everything works in the 1920x1080 space used by <Stage>.
 */
import React, { useId, useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/CaveatBrush";
import { HAND_FONT } from "../theme";

export const { fontFamily: BRUSH_FONT } = loadFont();

const W = 1920;
const H = 1080;
const WARM = "#FFE3B8";
const uid = (raw: string) => raw.replace(/[^a-zA-Z0-9]/g, "");
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* ------------------------------------------------------------------ */
/* Lighting                                                            */
/* ------------------------------------------------------------------ */

export type Light = {
  /** Centre of the light in stage pixels. */
  x: number;
  y: number;
  /** How far the pool reaches. For `rect` lights this is the feather (edge softness). */
  r: number;
  /** Vertical reach if the pool is an ellipse (floor pools are wide and flat). */
  ry?: number;
  /** `rect` = a window, screen or doorway: a soft-edged rectangle of light. */
  rect?: { w: number; h: number };
  /** Tint of the light. Warm lamp by default. */
  color?: string;
  /** 0..1: how completely the pool lifts the darkness at its centre. */
  intensity?: number;
  /** 0..1: additive haze around the source (bloom). 0 = none. */
  glow?: number;
  /** 0..0.25: candle / neon instability. */
  flicker?: number;
};

export type Cone = { x: number; y: number; topW: number; bottomW: number; h: number; color?: string; opacity?: number };

/**
 * Darkens the whole scene to `ambient` (multiply), re-opens it where lights are, then adds glow (screen).
 * Put it directly above the scene art, inside the same parent, so the blend modes see the art.
 */
export const Lighting: React.FC<{ ambient?: string; lights: Light[]; cones?: Cone[] }> = ({ ambient = "#3A3857", lights, cones = [] }) => {
  const frame = useCurrentFrame();
  const id = uid(useId());
  const level = (l: Light, i: number) =>
    1 + (l.flicker ?? 0) * (Math.sin(frame * 0.9 + i * 7) * 0.6 + Math.sin(frame * 2.3 + i * 3) * 0.4);
  const shape = (l: Light, i: number, fill: string, grow = 1) =>
    l.rect ? (
      <rect key={i} x={l.x - l.rect.w / 2} y={l.y - l.rect.h / 2} width={l.rect.w} height={l.rect.h} fill={fill} filter={`url(#${id}f${i})`} />
    ) : (
      <ellipse key={i} cx={l.x} cy={l.y} rx={l.r * grow} ry={(l.ry ?? l.r) * grow} fill={fill} />
    );
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply" }}>
        <defs>
          {lights.map((l, i) => {
            const a = clamp01((l.intensity ?? 1) * level(l, i));
            const c = l.color ?? WARM;
            return l.rect ? (
              <filter key={i} id={`${id}f${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={l.r / 2.5} />
              </filter>
            ) : (
              <radialGradient key={i} id={`${id}m${i}`}>
                <stop offset="0%" stopColor={c} stopOpacity={a} />
                <stop offset="45%" stopColor={c} stopOpacity={a * 0.62} />
                <stop offset="100%" stopColor={c} stopOpacity={0} />
              </radialGradient>
            );
          })}
        </defs>
        <rect width={W} height={H} fill={ambient} />
        {lights.map((l, i) =>
          l.rect ? <g key={i} opacity={clamp01((l.intensity ?? 1) * level(l, i))}>{shape(l, i, l.color ?? WARM)}</g> : shape(l, i, `url(#${id}m${i})`),
        )}
      </svg>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
        <defs>
          {lights.map((l, i) => (
            <radialGradient key={i} id={`${id}g${i}`}>
              <stop offset="0%" stopColor={l.color ?? WARM} stopOpacity={clamp01((l.glow ?? 0.3) * level(l, i))} />
              <stop offset="100%" stopColor={l.color ?? WARM} stopOpacity={0} />
            </radialGradient>
          ))}
          {cones.map((c, i) => (
            <linearGradient key={i} id={`${id}c${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.color ?? WARM} stopOpacity={c.opacity ?? 0.28} />
              <stop offset="100%" stopColor={c.color ?? WARM} stopOpacity={0} />
            </linearGradient>
          ))}
          <filter id={`${id}cb`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={10} />
          </filter>
        </defs>
        {lights.map((l, i) =>
          (l.glow ?? 0.3) > 0 ? (
            <ellipse key={i} cx={l.x} cy={l.y} rx={(l.rect ? Math.max(l.rect.w, l.rect.h) * 0.75 : l.r * 0.6)} ry={(l.rect ? Math.max(l.rect.w, l.rect.h) * 0.6 : (l.ry ?? l.r) * 0.6)} fill={`url(#${id}g${i})`} />
          ) : null,
        )}
        {cones.map((c, i) => (
          <path
            key={i}
            d={`M ${c.x - c.topW / 2} ${c.y} L ${c.x + c.topW / 2} ${c.y} L ${c.x + c.bottomW / 2} ${c.y + c.h} L ${c.x - c.bottomW / 2} ${c.y + c.h} Z`}
            fill={`url(#${id}c${i})`}
            filter={`url(#${id}cb)`}
          />
        ))}
      </svg>
    </>
  );
};

/** Darkened corners pull the eye to the middle of the frame. */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 52%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: "none" }} />
);

/** Film grain: one small noise tile, shifted every frame. Cheap to render. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const frame = useCurrentFrame();
  const tile = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const img = ctx.createImageData(size, size);
    let seed = 1337;
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const v = seed >>> 24;
      img.data[i * 4] = v;
      img.data[i * 4 + 1] = v;
      img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL("image/png");
  }, []);
  const ox = (frame * 73) % 256;
  const oy = (frame * 151) % 256;
  return <AbsoluteFill style={{ backgroundImage: `url(${tile})`, backgroundPosition: `${ox}px ${oy}px`, mixBlendMode: "overlay", opacity, pointerEvents: "none" }} />;
};

/* ------------------------------------------------------------------ */
/* SVG helpers used inside <Stage>                                      */
/* ------------------------------------------------------------------ */

/** Out-of-focus layer (far background, or a foreground object close to the lens). */
export const Defocus: React.FC<{ amount?: number; children: React.ReactNode }> = ({ amount = 5, children }) => {
  const id = uid(useId());
  return (
    <g filter={`url(#${id})`}>
      <defs>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation={amount} />
        </filter>
      </defs>
      {children}
    </g>
  );
};

/**
 * Rim light: a bright edge on the side of the figures that faces the light.
 * Wrap a <g> that contains only characters / props; `x, y` are stage pixels (the group itself must not be transformed).
 * The light sits almost level with the artwork (low z) so only edges catch it; a high light washes the whole figure grey.
 */
export const Rim: React.FC<{ x: number; y: number; color?: string; strength?: number; width?: number; children: React.ReactNode }> = ({
  x, y, color = WARM, strength = 0.9, width = 9, children,
}) => {
  const id = uid(useId());
  return (
    <g filter={`url(#${id})`}>
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation={width} result="bump" />
          <feSpecularLighting in="bump" surfaceScale={9} specularConstant={strength} specularExponent={22} lightingColor={color} result="spec">
            <fePointLight x={x} y={y} z={36} />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="rim" />
          <feComposite in="SourceGraphic" in2="rim" operator="arithmetic" k1={0} k2={1} k3={1} k4={0} />
        </filter>
      </defs>
      {children}
    </g>
  );
};

/** Soft blob under a character so it sits on the floor instead of floating. */
export const ContactShadow: React.FC<{ x: number; y: number; w?: number; opacity?: number }> = ({ x, y, w = 150, opacity = 0.45 }) => {
  const id = uid(useId());
  return (
    <g>
      <defs>
        <filter id={id} x="-50%" y="-150%" width="200%" height="400%">
          <feGaussianBlur stdDeviation={9} />
        </filter>
      </defs>
      <ellipse cx={x} cy={y} rx={w / 2} ry={w / 9} fill="#000" opacity={opacity} filter={`url(#${id})`} />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Documentary tags (HTML, place outside <Camera> so they stay sharp)    */
/* ------------------------------------------------------------------ */

const useIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 140 } });
};

const typed = (text: string, frame: number, delay: number, cps = 28, fps = 30) =>
  text.slice(0, Math.max(0, Math.round(((frame - delay) / fps) * cps)));

/** Who is on screen: name + role on a dark plate with one accent colour. */
export const LowerThird: React.FC<{ name: string; role: string; accent?: string; x?: number; y?: number; delay?: number }> = ({
  name, role, accent = "#F2B544", x = 1130, y = 800, delay = 8,
}) => {
  const p = useIn(delay);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: p, transform: `translateX(${(1 - p) * -40}px)`, display: "flex", fontFamily: HAND_FONT }}>
      <div style={{ width: 10, background: accent, borderRadius: 3 }} />
      <div style={{ background: "rgba(14,14,20,0.82)", padding: "14px 34px 16px 24px", borderRadius: "0 12px 12px 0" }}>
        <div style={{ color: "#fff", fontSize: 58, lineHeight: 1.05, letterSpacing: 1.5, textTransform: "uppercase" }}>{name}</div>
        <div style={{ color: accent, fontSize: 36, lineHeight: 1.1, letterSpacing: 1 }}>{role}</div>
      </div>
    </div>
  );
};

/** Where we are: small plate, bottom-left, typed in. */
export const PlaceTag: React.FC<{ text: string; delay?: number; x?: number; y?: number }> = ({ text, delay = 4, x = 70, y = 960 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shown = typed(text, frame, delay, 28, fps);
  if (frame < delay) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, background: "rgba(14,14,20,0.8)", borderRadius: 8, padding: "8px 22px", fontFamily: HAND_FONT, fontSize: 38, letterSpacing: 2, color: "#fff", textTransform: "uppercase" }}>
      {shown}
      <span style={{ visibility: "hidden" }}>{text.slice(shown.length)}</span>
    </div>
  );
};

/** When we are: a small paper label, slightly tilted. */
export const DateTag: React.FC<{ text: string; delay?: number; x?: number; y?: number; color?: string }> = ({ text, delay = 4, x = 70, y = 60, color = "#F5D547" }) => {
  const p = useIn(delay);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `rotate(-3deg) scale(${p})`, transformOrigin: "left center", background: color, color: "#1f1f1f", border: "4px solid #1f1f1f", borderRadius: 8, padding: "4px 22px", fontFamily: HAND_FONT, fontSize: 44, letterSpacing: 1.5, textTransform: "uppercase" }}>
      {text}
    </div>
  );
};

/**
 * Skit with a real person: a small fixed "DRAMATIZATION" label, bottom-right (clear of speech bubbles and the top-left DateTag). Required on every shot where a real
 * person speaks invented lines (skills: real-people rules). No animation, so it reads as a label, not a graphic.
 */
export const Dramatization: React.FC<{ text?: string; x?: number; y?: number }> = ({ text = "Dramatization", x = 1850, y = 1000 }) => (
  <div style={{ position: "absolute", right: 1920 - x, top: y, background: "rgba(14,14,20,0.6)", border: "2px solid rgba(255,255,255,0.55)", borderRadius: 6, padding: "3px 14px", fontFamily: HAND_FONT, fontSize: 28, letterSpacing: 3, color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
    {text}
  </div>
);

/** Chapter title on black. Fades in, holds, fades out over the length of its Sequence. */
export const ChapterCard: React.FC<{ title: string; size?: number }> = ({ title, size = 104 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: BRUSH_FONT, color: "#fff", fontSize: size, opacity: o, transform: `scale(${1 + frame * 0.0006})` }}>{title}</div>
    </AbsoluteFill>
  );
};

/**
 * Whip pan: the shot slides in / out fast with horizontal motion blur.
 * Wrap the whole shot. `inFrames` / `outFrames` = 0 disables that side.
 */
export const Whip: React.FC<{ inFrames?: number; outFrames?: number; dir?: 1 | -1; children: React.ReactNode }> = ({ inFrames = 5, outFrames = 5, dir = 1, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const id = uid(useId());
  const tIn = inFrames > 0 ? interpolate(frame, [0, inFrames], [1, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 0;
  const tOut = outFrames > 0 ? interpolate(frame, [durationInFrames - outFrames, durationInFrames], [0, 1], { extrapolateLeft: "clamp", easing: Easing.in(Easing.cubic) }) : 0;
  const shift = (tIn - tOut) * W * dir;
  const blur = Math.max(tIn, tOut) * 90;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id={id} x="-20%" y="0" width="140%" height="100%">
          <feGaussianBlur stdDeviation={`${blur} 0`} />
        </filter>
      </svg>
      <AbsoluteFill style={{ transform: `translateX(${shift}px)`, filter: blur > 0.5 ? `url(#${id})` : undefined }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
