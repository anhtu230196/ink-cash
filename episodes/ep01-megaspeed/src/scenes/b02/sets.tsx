// Sets and props for B02 · THE MAN WITH THE KEYS (part a: Denny's → GPUs → AI → H100).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Character, CharacterLook, MiniChip } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Diner exterior, 1993 ---------------- */
export const DinerExterior: React.FC = () => (
  <g>
    <NightSky h={760} />
    {/* building */}
    <rect x={380} y={420} width={1160} height={340} fill="#E2C9A0" {...s} />
    <path d="M 340 430 L 1580 430 L 1530 360 L 390 360 Z" fill="#B5483A" {...s} />
    {[460, 700, 940, 1180].map((x) => (
      <g key={x}>
        <rect x={x} y={480} width={200} height={170} fill="#FFE3A3" {...s} strokeWidth={5} />
        <path d={`M ${x + 100} 480 L ${x + 100} 650`} stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <rect x={1400} y={540} width={100} height={220} fill="#FFE9B8" {...s} strokeWidth={5} />
    {/* tall pole sign */}
    <path d="M 1700 760 L 1700 300" {...s} strokeWidth={14} />
    <rect x={1560} y={150} width={290} height={150} rx={20} fill="#F2C94C" {...s} />
    <text x={1705} y={248} textAnchor="middle" fontFamily={HAND_FONT} fontSize={74} fill="#B5483A">DENNY'S</text>
    {/* parking lot + a boxy early-90s car */}
    <rect x={0} y={760} width={1920} height={320} fill="#7E7A74" />
    <path d="M 0 760 L 1920 760" {...s} />
    {[200, 520, 840].map((x) => <path key={x} d={`M ${x} 830 L ${x + 120} 1000`} stroke="#E8E4DA" strokeWidth={8} opacity={0.6} />)}
    <g transform="translate(260 900)">
      <path d="M -170 0 L -170 -60 L -110 -60 L -70 -120 L 90 -120 L 130 -60 L 180 -60 L 180 0 Z" fill="#5C7A99" {...s} />
      <path d="M -60 -110 L 0 -110 L 0 -64 L -96 -64 Z M 14 -110 L 80 -110 L 112 -64 L 14 -64 Z" fill="#A9CFE0" stroke={INK} strokeWidth={4} />
      <circle cx={-100} cy={4} r={34} fill="#2A2A2A" {...s} /><circle cx={110} cy={4} r={34} fill="#2A2A2A" {...s} />
    </g>
  </g>
);

/* ---------------- Napkin with a chip sketch ---------------- */
export const Napkin: React.FC<{ x: number; y: number; scale?: number; rot?: number; draw?: number }> = ({ x, y, scale = 1, rot = -6, draw = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-150} y={-110} width={300} height={220} fill="#FBF8F0" stroke={INK} strokeWidth={4} />
    <path d="M -150 -110 l 20 0 l -20 20 Z M 150 110 l -20 0 l 20 -20 Z" fill="#E9E4D8" />
    <g opacity={draw} stroke="#2E3A57" strokeWidth={4} fill="none" strokeLinecap="round">
      <rect x={-60} y={-60} width={120} height={120} rx={8} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      <rect x={-30} y={-30} width={60} height={60} rx={4} />
      {[-40, -14, 14, 40].map((p) => <path key={p} d={`M ${p} -60 L ${p} -76 M ${p} 60 L ${p} 76 M -60 ${p} L -76 ${p} M 60 ${p} L 76 ${p}`} />)}
      <path d="M 82 -80 q 30 -10 40 10" />
      <text x={70} y={96} fontFamily={HAND_FONT} fontSize={26} fill="#2E3A57" stroke="none">3D?!</text>
    </g>
    <circle cx={-100} cy={70} r={28} fill="none" stroke="#8A5A3B" strokeWidth={5} opacity={0.45} />
  </g>
);

/** A stack of diner mugs on the table; n grows over time. */
export const MugStack: React.FC<{ x: number; y: number; n: number }> = ({ x, y, n }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const mx = x + col * 70 + (row % 2) * 30;
      const my = y - row * 62;
      return (
        <g key={i}>
          <path d={`M ${mx} ${my - 60} L ${mx + 56} ${my - 60} L ${mx + 52} ${my} L ${mx + 4} ${my} Z`} fill="#fff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d={`M ${mx + 56} ${my - 46} q 18 6 0 28`} stroke={INK} strokeWidth={4} fill="none" />
        </g>
      );
    })}
  </g>
);

