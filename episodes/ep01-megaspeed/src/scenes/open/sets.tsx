// Backgrounds and props for B01 · OPEN. Drawn in daylight colours; <Lighting> turns story sets to night.
import React from "react";
import { useCurrentFrame } from "remotion";
import { MiniChip } from "../../../../../kit/Character";
import { Defocus } from "../../../../../kit/look/cinematic";
import { HAND_FONT, INK } from "../../../../../kit/theme";

export const s = { stroke: INK, strokeWidth: 6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------------- Night sky + HQ exterior ---------------- */

export const NightSky: React.FC<{ h?: number }> = ({ h = 700 }) => (
  <g>
    <defs>
      <linearGradient id="openSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0B1030" />
        <stop offset="100%" stopColor="#3A3470" />
      </linearGradient>
    </defs>
    <rect width={1920} height={h} fill="url(#openSky)" />
    {Array.from({ length: 40 }).map((_, i) => (
      <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 70) * h * 0.55} r={1.5 + rnd(i + 9) * 2} fill="#fff" opacity={0.4 + rnd(i + 3) * 0.6} />
    ))}
  </g>
);

/** Wide shot: glass headquarters at night, a tiny figure walking out with a box. */
export const HQExterior: React.FC = () => {
  const rows = 6;
  const cols = 16;
  return (
    <g>
      <NightSky h={760} />
      <Defocus amount={2}>
        {/* far trees */}
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={i * 150 + 30} cy={700} r={70 + rnd(i) * 30} fill="#5E7A62" />
        ))}
      </Defocus>
      {/* building: angled roof, glass grid */}
      <path d="M 260 760 L 260 300 L 960 190 L 1660 300 L 1660 760 Z" fill="#B9C3C9" {...s} />
      {Array.from({ length: rows * cols }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = 300 + c * 82;
        const y = 330 + r * 66 + Math.abs(c - 7.5) * 6;
        const lit = rnd(i + 11) > 0.72;
        return <rect key={i} x={x} y={y} width={66} height={50} fill={lit ? "#FFE3A3" : "#7F909C"} stroke="#5B6872" strokeWidth={3} />;
      })}
      {/* sign */}
      <rect x={760} y={238} width={400} height={64} rx={8} fill="#2A2F3A" stroke={INK} strokeWidth={5} />
      <text x={960} y={287} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} letterSpacing={10} fill="#B6F07A">NVIDIA</text>
      {/* entrance */}
      <rect x={880} y={600} width={160} height={160} fill="#FFE9B8" {...s} />
      <path d="M 960 600 L 960 760" stroke={INK} strokeWidth={4} />
      {/* plaza */}
      <rect x={0} y={760} width={1920} height={320} fill="#8E8A82" />
      <path d="M 0 760 L 1920 760" {...s} />
      <path d="M 860 1080 L 900 760 L 1020 760 L 1060 1080 Z" fill="#A39E94" />
      {/* lamp posts */}
      {[420, 1500].map((x) => (
        <g key={x}>
          <path d={`M ${x} 1000 L ${x} 640`} {...s} strokeWidth={9} />
          <path d={`M ${x - 30} 640 L ${x + 30} 640`} {...s} strokeWidth={9} />
          <ellipse cx={x} cy={650} rx={26} ry={10} fill="#FFF3C4" />
        </g>
      ))}
    </g>
  );
};

/* ---------------- Jensen's office (from lab LookDev, kept local) ---------------- */

export const WIN = { x: 1090, y: 120, w: 700, h: 500 };

