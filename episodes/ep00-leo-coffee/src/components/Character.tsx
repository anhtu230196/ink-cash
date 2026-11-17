import React from "react";
import { useCurrentFrame } from "remotion";
import { C, INK, STROKE } from "../theme";

export type Expression = "happy" | "neutral" | "sad" | "awkward" | "smug" | "disgusted";
export type ArmPose = "down" | "wave" | "hold-cup" | "shrug" | "point";

export type CharacterProps = {
  x: number;
  y: number; // feet position
  scale?: number;
  flip?: boolean;
  shirt: string;
  hair: "curly" | "long" | "short";
  hairColor: string;
  glasses?: boolean;
  tie?: string;
  apron?: string;
  expression?: Expression;
  mouth?: number; // 0..1 how open the mouth is (talking)
  arm?: ArmPose;
  lookX?: number;
};

const line = { stroke: INK, strokeWidth: STROKE, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

// Curly hair = ring of overlapping circles: outlines first, fills on top → one clean silhouette.
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

const Hair: React.FC<{ kind: CharacterProps["hair"]; color: string; layer: "back" | "front" }> = ({ kind, color, layer }) => {
  if (kind === "long" && layer === "back") {
    return <path d="M -108 -345 Q -118 -478 0 -472 Q 118 -478 108 -345 L 122 -262 Q 0 -250 -122 -262 Z" fill={color} {...{ stroke: INK, strokeWidth: STROKE, strokeLinejoin: "round" }} />;
  }
  if (kind === "long" && layer === "front") {
    return <path d="M -98 -330 Q -100 -455 5 -452 Q 95 -450 100 -340 Q 40 -400 -20 -395 Q -60 -380 -98 -330 Z" fill={color} stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" />;
  }
  if (kind === "curly" && layer === "front") {
    return (
      <g>
        {curls.map(([cx, cy, r], i) => <circle key={`o${i}`} cx={cx} cy={cy} r={r} fill={color} stroke={INK} strokeWidth={STROKE} />)}
        {curls.map(([cx, cy, r], i) => <circle key={`f${i}`} cx={cx} cy={cy} r={r - STROKE / 2} fill={color} />)}
        {curls.slice(0, 6).map(([cx, cy], i) => <path key={`c${i}`} d={`M ${cx - 10} ${cy + 4} q 10 -12 20 0`} {...line} strokeWidth={3} opacity={0.45} />)}
      </g>
    );
  }
  if (kind === "short" && layer === "front") {
    return <path d="M -96 -335 Q -105 -465 0 -458 Q 105 -465 96 -335 Q 70 -410 0 -405 Q -70 -410 -96 -335 Z" fill={color} stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" />;
  }
  return null;
};

const Brows: React.FC<{ e: Expression }> = ({ e }) => {
  const y = e === "awkward" ? -392 : -384;
  const tilt = e === "sad" || e === "awkward" ? 9 : e === "disgusted" ? -8 : e === "smug" ? -4 : 0;
  return (
    <g {...line} strokeWidth={5}>
      <path d={`M -44 ${y + tilt} L -14 ${y - tilt}`} />
      <path d={`M 14 ${y - tilt} L 44 ${y + tilt}`} />
    </g>
  );
};

const Mouth: React.FC<{ e: Expression; open: number }> = ({ e, open }) => {
  if (open > 0.08) {
    return <ellipse cx={0} cy={-298} rx={14 + open * 5} ry={3 + open * 13} fill="#6B2A26" stroke={INK} strokeWidth={4} />;
  }
  switch (e) {
    case "happy":
      return <path d="M -26 -306 Q 0 -278 26 -306" {...line} strokeWidth={5} />;
    case "sad":
      return <path d="M -22 -290 Q 0 -310 22 -290" {...line} strokeWidth={5} />;
    case "awkward":
      return <path d="M -24 -298 q 12 -9 24 0 q 12 9 24 0" {...line} strokeWidth={5} transform="translate(-12 0)" />;
    case "smug":
      return <path d="M -20 -300 Q 8 -292 26 -310" {...line} strokeWidth={5} />;
    case "disgusted":
      return <path d="M -22 -296 q 11 -10 22 -2 q 11 8 22 -4" {...line} strokeWidth={5} />;
    default:
      return <path d="M -16 -298 L 16 -298" {...line} strokeWidth={5} />;
  }
};

const Arms: React.FC<{ pose: ArmPose; frame: number }> = ({ pose, frame }) => {
  const sway = Math.sin(frame / 4) * 18;
  const L: string[] = [];
  const R: string[] = [];
  let cup: React.ReactNode = null;
  switch (pose) {
    case "wave":
      L.push("M -60 -225 L -82 -160 L -86 -95");
      R.push(`M 60 -225 L 118 -270 L ${150 + sway} -345`);
      break;
    case "hold-cup":
      L.push("M -60 -225 L -82 -160 L -86 -95");
      R.push("M 60 -225 L 100 -165 L 70 -170");
      cup = (
        <g transform="translate(62 -170)">
          <path d="M -26 -40 L 26 -40 L 20 14 L -20 14 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <rect x={-26} y={-18} width={52} height={16} fill={C.brandOrange} stroke={INK} strokeWidth={4} />
          <path d="M -8 -52 q 6 -10 0 -20 M 8 -52 q 6 -10 0 -20" {...line} strokeWidth={3} opacity={0.6} />
        </g>
      );
      break;
    case "shrug":
      L.push("M -60 -225 L -112 -200 L -138 -252");
      R.push("M 60 -225 L 112 -200 L 138 -252");
      break;
    case "point":
      L.push("M -60 -225 L -82 -160 L -86 -95");
      R.push("M 60 -225 L 120 -235 L 180 -245");
      break;
    default:
      L.push("M -60 -225 L -82 -160 L -86 -95");
      R.push("M 60 -225 L 82 -160 L 86 -95");
  }
  return (
    <g>
      {[...L, ...R].map((d, i) => <path key={i} d={d} {...line} />)}
      {cup}
    </g>
  );
};

export const Character: React.FC<CharacterProps> = ({
  x, y, scale = 1, flip = false, shirt, hair, hairColor, glasses, tie, apron,
  expression = "neutral", mouth = 0, arm = "down", lookX = 0,
}) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 14) * 2.5;
  const blinking = frame % 96 < 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* legs */}
      <g {...line}>
        <path d="M -28 -60 L -32 -6 L -52 -4" />
        <path d="M 28 -60 L 32 -6 L 52 -4" />
      </g>
      <g transform={`translate(0 ${breathe})`}>
        {/* torso */}
        <rect x={-75} y={-272} width={150} height={228} rx={72} fill={shirt} stroke={INK} strokeWidth={STROKE} />
        {apron && <path d="M -62 -205 L 62 -205 L 66 -80 Q 0 -52 -66 -80 Z" fill={apron} stroke={INK} strokeWidth={5} strokeLinejoin="round" />}
        <path d="M -30 -265 L 0 -228 L 30 -265 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {tie && <path d="M 0 -232 L -13 -206 L 0 -140 L 13 -206 Z" fill={tie} stroke={INK} strokeWidth={4} strokeLinejoin="round" />}
        <Arms pose={arm} frame={frame} />
        {/* head */}
        <g transform={`translate(0 ${breathe * 0.4})`}>
          <Hair kind={hair} color={hairColor} layer="back" />
          <circle cx={0} cy={-350} r={98} fill={C.skin} stroke={INK} strokeWidth={STROKE} />
          <Hair kind={hair} color={hairColor} layer="front" />
          <g transform={`translate(${lookX} 0)`}>
            <g transform={blinking ? "translate(0 -345) scale(1 0.15) translate(0 345)" : undefined}>
              <circle cx={-32} cy={-345} r={8} fill={INK} />
              <circle cx={32} cy={-345} r={8} fill={INK} />
            </g>
          </g>
          {glasses && (
            <g fill="rgba(255,255,255,0.22)" stroke={INK} strokeWidth={5}>
              <circle cx={-34} cy={-345} r={27} />
              <circle cx={34} cy={-345} r={27} />
              <path d="M -7 -347 Q 0 -354 7 -347" fill="none" />
              <path d="M -61 -350 L -94 -362 M 61 -350 L 94 -362" fill="none" />
            </g>
          )}
          <Brows e={expression} />
          <Mouth e={expression} open={mouth} />
        </g>
      </g>
    </g>
  );
};

export const LEO = { shirt: "#E9E4D8", hair: "curly" as const, hairColor: "#6B4426", glasses: true, apron: "#3E6B4F" };
export const CUSTOMER = { shirt: "#D8A748", hair: "long" as const, hairColor: "#8A4B27" };
