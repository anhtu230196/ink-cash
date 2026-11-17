// Sets and props for B06 · THE PIPELINE (airfield in Johor → three counts → per chip / per hour → the studio apartment → chips in a box).
import React from "react";
import { useCurrentFrame } from "remotion";
import { MiniChip } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Night airfield: cargo plane + a tiny concrete building ---------------- */
export const Airfield: React.FC = () => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={800} width={1920} height={280} fill="#2A2E38" />
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 200 + 40} y={900} width={110} height={12} fill="#E1B83F" opacity={0.7} />)}
    {/* cargo plane, nose open */}
    <path d="M 80 640 Q 80 520 260 500 L 1100 500 Q 1160 500 1180 560 L 1180 700 Q 1160 760 1100 760 L 260 760 Q 120 760 80 640 Z" fill="#C9CDD2" {...s} />
    <path d="M 500 500 L 820 280 L 920 280 L 760 500 Z" fill="#AEB3B9" {...s} />
    <path d="M 1040 500 L 1140 360 L 1190 360 L 1170 500 Z" fill="#AEB3B9" {...s} />
    {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={300 + i * 90} cy={580} r={16} fill="#5E6268" stroke={INK} strokeWidth={3} />)}
    <path d="M 1180 560 L 1300 520 L 1300 760 L 1180 700 Z" fill="#9AA0A6" {...s} />
    <rect x={240} y={760} width={40} height={60} fill="#3A3F44" />
    <circle cx={260} cy={830} r={22} fill="#1E1E24" stroke={INK} strokeWidth={4} />
    <circle cx={900} cy={830} r={22} fill="#1E1E24" stroke={INK} strokeWidth={4} />
    {/* tiny concrete building */}
    <rect x={1500} y={600} width={300} height={220} fill="#9A9690" {...s} />
    <rect x={1520} y={580} width={260} height={24} fill="#7A7670" stroke={INK} strokeWidth={4} />
    <rect x={1610} y={700} width={80} height={120} fill="#3A3A40" stroke={INK} strokeWidth={4} />
    <rect x={1530} y={640} width={60} height={40} fill="#FFE3A8" stroke={INK} strokeWidth={3} />
  </g>
);

/* ---------------- Glowing server crate ---------------- */
export const GlowCrate: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx={0} cy={-80} rx={150} ry={110} fill="#7DFFB0" opacity={0.25} />
    <rect x={-110} y={-160} width={220} height={160} fill="#C79A63" stroke={INK} strokeWidth={5} />
    {[-70, -20, 30].map((yy) => <rect key={yy} x={-110} y={yy - 100} width={220} height={8} fill="#7DFFB0" opacity={0.9} />)}
    <rect x={-70} y={-110} width={140} height={44} fill="#F6F1E7" stroke={INK} strokeWidth={3} />
    <text x={0} y={-78} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>SERVERS</text>
  </g>
);

/* ---------------- A clear pipe full of chips ---------------- */
export const PIPE = "M -100 620 C 300 620 360 380 760 380 C 1160 380 1200 700 1560 700 L 2040 700";
export const Pipeline: React.FC = () => (
  <g>
    <path d={PIPE} stroke={INK} strokeWidth={170} fill="none" />
    <path d={PIPE} stroke="#D7EEF6" strokeWidth={156} fill="none" />
    <path d={PIPE} stroke="#FFFFFF" strokeWidth={20} fill="none" opacity={0.6} transform="translate(0 -40)" />
  </g>
);