/* ---------------- 1990s CRT with a soggy cardboard knight ---------------- */
export const CRT: React.FC<{ sag: number }> = ({ sag }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect x={460} y={150} width={1000} height={720} rx={60} fill="#CFC8B8" {...s} />
      <rect x={540} y={220} width={840} height={560} rx={70} fill="#1F3A2E" {...s} />
      <defs><clipPath id="crtClip"><rect x={540} y={220} width={840} height={560} rx={70} /></clipPath></defs>
      <g clipPath="url(#crtClip)">
        <rect x={540} y={640} width={840} height={140} fill="#3E6B4F" />
        {/* blocky knight made of cardboard boxes, drooping with sag */}
        <g transform={`translate(960 640) skewX(${sag * 12}) scale(1 ${1 - sag * 0.25})`}>
          <rect x={-60} y={-160} width={120} height={120} fill="#C79A63" stroke={INK} strokeWidth={5} />
          <rect x={-45} y={-260} width={90} height={100} fill="#B4854F" stroke={INK} strokeWidth={5} />
          <rect x={-25} y={-232} width={18} height={18} fill={INK} /><rect x={8} y={-232} width={18} height={18} fill={INK} />
          <rect x={-55} y={-40} width={40} height={40} fill="#B4854F" stroke={INK} strokeWidth={5} />
          <rect x={15} y={-40} width={40} height={40} fill="#B4854F" stroke={INK} strokeWidth={5} />
          <rect x={60} y={-150} width={110} height={24} fill="#9AA0A6" stroke={INK} strokeWidth={4} transform={`rotate(${20 + sag * 50} 60 -140)`} />
          {/* drips */}
          {[-40, 0, 36].map((d, i) => <ellipse key={i} cx={d} cy={-30 + ((frame * 3 + i * 20) % 50) * sag} rx={7} ry={11} fill="#8FC6E8" opacity={sag} />)}
        </g>
        {/* scanlines */}
        {Array.from({ length: 70 }).map((_, i) => <rect key={i} x={540} y={220 + i * 8} width={840} height={3} fill="#000" opacity={0.12} />)}
      </g>
      <circle cx={1400} cy={830} r={14} fill="#B5483A" stroke={INK} strokeWidth={4} />
      <text x={600} y={840} fontFamily={HAND_FONT} fontSize={40} fill="#555">1993</text>
    </g>
  );
};

/* ---------------- Chalkboard classroom for the professor ---------------- */
export const Chalkboard: React.FC<{ solved: number }> = ({ solved }) => (
  <g>
    <rect width={1920} height={1080} fill="#D9D2C0" />
    <rect x={0} y={800} width={1920} height={280} fill="#A8916F" />
    <path d="M 0 800 L 1920 800" {...s} />
    <rect x={260} y={120} width={1400} height={560} fill="#2F4A3A" stroke="#6B4A31" strokeWidth={24} />
    <rect x={260} y={120} width={1400} height={560} fill="none" {...s} />
    <text x={340} y={260} fontFamily={HAND_FONT} fontSize={80} fill="#F3F1E8">∫ x² dx = x³/3 + C</text>
    <text x={340} y={380} fontFamily={HAND_FONT} fontSize={64} fill="#F3F1E8" opacity={0.85}>∇ · E = ρ / ε₀</text>
    <text x={340} y={500} fontFamily={HAND_FONT} fontSize={64} fill="#F3F1E8" opacity={0.85}>e^(iπ) + 1 = 0</text>
    {solved > 0 && <text x={1150} y={260} fontFamily={HAND_FONT} fontSize={80} fill="#F5D547">✓</text>}
  </g>
);

/** Fictional professor: elder, glasses, cardigan, bald with white sides. */
export const PROFESSOR: CharacterLook = { outfit: "cardigan", color: "#7A5C3E", color2: "#E9E4D8", hair: "bald", hairColor: "#ECECEA", glasses: true, facialHair: "mustache", facialHairColor: "#ECECEA", wrinkles: 2 };

/* ---------------- Kindergarten grid ---------------- */
const KID_HAIR = ["#1F1F1F", "#6B4426", "#C9A15B", "#8A4B27", "#2B2622", "#3B2A1E"];
const KID_SKIN = ["#F1D3B0", "#E2B48C", "#C68E62", "#8D5A3B"];
const KID_SHIRT = ["#E0453A", "#4A6FA5", "#5DB35F", "#F2B544", "#8E6BB5", "#3E8E8A"];

