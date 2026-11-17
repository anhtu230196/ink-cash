// ep01 YouTube thumbnail, 1280x720 (v2, 17/11/2026: rules in the skill's references/thumbnails.md).
//   npx remotion still src/index.ts ep01-Thumbnail episodes/ep01-megaspeed/publish/thumb-nvidia.png --props='{"variant":"nvidia"}' --port=3917
// Layout: one heavy white word across the top · the subject big in the middle, lit from behind ·
// the channel host reacting in the bottom-left corner · one story object (the exit box) · a full,
// detailed, dark set with one glowing source · one red accent (the crash line).
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { Character, CharacterLook, GpuCharacter, SKIN } from "../../../../kit/Character";
import { Grain, Vignette } from "../../../../kit/look/cinematic";
import { look } from "../scenes/common";

const { fontFamily: HEAVY } = loadFont("normal", { weights: ["900"], subsets: ["latin"] });

const INK = "#16141F";
const RED = "#FF3B30";
const AMBER = "#F2B544";
const W = 1280;
const H = 720;

export type ThumbVariant = "nvidia" | "billion";
type Props = { variant: ThumbVariant };

/** Ink & Cash host (same look as the channel avatar). */
const HOST: CharacterLook = { outfit: "suit", color: "#2E3A57", tie: AMBER, hair: "curly", hairColor: "#3B2A1E", glasses: true, skin: SKIN.tan };

const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------------------------------------------ */
/* Data-centre aisle in one-point perspective                          */
/* ------------------------------------------------------------------ */

const VP = { x: 790, y: 330 };
/** depth z (rack lengths) -> 0..1 along the way to the vanishing point */
const tz = (z: number) => z / (z + 2.6);
type Plane = { x: (t: number) => number; top: (t: number) => number; bot: (t: number) => number };
const top = (t: number) => lerp(-30, VP.y - 75, t);
const bot = (t: number) => lerp(800, VP.y + 70, t);
const LEFT: Plane = { x: (t) => lerp(-90, VP.x - 70, t), top, bot };
const RIGHT: Plane = { x: (t) => lerp(1520, VP.x + 70, t), top, bot };

const LED_COLORS = ["#7CFF6B", "#7CFF6B", "#7CFF6B", "#7CFF6B", "#5BE3FF", "#5BE3FF", AMBER];

const Racks: React.FC<{ p: Plane; seed: number }> = ({ p, seed }) => {
  const racks: React.ReactNode[] = [];
  const leds: React.ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const z0 = i * 1.25;
    const z1 = z0 + 1.12;
    const t0 = tz(z0);
    const t1 = tz(z1);
    const sw = lerp(5, 1, t0);
    const pt = (t: number, v: number) => `${p.x(t)} ${lerp(p.top(t), p.bot(t), v)}`;
    racks.push(
      <g key={i}>
        <path d={`M ${pt(t0, 0)} L ${pt(t1, 0)} L ${pt(t1, 1)} L ${pt(t0, 1)} Z`} fill="#0E2129" stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
        {/* door frame highlight on the edge nearest the camera */}
        <path d={`M ${pt(t0, 0.02)} L ${pt(t0, 0.98)}`} stroke="#2C5560" strokeWidth={sw * 1.4} />
      </g>,
    );
    const rows = 15;
    for (let r = 0; r < rows; r++) {
      const v = 0.05 + (r / rows) * 0.9;
      racks.push(<path key={`s${i}-${r}`} d={`M ${pt(t0, v)} L ${pt(t1, v)}`} stroke="#061217" strokeWidth={sw * 0.8} />);
      // drive bays
      const b0 = lerp(t0, t1, 0.34);
      const b1 = lerp(t0, t1, 0.92);
      racks.push(<path key={`b${i}-${r}`} d={`M ${pt(b0, v + 0.03)} L ${pt(b1, v + 0.03)}`} stroke="#1B3B46" strokeWidth={lerp(9, 1.5, t0)} strokeLinecap="round" />);
      for (let k = 0; k < 3; k++) {
        const n = seed + i * 97 + r * 7 + k;
        if (rnd(n) < 0.18) continue;
        const lt = lerp(t0, t1, 0.08 + k * 0.08);
        const lv = v + 0.03;
        leds.push(<circle key={`l${n}`} cx={p.x(lt)} cy={lerp(p.top(lt), p.bot(lt), lv)} r={lerp(4.6, 0.9, lt)} fill={LED_COLORS[Math.floor(rnd(n + 5) * LED_COLORS.length)]} />);
      }
    }
  }
  return (
    <g>
      {racks}
      <g filter="url(#ledGlow)">{leds}</g>
    </g>
  );
};

