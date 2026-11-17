// Shots for B03 · THE LOCKED DOOR (voice/03_the-locked-door.mp3, lines b03_001…b03_033).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, Expression, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Lighting, PlaceTag, Rim, Whip } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { AMBER, Closer, DUR, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, PaperWall, rnd } from "../open/sets";
import { RaceTrack, WallDoor } from "../b02/setsB";
import { Say } from "../b02/shots";
import {
  BigForm, BureauRoom, ChipCake, ClockHands, Crate, EmptyBox, FormBricks, GovBuilding, Highway, LicenseCard, Ocean, PaperColumn, PartyBanner, RadarGun,
  SecurityCam, SpeedDial, SpeedSign, SportsCar, StampMark, Sticker, TallDesk, TinyWheels, Workbench,
} from "./sets";
import { Grain, Vignette } from "../../../../../kit/look/cinematic";
import { Camera, Stage } from "../../../../../kit/ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- Washington, Oct 7 2022 ---------------- */
export const ShotGov: React.FC = () => (
  <StoryShot
    from={1.0} to={1.06} originX={960} originY={520}
    lighting={
      <Lighting
        ambient="#2A3460"
        lights={[
          { x: 960, y: 620, r: 560, ry: 260, color: "#FFE3A8", intensity: 0.9, glow: 0.25 },
          { x: 960, y: 300, r: 300, color: "#DDE6FF", intensity: 0.6, glow: 0.1 },
        ]}
        cones={[{ x: 960, y: 1080, topW: 900, bottomW: 200, h: 700, color: "#FFF0C8", opacity: 0.12 }]}
      />
    }
    overlay={<><DateTag text="October 7, 2022" delay={2} /><PlaceTag text="Washington, D.C." delay={6} /></>}
  >
    <GovBuilding />
  </StoryShot>
);

/* ---------------- A wall across the Pacific ---------------- */
export const ShotPacificWall: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const built = interpolate(frame, [0, durationInFrames * 0.85], [0.1, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04} bg="#5B9BD5">
      <Ocean />
      <PaperColumn x={880} w={170} top={40} bottom={1080} built={built} />
      <Character {...look("unclesam")} x={1260} y={1000} scale={1.05} expression="smug" arm="hold" lookX={-14} />
      <path d="M 1100 1000 q 40 -16 80 0 q 40 16 80 0 q 40 -16 80 0 q 40 16 80 0" stroke="#9CC6EC" strokeWidth={8} fill="none" />
    </ExplainShot>
  );
};

export const ShotFormBricks: React.FC = () => (
  <ExplainShot from={1.05} to={1.12} originX={900} originY={500}>
    <FormBricks />
  </ExplainShot>
);

/* ---------------- Chips bounce off the wall ---------------- */
export const ShotBlocked: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ExplainShot from={1.0} to={1.04} originX={1000}>
      <Limbo />
      <text x={330} y={420} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill="#6B6458">CHINA</text>
      <PaperColumn x={640} w={170} top={120} bottom={860} built={1} />
      <rect x={810} y={860} width={1110} height={40} fill="#5E6268" stroke={INK} strokeWidth={5} />
      {[0, 1, 2, 3].map((i) => {
        const start = i * 14;
        const stop = 920 + i * 240;
        const x = Math.max(stop, 1980 - (frame - start) * 22);
        const arrived = x <= stop;
        const hitF = start + (1980 - stop) / 22;
        const bump = arrived ? Math.max(0, 1 - (frame - hitF) / 8) * Math.sin((frame - hitF) * 1.6) * 16 : 0;
        return <Crate key={i} x={x + bump} y={860} label="AI CHIPS" scale={0.85} />;
      })}
    </ExplainShot>
  );
};

export const ShotStampBlocked: React.FC<{ text?: string; label?: string }> = ({ text = "BLOCKED", label = "TO: CHINA" }) => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [6, 11], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shake = frame > 10 && frame < 18 ? Math.sin(frame * 3) * 6 : 0;
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo />
      <g transform={`translate(${shake} 0)`}>
        <Crate x={960} y={900} label={label} scale={2.6} />
        <StampMark x={960} y={560} text={text} show={show} size={140} />
      </g>
    </ExplainShot>
  );
};

