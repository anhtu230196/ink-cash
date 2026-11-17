// Sets and props for B03 · THE LOCKED DOOR (paper wall → speed limit → slower chips → H20 → form seven → the math gets through).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { MiniChip } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Washington at night: a generic columned building (no landmark) ---------------- */
export const GovBuilding: React.FC = () => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={900} width={1920} height={180} fill="#2A2E3A" />
    {/* steps */}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={360 - i * 40} y={840 + i * 20} width={1200 + i * 80} height={22} fill="#C9C2B2" stroke={INK} strokeWidth={4} />)}
    <rect x={420} y={420} width={1080} height={420} fill="#E2DCCB" {...s} />
    {/* pediment */}
    <path d="M 380 420 L 960 220 L 1540 420 Z" fill="#ECE6D8" {...s} />
    <rect x={380} y={400} width={1160} height={34} fill="#D9D2C0" {...s} />
    {/* columns */}
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i}>
        <rect x={470 + i * 132} y={440} width={56} height={400} fill="#F3EFE4" stroke={INK} strokeWidth={4} />
        <path d={`M ${485 + i * 132} 450 L ${485 + i * 132} 830 M ${511 + i * 132} 450 L ${511 + i * 132} 830`} stroke="#C9C2B2" strokeWidth={3} />
      </g>
    ))}
    {/* lit windows behind the columns: people working late on paperwork */}
    {Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} x={540 + i * 132} y={560} width={50} height={120} fill={rnd(i) > 0.3 ? "#FFD98A" : "#3A3F52"} stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

/* ---------------- The Pacific, with a paper wall down the middle ---------------- */
export const Ocean: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#5B9BD5" />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = (rnd(i) * 2100 + frame * 1.2) % 2100 - 100;
        const y = 80 + rnd(i + 9) * 940;
        return <path key={i} d={`M ${x} ${y} q 20 -14 40 0 q 20 14 40 0`} stroke="#9CC6EC" strokeWidth={5} fill="none" strokeLinecap="round" />;
      })}
      {/* Asia (left), North America (right): loose blobs, not maps */}
      <path d="M 0 0 L 330 0 Q 380 160 300 300 Q 400 420 330 560 Q 260 700 360 860 Q 300 980 330 1080 L 0 1080 Z" fill="#C9B47A" stroke={INK} strokeWidth={6} />
      <path d="M 1920 0 L 1620 0 Q 1560 200 1640 380 Q 1560 560 1610 760 Q 1660 920 1600 1080 L 1920 1080 Z" fill="#9CC17A" stroke={INK} strokeWidth={6} />
      <text x={150} y={520} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill={INK}>CHINA</text>
      <text x={1770} y={520} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill={INK}>USA</text>
    </g>
  );
};

