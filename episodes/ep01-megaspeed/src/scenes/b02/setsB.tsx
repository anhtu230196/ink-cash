// Sets and props for B02 part b (investors at the rope → only shovels → Beijing → hearing → Computex → the door bolts).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { MiniChip } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Investor skit ---------------- */

/** A fanned stack of cash, centred on (x, y). */
export const CashFan: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = -10 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    {[-18, -6, 6, 18].map((a, i) => (
      <g key={i} transform={`rotate(${a})`}>
        <rect x={-30} y={-80} width={60} height={96} rx={5} fill={i % 2 ? "#8CCB76" : "#7FBF6A"} stroke={INK} strokeWidth={4} />
        <circle cx={0} cy={-34} r={14} fill="none" stroke={INK} strokeWidth={3} opacity={0.6} />
      </g>
    ))}
    <text x={0} y={-22} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>$</text>
  </g>
);

/**
 * The waitlist: a paper roll held at (x, y) that drops to the floor and runs `len` px to the left.
 * `grow` 0..1 unrolls it.
 */
export const Waitlist: React.FC<{ x: number; y: number; floor: number; len: number; grow?: number }> = ({ x, y, floor, len, grow = 1 }) => {
  const drop = floor - y;
  const run = Math.max(0, (drop + len) * grow - drop);
  const down = Math.min(drop, (drop + len) * grow);
  const rows = Math.floor(down / 26);
  const rowsRun = Math.floor(run / 40);
  return (
    <g>
      <rect x={x - 38} y={y} width={76} height={down} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
      {Array.from({ length: rows }).map((_, i) => (
        <path key={i} d={`M ${x - 26} ${y + 30 + i * 26} L ${x + 8 + rnd(i) * 18} ${y + 30 + i * 26}`} stroke="#8A8274" strokeWidth={4} strokeLinecap="round" />
      ))}
      {run > 0 && (
        <g>
          <path d={`M ${x - 38} ${floor} L ${x - 38 - run} ${floor + 10} L ${x - 38 - run} ${floor + 70} L ${x + 38} ${floor + 60}`} fill="#F6F1E7" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          {Array.from({ length: rowsRun }).map((_, i) => (
            <path key={i} d={`M ${x - 60 - i * 40} ${floor + 26} L ${x - 60 - i * 40} ${floor + 50}`} stroke="#8A8274" strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
      )}
      <rect x={x - 46} y={y - 24} width={92} height={30} rx={12} fill="#D9D2C0" stroke={INK} strokeWidth={4} />
      <text x={x} y={y - 2} textAnchor="middle" fontFamily={HAND_FONT} fontSize={20} fill={INK}>WAITLIST</text>
    </g>
  );
};

/* ---------------- Gold rush: the shovel stand ---------------- */

export const Shovel: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M 0 -150 L 0 40" stroke="#8A5A3B" strokeWidth={14} strokeLinecap="round" />
    <path d="M 0 -150 L 0 40" stroke={INK} strokeWidth={4} fill="none" opacity={0} />
    <rect x={-24} y={-172} width={48} height={20} rx={8} fill="#8A5A3B" stroke={INK} strokeWidth={4} />
    {/* blade: chip-green, with tiny pins, so the shovel reads as "a GPU" */}
    <path d="M -46 40 L 46 40 L 40 110 Q 0 150 -40 110 Z" fill="#5DB35F" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {[-24, -8, 8, 24].map((px) => <rect key={px} x={px - 4} y={56} width={8} height={30} rx={2} fill="#3E8E3F" />)}
  </g>
);

export const GoldHills: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#F3DFA6" />
    <path d="M 0 560 Q 300 380 620 520 Q 900 330 1260 500 Q 1580 360 1920 520 L 1920 1080 L 0 1080 Z" fill="#D9B46A" stroke={INK} strokeWidth={5} />
    <path d="M 0 760 Q 500 690 960 730 Q 1400 690 1920 750 L 1920 1080 L 0 1080 Z" fill="#E7C987" />
    {/* gold glints in the hills */}
    {Array.from({ length: 14 }).map((_, i) => (
      <circle key={i} cx={rnd(i) * 1900} cy={520 + rnd(i + 3) * 180} r={6 + rnd(i + 9) * 5} fill="#F5D547" stroke={INK} strokeWidth={2} />
    ))}
  </g>
);

export const ShovelStand: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* posts + roof */}
    <rect x={-300} y={-420} width={24} height={420} fill="#8A5A3B" {...s} />
    <rect x={276} y={-420} width={24} height={420} fill="#8A5A3B" {...s} />
    <path d="M -340 -420 L 340 -420 L 300 -500 L -300 -500 Z" fill="#C0392B" {...s} />
    {[-240, -120, 0, 120, 240].map((sx) => <path key={sx} d={`M ${sx} -500 L ${sx + 10} -420`} stroke="#F6F1E7" strokeWidth={22} opacity={0.85} />)}
    <rect x={-210} y={-590} width={420} height={86} rx={10} fill="#F6F1E7" {...s} />
    <text x={0} y={-528} textAnchor="middle" fontFamily={HAND_FONT} fontSize={62} fill={INK} letterSpacing={3}>SHOVELS</text>
    {/* hanging shovels */}
    {[-200, -110, 110, 200].map((sx, i) => <Shovel key={sx} x={sx} y={-300} scale={0.55} rot={i % 2 ? 6 : -6} />)}
    {/* counter */}
    <rect x={-320} y={-190} width={640} height={190} fill="#C79A63" {...s} />
    <path d="M -320 -150 L 320 -150" stroke={INK} strokeWidth={4} />
  </g>
);

