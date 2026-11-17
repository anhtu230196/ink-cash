// Shots for B02 part a (voice/02a_the-man-with-the-keys.mp3, lines b02_001…b02_037).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, CharacterLook, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { ageScale, lookAt } from "../../../../../kit/age";
import { ContactShadow, DateTag, Dramatization, Grain, Lighting, PlaceTag, Rim, Vignette, Whip } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { Camera, SpeechBubble, Stage } from "../../../../../kit/ui";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { CAST } from "../../cast";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Diner, Limbo, NumberBack, rnd } from "../open/sets";
import {
  CRT, Cartridge, Chalkboard, DinerExterior, H100Box, HomeworkRoom, KidGrid, Lab, MathFactory, MugStack, Napkin, PROFESSOR, PriceTag, Showroom, TechGiant,
} from "./sets";

/** Speech bubble sized to its text, placed above (tailX, tailY) and kept inside the frame. */
export const Say: React.FC<{ text: string; tailX: number; tailY: number; y?: number }> = ({ text, tailX, tailY, y }) => {
  const w = Math.min(1500, text.length * 27 + 110);
  const x = Math.max(40, Math.min(1880 - w, tailX - w * 0.55));
  return <SpeechBubble x={x} y={y ?? Math.max(40, tailY - 280)} w={w} text={text} tailX={tailX} tailY={tailY} delay={2} />;
};

const GPU2 = CAST.find((c) => c.id === "gpu2");
const GPU2_COLOR = GPU2 && GPU2.kind === "gpu" ? GPU2.color : "#3E8E8A";

/* ------------------------------------------------------------------ */
/* Denny's, 1993                                                       */
/* ------------------------------------------------------------------ */

export const ShotDinerExterior: React.FC = () => (
  <StoryShot
    from={1.0} to={1.07} originX={1000} originY={500}
    lighting={
      <Lighting
        ambient="#2A3460"
        lights={[
          { x: 860, y: 565, r: 60, rect: { w: 920, h: 170 }, color: "#FFE3A8", intensity: 1, glow: 0.4 },
          { x: 1705, y: 225, r: 40, rect: { w: 290, h: 150 }, color: "#FFE9A0", intensity: 1, glow: 0.5, flicker: 0.03 },
          { x: 900, y: 860, r: 700, ry: 160, color: "#FFDFA8", intensity: 0.55, glow: 0 },
        ]}
      />
    }
    overlay={<><DateTag text="April 1993" delay={2} /><PlaceTag text="San Jose, Calif." delay={6} /></>}
  >
    <DinerExterior />
  </StoryShot>
);

