/**
 * Ink & Cash channel avatar, 800x800 (YouTube shows it as a circle, as small as ~98px).
 * Keep everything important inside a ~330px radius from the centre.
 *   npx remotion still build Avatar ../brand/avatar-nib.png --props='{"variant":"nib"}' --port=3917
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/CaveatBrush";
import { Character, SKIN } from "../../kit/Character";

const { fontFamily: BRUSH } = loadFont();

export const BRAND = {
  ink: "#16141F",
  night: "#1C2142",
  nightDeep: "#0C0E1E",
  amber: "#F2B544",
  amberDeep: "#D98E1F",
  cream: "#F3E9D2",
};

const K = BRAND.ink;
const S = 14;

const Backdrop: React.FC<{ glowY?: number }> = ({ glowY = 360 }) => (
  <svg viewBox="0 0 800 800" width={800} height={800} style={{ position: "absolute", inset: 0 }}>
    <defs>
      <radialGradient id="bg" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stopColor={BRAND.night} />
        <stop offset="100%" stopColor={BRAND.nightDeep} />
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy={`${(glowY / 800) * 100}%`} r="42%">
        <stop offset="0%" stopColor={BRAND.amber} stopOpacity={0.42} />
        <stop offset="100%" stopColor={BRAND.amber} stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={800} height={800} fill="url(#bg)" />
    <rect width={800} height={800} fill="url(#glow)" />
  </svg>
);

/** Ink splatter dots, deterministic. */
const Splatter: React.FC<{ cx: number; cy: number; color: string; spread?: number }> = ({ cx, cy, color, spread = 150 }) => {
  const dots = [
    [-0.9, 0.2, 13], [-0.7, -0.5, 8], [0.85, 0.1, 12], [0.6, -0.6, 7], [-0.4, 0.75, 9],
    [0.45, 0.8, 10], [-1.1, -0.05, 5], [1.1, 0.45, 6], [0.15, -0.95, 5], [-0.2, 1.05, 6],
  ];
  return (
    <g>
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={cx + x * spread} cy={cy + y * spread * 0.7} r={r} fill={color} stroke={K} strokeWidth={4} />
      ))}
    </g>
  );
};

/** Variant A: fountain-pen nib whose tip drips a drop of amber ink with a $ in it. */
const Nib: React.FC = () => (
  <AbsoluteFill>
    <Backdrop glowY={330} />
    <svg viewBox="0 0 800 800" width={800} height={800} style={{ position: "absolute", inset: 0 }}>
      <Splatter cx={400} cy={600} color={BRAND.amber} spread={170} />
      {/* nib is drawn with its tip at (400,560); scale it about the tip so the tip lands at (400,470) */}
      <g transform="translate(400 470) rotate(-10) scale(0.74) translate(-400 -560)">
        {/* nib body */}
        <path d="M 400 70 C 318 140 276 260 288 380 L 400 560 L 512 380 C 524 260 482 140 400 70 Z" fill={BRAND.cream} stroke={K} strokeWidth={S} strokeLinejoin="round" />
        {/* shoulders / grip band */}
        <path d="M 318 170 Q 400 140 482 170" stroke={K} strokeWidth={10} fill="none" strokeLinecap="round" />
        {/* shading on one half */}
        <path d="M 400 300 L 400 552 L 506 384 C 516 300 496 220 470 176 Q 440 165 400 160 Z" fill="#D9C9A5" opacity={0.7} />
        {/* slit + breather hole */}
        <path d="M 400 556 L 400 352" stroke={K} strokeWidth={10} strokeLinecap="round" />
        <circle cx={400} cy={326} r={26} fill={BRAND.nightDeep} stroke={K} strokeWidth={10} />
        {/* ink on the tip */}
        <path d="M 382 528 L 400 560 L 418 528 Z" fill={BRAND.amber} />
      </g>
      {/* drop */}
      <g transform="translate(400 470) scale(0.82)">
        <path d="M 0 0 C 0 0 92 96 92 150 A 92 92 0 1 1 -92 150 C -92 96 0 0 0 0 Z" fill={BRAND.amber} stroke={K} strokeWidth={S} strokeLinejoin="round" />
        <path d="M -52 138 Q -50 92 -16 70" stroke="#FFE7B0" strokeWidth={13} fill="none" strokeLinecap="round" />
        <text x={4} y={198} textAnchor="middle" fontFamily={BRUSH} fontSize={150} fill={K}>$</text>
      </g>
    </svg>
  </AbsoluteFill>
);

/** Variant B: hand-lettered wordmark. */
const Wordmark: React.FC = () => (
  <AbsoluteFill>
    <Backdrop glowY={420} />
    <svg viewBox="0 0 800 800" width={800} height={800} style={{ position: "absolute", inset: 0 }}>
      <Splatter cx={400} cy={410} color={BRAND.amber} spread={265} />
      <g fontFamily={BRUSH} textAnchor="middle" stroke={K} strokeWidth={16} paintOrder="stroke" strokeLinejoin="round">
        <text x={372} y={378} fontSize={250} fill={BRAND.cream} transform="rotate(-6 400 330)">Ink</text>
        <text x={560} y={318} fontSize={150} fill={BRAND.amber} transform="rotate(-6 400 330)">&amp;</text>
        <text x={408} y={588} fontSize={250} fill={BRAND.amber} transform="rotate(-6 400 520)">Cash</text>
      </g>
      {/* underline swoosh */}
      <path d="M 196 640 Q 400 600 612 618" stroke={BRAND.cream} strokeWidth={14} fill="none" strokeLinecap="round" />
    </svg>
  </AbsoluteFill>
);

/** Variant C: channel mascot, a round-headed narrator holding a pen, lit by the desk lamp. */
const Mascot: React.FC = () => {
  const sc = 2.25;
  const x = 400;
  const y = 418 + 350 * sc; // head centre at y=418
  return (
    <AbsoluteFill>
      <Backdrop glowY={300} />
      <svg viewBox="0 0 800 800" width={800} height={800} style={{ position: "absolute", inset: 0 }}>
        <Character
          x={x} y={y} scale={sc}
          outfit="suit" color="#2E3A57" tie={BRAND.amber}
          hair="curly" hairColor="#3B2A1E" glasses skin={SKIN.tan}
          expression="smug" arm="down"
        />
        {/* pen tucked behind the ear */}
        <g transform="translate(598 300) rotate(28)">
          <rect x={-16} y={-120} width={32} height={200} rx={14} fill={BRAND.amber} stroke={K} strokeWidth={10} />
          <path d="M -16 80 L 0 128 L 16 80 Z" fill={BRAND.cream} stroke={K} strokeWidth={10} strokeLinejoin="round" />
          <rect x={-20} y={-80} width={40} height={18} fill={BRAND.nightDeep} stroke={K} strokeWidth={6} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Avatar: React.FC<{ variant: "nib" | "wordmark" | "mascot" }> = ({ variant }) =>
  variant === "wordmark" ? <Wordmark /> : variant === "mascot" ? <Mascot /> : <Nib />;