/** Small prospector (fictional, generic): round head, hat, pan. Drawn simple so a crowd stays cheap. */
export const Prospector: React.FC<{ x: number; y: number; scale?: number; i: number; cash?: boolean }> = ({ x, y, scale = 1, i, cash }) => {
  const frame = useCurrentFrame();
  const hop = Math.abs(Math.sin(frame / 5 + i)) * 8;
  const shirt = ["#4A6FA5", "#B5483A", "#3E6B4F", "#8E6BB5", "#C9A15B"][i % 5];
  const skin = ["#F1D3B0", "#C68E62", "#E2B48C", "#8D5A3B"][i % 4];
  return (
    <g transform={`translate(${x} ${y - hop}) scale(${scale})`}>
      <path d="M -14 -40 L -18 0 M 14 -40 L 18 0" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <rect x={-40} y={-150} width={80} height={115} rx={36} fill={shirt} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-200} r={52} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={-16} cy={-200} r={5} fill={INK} />
      <circle cx={16} cy={-200} r={5} fill={INK} />
      <path d="M -70 -238 L 70 -238 L 40 -260 L 34 -296 L -34 -296 L -40 -260 Z" fill="#8A5A3B" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {cash ? (
        <g transform="translate(64 -150)"><rect x={-22} y={-16} width={44} height={30} rx={3} fill="#7FBF6A" stroke={INK} strokeWidth={3} /></g>
      ) : (
        <ellipse cx={64} cy={-120} rx={34} ry={10} fill="#9AA0A6" stroke={INK} strokeWidth={4} />
      )}
    </g>
  );
};

/** A tiny planet with one shovel stand on top and a queue circling it. `spin` rotates the queue. */
export const ShovelPlanet: React.FC<{ spin: number }> = ({ spin }) => {
  const cx = 960;
  const cy = 1180;
  const R = 640;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="#6FA8DC" stroke={INK} strokeWidth={8} />
      <path d={`M ${cx - 520} ${cy - 300} q 120 -80 230 -20 q 80 60 30 140 q -150 40 -260 -120 Z`} fill="#7FBF6A" stroke={INK} strokeWidth={6} />
      <path d={`M ${cx + 200} ${cy - 560} q 160 -20 250 90 q -40 120 -170 70 q -90 -50 -80 -160 Z`} fill="#7FBF6A" stroke={INK} strokeWidth={6} />
      <path d={`M ${cx + 380} ${cy - 220} q 120 30 120 140 q -100 60 -170 -40 Z`} fill="#7FBF6A" stroke={INK} strokeWidth={6} />
      {/* queue: tiny people standing on the planet, all facing the stand */}
      {Array.from({ length: 26 }).map((_, i) => {
        const a = -90 + 14 + i * 8.5 + spin;
        if (a > 85) return null;
        const r = (a * Math.PI) / 180;
        const px = cx + Math.cos(r) * R;
        const py = cy + Math.sin(r) * R;
        return (
          <g key={i} transform={`translate(${px} ${py}) rotate(${a + 90})`}>
            <Prospector x={0} y={0} scale={0.42} i={i} cash />
          </g>
        );
      })}
      {Array.from({ length: 26 }).map((_, i) => {
        const a = -90 - 14 - i * 8.5 - spin;
        if (a < -265) return null;
        const r = (a * Math.PI) / 180;
        const px = cx + Math.cos(r) * R;
        const py = cy + Math.sin(r) * R;
        return (
          <g key={`l${i}`} transform={`translate(${px} ${py}) rotate(${a + 90})`}>
            <Prospector x={0} y={0} scale={0.42} i={i + 7} cash />
          </g>
        );
      })}
      <ShovelStand x={cx} y={cy - R + 6} scale={0.42} />
    </g>
  );
};