/** Young Jensen sketches on a napkin; mugs pile up. Co-founders kept generic (real people, no lines). */
export const ShotBooth1993: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const j = look("jensen", 1993);
  const n = Math.round(interpolate(frame, [0, durationInFrames], [3, 11], { extrapolateRight: "clamp" }));
  const draw = interpolate(frame, [6, durationInFrames * 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const coA: CharacterLook = { outfit: "plain", color: "#7A8C6A", hair: "short", hairColor: "#5A4632", glasses: true };
  const coB: CharacterLook = { outfit: "plain", color: "#8E6B5A", hair: "side", hairColor: "#3B2A1E" };
  return (
    <StoryShot
      from={1.02} to={1.08} originX={960} originY={620}
      lighting={
        <Lighting
          ambient="#4A2E2E"
          lights={[
            { x: 960, y: 560, r: 300, color: "#FFE9CC", intensity: 0.95, glow: 0 },
            { x: 960, y: 650, r: 560, ry: 380, color: "#FFD08A", intensity: 1, glow: 0.3, flicker: 0.02 },
            { x: 690, y: 330, r: 60, rect: { w: 520, h: 160 }, color: "#FF8FA0", intensity: 0.8, glow: 0.35, flicker: 0.08 },
          ]}
          cones={[{ x: 960, y: 422, topW: 160, bottomW: 760, h: 300, color: "#FFE3B8", opacity: 0.24 }]}
        />
      }
      overlay={<DateTag text="1993" delay={2} />}
    >
      <Diner part="back" />
      <Character {...coA} x={430} y={900} scale={0.9} expression="happy" arm="down" lookX={10} />
      <Character {...coB} x={1490} y={900} scale={0.9} expression="neutral" arm="down" lookX={-10} />
      <Rim x={960} y={430} color="#FFD9A0" strength={1.1} width={8}>
        <Character {...j} x={960} y={900} scale={1} expression="happy" arm="point" lookX={-4} />
      </Rim>
      <Diner part="front" mug={false} foreground />
      <MugStack x={560} y={700} n={n} />
      <Napkin x={1100} y={722} scale={0.42} rot={-4} draw={draw} />
    </StoryShot>
  );
};

/** 33 years in 2.7 s: the same Jensen, hair going from black to silver, years ticking. */
export const ShotYearsMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const year = Math.round(interpolate(frame, [0, durationInFrames * 0.85], [1993, 2026], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }));
  const entry = CAST.find((c) => c.id === "jensen");
  const j = entry ? lookAt(entry, year) : look("jensen");
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Camera from={1} to={1.05}>
        <Stage>
          <NumberBack color="#2A2F4A" />
          <ContactShadow x={960} y={962} w={220} opacity={0.5} />
          <Character {...j} x={960} y={960} scale={1.05} expression="happy" arm="down" />
        </Stage>
      </Camera>
      <div style={{ position: "absolute", left: 1290, top: 360, fontFamily: HAND_FONT, color: AMBER, fontSize: 190, lineHeight: 1 }}>{year}</div>
      <div style={{ position: "absolute", left: 1296, top: 560, fontFamily: HAND_FONT, color: "#fff", fontSize: 54 }}>{year - 1993} years as CEO</div>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Skit: present-day Jensen back at the booth with GPU                  */
/* ------------------------------------------------------------------ */

const JX = 720;
const GX = 1220;

const BoothSkit: React.FC<{ jMouth: number; gMouth: number; jExpr?: React.ComponentProps<typeof Character>["expression"]; gExpr?: React.ComponentProps<typeof GpuCharacter>["expression"] }> = ({
  jMouth, gMouth, jExpr = "happy", gExpr = "neutral",
}) => (
  <>
    <Diner part="back" />
    <Rim x={960} y={420} color="#FFD9A0" strength={1.1} width={8}>
      <Character {...look("jensen")} x={JX} y={840} scale={1} expression={jExpr} arm="point" mouth={jMouth} lookX={10} prop="none" />
    </Rim>
    <Diner part="front" mug={false} />
    <Napkin x={980} y={716} scale={0.4} rot={6} />
    <GpuCharacter x={GX} y={700} scale={0.8} expression={gExpr} arm="down" mouth={gMouth} />
  </>
);

const boothLights = (
  <Lighting
    ambient="#4E4650"
    lights={[
      { x: JX, y: 490, r: 280, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: GX, y: 556, r: 220, color: "#FFF8F0", intensity: 0.95, glow: 0 },
      { x: 960, y: 680, r: 560, ry: 300, color: "#FFE2B0", intensity: 0.9, glow: 0.22, flicker: 0.02 },
      { x: 1230, y: 330, r: 50, rect: { w: 260, h: 120 }, color: "#9FE8FF", intensity: 0.6, glow: 0.25, flicker: 0.04 },
    ]}
    cones={[{ x: 960, y: 422, topW: 160, bottomW: 760, h: 300, color: "#FFE3B8", opacity: 0.22 }]}
  />
);

/** Wide two-shot; `speaker` picks whose line plays (and whose mouth moves). */
export const ShotBoothWide: React.FC<{ line: string; speaker: "jensen" | "gpu"; text: string; jExpr?: React.ComponentProps<typeof Character>["expression"] }> = ({ line, speaker, text, jExpr }) => {
  const mouth = useMouth(audioFile(EP, line));
  const bubble = speaker === "jensen" ? <Say text={text} tailX={700} tailY={420} y={120} /> : <Say text={text} tailX={1220} tailY={440} y={160} />;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560} lighting={boothLights} vignette={0.5} overlay={<>{bubble}<Dramatization /></>}>
      <BoothSkit jMouth={speaker === "jensen" ? mouth : 0} gMouth={speaker === "gpu" ? mouth : 0} jExpr={jExpr} />
    </StoryShot>
  );
};