/** One tiny kid: head, body, crayon. Cheap enough to draw hundreds. */
export const TinyKid: React.FC<{ x: number; y: number; s: number; i: number; colour: number }> = ({ x, y, s: sc, i, colour }) => (
  <g transform={`translate(${x} ${y}) scale(${sc})`}>
    <rect x={-22} y={-26} width={44} height={40} rx={20} fill={KID_SHIRT[i % 6]} stroke={INK} strokeWidth={4} />
    <circle cx={0} cy={-48} r={26} fill={KID_SKIN[i % 4]} stroke={INK} strokeWidth={4} />
    <path d="M -26 -54 Q -24 -80 0 -78 Q 24 -80 26 -54 Q 10 -66 -26 -54 Z" fill={KID_HAIR[(i * 7) % 6]} stroke={INK} strokeWidth={3} />
    <circle cx={-9} cy={-46} r={3} fill={INK} /><circle cx={9} cy={-46} r={3} fill={INK} />
    <g transform={`rotate(${-30 + colour * 60} 18 -10)`}>
      <rect x={14} y={-30} width={10} height={34} fill={KID_SHIRT[(i + 2) % 6]} stroke={INK} strokeWidth={3} />
    </g>
  </g>
);

/** A classroom seen from above-ish: rows of tiny kids. `paint` 0..1 colours a mosaic in front of them all at once. */
export const KidGrid: React.FC<{ cols: number; rows: number; x0?: number; y0?: number; w?: number; h?: number; paint?: number; sync?: boolean }> = ({
  cols, rows, x0 = 60, y0 = 160, w = 1800, h = 860, paint = 0, sync = true,
}) => {
  const frame = useCurrentFrame();
  const dx = w / cols;
  const dy = h / rows;
  const sc = Math.min(dx / 80, dy / 110);
  return (
    <g>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const colour = sync ? (Math.sin(frame / 2) + 1) / 2 : (Math.sin(frame / 2 + i * 1.7) + 1) / 2;
        return (
          <g key={i}>
            {paint > 0 && <rect x={x0 + c * dx + dx * 0.15} y={y0 + r * dy + dy * 0.62} width={dx * 0.7} height={dy * 0.3} fill={KID_SHIRT[(c + r) % 6]} opacity={paint} stroke={INK} strokeWidth={2} />}
            <TinyKid x={x0 + c * dx + dx / 2} y={y0 + r * dy + dy * 0.6} s={sc} i={i} colour={colour} />
          </g>
        );
      })}
    </g>
  );
};

/* ---------------- Factory of tiny math ---------------- */
export const MathFactory: React.FC = () => {
  const frame = useCurrentFrame();
  const lanes = 9;
  const probs = ["2+3", "7×8", "9-4", "6÷2", "1+1", "4×4", "8-5", "3×7", "5+9"];
  return (
    <g>
      <rect width={1920} height={1080} fill="#E5DED0" />
      {/* the chip "factory" in the middle */}
      <rect x={760} y={170} width={400} height={740} rx={30} fill="#5DB35F" {...s} />
      <rect x={810} y={220} width={300} height={640} rx={20} fill="#2F5F31" stroke={INK} strokeWidth={5} />
      <text x={960} y={560} textAnchor="middle" fontFamily={HAND_FONT} fontSize={90} fill="#F3F1E8">GPU</text>
      {Array.from({ length: lanes }).map((_, l) => {
        const y = 230 + l * 74;
        const t = (frame * 9 + l * 37) % 760;
        return (
          <g key={l}>
            <path d={`M 40 ${y} L 760 ${y} M 1160 ${y} L 1880 ${y}`} stroke="#9AA0A6" strokeWidth={6} strokeDasharray="18 14" />
            <g transform={`translate(${t} ${y})`}>
              <rect x={-60} y={-26} width={120} height={52} rx={10} fill="#fff" stroke={INK} strokeWidth={4} />
              <text x={0} y={14} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill={INK}>{probs[l]}</text>
            </g>
            <g transform={`translate(${1160 + ((frame * 9 + l * 37) % 760)} ${y})`}>
              <rect x={-36} y={-26} width={72} height={52} rx={10} fill="#F5D547" stroke={INK} strokeWidth={4} />
              <text x={0} y={14} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill={INK}>✓</text>
            </g>
          </g>
        );
      })}
    </g>
  );
};

