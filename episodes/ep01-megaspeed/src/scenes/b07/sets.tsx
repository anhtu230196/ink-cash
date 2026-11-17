// Sets and props for B07a · WHAT THEY ALLEGEDLY WANTED (passport back → the memo → the listeners → what the memo alleged).
import React from "react";
import { useCurrentFrame } from "remotion";
import { MiniChip } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Long table in a dark room ---------------- */
export const LongTable: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#1C1E2C" />
    <rect x={0} y={0} width={1920} height={520} fill="#24273A" />
    {/* wood panels */}
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 240 + 20} y={80} width={200} height={380} fill="#2C2F44" stroke="#1A1C28" strokeWidth={4} />)}
    {/* table in perspective */}
    <path d="M 760 520 L 1160 520 L 1900 1080 L 20 1080 Z" fill="#4A3426" stroke={INK} strokeWidth={6} />
    <path d="M 960 520 L 960 1080" stroke="#5A4030" strokeWidth={4} />
    {/* chairs + silhouettes on both sides */}
    {[0, 1, 2].map((i) => {
      const t = 0.25 + i * 0.25;
      const y = 520 + t * 560;
      const lx = 760 - t * 740 - 80;
      const rx = 1160 + t * 740 + 80;
      const sc = 0.6 + t * 0.7;
      return (
        <g key={i}>
          {[lx, rx].map((x, k) => (
            <g key={k} transform={`translate(${x} ${y}) scale(${sc})`}>
              <circle cx={0} cy={-200} r={50} fill="#101220" />
              <path d="M -90 40 Q -90 -140 0 -140 Q 90 -140 90 40 Z" fill="#101220" />
            </g>
          ))}
        </g>
      );
    })}
  </g>
);

export const TopSecretFolder: React.FC<{ x: number; y: number; scale?: number; rot?: number; open?: boolean }> = ({ x, y, scale = 1, rot = 0, open }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-220} y={-150} width={440} height={300} rx={10} fill="#C9A15B" stroke={INK} strokeWidth={6} />
    <path d="M -220 -150 L -220 -180 L -60 -180 L -40 -150" fill="#C9A15B" stroke={INK} strokeWidth={6} />
    {open && <rect x={-200} y={-130} width={400} height={260} fill="#FBF7EE" stroke={INK} strokeWidth={4} />}
    <g transform="rotate(-8)">
      <rect x={-170} y={-40} width={340} height={80} rx={8} fill="none" stroke="#C0392B" strokeWidth={8} />
      <text x={0} y={20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#C0392B" letterSpacing={4}>TOP SECRET</text>
    </g>
  </g>
);

/* ---------------- Airport at night: a plane leaving + departures board ---------------- */
export const Airport: React.FC<{ takeoff: number }> = ({ takeoff }) => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={760} width={1920} height={320} fill="#2A2E38" />
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={i * 170 + 40} cy={800} r={6} fill="#F5D547" />)}
    <g transform={`translate(${300 + takeoff * 1500} ${720 - takeoff * takeoff * 560}) rotate(${-takeoff * 14})`}>
      <path d="M -220 0 Q -220 -40 -160 -46 L 180 -46 Q 240 -40 250 -10 Q 240 10 180 12 L -160 12 Q -220 10 -220 0 Z" fill="#E9E2D2" {...s} />
      <path d="M -40 -20 L 60 -20 L 0 60 L -60 60 Z" fill="#C9CDD2" stroke={INK} strokeWidth={4} />
      <path d="M -200 -40 L -230 -110 L -170 -110 L -140 -40 Z" fill="#C9CDD2" stroke={INK} strokeWidth={4} />
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-120 + i * 46} cy={-22} r={8} fill="#FFE3A8" />)}
    </g>
    {/* departures board */}
    <rect x={1260} y={140} width={580} height={360} rx={12} fill="#14182A" stroke={INK} strokeWidth={6} />
    <text x={1300} y={200} fontFamily={HAND_FONT} fontSize={44} fill="#F5D547" letterSpacing={4}>DEPARTURES · SIN</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={1290} y={230 + i * 64} width={520} height={50} fill="#20263D" />
        <text x={1306} y={266 + i * 64} fontFamily={HAND_FONT} fontSize={32} fill={i === 1 ? "#9BFFB0" : "#8A93B0"}>{["FLIGHT 101 · ON TIME", "FLIGHT 202 · DEPARTED", "FLIGHT 303 · BOARDING", "FLIGHT 404 · DELAYED"][i]}</text>
      </g>
    ))}
  </g>
);

/* ---------------- Anonymous sources ---------------- */
export const Silhouette: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx={0} cy={-300} r={90} fill="#101220" />
    <path d="M -150 0 Q -150 -200 0 -200 Q 150 -200 150 0 Z" fill="#101220" />
  </g>
);

export const Waveform: React.FC<{ x: number; y: number; w: number; h: number; color?: string; seed?: number }> = ({ x, y, w, h, color = "#7DFFB0", seed = 0 }) => {
  const frame = useCurrentFrame();
  const n = Math.floor(w / 18);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = (0.2 + 0.8 * Math.abs(Math.sin(frame / 4 + i * 0.7 + seed) * rnd(i + seed))) * h;
        return <rect key={i} x={x + i * 18} y={y - a / 2} width={10} height={a} rx={4} fill={color} />;
      })}
    </g>
  );
};

