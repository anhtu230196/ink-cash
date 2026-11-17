// Sets and props for B05a · THE APPROACH (new nameplate → the business model → Speedmatrix in Malaysia → $3 billion → the pitch deck).
import React from "react";
import { useCurrentFrame } from "remotion";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";
import { ServerRack } from "../b04/sets";

/* ---------------- A glass tower at night (generic, no landmark) ---------------- */
export const GlassTower: React.FC = () => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={940} width={1920} height={140} fill="#1E2436" />
    {/* neighbours */}
    {[{ x: 80, w: 300, h: 520 }, { x: 1500, w: 340, h: 600 }].map((b, i) => (
      <rect key={i} x={b.x} y={940 - b.h} width={b.w} height={b.h} fill="#1C2134" stroke={INK} strokeWidth={4} />
    ))}
    {/* the tower: blue glass grid */}
    <path d="M 620 940 L 620 160 L 1080 90 L 1300 160 L 1300 940 Z" fill="#3D5A8A" {...s} />
    <path d="M 1080 90 L 1080 940" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        <path d={`M 620 ${200 + r * 46} L 1080 ${150 + r * 49}`} stroke="#6E8DC0" strokeWidth={3} />
        <path d={`M 1080 ${150 + r * 49} L 1300 ${200 + r * 46}`} stroke="#5A77A8" strokeWidth={3} />
      </g>
    ))}
    {[0, 1, 2, 3, 4].map((c) => <path key={c} d={`M ${700 + c * 80} ${148 - c * 10} L ${700 + c * 80} 940`} stroke="#6E8DC0" strokeWidth={3} />)}
    {/* a few lit floors */}
    {[3, 7, 8, 12].map((r) => <path key={r} d={`M 640 ${222 + r * 46} L 1060 ${174 + r * 49} L 1060 ${200 + r * 49} L 640 ${246 + r * 46} Z`} fill="#FFE3A8" opacity={0.55} />)}
    {/* lobby */}
    <rect x={820} y={820} width={260} height={120} fill="#FFE9B8" stroke={INK} strokeWidth={5} />
    <path d="M 950 820 L 950 940" stroke={INK} strokeWidth={4} />
  </g>
);