/** Close-up on one of the two, same set. */
export const ShotBoothClose: React.FC<{ line: string; who: "jensen" | "gpu"; text: string; gExpr?: React.ComponentProps<typeof GpuCharacter>["expression"]; jExpr?: React.ComponentProps<typeof Character>["expression"] }> = ({
  line, who, text, gExpr, jExpr,
}) => {
  const mouth = useMouth(audioFile(EP, line));
  const isJ = who === "jensen";
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={isJ ? 1.75 : 1.9} cx={isJ ? JX : GX} cy={isJ ? 520 : 560} tx={isJ ? 640 : 1240} ty={600}>
        <Camera from={1} to={1.03} originX={isJ ? JX : GX} originY={520}>
          <Stage><BoothSkit jMouth={isJ ? mouth : 0} gMouth={isJ ? 0 : mouth} gExpr={gExpr} jExpr={jExpr} /></Stage>
          {boothLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isJ ? <Say text={text} tailX={880} tailY={400} y={130} /> : <Say text={text} tailX={1180} tailY={400} y={130} />}
      <Dramatization />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Games, professor, kindergarten                                       */
/* ------------------------------------------------------------------ */

export const ShotCRT: React.FC = () => {
  const frame = useCurrentFrame();
  const sag = interpolate(frame, [10, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <ExplainShot from={1.0} to={1.08} bg="#2B2420">
      <rect width={1920} height={1080} fill="#4A3B33" />
      <CRT sag={sag} />
      <text x={960} y={1010} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#F3F1E8" opacity={sag}>“wet cardboard”</text>
    </ExplainShot>
  );
};

export const ShotProfessor: React.FC<{ close?: "brilliant" | "serious" }> = ({ close }) => {
  const prof = <Character {...PROFESSOR} x={1380} y={990} scale={1.1} expression={close === "brilliant" ? "smug" : close === "serious" ? "neutral" : "happy"} arm={close === "serious" ? "down" : "point"} lookX={-10} />;
  const stage = (
    <>
      <Chalkboard solved={1} />
      <ContactShadow x={1380} y={992} w={220} opacity={0.3} />
      {prof}
    </>
  );
  if (!close) {
    return <ExplainShot from={1.0} to={1.05}>{stage}</ExplainShot>;
  }
  return (
    <AbsoluteFill style={{ background: "#D9D2C0" }}>
      <Closer s={2.1} cx={1380} cy={590} tx={960} ty={560}>
        <Camera from={1} to={1.04} originX={1380} originY={590}><Stage>{stage}</Stage></Camera>
      </Closer>
      {close === "brilliant" && (
        <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {[[640, 230], [1300, 210], [1350, 470]].map(([x, y], i) => (
            <path key={i} d={`M ${x} ${y - 40} L ${x + 12} ${y - 12} L ${x + 40} ${y} L ${x + 12} ${y + 12} L ${x} ${y + 40} L ${x - 12} ${y + 12} L ${x - 40} ${y} L ${x - 12} ${y - 12} Z`} fill="#F5D547" stroke={INK} strokeWidth={4} />
          ))}
        </svg>
      )}
      <Vignette strength={0.3} />
    </AbsoluteFill>
  );
};

/** One problem at a time: a long queue of problem cards waits while the professor solves one. */
export const ShotQueue: React.FC = () => {
  const frame = useCurrentFrame();
  const probs = ["2+2", "9×3", "8-1", "5×5", "7+6", "4÷2", "3×9", "6+1", "9-9", "1+8", "7×7"];
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <Character {...PROFESSOR} x={300} y={960} scale={0.9} expression="neutral" arm="point" lookX={10} />
      {probs.map((p, i) => {
        const x = 520 + i * 150;
        const bob = Math.sin(frame / 6 + i) * 4;
        return (
          <g key={i} transform={`translate(${x} ${640 + bob})`}>
            <rect x={-62} y={-42} width={124} height={84} rx={12} fill={i === 0 ? "#F5D547" : "#fff"} stroke={INK} strokeWidth={5} />
            <text x={0} y={16} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>{p}</text>
          </g>
        );
      })}
      <text x={1780} y={760} textAnchor="end" fontFamily={HAND_FONT} fontSize={48} fill="#6B6458">…and 9,999 more</text>
      <text x={520} y={540} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill={INK}>NOW SOLVING</text>
      <path d="M 520 552 L 520 590" stroke={INK} strokeWidth={5} />
    </ExplainShot>
  );
};

export const ShotGpuReveal: React.FC = () => {
  const p = usePop(2, 10);
  return (
    <Whip inFrames={6} outFrames={0}>
      <StoryShot
        from={1.0} to={1.06}
        lighting={<Lighting ambient="#22304A" lights={[{ x: 960, y: 560, r: 420, color: "#C9FF9A", intensity: 1, glow: 0.45 }]} cones={[{ x: 960, y: 0, topW: 120, bottomW: 700, h: 900, color: "#DFFFD0", opacity: 0.2 }]} />}
      >
        <rect width={1920} height={1080} fill="#9AA6AE" />
        <rect x={0} y={860} width={1920} height={220} fill="#7C7468" />
        <ContactShadow x={960} y={862} w={260} />
        <g transform={`translate(960 860) scale(${p}) translate(-960 -860)`}>
          <GpuCharacter x={960} y={860} scale={1.25} expression="smug" arm="wave" />
        </g>
      </StoryShot>
    </Whip>
  );
};

export const ShotKidsWide: React.FC<{ cols?: number; rows?: number; label?: boolean; fast?: boolean }> = ({ cols = 20, rows = 9, label = true, fast }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 90], [1.35, 1.0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const n = usePop(14, 12);
  return (
    <AbsoluteFill style={{ background: "#EDE6D6" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "960px 540px" }}>
        <Stage>
          <rect width={1920} height={1080} fill="#F2E6CF" />
          <KidGrid cols={cols} rows={rows} sync={!fast} paint={fast ? 1 : 0} />
        </Stage>
      </AbsoluteFill>
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, display: "flex", justifyContent: "center", transform: `scale(${n})` }}>
          <div style={{ background: "rgba(14,14,20,0.85)", borderRadius: 18, padding: "6px 50px", fontFamily: HAND_FONT, fontSize: 120, color: AMBER }}>10,000</div>
        </div>
      )}
      <Vignette strength={0.25} />
    </AbsoluteFill>
  );
};

