import React from "react";
import { useCurrentFrame } from "remotion";
import { INK, STROKE } from "./theme";

export type Expression = "neutral" | "happy" | "smug" | "worried" | "awkward" | "angry" | "surprised" | "sad";
export type ArmPose = "down" | "hold" | "wave" | "point" | "shrug";
export type Outfit = "plain" | "suit" | "blazer" | "leather" | "uniform" | "polo" | "cardigan" | "coat-sam";
export type Hair = "curly" | "long" | "short" | "side" | "slick" | "swept" | "spiky" | "pomp" | "part73" | "part64" | "bob" | "bun" | "bald" | "none";
export type Prop = "none" | "stamp" | "chipbox" | "chip" | "papers" | "laptop" | "tablet" | "deck" | "cup" | "clipboard" | "briefcase" | "folder";

export const SKIN = { light: "#F1D3B0", tan: "#E2B48C", medium: "#C68E62", deep: "#8D5A3B" };

export type CharacterLook = {
  skin?: string;
  outfit: Outfit;
  color: string; // main garment
  color2?: string; // shirt / inner layer
  tie?: string;
  bowtie?: string;
  pin?: boolean; // US flag lapel pin
  hair: Hair;
  hairColor: string;
  glasses?: boolean;
  headphones?: boolean;
  hat?: "none" | "tophat" | "cap";
  hatColor?: string;
  facialHair?: "none" | "goatee" | "big-goatee" | "mustache";
  facialHairColor?: string;
  prop?: Prop;
  /** Age lines on the face: 0 none · 1 smile lines (40s) · 2 + crow's feet and under-eye (50s–60s) · 3 + forehead lines (70+). See kit/age.ts. */
  wrinkles?: 0 | 1 | 2 | 3;
  /** 0..1: how full / lifted the hair is on top (part73, part64 only). Thick hair, or older hair worn brushed up. */
  hairVolume?: number;
};

export type CharacterProps = CharacterLook & {
  x: number;
  y: number; // feet
  scale?: number;
  flip?: boolean;
  expression?: Expression;
  mouth?: number;
  arm?: ArmPose;
  lookX?: number;
};

