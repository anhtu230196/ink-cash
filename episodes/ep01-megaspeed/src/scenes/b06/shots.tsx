// Shots for B06 · THE PIPELINE (voice/06_the-pipeline.mp3, lines b06_001…b06_036).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, Expression, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Grain, Lighting, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, rnd } from "../open/sets";
import { Say } from "../b02/shots";
import { Crate } from "../b03/sets";
import { Magnifier } from "../b04/sets";
import { BoardTable, Boardroom, PriceSticker } from "../b05/sets";
import {
  Airfield, Calculator, ChipGrid, CountBoard, Couch, CrateInside, DarkDoorway, GlowCrate, HalfField, Newspaper, PIPE, Pipeline, STUDIO, SphereVenue,
  StudioBuilding, UsedCar,
} from "./sets";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Source: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", right: 70, bottom: 56, fontFamily: HAND_FONT, fontSize: 36, color: "#fff", background: "rgba(14,14,20,0.72)", padding: "6px 22px", borderRadius: 8 }}>{text}</div>
);

/* ---------------- Johor, 2024–2026: the airfield ---------------- */
export const ShotAirfield: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StoryShot from={1.0} to={1.06} originX={1200} originY={700}
      lighting={
        <Lighting
          ambient="#2A3460"
          lights={[
            { x: 1240, y: 760, r: 700, ry: 220, color: "#9BFFB0", intensity: 0.9, glow: 0.3 },
            { x: 1560, y: 660, r: 100, color: "#FFE3A8", intensity: 1, glow: 0.4 },
            { x: 700, y: 600, r: 600, ry: 200, color: "#DDE6FF", intensity: 0.5, glow: 0 },
          ]}
        />
      }
      overlay={<><DateTag text="2024 – 2026" delay={2} /><PlaceTag text="Johor, Malaysia" delay={8} /></>}
    >
      <Airfield />
      {/* crates roll out of the plane toward the building */}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = 1260 + ((frame * 2.4 + i * 52) % 260);
        return <GlowCrate key={i} x={x} y={860} scale={0.5} />;
      })}
    </StoryShot>
  );
};

/** How many chips flowed into the pipeline? */
export const ShotPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const q = usePop(30, 9);
  const pathEl = React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", PIPE);
    return el;
  }, []);
  const L = pathEl ? pathEl.getTotalLength() : 1;
  return (
    <ExplainShot from={1.0} to={1.05} bg="#E9E2D2">
      <Limbo color="#E9E2D2" />
      <Pipeline />
      {Array.from({ length: 26 }).map((_, i) => {
        const t = ((frame * 0.006 + i / 26) % 1);
        const p = pathEl ? pathEl.getPointAtLength(t * L) : { x: t * 1920, y: 540 };
        return <g key={i} transform={`translate(${p.x + (rnd(i) - 0.5) * 60} ${p.y + (rnd(i + 3) - 0.5) * 70}) rotate(${frame * 3 + i * 40})`}><MiniChip size={44} /></g>;
      })}
      <g transform={`translate(1500 300) scale(${q})`}>
        <circle r={120} fill="#FBF7EE" stroke={INK} strokeWidth={7} />
        <text x={0} y={60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={170} fill={AMBER} stroke={INK} strokeWidth={4}>?</text>
      </g>
    </ExplainShot>
  );
};

/** Three newsrooms check the records. */
export const ShotNewsrooms: React.FC = () => {
  const names = ["Bloomberg", "The New York Times", "The Information"];
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      {names.map((n, i) => {
        const p = usePop(2 + i * 8, 12);
        const x = 360 + i * 600;
        return (
          <g key={n} transform={`translate(${x} 0)`} opacity={p}>
            {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={-200 + (rnd(k + i) - 0.5) * 20} y={820 - k * 30} width={400} height={28} fill="#FBF7EE" stroke={INK} strokeWidth={4} />)}
            <Magnifier x={40} y={500} scale={0.9} rot={-25} />
            <rect x={-230} y={880} width={460} height={80} rx={12} fill={INK} />
            <text x={0} y={934} textAnchor="middle" fontFamily={HAND_FONT} fontSize={i === 1 ? 40 : 50} fill="#fff">{n}</text>
          </g>
        );
      })}
    </ExplainShot>
  );
};