/* ---------------- The speed limit ---------------- */
export const ShotSpeedLimit: React.FC<{ limit?: number; to?: number; sam?: boolean; date?: string }> = ({ limit = 0.7, to, sam, date }) => {
  const frame = useCurrentFrame();
  const l = to === undefined ? limit : interpolate(frame, [20, 60], [limit, to], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.05} originX={1200} overlay={date ? <DateTag text={date} delay={2} /> : undefined}>
      <Highway />
      <SpeedSign x={1260} y={560} limit={l} scale={1.25} />
      {sam && <Character {...look("unclesam")} x={1660} y={1000} expression="smug" arm="point" flip lookX={14} />}
    </ExplainShot>
  );
};

/** A GPU zooms past the sign; the official clocks it. `mode`: "fast" → TOO FAST, "legal" → under the limit + check. */
export const ShotPastSign: React.FC<{ mode: "fast" | "legal" }> = ({ mode }) => {
  const frame = useCurrentFrame();
  const fast = mode === "fast";
  const x = fast ? interpolate(frame, [0, 34], [-200, 1100], clamp) : interpolate(frame, [0, 34], [300, 760], clamp);
  const check = usePop(16, 10);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Highway />
      <SpeedSign x={1000} y={560} limit={0.7} scale={0.9} />
      {fast && [0, 1, 2, 3].map((i) => <path key={i} d={`M ${x - 140 - i * 40} ${730 + i * 22} l -160 0`} stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.5} />)}
      <GpuCharacter x={x} y={880} scale={0.6} expression={fast ? "happy" : "neutral"} arm="down" />
      {!fast && <path d="M 60 0 L 90 30 L 150 -40" transform={`translate(${x - 120} 560) scale(${check})`} stroke="#3E8E3F" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {fast && (
        <g>
          <Character {...look("official")} prop="none" x={1680} y={1010} expression="neutral" arm="point" flip lookX={14} />
          <RadarGun x={1500} y={760} text={frame > 22 ? "TOO FAST" : "…"} color={frame > 22 ? "#FF6B5A" : "#7DFF9E"} />
        </g>
      )}
      {!fast && <Sticker x={x + 230} y={880} text="CHINA EDITION" show={1} />}
    </ExplainShot>
  );
};

export const ShotLicense: React.FC = () => {
  const p = usePop(2, 12);
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <g transform={`translate(960 540) scale(${0.4 + 0.6 * p}) rotate(${(1 - p) * -12}) translate(-960 -540)`}>
        <LicenseCard x={960} y={540} />
      </g>
    </ExplainShot>
  );
};

export const ShotToBeijing: React.FC = () => {
  const p = usePop(0, 11);
  const frame = useCurrentFrame();
  return (
    <ExplainShot from={1.04} to={1.1} originY={700}>
      <Limbo color="#C9D6E0" floor="#9AA6AE" />
      <g transform={`translate(0 ${(1 - p) * -300})`}>
        <Crate x={960} y={900} label="TO: BEIJING" scale={2.2} />
      </g>
      <g transform={`translate(1060 ${560 - Math.max(0, Math.sin(frame / 5)) * 30})`}><MiniChip size={70} /></g>
    </ExplainShot>
  );
};

/* ---------------- Skit set: the towering desk ---------------- */

const DESK_X = 1300;
const DESK_TOP = 470;
const OFF = { x: DESK_X, y: 640 };
const SAL = { x: 520, y: 980 };

type BoxKind = "chip" | "slower" | "slowest" | "empty" | "form";