/* ---------------- Code that only fits one socket ---------------- */

/** A wall panel with two sockets: chip-shaped (fits) and round (doesn't). */
export const SocketPanel: React.FC<{ x: number; y: number; litTop: number; xBottom: number }> = ({ x, y, litTop, xBottom }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-330} width={400} height={660} rx={24} fill="#DCD5C5" {...s} />
    {/* top: chip-shaped socket */}
    <rect x={-120} y={-260} width={240} height={190} rx={18} fill={litTop > 0 ? `rgba(125,214,110,${0.35 + 0.5 * litTop})` : "#3A3F44"} stroke={INK} strokeWidth={6} />
    {[-80, -40, 0, 40, 80].map((px) => <rect key={px} x={px - 8} y={-232} width={16} height={130} rx={4} fill="#1F2328" />)}
    <text x={0} y={-24} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>NVIDIA</text>
    {/* bottom: some other chip, round socket */}
    <circle cx={0} cy={130} r={90} fill="#3A3F44" stroke={INK} strokeWidth={6} />
    <circle cx={-30} cy={130} r={14} fill="#1F2328" />
    <circle cx={30} cy={130} r={14} fill="#1F2328" />
    <text x={0} y={280} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>OTHER CHIP</text>
    {xBottom > 0 && (
      <g opacity={xBottom} stroke="#C0392B" strokeWidth={22} strokeLinecap="round">
        <path d="M -80 50 L 80 210 M 80 50 L -80 210" />
      </g>
    )}
  </g>
);

/** The plug at the end of the code cable: square, five prongs. Drawn pointing right, prongs at +x. */
export const CodePlug: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-80} width={150} height={160} rx={16} fill="#5DB35F" stroke={INK} strokeWidth={6} />
    <text x={-75} y={14} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>{"{ }"}</text>
    {[-56, -28, 0, 28, 56].map((py) => <rect key={py} x={0} y={py - 7} width={44} height={14} rx={3} fill="#E1B83F" stroke={INK} strokeWidth={3} />)}
  </g>
);

/* ---------------- Beijing at night: the shovel signal ---------------- */

