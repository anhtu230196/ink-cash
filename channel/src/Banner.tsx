/**
 * Ink & Cash channel banner, 2560x1440.
 * YouTube crops it per device:
 *   TV       = whole image
 *   desktop  = full-width strip, y 508–931 (2560x423)
 *   mobile / safe area = centre 1546x423 (x 507–2053, y 508–931)  ← name, tagline and face must sit here
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/CaveatBrush";
import { loadFont as loadHand } from "@remotion/google-fonts/PatrickHand";
import { Character, SKIN } from "../../kit/Character";
import { BRAND } from "./Avatar";

const { fontFamily: BRUSH } = loadFont();
const { fontFamily: HAND } = loadHand();
const K = BRAND.ink;

const W = 2560;
const H = 1440;
const SAFE = { x: 507, y: 508, w: 1546, h: 423 };

const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/** City at night along the bottom; only TVs show most of it. */
const Skyline: React.FC<{ base: number }> = ({ base }) => {
  const towers: { x: number; w: number; h: number }[] = [];
  let x = -20;
  let i = 0;
  while (x < W) {
    const w = 110 + rnd(i) * 150;
    const h = 220 + rnd(i + 40) * 380;
    towers.push({ x, w, h });
    x += w - 6;
    i++;
  }
  return (
    <g>
      {towers.map((t, ti) => {
        const top = base - t.h;
        const cols = Math.max(2, Math.floor((t.w - 30) / 34));
        const rows = Math.floor((t.h - 40) / 40);
        return (
          <g key={ti}>
            <rect x={t.x} y={top} width={t.w} height={t.h} fill={ti % 2 ? "#141838" : "#191E44"} stroke="#0A0C1A" strokeWidth={6} />
            {Array.from({ length: cols * rows }).map((_, k) =>
              rnd(ti * 977 + k) > 0.66 ? (
                <rect key={k} x={t.x + 18 + (k % cols) * 34} y={top + 26 + Math.floor(k / cols) * 40} width={16} height={20} fill={rnd(ti * 31 + k) > 0.75 ? "#8FD3FF" : "#FFD27A"} opacity={0.85} />
              ) : null,
            )}
          </g>
        );
      })}
    </g>
  );
};

const Stars: React.FC = () => (
  <g>
    {Array.from({ length: 70 }).map((_, i) => (
      <circle key={i} cx={rnd(i) * W} cy={rnd(i + 300) * 460} r={1.8 + rnd(i + 70) * 2.4} fill="#FFFFFF" opacity={0.35 + rnd(i + 9) * 0.5} />
    ))}
  </g>
);