/* ---------------- Count board ---------------- */
export const CountBoard: React.FC<{ n: number; who: string; what: string; children?: React.ReactNode }> = ({ n, who, what, children }) => (
  <g>
    <rect width={1920} height={1080} fill="#E9E2D2" />
    <rect x={120} y={100} width={1680} height={880} rx={20} fill="#2E3A2E" stroke="#8A5A3B" strokeWidth={26} />
    <text x={220} y={240} fontFamily={HAND_FONT} fontSize={96} fill="#F6F1E7">COUNT {n}</text>
    <text x={220} y={330} fontFamily={HAND_FONT} fontSize={64} fill={["#F5D547", "#9BD8FF", "#F49A7A"][n - 1]}>{who}</text>
    <text x={220} y={400} fontFamily={HAND_FONT} fontSize={44} fill="#C9D4C0">{what}</text>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={1560 + i * 70} cy={210} r={26} fill={i < n ? "#F6F1E7" : "none"} stroke="#F6F1E7" strokeWidth={5} />
    ))}
    {children}
  </g>
);

/* ---------------- A grid of chips filling up ---------------- */
export const ChipGrid: React.FC<{ x: number; y: number; cols: number; rows: number; fill: number; size?: number; gap?: number }> = ({ x, y, cols, rows, fill, size = 36, gap = 46 }) => {
  const n = Math.round(fill * cols * rows);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${x + (i % cols) * gap} ${y + Math.floor(i / cols) * gap})`}><MiniChip size={size} /></g>
      ))}
    </g>
  );
};

/* ---------------- Used car (generic) ---------------- */
export const UsedCar: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -300 -40 L -280 -120 Q -260 -150 -220 -150 L -140 -150 L -80 -240 L 140 -240 L 220 -150 L 280 -140 Q 320 -130 320 -80 L 320 -40 Z" fill="#5C7A99" {...s} />
    <path d="M -60 -224 L 0 -224 L 0 -160 L -116 -160 Z M 20 -224 L 130 -224 L 190 -160 L 20 -160 Z" fill="#CFE8F5" stroke={INK} strokeWidth={4} />
    <circle cx={-180} cy={-40} r={56} fill="#2B2F36" stroke={INK} strokeWidth={6} />
    <circle cx={-180} cy={-40} r={22} fill="#9AA0A6" />
    <circle cx={200} cy={-40} r={56} fill="#2B2F36" stroke={INK} strokeWidth={6} />
    <circle cx={200} cy={-40} r={22} fill="#9AA0A6" />
    <path d="M -40 -110 l 30 0 M 90 -110 l 30 0" stroke={INK} strokeWidth={5} />
    <circle cx={290} cy={-110} r={14} fill="#FFF3A0" stroke={INK} strokeWidth={3} />
    {/* a dent */}
    <path d="M -250 -100 q 20 10 34 -6" stroke={INK} strokeWidth={4} fill="none" />
  </g>
);

/* ---------------- Big glowing sphere venue (generic) ---------------- */
export const SphereVenue: React.FC<{ x: number; y: number; scale?: number; hue?: string }> = ({ x, y, scale = 1, hue = "#5DA8FF" }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx={0} cy={-180} r={180} fill={hue} stroke={INK} strokeWidth={7} />
    {Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={0} cy={-180} rx={180 - i * 36} ry={180} fill="none" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={3} />)}
    {Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M -176 ${-260 + i * 60} L 176 ${-260 + i * 60}`} stroke="#FFFFFF" strokeOpacity={0.2} strokeWidth={3} />)}
    <circle cx={-50} cy={-220} r={22} fill="#fff" />
    <circle cx={50} cy={-220} r={22} fill="#fff" />
    <circle cx={-46} cy={-216} r={10} fill={INK} />
    <circle cx={54} cy={-216} r={10} fill={INK} />
    <path d="M -50 -140 Q 0 -100 50 -140" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
    <rect x={-140} y={-20} width={280} height={24} fill="#3A3F44" stroke={INK} strokeWidth={4} />
  </g>
);