export const NightSkyline: React.FC<{ signal: number }> = ({ signal }) => (
  <g>
    <NightSky h={1080} />
    {/* clouds catching the signal */}
    <ellipse cx={1220} cy={260} rx={420} ry={110} fill="#3B3F63" />
    <ellipse cx={960} cy={300} rx={300} ry={90} fill="#363A5C" />
    {/* searchlight beam + shovel silhouette on the cloud */}
    <path d={`M 860 900 L ${1080} 240 L ${1360} 240 Z`} fill="#FFF0C2" opacity={0.18 * signal} />
    <g opacity={signal} transform="translate(1220 250) rotate(-35) scale(0.9)">
      <ellipse cx={0} cy={0} rx={220} ry={110} fill="#FFF3CC" opacity={0.75} />
      <g transform="translate(0 -10) scale(0.9)">
        <path d="M 0 -150 L 0 40" stroke="#1E1E2A" strokeWidth={18} strokeLinecap="round" />
        <rect x={-26} y={-172} width={52} height={22} rx={8} fill="#1E1E2A" />
        <path d="M -48 40 L 48 40 L 42 110 Q 0 150 -42 110 Z" fill="#1E1E2A" />
      </g>
    </g>
    {/* generic skyline, no landmarks */}
    {Array.from({ length: 16 }).map((_, i) => {
      const w = 90 + rnd(i) * 90;
      const h = 200 + rnd(i + 4) * 360;
      const bx = i * 125 - 30;
      return (
        <g key={i}>
          <rect x={bx} y={1080 - h} width={w} height={h} fill={i % 2 ? "#1A1C2E" : "#20233A"} stroke={INK} strokeWidth={4} />
          {Array.from({ length: Math.floor(h / 60) * 2 }).map((_, k) => (
            rnd(i * 31 + k) > 0.55 ? <rect key={k} x={bx + 16 + (k % 2) * (w / 2 - 6)} y={1080 - h + 24 + Math.floor(k / 2) * 60} width={w / 2 - 34} height={22} fill="#F7C873" opacity={0.75} /> : null
          ))}
        </g>
      );
    })}
    {/* the searchlight */}
    <path d="M 820 1080 L 840 930 L 900 930 L 920 1080 Z" fill="#3A3F44" stroke={INK} strokeWidth={5} />
    <circle cx={870} cy={915} r={34} fill="#FFF3CC" stroke={INK} strokeWidth={5} />
  </g>
);

/* ---------------- Gaming chip ---------------- */

export const Controller: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M -120 -40 Q -60 -60 0 -50 Q 60 -60 120 -40 Q 160 40 120 70 Q 90 80 60 40 L -60 40 Q -90 80 -120 70 Q -160 40 -120 -40 Z" fill="#3A3F44" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -86 -14 L -86 26 M -106 6 L -66 6" stroke="#ECE6D8" strokeWidth={10} strokeLinecap="round" />
    <circle cx={74} cy={-8} r={11} fill="#E0453A" />
    <circle cx={100} cy={14} r={11} fill="#F5D547" />
  </g>
);

/* ---------------- Race to the smartest AI ---------------- */

export const Brain: React.FC<{ x: number; y: number; scale?: number; glow?: number }> = ({ x, y, scale = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {glow > 0 && <circle r={150} fill="#F5D547" opacity={0.25 * glow} />}
    <path d="M -10 -95 Q -70 -110 -95 -60 Q -135 -40 -115 10 Q -130 60 -80 80 Q -50 110 -10 90 Z" fill="#F4A6B5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 10 -95 Q 70 -110 95 -60 Q 135 -40 115 10 Q 130 60 80 80 Q 50 110 10 90 Z" fill="#F4A6B5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -80 -40 Q -50 -20 -70 10 M -60 40 Q -30 30 -30 60 M 80 -40 Q 50 -20 70 10 M 60 40 Q 30 30 30 60" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

export const RaceTrack: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#EDE6D6" />
    <rect x={0} y={560} width={1920} height={360} fill="#B8B0A0" stroke={INK} strokeWidth={6} />
    <path d="M 0 740 L 1920 740" stroke="#F6F1E7" strokeWidth={10} strokeDasharray="60 50" />
    {/* finish line */}
    {Array.from({ length: 18 }).map((_, i) => (
      <rect key={i} x={1560 + (i % 2) * 30} y={560 + Math.floor(i / 2) * 40} width={30} height={40} fill={(i + Math.floor(i / 2)) % 2 ? INK : "#F6F1E7"} />
    ))}
  </g>
);

/* ---------------- Radar ---------------- */

export const Radar: React.FC<{ x: number; y: number; r: number; sweep: number }> = ({ x, y, r, sweep }) => {
  const a = (sweep * Math.PI) / 180;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 30} fill="#2A2F3A" stroke={INK} strokeWidth={8} />
      <circle cx={x} cy={y} r={r} fill="#0E2A1C" stroke="#3F8F5A" strokeWidth={4} />
      {[0.33, 0.66].map((k) => <circle key={k} cx={x} cy={y} r={r * k} fill="none" stroke="#3F8F5A" strokeWidth={3} />)}
      <path d={`M ${x - r} ${y} L ${x + r} ${y} M ${x} ${y - r} L ${x} ${y + r}`} stroke="#3F8F5A" strokeWidth={3} />
      <path d={`M ${x} ${y} L ${x + Math.cos(a) * r} ${y + Math.sin(a) * r} A ${r} ${r} 0 0 0 ${x + Math.cos(a - 0.6) * r} ${y + Math.sin(a - 0.6) * r} Z`} fill="#7DFF9E" opacity={0.35} />
      {[[0.5, -0.4], [-0.35, 0.3], [0.2, 0.55]].map(([bx, by], i) => (
        <circle key={i} cx={x + bx * r} cy={y + by * r} r={12} fill="#9BFFB0" opacity={0.5 + 0.5 * Math.abs(Math.sin(sweep / 30 + i))} />
      ))}
      {/* crosshair locked on the centre blip */}
      <g stroke="#FF6B5A" strokeWidth={6} fill="none">
        <circle cx={x + 0.5 * r} cy={y - 0.4 * r} r={44} />
        <path d={`M ${x + 0.5 * r - 64} ${y - 0.4 * r} l 30 0 M ${x + 0.5 * r + 34} ${y - 0.4 * r} l 30 0 M ${x + 0.5 * r} ${y - 0.4 * r - 64} l 0 30 M ${x + 0.5 * r} ${y - 0.4 * r + 34} l 0 30`} />
      </g>
    </g>
  );
};