const Aisle: React.FC = () => {
  const lights: React.ReactNode[] = [];
  for (let z = 0.4; z < 30; z += 1.25) {
    const t = tz(z);
    const cx = (LEFT.x(t) + RIGHT.x(t)) / 2;
    const w = (RIGHT.x(t) - LEFT.x(t)) * 0.34;
    const h = lerp(24, 1.5, t);
    lights.push(<rect key={z} x={cx - w / 2} y={top(t) + h * 0.6} width={w} height={h} rx={h / 2} fill="#EFFFF7" />);
  }
  const floorLines: React.ReactNode[] = [];
  for (let z = 0; z < 30; z += 0.9) {
    const t = tz(z);
    floorLines.push(<path key={`f${z}`} d={`M ${LEFT.x(t)} ${bot(t)} L ${RIGHT.x(t)} ${bot(t)}`} stroke="#0F2C35" strokeWidth={lerp(4, 0.6, t)} />);
  }
  for (let u = 0.1; u < 1; u += 0.16) {
    floorLines.push(<path key={`g${u}`} d={`M ${lerp(LEFT.x(0), RIGHT.x(0), u)} ${bot(0)} L ${lerp(LEFT.x(1), RIGHT.x(1), u)} ${bot(1)}`} stroke="#0F2C35" strokeWidth={3} />);
  }
  return (
    <g>
      <defs>
        <linearGradient id="bgV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050D11" />
          <stop offset="0.5" stopColor="#0A2028" />
          <stop offset="1" stopColor="#04090C" />
        </linearGradient>
        <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C4A4F" />
          <stop offset="1" stopColor="#071114" />
        </linearGradient>
        <radialGradient id="haze" cx={VP.x} cy={VP.y} r={560} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E9FFF2" stopOpacity={0.95} />
          <stop offset="0.12" stopColor="#9CFFD0" stopOpacity={0.6} />
          <stop offset="0.45" stopColor="#3FBF8F" stopOpacity={0.18} />
          <stop offset="1" stopColor="#3FBF8F" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFFFE6" stopOpacity={0.3} />
          <stop offset="1" stopColor="#CFFFE6" stopOpacity={0} />
        </linearGradient>
        <filter id="ledGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={2.6} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={7} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="blur18" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={18} /></filter>
      </defs>
      <rect width={W} height={H} fill="url(#bgV)" />
      {/* ceiling + floor */}
      <path d={`M ${LEFT.x(0)} ${top(0)} L ${LEFT.x(1)} ${top(1)} L ${RIGHT.x(1)} ${top(1)} L ${RIGHT.x(0)} ${top(0)} Z`} fill="#06151A" />
      <path d={`M ${LEFT.x(0)} ${bot(0)} L ${LEFT.x(1)} ${bot(1)} L ${RIGHT.x(1)} ${bot(1)} L ${RIGHT.x(0)} ${bot(0)} Z`} fill="url(#floorG)" />
      {floorLines}
      {/* reflection of the far light on the polished floor */}
      <ellipse cx={VP.x} cy={560} rx={150} ry={250} fill="#9CFFD0" opacity={0.16} filter="url(#blur18)" />
      {/* cable trays along the ceiling edges */}
      {[LEFT, RIGHT].map((p, i) => (
        <g key={i} stroke="#C9A24A" strokeWidth={4} opacity={0.75}>
          <path d={`M ${p.x(0) + (i ? -60 : 60)} ${top(0) + 70} L ${p.x(1) + (i ? -6 : 6)} ${top(1) + 8}`} />
          <path d={`M ${p.x(0) + (i ? -140 : 140)} ${top(0) + 50} L ${p.x(1) + (i ? -14 : 14)} ${top(1) + 6}`} />
        </g>
      ))}
      <g filter="url(#softGlow)">{lights}</g>
      <Racks p={LEFT} seed={1} />
      <Racks p={RIGHT} seed={500} />
      {/* bright far end + haze + light rays */}
      <rect x={VP.x - 70} y={VP.y - 75} width={140} height={145} fill="#F4FFF8" />
      <rect width={W} height={H} fill="url(#haze)" />
      <g filter="url(#blur18)">
        <path d={`M ${VP.x - 60} ${VP.y - 40} L ${VP.x - 420} ${H} L ${VP.x - 160} ${H} Z`} fill="url(#ray)" />
        <path d={`M ${VP.x + 50} ${VP.y - 40} L ${VP.x + 180} ${H} L ${VP.x + 430} ${H} Z`} fill="url(#ray)" />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Lighting helpers for characters                                      */
/* ------------------------------------------------------------------ */

/** Directional shading over a figure: warm on the lit side, dark on the far side, clipped to the figure's shape. */
const Shaded: React.FC<{ id: string; from: [number, number]; to: [number, number]; dark?: number; warm?: number; children: React.ReactNode }> = ({
  id, from, to, dark = 0.55, warm = 0.16, children,
}) => (
  <g>
    <defs>
      <filter id={`${id}-w`} filterUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
      </filter>
      <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
        <g filter={`url(#${id}-w)`}>{children}</g>
      </mask>
      <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
        <stop offset="0" stopColor="#FFD9A0" stopOpacity={warm} />
        <stop offset="0.42" stopColor="#0A1420" stopOpacity={0} />
        <stop offset="1" stopColor="#081018" stopOpacity={dark} />
      </linearGradient>
    </defs>
    {children}
    <rect width={W} height={H} fill={`url(#${id}-g)`} mask={`url(#${id}-m)`} />
  </g>
);

/** Glow hugging a figure's silhouette, drawn behind it: back light from the bright end of the aisle. */
const Halo: React.FC<{ id: string; rgb: [number, number, number]; spread: number; blur: number; opacity?: number; children: React.ReactNode }> = ({
  id, rgb, spread, blur, opacity = 1, children,
}) => (
  <g>
    <defs>
      <filter id={id} filterUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
        <feColorMatrix type="matrix" values={`0 0 0 0 ${rgb[0]}  0 0 0 0 ${rgb[1]}  0 0 0 0 ${rgb[2]}  0 0 0 1 0`} />
        <feMorphology operator="dilate" radius={spread} />
        <feGaussianBlur stdDeviation={blur} />
      </filter>
    </defs>
    <g filter={`url(#${id})`} opacity={opacity}>{children}</g>
  </g>
);

const Sweat: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -26 C 10 -10 18 2 18 12 A 18 18 0 1 1 -18 12 C -18 2 -10 -10 0 -26 Z" fill="#BFEAFF" stroke={INK} strokeWidth={4.5} strokeLinejoin="round" />
    <path d="M -8 8 Q -8 0 -3 -6" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

const Blush: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g fill="#FF8A7A" opacity={0.32}>
    <ellipse cx={cx - r * 0.6} cy={cy + r * 0.32} rx={r * 0.17} ry={r * 0.09} />
    <ellipse cx={cx + r * 0.6} cy={cy + r * 0.32} rx={r * 0.17} ry={r * 0.09} />
  </g>
);

/* ------------------------------------------------------------------ */
/* Story object: the box Jensen carries out                              */
/* ------------------------------------------------------------------ */

const ExitBox: React.FC = () => (
  <g>
    <defs>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0" stopColor="#E0B57A" />
        <stop offset="1" stopColor="#9C6F3E" />
      </linearGradient>
    </defs>
    {/* inside of the box */}
    <path d="M 612 600 L 642 572 L 938 572 L 968 600 Z" fill="#3A2716" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {/* framed photo, left */}
    <g transform="rotate(-14 668 548)">
      <rect x={630} y={500} width={78} height={92} rx={4} fill="#5A3A24" stroke={INK} strokeWidth={5} />
      <rect x={641} y={511} width={56} height={60} fill="#F3E9D2" stroke={INK} strokeWidth={3} />
      <path d="M 648 560 L 662 538 L 672 550 L 684 528 L 692 560 Z" fill="#7CCB6B" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
    {/* the little GPU, peeking out */}
    <GpuCharacter x={792} y={668} scale={0.46} expression="sad" color="#5DB35F" />
    {/* plant, right */}
    <g stroke={INK} strokeWidth={5} strokeLinejoin="round">
      <path d="M 905 590 Q 900 540 918 500" fill="none" />
      <path d="M 918 500 Q 950 470 972 488 Q 948 512 918 500 Z" fill="#3E8E5A" />
      <path d="M 906 540 Q 870 512 872 488 Q 902 500 906 540 Z" fill="#4FA86A" />
      <path d="M 910 520 Q 948 520 958 540 Q 926 548 910 520 Z" fill="#3E8E5A" />
    </g>
    {/* flaps + front */}
    <path d="M 612 600 L 642 572 L 588 530 L 556 560 Z" fill="#B88A55" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 968 600 L 938 572 L 994 530 L 1026 560 Z" fill="#A87A47" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 612 600 L 968 600 L 990 770 L 590 770 Z" fill="url(#card)" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 612 600 L 968 600" stroke="#F2D19C" strokeWidth={4} opacity={0.7} />
    <rect x={760} y={600} width={60} height={170} fill="#D9C08F" opacity={0.55} />
  </g>
);

/** Red stock line crashing down the right-hand racks. */
const CrashLine: React.FC = () => {
  const pts: [number, number][] = [[930, 228], [985, 262], [1025, 238], [1075, 340], [1112, 312], [1168, 452], [1204, 424], [1240, 540]];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  const [ax, ay] = pts[pts.length - 1];
  const head = `M ${ax - 34} ${ay - 20} L ${ax + 12} ${ay + 40} L ${ax + 30} ${ay - 34} Z`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={26} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={head} fill={INK} stroke={INK} strokeWidth={14} strokeLinejoin="round" />
      <g filter="url(#softGlow)">
        <path d={d} stroke={RED} strokeWidth={15} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d={head} fill={RED} />
      </g>
    </g>
  );
};