/* ---------------- Football field (half shaded) ---------------- */
export const HalfField: React.FC<{ x: number; y: number; w: number; h: number; share: number }> = ({ x, y, w, h, share }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#5E9E4F" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M ${x + (w / 10) * (i + 1)} ${y} L ${x + (w / 10) * (i + 1)} ${y + h}`} stroke="#F6F1E7" strokeWidth={4} opacity={0.8} />)}
    <rect x={x} y={y} width={w * share} height={h} fill="#F2B544" opacity={0.55} />
    <ellipse cx={x + w / 2} cy={y + h / 2} rx={60} ry={36} fill="#8A4A2B" stroke={INK} strokeWidth={5} />
    <path d={`M ${x + w / 2 - 24} ${y + h / 2} L ${x + w / 2 + 24} ${y + h / 2}`} stroke="#F6F1E7" strokeWidth={5} />
  </g>
);

/* ---------------- Calculator (sparks when it overloads) ---------------- */
export const Calculator: React.FC<{ x: number; y: number; scale?: number; text: string; spark?: number }> = ({ x, y, scale = 1, text, spark = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-110} y={-170} width={220} height={170} rx={16} fill="#3A3F44" stroke={INK} strokeWidth={6} />
      <rect x={-90} y={-152} width={180} height={50} rx={6} fill={spark > 0 && frame % 6 < 3 ? "#FF6B5A" : "#9FE0A0"} stroke={INK} strokeWidth={3} />
      <text x={80} y={-114} textAnchor="end" fontFamily={HAND_FONT} fontSize={30} fill={INK}>{text}</text>
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-86 + (i % 4) * 46} y={-88 + Math.floor(i / 4) * 40} width={34} height={28} rx={5} fill="#6B7076" stroke={INK} strokeWidth={2} />)}
      {spark > 0 && Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2 + frame / 5;
        const r = 120 + ((frame * 9 + i * 23) % 80);
        return <path key={i} d={`M ${Math.cos(a) * r * 0.6} ${-100 + Math.sin(a) * r * 0.6} L ${Math.cos(a) * r} ${-100 + Math.sin(a) * r}`} stroke={i % 2 ? "#F5D547" : "#FF9A5A"} strokeWidth={8} strokeLinecap="round" opacity={spark} />;
      })}
      {spark > 0 && <circle cx={0} cy={-210} r={30 + (frame % 10) * 3} fill="#9AA0A6" opacity={0.4 * spark} />}
    </g>
  );
};

/* ---------------- Couch + studio apartment ---------------- */
export const Couch: React.FC<{ x: number; y: number; scale?: number; rot?: number; color?: string }> = ({ x, y, scale = 1, rot = 0, color = "#C0392B" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-130} y={-110} width={260} height={70} rx={20} fill={color} stroke={INK} strokeWidth={5} />
    <rect x={-150} y={-60} width={300} height={50} rx={16} fill={color} stroke={INK} strokeWidth={5} />
    <rect x={-160} y={-90} width={40} height={80} rx={14} fill={color} stroke={INK} strokeWidth={5} />
    <rect x={120} y={-90} width={40} height={80} rx={14} fill={color} stroke={INK} strokeWidth={5} />
    <path d="M -130 -10 L -130 6 M 130 -10 L 130 6" stroke={INK} strokeWidth={8} />
  </g>
);

export const STUDIO = { x: 660, y: 300, w: 600, h: 500 };
export const StudioBuilding: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#BFD8E8" />
    <rect x={0} y={860} width={1920} height={220} fill="#9A9690" />
    {/* neighbours */}
    <rect x={80} y={240} width={460} height={620} fill="#D9C7A8" stroke={INK} strokeWidth={5} />
    <rect x={1380} y={200} width={460} height={660} fill="#C9B79A" stroke={INK} strokeWidth={5} />
    {/* the studio: one small unit, cut away */}
    <rect x={STUDIO.x - 40} y={STUDIO.y - 60} width={STUDIO.w + 80} height={STUDIO.h + 160} fill="#E9DDC4" {...s} />
    <rect x={STUDIO.x} y={STUDIO.y} width={STUDIO.w} height={STUDIO.h} fill="#F6EEDC" stroke={INK} strokeWidth={6} />
    <rect x={STUDIO.x + 220} y={STUDIO.y - 50} width={160} height={36} rx={6} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
    <text x={STUDIO.x + 300} y={STUDIO.y - 22} textAnchor="middle" fontFamily={HAND_FONT} fontSize={26} fill={INK}>STUDIO · 1A</text>
  </g>
);

