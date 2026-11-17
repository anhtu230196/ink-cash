// Shots for B02 part b (voice/02b_the-man-with-the-keys.mp3, lines b02_038…b02_073).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, Expression, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Dramatization, Grain, Lighting, PlaceTag, Rim, Vignette, Whip } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { Camera, Stage } from "../../../../../kit/ui";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, PaperWall, rnd } from "../open/sets";
import { H100Box, Showroom } from "./sets";
import {
  Audience, Brain, Cannon, CashFan, ChipScreen, CodePlug, Controller, GiantChip, GoldHills, HearingRoom, KeyRing, KeynoteStage, NightSkyline, Pie,
  Podium, Prospector, Radar, RaceTrack, ShovelPlanet, ShovelStand, SlideKind, SocketPanel, WallDoor, Waitlist,
} from "./setsB";
import { Say } from "./shots";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Close-up framing of a lit stage: Closer + slow push + the same lights, then vignette, grain and overlays. */
const CloseUp: React.FC<{ s: number; cx: number; cy: number; tx: number; ty: number; lights: React.ReactNode; overlay?: React.ReactNode; children: React.ReactNode }> = ({
  s, cx, cy, tx, ty, lights, overlay, children,
}) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Closer s={s} cx={cx} cy={cy} tx={tx} ty={ty}>
      <Camera from={1} to={1.03} originX={cx} originY={cy}><Stage>{children}</Stage>{lights}</Camera>
    </Closer>
    <Vignette strength={0.5} />
    <Grain opacity={0.08} />
    {overlay}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Skit: two investors at the velvet rope                               */
/* ------------------------------------------------------------------ */

const I1 = 520;
const I2 = 880;
const FEET = 960;

const RopeStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression; list: number }> = ({ m1, m2, e1, e2, list }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 4) * 18;
  return (
    <>
      <Showroom />
      <H100Box x={1440} y={480} scale={0.75} />
      <ContactShadow x={I1} y={FEET + 2} w={180} opacity={0.4} />
      <ContactShadow x={I2} y={FEET + 2} w={170} opacity={0.4} />
      <Character {...look("investor")} x={I1} y={FEET} expression={e1} arm="wave" mouth={m1} lookX={12} />
      <CashFan x={I1 + 150 + sway} y={FEET - 360} scale={0.9} rot={-14 + sway * 0.3} />
      <Character {...look("investor2")} prop={list > 0 ? "none" : "cup"} x={I2} y={FEET} expression={e2} arm="hold" mouth={m2} lookX={-10} />
      {list > 0 && <Waitlist x={I2 + 76} y={FEET - 175} floor={FEET + 30} len={1500} grow={list} />}
    </>
  );
};

const ropeLights = (
  <Lighting
    ambient="#3E3858"
    lights={[
      { x: I1, y: FEET - 350, r: 260, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: I2, y: FEET - 350, r: 240, color: "#FFF8F0", intensity: 0.95, glow: 0 },
      { x: 1440, y: 520, r: 340, color: "#FFF2D0", intensity: 1, glow: 0.3 },
      { x: 800, y: 900, r: 700, ry: 200, color: "#FFE2B0", intensity: 0.6, glow: 0 },
    ]}
    cones={[{ x: 1440, y: 0, topW: 120, bottomW: 640, h: 820, color: "#FFF2D0", opacity: 0.22 }]}
  />
);

type InvestorLine = { line: string; who: "i1" | "i2"; text: string; e1?: Expression; e2?: Expression; list?: [number, number] };