const kidLook = (i: number): CharacterLook => ({
  outfit: "plain", color: ["#E0453A", "#4A6FA5", "#5DB35F"][i % 3], hair: (["spiky", "bob", "short"] as const)[i % 3], hairColor: ["#1F1F1F", "#8A4B27", "#C9A15B"][i % 3],
  skin: ["#F1D3B0", "#C68E62", "#E2B48C"][i % 3],
});

export const ShotCalculusKid: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ExplainShot from={1.0} to={1.06} originY={600}>
      <Limbo />
      <rect x={1080} y={180} width={680} height={360} rx={14} fill="#2F4A3A" stroke="#6B4A31" strokeWidth={18} />
      <text x={1420} y={310} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#F3F1E8">d/dx (sin x · eˣ) = ?</text>
      <text x={1420} y={430} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#F3F1E8" opacity={0.7}>lim n→∞ …</text>
      <ContactShadow x={720} y={962} w={140} opacity={0.3} />
      <Character {...kidLook(0)} x={720} y={960} scale={ageScale(6) * 1.3} expression="worried" arm="down" lookX={12} />
      {[0, 1, 2].map((i) => (
        <text key={i} x={820 + i * 60} y={420 - i * 40 + Math.sin(frame / 5 + i) * 8} fontFamily={HAND_FONT} fontSize={90 + i * 10} fill={INK}>?</text>
      ))}
    </ExplainShot>
  );
};