export const Banner: React.FC<{ guides?: boolean }> = ({ guides = false }) => {
  const sc = 1.42;
  const mx = 880; // mascot centre x
  const headY = 712;
  const deskY = 934; // desk top sits just under the desktop/mobile crop
  return (
    <AbsoluteFill style={{ background: BRAND.nightDeep }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090B18" />
            <stop offset="55%" stopColor={BRAND.night} />
            <stop offset="100%" stopColor="#2A2350" />
          </linearGradient>
          <radialGradient id="lamp" cx={700 / W} cy={0.52} r="0.32">
            <stop offset="0%" stopColor={BRAND.amber} stopOpacity={0.45} />
            <stop offset="60%" stopColor={BRAND.amber} stopOpacity={0.08} />
            <stop offset="100%" stopColor={BRAND.amber} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
            <stop offset="60%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.55} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sky)" />
        <Stars />
        <Skyline base={deskY} />
        {/* soft fade so the skyline doesn't fight the text */}
        <rect x={0} y={480} width={W} height={460} fill={BRAND.nightDeep} opacity={0.6} />
        <rect width={W} height={H} fill="url(#lamp)" />

        {/* amber market line running behind the name */}
        <path
          d="M 1080 900 L 1240 840 L 1340 870 L 1500 760 L 1600 800 L 1780 640 L 1880 690 L 2010 560"
          stroke={BRAND.amber} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.28}
        />
        <path d="M 2010 560 l -40 6 M 2010 560 l -10 38" stroke={BRAND.amber} strokeWidth={10} strokeLinecap="round" opacity={0.28} />

        {/* mascot: head and shoulders, same character as the avatar */}
        <Character
          x={mx} y={headY + 350 * sc} scale={sc}
          outfit="suit" color="#2E3A57" tie={BRAND.amber}
          hair="curly" hairColor="#3B2A1E" glasses skin={SKIN.tan}
          expression="smug" arm="down"
        />
        {/* desk in front of the mascot (mostly visible on TV) */}
        <rect x={0} y={deskY} width={W} height={H - deskY} fill="#3E2C1F" />
        <rect x={0} y={deskY} width={W} height={34} fill="#6A4A30" stroke={K} strokeWidth={8} />
        <rect x={0} y={deskY + 34} width={W} height={H - deskY} fill="#000" opacity={0.25} />
        <g transform={`translate(2120 ${deskY - 8}) rotate(-4)`}>
          <rect x={0} y={-6} width={260} height={14} fill={BRAND.cream} stroke={K} strokeWidth={5} />
          <rect x={30} y={-18} width={240} height={14} fill="#E8DCBF" stroke={K} strokeWidth={5} />
        </g>
        <g transform={`translate(2420 ${deskY})`}>
          <path d="M -40 -96 L 40 -96 L 32 0 L -32 0 Z" fill={BRAND.cream} stroke={K} strokeWidth={7} strokeLinejoin="round" />
          <rect x={-40} y={-64} width={80} height={24} fill={BRAND.amber} stroke={K} strokeWidth={5} />
          <path d="M 40 -78 q 34 6 2 50" stroke={K} strokeWidth={7} fill="none" />
        </g>
        {/* brass nameplate on the desk front (TV only) */}
        <g transform={`translate(${W / 2} ${deskY + 250})`}>
          <rect x={-330} y={-70} width={660} height={140} rx={14} fill="#B8862E" stroke={K} strokeWidth={8} />
          <rect x={-310} y={-52} width={620} height={104} rx={8} fill="none" stroke="#E8C26A" strokeWidth={4} />
          <text x={0} y={30} textAnchor="middle" fontFamily={BRUSH} fontSize={86} fill={K}>Ink &amp; Cash</text>
        </g>
        {[600, 1960].map((x) => <rect key={x} x={x - 6} y={deskY + 34} width={12} height={H - deskY} fill="#000" opacity={0.25} />)}
        {/* desk lamp: the warm light source in the frame */}
        <g>
          <ellipse cx={560} cy={deskY} rx={70} ry={14} fill="#23263A" stroke={K} strokeWidth={7} />
          <path d={`M 560 ${deskY} L 560 ${deskY - 150} L 620 ${deskY - 230}`} stroke={K} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M 560 ${deskY} L 560 ${deskY - 150} L 620 ${deskY - 230}`} stroke="#2E3A57" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M 570 ${deskY - 250} L 680 ${deskY - 290} L 712 ${deskY - 200} L 640 ${deskY - 170} Z`} fill={BRAND.amber} stroke={K} strokeWidth={8} strokeLinejoin="round" />
          <ellipse cx={676} cy={deskY - 186} rx={34} ry={11} fill="#FFF3C4" transform={`rotate(-22 676 ${deskY - 186})`} />
        </g>

        <g transform={`translate(${mx + 140} ${headY - 108}) rotate(28)`}>
          <rect x={-11} y={-80} width={22} height={134} rx={10} fill={BRAND.amber} stroke={K} strokeWidth={7} />
          <path d="M -11 54 L 0 86 L 11 54 Z" fill={BRAND.cream} stroke={K} strokeWidth={7} strokeLinejoin="round" />
          <rect x={-14} y={-54} width={28} height={12} fill={BRAND.nightDeep} stroke={K} strokeWidth={4} />
        </g>

        {/* name */}
        <g fontFamily={BRUSH} stroke={K} strokeWidth={20} paintOrder="stroke" strokeLinejoin="round">
          <text x={1110} y={760} fontSize={250} fill={BRAND.cream}>Ink</text>
          <text x={1450} y={700} fontSize={150} fill={BRAND.amber}>&amp;</text>
          <text x={1560} y={760} fontSize={250} fill={BRAND.amber}>Cash</text>
        </g>
        <path d="M 1120 800 Q 1500 770 1960 790" stroke={BRAND.cream} strokeWidth={12} fill="none" strokeLinecap="round" />
        <text x={1124} y={878} fontFamily={HAND} fontSize={66} fill={BRAND.cream} letterSpacing={2}>
          Big money stories, drawn simple.
        </text>

        {/* ink splatter near the name */}
        {[[1070, 600, 12], [2010, 700, 8], [1980, 600, 9]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={BRAND.amber} stroke={K} strokeWidth={4} />
        ))}

        <rect width={W} height={H} fill="url(#vig)" />

        {guides && (
          <g fill="none" strokeWidth={6} strokeDasharray="24 16">
            <rect x={0} y={SAFE.y} width={W} height={SAFE.h} stroke="#4FC3F7" />
            <rect x={SAFE.x} y={SAFE.y} width={SAFE.w} height={SAFE.h} stroke="#FF5252" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