const DeskStage: React.FC<{ om: number; sm: number; oe: Expression; se: Expression; box: BoxKind; stamp?: boolean; cobweb?: boolean; form?: number; clock?: number }> = ({
  om, sm, oe, se, box, stamp, cobweb, form = -1, clock = 1,
}) => {
  const chipScale = box === "chip" ? 1 : box === "slower" ? 0.8 : 0.6;
  return (
    <>
      <BureauRoom />
      <ClockHands x={300} y={200} speed={clock} />
      <Character {...look("official")} prop={stamp ? "stamp" : "none"} x={OFF.x} y={OFF.y} expression={oe} arm={stamp ? "hold" : "down"} mouth={om} lookX={-14} />
      <TallDesk x={DESK_X} top={DESK_TOP} />
      <ContactShadow x={SAL.x} y={SAL.y + 2} w={190} opacity={0.35} />
      <Character {...look("salesman")} prop="none" x={SAL.x} y={SAL.y} expression={se} arm="hold" mouth={sm} lookX={14} />
      {/* what the salesman holds out */}
      <g transform={`translate(${SAL.x + 110} ${SAL.y - 210})`}>
        {box === "empty" ? <EmptyBox x={0} y={0} /> : box === "form" ? null : (
          <g transform={`scale(${chipScale})`}>
            <rect x={-70} y={-60} width={140} height={110} fill="#D2B48C" stroke={INK} strokeWidth={5} />
            <g transform="translate(0 -110)"><MiniChip size={70} /></g>
            {box !== "chip" && <text x={0} y={20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>{box === "slower" ? "slower" : "slowest"}</text>}
          </g>
        )}
        {cobweb && <path d="M -70 -60 L -20 -60 M -70 -60 L -70 -14 M -70 -60 L -34 -26 M -50 -60 Q -56 -40 -70 -34" stroke="#F3F1E8" strokeWidth={3} fill="none" />}
      </g>
      {form >= 0 && (
        <g transform={`translate(0 ${interpolate(form, [0, 1], [-700, 0])})`}>
          <BigForm x={SAL.x + 40} y={SAL.y - 240} rot={-6 + form * 4} scale={0.9} />
        </g>
      )}
    </>
  );
};

const deskLights = (
  <Lighting
    ambient="#5E5868"
    lights={[
      { x: OFF.x, y: OFF.y - 350, r: 260, color: "#FFFFFF", intensity: 1, glow: 0 },
      { x: SAL.x, y: SAL.y - 350, r: 280, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: OFF.x, y: 0, r: 400, color: "#E6F0FF", intensity: 0.6, glow: 0.15 },
    ]}
    cones={[{ x: OFF.x, y: 0, topW: 140, bottomW: 600, h: 520, color: "#F0F6FF", opacity: 0.16 }]}
  />
);

/** Narration shot on the desk set: waiting for a stamp that never comes. */
export const ShotNoStamp: React.FC = () => {
  const frame = useCurrentFrame();
  const hover = Math.sin(frame / 6) * 10;
  return (
    <StoryShot from={1.0} to={1.05} originX={900} originY={560} lighting={deskLights} vignette={0.45}>
      <g transform={`translate(0 ${hover * 0.2})`}>
        <DeskStage om={0} sm={0} oe="smug" se="awkward" box="chip" stamp cobweb clock={40} />
      </g>
    </StoryShot>
  );
};

type DeskLine = { line: string; who: "official" | "salesman"; text: string; oe?: Expression; se?: Expression; box?: BoxKind; formDrop?: boolean };

export const ShotDeskWide: React.FC<DeskLine> = ({ line, who, text, oe = "neutral", se = "happy", box = "chip", formDrop }) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const isO = who === "official";
  const form = formDrop ? interpolate(frame, [26, 36], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) }) : -1;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560} lighting={deskLights} vignette={0.45}
      overlay={isO ? <Say text={text} tailX={OFF.x - 110} tailY={260} y={40} /> : <Say text={text} tailX={SAL.x + 40} tailY={520} y={300} />}
    >
      <DeskStage om={isO ? mouth : 0} sm={isO ? 0 : mouth} oe={oe} se={se} box={box} form={form} />
    </StoryShot>
  );
};