export const ShotRopeWide: React.FC<InvestorLine> = ({ line, who, text, e1 = "happy", e2 = "neutral", list = [0, 0] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mouth = useMouth(audioFile(EP, line));
  const grow = interpolate(frame, [0, durationInFrames], list, clamp);
  return (
    <StoryShot from={1.0} to={1.05} originX={900} originY={600} lighting={ropeLights} vignette={0.5}
      overlay={who === "i1" ? <Say text={text} tailX={I1 + 20} tailY={500} y={200} /> : <Say text={text} tailX={I2} tailY={500} y={200} />}
    >
      <RopeStage m1={who === "i1" ? mouth : 0} m2={who === "i2" ? mouth : 0} e1={e1} e2={e2} list={grow} />
    </StoryShot>
  );
};

export const ShotRopeClose: React.FC<InvestorLine> = ({ line, who, text, e1 = "happy", e2 = "neutral", list = [0, 0] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mouth = useMouth(audioFile(EP, line));
  const grow = interpolate(frame, [0, durationInFrames], list, clamp);
  const isI1 = who === "i1";
  const sweat = isI1 && e1 === "worried";
  return (
    <CloseUp s={1.8} cx={isI1 ? I1 : I2} cy={FEET - 360} tx={isI1 ? 760 : 1160} ty={640} lights={ropeLights}
      overlay={<>
        {isI1 ? <Say text={text} tailX={880} tailY={430} y={110} /> : <Say text={text} tailX={1080} tailY={430} y={110} />}
        {sweat && <Sweat x={590} y={520} />}
      </>}
    >
      <RopeStage m1={isI1 ? mouth : 0} m2={isI1 ? 0 : mouth} e1={e1} e2={e2} list={grow} />
    </CloseUp>
  );
};

const Sweat: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const t = (frame % 24) / 24;
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <path d={`M ${x} ${y + t * 60} q -16 26 0 34 q 16 -8 0 -34 Z`} fill="#9FD8FF" stroke={INK} strokeWidth={4} opacity={1 - t * 0.6} />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Shovels in a gold rush → the only shovels on Earth                  */
/* ------------------------------------------------------------------ */

export const ShotShovels: React.FC = () => (
  <ExplainShot from={1.0} to={1.06} originX={960} originY={620}>
    <GoldHills />
    {/* little wooden sign */}
    <g transform="translate(1640 700) rotate(4)">
      <path d="M 0 0 L 0 200" stroke="#8A5A3B" strokeWidth={16} />
      <rect x={-130} y={-70} width={260} height={90} rx={8} fill="#C79A63" stroke={INK} strokeWidth={5} />
      <text x={0} y={-12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>AI GOLD RUSH</text>
    </g>
    <GpuCharacter x={960} y={790} scale={0.75} expression="happy" arm="wave" />
    <ShovelStand x={960} y={900} />
    {[0, 1, 2, 3].map((i) => <Prospector key={i} x={520 - i * 150} y={1010} scale={1} i={i} cash />)}
    {[0, 1, 2].map((i) => <Prospector key={`r${i}`} x={1420 + i * 150} y={1030} scale={0.95} i={i + 4} cash />)}
  </ExplainShot>
);

export const ShotOnlyShovels: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 50], [1.9, 1.0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const p = usePop(40, 10);
  return (
    <AbsoluteFill style={{ background: "#141833" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "960px 420px" }}>
        <Stage>
          <rect width={1920} height={1080} fill="#141833" />
          {Array.from({ length: 70 }).map((_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 11) * 700} r={1.5 + rnd(i + 3) * 2.5} fill="#F3F1E8" opacity={0.7} />)}
          <ShovelPlanet spin={6 - frame * 0.06} />
        </Stage>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 60, textAlign: "center", fontFamily: HAND_FONT, fontSize: 100, color: "#fff", transform: `scale(${p})` }}>
        the <span style={{ color: AMBER }}>ONLY</span> shovels on Earth
      </div>
      <Vignette strength={0.45} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Why not switch? The code only fits one socket                       */
/* ------------------------------------------------------------------ */

export const ShotCodePlug: React.FC = () => {
  const frame = useCurrentFrame();
  const eng = { outfit: "polo" as const, color: "#4A6FA5", color2: "#F6F1E7", hair: "short" as const, hairColor: "#2B2622", glasses: true, skin: "#E2B48C", prop: "laptop" as const };
  // path: start → bump the round socket → shake → slide up into the chip socket
  const a = interpolate(frame, [4, 32], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const b = interpolate(frame, [58, 84], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const shake = frame > 32 && frame < 50 ? Math.sin(frame * 2.2) * 10 : 0;
  const px = interpolate(a, [0, 1], [880, 1500]) + interpolate(b, [0, 1], [0, 75]) + shake;
  const py = interpolate(a, [0, 1], [720, 650]) + interpolate(b, [0, 1], [0, -295]);
  const xBottom = interpolate(frame, [36, 42, 64, 70], [0, 1, 1, 0], clamp);
  const lit = interpolate(frame, [84, 92], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04} originX={1100}>
      <Limbo />
      <ContactShadow x={330} y={962} w={170} opacity={0.3} />
      <Character {...eng} x={330} y={960} expression={lit > 0 ? "happy" : xBottom > 0.5 ? "worried" : "neutral"} arm="hold" lookX={12} />
      <path d={`M 440 800 C 760 1060 ${px - 420} ${py} ${px - 150} ${py}`} stroke="#3A3F44" strokeWidth={14} fill="none" strokeLinecap="round" />
      <text x={600} y={1000} fontFamily={HAND_FONT} fontSize={46} fill={INK}>AI code</text>
      <SocketPanel x={1500} y={520} litTop={lit} xBottom={xBottom} />
      <CodePlug x={px} y={py} />
    </ExplainShot>
  );
};

/* ------------------------------------------------------------------ */
/* Beijing wants shovels too                                           */
/* ------------------------------------------------------------------ */

export const ShotBeijing: React.FC = () => {
  const frame = useCurrentFrame();
  const sig = interpolate(frame, [8, 24], [0, 1], clamp);
  return (
    <Whip inFrames={6} outFrames={0}>
      <StoryShot
        from={1.0} to={1.07} originX={1100} originY={400}
        lighting={
          <Lighting
            ambient="#3A4070"
            lights={[
              { x: 1220, y: 250, r: 300, ry: 160, color: "#FFF3CC", intensity: sig, glow: 0.35 },
              { x: 870, y: 915, r: 120, color: "#FFF3CC", intensity: 1, glow: 0.5 },
            ]}
          />
        }
        overlay={<PlaceTag text="Beijing" delay={4} />}
      >
        <NightSkyline signal={sig} />
      </StoryShot>
    </Whip>
  );
};

export const ShotGamingChip: React.FC = () => {
  const q = usePop(14, 9);
  return (
    <ExplainShot from={1.0} to={1.06} originY={600}>
      <Limbo />
      <ContactShadow x={960} y={902} w={240} opacity={0.3} />
      <GpuCharacter x={960} y={900} scale={1.1} expression="happy" arm="down" />
      <Controller x={960} y={836} scale={1.1} />
      <text x={1330} y={560} fontFamily={HAND_FONT} fontSize={220} fill={INK} transform={`translate(1380 480) scale(${q}) translate(-1380 -480)`}>?</text>
      <text x={960} y={1020} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#6B6458">“a gaming chip”</text>
    </ExplainShot>
  );
};

export const ShotRace: React.FC = () => {
  const frame = useCurrentFrame();
  const fast = interpolate(frame, [6, 70], [180, 1580], { ...clamp, easing: Easing.in(Easing.quad) });
  const slow = interpolate(frame, [6, 110], [180, 640], clamp);
  const win = interpolate(frame, [70, 80], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <RaceTrack />
      {/* finish: brain trophy */}
      <rect x={1700} y={300} width={140} height={200} fill="#ECE6D8" stroke={INK} strokeWidth={6} />
      <Brain x={1770} y={210} scale={0.75} glow={win} />
      <text x={1770} y={560} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK} opacity={win}>smartest AI</text>
      {/* racers */}
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${fast - 120 - i * 50} ${640 + i * 18} l -90 0`} stroke={INK} strokeWidth={5} strokeLinecap="round" opacity={0.5} />)}
      <GpuCharacter x={fast} y={720} scale={0.5} expression="happy" arm="down" />
      <GpuCharacter x={slow} y={900} scale={0.5} color="#9AA0A6" label="chip" expression="worried" arm="down" />
      <text x={fast} y={540} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK} opacity={interpolate(fast, [1150, 1350], [1, 0], clamp)}>fastest chips</text>
    </ExplainShot>
  );
};

export const ShotWeapons: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const radarIn = interpolate(frame, [Math.round(2.6 * fps), Math.round(2.9 * fps)], [0, 1], clamp);
  const arrow = interpolate(frame, [10, 50], [0, 1], clamp);
  return (
    <StoryShot
      from={1.0} to={1.06} originX={960} originY={540}
      lighting={
        <Lighting
          ambient="#1B2233"
          lights={[
            { x: 480, y: 520, r: 280, color: "#FFE9A0", intensity: 1, glow: 0.35 },
            { x: 1330, y: 540, r: 360, color: "#9BFFB0", intensity: radarIn, glow: 0.35 },
          ]}
        />
      }
      overlay={<div style={{ position: "absolute", left: 330, top: 760, width: 300, textAlign: "center", fontFamily: HAND_FONT, fontSize: 56, color: "#F3F1E8" }}>smart AI</div>}
    >
      <rect width={1920} height={1080} fill="#7C8794" />
      <Brain x={480} y={520} scale={1.4} glow={1} />
            <path d={`M 700 540 L ${700 + 300 * arrow} 540`} stroke="#F3F1E8" strokeWidth={10} strokeDasharray="26 18" strokeLinecap="round" />
      <g opacity={radarIn} transform={`translate(1330 540) scale(${0.8 + 0.2 * radarIn}) translate(-1330 -540)`}>
        <Radar x={1330} y={540} r={300} sweep={frame * 6} />
      </g>
    </StoryShot>
  );
};

/* ------------------------------------------------------------------ */
/* Skit: Hawk vs. Industry under the giant chip                          */
/* ------------------------------------------------------------------ */

const HK = 520;
const IN = 1400;
const POD_Y = 930;

const HearingStage: React.FC<{ hm: number; im: number; he: Expression; ie: Expression; screen: ChipScreen }> = ({ hm, im, he, ie, screen }) => (
  <>
    <HearingRoom />
    <GiantChip x={960} y={300} scale={0.8} screen={screen} />
    <Character {...look("hawk")} x={HK} y={POD_Y} expression={he} arm="point" mouth={hm} lookX={12} />
    <Character {...look("industry")} x={IN} y={POD_Y} expression={ie} arm="down" mouth={im} lookX={-12} />
    <Podium x={HK} y={700} label="SECURITY" color="#6B4A31" />
    <Podium x={IN} y={700} label="INDUSTRY" color="#6B4A31" />
    {/* industry's laptop on the podium */}
    <g transform={`translate(${IN + 70} 674)`}>
      <path d="M -70 0 L 70 0 L 56 -90 L -56 -90 Z" fill="#9AA0A6" stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-46} r={10} fill="#ECE6D8" />
    </g>
  </>
);

const hearingLights = (screen: ChipScreen) => (
  <Lighting
    ambient="#3C3040"
    lights={[
      { x: 960, y: 300, r: 380, color: screen === "missile" ? "#FFB09A" : "#A8FF9A", intensity: 1, glow: 0.45, flicker: 0.03 },
      { x: HK, y: POD_Y - 350, r: 240, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: IN, y: POD_Y - 350, r: 240, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: 960, y: 820, r: 900, ry: 200, color: "#FFE2B0", intensity: 0.5, glow: 0 },
    ]}
  />
);

type HearingLine = { line: string; who: "hawk" | "industry"; text: string; he?: Expression; ie?: Expression; screen?: ChipScreen; sweat?: boolean };

export const ShotHearingWide: React.FC<HearingLine> = ({ line, who, text, he = "angry", ie = "neutral", screen = "plain" }) => {
  const mouth = useMouth(audioFile(EP, line));
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560} lighting={hearingLights(screen)} vignette={0.5}
      overlay={who === "hawk" ? <Say text={text} tailX={HK + 40} tailY={470} y={560 - 300} /> : <Say text={text} tailX={IN - 40} tailY={470} y={260} />}
    >
      <HearingStage hm={who === "hawk" ? mouth : 0} im={who === "industry" ? mouth : 0} he={he} ie={ie} screen={screen} />
    </StoryShot>
  );
};

export const ShotHearingClose: React.FC<HearingLine> = ({ line, who, text, he = "angry", ie = "neutral", screen = "plain", sweat }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isH = who === "hawk";
  return (
    <CloseUp s={1.8} cx={isH ? HK : IN} cy={POD_Y - 360} tx={isH ? 700 : 1220} ty={640} lights={hearingLights(screen)}
      overlay={<>
        {isH ? <Say text={text} tailX={820} tailY={430} y={110} /> : <Say text={text} tailX={1100} tailY={430} y={110} />}
        {sweat && <Sweat x={1350} y={500} />}
      </>}
    >
      <HearingStage hm={isH ? mouth : 0} im={isH ? 0 : mouth} he={he} ie={ie} screen={screen} />
    </CloseUp>
  );
};

/* ------------------------------------------------------------------ */
/* Jensen in the middle; the man with the keys                         */
/* ------------------------------------------------------------------ */

export const ShotMiddle: React.FC = () => {
  const frame = useCurrentFrame();
  const lookX = Math.sin(frame / 9) > 0 ? 14 : -14;
  return (
    <StoryShot
      from={1.0} to={1.06} originX={960} originY={560}
      lighting={
        <Lighting
          ambient="#3A3448"
          lights={[
            { x: 260, y: 480, r: 520, color: "#8FB4FF", intensity: 0.9, glow: 0.25 },
            { x: 1660, y: 480, r: 520, color: "#FF9A8F", intensity: 0.9, glow: 0.25 },
            { x: 960, y: 590, r: 260, color: "#FFFFFF", intensity: 1, glow: 0 },
          ]}
        />
      }
    >
      <rect x={0} y={0} width={960} height={1080} fill="#2D4A8A" />
      <rect x={960} y={0} width={960} height={1080} fill="#8E2A30" />
      <rect x={0} y={860} width={1920} height={220} fill="#3A3F44" />
      <text x={360} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={86} fill="#F3F1E8" letterSpacing={4}>WASHINGTON</text>
      <text x={1560} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={86} fill="#F3F1E8" letterSpacing={4}>BEIJING</text>
      <ContactShadow x={960} y={962} w={200} opacity={0.5} />
      <Rim x={960} y={560} color="#FFFFFF" strength={1} width={7}>
        <Character {...look("jensen")} x={960} y={960} scale={1.05} expression="awkward" arm="shrug" lookX={lookX} />
      </Rim>
    </StoryShot>
  );
};

export const ShotKeys: React.FC = () => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame / 8) * 8;
  const dots = Math.min(3, Math.floor(frame / 10));
  const jx = 760;
  const jy = 1120;
  const sc = 1.5;
  return (
    <StoryShot
      from={1.0} to={1.05} originX={900} originY={560}
      lighting={
        <Lighting
          ambient="#3A3040"
          lights={[
            { x: jx, y: jy - 350 * sc, r: 300, color: "#FFFFFF", intensity: 1, glow: 0 },
            { x: jx + 74 * sc + 10, y: jy - 160 * sc + 160, r: 200, color: "#FFE39A", intensity: 1, glow: 0.45 },
          ]}
        />
      }
    >
      <rect width={1920} height={1080} fill="#5A5068" />
      <Character {...look("jensen")} prop="none" x={jx} y={jy} scale={sc} expression="neutral" arm="hold" lookX={16} />
      <KeyRing x={jx + 74 * sc + 6} y={jy - 160 * sc + 8} scale={1.2} swing={swing} />
      {/* thought dots + cloud */}
      {[0, 1, 2].slice(0, dots).map((i) => <circle key={i} cx={1010 + i * 60} cy={330 - i * 40} r={12 + i * 6} fill="#F6F1E7" stroke={INK} strokeWidth={4} />)}
      {dots >= 3 && (
        <g>
          <path d="M 1180 250 q -30 -80 50 -100 q 30 -80 120 -40 q 80 -50 140 20 q 90 10 70 100 q 40 80 -60 100 q -60 50 -150 10 q -110 30 -130 -50 q -60 -20 -40 -40 Z" fill="#F6F1E7" stroke={INK} strokeWidth={5} />
          <text x={1340} y={260} textAnchor="middle" fontFamily={HAND_FONT} fontSize={130} fill={INK}>?</text>
        </g>
      )}
    </StoryShot>
  );
};

export const ShotBackfire: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [12, 30], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const back = interpolate(frame, [30, 48], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) });
  const bx = frame < 30 ? interpolate(out, [0, 1], [620, 1130]) : interpolate(back, [0, 1], [1130, 560]);
  const by = frame < 30 ? interpolate(out, [0, 1], [740, 640]) : 640 + back * 90 - Math.sin(back * Math.PI) * 120;
  const tip = interpolate(frame, [48, 58], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const boing = interpolate(frame, [30, 34, 44], [0, 1, 0], clamp);
  const label = usePop(52, 10);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <PaperWall x={1150} y={230} w={620} h={600} />
      <Cannon x={420} y={860} tip={tip} soot={tip} />
      {frame >= 12 && frame < 16 && <circle cx={610} cy={740} r={70} fill="#F5D547" opacity={0.85} />}
      {frame >= 12 && frame < 52 && <circle cx={bx} cy={by} r={36} fill="#2A2622" stroke={INK} strokeWidth={5} />}
      {boing > 0 && <text x={1090} y={560} textAnchor="end" fontFamily={HAND_FONT} fontSize={90} fill={INK} opacity={boing}>BOING</text>}
      <text x={560} y={420} textAnchor="middle" fontFamily={HAND_FONT} fontSize={130} fill="#B5483A" transform={`translate(560 380) scale(${label}) translate(-560 -380)`}>BACKFIRE</text>
    </ExplainShot>
  );
};

/* ------------------------------------------------------------------ */
/* Computex 2025: stage, quote, market share                             */
/* ------------------------------------------------------------------ */

const STAGE_J = { x: 1380, y: 800, s: 0.8 };
const HAWK_SEAT = { x: 420, y: 1300, s: 1.3 };

const keynoteLights = (withHawk: boolean) => (
  <Lighting
    ambient="#2A2C40"
    lights={[
      { x: 960, y: 360, r: 620, ry: 300, color: "#9FC2FF", intensity: 0.7, glow: 0.2 },
      { x: STAGE_J.x, y: STAGE_J.y - 300, r: 220, color: "#FFFFFF", intensity: 1, glow: 0 },
      ...(withHawk ? [{ x: HAWK_SEAT.x, y: HAWK_SEAT.y - 540, r: 340, color: "#FFE2C0", intensity: 0.85, glow: 0 }] : []),
    ]}
    cones={[{ x: STAGE_J.x, y: 0, topW: 80, bottomW: 420, h: 800, color: "#FFFFFF", opacity: 0.18 }]}
  />
);

const KeynoteSet: React.FC<{ slide: SlideKind; slideStep?: number; jm?: number; je?: Expression; hawk?: { m: number; e: Expression; papers?: boolean } }> = ({
  slide, slideStep, jm = 0, je = "neutral", hawk,
}) => (
  <>
    <KeynoteStage slide={slide} slideStep={slideStep} />
    <Rim x={STAGE_J.x} y={STAGE_J.y - 300} color="#CFE0FF" strength={1} width={6}>
      <Character {...look("jensen", 2025)} prop="none" x={STAGE_J.x} y={STAGE_J.y} scale={STAGE_J.s} expression={je} arm="point" mouth={jm} lookX={8} flip />
    </Rim>
    <Audience skip={hawk ? [180, 700] : undefined} />
    {hawk && (
      <Character {...look("hawk")} prop={hawk.papers ? "papers" : "none"} x={HAWK_SEAT.x} y={hawk.papers ? HAWK_SEAT.y - 170 : HAWK_SEAT.y} scale={HAWK_SEAT.s} expression={hawk.e} arm={hawk.papers ? "hold" : "point"} mouth={hawk.m} lookX={14} />
    )}
  </>
);

export const ShotComputex: React.FC = () => (
  <Whip inFrames={6} outFrames={0} dir={-1}>
    <StoryShot from={1.0} to={1.06} originX={1200} originY={600} lighting={keynoteLights(false)}
      overlay={<><DateTag text="May 21, 2025" delay={2} /><PlaceTag text="Computex · Taipei" delay={8} /></>}
    >
      <KeynoteSet slide="chip" />
    </StoryShot>
  </Whip>
);

export const QuoteCard: React.FC<{ quote: string; who: string }> = ({ quote, who }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const n = Math.round(interpolate(frame, [2, durationInFrames * 0.6], [0, quote.length], clamp));
  const by = interpolate(frame, [durationInFrames * 0.62, durationInFrames * 0.72], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT }}>
      <div style={{ color: "#fff", fontSize: 84, maxWidth: 1350, textAlign: "center", lineHeight: 1.25 }}>
        “{quote.slice(0, n)}<span style={{ visibility: "hidden" }}>{quote.slice(n)}</span>”
      </div>
      <div style={{ color: AMBER, fontSize: 48, marginTop: 36, opacity: by, letterSpacing: 1 }}>— {who}</div>
    </AbsoluteFill>
  );
};

export const ShotShare: React.FC<{ phase: "before" | "may" }> = ({ phase }) => {
  const frame = useCurrentFrame();
  const pct = phase === "before" ? interpolate(frame, [6, 36], [0, 95], { ...clamp, easing: Easing.out(Easing.cubic) }) : 95;
  const wob = phase === "may" ? Math.sin(frame / 2) * 2 : 0;
  const q = usePop(6, 9);
  return (
    <ExplainShot from={1.0} to={1.04} originX={800}
      overlay={phase === "before" ? <DateTag text="Before the rules" delay={2} /> : <DateTag text="May 2025" delay={0} color="#FFB3A8" />}
    >
      <Limbo />
      <text x={960} y={150} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill={INK}>Nvidia's share of China's AI chip market</text>
      <g transform={`rotate(${wob} 700 580)`}><Pie x={700} y={580} r={300} pct={pct} /></g>
      {phase === "before" ? (
        <text x={1420} y={650} textAnchor="middle" fontFamily={HAND_FONT} fontSize={260} fill="#3E8E3F">{Math.round(pct)}%</text>
      ) : (
        <text x={1420} y={680} textAnchor="middle" fontFamily={HAND_FONT} fontSize={340} fill="#B5483A" transform={`translate(1420 560) scale(${q}) translate(-1420 -560)`}>?</text>
      )}
    </ExplainShot>
  );
};

/* ------------------------------------------------------------------ */
/* Skit: Jensen on stage, Hawk heckling from the front row (DRAMATIZATION) */
/* ------------------------------------------------------------------ */

type KeynoteLine = { line: string; who: "jensen" | "hawk"; text: string; je?: Expression; he?: Expression; slide?: SlideKind; build?: boolean; papers?: boolean };

export const ShotKeynoteWide: React.FC<KeynoteLine> = ({ line, who, text, je = "neutral", he = "angry", slide = "chip", build, papers }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mouth = useMouth(audioFile(EP, line));
  // "Chips made in China? / By China? / For China?" — one slide line per question
  const step = build ? 1 + (frame > 1.55 * fps ? 1 : 0) + (frame > 2.55 * fps ? 1 : 0) : 3;
  const isJ = who === "jensen";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={keynoteLights(true)} vignette={0.5}
      overlay={<>
        {isJ ? <Say text={text} tailX={STAGE_J.x - 20} tailY={430} y={40} /> : <Say text={text} tailX={HAWK_SEAT.x + 60} tailY={papers ? 530 : 700} y={papers ? 340 : 520} />}
        <Dramatization />
      </>}
    >
      <KeynoteSet slide={slide} slideStep={step} jm={isJ ? mouth : 0} je={je} hawk={{ m: isJ ? 0 : mouth, e: he, papers }} />
    </StoryShot>
  );
};

export const ShotKeynoteClose: React.FC<KeynoteLine> = ({ line, who, text, je = "neutral", he = "angry", slide = "chip" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isJ = who === "jensen";
  return (
    <CloseUp
      s={isJ ? 1.9 : 1.45} cx={isJ ? STAGE_J.x : HAWK_SEAT.x} cy={isJ ? STAGE_J.y - 290 : HAWK_SEAT.y - 470} tx={isJ ? 1280 : 700} ty={isJ ? 640 : 660}
      lights={keynoteLights(true)}
      overlay={<>
        {isJ ? <Say text={text} tailX={1180} tailY={420} y={110} /> : <Say text={text} tailX={820} tailY={440} y={120} />}
        <Dramatization />
      </>}
    >
      <KeynoteSet slide={slide} jm={isJ ? mouth : 0} je={je} hawk={{ m: isJ ? 0 : mouth, e: he }} />
    </CloseUp>
  );
};

/* ------------------------------------------------------------------ */
/* Washington hears the warning… and bolts the door                    */
/* ------------------------------------------------------------------ */

const DOOR = { x: 690, y: 520, w: 220, h: 300 };

const DoorStage: React.FC<{ bolts: number; lock: number; plane?: number; samExpr: Expression }> = ({ bolts, lock, plane = -1, samExpr }) => (
  <>
    <Limbo color="#D9C9B8" floor="#C9B8A2" />
    <PaperWall x={200} y={180} w={1200} h={640} />
    <WallDoor {...DOOR} bolts={bolts} lock={lock} />
    <ContactShadow x={1640} y={962} w={200} opacity={0.35} />
    <Character {...look("unclesam")} x={1640} y={960} expression={samExpr} arm="hold" lookX={-14} />
    {plane >= 0 && plane <= 1 && (
      <g transform={`translate(${interpolate(plane, [0, 1], [-100, 1500])} ${200 - Math.sin(plane * Math.PI) * 90 + plane * 560}) rotate(${10 + plane * 18})`}>
        <path d="M -80 -10 L 90 0 L -80 30 L -40 6 Z" fill="#F6F1E7" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <text x={-10} y={-20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={32} fill="#B5483A">WARNING</text>
      </g>
    )}
  </>
);

const doorLights = (
  <Lighting
    ambient="#5A4E5E"
    lights={[
      { x: 1640, y: 610, r: 280, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: 800, y: 600, r: 520, color: "#FFE2B0", intensity: 0.9, glow: 0.15 },
    ]}
  />
);

export const ShotWarning: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const plane = interpolate(frame, [0, durationInFrames], [0, 0.95], clamp);
  return (
    <StoryShot from={1.0} to={1.04} originX={1000} originY={560} lighting={doorLights} vignette={0.45}>
      <DoorStage bolts={0} lock={0} plane={plane} samExpr={frame > durationInFrames * 0.6 ? "worried" : "neutral"} />
    </StoryShot>
  );
};

export const ShotBolts: React.FC = () => {
  const frame = useCurrentFrame();
  const bolts = interpolate(frame, [4, 34], [0, 1], clamp);
  const lock = interpolate(frame, [36, 42], [0, 1], { ...clamp, easing: Easing.out(Easing.back(3)) });
  const clunks = [8, 16, 24].filter((f) => frame >= f).length;
  return (
    <CloseUp s={1.55} cx={DOOR.x + DOOR.w / 2 + 120} cy={DOOR.y + DOOR.h / 2} tx={900} ty={560} lights={doorLights}
      overlay={
        <div style={{ position: "absolute", left: 1220, top: 160, fontFamily: HAND_FONT, color: "#fff", fontSize: 80, lineHeight: 1.05, textShadow: "0 4px 0 #000" }}>
          {Array.from({ length: clunks }).map((_, i) => <div key={i} style={{ marginLeft: i * 40 }}>CLUNK</div>)}
        </div>
      }
    >
      <DoorStage bolts={bolts} lock={lock} samExpr="smug" />
    </CloseUp>
  );
};

export { MiniChip };