export const ShotPasteKid: React.FC = () => {
  const frame = useCurrentFrame();
  const bite = (Math.sin(frame / 3) + 1) / 2;
  return (
    <ExplainShot from={1.06} to={1.12} originX={960} originY={560}>
      <Limbo color="#E8F0E4" floor="#D5E2CF" />
      <Character {...kidLook(1)} x={960} y={1040} scale={ageScale(6) * 1.7} expression="happy" arm="down" mouth={bite * 0.6} />
      {/* glue stick at the mouth */}
      <g transform={`translate(${1090 + bite * 12} 702) rotate(-100)`}>
        <rect x={-22} y={-90} width={44} height={110} rx={8} fill="#F2B544" stroke={INK} strokeWidth={5} />
        <rect x={-18} y={-120} width={36} height={34} rx={6} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
        <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={22} fill={INK} transform="rotate(90 0 -30)">GLUE</text>
      </g>
    </ExplainShot>
  );
};

/** All 10,000 colour at once: a mosaic fills in everywhere in the same instant. */
export const ShotSyncColor: React.FC = () => {
  const frame = useCurrentFrame();
  const paint = interpolate(frame, [24, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#F2E6CF" }}>
      <Camera from={1.0} to={1.05}>
        <Stage>
          <rect width={1920} height={1080} fill="#F2E6CF" />
          <KidGrid cols={24} rows={10} x0={30} y0={80} w={1860} h={960} paint={paint} />
        </Stage>
      </Camera>
      {paint > 0.5 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "rgba(14,14,20,0.85)", borderRadius: 18, padding: "10px 60px", fontFamily: HAND_FONT, fontSize: 140, color: AMBER }}>ALL AT ONCE</div>
        </div>
      )}
      <Vignette strength={0.25} />
    </AbsoluteFill>
  );
};

/** The classroom shrinks into the chip: that's a GPU. */
export const ShotGridToChip: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const label = usePop(44, 12);
  return (
    <AbsoluteFill style={{ background: "#1C2142" }}>
      <Stage>
        <NumberBack />
        <g opacity={1 - t * 0.2} transform={`translate(960 540) scale(${1 - t * 0.78}) translate(-960 -540)`}>
          <rect x={30} y={60} width={1860} height={960} rx={60} fill="#F2E6CF" />
          <KidGrid cols={24} rows={10} x0={30} y0={80} w={1860} h={960} paint={1} />
        </g>
        <g opacity={t}>
          <g transform="translate(960 540) scale(8.4)"><MiniChip size={60} /></g>
        </g>
        <g opacity={t} transform="translate(960 540) scale(0.22) translate(-960 -540)">
          <KidGrid cols={24} rows={10} x0={30} y0={80} w={1860} h={960} paint={1} />
        </g>
      </Stage>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center", fontFamily: HAND_FONT, color: AMBER, fontSize: 96, transform: `scale(${label})` }}>GPU</div>
      <Vignette strength={0.5} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

export const ShotFactory: React.FC = () => (
  <ExplainShot from={1.0} to={1.05}>
    <MathFactory />
  </ExplainShot>
);

/** AI researchers peek at the GPU in a dark lab. Fictional, generic people. */
export const ShotLab: React.FC = () => {
  const r1: CharacterLook = { outfit: "cardigan", color: "#4A6FA5", color2: "#E9E4D8", hair: "short", hairColor: "#2B2622", glasses: true, skin: "#E2B48C" };
  const r2: CharacterLook = { outfit: "polo", color: "#8E6BB5", color2: "#F6F1E7", hair: "bun", hairColor: "#1F1F1F", skin: "#C68E62" };
  return (
    <StoryShot
      from={1.02} to={1.09} originX={1300} originY={560}
      lighting={
        <Lighting
          ambient="#1E2742"
          lights={[
            { x: 1440, y: 650, r: 240, color: "#9BFF8A", intensity: 1, glow: 0.5, flicker: 0.04 },
            { x: 1180, y: 520, r: 260, color: "#C4FFBE", intensity: 0.9, glow: 0 },
            { x: 1640, y: 520, r: 260, color: "#C4FFBE", intensity: 0.9, glow: 0 },
            { x: 560, y: 370, r: 60, rect: { w: 760, h: 460 }, color: "#D5DEFF", intensity: 0.5, glow: 0.1 },
          ]}
        />
      }
    >
      <Lab />
      <Rim x={1440} y={680} color="#B9FFAA" strength={1.3} width={7}>
        <g>
          <Character {...r1} x={1180} y={1000} scale={0.95} expression="surprised" arm="down" lookX={14} />
          <Character {...r2} x={1650} y={1000} scale={0.95} expression="smug" arm="point" lookX={-14} />
        </g>
      </Rim>
    </StoryShot>
  );
};

export const ShotTrillions: React.FC = () => {
  const frame = useCurrentFrame();
  const p = usePop(4, 9);
  const syms = ["+", "×", "−", "÷", "=", "²"];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Camera from={1} to={1.06}>
        <Stage>
          <NumberBack />
          {Array.from({ length: 60 }).map((_, i) => {
            const y = ((frame * (4 + rnd(i) * 4) + rnd(i + 5) * 1200) % 1300) - 100;
            return <text key={i} x={rnd(i + 2) * 1920} y={y} fontFamily={HAND_FONT} fontSize={30 + rnd(i + 7) * 50} fill="#F3F1E8" opacity={0.25}>{syms[i % 6]}</text>;
          })}
        </Stage>
      </Camera>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT }}>
        <div style={{ fontSize: 210, color: AMBER, transform: `scale(${p})`, lineHeight: 1, textShadow: "0 0 40px rgba(242,181,68,0.45)" }}>TRILLIONS</div>
        <div style={{ fontSize: 66, color: "#fff", opacity: p, marginTop: 10, letterSpacing: 3 }}>of tiny math problems</div>
      </AbsoluteFill>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Skit: GPU and GPU 2 at tiny desks                                   */