/* ---------------- Inside a crate: planks + bubble wrap ---------------- */
export const CrateInside: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#4A3424" />
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={0} y={i * 140} width={1920} height={130} fill={i % 2 ? "#5A402C" : "#523A28"} stroke="#2A1C12" strokeWidth={6} />)}
      {/* light through a crack */}
      <path d="M 1380 0 L 1420 0 L 1100 1080 L 980 1080 Z" fill="#FFF0C8" opacity={0.12 + Math.sin(frame / 20) * 0.02} />
      {/* bubble wrap on the floor and walls */}
      {Array.from({ length: 120 }).map((_, i) => (
        <circle key={i} cx={(i % 24) * 82 + (Math.floor(i / 24) % 2) * 41} cy={820 + Math.floor(i / 24) * 60} r={26} fill="#E9F4F8" fillOpacity={0.35} stroke="#C9E0EA" strokeWidth={3} />
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={`w${i}`} cx={40 + (i % 3) * 60} cy={120 + Math.floor(i / 3) * 70} r={24} fill="#E9F4F8" fillOpacity={0.3} stroke="#C9E0EA" strokeWidth={3} />
      ))}
    </g>
  );
};

/* ---------------- Newspaper with headlines + fine print ---------------- */
export const Newspaper: React.FC<{ x: number; y: number; rot?: number; scale?: number; headline: string }> = ({ x, y, rot = 0, scale = 1, headline }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-360} y={-460} width={720} height={920} fill="#F3EEE2" stroke={INK} strokeWidth={6} />
    <text x={0} y={-380} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#6B6458" letterSpacing={6}>THE DAILY CHIP</text>
    <path d="M -320 -350 L 320 -350" stroke={INK} strokeWidth={4} />
    <text x={0} y={-260} textAnchor="middle" fontFamily={HAND_FONT} fontSize={74} fill={INK}>{headline}</text>
    <rect x={-320} y={-200} width={300} height={220} fill="#C9C2B2" stroke={INK} strokeWidth={3} />
    {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M ${i < 6 ? 0 : -320} ${-190 + i * 30} L ${320 - rnd(i) * 60} ${-190 + i * 30}`} stroke="#B9B2A4" strokeWidth={6} strokeLinecap="round" />)}
    {/* the fine print */}
    <rect x={-320} y={260} width={640} height={140} fill="none" stroke="#B9B2A4" strokeWidth={3} strokeDasharray="8 6" />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M -300 ${282 + i * 24} L ${300 - rnd(i + 30) * 80} ${282 + i * 24}`} stroke="#C9C2B2" strokeWidth={4} strokeLinecap="round" />)}
  </g>
);

/* ---------------- Doorway with a long shadow ---------------- */
export const DarkDoorway: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#14182A" />
    <rect x={0} y={820} width={1920} height={260} fill="#1C2134" />
    <rect x={820} y={180} width={280} height={640} fill="#FFE9B8" stroke={INK} strokeWidth={8} />
    <path d="M 820 820 L 1100 820 L 1500 1080 L 420 1080 Z" fill="#FFE9B8" opacity={0.25} />
    {/* silhouette in the door */}
    <circle cx={960} cy={360} r={56} fill="#14182A" />
    <path d="M 870 820 L 880 470 Q 960 420 1040 470 L 1050 820 Z" fill="#14182A" />
    <path d="M 900 360 L 1020 360 L 1000 300 L 920 300 Z" fill="#14182A" />
    <path d="M 880 300 L 1040 300" stroke="#14182A" strokeWidth={14} />
    {/* long shadow across the floor */}
    <path d="M 900 820 L 1020 820 L 1180 1080 L 760 1080 Z" fill="#14182A" opacity={0.85} />
  </g>
);