/* ---------------- The memo page ---------------- */
export const MemoPage: React.FC<{ x: number; y: number; scale?: number; rot?: number; rows: string[]; hi?: number; title?: string }> = ({ x, y, scale = 1, rot = 0, rows, hi = -1, title = "MEMO" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-420} y={-300} width={840} height={600} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
    <rect x={-420} y={-300} width={840} height={70} fill="#C0392B" />
    <text x={0} y={-250} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#fff" letterSpacing={6}>CLASSIFIED</text>
    <text x={-370} y={-170} fontFamily={HAND_FONT} fontSize={50} fill={INK}>{title}</text>
    {rows.map((r, i) => (
      <g key={i}>
        {i === hi && <rect x={-380} y={-120 + i * 80} width={760} height={60} fill="#F5D547" opacity={0.6} />}
        <text x={-370} y={-76 + i * 80} fontFamily={HAND_FONT} fontSize={42} fill={INK}>{r}</text>
      </g>
    ))}
    {Array.from({ length: Math.max(0, 5 - rows.length) }).map((_, i) => (
      <rect key={`b${i}`} x={-370} y={-110 + (rows.length + i) * 80} width={560 + rnd(i) * 160} height={34} fill="#1A1A22" />
    ))}
  </g>
);

/* ---------------- Desk nameplate (no person) ---------------- */
export const DeskPlate: React.FC<{ x: number; y: number; text: string }> = ({ x, y, text }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -300 0 L 300 0 L 270 -90 L -270 -90 Z" fill="#3A2A1E" stroke={INK} strokeWidth={6} />
    <rect x={-250} y={-82} width={500} height={64} rx={6} fill="#C9A35A" stroke={INK} strokeWidth={4} />
    <text x={0} y={-36} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#2A1C10" letterSpacing={4}>{text}</text>
  </g>
);

/* ---------------- Big headphones on a desk ---------------- */
export const BigHeadphones: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -200 0 Q -200 -260 0 -260 Q 200 -260 200 0" stroke={INK} strokeWidth={40} fill="none" />
    <path d="M -200 0 Q -200 -260 0 -260 Q 200 -260 200 0" stroke="#3A3F44" strokeWidth={26} fill="none" />
    <rect x={-260} y={-40} width={110} height={170} rx={40} fill="#3A3F44" stroke={INK} strokeWidth={6} />
    <rect x={150} y={-40} width={110} height={170} rx={40} fill="#3A3F44" stroke={INK} strokeWidth={6} />
    <circle cx={205} cy={45} r={10} fill="#FF6B5A" />
  </g>
);

/* ---------------- A generic agency building (no landmark) ---------------- */
export const AgencyBuilding: React.FC<{ x: number; y: number; w: number; h: number; label: string; color?: string }> = ({ x, y, w, h, label, color = "#8A8F98" }) => (
  <g>
    <rect x={x} y={y - h} width={w} height={h} fill={color} {...s} />
    {Array.from({ length: Math.floor(h / 70) * Math.floor(w / 70) }).map((_, i) => {
      const cols = Math.floor(w / 70);
      return <rect key={i} x={x + 20 + (i % cols) * 70} y={y - h + 24 + Math.floor(i / cols) * 70} width={40} height={36} fill="#3A4060" />;
    })}
    <rect x={x + w / 2 - 160} y={y - 70} width={320} height={56} rx={6} fill="#14182A" stroke={INK} strokeWidth={4} />
    <text x={x + w / 2} y={y - 30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={32} fill="#F6F1E7">{label}</text>
  </g>
);

export const PressBox: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-160} width={240} height={160} fill="#C9CDD2" stroke={INK} strokeWidth={5} />
    <rect x={-90} y={-130} width={180} height={20} fill="#3A3F44" />
    <text x={0} y={-60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>PRESS</text>
    <text x={0} y={-24} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>RELEASES</text>
    <path d="M -120 -160 L -60 -100 M -120 -160 L -120 -90 M -120 -160 L -80 -120 M -100 -160 Q -96 -130 -120 -124" stroke="#F3F1E8" strokeWidth={3} fill="none" />
  </g>
);

/* ---------------- Chip blueprint ---------------- */
export const Blueprint: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-460} y={-300} width={920} height={600} fill="#2D5A9A" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M ${-460 + i * 80} -300 L ${-460 + i * 80} 300`} stroke="#4A78B8" strokeWidth={2} />)}
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M -460 ${-300 + i * 80} L 460 ${-300 + i * 80}`} stroke="#4A78B8" strokeWidth={2} />)}
    <rect x={-200} y={-200} width={400} height={400} fill="none" stroke="#E9F4F8" strokeWidth={6} />
    <rect x={-120} y={-120} width={240} height={240} fill="none" stroke="#E9F4F8" strokeWidth={4} strokeDasharray="14 10" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M ${-170 + i * 48} -200 L ${-170 + i * 48} -240 M ${-170 + i * 48} 200 L ${-170 + i * 48} 240`} stroke="#E9F4F8" strokeWidth={4} />)}
    <g transform="scale(2.4)"><MiniChip size={60} color="#9BD8FF" /></g>
    <text x={-430} y={270} fontFamily={HAND_FONT} fontSize={34} fill="#E9F4F8">ADVANCED AI CHIP · rev. 7</text>
  </g>
);