const BigText: React.FC<{ text: string; size: number }> = ({ text, size }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 4, display: "flex", justifyContent: "center", paddingLeft: 90 }}>
    <div
      style={{
        fontFamily: HEAVY,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        color: "#FFFFFF",
        letterSpacing: -1,
        WebkitTextStroke: `${Math.round(size / 18)}px ${INK}`,
        paintOrder: "stroke fill",
        textShadow: `0 ${size / 22}px 0 ${INK}, 0 ${size / 10}px ${size / 5}px rgba(0,0,0,0.7)`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  </div>
);

export const Thumbnail: React.FC<Props> = ({ variant }) => {
  const j = look("jensen");
  // Jensen: head centre (790, 361), radius 142
  const jx = 790;
  const jy = 870;
  const js = 1.45;
  const jHead = { cx: jx, cy: jy - 350 * js, r: 98 * js };
  const jensen = <Character {...j} x={jx} y={jy} scale={js} expression="worried" mouth={0.72} arm="down" prop="none" lookX={-6} />;
  // host: head centre (185, 500), radius 167
  const hs = 1.7;
  const hx = 185;
  const hy = 500 + 350 * hs;
  const hHead = { cx: hx, cy: 500, r: 98 * hs };
  return (
    <AbsoluteFill style={{ background: "#050D11" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <Aisle />
        <CrashLine />

        {/* Jensen, back-lit by the aisle, warm key from the host's side */}
        <Halo id="jenHalo" rgb={[0.8, 1, 0.9]} spread={10} blur={22} opacity={0.85}>{jensen}</Halo>
        <Halo id="jenRim" rgb={[0.92, 1, 0.95]} spread={4} blur={3} opacity={0.95}>{jensen}</Halo>
        <Shaded id="jen" from={[560, 250]} to={[1010, 640]} dark={0.5} warm={0.14}>{jensen}</Shaded>
        <Blush {...jHead} />
        <Sweat x={jHead.cx + jHead.r * 0.98} y={jHead.cy - jHead.r * 0.15} s={1.15} rot={12} />
        <Sweat x={jHead.cx - jHead.r * 1.02} y={jHead.cy + jHead.r * 0.05} s={0.85} rot={-14} />
        <ExitBox />

        {/* host, bottom-left, reacting */}
        <circle cx={hHead.cx + 30} cy={hHead.cy} r={330} fill={AMBER} opacity={0.22} filter="url(#blur18)" />
        <Shaded id="host" from={[520, 420]} to={[0, 640]} dark={0.5} warm={0.2}>
          <g>
            <Character {...HOST} x={hx} y={hy} scale={hs} expression="surprised" mouth={1} arm="down" lookX={18} />
          </g>
        </Shaded>
        <Blush {...hHead} />
        {/* big white lenses, pupils on Jensen, glints */}
        {[-1, 1].map((k) => {
          const lx = hx + k * 34 * hs;
          const ly = hy - 345 * hs;
          return (
            <g key={k}>
              <circle cx={lx} cy={ly} r={27 * hs - 5} fill="#FFFFFF" />
              <circle cx={lx + 9 * hs} cy={ly + 1 * hs} r={10.5 * hs} fill={INK} />
              <circle cx={lx + 5 * hs} cy={ly - 4 * hs} r={3.2 * hs} fill="#FFFFFF" />
              <path d={`M ${lx - 30} ${ly - 14} q 8 -14 24 -18`} stroke="#DDEFFF" strokeWidth={6} fill="none" strokeLinecap="round" />
            </g>
          );
        })}
        <Sweat x={hHead.cx + hHead.r * 0.92} y={hHead.cy - hHead.r * 0.62} s={1.2} rot={18} />
        {/* shock lines */}
        <g stroke={INK} strokeWidth={8} strokeLinecap="round">
          {[-1.25, -0.95, -0.65].map((a) => (
            <path key={a} d={`M ${hHead.cx + Math.cos(a) * hHead.r * 1.18} ${hHead.cy + Math.sin(a) * hHead.r * 1.18} L ${hHead.cx + Math.cos(a) * hHead.r * 1.42} ${hHead.cy + Math.sin(a) * hHead.r * 1.42}`} />
          ))}
        </g>
      </svg>

      {variant === "nvidia" ? <BigText text="NVIDIA" size={170} /> : <BigText text="$7.5 Billion" size={142} />}

      <Vignette strength={0.5} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