/* ---------------- Hearing room: two podiums under a giant chip ---------------- */

export const Podium: React.FC<{ x: number; y: number; label: string; color: string }> = ({ x, y, label, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -170 0 L 170 0 L 140 300 L -140 300 Z" fill={color} {...s} />
    <rect x={-190} y={-26} width={380} height={34} rx={6} fill="#5A3E2B" {...s} />
    <rect x={-110} y={60} width={220} height={64} rx={8} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
    <text x={0} y={104} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill={INK}>{label}</text>
    <path d="M -10 -26 L -30 -110" stroke="#3A3F44" strokeWidth={6} />
    <ellipse cx={-34} cy={-118} rx={12} ry={16} fill="#3A3F44" stroke={INK} strokeWidth={3} />
  </g>
);

export type ChipScreen = "plain" | "missile" | "cat";

/** The giant glowing chip hanging over the hearing; its centre is a screen. */
export const GiantChip: React.FC<{ x: number; y: number; screen: ChipScreen; scale?: number }> = ({ x, y, screen, scale = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M -180 -240 L -180 -170 M 180 -240 L 180 -170" stroke="#3A3F44" strokeWidth={8} />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <rect x={-250 + i * 52} y={-190} width={18} height={30} fill="#E1B83F" stroke={INK} strokeWidth={3} />
          <rect x={-250 + i * 52} y={150} width={18} height={30} fill="#E1B83F" stroke={INK} strokeWidth={3} />
        </g>
      ))}
      <rect x={-290} y={-165} width={580} height={320} rx={26} fill="#5DB35F" stroke={INK} strokeWidth={8} />
      <rect x={-230} y={-120} width={460} height={230} rx={14} fill="#123A22" stroke={INK} strokeWidth={6} />
      {screen === "plain" && Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M -200 ${-90 + i * 36} L ${-200 + ((frame * 6 + i * 70) % 380)} ${-90 + i * 36}`} stroke="#7DFF9E" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
      ))}
      {screen === "missile" && (
        <g stroke="#7DFF9E" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M -150 70 Q -40 -110 ${110 + Math.sin(frame / 5) * 6} -40`} strokeDasharray="14 16" />
          <path d="M 110 -40 l -40 -10 m 40 10 l -18 34" />
          <text x={-150} y={-70} fill="#7DFF9E" stroke="none" fontFamily={HAND_FONT} fontSize={36}>x = v·t…</text>
        </g>
      )}
      {screen === "cat" && (
        <g>
          <path d="M -70 -60 L -50 -100 L -20 -66 Z M 70 -60 L 50 -100 L 20 -66 Z" fill="#F2A65A" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <circle cx={0} cy={-6} r={78} fill="#F2A65A" stroke={INK} strokeWidth={5} />
          <circle cx={-28} cy={-20} r={8} fill={INK} />
          <circle cx={28} cy={-20} r={8} fill={INK} />
          <path d="M -8 4 L 8 4 L 0 14 Z" fill="#E0627A" />
          <path d="M 0 14 Q -14 30 -26 22 M 0 14 Q 14 30 26 22" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M -40 8 L -110 -4 M -40 18 L -108 22 M 40 8 L 110 -4 M 40 18 L 108 22" stroke={INK} strokeWidth={3} />
          <path d="M 160 70 L 160 100 L 186 85 Z" fill="#F6F1E7" />
        </g>
      )}
    </g>
  );
};