/* ---------------- Research lab at night ---------------- */
export const Lab: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#9AA6AE" />
    <rect x={0} y={820} width={1920} height={260} fill="#7C7468" />
    <path d="M 0 820 L 1920 820" {...s} />
    {/* whiteboard with a neural net */}
    <rect x={180} y={140} width={760} height={460} fill="#F4F4F0" {...s} />
    {[[0, 3], [1, 4], [2, 2]].map(([c, n]) =>
      Array.from({ length: n }).map((_, i) => {
        const x = 300 + c * 260;
        const y = 370 - ((n - 1) * 90) / 2 + i * 90;
        return <circle key={`${c}${i}`} cx={x} cy={y} r={26} fill="#fff" stroke="#2E3A57" strokeWidth={5} />;
      }),
    )}
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d={`M 326 ${235 + (i % 3) * 90} L 534 ${235 + (i % 4) * 90}`} stroke="#2E3A57" strokeWidth={2} opacity={0.6} />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <path key={`b${i}`} d={`M 586 ${235 + (i % 4) * 90} L 794 ${325 + (i % 2) * 90}`} stroke="#2E3A57" strokeWidth={2} opacity={0.6} />
    ))}
    {/* desk + monitors */}
    <rect x={1040} y={620} width={760} height={30} fill="#7A5536" {...s} />
    {[1080, 1340, 1600].map((x, i) => (
      <g key={x}>
        <rect x={x} y={430} width={200} height={150} rx={8} fill="#0F1A14" {...s} />
        <path d={`M ${x + 20} ${540 - i * 10} L ${x + 70} ${500} L ${x + 120} ${520} L ${x + 180} ${460}`} stroke="#7CFF6B" strokeWidth={5} fill="none" />
        <path d={`M ${x + 100} 580 L ${x + 100} 620`} {...s} />
      </g>
    ))}
    {/* the GPU box on the desk, glowing */}
    <g transform="translate(1440 690) scale(1.4)"><MiniChip size={60} /></g>
  </g>
);

/* ---------------- Homework desks for the GPU skit ---------------- */
export const HomeworkRoom: React.FC<{ melt: number }> = ({ melt }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#A9A0B8" />
      <rect x={0} y={820} width={1920} height={260} fill="#7A6A5A" />
      <path d="M 0 820 L 1920 820" {...s} />
      {/* poster */}
      <rect x={820} y={110} width={280} height={200} fill="#F6F1E7" {...s} strokeWidth={5} />
      <text x={960} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>MATH IS</text>
      <text x={960} y={250} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#B5483A">FUN!!</text>
      {/* two tiny desks */}
      {[560, 1360].map((x, d) => (
        <g key={x}>
          <rect x={x - 220} y={700} width={440} height={28} fill="#C79A63" {...s} />
          <path d={`M ${x - 200} 728 L ${x - 200} 900 M ${x + 200} 728 L ${x + 200} 900`} {...s} strokeWidth={10} />
          {/* homework pile, glowing */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={x - 230 + rnd(i + d * 10) * 24} y={680 - i * 16} width={170} height={20} fill="#FFF8D6" stroke={INK} strokeWidth={3} transform={`rotate(${rnd(i * 3 + d) * 10 - 5} ${x - 80} ${690 - i * 16})`} />
          ))}
          {/* crayons, melting on the left desk */}
          {[0, 1, 2].map((c) => {
            const cx = x + 110 + c * 34;
            const m = d === 0 ? melt : 0;
            return (
              <g key={c}>
                <rect x={cx} y={640 + m * 30} width={18} height={60 - m * 30} fill={["#E0453A", "#4A6FA5", "#F2B544"][c]} stroke={INK} strokeWidth={3} />
                {m > 0 && <path d={`M ${cx - 6} 700 q 15 ${10 + m * 30} 30 0 Z`} fill={["#E0453A", "#4A6FA5", "#F2B544"][c]} stroke={INK} strokeWidth={3} />}
                {m > 0.3 && <path d={`M ${cx + 9} ${630 + m * 20} q -8 -20 0 -40 q 8 -20 0 -40`} stroke="#fff" strokeWidth={5} fill="none" opacity={0.6 + Math.sin(frame / 5 + c) * 0.2} />}
              </g>
            );
          })}
        </g>
      ))}
      {/* desk lamp between */}
      <path d="M 960 820 L 960 560 L 1010 520" {...s} strokeWidth={9} fill="none" />
      <path d="M 980 500 L 1060 470 L 1070 520 L 1000 550 Z" fill="#3E6B4F" {...s} strokeWidth={5} />
    </g>
  );
};