/* ---------------- The three counts ---------------- */
export const ShotCount: React.FC<{ n: 1 | 2 | 3 }> = ({ n }) => {
  const frame = useCurrentFrame();
  const p = usePop(8, 12);
  const who = ["Bloomberg", "The New York Times", "The Information"][n - 1];
  const what = ["checked Malaysian customs records", "checked trade data · mid-2024 → early 2026", "cited two people familiar with the deals"][n - 1];
  return (
    <ExplainShot from={1.0} to={1.04}>
      <CountBoard n={n} who={who} what={what}>
        <g transform={`translate(960 680) scale(${p})`}>
          {n === 1 && (
            <g>
              <rect x={-320} y={-160} width={640} height={300} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
              <text x={0} y={-100} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>CUSTOMS RECORDS · MALAYSIA</text>
              {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M -280 ${-50 + i * 38} L ${200 - rnd(i) * 120} ${-50 + i * 38}`} stroke="#B9B2A4" strokeWidth={6} strokeLinecap="round" />)}
            </g>
          )}
          {n === 2 && (
            <g>
              <path d="M -500 0 L 500 0" stroke="#F6F1E7" strokeWidth={10} />
              <rect x={-500} y={-40} width={1000 * interpolate(frame, [10, 60], [0, 1], clamp)} height={80} fill="#9BD8FF" opacity={0.8} />
              <text x={-500} y={110} fontFamily={HAND_FONT} fontSize={48} fill="#F6F1E7">mid-2024</text>
              <text x={500} y={110} textAnchor="end" fontFamily={HAND_FONT} fontSize={48} fill="#F6F1E7">early 2026</text>
            </g>
          )}
          {n === 3 && [-160, 160].map((dx, i) => (
            <g key={i} transform={`translate(${dx} 60)`}>
              <circle cx={0} cy={-140} r={60} fill="#1A1E1A" stroke="#F6F1E7" strokeWidth={4} />
              <path d="M -100 60 Q -100 -70 0 -70 Q 100 -70 100 60 Z" fill="#1A1E1A" stroke="#F6F1E7" strokeWidth={4} />
              <text x={0} y={-130} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#F6F1E7">?</text>
            </g>
          ))}
        </g>
      </CountBoard>
    </ExplainShot>
  );
};

/** A count's total: dollars + chips. */
export const ShotTotal: React.FC<{ dollars: string; chips?: string; label: string; fill: number }> = ({ dollars, chips, label, fill }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const g = interpolate(frame, [6, durationInFrames * 0.8], [0, fill], { ...clamp, easing: Easing.out(Easing.cubic) });
  const a = usePop(2, 12);
  const b = usePop(Math.round(durationInFrames * 0.45), 12);
  return (
    <AbsoluteFill style={{ background: "#14182A" }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }} opacity={0.35}>
        <ChipGrid x={70} y={70} cols={39} rows={21} fill={g} />
      </svg>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT }}>
        <div style={{ fontSize: 48, color: "#C9D4F0", letterSpacing: 3 }}>{label}</div>
        <div style={{ fontSize: 170, color: AMBER, lineHeight: 1.1, transform: `scale(${a})`, textShadow: "0 6px 0 #000" }}>{dollars}</div>
        {chips && <div style={{ fontSize: 80, color: "#9BFFB0", transform: `scale(${b})`, textShadow: "0 4px 0 #000" }}>{chips}</div>}
      </AbsoluteFill>
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

/* ---------------- Shrink the numbers ---------------- */
export const ShotShrink: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = interpolate(frame, [16, 44], [1, 0.08], { ...clamp, easing: Easing.in(Easing.cubic) });
  const beam = frame > 12 && frame < 46;
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <text x={1240} y={600} textAnchor="middle" fontFamily={HAND_FONT} fontSize={260} fill="#C0392B" stroke={INK} strokeWidth={5} transform={`translate(1240 520) scale(${sc}) translate(-1240 -520)`}>$7.5B</text>
      {/* shrink ray */}
      <g transform="translate(300 560) rotate(-4)">
        {beam && <path d="M 200 -10 L 900 -120 L 900 140 L 200 10 Z" fill="#7DFFB0" opacity={0.35} />}
        <rect x={-120} y={-50} width={260} height={100} rx={30} fill="#5C7A99" stroke={INK} strokeWidth={6} />
        <rect x={130} y={-30} width={90} height={60} rx={10} fill="#3A3F44" stroke={INK} strokeWidth={5} />
        <rect x={-60} y={40} width={60} height={110} rx={12} fill="#3A3F44" stroke={INK} strokeWidth={5} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-80 + i * 50} cy={-60} r={12} fill={AMBER} stroke={INK} strokeWidth={3} />)}
      </g>
    </ExplainShot>
  );
};

export const ShotPerChip: React.FC<{ car?: boolean }> = ({ car }) => {
  const p = usePop(car ? 4 : 8, 11);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <g transform={`translate(${car ? 520 : 960} 640)`}>
        <ContactShadow x={0} y={160} w={220} opacity={0.3} />
        <g transform="scale(4)"><MiniChip size={60} /></g>
        <PriceSticker x={200} y={-170} text="$31,000" />
        <text x={0} y={260} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill="#6B6458">per chip (biggest count)</text>
      </g>
      {car && (
        <g opacity={p}>
          <text x={900} y={660} textAnchor="middle" fontFamily={HAND_FONT} fontSize={160} fill={INK}>=</text>
          <g transform={`translate(1400 820) scale(${p})`}>
            <ContactShadow x={0} y={2} w={340} opacity={0.3} />
            <UsedCar x={0} y={0} />
            <PriceSticker x={60} y={-330} text="USED · $31K" rot={-6} />
          </g>
        </g>
      )}
    </ExplainShot>
  );
};

/** About twenty months → every single hour. */
export const ShotMonths: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const n = Math.min(20, Math.floor(interpolate(frame, [4, durationInFrames * 0.8], [1, 20.99], clamp)));
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: The New York Times" />}>
      <Limbo color="#F6F1E7" floor="#E8E0CE" />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${360 + (i % 10) * 130} ${380 + Math.floor(i / 10) * 200})`}>
          <rect x={-55} y={-70} width={110} height={140} rx={8} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
          <rect x={-55} y={-70} width={110} height={34} rx={8} fill="#C0392B" stroke={INK} strokeWidth={4} />
          <text x={0} y={36} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill={INK}>{i + 1}</text>
        </g>
      ))}
      <text x={960} y={220} textAnchor="middle" fontFamily={HAND_FONT} fontSize={90} fill={INK}>~20 months</text>
    </ExplainShot>
  );
};