export const ShotDeskClose: React.FC<DeskLine> = ({ line, who, text, oe = "neutral", se = "happy", box = "chip" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isO = who === "official";
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={isO ? 1.7 : 1.55} cx={isO ? OFF.x : SAL.x + 40} cy={isO ? OFF.y - 330 : SAL.y - 330} tx={isO ? 1240 : 760} ty={isO ? 520 : 620}>
        <Camera from={1} to={1.03} originX={isO ? OFF.x : SAL.x} originY={isO ? OFF.y - 330 : SAL.y - 330}>
          <Stage><DeskStage om={isO ? mouth : 0} sm={isO ? 0 : mouth} oe={oe} se={se} box={box} /></Stage>
          {deskLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isO ? <Say text={text} tailX={1110} tailY={330} y={90} /> : <Say text={text} tailX={880} tailY={420} y={120} />}
    </AbsoluteFill>
  );
};

/* ---------------- Nvidia's answer: turn the chip down ---------------- */
export const ShotWorkbench: React.FC<{ from: number; to: number; sticker?: string; label?: string; date?: string }> = ({ from, to, sticker, label = "GPU", date }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [10, 50], [from, to], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const st = interpolate(frame, [56, 64], [0, 1], { ...clamp, easing: Easing.out(Easing.back(3)) });
  return (
    <ExplainShot from={1.0} to={1.05} overlay={date ? <DateTag text={date} delay={2} /> : undefined}>
      <Workbench />
      <ContactShadow x={640} y={762} w={200} opacity={0.3} />
      <GpuCharacter x={640} y={760} scale={0.9} label={label} expression={v < from - 0.05 ? "worried" : "neutral"} arm="down" />
      <SpeedDial x={1320} y={560} value={v} scale={1.2} />
      {sticker && <Sticker x={900} y={700} text={sticker} show={st} />}
    </ExplainShot>
  );
};

export const ShotBannedChip: React.FC<{ stampText: string; label?: string; sam?: boolean; date?: string }> = ({ stampText, label = "GPU", sam, date }) => {
  const frame = useCurrentFrame();
  const at = sam ? 24 : 8;
  const show = interpolate(frame, [at, at + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.05} overlay={date ? <DateTag text={date} delay={2} /> : undefined}>
      <Limbo />
      <ContactShadow x={760} y={902} w={240} opacity={0.3} />
      <GpuCharacter x={760} y={900} scale={1.15} label={label} expression={show > 0.5 ? "sad" : "neutral"} arm="down" />
      {!sam && <Sticker x={1080} y={860} text="CHINA EDITION" show={1} />}
      {sam && <Character {...look("unclesam")} prop="stamp" x={1380} y={960} expression="smug" arm="hold" lookX={-14} />}
      <StampMark x={760} y={680} text={stampText} show={show} size={96} />
    </ExplainShot>
  );
};

export const ShotFerrari: React.FC = () => {
  const frame = useCurrentFrame();
  const pull = Math.abs(Math.sin(frame / 7));
  const puff = (frame % 20) / 20;
  return (
    <ExplainShot from={1.0} to={1.06} originX={1100}>
      <Limbo color="#E9E2D2" />
      <ContactShadow x={940} y={902} w={620} opacity={0.35} />
      <SportsCar x={900} y={820} pull={pull} />
      <circle cx={1440 - puff * 40} cy={560 - puff * 120} r={20 + puff * 30} fill="#9AA0A6" opacity={0.6 * (1 - puff)} />
      <text x={1500} y={430} fontFamily={HAND_FONT} fontSize={58} fill={INK} opacity={frame % 20 < 10 ? 1 : 0.4}>putt… putt…</text>
    </ExplainShot>
  );
};

/* ---------------- Skit: the H20 on tricycle wheels ---------------- */
const TRI = { g1: 760, g2: 1180, y: 760 };

const TricycleStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression }> = ({ m1, m2, e1, e2 }) => {
  const frame = useCurrentFrame();
  const crawl = frame * 0.8;
  const wheeze = (frame % 26) / 26;
  return (
    <>
      <RaceTrack />
      <g transform={`translate(${crawl} 0)`}>
        <TinyWheels x={TRI.g1} y={TRI.y + 14} spin={frame * 6} />
        <GpuCharacter x={TRI.g1} y={TRI.y} scale={0.62} label="H20" expression={e1} arm="down" mouth={m1} />
        <circle cx={TRI.g1 - 130 - wheeze * 40} cy={TRI.y - 60 - wheeze * 50} r={14 + wheeze * 18} fill="#9AA0A6" opacity={0.6 * (1 - wheeze)} />
        <TinyWheels x={TRI.g2} y={TRI.y + 14} spin={frame * 6} />
        <GpuCharacter x={TRI.g2} y={TRI.y} scale={0.55} color="#3E8E8A" label="GPU" expression={e2} arm="down" mouth={m2} />
      </g>
    </>
  );
};

export const ShotTricycle: React.FC<{ line: string; who: "gpu" | "gpu2"; text: string; close?: boolean; e1?: Expression; e2?: Expression }> = ({ line, who, text, close, e1 = "sad", e2 = "smug" }) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const stage = <TricycleStage m1={who === "gpu" ? mouth : 0} m2={who === "gpu2" ? mouth : 0} e1={e1} e2={e2} />;
  const cx = (who === "gpu" ? TRI.g1 : TRI.g2) + frame * 0.8;
  if (!close) {
    return <ExplainShot from={1.0} to={1.04} overlay={<Say text={text} tailX={TRI.g1 + 10} tailY={540} y={300} />}>{stage}</ExplainShot>;
  }
  return (
    <AbsoluteFill style={{ background: "#EDE6D6" }}>
      <Closer s={2.0} cx={cx} cy={TRI.y - 110} tx={1100} ty={640}>
        <Stage>{stage}</Stage>
      </Closer>
      <Vignette strength={0.3} />
      <Say text={text} tailX={1080} tailY={400} y={150} />
    </AbsoluteFill>
  );
};

/* ---------------- $5.5B charge; the cancelled party ---------------- */
export const ShotCharge: React.FC = () => {
  const p = usePop(10, 10);
  return (
    <StoryShot
      from={1.0} to={1.06} originX={960} originY={560}
      lighting={<Lighting ambient="#3A3E52" lights={[{ x: 960, y: 420, r: 700, ry: 420, color: "#FFF2D0", intensity: 0.8, glow: 0.15 }]} cones={[{ x: 960, y: 0, topW: 160, bottomW: 900, h: 860, opacity: 0.16 }]} />}
      overlay={
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "rgba(14,14,20,0.85)", borderRadius: 18, padding: "14px 56px", textAlign: "center", transform: `scale(${p})`, fontFamily: HAND_FONT }}>
            <div style={{ fontSize: 150, color: "#FF6B5A", lineHeight: 1.05 }}>−$5.5 BILLION</div>
            <div style={{ fontSize: 50, color: "#fff" }}>charge on unsold H20 chips</div>
          </div>
        </AbsoluteFill>
      }
    >
      <rect width={1920} height={1080} fill="#8E9499" />
      <rect x={0} y={860} width={1920} height={220} fill="#6F6B66" />
      {Array.from({ length: 27 }).map((_, i) => {
        const col = i % 9;
        const lvl = Math.floor(i / 9);
        return <Crate key={i} x={130 + col * 210} y={860 - lvl * 160} label="H20" scale={0.9} cobweb={rnd(i) > 0.7} />;
      })}
    </StoryShot>
  );
};

