// Sets and props for B05b · THE APPROACH, part 2 (the FT pitch → Taipei photos → the party → the analysts → Singapore investigates).
import React from "react";
import { useCurrentFrame } from "remotion";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { rnd, s } from "../open/sets";

/* ---------------- Trade-show party hall: string lights, cocktail tables, crowd silhouettes ---------------- */
export const PartyHall: React.FC<{ crowd?: boolean }> = ({ crowd = true }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#2E2A48" />
      <rect x={0} y={840} width={1920} height={240} fill="#3A3048" />
      {/* banner, generic */}
      <rect x={560} y={70} width={800} height={110} rx={10} fill="#1E1A30" stroke={INK} strokeWidth={5} />
      <text x={960} y={140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#F5D88A" letterSpacing={6}>TECH EXPO · RECEPTION</text>
      {/* string lights */}
      {[0, 1].map((r) => (
        <g key={r}>
          <path d={`M 0 ${230 + r * 70} Q 480 ${300 + r * 70} 960 ${230 + r * 70} Q 1440 ${300 + r * 70} 1920 ${230 + r * 70}`} stroke="#1A1A22" strokeWidth={3} fill="none" />
          {Array.from({ length: 20 }).map((_, i) => {
            const x = 48 + i * 96;
            const t = (x % 960) / 960;
            const y = 230 + r * 70 + 140 * t * (1 - t);
            const on = (i + r + Math.floor(frame / 12)) % 5 !== 0;
            return <circle key={i} cx={x} cy={y + 8} r={9} fill={on ? "#FFE3A8" : "#8A7A5A"} />;
          })}
        </g>
      ))}
      {/* crowd silhouettes */}
      {crowd && Array.from({ length: 12 }).map((_, i) => {
        const x = 60 + i * 165 + rnd(i) * 40;
        const h = 300 + rnd(i + 3) * 80;
        return (
          <g key={i} opacity={0.85}>
            <circle cx={x} cy={840 - h} r={38} fill="#1E1A30" />
            <path d={`M ${x - 60} 860 Q ${x - 60} ${840 - h + 50} ${x} ${840 - h + 46} Q ${x + 60} ${840 - h + 50} ${x + 60} 860 Z`} fill="#1E1A30" />
            {rnd(i + 9) > 0.5 && <path d={`M ${x + 50} ${840 - h + 130} l 18 -40 l -36 0 Z M ${x + 50} ${840 - h + 130} l 0 30`} stroke="#C9D4F0" strokeWidth={3} fill="none" />}
          </g>
        );
      })}
    </g>
  );
};

export const CocktailTable: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x} ${y - 250} L ${x} ${y}`} stroke={INK} strokeWidth={14} />
    <path d={`M ${x - 70} ${y} L ${x + 70} ${y}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
    <ellipse cx={x} cy={y - 250} rx={120} ry={22} fill="#F6F1E7" stroke={INK} strokeWidth={5} />
    <path d={`M ${x - 30} ${y - 300} l 16 46 l 16 -46 Z`} fill="#F5D88A" fillOpacity={0.6} stroke={INK} strokeWidth={3} />
    <path d={`M ${x - 14} ${y - 254} l 0 -8`} stroke={INK} strokeWidth={3} />
  </g>
);

export const ShrimpBuffet: React.FC<{ x: number; y: number; scale?: number; glow?: boolean }> = ({ x, y, scale = 1, glow }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {glow && <ellipse cx={0} cy={-120} rx={260} ry={130} fill="#F5D547" opacity={0.35} />}
    <rect x={-220} y={-90} width={440} height={90} fill="#F6F1E7" stroke={INK} strokeWidth={6} />
    <path d="M -220 -90 L 220 -90 L 200 -60 L -200 -60 Z" fill="#E9E2D2" stroke={INK} strokeWidth={4} />
    <ellipse cx={0} cy={-104} rx={170} ry={34} fill="#C9CDD2" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 9 }).map((_, i) => (
      <path key={i} d={`M ${-130 + i * 32} -108 q 10 -26 26 -10 q -6 10 -18 14`} fill="#F49A7A" stroke={INK} strokeWidth={3} />
    ))}
    <rect x={-80} y={-60} width={160} height={40} rx={6} fill="#FBF7EE" stroke={INK} strokeWidth={3} />
    <text x={0} y={-32} textAnchor="middle" fontFamily={HAND_FONT} fontSize={26} fill={INK}>SHRIMP</text>
  </g>
);

export const BusinessCard: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = -6 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-60} y={-36} width={120} height={72} rx={6} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
    <text x={0} y={-4} textAnchor="middle" fontFamily={HAND_FONT} fontSize={20} fill="#2D4A8A">MEGASPEED</text>
    <path d="M -40 16 L 40 16" stroke="#B9B2A4" strokeWidth={4} />
  </g>
);

export const Chair: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -70 0 L -70 -170 M 70 0 L 70 -170 M -70 -170 L 70 -170 M -70 -330 L -70 -170 M 70 -330 L 70 -170" stroke={INK} strokeWidth={12} strokeLinecap="round" />
    <rect x={-84} y={-190} width={168} height={34} rx={8} fill="#C0392B" stroke={INK} strokeWidth={5} />
    <rect x={-80} y={-350} width={160} height={110} rx={14} fill="#C0392B" stroke={INK} strokeWidth={5} />
  </g>
);