const Skyline: React.FC = () => {
  const towers = [
    { x: 0, w: 120, h: 300 }, { x: 110, w: 90, h: 210 }, { x: 190, w: 150, h: 380 }, { x: 330, w: 100, h: 260 },
    { x: 420, w: 130, h: 330 }, { x: 540, w: 80, h: 190 }, { x: 610, w: 110, h: 290 },
  ];
  return (
    <g>
      <defs>
        <clipPath id="openWinClip"><rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} /></clipPath>
      </defs>
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="#1E2250" />
      <g clipPath="url(#openWinClip)">
        <circle cx={WIN.x + 560} cy={WIN.y + 90} r={38} fill="#F4F1DC" />
        {towers.map((t, ti) => {
          const top = WIN.y + WIN.h - t.h;
          const cols = Math.floor((t.w - 16) / 22);
          const rows = Math.floor((t.h - 16) / 26);
          return (
            <g key={ti}>
              <rect x={WIN.x + t.x} y={top} width={t.w} height={t.h} fill={ti % 2 ? "#141A38" : "#1B2247"} />
              {Array.from({ length: cols * rows }).map((_, i) =>
                rnd(ti * 100 + i) > 0.58 ? (
                  <rect key={i} x={WIN.x + t.x + 10 + (i % cols) * 22} y={top + 12 + Math.floor(i / cols) * 26} width={13} height={15} fill={rnd(ti * 31 + i) > 0.7 ? "#9FE8FF" : "#FFD98A"} />
                ) : null,
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export const NightOffice: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1920} height={810} fill="#93A0A8" />
    {[160, 480, 800].map((x) => <path key={x} d={`M ${x} 0 L ${x} 810`} stroke="#86939B" strokeWidth={10} />)}
    <rect x={0} y={770} width={1920} height={40} fill="#6F7B83" {...s} strokeWidth={4} />
    <rect x={0} y={810} width={1920} height={270} fill="#8D7159" />
    {[870, 940, 1010].map((y) => <path key={y} d={`M 0 ${y} L 1920 ${y}`} stroke="#7B614B" strokeWidth={4} />)}
    <path d="M 0 810 L 1920 810" {...s} />
    <Defocus amount={3.5}><Skyline /></Defocus>
    <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="none" {...s} strokeWidth={14} stroke="#2A2F3A" />
    <path d={`M ${WIN.x + WIN.w / 2} ${WIN.y} L ${WIN.x + WIN.w / 2} ${WIN.y + WIN.h} M ${WIN.x} ${WIN.y + WIN.h / 2} L ${WIN.x + WIN.w} ${WIN.y + WIN.h / 2}`} stroke="#2A2F3A" strokeWidth={10} />
    <rect x={WIN.x - 26} y={WIN.y + WIN.h} width={WIN.w + 52} height={24} fill="#D9D5CC" {...s} strokeWidth={5} />
    {/* empty shelf: the awards are already packed */}
    <rect x={210} y={250} width={420} height={16} fill="#6B4A31" {...s} strokeWidth={5} />
    <rect x={232} y={214} width={30} height={36} fill="#3A3F48" stroke={INK} strokeWidth={4} />
    {/* desk */}
    <rect x={230} y={640} width={700} height={34} fill="#7A5536" {...s} />
    <rect x={260} y={674} width={640} height={170} fill="#6A4A30" {...s} />
    <rect x={380} y={430} width={240} height={170} rx={10} fill="#0F1A14" {...s} />
    <path d="M 404 560 L 450 520 L 484 540 L 530 482 L 562 505 L 598 452" stroke="#7CFF6B" strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M 500 600 L 500 640 M 450 640 L 550 640" {...s} />
    <path d="M 842 640 L 842 560 L 790 500" {...s} strokeWidth={8} fill="none" />
    <ellipse cx={842} cy={640} rx={40} ry={9} fill="#2A2F3A" {...s} strokeWidth={5} />
    <path d="M 742 512 L 808 474 L 826 520 L 770 548 Z" fill="#3E6B4F" {...s} strokeWidth={5} />
    <ellipse cx={792} cy={534} rx={22} ry={9} fill="#FFF3C4" transform="rotate(-27 792 534)" />
  </g>
);

/** Cardboard box held at chest height. Same transform as the character it belongs to. */
export const Box: React.FC<{ x: number; y: number; scale: number }> = ({ x, y, scale }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -104 -206 L 104 -206 L 96 -92 L -96 -92 Z" fill="#C79A63" {...s} strokeWidth={5} />
    <path d="M -104 -206 L -128 -232 L 80 -232 L 104 -206 Z" fill="#B4854F" {...s} strokeWidth={5} />
    <path d="M -30 -206 L -30 -92" stroke={INK} strokeWidth={3} opacity={0.35} />
    <path d="M 40 -232 q -20 -50 -6 -86 M 44 -232 q 18 -40 44 -52" stroke="#3E6B4F" strokeWidth={9} fill="none" strokeLinecap="round" />
    <rect x={-84} y={-286} width={62} height={56} fill="#F6F1E7" stroke={INK} strokeWidth={4} transform="rotate(-8 -52 -258)" />
    {/* trophy poking out */}
    <path d="M -10 -300 L 26 -300 L 20 -262 L -4 -262 Z" fill="#E1B83F" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

/* ---------------- Top-down desk with a case file ---------------- */

export const TopDownDesk: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#7A5536" />
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d={`M 0 ${i * 96 + 30} q 480 ${rnd(i) * 30 - 15} 960 0 t 960 0`} stroke="#6A4A30" strokeWidth={6} fill="none" />
    ))}
    {/* scattered papers, coffee ring, pen */}
    <rect x={200} y={140} width={360} height={460} fill="#F2EDE2" stroke={INK} strokeWidth={5} transform="rotate(-9 380 370)" />
    {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M 250 ${220 + i * 50} L ${470 - rnd(i) * 80} ${220 + i * 50}`} stroke="#9A9488" strokeWidth={8} strokeLinecap="round" transform="rotate(-9 380 370)" />)}
    <circle cx={1620} cy={260} r={90} fill="none" stroke="#5E3F27" strokeWidth={10} opacity={0.6} />
    <rect x={1460} y={760} width={330} height={22} rx={10} fill="#2E3A57" stroke={INK} strokeWidth={5} transform="rotate(28 1625 771)" />
  </g>
);

export const CaseFile: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -380 -250 L -150 -250 L -120 -290 L 60 -290 L 90 -250 L 380 -250 L 380 250 L -380 250 Z" fill="#D9B26F" {...s} />
    <rect x={-330} y={-170} width={330} height={60} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
    <text x={-165} y={-127} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>CASE FILE</text>
    <text x={130} y={60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={110} fill="#B5483A" opacity={0.85} transform="rotate(-12 130 60)">CONFIDENTIAL</text>
    <rect x={-10} y={-24} width={290} height={140} fill="none" stroke="#B5483A" strokeWidth={8} opacity={0.85} transform="rotate(-12 130 60)" />
  </g>
);

/* ---------------- Dim corridor for the unnamed woman ---------------- */

export const Corridor: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#8C949C" />
    {/* receding walls */}
    <path d="M 0 0 L 700 330 L 700 760 L 0 1080 Z" fill="#7E868E" {...s} />
    <path d="M 1920 0 L 1220 330 L 1220 760 L 1920 1080 Z" fill="#7E868E" {...s} />
    <rect x={700} y={330} width={520} height={430} fill="#A9B0B6" {...s} />
    <path d="M 0 1080 L 700 760 L 1220 760 L 1920 1080 Z" fill="#6D6A66" {...s} />
    {/* doors on the side walls */}
    {[[160, 360, 220], [420, 470, 150]].map(([x, y, h], i) => (
      <g key={i}>
        <path d={`M ${x} ${y} L ${x + 90 - i * 20} ${y + 40 - i * 10} L ${x + 90 - i * 20} ${y + 40 + h + 220 - i * 120} L ${x} ${y + h + 260 - i * 110} Z`} fill="#5D646B" stroke={INK} strokeWidth={5} />
      </g>
    ))}
    {/* ceiling light fixture at the end */}
    <rect x={900} y={300} width={120} height={14} fill="#E8F0FF" stroke={INK} strokeWidth={4} />
  </g>
);

/* ---------------- Bright explainer limbo ---------------- */

export const Limbo: React.FC<{ color?: string; floor?: string }> = ({ color = "#EDE6D6", floor = "#E2D9C5" }) => (
  <g>
    <rect width={1920} height={1080} fill={color} />
    <path d="M 0 790 Q 960 740 1920 790 L 1920 1080 L 0 1080 Z" fill={floor} />
  </g>
);

/** The export-control wall: stacked paper bricks. `crack` 0..1 opens a hole that leaks chips. */
export const PaperWall: React.FC<{ x: number; y: number; w: number; h: number; crack?: number }> = ({ x, y, w, h, crack = 0 }) => {
  const frame = useCurrentFrame();
  const bw = 150;
  const bh = 64;
  const rows = Math.ceil(h / bh);
  const cols = Math.ceil(w / bw) + 1;
  const hx = x + w * 0.62;
  const hy = y + h * 0.62;
  return (
    <g>
      <defs><clipPath id="wallClip"><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
      <g clipPath="url(#wallClip)">
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const bx = x + c * bw - (r % 2 ? bw / 2 : 0);
          const by = y + h - (r + 1) * bh;
          return (
            <g key={i}>
              <rect x={bx} y={by} width={bw} height={bh} fill={rnd(i) > 0.8 ? "#E9E1CF" : "#F6F1E7"} stroke={INK} strokeWidth={4} />
              <path d={`M ${bx + 20} ${by + 24} L ${bx + 110 - rnd(i + 4) * 40} ${by + 24} M ${bx + 20} ${by + 42} L ${bx + 90} ${by + 42}`} stroke="#B9B2A4" strokeWidth={5} strokeLinecap="round" />
            </g>
          );
        })}
      </g>
      <rect x={x} y={y} width={w} height={h} fill="none" {...s} />
      <rect x={x + w / 2 - 230} y={y - 70} width={460} height={78} rx={10} fill="#2D4A8A" stroke={INK} strokeWidth={5} />
      <text x={x + w / 2} y={y - 16} textAnchor="middle" fontFamily={HAND_FONT} fontSize={54} letterSpacing={4} fill="#fff">EXPORT RULES</text>
      {crack > 0 && (
        <g>
          {/* jagged crack running across the bricks, then a ragged hole */}
          <path
            d={`M ${hx - 260 * crack} ${hy - 150 * crack} l ${60 * crack} ${40 * crack} l ${-20 * crack} ${35 * crack} l ${80 * crack} ${30 * crack} l ${-10 * crack} ${30 * crack} l ${150 * crack} ${15 * crack} M ${hx + 40 * crack} ${hy} l ${70 * crack} ${-50 * crack} l ${-15 * crack} ${-40 * crack} l ${90 * crack} ${-60 * crack}`}
            stroke="#5A5248" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d={`M ${hx - 44 * crack} ${hy} l ${18 * crack} ${-24 * crack} l ${30 * crack} ${6 * crack} l ${26 * crack} ${-14 * crack} l ${18 * crack} ${30 * crack} l ${-14 * crack} ${26 * crack} l ${-34 * crack} ${-4 * crack} l ${-30 * crack} ${10 * crack} Z`}
            fill="#2A2622" stroke={INK} strokeWidth={4} strokeLinejoin="round"
          />
          {/* chips trickling out and piling up */}
          {Array.from({ length: 16 }).map((_, i) => {
            const t = ((frame * 2.2 + i * 13) % 60) / 60;
            const fall = Math.min(1, t * 1.4);
            const cx = hx + 40 + t * 120 + rnd(i) * 20;
            const cy = hy + fall * fall * (y + h - hy + 40);
            return crack > 0.6 ? <g key={i} transform={`translate(${cx} ${cy}) rotate(${t * 300 + i * 20}) scale(0.5)`}><MiniChip size={44} /></g> : null;
          })}
          {crack > 0.6 && Array.from({ length: 9 }).map((_, i) => (
            <g key={`p${i}`} transform={`translate(${hx + 120 + (i % 5) * 34 - 10} ${y + h + 26 - Math.floor(i / 5) * 20}) rotate(${rnd(i) * 60 - 30}) scale(0.55)`}><MiniChip size={44} /></g>
          ))}
        </g>
      )}
    </g>
  );
};

/* ---------------- Number shots ---------------- */

export const NumberBack: React.FC<{ color?: string }> = ({ color = "#1C2142" }) => (
  <g>
    <defs>
      <radialGradient id="numBack" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#0C0E1E" />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#numBack)" />
  </g>
);

/* ---------------- Brick wall + wanted poster ---------------- */

export const BrickAlley: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#A86B55" />
    {Array.from({ length: 22 * 14 }).map((_, i) => {
      const r = Math.floor(i / 14);
      const c = i % 14;
      return <rect key={i} x={c * 150 - (r % 2 ? 75 : 0)} y={r * 50} width={150} height={50} fill={rnd(i) > 0.75 ? "#9A604B" : "#A86B55"} stroke="#7A4A3A" strokeWidth={4} />;
    })}
    <rect x={0} y={900} width={1920} height={180} fill="#6E6A66" />
    <path d="M 0 900 L 1920 900" {...s} />
    {/* drainpipe */}
    <rect x={1640} y={0} width={44} height={900} fill="#7D8790" stroke={INK} strokeWidth={5} />
  </g>
);

export const WantedPoster: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = -3 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-300} y={-390} width={600} height={780} fill="#EAD9B0" {...s} />
    <circle cx={0} cy={-370} r={12} fill="#B5483A" stroke={INK} strokeWidth={4} />
    <text x={0} y={-280} textAnchor="middle" fontFamily={HAND_FONT} fontSize={130} letterSpacing={6} fill="#3A2A1E">WANTED</text>
    <rect x={-170} y={-240} width={340} height={260} fill="#F4E8C8" stroke={INK} strokeWidth={5} />
    <g transform="translate(0 -110) scale(3.2)"><MiniChip size={52} /></g>
    <text x={0} y={-90} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill="#fff" opacity={0}>.</text>
    <text x={0} y={90} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill="#3A2A1E">AI CHIPS, VERY FAST</text>
    <text x={0} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={120} fill="#B5483A">240,000</text>
    <text x={0} y={300} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#3A2A1E">LAST SEEN: ???</text>
  </g>
);

/* ---------------- Warehouse ---------------- */

export const Warehouse: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#8E9499" />
    {/* roof trusses */}
    {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M ${i * 400 - 100} 0 L ${i * 400 + 100} 260`} stroke="#6E747A" strokeWidth={14} />)}
    <path d="M 0 260 L 1920 260" stroke="#6E747A" strokeWidth={14} />
    <rect x={0} y={860} width={1920} height={220} fill="#6F6B66" />
    <path d="M 0 860 L 1920 860" {...s} />
    {/* rows of crates, stacked */}
    {Array.from({ length: 24 }).map((_, i) => {
      const col = i % 8;
      const lvl = Math.floor(i / 8);
      const x = 80 + col * 230;
      const y = 860 - (lvl + 1) * 170;
      if (lvl === 2 && rnd(i) > 0.5) return null;
      return (
        <g key={i}>
          <rect x={x} y={y} width={210} height={170} fill="#C79A63" stroke={INK} strokeWidth={5} />
          <path d={`M ${x} ${y} L ${x + 210} ${y + 170} M ${x + 210} ${y} L ${x} ${y + 170}`} stroke="#A57E4E" strokeWidth={6} />
          <rect x={x + 60} y={y + 60} width={90} height={44} fill="#F6F1E7" stroke={INK} strokeWidth={3} />
          <text x={x + 105} y={y + 92} textAnchor="middle" fontFamily={HAND_FONT} fontSize={26} fill={INK}>GPU</text>
        </g>
      );
    })}
  </g>
);