/* ---------------- Office door with a brass nameplate ---------------- */
export const PLATE = { x: 960, y: 470 };
export const GlassDoor: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#2A3048" />
    <rect x={0} y={900} width={1920} height={180} fill="#3A3A44" />
    {/* marble wall */}
    <rect x={0} y={0} width={560} height={900} fill="#D8D2C6" stroke={INK} strokeWidth={5} />
    <rect x={1360} y={0} width={560} height={900} fill="#D8D2C6" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M ${rnd(i) * 520 + 20} ${rnd(i + 3) * 800} q 60 40 120 10`} stroke="#B9B2A4" strokeWidth={3} fill="none" />)}
    {/* glass doors */}
    <rect x={560} y={60} width={800} height={840} fill="#8FB3D9" fillOpacity={0.55} stroke={INK} strokeWidth={8} />
    <path d="M 960 60 L 960 900" stroke={INK} strokeWidth={8} />
    <path d="M 620 120 L 760 120 L 640 300 Z M 1010 120 L 1120 120 L 1020 260 Z" fill="#fff" opacity={0.35} />
    <rect x={900} y={560} width={20} height={140} rx={8} fill="#C9A35A" stroke={INK} strokeWidth={4} />
    <rect x={1000} y={560} width={20} height={140} rx={8} fill="#C9A35A" stroke={INK} strokeWidth={4} />
  </g>
);

export const Nameplate: React.FC<{ x: number; y: number; text: string; shine?: number; scale?: number; rot?: number; old?: boolean }> = ({ x, y, text, shine = 0, scale = 1, rot = 0, old }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-300} y={-80} width={600} height={160} rx={14} fill={old ? "#8E8A80" : "#D4A84A"} stroke={INK} strokeWidth={7} />
    <rect x={-282} y={-62} width={564} height={124} rx={8} fill="none" stroke={old ? "#6E6A62" : "#F5D88A"} strokeWidth={4} />
    {[[-262, -46], [262, -46], [-262, 46], [262, 46]].map(([sx, sy], i) => (
      <g key={i}>
        <circle cx={sx} cy={sy} r={10} fill={old ? "#6E6A62" : "#B88A30"} stroke={INK} strokeWidth={3} />
        <path d={`M ${sx - 6} ${sy} L ${sx + 6} ${sy}`} stroke={INK} strokeWidth={3} />
      </g>
    ))}
    <text x={0} y={22} textAnchor="middle" fontFamily={HAND_FONT} fontSize={old ? 52 : 78} letterSpacing={old ? 2 : 10} fill={old ? "#3A3A44" : "#3A2A10"}>{text}</text>
    {shine > 0 && <path d={`M ${-340 + shine * 680} -90 l 60 0 l -80 180 l -60 0 Z`} fill="#fff" opacity={0.5} />}
  </g>
);

/* ---------------- Roller coaster ---------------- */
export const COASTER = "M -100 900 L 260 900 C 420 900 460 260 640 260 C 820 260 820 760 1000 760 C 1160 760 1180 380 1340 380 C 1500 380 1540 820 1700 820 L 2020 820";
export const Coaster: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#BFE0F2" />
    <rect x={0} y={960} width={1920} height={120} fill="#8CC07A" />
    {/* supports */}
    {[300, 460, 640, 820, 1000, 1180, 1340, 1520, 1700].map((x) => <path key={x} d={`M ${x} 960 L ${x} 400`} stroke="#B8B2A6" strokeWidth={10} />)}
    <path d={COASTER} stroke={INK} strokeWidth={30} fill="none" />
    <path d={COASTER} stroke="#E0453A" strokeWidth={18} fill="none" />
    <path d={COASTER} stroke="#F6F1E7" strokeWidth={4} fill="none" strokeDasharray="10 26" />
  </g>
);

/* ---------------- A whiteboard ---------------- */
export const Whiteboard: React.FC<{ title: string }> = ({ title }) => (
  <g>
    <rect width={1920} height={1080} fill="#E9E2D2" />
    <rect x={200} y={110} width={1520} height={800} rx={16} fill="#FBFBF8" stroke="#9AA0A6" strokeWidth={22} />
    <rect x={200} y={110} width={1520} height={800} rx={16} fill="none" stroke={INK} strokeWidth={5} />
    <rect x={500} y={910} width={920} height={22} fill="#9AA0A6" stroke={INK} strokeWidth={4} />
    <text x={960} y={230} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill="#2D4A8A">{title}</text>
    <path d="M 640 260 Q 960 280 1280 256" stroke="#2D4A8A" strokeWidth={6} fill="none" />
  </g>
);

/* ---------------- Framed certificate ---------------- */
export const Certificate: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-420} y={-300} width={840} height={600} fill="#8A5A3B" stroke={INK} strokeWidth={8} />
    <rect x={-380} y={-260} width={760} height={520} fill="#FBF5E6" stroke={INK} strokeWidth={4} />
    <rect x={-350} y={-230} width={700} height={460} fill="none" stroke="#C9A35A" strokeWidth={6} />
    <text x={0} y={-150} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#6B6458" letterSpacing={6}>OFFICIAL</text>
    <text x={0} y={-80} textAnchor="middle" fontFamily={HAND_FONT} fontSize={74} fill={INK}>NVIDIA CLOUD PARTNER</text>
    <text x={0} y={-20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">awarded to</text>
    <text x={0} y={50} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#2D4A8A" letterSpacing={6}>MEGASPEED</text>
    <path d="M -240 150 L -60 150 M 60 150 L 240 150" stroke="#B9B2A4" strokeWidth={4} />
    <g transform="translate(0 160)">
      <path d="M -30 20 L -50 90 L -10 70 L 0 100 Z M 30 20 L 50 90 L 10 70 L 0 100 Z" fill="#C0392B" stroke={INK} strokeWidth={3} />
      <circle r={50} fill="#E1B83F" stroke={INK} strokeWidth={5} />
      <circle r={36} fill="none" stroke="#B88A30" strokeWidth={4} />
    </g>
  </g>
);

/* ---------------- Car-dealer bunting + balloons ---------------- */
export const Bunting: React.FC<{ y?: number }> = ({ y = 120 }) => {
  const cols = ["#E0453A", "#F5D547", "#2D4A8A", "#3E8E4F"];
  return (
    <g>
      <path d={`M 0 ${y} Q 480 ${y + 70} 960 ${y} Q 1440 ${y + 70} 1920 ${y}`} stroke={INK} strokeWidth={4} fill="none" />
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 40 + i * 80;
        const t = (x % 960) / 960;
        const yy = y + 70 * 2 * t * (1 - t) * 1;
        return <path key={i} d={`M ${x - 26} ${yy} L ${x + 26} ${yy} L ${x} ${yy + 56} Z`} fill={cols[i % 4]} stroke={INK} strokeWidth={3} />;
      })}
    </g>
  );
};

export const Balloon: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 12 + x) * 8;
  return (
    <g transform={`translate(${x} ${y + bob})`}>
      <path d="M 0 70 Q 20 140 -10 240" stroke={INK} strokeWidth={3} fill="none" />
      <ellipse cx={0} cy={0} rx={52} ry={66} fill={color} stroke={INK} strokeWidth={5} />
      <path d="M -20 -36 Q -30 -10 -24 10" stroke="#fff" strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
    </g>
  );
};

/* ---------------- Turntable with a rack on it ---------------- */
export const Turntable: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <ellipse cx={x} cy={y} rx={260} ry={46} fill="#9AA0A6" stroke={INK} strokeWidth={6} />
    <ellipse cx={x} cy={y - 10} rx={240} ry={38} fill="#C9CDD2" stroke={INK} strokeWidth={4} />
    <ServerRack x={x} y={y - 10} scale={0.9} seed={9} />
  </g>
);

export const PriceSticker: React.FC<{ x: number; y: number; text: string; rot?: number }> = ({ x, y, text, rot = 8 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -110 -50 L 90 -50 L 130 0 L 90 50 L -110 50 Z" fill="#F5D547" stroke={INK} strokeWidth={5} />
    <circle cx={92} cy={0} r={10} fill="#fff" stroke={INK} strokeWidth={3} />
    <text x={-10} y={16} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>{text}</text>
  </g>
);

/* ---------------- Map: Singapore + southern Malaysia (simplified, not to scale) ---------------- */
export const SG = { x: 1060, y: 760 };
export const MapSea: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#5B9BD5" />
    {/* peninsula tip */}
    <path d="M 300 -20 L 1500 -20 Q 1560 200 1420 420 Q 1300 560 1180 620 Q 1020 680 860 640 Q 640 600 520 460 Q 380 300 300 -20 Z" fill="#9CCB7A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {/* island */}
    <path d="M 930 740 Q 1060 700 1190 740 Q 1220 790 1160 820 Q 1060 850 950 810 Q 900 780 930 740 Z" fill="#C9E0A8" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <text x={560} y={130} textAnchor="middle" fontFamily={HAND_FONT} fontSize={88} fill="#2E4A2E" letterSpacing={6}>MALAYSIA</text>
    <text x={SG.x} y={900} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK} letterSpacing={4}>SINGAPORE</text>
  </g>
);

/* ---------------- Lemonade stand + orchard ---------------- */
export const LemonTree: React.FC<{ x: number; y: number; scale?: number; i?: number }> = ({ x, y, scale = 1, i = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-16} y={-160} width={32} height={160} fill="#8A6A45" stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-220} r={110} fill="#3E8E4F" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 6 }).map((_, k) => (
      <ellipse key={k} cx={-70 + rnd(i * 9 + k) * 140} cy={-290 + rnd(i * 7 + k + 3) * 130} rx={16} ry={12} fill="#F5D547" stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

export const LemonadeStand: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -200 -360 L 200 -360 L 230 -300 L -230 -300 Z" fill="#F5D547" stroke={INK} strokeWidth={6} />
    {[-150, -50, 50, 150].map((sx) => <path key={sx} d={`M ${sx - 30} -300 Q ${sx} -270 ${sx + 30} -300`} fill="#fff" stroke={INK} strokeWidth={4} />)}
    <path d="M -180 -300 L -180 -150 M 180 -300 L 180 -150" stroke={INK} strokeWidth={10} />
    <rect x={-210} y={-160} width={420} height={160} fill="#F3E3C8" stroke={INK} strokeWidth={6} />
    <text x={0} y={-60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill="#C0392B">LEMONADE 25¢</text>
    <path d="M -120 -160 L -110 -220 L -80 -220 L -70 -160 Z" fill="#FFF3A0" stroke={INK} strokeWidth={4} />
  </g>
);

/* ---------------- Boardroom (pitch-deck skit) ---------------- */
export const Boardroom: React.FC<{ slide?: number }> = ({ slide = 0 }) => (
  <g>
    <rect width={1920} height={1080} fill="#3A3550" />
    <rect x={0} y={0} width={1920} height={640} fill="#4A4466" />
    {/* night window band */}
    <rect x={120} y={80} width={680} height={380} fill="#1C2142" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={140 + i * 66} y={460 - 120 - rnd(i) * 220} width={50} height={120 + rnd(i) * 220} fill="#2A3058" />
    ))}
    <path d="M 460 80 L 460 460" stroke={INK} strokeWidth={6} />
    {/* screen with the deck */}
    <rect x={1060} y={90} width={720} height={420} rx={10} fill="#11141A" stroke={INK} strokeWidth={6} />
    <rect x={1080} y={110} width={680} height={380} fill="#F6F1E7" />
    <text x={1420} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill="#2D4A8A">{["GROWTH!", "OUR CHIPS", "CLIENTS"][slide % 3]}</text>
    {slide % 3 === 0 && <path d="M 1140 450 L 1300 400 L 1440 330 L 1560 240 L 1700 160" stroke="#3E8E3F" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    {slide % 3 === 1 && Array.from({ length: 12 }).map((_, i) => <rect key={i} x={1140 + (i % 6) * 96} y={240 + Math.floor(i / 6) * 110} width={70} height={70} rx={6} fill="#5DB35F" stroke={INK} strokeWidth={3} />)}
    {slide % 3 === 2 && ["big", "bigger", "huge"].map((t, i) => <text key={t} x={1140} y={270 + i * 70} fontFamily={HAND_FONT} fontSize={46} fill={INK}>• {t} client</text>)}
  </g>
);

/** Boardroom table: draw it after the people so it hides their legs. */
export const BoardTable: React.FC = () => (
  <g>
    <path d="M 160 820 L 1760 820 L 1880 1080 L 40 1080 Z" fill="#5A3E2B" stroke={INK} strokeWidth={6} />
    <path d="M 160 820 L 1760 820" stroke="#7A5A3B" strokeWidth={10} />
  </g>
);

export const GlossyDeck: React.FC<{ x: number; y: number; flip?: number }> = ({ x, y, flip = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -150 0 L 150 0 L 130 -30 L -130 -30 Z" fill="#F6F1E7" stroke={INK} strokeWidth={4} />
    <path d={`M 0 -30 L ${130 - flip * 260} ${-30 - Math.sin(flip * Math.PI) * 90} L ${150 - flip * 300} 0 L 0 0 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
    <text x={70} y={-8} textAnchor="middle" fontFamily={HAND_FONT} fontSize={22} fill="#2D4A8A">PITCH</text>
  </g>
);