export const HearingRoom: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#4A3426" />
    {/* wood panels */}
    {Array.from({ length: 9 }).map((_, i) => (
      <rect key={i} x={i * 220 - 20} y={120} width={200} height={600} fill="#5C4030" stroke="#3A281C" strokeWidth={6} />
    ))}
    <rect x={0} y={0} width={1920} height={120} fill="#3A281C" />
    <rect x={0} y={720} width={1920} height={360} fill="#6B5A4C" />
    <path d="M 0 720 L 1920 720" {...s} />
    {/* drapes */}
    <path d="M 0 0 L 160 0 Q 140 360 190 720 L 0 720 Z" fill="#2D4A8A" stroke={INK} strokeWidth={5} />
    <path d="M 1920 0 L 1760 0 Q 1780 360 1730 720 L 1920 720 Z" fill="#2D4A8A" stroke={INK} strokeWidth={5} />
  </g>
);

/* ---------------- Keynote stage (Computex) ---------------- */

export type SlideKind = "blank" | "chip" | "made-in" | "paper";

export const KeynoteStage: React.FC<{ slide: SlideKind; slideStep?: number }> = ({ slide, slideStep = 3 }) => (
  <g>
    <rect width={1920} height={1080} fill="#14161F" />
    {/* screen */}
    <rect x={360} y={90} width={1200} height={540} rx={12} fill="#1E2A44" stroke={INK} strokeWidth={8} />
    <rect x={380} y={110} width={1160} height={500} fill="#2C3E66" />
    {slide === "chip" && <g transform="translate(960 360) scale(4)"><MiniChip size={60} /></g>}
    {slide === "made-in" && ["MADE IN CHINA", "BY CHINA", "FOR CHINA"].slice(0, slideStep).map((t, i) => (
      <text key={t} x={960} y={250 + i * 130} textAnchor="middle" fontFamily={HAND_FONT} fontSize={96} fill={i === 2 ? "#F2B544" : "#F3F1E8"}>{t}</text>
    ))}
    {slide === "paper" && Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} x={760 + (i % 2) * 18} y={480 - i * 46} width={400} height={44} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
    ))}
    {/* stage */}
    <rect x={160} y={760} width={1600} height={110} fill="#2A2D3A" stroke={INK} strokeWidth={6} />
    <rect x={160} y={740} width={1600} height={26} fill="#3A3F52" stroke={INK} strokeWidth={6} />
    {/* stage lights strip */}
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={240 + i * 110} cy={815} r={9} fill="#F2B544" opacity={0.8} />)}
    <rect x={0} y={870} width={1920} height={210} fill="#0E0F16" />
  </g>
);

/** Rows of audience heads (silhouettes) along the bottom of the frame. */
export const Audience: React.FC<{ y?: number; skip?: [number, number] }> = ({ y = 1010, skip }) => (
  <g>
    {Array.from({ length: 22 }).map((_, i) => {
      const x = i * 92 + (rnd(i) - 0.5) * 30;
      if (skip && x > skip[0] && x < skip[1]) return null;
      return (
        <g key={i}>
          <circle cx={x} cy={y - rnd(i + 2) * 20} r={52} fill="#07080C" />
          <rect x={x - 70} y={y + 30} width={140} height={120} rx={50} fill="#07080C" />
        </g>
      );
    })}
  </g>
);

/* ---------------- Market-share pie ---------------- */