/* ---------------- Velvet rope + H100 on a pedestal ---------------- */
export const H100Box: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-220} y={-90} width={440} height={180} rx={18} fill="#2A2F3A" {...s} />
    <rect x={-190} y={-60} width={380} height={120} rx={10} fill="#5DB35F" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-170 + i * 44} y={-44} width={30} height={88} rx={4} fill="#3E8E3F" stroke={INK} strokeWidth={2} />)}
    <rect x={-80} y={100} width={160} height={50} rx={8} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
    <text x={0} y={138} textAnchor="middle" fontFamily={HAND_FONT} fontSize={42} fill={INK}>H100</text>
  </g>
);

export const Showroom: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#B9B3A6" />
    <rect x={0} y={800} width={1920} height={280} fill="#8E8579" />
    <path d="M 0 800 L 1920 800" {...s} />
    {/* pedestal */}
    <rect x={1260} y={600} width={360} height={300} fill="#ECE6D8" {...s} />
    <rect x={1230} y={580} width={420} height={36} fill="#D9D2C0" {...s} />
    {/* velvet rope */}
    {[1100, 1780].map((x) => (
      <g key={x}>
        <path d={`M ${x} 920 L ${x} 720`} {...s} strokeWidth={12} stroke="#C9A15B" />
        <circle cx={x} cy={712} r={16} fill="#E1B83F" stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <path d="M 1100 730 Q 1440 840 1780 730" stroke="#8E1F2C" strokeWidth={16} fill="none" strokeLinecap="round" />
  </g>
);

/** A "tech giant": an extra-tall suit with a building-shaped head and no face (fictional, no logos). */
export const TechGiant: React.FC<{ x: number; y: number; scale: number; color: string; cash?: boolean }> = ({ x, y, scale, color, cash }) => {
  const frame = useCurrentFrame();
  const wave = Math.sin(frame / 4 + x) * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M -28 -60 L -32 -6 L -52 -4 M 28 -60 L 32 -6 L 52 -4" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <rect x={-80} y={-300} width={160} height={250} rx={70} fill={color} stroke={INK} strokeWidth={6} />
      <rect x={-70} y={-500} width={140} height={200} rx={10} fill="#C9CED3" stroke={INK} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-52 + (i % 3) * 38} y={-480 + Math.floor(i / 3) * 44} width={26} height={28} fill="#FFE3A3" stroke={INK} strokeWidth={2} />)}
      <path d={`M 64 -250 L 120 ${-320 + wave} L 150 ${-380 + wave}`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {cash && <g transform={`translate(150 ${-390 + wave}) rotate(-12)`}>
        {[0, 1, 2].map((i) => <rect key={i} x={-46} y={-26 + i * 9} width={92} height={46} rx={4} fill="#7FBF6A" stroke={INK} strokeWidth={3} />)}
        <text x={0} y={30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>$</text>
      </g>}
    </g>
  );
};

/** Swinging price tag. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; sub?: string }> = ({ x, y, text, sub }) => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame / 7) * 6 * interpolate(frame, [0, 60], [1, 0.3], { extrapolateRight: "clamp" });
  return (
    <g transform={`translate(${x} ${y}) rotate(${swing})`}>
      <path d="M 0 -260 L 0 -150" stroke={INK} strokeWidth={5} />
      <path d="M -330 -150 L 280 -150 L 360 0 L 280 150 L -330 150 Z" fill="#F6F1E7" {...s} />
      <circle cx={262} cy={0} r={22} fill="#B9B3A6" stroke={INK} strokeWidth={5} />
      <text x={-30} y={sub ? 10 : 34} textAnchor="middle" fontFamily={HAND_FONT} fontSize={sub ? 96 : 110} fill="#B5483A">{text}</text>
      {sub && <text x={-30} y={90} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill={INK}>{sub}</text>}
    </g>
  );
};

/** Little game cartridge, early-90s style. */
export const Cartridge: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M -90 -120 L 90 -120 L 90 100 L -90 100 Z" fill="#9AA0A6" {...s} />
    <rect x={-66} y={-96} width={132} height={110} rx={6} fill="#E0453A" stroke={INK} strokeWidth={4} />
    <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill="#fff">DRAGON</text>
    <text x={0} y={4} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#F5D547">QUEST</text>
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-70 + i * 18} y={70} width={10} height={30} fill="#E1B83F" />)}
  </g>
);

/** Present-day Jensen's look is in cast.ts; this places a seated figure behind the diner table. */
export const behindTable = (look: CharacterLook, x: number, sc = 1) => ({ ...look, x, y: 900, scale: sc });
export { Character };