/** A vertical paper-brick wall, built bottom-up. `built` 0..1. */
export const PaperColumn: React.FC<{ x: number; w: number; top: number; bottom: number; built: number }> = ({ x, w, top, bottom, built }) => {
  const bh = 52;
  const rows = Math.ceil((bottom - top) / bh);
  const shown = Math.floor(rows * built);
  return (
    <g>
      {Array.from({ length: shown }).map((_, r) => {
        const y = bottom - (r + 1) * bh;
        const off = r % 2 ? -w / 4 : 0;
        return (
          <g key={r}>
            {[0, 1, 2].map((c) => {
              const bx = x + off + c * (w / 2);
              const bw = Math.min(w / 2, x + w - bx);
              const cx = Math.max(bx, x);
              const cw = Math.min(bx + w / 2, x + w) - cx;
              if (cw <= 4 || bw <= 0) return null;
              return (
                <g key={c}>
                  <rect x={cx} y={y} width={cw} height={bh} fill={rnd(r * 3 + c) > 0.8 ? "#E9E1CF" : "#F6F1E7"} stroke={INK} strokeWidth={4} />
                  <path d={`M ${cx + 12} ${y + 20} L ${cx + cw - 16} ${y + 20} M ${cx + 12} ${y + 34} L ${cx + cw * 0.6} ${y + 34}`} stroke="#B9B2A4" strokeWidth={4} strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

/** Close-up of the wall: every brick is a form. */
export const FormBricks: React.FC = () => {
  const frame = useCurrentFrame();
  const labels = ["FORM 7", "§ 744", "ANNEX B", "LICENSE?", "FORM 7-B", "APPENDIX", "SEE ALSO", "DENIED", "PENDING", "§ 734.9", "FORM 12", "STAMP HERE"];
  return (
    <g>
      <rect width={1920} height={1080} fill="#D9D2C0" />
      {Array.from({ length: 7 * 6 }).map((_, i) => {
        const r = Math.floor(i / 6);
        const c = i % 6;
        const x = c * 360 - (r % 2 ? 180 : 0) - 40;
        const y = r * 160 - 20;
        const flap = i === 15 ? Math.sin(frame / 3) * 8 : 0;
        return (
          <g key={i} transform={`rotate(${flap} ${x + 170} ${y})`}>
            <rect x={x} y={y} width={350} height={150} fill={rnd(i) > 0.75 ? "#EDE4CF" : "#FBF7EE"} stroke={INK} strokeWidth={5} />
            <text x={x + 24} y={y + 50} fontFamily={HAND_FONT} fontSize={36} fill={labels[i % labels.length] === "DENIED" ? "#B5483A" : INK}>{labels[i % labels.length]}</text>
            {[0, 1, 2].map((k) => <path key={k} d={`M ${x + 24} ${y + 80 + k * 22} L ${x + 300 - rnd(i + k) * 120} ${y + 80 + k * 22}`} stroke="#B9B2A4" strokeWidth={5} strokeLinecap="round" />)}
          </g>
        );
      })}
    </g>
  );
};

/* ---------------- Crates and stamps ---------------- */
export const Crate: React.FC<{ x: number; y: number; label?: string; scale?: number; cobweb?: boolean; open?: boolean }> = ({ x, y, label = "GPU", scale = 1, cobweb, open }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {open && <path d="M -110 -170 L -150 -230 L -10 -230 L 0 -170 M 110 -170 L 150 -230 L 10 -230" fill="#B88A55" stroke={INK} strokeWidth={5} strokeLinejoin="round" />}
    <rect x={-110} y={-170} width={220} height={170} fill="#C79A63" stroke={INK} strokeWidth={5} />
    {!open && <path d="M -110 -170 L 110 0 M 110 -170 L -110 0" stroke="#A57E4E" strokeWidth={6} />}
    {open && <rect x={-96} y={-166} width={192} height={30} fill="#5A3E2B" />}
    <rect x={-80} y={-110} width={160} height={50} fill="#F6F1E7" stroke={INK} strokeWidth={3} />
    <text x={0} y={-74} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>{label}</text>
    {cobweb && <path d="M -110 -170 L -40 -170 M -110 -170 L -110 -100 M -110 -170 L -60 -120 M -80 -170 Q -90 -140 -110 -130 M -55 -170 Q -70 -125 -110 -112" stroke="#F3F1E8" strokeWidth={3} fill="none" />}
  </g>
);

export const StampMark: React.FC<{ x: number; y: number; text: string; show: number; rot?: number; size?: number }> = ({ x, y, text, show, rot = -12, size = 110 }) => {
  if (show <= 0) return null;
  const sc = 1 + (1 - show) * 1.4;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={Math.min(1, show * 1.5)}>
      <rect x={-text.length * size * 0.29 - 30} y={-size * 0.75} width={text.length * size * 0.58 + 60} height={size * 1.2} rx={14} fill="none" stroke="#C0392B" strokeWidth={12} />
      <text x={0} y={size * 0.3} textAnchor="middle" fontFamily={HAND_FONT} fontSize={size} fill="#C0392B" letterSpacing={6}>{text}</text>
    </g>
  );
};

/* ---------------- Highway + chip speed-limit sign ---------------- */
export const Highway: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#BFDDF2" />
      <path d="M 0 620 Q 400 520 900 600 Q 1400 520 1920 600 L 1920 720 L 0 720 Z" fill="#9CC17A" stroke={INK} strokeWidth={5} />
      <rect x={0} y={700} width={1920} height={240} fill="#5E6268" stroke={INK} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={((i * 220 - frame * 4) % 2400 + 2400) % 2400 - 200} y={812} width={120} height={14} fill="#F6F1E7" />)}
      <rect x={0} y={940} width={1920} height={140} fill="#8DB46A" />
    </g>
  );
};

/** Speed-limit sign with a little gauge: the red mark is the limit (0..1 of the dial), no fake numbers. */
export const SpeedSign: React.FC<{ x: number; y: number; limit: number; scale?: number }> = ({ x, y, limit, scale = 1 }) => {
  const a = Math.PI * (1 - limit);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-12} y={0} width={24} height={330} fill="#9AA0A6" stroke={INK} strokeWidth={4} />
      <rect x={-170} y={-330} width={340} height={350} rx={18} fill="#F6F1E7" stroke={INK} strokeWidth={7} />
      <text x={0} y={-276} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>CHIP SPEED</text>
      <text x={0} y={-232} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>LIMIT</text>
      <text x={0} y={-192} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">(to China)</text>
      <path d="M -120 -20 A 120 120 0 0 1 120 -20" fill="none" stroke={INK} strokeWidth={8} />
      <path d={`M ${Math.cos(a) * 120} ${-20 - Math.sin(a) * 120} A 120 120 0 0 1 120 -20`} fill="none" stroke="#C0392B" strokeWidth={22} />
      <path d={`M 0 -20 L ${Math.cos(a) * 100} ${-20 - Math.sin(a) * 100}`} stroke="#C0392B" strokeWidth={8} strokeLinecap="round" />
      <circle cx={0} cy={-20} r={12} fill={INK} />
    </g>
  );
};

/** Hand-held radar gun with a small readout. */
export const RadarGun: React.FC<{ x: number; y: number; text: string; color: string }> = ({ x, y, text, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-40} width={170} height={80} rx={16} fill="#3A3F44" stroke={INK} strokeWidth={5} />
    <rect x={-20} y={30} width={40} height={90} rx={8} fill="#3A3F44" stroke={INK} strokeWidth={5} />
    <rect x={-136} y={-28} width={120} height={56} rx={6} fill="#10261A" />
    <text x={-76} y={12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={color}>{text}</text>
  </g>
);

/* ---------------- Export license ---------------- */
export const LicenseCard: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-460} y={-280} width={920} height={560} rx={36} fill="#F6F1E7" stroke={INK} strokeWidth={8} />
    <rect x={-460} y={-280} width={920} height={110} rx={36} fill="#2D4A8A" stroke={INK} strokeWidth={8} />
    <rect x={-456} y={-200} width={912} height={30} fill="#2D4A8A" />
    <text x={0} y={-208} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill="#fff" letterSpacing={3}>FEDERAL EXPORT LICENSE</text>
    <rect x={-400} y={-130} width={280} height={330} rx={12} fill="#DCE8D6" stroke={INK} strokeWidth={5} />
    <g transform="translate(-260 30) scale(3.2)"><MiniChip size={60} /></g>
    {[["HOLDER", "one very fast chip"], ["DESTINATION", "China"], ["STATUS", "pending…"]].map(([k, v], i) => (
      <g key={k}>
        <text x={-70} y={-80 + i * 110} fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">{k}</text>
        <text x={-70} y={-36 + i * 110} fontFamily={HAND_FONT} fontSize={48} fill={INK}>{v}</text>
      </g>
    ))}
  </g>
);

/* ---------------- Speed dial (engineers turning chips down) ---------------- */
export const SpeedDial: React.FC<{ x: number; y: number; value: number; scale?: number; label?: string }> = ({ x, y, value, scale = 1, label = "SPEED" }) => {
  const a = Math.PI * (1 - value);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M -220 0 A 220 220 0 0 1 220 0 L 220 40 L -220 40 Z" fill="#F6F1E7" stroke={INK} strokeWidth={8} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = Math.PI * (1 - i / 10);
        return <path key={i} d={`M ${Math.cos(t) * 190} ${-Math.sin(t) * 190} L ${Math.cos(t) * 165} ${-Math.sin(t) * 165}`} stroke={INK} strokeWidth={i % 5 ? 4 : 8} />;
      })}
      <path d="M 120 -186 A 220 220 0 0 1 220 0" stroke="#C0392B" strokeWidth={0} fill="none" />
      <path d={`M 0 0 L ${Math.cos(a) * 170} ${-Math.sin(a) * 170}`} stroke="#C0392B" strokeWidth={12} strokeLinecap="round" />
      <circle cx={0} cy={0} r={20} fill={INK} />
      <text x={0} y={-70} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">{label}</text>
      <text x={-180} y={34} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">slow</text>
      <text x={180} y={34} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">fast</text>
    </g>
  );
};