export const ShotParty: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const at = Math.round(durationInFrames * 0.55);
  const droop = interpolate(frame, [at, at + 10], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const show = interpolate(frame, [at + 6, at + 11], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#F3E3E8" floor="#E2CBD2" />
      <PartyBanner y={140} droop={droop} />
      <rect x={560} y={760} width={800} height={30} fill="#C79A63" stroke={INK} strokeWidth={5} />
      <ChipCake x={960} y={750} />
      <GpuCharacter x={420} y={960} scale={0.6} expression={droop > 0.5 ? "sad" : "happy"} arm="down" />
      <path d="M 385 812 L 420 712 L 455 812 Z" fill="#E0453A" stroke={INK} strokeWidth={4} />
      <Character {...look("unclesam")} prop="stamp" x={1560} y={1000} expression="smug" arm="hold" lookX={-14} />
      <StampMark x={960} y={430} text="CANCELLED" show={show} size={120} />
    </ExplainShot>
  );
};

/* ---------------- Locked doors; the math floats over ---------------- */
export const ShotDoors: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const qAt = Math.round(DUR["b03_030"] * fps);
  const q = interpolate(frame, [qAt, qAt + 6], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const doors = [{ x: 330, l: "SEA" }, { x: 850, l: "AIR" }, { x: 1370, l: "ROAD" }];
  return (
    <StoryShot
      from={1.0} to={1.06} originX={960} originY={560}
      lighting={<Lighting ambient="#4E4A62" lights={doors.map((d) => ({ x: d.x + 110, y: 680, r: 260, color: "#FFE2B0", intensity: 0.9, glow: 0.15 }))} />}
      overlay={q > 0 ? <div style={{ position: "absolute", left: 0, right: 0, top: 360, textAlign: "center", fontFamily: HAND_FONT, fontSize: 260, color: AMBER, transform: `scale(${q})`, textShadow: "0 6px 0 #000" }}>?</div> : undefined}
    >
      <Limbo color="#B8AFA8" floor="#8E857C" />
      <PaperWall x={60} y={200} w={1800} h={640} />
      {doors.map((d) => (
        <g key={d.l}>
          <WallDoor x={d.x} y={540} w={220} h={300} bolts={1} lock={1} />
          <rect x={d.x + 30} y={470} width={160} height={54} rx={8} fill="#2D4A8A" stroke={INK} strokeWidth={4} />
          <text x={d.x + 110} y={510} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#fff">{d.l}</text>
        </g>
      ))}
    </StoryShot>
  );
};

export const ShotWatch: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = interpolate(frame, [0, 90], [1700, 1150], clamp);
  const aim = interpolate(cx, [1150, 1700], [-20, 18]);
  const syms = ["∑", "×", "+", "=", "∫", "÷", "π"];
  return (
    <StoryShot
      from={1.0} to={1.05} originX={1100} originY={500}
      lighting={
        <Lighting
          ambient="#2E3248"
          lights={[
            { x: cx, y: 780, r: 200, color: "#FFF2C0", intensity: 1, glow: 0.3 },
            { x: 960, y: 140, r: 700, ry: 160, color: "#9BFFB0", intensity: 0.55, glow: 0.4 },
          ]}
          cones={[{ x: 1720, y: 160, topW: 30, bottomW: 330, h: 600, color: "#FFF2C0", opacity: 0.12 }]}
        />
      }
    >
      <Limbo color="#7E7A86" floor="#5E5A66" />
      <PaperWall x={200} y={300} w={760} h={560} />
      <rect x={960} y={860} width={960} height={36} fill="#5E6268" stroke={INK} strokeWidth={5} />
      <Crate x={cx} y={860} label="AI CHIPS" scale={0.8} />
      <rect x={1700} y={0} width={30} height={160} fill="#7A8088" />
      <SecurityCam x={1715} y={180} aim={aim} />
      {/* the math drifts over the wall, unwatched */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = ((frame * (1.6 + rnd(i) * 1.2) + rnd(i + 3) * 1600) % 1900);
        const x = 1900 - t;
        const y = 120 + rnd(i + 7) * 120 + Math.sin(frame / 10 + i) * 14;
        return <text key={i} x={x} y={y} fontFamily={HAND_FONT} fontSize={60 + rnd(i + 2) * 30} fill="#B9FFC8" opacity={0.85}>{syms[i % syms.length]}</text>;
      })}
    </StoryShot>
  );
};

export { Whip, Rim };