export const Pie: React.FC<{ x: number; y: number; r: number; pct: number; color?: string }> = ({ x, y, r, pct, color = "#5DB35F" }) => {
  const a = Math.max(0.0001, Math.min(0.9999, pct / 100)) * Math.PI * 2;
  const ex = x + Math.sin(a) * r;
  const ey = y - Math.cos(a) * r;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#C9C2B2" stroke={INK} strokeWidth={8} />
      <path d={`M ${x} ${y} L ${x} ${y - r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={color} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    </g>
  );
};

/* ---------------- Backfire: cannon vs. paper wall ---------------- */

export const Cannon: React.FC<{ x: number; y: number; tip?: number; soot?: number }> = ({ x, y, tip = 0, soot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${-tip * 70} -60 0)`}>
    <g transform="rotate(-8)">
      <rect x={-140} y={-150} width={300} height={110} rx={50} fill="#2D4A8A" {...s} />
      {[-90, -30, 30, 90].map((sx) => <rect key={sx} x={sx - 10} y={-150} width={20} height={110} fill={sx % 60 ? "#F6F1E7" : "#C0392B"} />)}
      <rect x={-140} y={-150} width={300} height={110} rx={50} fill="none" {...s} />
      <ellipse cx={160} cy={-95} rx={22} ry={55} fill="#1F2328" stroke={INK} strokeWidth={6} />
    </g>
    <circle cx={-40} cy={-30} r={60} fill="#8A5A3B" {...s} />
    <circle cx={-40} cy={-30} r={14} fill={INK} />
    {soot > 0 && (
      <g opacity={soot}>
        <ellipse cx={150} cy={-110} rx={60} ry={40} fill="#3A3A3A" opacity={0.8} />
        <ellipse cx={110} cy={-150} rx={40} ry={26} fill="#555" opacity={0.6} />
      </g>
    )}
  </g>
);

/* ---------------- The door in the paper wall ---------------- */

/** A door set into the paper wall. `bolts` 0..1 slides three bolts shut; `lock` pops a padlock on. */
export const WallDoor: React.FC<{ x: number; y: number; w: number; h: number; bolts: number; lock?: number }> = ({ x, y, w, h, bolts, lock = 0 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} fill="#8A5A3B" {...s} />
    {[0.2, 0.5, 0.8].map((k) => <path key={k} d={`M ${x + 20} ${y + h * k} L ${x + w - 20} ${y + h * k}`} stroke="#6B4A31" strokeWidth={6} />)}
    {[0.22, 0.5, 0.78].map((k, i) => {
      const by = y + h * k;
      const slide = interpolate(bolts, [i * 0.25, i * 0.25 + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return (
        <g key={k}>
          <rect x={x + w - 30} y={by - 26} width={110} height={52} rx={8} fill="#9AA0A6" stroke={INK} strokeWidth={5} />
          <rect x={x + w - 110 + slide * 120} y={by - 14} width={150} height={28} rx={8} fill="#C9CED3" stroke={INK} strokeWidth={5} />
        </g>
      );
    })}
    {lock > 0 && (
      <g transform={`translate(${x + w + 60} ${y + h * 0.5 + 40}) scale(${lock})`}>
        <path d="M -30 -10 L -30 -50 Q 0 -90 30 -50 L 30 -10" fill="none" stroke={INK} strokeWidth={12} />
        <rect x={-50} y={-14} width={100} height={84} rx={12} fill="#E1B83F" stroke={INK} strokeWidth={6} />
        <circle cx={0} cy={22} r={10} fill={INK} />
      </g>
    )}
  </g>
);

/* ---------------- Keys ---------------- */

export const KeyRing: React.FC<{ x: number; y: number; scale?: number; swing?: number }> = ({ x, y, scale = 1, swing = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${swing}) scale(${scale})`}>
    <circle cx={0} cy={0} r={40} fill="none" stroke="#C9A15B" strokeWidth={12} />
    <circle cx={0} cy={0} r={40} fill="none" stroke={INK} strokeWidth={3} />
    {[-30, 0, 30].map((a, i) => (
      <g key={i} transform={`rotate(${a}) translate(0 40)`}>
        <circle cx={0} cy={36} r={26} fill="#E1B83F" stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={36} r={9} fill="#14161F" />
        <rect x={-9} y={60} width={18} height={110 - i * 14} fill="#E1B83F" stroke={INK} strokeWidth={5} />
        <rect x={9} y={130 - i * 14} width={24} height={14} fill="#E1B83F" stroke={INK} strokeWidth={4} />
        <rect x={9} y={104 - i * 14} width={16} height={12} fill="#E1B83F" stroke={INK} strokeWidth={4} />
      </g>
    ))}
  </g>
);