const line = { stroke: INK, strokeWidth: STROKE, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const fillLine = (fill: string, w = 5) => ({ fill, stroke: INK, strokeWidth: w, strokeLinejoin: "round" as const });

/* ---------------- hair ---------------- */

const curls: [number, number, number][] = (() => {
  const out: [number, number, number][] = [];
  for (let a = 190; a <= 350; a += 20) {
    const r = (a * Math.PI) / 180;
    out.push([Math.cos(r) * 92, -350 + Math.sin(r) * 92, 34]);
  }
  for (let a = 240; a <= 300; a += 30) {
    const r = (a * Math.PI) / 180;
    out.push([Math.cos(r) * 60, -350 + Math.sin(r) * 98, 30]);
  }
  return out;
})();

const HairBack: React.FC<{ kind: Hair; color: string }> = ({ kind, color }) => {
  switch (kind) {
    case "long":
      return <path d="M -106 -345 Q -116 -478 0 -472 Q 116 -478 106 -345 Q 118 -282 104 -238 Q 76 -226 62 -262 L -62 -262 Q -76 -226 -104 -238 Q -118 -282 -106 -345 Z" {...fillLine(color, STROKE)} />;
    case "bob":
      return <path d="M -110 -350 Q -118 -478 0 -472 Q 118 -478 110 -350 L 114 -282 Q 92 -262 74 -282 L -74 -282 Q -92 -262 -114 -282 Z" {...fillLine(color, STROKE)} />;
    case "bun":
      return <circle cx={0} cy={-468} r={40} {...fillLine(color, STROKE)} />;
    default:
      return null;
  }
};

/** Short clipped sides (lighter grey) under a fuller top. */
const SideFade: React.FC = () => (
  <g>
    <path d="M -98 -352 Q -101 -398 -88 -418 L -60 -428 Q -84 -400 -88 -352 Z" {...fillLine("#77736E", 4)} />
    <path d="M 98 -352 Q 101 -398 88 -418 L 60 -428 Q 84 -400 88 -352 Z" {...fillLine("#77736E", 4)} />
  </g>
);

/**
 * Neat side part. p = x of the part line (head spans -98..98): 7/3 ≈ -40, 6/4 ≈ -20.
 * v = extra lift on top in px (look.hairVolume × 26): thick, full hair stands higher above the part.
 */
const PartHair: React.FC<{ p: number; color: string; v?: number }> = ({ p, color, v = 0 }) => {
  const f = fillLine(color, STROKE);
  const hi = "rgba(255,255,255,0.35)";
  const lo = "rgba(0,0,0,0.16)";
  return (
    <g>
      {/* sides: real hair, combed flat against the head down to the ear line (not clipper-short) */}
      <path d={`M -99 -346 Q -105 -404 -86 ${-440 - v * 0.3} L -64 -424 Q -86 -396 -91 -346 Z`} {...fillLine(color, 4)} />
      <path d={`M 99 -346 Q 105 -404 86 ${-440 - v * 0.3} L 64 -424 Q 86 -396 91 -346 Z`} {...fillLine(color, 4)} />
      <path d="M -94 -360 Q -95 -392 -82 -418 M 94 -360 Q 95 -392 82 -418" stroke={INK} strokeWidth={2.5} fill="none" opacity={0.45} />
      {/* small section: combed down toward the left ear */}
      <path d={`M ${p} ${-470 - v} Q ${(p - 98) / 2} ${-472 - v} -88 ${-446 - v * 0.3} Q -101 -420 -97 -390 Q -86 -410 -66 -420 Q ${(p - 66) / 2} -432 ${p} -434 Z`} {...f} />
      {/* big section: lifted at the part, combed toward the right */}
      <path d={`M ${p} ${-472 - v} Q ${p + 30} ${-496 - v * 1.2} 40 ${-488 - v} Q 90 ${-476 - v * 0.7} 98 -440 Q 104 -414 97 -388 Q 86 -414 58 -426 Q ${(p + 58) / 2} -440 ${p} -434 Z`} {...f} />
      {v > 0 && <path d={`M ${p + 6} -440 Q 30 -448 62 -432 Q 84 -420 92 -400`} stroke={lo} strokeWidth={8} fill="none" strokeLinecap="round" />}
      <g stroke={INK} strokeWidth={3} fill="none" opacity={0.5}>
        <path d={`M ${p + 18} ${-470 - v} Q 40 ${-470 - v} 70 ${-450 - v * 0.6}`} />
        <path d={`M ${p + 14} ${-452 - v * 0.6} Q 36 ${-456 - v * 0.6} 60 ${-440 - v * 0.3}`} />
        <path d={`M ${p - 14} ${-462 - v} Q ${(p - 90) / 2} ${-458 - v} -80 ${-438 - v * 0.3}`} />
        {v > 0 && <path d={`M ${p + 22} ${-486 - v} Q 56 ${-484 - v} 86 ${-458 - v * 0.6}`} />}
      </g>
      <path d={`M ${p + 24} ${-482 - v} Q 52 ${-480 - v} 80 ${-460 - v * 0.6}`} stroke={hi} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

const HairFront: React.FC<{ kind: Hair; color: string; volume?: number }> = ({ kind, color, volume = 0 }) => {
  const f = fillLine(color, STROKE);
  switch (kind) {
    case "curly":
      return (
        <g>
          {curls.map(([cx, cy, r], i) => <circle key={`o${i}`} cx={cx} cy={cy} r={r} fill={color} stroke={INK} strokeWidth={STROKE} />)}
          {curls.map(([cx, cy, r], i) => <circle key={`f${i}`} cx={cx} cy={cy} r={r - STROKE / 2} fill={color} />)}
        </g>
      );
    case "long":
      return (
        <g>
          <path d="M -99 -338 Q -102 -464 12 -462 Q 102 -458 100 -342 Q 84 -418 26 -428 Q -52 -430 -99 -338 Z" {...f} />
          <path d="M 18 -460 Q 6 -440 -6 -428" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
        </g>
      );
    case "short":
      return <path d="M -96 -335 Q -105 -465 0 -458 Q 105 -465 96 -335 Q 70 -410 0 -405 Q -70 -410 -96 -335 Z" {...f} />;
    case "side":
      return (
        <g>
          <path d="M -97 -352 Q -106 -470 10 -464 Q 106 -460 97 -354 Q 84 -420 34 -430 Q -40 -442 -97 -352 Z" {...f} />
          <path d="M -30 -462 Q -44 -446 -70 -420" stroke={INK} strokeWidth={3} fill="none" opacity={0.6} />
          <path d="M 40 -452 Q 62 -440 76 -414" stroke="rgba(255,255,255,0.35)" strokeWidth={4} fill="none" />
        </g>
      );
    case "slick":
      return (
        <g>
          <path d="M -96 -345 Q -102 -460 0 -460 Q 102 -460 96 -345 Q 86 -418 0 -424 Q -86 -418 -96 -345 Z" {...f} />
          <path d="M -50 -452 Q -20 -440 -10 -426 M 10 -456 Q 30 -444 36 -428" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
        </g>
      );
    case "swept": {
      const hi = "rgba(255,255,255,0.38)";
      return (
        <g>
          <SideFade />
          <path d="M -90 -408 Q -102 -458 -60 -480 Q 0 -508 64 -488 Q 106 -468 90 -408 Q 76 -428 40 -434 Q -6 -440 -50 -430 Q -78 -424 -90 -408 Z" {...f} />
          <path d="M -46 -470 Q -16 -456 2 -428 M 4 -490 Q 32 -472 42 -430 M -78 -440 Q -64 -430 -56 -418" stroke={INK} strokeWidth={3} fill="none" opacity={0.55} />
          <path d="M -20 -486 Q 8 -472 18 -446 M 50 -474 Q 70 -456 78 -430" stroke={hi} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      );
    }
    case "part73":
      return <PartHair p={-40} color={color} v={volume * 26} />;
    case "part64":
      return <PartHair p={-20} color={color} v={volume * 26} />;
    case "spiky":
      return (
        <g>
          <path d="M -96 -366 Q -106 -440 -72 -462 L -62 -492 L -42 -470 L -24 -502 L -4 -474 L 16 -504 L 32 -474 L 54 -494 L 62 -464 Q 104 -444 96 -366 Q 84 -414 30 -424 Q -40 -430 -96 -366 Z" {...f} />
          <path d="M -30 -486 L -18 -452 M 18 -488 L 22 -452" stroke="rgba(255,255,255,0.38)" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      );
    case "pomp":
      return (
        <g>
          <SideFade />
          <path d="M -90 -410 Q -98 -446 -72 -468 Q -36 -508 34 -502 Q 98 -494 104 -446 Q 106 -424 90 -410 Q 70 -432 30 -438 Q -30 -442 -90 -410 Z" {...f} />
          <path d="M -56 -470 Q -10 -486 56 -470 M -40 -452 Q 10 -466 70 -448" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
          <path d="M -30 -484 Q 20 -494 70 -476" stroke="rgba(255,255,255,0.38)" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      );
    case "bob":
      return <path d="M -98 -335 Q -100 -458 0 -458 Q 100 -458 98 -335 Q 92 -388 50 -400 L -50 -400 Q -92 -388 -98 -335 Z" {...f} />;
    case "bun":
      return <path d="M -96 -340 Q -104 -462 0 -458 Q 104 -462 96 -340 Q 72 -414 0 -412 Q -72 -414 -96 -340 Z" {...f} />;
    case "bald":
      return (
        <g>
          <path d="M -99 -318 Q -108 -372 -86 -400 L -78 -372 Q -88 -346 -90 -318 Z" {...fillLine(color, 4)} />
          <path d="M 99 -318 Q 108 -372 86 -400 L 78 -372 Q 88 -346 90 -318 Z" {...fillLine(color, 4)} />
        </g>
      );
    default:
      return null;
  }
};

const Hat: React.FC<{ kind?: CharacterLook["hat"]; color?: string }> = ({ kind, color = "#2E3A57" }) => {
  if (kind === "tophat") {
    return (
      <g>
        <rect x={-72} y={-640} width={144} height={200} {...fillLine("#F6F4EE", STROKE)} />
        {[-48, -8, 32].map((sx) => <rect key={sx} x={sx} y={-638} width={18} height={168} fill="#C0392B" />)}
        <rect x={-72} y={-640} width={144} height={200} fill="none" stroke={INK} strokeWidth={STROKE} />
        <rect x={-74} y={-478} width={148} height={34} {...fillLine("#2D4A8A", 5)} />
        {[-45, -15, 15, 45].map((sx) => <circle key={sx} cx={sx} cy={-461} r={6} fill="#fff" />)}
        <ellipse cx={0} cy={-440} rx={128} ry={18} {...fillLine("#2D4A8A", STROKE)} />
      </g>
    );
  }
  if (kind === "cap") {
    return (
      <g>
        <path d="M -100 -392 Q -104 -478 0 -478 Q 104 -478 100 -392 Z" {...fillLine(color, STROKE)} />
        <circle cx={0} cy={-476} r={8} fill={color} stroke={INK} strokeWidth={4} />
        <ellipse cx={0} cy={-400} rx={118} ry={15} {...fillLine(color, STROKE)} />
      </g>
    );
  }
  return null;
};

/* ---------------- face ---------------- */

/** Thin, faint lines that read as age without making the face messy. Drawn under hair and glasses. */
const AgeLines: React.FC<{ level: number }> = ({ level }) => {
  if (!level) return null;
  const l = { stroke: INK, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, opacity: 0.38 };
  return (
    <g>
      <path d="M -50 -320 Q -58 -300 -48 -280" {...l} />
      <path d="M 50 -320 Q 58 -300 48 -280" {...l} />
      {level >= 2 && (
        <g>
          <path d="M -46 -323 Q -32 -316 -18 -323 M 18 -323 Q 32 -316 46 -323" {...l} />
          <path d="M -66 -354 L -80 -360 M -67 -346 L -82 -346 M -66 -338 L -79 -332" {...l} />
          <path d="M 66 -354 L 80 -360 M 67 -346 L 82 -346 M 66 -338 L 79 -332" {...l} />
        </g>
      )}
      {level >= 3 && <path d="M -40 -404 Q 0 -411 40 -404 M -30 -416 Q 0 -422 30 -416" {...l} />}
    </g>
  );
};

const Brows: React.FC<{ e: Expression }> = ({ e }) => {
  const y = e === "awkward" || e === "surprised" ? -394 : -384;
  const tilt = e === "sad" || e === "worried" || e === "awkward" ? 9 : e === "angry" ? -11 : 0;
  if (e === "smug") {
    return (
      <g {...line} strokeWidth={5}>
        <path d="M -44 -380 L -14 -382" />
        <path d="M 14 -390 L 44 -396" />
      </g>
    );
  }
  return (
    <g {...line} strokeWidth={5}>
      <path d={`M -44 ${y + tilt} L -14 ${y - tilt}`} />
      <path d={`M 14 ${y - tilt} L 44 ${y + tilt}`} />
    </g>
  );
};

const Mouth: React.FC<{ e: Expression; open: number }> = ({ e, open }) => {
  if (open > 0.08) return <ellipse cx={0} cy={-298} rx={14 + open * 5} ry={3 + open * 13} fill="#6B2A26" stroke={INK} strokeWidth={4} />;
  const l = { ...line, strokeWidth: 5 };
  switch (e) {
    case "happy":
      return <path d="M -26 -306 Q 0 -278 26 -306" {...l} />;
    case "smug":
      return <path d="M -20 -300 Q 8 -292 26 -310" {...l} />;
    case "sad":
      return <path d="M -22 -290 Q 0 -310 22 -290" {...l} />;
    case "worried":
    case "awkward":
      return <path d="M -24 -298 q 12 -9 24 0 q 12 9 24 0" {...l} transform="translate(-12 0)" />;
    case "angry":
      return <path d="M -20 -294 L 20 -294" {...l} />;
    case "surprised":
      return <ellipse cx={0} cy={-296} rx={10} ry={13} fill="#6B2A26" stroke={INK} strokeWidth={4} />;
    default:
      return <path d="M -16 -298 L 16 -298" {...l} />;
  }
};

const FacialHair: React.FC<{ kind?: CharacterLook["facialHair"]; color: string }> = ({ kind, color }) => {
  if (kind === "goatee") return <path d="M -20 -272 Q 0 -238 20 -272 Q 0 -262 -20 -272 Z" {...fillLine(color, 3)} />;
  if (kind === "big-goatee") return <path d="M -28 -276 Q 0 -196 28 -276 Q 0 -260 -28 -276 Z" {...fillLine(color, 4)} />;
  if (kind === "mustache") return <path d="M -32 -314 Q -16 -328 0 -316 Q 16 -328 32 -314 Q 16 -304 0 -310 Q -16 -304 -32 -314 Z" {...fillLine(color, 3)} />;
  return null;
};

/* ---------------- body ---------------- */

const darker = (hex: string, k = 0.75) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (s: number) => Math.round(((n >> s) & 255) * k).toString(16).padStart(2, "0");
  return `#${c(16)}${c(8)}${c(0)}`;
};

const Tie: React.FC<{ color: string; top?: number }> = ({ color, top = -236 }) => (
  <path d={`M 0 ${top} L -13 ${top + 26} L 0 ${top + 92} L 13 ${top + 26} Z`} {...fillLine(color, 4)} />
);

const Torso: React.FC<{ look: CharacterLook }> = ({ look }) => {
  const { outfit, color, color2 = "#FFFFFF", tie, bowtie, pin } = look;
  const body = <rect x={-75} y={-272} width={150} height={228} rx={72} {...fillLine(color, STROKE)} />;
  const vee = <path d="M -30 -265 L 0 -228 L 30 -265 Z" {...fillLine(color2, 5)} />;
  let detail: React.ReactNode = null;
  switch (outfit) {
    case "suit":
    case "blazer":
    case "coat-sam":
      detail = (
        <g>
          <path d="M -36 -266 L 0 -168 L 36 -266 Z" {...fillLine(color2, 5)} />
          <path d="M -36 -266 L -4 -176 L -46 -212 Z M 36 -266 L 4 -176 L 46 -212 Z" {...fillLine(darker(color), 4)} />
          <circle cx={0} cy={-146} r={5} fill={INK} />
          <circle cx={0} cy={-114} r={5} fill={INK} />
          {tie && <Tie color={tie} />}
        </g>
      );
      break;
    case "leather":
      detail = (
        <g>
          <path d="M -32 -268 Q 0 -236 32 -268 Z" {...fillLine(color2, 4)} />
          <path d="M -14 -248 L -14 -52 M 14 -248 L 14 -52" stroke="#4E4E4E" strokeWidth={6} strokeLinecap="round" />
          <path d="M -38 -266 L -66 -236 L -18 -220 Z M 38 -266 L 66 -236 L 18 -220 Z" {...fillLine(darker(color, 1.6), 4)} />
          <path d="M -54 -196 Q -62 -150 -52 -104" stroke="rgba(255,255,255,0.28)" strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      );
      break;
    case "uniform":
      detail = (
        <g>
          {vee}
          <rect x={-58} y={-214} width={36} height={30} {...fillLine(darker(color, 0.9), 3)} />
          <rect x={22} y={-214} width={36} height={30} {...fillLine(darker(color, 0.9), 3)} />
          <path d="M -40 -232 l 5 10 l 11 1 l -8 7 l 3 11 l -11 -6 l -11 6 l 3 -11 l -8 -7 l 11 -1 Z" fill="#E1B83F" stroke={INK} strokeWidth={2} />
          <path d="M 0 -228 L 0 -60" stroke={INK} strokeWidth={3} opacity={0.5} />
        </g>
      );
      break;
    case "polo":
      detail = (
        <g>
          <path d="M -30 -266 L 0 -246 L -14 -232 Z M 30 -266 L 0 -246 L 14 -232 Z" {...fillLine(darker(color, 0.85), 4)} />
          <path d="M 0 -246 L 0 -200" stroke={INK} strokeWidth={3} />
          <path d="M -36 -262 L -4 -176 M 36 -262 L 4 -176" stroke={color2} strokeWidth={6} />
          <rect x={-18} y={-180} width={36} height={44} rx={4} {...fillLine("#FFFFFF", 3)} />
          <rect x={-10} y={-172} width={14} height={14} fill="#9DB4C8" />
          <path d="M -10 -150 L 10 -150 M -10 -143 L 6 -143" stroke={INK} strokeWidth={2} />
        </g>
      );
      break;
    case "cardigan":
      detail = (
        <g>
          <path d="M -26 -268 L 26 -268 L 22 -52 L -22 -52 Z" {...fillLine(color2, 4)} />
          {[-200, -160, -120].map((yy) => <circle key={yy} cx={-30} cy={yy} r={4} fill={INK} />)}
        </g>
      );
      break;
    default:
      detail = vee;
  }
  return (
    <g>
      {body}
      {detail}
      {bowtie && (
        <g transform="translate(0 -258)">
          <path d="M 0 0 L -26 -14 L -26 14 Z M 0 0 L 26 -14 L 26 14 Z" {...fillLine(bowtie, 4)} />
          <circle r={6} fill={bowtie} stroke={INK} strokeWidth={3} />
        </g>
      )}
      {pin && (
        <g transform="translate(-50 -230)">
          <rect x={-10} y={-7} width={20} height={14} fill="#fff" stroke={INK} strokeWidth={2} />
          <rect x={-10} y={-7} width={9} height={7} fill="#2D4A8A" />
          <path d="M -1 -3 L 10 -3 M -10 3 L 10 3" stroke="#C0392B" strokeWidth={2} />
        </g>
      )}
    </g>
  );
};

/* ---------------- props ---------------- */

export const MiniChip: React.FC<{ size?: number; color?: string }> = ({ size = 50, color = "#5DB35F" }) => {
  const h = size / 2;
  return (
    <g>
      {[-0.6, -0.2, 0.2, 0.6].map((p) => (
        <g key={p} stroke={INK} strokeWidth={3}>
          <path d={`M ${p * h} ${-h} L ${p * h} ${-h - 8} M ${p * h} ${h} L ${p * h} ${h + 8} M ${-h} ${p * h} L ${-h - 8} ${p * h} M ${h} ${p * h} L ${h + 8} ${p * h}`} />
        </g>
      ))}
      <rect x={-h} y={-h} width={size} height={size} rx={5} {...fillLine(color, 4)} />
      <rect x={-h * 0.5} y={-h * 0.5} width={h} height={h} rx={3} fill={darker(color, 0.6)} />
    </g>
  );
};

const HeldProp: React.FC<{ prop: Prop }> = ({ prop }) => {
  switch (prop) {
    case "stamp":
      return (
        <g transform="translate(78 -150)">
          <circle cx={0} cy={-58} r={16} {...fillLine("#B5483A", 4)} />
          <rect x={-10} y={-50} width={20} height={36} rx={4} {...fillLine("#B5483A", 4)} />
          <rect x={-32} y={-16} width={64} height={24} rx={4} {...fillLine("#6B4A2B", 4)} />
          <rect x={-32} y={8} width={64} height={8} fill="#C0392B" stroke={INK} strokeWidth={3} />
        </g>
      );
    case "chipbox":
      return (
        <g transform="translate(92 -150)">
          <rect x={-58} y={-56} width={116} height={96} {...fillLine("#D2B48C", 5)} />
          <path d="M -58 -56 L -40 -78 L 76 -78 L 58 -56 Z" {...fillLine("#C4A27A", 4)} />
          <path d="M 0 -56 L 0 -34" stroke={INK} strokeWidth={3} opacity={0.5} />
          <g transform="translate(0 -6)"><MiniChip size={40} /></g>
        </g>
      );
    case "chip":
      return <g transform="translate(78 -200)"><MiniChip size={58} /></g>;
    case "papers":
      return (
        <g transform="translate(86 -168)">
          {[16, 8, 0].map((o) => <rect key={o} x={-40 + o} y={-50 - o} width={80} height={96} {...fillLine("#FFFFFF", 4)} />)}
          {[-30, -14, 2, 18].map((yy) => <path key={yy} d={`M -12 ${yy - 16} L 44 ${yy - 16}`} stroke={INK} strokeWidth={2} opacity={0.5} />)}
        </g>
      );
    case "laptop":
      return (
        <g transform="translate(86 -150)">
          <rect x={-50} y={-66} width={100} height={66} rx={6} {...fillLine("#555B60", 5)} />
          <rect x={-40} y={-56} width={80} height={46} fill="#8FB6D1" />
          <rect x={-60} y={0} width={120} height={12} rx={4} {...fillLine("#7B8288", 4)} />
        </g>
      );
    case "tablet":
      return (
        <g transform="translate(82 -170)">
          <rect x={-32} y={-46} width={64} height={86} rx={8} {...fillLine("#333", 5)} />
          <rect x={-24} y={-38} width={48} height={66} fill="#8FB6D1" />
          <path d="M -18 10 L -6 -4 L 4 4 L 18 -20" stroke="#2E6B3A" strokeWidth={4} fill="none" />
        </g>
      );
    case "deck":
      return (
        <g transform="translate(90 -168)">
          <rect x={-50} y={-56} width={100} height={78} rx={4} {...fillLine("#FFFFFF", 5)} />
          <path d="M -36 6 L -14 -12 L 4 -4 L 34 -38" stroke="#5DB35F" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M 34 -38 l -14 2 M 34 -38 l -2 14" stroke="#5DB35F" strokeWidth={6} strokeLinecap="round" />
        </g>
      );
    case "cup":
      return (
        <g transform="translate(74 -172)">
          <path d="M -26 -40 L 26 -40 L 20 14 L -20 14 Z" {...fillLine("#FFFFFF", 5)} />
          <rect x={-26} y={-18} width={52} height={16} fill="#C8643B" stroke={INK} strokeWidth={4} />
        </g>
      );
    case "clipboard":
      return (
        <g transform="translate(84 -160)">
          <rect x={-38} y={-56} width={76} height={100} rx={6} {...fillLine("#A0522D", 5)} />
          <rect x={-28} y={-42} width={56} height={78} fill="#FFFFFF" />
          <rect x={-16} y={-64} width={32} height={16} rx={4} {...fillLine("#9AA0A6", 3)} />
          {[-28, -14, 0, 14].map((yy) => <path key={yy} d={`M -20 ${yy} L 20 ${yy}`} stroke={INK} strokeWidth={2} opacity={0.5} />)}
        </g>
      );
    case "briefcase":
      return (
        <g transform="translate(92 -95)">
          <path d="M -18 6 Q -18 -12 0 -12 Q 18 -12 18 6" stroke={INK} strokeWidth={6} fill="none" />
          <rect x={-46} y={6} width={92} height={64} rx={8} {...fillLine("#5E3F27", 5)} />
          <rect x={-8} y={26} width={16} height={10} fill="#E1B83F" stroke={INK} strokeWidth={2} />
        </g>
      );
    case "folder":
      return (
        <g transform="translate(90 -168)">
          <path d="M -54 -50 L -20 -50 L -12 -60 L 54 -60 L 54 40 L -54 40 Z" {...fillLine("#E3C178", 5)} />
          <rect x={-40} y={-22} width={80} height={26} fill="none" stroke="#C0392B" strokeWidth={4} transform="rotate(-8)" />
          <text x={0} y={-3} textAnchor="middle" fontSize={15} fontWeight={700} fill="#C0392B" transform="rotate(-8)" fontFamily="sans-serif">TOP SECRET</text>
        </g>
      );
    default:
      return null;
  }
};

const Arms: React.FC<{ pose: ArmPose; frame: number; prop: Prop }> = ({ pose, frame, prop }) => {
  const sway = Math.sin(frame / 4) * 18;
  const left = "M -60 -225 L -82 -160 L -86 -95";
  let right = "M 60 -225 L 82 -160 L 86 -95";
  let l = left;
  switch (pose) {
    case "hold":
      right = prop === "briefcase" ? "M 60 -225 L 84 -160 L 92 -104" : "M 60 -225 L 104 -170 L 74 -160";
      break;
    case "wave":
      right = `M 60 -225 L 118 -270 L ${150 + sway} -345`;
      break;
    case "point":
      right = "M 60 -225 L 120 -235 L 182 -246";
      break;
    case "shrug":
      l = "M -60 -225 L -112 -200 L -138 -252";
      right = "M 60 -225 L 112 -200 L 138 -252";
      break;
  }
  return (
    <g>
      <path d={l} {...line} />
      <path d={right} {...line} />
    </g>
  );
};

/* ---------------- human ---------------- */

export const Character: React.FC<CharacterProps> = (p) => {
  const { x, y, scale = 1, flip = false, expression = "neutral", mouth = 0, arm = "down", lookX = 0 } = p;
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 14) * 2.5;
  const blinking = frame % 96 >= 90 && frame % 96 < 94;
  const prop = arm === "hold" ? p.prop ?? "none" : "none";
  const eyeR = expression === "surprised" ? 10 : 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <g {...line}>
        <path d="M -28 -60 L -32 -6 L -52 -4" />
        <path d="M 28 -60 L 32 -6 L 52 -4" />
      </g>
      <g transform={`translate(0 ${breathe})`}>
        <Torso look={p} />
        <Arms pose={arm} frame={frame} prop={prop} />
        <g transform={`translate(0 ${breathe * 0.4})`}>
          <HairBack kind={p.hair} color={p.hairColor} />
          {p.headphones && <path d="M -104 -350 Q -110 -486 0 -486 Q 110 -486 104 -350" stroke="#333" strokeWidth={14} fill="none" />}
          <circle cx={0} cy={-350} r={98} {...fillLine(p.skin ?? SKIN.light, STROKE)} />
          <AgeLines level={p.wrinkles ?? 0} />
          <HairFront kind={p.hair} color={p.hairColor} volume={p.hairVolume ?? 0} />
          <Hat kind={p.hat} color={p.hatColor} />
          {p.headphones && (
            <g>
              <path d="M -104 -350 Q -110 -486 0 -486 Q 110 -486 104 -350" stroke={INK} strokeWidth={20} fill="none" opacity={0.15} />
              <path d="M -104 -350 Q -110 -486 0 -486 Q 110 -486 104 -350" stroke="#3A3F44" strokeWidth={12} fill="none" />
              <rect x={-124} y={-392} width={34} height={78} rx={14} {...fillLine("#4A5056", 5)} />
              <rect x={90} y={-392} width={34} height={78} rx={14} {...fillLine("#4A5056", 5)} />
            </g>
          )}
          <g transform={`translate(${lookX} 0)`}>
            <g transform={blinking ? "translate(0 -345) scale(1 0.15) translate(0 345)" : undefined}>
              <circle cx={-32} cy={-345} r={eyeR} fill={INK} />
              <circle cx={32} cy={-345} r={eyeR} fill={INK} />
            </g>
          </g>
          {p.glasses && (
            <g fill="rgba(255,255,255,0.22)" stroke={INK} strokeWidth={5}>
              <circle cx={-34} cy={-345} r={27} />
              <circle cx={34} cy={-345} r={27} />
              <path d="M -7 -347 Q 0 -354 7 -347" fill="none" />
              <path d="M -61 -350 L -94 -362 M 61 -350 L 94 -362" fill="none" />
            </g>
          )}
          <Brows e={expression} />
          <FacialHair kind={p.facialHair} color={p.facialHairColor ?? p.hairColor} />
          <Mouth e={expression} open={mouth} />
        </g>
        <HeldProp prop={prop} />
      </g>
    </g>
  );
};