/* ---------------- Polaroid ---------------- */
export const Polaroid: React.FC<{ x: number; y: number; rot?: number; scale?: number; caption: string; children?: React.ReactNode }> = ({ x, y, rot = 0, scale = 1, caption, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-200} y={-220} width={400} height={460} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
    <rect x={-176} y={-196} width={352} height={330} fill="#2E2A48" stroke={INK} strokeWidth={3} />
    <svg x={-176} y={-196} width={352} height={330} viewBox="0 0 352 330" overflow="hidden">{children}</svg>
    <text x={0} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>{caption}</text>
  </g>
);

/* ---------------- Analysts' room: a big monitor in the dark ---------------- */
export const MONITOR = { x: 560, y: 120, w: 800, h: 480 };
export const AnalystRoom: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g>
    <rect width={1920} height={1080} fill="#20243A" />
    <rect x={0} y={820} width={1920} height={260} fill="#2A2E44" />
    {/* shelves of binders */}
    {[0, 1].map((r) => (
      <g key={r}>
        <rect x={60} y={200 + r * 220} width={360} height={14} fill="#4A4E62" />
        {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={80 + i * 48} y={90 + r * 220} width={40} height={110} fill={["#2D4A8A", "#7A2E3A", "#3E6B4F"][i % 3]} stroke={INK} strokeWidth={3} />)}
      </g>
    ))}
    {/* monitor */}
    <rect x={MONITOR.x - 20} y={MONITOR.y - 20} width={MONITOR.w + 40} height={MONITOR.h + 40} rx={14} fill="#11141A" stroke={INK} strokeWidth={6} />
    <svg x={MONITOR.x} y={MONITOR.y} width={MONITOR.w} height={MONITOR.h} viewBox={`0 0 ${MONITOR.w} ${MONITOR.h}`} overflow="hidden">
      <rect width={MONITOR.w} height={MONITOR.h} fill="#2E2A48" />
      {children}
    </svg>
    <rect x={MONITOR.x + MONITOR.w / 2 - 30} y={MONITOR.y + MONITOR.h + 20} width={60} height={120} fill="#3A3F44" stroke={INK} strokeWidth={4} />
    {/* desk */}
    <rect x={300} y={740} width={1320} height={40} fill="#4A3A2E" stroke={INK} strokeWidth={6} />
  </g>
);

/* ---------------- Police office (generic) ---------------- */
export const PoliceOffice: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#4A5068" />
    <rect x={0} y={860} width={1920} height={220} fill="#3A3E4E" />
    {/* blinds */}
    <rect x={1180} y={110} width={600} height={460} fill="#1C2142" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={1184} y={120 + i * 38} width={592} height={14} fill="#8A90A6" opacity={0.7} />)}
    {/* cork board */}
    <rect x={140} y={150} width={520} height={360} fill="#B88A55" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 6 }).map((_, i) => (
      <rect key={i} x={180 + (i % 3) * 160} y={190 + Math.floor(i / 3) * 160} width={120} height={120} fill="#FBF7EE" stroke={INK} strokeWidth={3} transform={`rotate(${(rnd(i) - 0.5) * 10} ${240 + (i % 3) * 160} ${250 + Math.floor(i / 3) * 160})`} />
    ))}
    {/* desk + lamp */}
    <rect x={560} y={760} width={900} height={40} fill="#6B4A36" stroke={INK} strokeWidth={6} />
    <rect x={600} y={800} width={820} height={260} fill="#5A3E2B" stroke={INK} strokeWidth={6} />
    <path d="M 1300 760 L 1300 620 L 1380 560" stroke={INK} strokeWidth={10} fill="none" />
    <path d="M 1340 540 L 1440 520 L 1430 600 Z" fill="#3E6B4F" stroke={INK} strokeWidth={5} />
  </g>
);

/* ---------------- Paper: declaration form; passport (generic) ---------------- */
export const DeclarationForm: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = -3 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-360} y={-260} width={720} height={520} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
    <text x={0} y={-190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill={INK}>CUSTOMS DECLARATION</text>
    {[["Goods", "servers"], ["Quantity", "____"], ["Value", "____"], ["Destination", "____"]].map(([k, v], i) => (
      <g key={k}>
        <text x={-300} y={-100 + i * 80} fontFamily={HAND_FONT} fontSize={38} fill="#6B6458">{k}:</text>
        <text x={20} y={-100 + i * 80} fontFamily={HAND_FONT} fontSize={42} fill="#2D4A8A">{v}</text>
      </g>
    ))}
  </g>
);

export const Passport: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-110} y={-150} width={220} height={300} rx={14} fill="#3E4A6B" stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-20} r={46} fill="none" stroke="#C9A35A" strokeWidth={5} />
    <text x={0} y={90} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#C9A35A" letterSpacing={4}>PASSPORT</text>
  </g>
);

export const Tray: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x - 200} ${y - 40} L ${x + 200} ${y - 40} L ${x + 180} ${y} L ${x - 180} ${y} Z`} fill="#7A8088" stroke={INK} strokeWidth={5} />
    <rect x={x - 90} y={y - 90} width={180} height={44} rx={6} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
    <text x={x} y={y - 58} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>HELD</text>
  </g>
);

export { s };