export const Workbench: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#DCE3E8" />
    {/* pegboard with tools */}
    <rect x={120} y={80} width={1680} height={460} fill="#C9B79A" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={160 + (i % 20) * 82} cy={120 + Math.floor(i / 20) * 150} r={5} fill="#8A7A60" />)}
    <path d="M 300 160 L 300 380 M 270 160 L 330 160" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path d="M 1580 150 L 1640 360" stroke="#7A8088" strokeWidth={22} strokeLinecap="round" />
    <circle cx={1580} cy={150} r={32} fill="none" stroke="#7A8088" strokeWidth={16} />
    <rect x={0} y={760} width={1920} height={60} fill="#B88A55" stroke={INK} strokeWidth={6} />
    <rect x={0} y={820} width={1920} height={260} fill="#8A6A45" />
  </g>
);

export const Sticker: React.FC<{ x: number; y: number; text: string; show: number; color?: string }> = ({ x, y, text, show, color = "#F2B544" }) =>
  show <= 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(-8) scale(${show})`}>
      <rect x={-text.length * 13 - 20} y={-34} width={text.length * 26 + 40} height={64} rx={10} fill={color} stroke={INK} strokeWidth={5} />
      <text x={0} y={12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>{text}</text>
    </g>
  );

/* ---------------- Ferrari-ish sports car, lawnmower engine (generic red car, no badge) ---------------- */
export const SportsCar: React.FC<{ x: number; y: number; scale?: number; pull: number }> = ({ x, y, scale = 1, pull }) => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 2.6) * 2;
  return (
    <g transform={`translate(${x} ${y + shake}) scale(${scale})`}>
      <path d="M -520 -40 Q -500 -140 -300 -160 L -120 -250 Q 60 -280 200 -170 L 460 -140 Q 540 -120 540 -40 L 540 0 L -520 0 Z" fill="#D7302A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -100 -232 Q 40 -258 150 -176 L -60 -172 Z" fill="#BFE3F5" stroke={INK} strokeWidth={6} />
      {/* raised hood at the front (right) */}
      <path d="M 250 -160 L 330 -330 L 520 -300 L 470 -146 Z" fill="#E04A40" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* the tiny lawnmower engine */}
      <g transform="translate(380 -170)">
        <rect x={-50} y={-50} width={100} height={60} rx={10} fill="#3E8E3F" stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-62} r={22} fill="#9AA0A6" stroke={INK} strokeWidth={5} />
        <path d={`M 30 -40 Q ${120 + pull * 140} ${-120 - pull * 40} ${150 + pull * 200} ${-60 - pull * 30}`} stroke={INK} strokeWidth={4} fill="none" />
        <rect x={140 + pull * 200} y={-74 - pull * 30} width={34} height={24} rx={8} fill="#E1B83F" stroke={INK} strokeWidth={4} />
      </g>
      {[-330, 330].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy={0} r={80} fill="#22252B" stroke={INK} strokeWidth={6} />
          <circle cx={wx} cy={0} r={34} fill="#C9CED3" stroke={INK} strokeWidth={5} />
        </g>
      ))}
    </g>
  );
};

/** Two tiny tricycle wheels under a GPU (draw before the GPU). */
export const TinyWheels: React.FC<{ x: number; y: number; spin: number }> = ({ x, y, spin }) => (
  <g>
    {[-70, 70].map((dx) => (
      <g key={dx} transform={`translate(${x + dx} ${y}) rotate(${spin})`}>
        <circle r={26} fill="#3A3F44" stroke={INK} strokeWidth={5} />
        <path d="M 0 0 L 0 -20 M 0 0 L 17 10 M 0 0 L -17 10" stroke="#C9CED3" strokeWidth={4} strokeLinecap="round" />
        <circle r={7} fill="#E1B83F" stroke={INK} strokeWidth={3} />
      </g>
    ))}
  </g>
);

/* ---------------- The cake and the cancelled party ---------------- */
export const ChipCake: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={10} rx={300} ry={30} fill="#F6F1E7" stroke={INK} strokeWidth={5} />
      <rect x={-230} y={-170} width={460} height={170} rx={20} fill="#7FBF6A" stroke={INK} strokeWidth={6} />
      {[-180, -120, -60, 0, 60, 120, 180].map((px) => <rect key={px} x={px - 10} y={-196} width={20} height={30} fill="#E1B83F" stroke={INK} strokeWidth={3} />)}
      <path d="M -230 -110 Q -180 -86 -130 -110 Q -80 -86 -30 -110 Q 20 -86 70 -110 Q 120 -86 170 -110 Q 200 -96 230 -110" fill="none" stroke="#F6F1E7" strokeWidth={10} />
      <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>H20</text>
      {[-90, 0, 90].map((px, i) => (
        <g key={px}>
          <rect x={px - 8} y={-270} width={16} height={74} fill="#F4A6B5" stroke={INK} strokeWidth={3} />
          <path d={`M ${px} ${-300 + Math.sin(frame / 3 + i) * 3} q 14 18 0 30 q -14 -12 0 -30`} fill="#F5D547" stroke={INK} strokeWidth={3} />
        </g>
      ))}
    </g>
  );
};

export const PartyBanner: React.FC<{ y: number; droop: number }> = ({ y, droop }) => (
  <g>
    <path d={`M 140 ${y} Q 960 ${y + 160 + droop * 260} 1780 ${y + droop * 420}`} stroke={INK} strokeWidth={5} fill="none" />
    {"LAUNCH PARTY".split("").map((ch, i, arr) => {
      const t = (i + 0.5) / arr.length;
      const px = 140 + t * 1640;
      const py = y + (2 * (1 - t) * t * (160 + droop * 260)) + t * t * droop * 420;
      return (
        <g key={i} transform={`translate(${px} ${py}) rotate(${droop * t * 30})`}>
          <path d="M -50 0 L 50 0 L 0 110 Z" fill={["#E0453A", "#F2B544", "#4A6FA5", "#5DB35F"][i % 4]} stroke={INK} strokeWidth={4} />
          <text x={0} y={52} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>{ch}</text>
        </g>
      );
    })}
  </g>
);

/* ---------------- Skit: the towering desk ---------------- */
export const TallDesk: React.FC<{ x: number; top: number }> = ({ x, top }) => (
  <g>
    <rect x={x - 280} y={top} width={560} height={1080 - top} fill="#6B4A31" {...s} />
    <rect x={x - 310} y={top - 30} width={620} height={40} rx={6} fill="#8A5A3B" {...s} />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={x - 230} y={top + 60 + i * 90} width={460} height={60} rx={6} fill="none" stroke="#4E3422" strokeWidth={6} />)}
    {/* towering in-tray of paper */}
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={x + 120 + (i % 2) * 8} y={top - 70 - i * 24} width={150} height={26} fill="#F6F1E7" stroke={INK} strokeWidth={3} />)}
  </g>
);

export const BureauRoom: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#B9B3A6" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 250 + 30} y={60} width={190} height={720} fill="#AAA396" stroke="#8E877A" strokeWidth={5} />)}
    <rect x={0} y={860} width={1920} height={220} fill="#7C7468" />
    <path d="M 0 860 L 1920 860" {...s} />
    {/* wall clock */}
    <circle cx={300} cy={200} r={70} fill="#F6F1E7" stroke={INK} strokeWidth={6} />
  </g>
);

export const ClockHands: React.FC<{ x: number; y: number; speed: number }> = ({ x, y, speed }) => {
  const frame = useCurrentFrame();
  const m = frame * speed;
  return (
    <g stroke={INK} strokeLinecap="round">
      <path d={`M ${x} ${y} L ${x + Math.sin(m / 9.5) * 50} ${y - Math.cos(m / 9.5) * 50}`} strokeWidth={5} />
      <path d={`M ${x} ${y} L ${x + Math.sin(m / 114) * 32} ${y - Math.cos(m / 114) * 32}`} strokeWidth={8} />
    </g>
  );
};

/** The open, empty chip box the salesman holds out. */
export const EmptyBox: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -70 -60 L -100 -110 L 0 -110 L 0 -60 M 70 -60 L 100 -110 L 0 -110" fill="#C4A27A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-70} y={-60} width={140} height={110} fill="#D2B48C" stroke={INK} strokeWidth={5} />
    <rect x={-62} y={-56} width={124} height={22} fill="#7A5C3E" />
  </g>
);

export const BigForm: React.FC<{ x: number; y: number; rot?: number; scale?: number }> = ({ x, y, rot = 0, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-170} y={-230} width={340} height={460} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
    <text x={0} y={-150} textAnchor="middle" fontFamily={HAND_FONT} fontSize={72} fill={INK}>FORM 7</text>
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M -130 ${-90 + i * 36} L ${110 - rnd(i) * 80} ${-90 + i * 36}`} stroke="#B9B2A4" strokeWidth={6} strokeLinecap="round" />)}
    <text x={0} y={210} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">page 1 of 312</text>
  </g>
);

/* ---------------- Security camera ---------------- */
export const SecurityCam: React.FC<{ x: number; y: number; aim: number }> = ({ x, y, aim }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-20} y={-60} width={40} height={60} fill="#7A8088" stroke={INK} strokeWidth={5} />
    <g transform={`rotate(${aim})`}>
      <rect x={-150} y={-10} width={160} height={70} rx={10} fill="#ECE6D8" stroke={INK} strokeWidth={6} />
      <circle cx={-150} cy={25} r={20} fill="#1F2328" stroke={INK} strokeWidth={5} />
      <circle cx={-120} cy={0} r={7} fill="#E0453A" />
    </g>
  </g>
);

export { MiniChip, interpolate };