/* ---------------- GPU chip character ---------------- */

export const GpuCharacter: React.FC<{ x: number; y: number; scale?: number; color?: string; label?: string; expression?: Expression; arm?: ArmPose; mouth?: number }> = ({
  x, y, scale = 1, color = "#5DB35F", label = "GPU", expression = "neutral", arm = "down", mouth = 0,
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 12) * 3;
  const die = darker(color, 0.55);
  const arms =
    arm === "wave" ? ["M -95 -160 L -130 -110 L -138 -60", "M 95 -160 L 140 -210 L 160 -270"]
    : arm === "shrug" ? ["M -95 -160 L -140 -150 L -160 -200", "M 95 -160 L 140 -150 L 160 -200"]
    : ["M -95 -160 L -130 -110 L -138 -60", "M 95 -160 L 130 -110 L 138 -60"];
  const browTilt = expression === "worried" || expression === "awkward" || expression === "sad" ? 7 : expression === "angry" ? -9 : 0;
  const mouthPath =
    mouth > 0.08 ? null
    : expression === "happy" ? "M -22 -132 Q 0 -112 22 -132"
    : expression === "smug" ? "M -18 -126 Q 6 -122 22 -136"
    : expression === "worried" || expression === "awkward" ? "M -22 -126 q 11 -8 22 0 q 11 8 22 0"
    : expression === "sad" ? "M -20 -120 Q 0 -136 20 -120"
    : "M -14 -126 L 14 -126";
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g {...line}>
        <path d="M -38 -40 L -42 -6 L -62 -4" />
        <path d="M 38 -40 L 42 -6 L 62 -4" />
      </g>
      <g transform={`translate(0 ${bob})`}>
        {arms.map((d, i) => <path key={i} d={d} {...line} />)}
        <g stroke={INK} strokeWidth={5} strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M -95 ${-238 + i * 40} L -114 ${-238 + i * 40} M 95 ${-238 + i * 40} L 114 ${-238 + i * 40} M ${-64 + i * 32} -262 L ${-64 + i * 32} -280`} />
          ))}
        </g>
        <rect x={-95} y={-262} width={190} height={222} rx={18} {...fillLine(color, STROKE)} />
        <rect x={-62} y={-232} width={124} height={124} rx={12} {...fillLine(die, 4)} />
        <circle cx={-26} cy={-180} r={15} fill="#fff" stroke={INK} strokeWidth={3} />
        <circle cx={26} cy={-180} r={15} fill="#fff" stroke={INK} strokeWidth={3} />
        <circle cx={-24} cy={-178} r={7} fill={INK} />
        <circle cx={28} cy={-178} r={7} fill={INK} />
        <g {...line} strokeWidth={4}>
          <path d={`M -42 ${-210 + browTilt} L -14 ${-210 - browTilt}`} />
          <path d={`M 14 ${-210 - browTilt} L 42 ${-210 + browTilt}`} />
        </g>
        {mouthPath ? <path d={mouthPath} {...line} strokeWidth={4} stroke="#F3F1E8" transform={expression === "worried" || expression === "awkward" ? "translate(-11 0)" : undefined} /> : <ellipse cx={0} cy={-128} rx={12} ry={4 + mouth * 10} fill="#2a0f0f" stroke="#F3F1E8" strokeWidth={3} />}
        <text x={0} y={-62} textAnchor="middle" fontSize={34} fontFamily="sans-serif" fontWeight={700} fill="#F3F1E8" stroke={INK} strokeWidth={1}>{label}</text>
      </g>
    </g>
  );
};

/* ---------------- customs dog (side view, facing right) ---------------- */

export const CustomsDog: React.FC<{ x: number; y: number; scale?: number; expression?: Expression }> = ({ x, y, scale = 1, expression = "neutral" }) => {
  const frame = useCurrentFrame();
  const wag = Math.sin(frame / 3) * 10;
  const fur = "#C8955E";
  const earDrop = expression === "worried" || expression === "sad" || expression === "awkward" ? 18 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={`M -100 -130 Q -150 -170 ${-136 + wag} -214`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M -100 -130 Q -150 -170 ${-136 + wag} -214`} stroke={fur} strokeWidth={11} fill="none" strokeLinecap="round" />
      {[-78, -44, 44, 78].map((lx) => <rect key={lx} x={lx - 12} y={-90} width={24} height={88} rx={10} {...fillLine(lx < 0 ? darker(fur, 0.92) : fur, 5)} />)}
      <ellipse cx={0} cy={-120} rx={112} ry={56} {...fillLine(fur, STROKE)} />
      <path d="M -52 -168 Q -58 -120 -48 -70 L 48 -70 Q 58 -120 52 -168 Q 0 -178 -52 -168 Z" {...fillLine("#2E3A57", 5)} />
      <text x={0} y={-110} textAnchor="middle" fontSize={26} fontWeight={700} fontFamily="sans-serif" fill="#F3F1E8">K-9</text>
      <text x={0} y={-84} textAnchor="middle" fontSize={15} fontWeight={700} fontFamily="sans-serif" fill="#E1B83F">CUSTOMS</text>
      <circle cx={112} cy={-190} r={60} {...fillLine(fur, STROKE)} />
      <ellipse cx={164} cy={-168} rx={40} ry={28} {...fillLine("#E4C29A", 5)} />
      <circle cx={198} cy={-176} r={13} fill={INK} />
      <circle cx={124} cy={-206} r={expression === "surprised" ? 10 : 8} fill={INK} />
      <path d={`M 108 ${-228 + (earDrop ? 4 : 0)} L 140 ${-232 - (earDrop ? 6 : 0)}`} {...line} strokeWidth={5} />
      <path d={`M 84 -232 Q 56 ${-196 + earDrop} 70 ${-140 + earDrop} Q 94 ${-150 + earDrop} 100 -206 Z`} {...fillLine("#7A5230", 5)} />
      {expression === "happy" ? (
        <g>
          <path d="M 150 -146 Q 172 -132 196 -150" {...line} strokeWidth={4} />
          <ellipse cx={178} cy={-128} rx={11} ry={15} fill="#E07A8A" stroke={INK} strokeWidth={3} />
        </g>
      ) : (
        <path d={expression === "worried" || expression === "sad" ? "M 152 -140 Q 172 -152 194 -142" : "M 152 -146 L 192 -146"} {...line} strokeWidth={4} />
      )}
    </g>
  );
};