export const ShotPerHour: React.FC = () => {
  const frame = useCurrentFrame();
  const hand = frame * 12;
  return (
    <AbsoluteFill style={{ background: "#14182A" }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(560 540)">
          <circle r={260} fill="#FBF7EE" stroke={INK} strokeWidth={12} />
          {Array.from({ length: 12 }).map((_, i) => <path key={i} d="M 0 -230 L 0 -200" stroke={INK} strokeWidth={10} transform={`rotate(${i * 30})`} />)}
          <path d="M 0 0 L 0 -190" stroke={INK} strokeWidth={14} strokeLinecap="round" transform={`rotate(${hand})`} />
          <path d="M 0 0 L 0 -120" stroke={INK} strokeWidth={18} strokeLinecap="round" transform={`rotate(${hand / 12})`} />
          <circle r={18} fill={INK} />
        </g>
        {Array.from({ length: 10 }).map((_, i) => {
          const t = ((frame * 0.03 + i / 10) % 1);
          return (
            <g key={i} transform={`translate(${800 + t * 1100} ${400 + Math.sin(t * 6 + i) * 160 + (rnd(i) - 0.5) * 200}) rotate(${t * 200})`} opacity={1 - t}>
              <rect x={-50} y={-26} width={100} height={52} rx={6} fill="#7BB86F" stroke={INK} strokeWidth={4} />
              <circle r={14} fill="#5A9A50" stroke={INK} strokeWidth={3} />
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", right: 120, top: 780, textAlign: "right", fontFamily: HAND_FONT }}>
        <div style={{ fontSize: 140, color: AMBER, lineHeight: 1, textShadow: "0 6px 0 #000" }}>$300,000+</div>
        <div style={{ fontSize: 76, color: "#fff" }}>every single hour</div>
      </div>
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

/** Three Spheres / almost half the Cowboys. */
export const ShotCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const half = Math.round(durationInFrames * 0.5);
  const s = [0, 1, 2].map((i) => interpolate(frame, [2 + i * 6, 10 + i * 6], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }));
  const f = interpolate(frame, [half, half + 20], [0, 0.47], clamp);
  return (
    <ExplainShot from={1.0} to={1.04} bg="#1E2846" overlay={<Source text="Sphere build cost ~$2.3B · Cowboys ~$17B (Forbes)" />}>
      <rect width={1920} height={1080} fill="#1E2846" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${220 + i * 300} 780) scale(${s[i] * 0.8})`}><SphereVenue x={0} y={0} hue={["#5DA8FF", "#F5D547", "#F49AC2"][i]} /></g>
      ))}
      <text x={520} y={900} textAnchor="middle" fontFamily={HAND_FONT} fontSize={54} fill="#F6F1E7">3+ Las Vegas Spheres</text>
      {frame >= half && (
        <g>
          <text x={1060} y={560} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#C9D4F0">or</text>
          <HalfField x={1180} y={420} w={600} h={300} share={f} />
          <text x={1480} y={800} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#F6F1E7">≈ half the Dallas Cowboys</text>
        </g>
      )}
    </ExplainShot>
  );
};

/* ---------------- Skit: the calculator (Investor + Investor 2) ---------------- */
const I1 = { x: 640, y: 1000 };
const I2 = { x: 1300, y: 1000 };

const CalcStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression; spark: number; shown: string }> = ({ m1, m2, e1, e2, spark, shown }) => (
  <>
    <Boardroom slide={0} />
    <Character {...look("investor")} prop="none" x={I1.x} y={I1.y} expression={e1} arm="hold" mouth={m1} lookX={14} />
    <Character {...look("investor2")} x={I2.x} y={I2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
    <BoardTable />
    <Calculator x={960} y={880} text={shown} spark={spark} />
  </>
);

const calcLights = (
  <Lighting
    ambient="#3E3A5A"
    lights={[
      { x: I1.x, y: I1.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: I2.x, y: I2.y - 400, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 960, y: 760, r: 300, ry: 200, color: "#FFE3A8", intensity: 0.9, glow: 0.25 },
    ]}
  />
);

type CalcLine = { line: string; who: "i1" | "i2"; text: string; e1?: Expression; e2?: Expression; spark?: number; shown?: string };

export const ShotCalcWide: React.FC<CalcLine> = ({ line, who, text, e1 = "surprised", e2 = "neutral", spark = 0, shown = "300,000" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={calcLights} vignette={0.45}
      overlay={is1 ? <Say text={text} tailX={I1.x + 60} tailY={360} y={90} /> : <Say text={text} tailX={I2.x - 60} tailY={360} y={90} />}
    >
      <CalcStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} spark={spark} shown={shown} />
    </StoryShot>
  );
};

export const ShotCalcClose: React.FC<CalcLine> = ({ line, who, text, e1 = "surprised", e2 = "neutral", spark = 0, shown = "300,000" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  const cx = is1 ? I1.x + 80 : I2.x - 60;
  const cy = (is1 ? I1.y : I2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><CalcStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} spark={spark} shown={shown} /></Stage>
          {calcLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- The strange gap: hardware vs space ---------------- */
export const ShotGapBars: React.FC = () => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [4, 40], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Bloomberg" />}>
      <Limbo color="#F6F1E7" floor="#E8E0CE" />
      <path d="M 460 860 L 1460 860" stroke={INK} strokeWidth={8} />
      <rect x={560} y={860 - 600 * h} width={260} height={600 * h} fill="#5DB35F" stroke={INK} strokeWidth={6} />
      <rect x={1100} y={860 - 140 * h} width={260} height={140 * h} fill="#9AA0A6" stroke={INK} strokeWidth={6} />
      <text x={690} y={930} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill={INK}>hardware</text>
      <text x={1230} y={930} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill={INK}>declared space</text>
      <path d="M 820 260 L 1100 720" stroke="#C0392B" strokeWidth={6} strokeDasharray="20 14" opacity={h} />
      <text x={1040} y={420} fontFamily={HAND_FONT} fontSize={110} fill="#C0392B" opacity={h}>?!</text>
      <Magnifier x={1520} y={520} scale={1.1} rot={-30} />
    </ExplainShot>
  );
};

export const ShotTooSmall: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={1650} originY={700}
    lighting={<Lighting ambient="#2E3658" lights={[{ x: 1650, y: 720, r: 520, ry: 260, color: "#FFE3A8", intensity: 1, glow: 0.1 }, { x: 1560, y: 660, r: 100, color: "#FFE3A8", intensity: 1, glow: 0.4 }]} />}
    overlay={<Source text="Source: Bloomberg" />}
  >
    <Airfield />
    {Array.from({ length: 24 }).map((_, i) => (
      <Crate key={i} x={1330 + (i % 8) * 80 - Math.floor(i / 8) * 30} y={1000 - Math.floor(i / 8) * 90} label="GPU" scale={0.45} />
    ))}
    <rect x={1540} y={520} width={220} height={50} rx={8} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
    <text x={1650} y={556} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>declared space</text>
  </StoryShot>
);

/** A thousand couches in a studio apartment. */
export const ShotCouches: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.min(40, Math.floor(frame / 2) + 3);
  const cols = ["#C0392B", "#2D4A8A", "#3E8E4F", "#E1B83F", "#7A4E8A"];
  return (
    <ExplainShot from={1.0} to={1.05} originX={960} originY={560}>
      <StudioBuilding />
      <defs><clipPath id="b06studio"><rect x={STUDIO.x} y={STUDIO.y} width={STUDIO.w} height={STUDIO.h} /></clipPath></defs>
      <g clipPath="url(#b06studio)">
        {Array.from({ length: Math.min(n, 18) }).map((_, i) => (
          <Couch key={i} x={STUDIO.x + 90 + (i % 4) * 140} y={STUDIO.y + STUDIO.h - Math.floor(i / 4) * 90} scale={0.62} rot={(rnd(i) - 0.5) * 20} color={cols[i % 5]} />
        ))}
      </g>
      {/* overflow: couches piling outside */}
      {Array.from({ length: Math.max(0, n - 18) }).map((_, i) => (
        <Couch key={`o${i}`} x={i % 2 ? 1360 + (i % 5) * 70 : 560 - (i % 5) * 70} y={860 - Math.floor(i / 4) * 60} scale={0.6} rot={(rnd(i + 9) - 0.5) * 40} color={cols[(i + 2) % 5]} />
      ))}
      <text x={960} y={160} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill={INK}>1,000 couches</text>
    </ExplainShot>
  );
};

/* ---------------- Skit: GPU and GPU 2 whisper inside the crate ---------------- */
const G1 = { x: 720, y: 940 };
const G2 = { x: 1220, y: 940 };

const BoxStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression }> = ({ m1, m2, e1, e2 }) => (
  <>
    <CrateInside />
    <GpuCharacter x={G1.x} y={G1.y} scale={1.6} expression={e1} arm="down" mouth={m1} />
    <GpuCharacter x={G2.x} y={G2.y} scale={1.35} color="#3E8E8A" label="GPU" expression={e2} arm="down" mouth={m2} />
  </>
);

const boxLights = (
  <Lighting
    ambient="#2A2028"
    lights={[
      { x: 1060, y: 640, r: 520, ry: 360, color: "#FFF0C8", intensity: 0.9, glow: 0.15 },
      { x: G1.x, y: G1.y - 200, r: 320, color: "#9BFFB0", intensity: 0.6, glow: 0.2 },
    ]}
  />
);

type BoxLine = { line: string; who: "g1" | "g2"; text: string; e1?: Expression; e2?: Expression };

export const ShotBoxWide: React.FC<BoxLine> = ({ line, who, text, e1 = "worried", e2 = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "g1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={620} lighting={boxLights} vignette={0.6}
      overlay={is1 ? <Say text={text} tailX={G1.x} tailY={560} y={240} /> : <Say text={text} tailX={G2.x} tailY={600} y={280} />}
    >
      <BoxStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} />
    </StoryShot>
  );
};

export const ShotBoxClose: React.FC<BoxLine> = ({ line, who, text, e1 = "worried", e2 = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "g1";
  const cx = is1 ? G1.x : G2.x;
  const cy = (is1 ? G1.y : G2.y) - 200;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.3} cx={cx} cy={cy} tx={is1 ? 760 : 1160} ty={680}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><BoxStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} /></Stage>
          {boxLights}
        </Camera>
      </Closer>
      <Vignette strength={0.6} />
      <Grain opacity={0.09} />
      <Say text={text} tailX={is1 ? 760 : 1160} tailY={380} y={100} />
    </AbsoluteFill>
  );
};

/* ---------------- The part most headlines skip ---------------- */
export const ShotHeadlines: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = interpolate(frame, [10, 50], [1500, 1000], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <StoryShot from={1.0} to={1.08} originX={980} originY={820}
      lighting={<Lighting ambient="#3A3550" lights={[{ x: 980, y: 820, r: 380, ry: 200, color: "#FFF0C8", intensity: 1, glow: 0.2 }, { x: 960, y: 400, r: 800, ry: 400, color: "#DDE6FF", intensity: 0.4, glow: 0 }]} />}
    >
      <rect width={1920} height={1080} fill="#5A4636" />
      <Newspaper x={560} y={520} rot={-6} scale={0.9} headline="$7.5 BILLION!" />
      <Newspaper x={1360} y={520} rot={5} scale={0.9} headline="CHIP PIPELINE!" />
      <Magnifier x={mx} y={820} scale={1.2} rot={-30} />
    </StoryShot>
  );
};

/** Megaspeed's statement. */
export const ShotStatement: React.FC = () => {
  const p = usePop(4, 12);
  const c = usePop(30, 10);
  return (
    <ExplainShot from={1.0} to={1.04} bg="#BFD8E8" overlay={<Source text="Megaspeed statement, as reported" />}>
      <Limbo color="#BFD8E8" floor="#A9C4D6" />
      <g transform={`translate(760 520) scale(${p})`}>
        <path d="M -300 80 Q -380 80 -380 10 Q -380 -70 -290 -70 Q -280 -170 -160 -170 Q -100 -250 10 -230 Q 120 -270 180 -160 Q 300 -180 320 -70 Q 400 -60 390 20 Q 380 80 300 80 Z" fill="#FBF7EE" stroke={INK} strokeWidth={7} />
        <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill={INK}>“small commercial</text>
        <text x={0} y={40} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill={INK}>cloud”</text>
      </g>
      <g transform={`translate(1380 560) scale(${c})`}>
        <rect x={-60} y={-60} width={120} height={120} rx={14} fill="#fff" stroke={INK} strokeWidth={7} />
        <path d="M -36 0 L -8 30 L 44 -34" stroke="#3E8E3F" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x={100} y={20} fontFamily={HAND_FONT} fontSize={56} fill={INK}>as US rules allow</text>
      </g>
      <text x={960} y={900} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill="#2D4A8A">— what Megaspeed says</text>
    </ExplainShot>
  );
};

/** So why did US intelligence step in? */
export const ShotDoorway: React.FC = () => {
  const q = usePop(30, 9);
  return (
    <StoryShot from={1.0} to={1.08} originX={960} originY={500} vignette={0.75}
      lighting={<Lighting ambient="#343C60" lights={[{ x: 960, y: 500, r: 520, ry: 560, color: "#FFE9B8", intensity: 1, glow: 0.35 }]} />}
    >
      <DarkDoorway />
      <text x={1300} y={420} fontFamily={HAND_FONT} fontSize={240} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(1300 360) scale(${q}) translate(-1300 -360)`}>?</text>
    </StoryShot>
  );
};