/* ------------------------------------------------------------------ */

const HW = { g1: 560, g2: 1360 };

const HomeworkStage: React.FC<{ m1: number; m2: number; melt: number; e1: React.ComponentProps<typeof GpuCharacter>["expression"]; e2: React.ComponentProps<typeof GpuCharacter>["expression"] }> = ({ m1, m2, melt, e1, e2 }) => (
  <>
    <HomeworkRoom melt={melt} />
    <GpuCharacter x={HW.g1} y={770} scale={0.8} expression={e1} arm="down" mouth={m1} />
    <GpuCharacter x={HW.g2} y={770} scale={0.72} color={GPU2_COLOR} expression={e2} arm="down" mouth={m2} label="GPU" />
    {/* desk fronts drawn again so the GPUs sit behind their desks */}
    {[HW.g1, HW.g2].map((x) => <rect key={x} x={x - 220} y={700} width={440} height={28} fill="#C79A63" stroke={INK} strokeWidth={6} />)}
  </>
);

const homeworkLights = (
  <Lighting
    ambient="#3A3456"
    lights={[
      { x: 1030, y: 540, r: 620, ry: 420, color: "#FFDFA8", intensity: 1, glow: 0.25, flicker: 0.015 },
      { x: HW.g1, y: 600, r: 230, color: "#FFF6CC", intensity: 0.9, glow: 0 },
      { x: HW.g2, y: 610, r: 230, color: "#FFF6CC", intensity: 0.9, glow: 0 },
      { x: HW.g1 - 80, y: 640, r: 200, color: "#FFF2A0", intensity: 0.6, glow: 0.35 },
      { x: HW.g2 - 80, y: 640, r: 200, color: "#FFF2A0", intensity: 0.6, glow: 0.35 },
    ]}
  />
);