/* ---------------- Diner booth ---------------- */

/**
 * Diner booth. part="back" = room + booth seats + lamp; part="front" = table, mug, pie and the near booth back
 * (put characters between the two so the table hides their legs). "all" = both, empty booth.
 */
export const Diner: React.FC<{ part?: "all" | "back" | "front"; mug?: boolean; foreground?: boolean }> = ({ part = "all", mug = true, foreground = false }) => {
  const frame = useCurrentFrame();
  const steam = (i: number) => Math.sin(frame / 8 + i) * 8;
  const back = part !== "front";
  const front = part !== "back";
  return (
    <g>
      {back && <g>
      {/* wall + window */}
      <rect width={1920} height={1080} fill="#D9C7A8" />
      <rect x={0} y={620} width={1920} height={60} fill="#B5483A" />
      <rect x={420} y={120} width={1080} height={420} fill="#1E2250" {...s} strokeWidth={12} stroke="#5E5E66" />
      <path d="M 960 120 L 960 540" stroke="#5E5E66" strokeWidth={12} />
      <text x={690} y={370} textAnchor="middle" fontFamily={HAND_FONT} fontSize={130} letterSpacing={10} fill="#FF7A8A">DINER</text>
      <text x={1230} y={370} textAnchor="middle" fontFamily={HAND_FONT} fontSize={90} fill="#8FE3FF">OPEN</text>
      {/* pendant lamp over the table */}
      <path d="M 960 0 L 960 360" stroke={INK} strokeWidth={5} />
      <path d="M 880 420 L 1040 420 L 1000 360 L 920 360 Z" fill="#3E6B4F" {...s} strokeWidth={5} />
      <ellipse cx={960} cy={422} rx={60} ry={10} fill="#FFF3C4" />
      {/* booth seats */}
      <path d="M 120 1080 L 120 560 Q 120 500 180 500 L 420 500 Q 470 500 470 560 L 470 760 L 520 760 L 520 1080 Z" fill="#B5483A" {...s} />
      <path d="M 1800 1080 L 1800 560 Q 1800 500 1740 500 L 1500 500 Q 1450 500 1450 560 L 1450 760 L 1400 760 L 1400 1080 Z" fill="#B5483A" {...s} />
      {[200, 290, 380].map((x) => <path key={x} d={`M ${x} 520 L ${x} 740`} stroke="#8E3328" strokeWidth={6} />)}
      {[1540, 1630, 1720].map((x) => <path key={x} d={`M ${x} 520 L ${x} 740`} stroke="#8E3328" strokeWidth={6} />)}
      </g>}
      {front && <g>
      {/* table */}
      <rect x={540} y={700} width={840} height={46} rx={10} fill="#E9E4D8" {...s} />
      <path d="M 960 746 L 960 1080" {...s} strokeWidth={22} />
      {/* coffee mug + napkin */}
      <rect x={760} y={712} width={150} height={10} fill="#fff" stroke={INK} strokeWidth={3} />
      {mug && <g>
      <path d="M 1000 600 L 1110 600 L 1100 706 L 1010 706 Z" fill="#fff" {...s} strokeWidth={5} />
      <path d="M 1110 625 q 40 10 0 50" stroke={INK} strokeWidth={6} fill="none" />
      <ellipse cx={1055} cy={604} rx={52} ry={10} fill="#5E3F27" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${1030 + i * 25 + steam(i)} 590 q -18 -30 0 -60 q 18 -30 0 -60`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.7} strokeLinecap="round" />
      ))}
      </g>}
      {/* pie slice */}
      <path d="M 640 700 L 720 640 L 740 700 Z" fill="#E1B83F" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      {foreground && <path d="M 300 1080 L 300 900 Q 300 860 350 860 L 1570 860 Q 1620 860 1620 900 L 1620 1080 Z" fill="#9E3E31" {...s} />}
      </g>}
    </g>
  );
};