export const ShotHomework: React.FC<{ line: string; who: "gpu" | "gpu2"; text: string; close?: boolean; melt?: boolean; e1?: React.ComponentProps<typeof GpuCharacter>["expression"]; e2?: React.ComponentProps<typeof GpuCharacter>["expression"] }> = ({
  line, who, text, close, melt, e1 = "worried", e2 = "neutral",
}) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const meltAmt = melt ? interpolate(frame, [0, 40], [0.2, 1], { extrapolateRight: "clamp" }) : 0;
  const stage = <HomeworkStage m1={who === "gpu" ? mouth : 0} m2={who === "gpu2" ? mouth : 0} melt={meltAmt} e1={e1} e2={e2} />;
  const cx = who === "gpu" ? HW.g1 : HW.g2;
  const bubble = close
    ? <Say text={text} tailX={who === "gpu" ? 760 : 1160} tailY={330} y={90} />
    : <Say text={text} tailX={who === "gpu" ? HW.g1 : HW.g2} tailY={520} y={200} />;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {close ? (
        <Closer s={2.0} cx={cx} cy={620} tx={who === "gpu" ? 640 : 1280} ty={640}>
          <Camera from={1} to={1.03} originX={cx} originY={650}><Stage>{stage}</Stage>{homeworkLights}</Camera>
        </Closer>
      ) : (
        <Camera from={1.0} to={1.05} originX={960} originY={620}><Stage>{stage}</Stage>{homeworkLights}</Camera>
      )}
      <Vignette strength={0.55} />
      <Grain opacity={0.08} />
      {bubble}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Every tech giant wants H100s                                        */
/* ------------------------------------------------------------------ */

export const ShotGiantsQueue: React.FC = () => {
  const frame = useCurrentFrame();
  const shuffle = Math.sin(frame / 3) * 6;
  return (
    <ExplainShot from={1.0} to={1.05} originX={1200} bg="#B9B3A6">
      <Showroom />
      <H100Box x={1440} y={480} scale={0.75} />
      {["#2E3A57", "#7A2E3A", "#3E6B4F", "#5C6B7A", "#8A5A3B"].map((c, i) => (
        <TechGiant key={i} x={900 - i * 190 + (i % 2 ? shuffle : -shuffle)} y={960} scale={0.95 - i * 0.04} color={c} cash />
      ))}
    </ExplainShot>
  );
};

export const ShotH100: React.FC = () => {
  const p = usePop(2, 12);
  return (
    <StoryShot
      from={1.0} to={1.08} originX={960} originY={520}
      lighting={<Lighting ambient="#2B2440" lights={[{ x: 960, y: 520, r: 460, color: "#FFF4DC", intensity: 1, glow: 0.3 }]} cones={[{ x: 960, y: 0, topW: 160, bottomW: 900, h: 860, opacity: 0.22 }]} />}
    >
      <rect width={1920} height={1080} fill="#B9B3A6" />
      <rect x={760} y={640} width={400} height={440} fill="#ECE6D8" stroke={INK} strokeWidth={6} />
      <rect x={730} y={620} width={460} height={40} fill="#D9D2C0" stroke={INK} strokeWidth={6} />
      <g transform={`translate(960 470) scale(${0.6 + 0.6 * p})`}><H100Box x={0} y={0} scale={1} /></g>
    </StoryShot>
  );
};

export const ShotPrice: React.FC = () => (
  <ExplainShot from={1.0} to={1.05} bg="#B9B3A6">
    <rect width={1920} height={1080} fill="#B9B3A6" />
    <H100Box x={560} y={560} scale={0.9} />
    <PriceTag x={1300} y={560} text="$$,$$$" sub="tens of thousands · EACH" />
  </ExplainShot>
);

export const ShotFreeGame: React.FC = () => {
  const frame = useCurrentFrame();
  const hope = Math.sin(frame / 4) * 6;
  return (
    <ExplainShot from={1.04} to={1.1} originX={960} originY={620}>
      <Limbo />
      <H100Box x={1350} y={560} scale={0.8} />
      <Character {...kidLook(2)} x={700} y={1000} scale={ageScale(9) * 1.5} expression="surprised" arm="down" lookX={14} />
      <Cartridge x={900} y={600 + hope} scale={0.9} rot={-10} />
    </ExplainShot>
  );
};

export { Grain, Vignette };
