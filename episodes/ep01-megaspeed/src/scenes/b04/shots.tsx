// Shots for B04 · THE WAY AROUND (voice/04_the-way-around.mp3, lines b04_001…b04_027).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, CustomsDog, Expression } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Grain, Lighting, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, PaperWall, rnd } from "../open/sets";
import { H100Box } from "../b02/sets";
import { Say } from "../b02/shots";
import { BigForm, Crate, LicenseCard, StampMark } from "../b03/sets";
import {
  AnswerSheet, BanSign, Bedroom, BigCheck, CityNight, CloudShape, Console, DataCenter, KH, KID, KeyIcon, LaptopIcon, MOM, Magnifier, NB, NEIGHBOR,
  Pad, Port, RackYard, ServerRack, TINY_OFFICE, TwoHouses, Wifi,
} from "./sets";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- 2024, Southeast Asia: the port ---------------- */
const portLights = (
  <Lighting
    ambient="#2A3460"
    lights={[
      { x: 560, y: 820, r: 520, ry: 200, color: "#FFE3A8", intensity: 0.95, glow: 0.2 },
      { x: 1205, y: 390, r: 160, color: "#FFE3A8", intensity: 0.9, glow: 0.3 },
      { x: 960, y: 140, r: 900, ry: 160, color: "#9BFFB0", intensity: 0.45, glow: 0.35 },
    ]}
    cones={[{ x: 560, y: 0, topW: 60, bottomW: 700, h: 880, color: "#FFF0C8", opacity: 0.1 }]}
  />
);

/** Wi-Fi symbols drifting left→right across the top of frame. */
const WifiStream: React.FC<{ n?: number; y0?: number; band?: number; speed?: number }> = ({ n = 7, y0 = 90, band = 160, speed = 9 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const x = ((frame * speed * (0.8 + rnd(i) * 0.5) + rnd(i + 5) * 2200) % 2300) - 200;
        const y = y0 + rnd(i + 11) * band + Math.sin(frame / 8 + i) * 12;
        return <Wifi key={i} x={x} y={y} scale={0.7 + rnd(i + 2) * 0.5} rot={80} />;
      })}
    </>
  );
};

export const ShotPort: React.FC = () => (
  <StoryShot from={1.0} to={1.06} originX={700} originY={700} lighting={portLights}
    overlay={<><DateTag text="2024" delay={2} /><PlaceTag text="Southeast Asia" delay={8} /></>}
  >
    <Port />
    <Crate x={420} y={880} label="CARGO" scale={0.7} />
    <Crate x={600} y={880} label="CARGO" scale={0.7} />
    <CustomsDog x={800} y={900} scale={0.7} expression="neutral" />
    <WifiStream />
  </StoryShot>
);

/** Close: the dog is great at boxes. */
export const ShotDogBox: React.FC = () => {
  const frame = useCurrentFrame();
  const sniff = Math.sin(frame / 2.5) * 6;
  const show = interpolate(frame, [30, 35], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <StoryShot from={1.0} to={1.05} originX={900} originY={700}
      lighting={<Lighting ambient="#2E3656" lights={[{ x: 900, y: 760, r: 640, ry: 340, color: "#FFF0C8", intensity: 1, glow: 0.15 }]} cones={[{ x: 820, y: 0, topW: 80, bottomW: 800, h: 900, color: "#FFF0C8", opacity: 0.14 }]} />}
    >
      <Port />
      <ContactShadow x={1180} y={1002} w={360} opacity={0.4} />
      <Crate x={1180} y={1000} label="CARGO" scale={1.6} />
      <CustomsDog x={600 + sniff} y={1010} scale={1.5} expression={show > 0.5 ? "happy" : "neutral"} />
      <StampMark x={1180} y={800} text="HELD" show={show} size={100} />
    </StoryShot>
  );
};

/** Close: the dog is terrible at Wi-Fi. */
export const ShotDogWifi: React.FC = () => {
  const frame = useCurrentFrame();
  const hop = Math.abs(Math.sin(frame / 5)) * (frame > 20 ? 40 : 0);
  return (
    <StoryShot from={1.0} to={1.05} originX={900} originY={600}
      lighting={<Lighting ambient="#2A3460" lights={[{ x: 760, y: 820, r: 460, ry: 260, color: "#FFF0C8", intensity: 0.9, glow: 0.1 }, { x: 960, y: 260, r: 1000, ry: 260, color: "#9BFFB0", intensity: 0.7, glow: 0.45 }]} />}
    >
      <Port />
      <CustomsDog x={760} y={1010 - hop} scale={1.5} expression={frame > 12 ? "surprised" : "worried"} />
      <WifiStream n={10} y0={110} band={360} speed={14} />
    </StoryShot>
  );
};

/* ---------------- The analogy: mom bans the console ---------------- */
export const ShotBan: React.FC = () => {
  const frame = useCurrentFrame();
  const sign = usePop(14, 10);
  const carry = interpolate(frame, [6, 40], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Bedroom />
      <ContactShadow x={720} y={902} w={160} opacity={0.3} />
      <Character {...KID} x={720} y={900} scale={0.68} expression="sad" arm="down" lookX={14} />
      <ContactShadow x={1560} y={902} w={200} opacity={0.3} />
      <Character {...MOM} x={1560} y={900} expression="angry" arm="hold" flip lookX={-14} />
      <Console x={1110 + carry * 300} y={740 - carry * 260} scale={0.9} />
      <BanSign x={500} y={330} show={sign} />
    </ExplainShot>
  );
};

/** The kid plots: "How do you beat the ban?" */
export const ShotKidThink: React.FC = () => {
  const frame = useCurrentFrame();
  const q = usePop(4, 9);
  const bulb = usePop(26, 9);
  return (
    <AbsoluteFill style={{ background: "#BFD8E8" }}>
      <Closer s={1.9} cx={720} cy={640} tx={900} ty={700}>
        <Stage>
          <Bedroom />
          <Character {...KID} x={720} y={900} scale={0.68} expression={frame > 26 ? "smug" : "worried"} arm="down" lookX={10} />
        </Stage>
      </Closer>
      <Vignette strength={0.25} />
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        {frame < 26 && <text x={1150} y={400} fontFamily={HAND_FONT} fontSize={220} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(1150 400) scale(${q}) translate(-1150 -400)`}>?</text>}
        {frame >= 26 && (
          <g transform={`translate(1180 280) scale(${bulb})`}>
            <circle r={150} fill="#F5D547" opacity={0.3} />
            <circle r={80} fill="#FFF3A0" stroke={INK} strokeWidth={7} />
            <rect x={-34} y={74} width={68} height={50} rx={8} fill="#9AA0A6" stroke={INK} strokeWidth={6} />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

/* ---------------- The neighbor buys ten ---------------- */
export const ShotNeighborBuy: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const n = Math.min(10, Math.floor(interpolate(frame, [4, durationInFrames * 0.7], [1, 10.99], clamp)));
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#F3E3C8" floor="#E2CFAE" />
      <ContactShadow x={640} y={902} w={200} opacity={0.3} />
      <Character {...NEIGHBOR} x={640} y={900} expression="happy" arm="point" lookX={14} />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${1100 + (i % 2) * 250} ${900 - Math.floor(i / 2) * 140})`}>
          <rect x={-110} y={-130} width={220} height={130} fill="#F6F1E7" stroke={INK} strokeWidth={5} />
          <g transform="translate(0 -30)"><Console x={0} y={0} scale={0.6} /></g>
        </g>
      ))}
      <text x={1700} y={300} fontFamily={HAND_FONT} fontSize={130} fill="#C0392B" stroke={INK} strokeWidth={3}>×{n}</text>
    </ExplainShot>
  );
};

/** All ten stay in his own house. */
export const ShotNeighborHouse: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={NB.x + NB.w / 2} originY={640} vignette={0.45}
    lighting={<Lighting ambient="#3C4470" lights={[{ x: NB.x + NB.w / 2, y: 650, r: 420, ry: 260, color: "#9AD8FF", intensity: 1, glow: 0.35 }]} />}
  >
    <TwoHouses cable={0} dusk />
    <Character {...NEIGHBOR} x={NB.x + NB.w / 2 + 220} y={1010} scale={0.8} expression="smug" arm="hold" lookX={-10} />
    <rect x={NB.x + 170} y={300} width={300} height={70} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
    <text x={NB.x + 320} y={350} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>HIS HOUSE</text>
  </StoryShot>
);

/** The long cable runs into the kid's window. */
const KidInWindow: React.FC<{ happy: boolean }> = ({ happy }) => (
  <>
    <defs>
      <clipPath id="b04kidwin"><rect x={KH.win.x} y={KH.win.y} width={KH.win.w} height={KH.win.h} /></clipPath>
    </defs>
    <g clipPath="url(#b04kidwin)">
      <Character {...KID} x={KH.win.x + 100} y={KH.win.y + 290} scale={0.6} expression={happy ? "happy" : "neutral"} arm="hold" lookX={-6} />
      <Pad x={KH.win.x + 110} y={KH.win.y + 150} scale={0.8} />
    </g>
  </>
);

export const ShotCable: React.FC<{ arrows?: boolean }> = ({ arrows }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const cable = arrows ? 1 : interpolate(frame, [4, durationInFrames * 0.85], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const x = usePop(10, 10);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <TwoHouses cable={cable} />
      <KidInWindow happy={cable > 0.95} />
      {arrows && (
        <g>
          {/* the machine stays: a crossed-out "move" arrow */}
          <path d="M 560 330 Q 900 180 1240 330" stroke={INK} strokeWidth={14} fill="none" strokeDasharray="30 22" />
          <path d="M 1210 290 L 1250 336 L 1194 352" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <g transform={`translate(900 240) scale(${x})`}>
            <path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="#C0392B" strokeWidth={26} strokeLinecap="round" />
          </g>
          <rect x={NB.x + 120} y={890} width={400} height={74} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
          <text x={NB.x + 320} y={942} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>machines: stay</text>
        </g>
      )}
    </ExplainShot>
  );
};

/* ---------------- "That's called cloud computing" ---------------- */
export const ShotCloud: React.FC = () => {
  const frame = useCurrentFrame();
  const lab = usePop(20, 11);
  const ends = [360, 760, 1160, 1560];
  return (
    <ExplainShot from={1.0} to={1.05} originY={400} bg="#BFD8E8">
      <Limbo color="#BFD8E8" floor="#A9C4D6" />
      <CloudShape x={960} y={380} scale={1.5} />
      <ServerRack x={780} y={470} scale={0.42} seed={1} />
      <ServerRack x={960} y={470} scale={0.42} seed={2} />
      <ServerRack x={1140} y={470} scale={0.42} seed={3} />
      {ends.map((ex, i) => {
        const d = `M ${860 + i * 70} 500 C ${860 + i * 70} 640 ${ex} 640 ${ex} 760`;
        const p = ((frame * 0.03 + i * 0.25) % 1);
        return (
          <g key={i}>
            <path d={d} stroke={INK} strokeWidth={12} fill="none" />
            <path d={d} stroke="#E1B83F" strokeWidth={6} fill="none" />
            <path d={d} stroke="#FFF7C8" strokeWidth={14} fill="none" pathLength={1} strokeDasharray="0.05 0.95" strokeDashoffset={-p} strokeLinecap="round" />
            <LaptopIcon x={ex} y={880} scale={0.9} />
          </g>
        );
      })}
      <g transform={`translate(960 140) scale(${lab})`}>
        <rect x={-330} y={-60} width={660} height={100} rx={14} fill={INK} />
        <text x={0} y={12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={66} fill={AMBER}>"cloud computing"</text>
      </g>
    </ExplainShot>
  );
};

/* ---------------- H100 to China needs a license ---------------- */
export const ShotNeedLicense: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = interpolate(frame, [4, 24], [0, 1], clamp);
  const card = usePop(30, 11);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <H100Box x={420} y={540} scale={0.85} />
      <path d={`M 640 540 L ${640 + arrow * 520} 540`} stroke={INK} strokeWidth={16} strokeLinecap="round" />
      {arrow > 0.95 && <path d="M 1130 500 L 1176 540 L 1130 580" stroke={INK} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      <text x={1380} y={570} textAnchor="middle" fontFamily={HAND_FONT} fontSize={100} fill="#6B6458">CHINA</text>
      <g transform={`translate(1340 840) scale(${0.5 * card}) rotate(-4)`}><LicenseCard x={0} y={0} /></g>
      <StampMark x={1340} y={820} text="REQUIRED" show={interpolate(frame, [44, 49], [0, 1], clamp)} size={70} />
    </ExplainShot>
  );
};

/* ---------------- Malaysia: the data center ---------------- */
const dcLights = (
  <Lighting
    ambient="#283458"
    lights={[
      { x: 960, y: 662, r: 300, ry: 80, color: "#9BFFB0", intensity: 1, glow: 0.35 },
      { x: 960, y: 800, r: 360, ry: 160, color: "#FFE3A8", intensity: 0.9, glow: 0.1 },
      { x: 960, y: 560, r: 700, ry: 160, color: "#DDE6FF", intensity: 0.55, glow: 0 },
    ]}
  />
);

export const ShotDataCenter: React.FC<{ check?: boolean }> = ({ check }) => {
  const frame = useCurrentFrame();
  const c = usePop(10, 10);
  const crateX = interpolate(frame, [0, 60], [380, 860], clamp);
  return (
    <StoryShot from={check ? 1.08 : 1.0} to={check ? 1.12 : 1.06} originX={960} originY={700} lighting={dcLights}
      overlay={check ? <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}><BigCheck x={1440} y={330} show={c} text="generally legal" /></svg> : <PlaceTag text="Malaysia" delay={4} />}
    >
      <DataCenter />
      {!check && <Crate x={crateX} y={890} label="H100" scale={0.55} />}
    </StoryShot>
  );
};

/* ---------------- Rent it out over the internet ---------------- */
export const ShotRent: React.FC = () => {
  const frame = useCurrentFrame();
  const clients = [{ x: 1480, y: 260 }, { x: 1640, y: 540 }, { x: 1480, y: 820 }];
  return (
    <ExplainShot from={1.0} to={1.05} bg="#1E2846">
      <rect width={1920} height={1080} fill="#1E2846" />
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 40) * 1080} r={2} fill="#4A5A8A" />)}
      {/* the data center, as an icon */}
      <rect x={210} y={340} width={420} height={420} rx={30} fill="#2B3A5C" stroke={INK} strokeWidth={6} />
      <ServerRack x={340} y={690} scale={0.6} seed={4} />
      <ServerRack x={500} y={690} scale={0.6} seed={5} />
      <text x={420} y={830} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill="#9BFFB0">MALAYSIA</text>
      {clients.map((c, i) => {
        const d = `M 640 550 C 980 550 1100 ${c.y} ${c.x - 140} ${c.y}`;
        const p = (frame * 0.025 + i * 0.33) % 1;
        const back = (frame * 0.02 + i * 0.2 + 0.5) % 1;
        return (
          <g key={i}>
            <path d={d} stroke="#7DFFB0" strokeWidth={6} fill="none" opacity={0.6} />
            <path d={d} stroke="#E9FFE9" strokeWidth={18} fill="none" pathLength={1} strokeDasharray="0.04 0.96" strokeDashoffset={-p} strokeLinecap="round" />
            <path d={d} stroke={AMBER} strokeWidth={20} fill="none" pathLength={1} strokeDasharray="0.001 0.999" strokeDashoffset={-(1 - back)} strokeLinecap="round" />
            <LaptopIcon x={c.x} y={c.y + 60} scale={1} />
          </g>
        );
      })}
      <text x={1560} y={1010} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#C9D4F0">overseas clients</text>
      <text x={940} y={420} fontFamily={HAND_FONT} fontSize={48} fill={AMBER}>$ rent $</text>
    </ExplainShot>
  );
};

/** The checklist: both steps legal. */
export const ShotChecklist: React.FC = () => {
  const a = usePop(2, 12);
  const b = usePop(10, 10);
  const rows = [{ t: "Data center in Malaysia", p: a }, { t: "Rent it over the internet", p: b }];
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#F6F1E7" floor="#E8E0CE" />
      <rect x={360} y={240} width={1200} height={560} rx={24} fill="#FBF7EE" stroke={INK} strokeWidth={8} />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={440} y={340 + i * 220} width={120} height={120} rx={14} fill="#fff" stroke={INK} strokeWidth={7} />
          {r.p > 0 && <path d="M 0 0 L 30 34 L 92 -40" transform={`translate(460 ${410 + i * 220}) scale(${r.p})`} stroke="#3E8E3F" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <text x={610} y={420 + i * 220} fontFamily={HAND_FONT} fontSize={68} fill={INK}>{r.t}</text>
        </g>
      ))}
      <text x={1480} y={760} textAnchor="end" fontFamily={HAND_FONT} fontSize={56} fill="#3E8E3F" opacity={b}>also legal.</text>
    </ExplainShot>
  );
};

/* ---------------- Skit: the official and the tech, under palm trees ---------------- */
const TECH = { x: 560, y: 1000 };
const OFFI = { x: 1420, y: 1000 };
const RACK = { x: 860, y: 900 };

type Who = "official" | "tech";

const YardStage: React.FC<{ om: number; tm: number; oe: Expression; te: Expression; ta?: "hold" | "shrug" | "wave"; form?: number; leak?: boolean }> = ({ om, tm, oe, te, ta = "hold", form = -1, leak }) => {
  const frame = useCurrentFrame();
  const hum = Math.sin(frame * 1.7) * 1.5;
  return (
    <>
      <RackYard />
      <ContactShadow x={RACK.x} y={RACK.y + 2} w={260} opacity={0.4} />
      <g transform={`translate(${hum} 0)`}><ServerRack x={RACK.x} y={RACK.y} seed={7} /></g>
      <path d={`M ${RACK.x - 150} ${RACK.y - 300} q -14 -10 0 -20 M ${RACK.x - 170} ${RACK.y - 290} q -18 -14 0 -28`} stroke="#C9D4F0" strokeWidth={4} fill="none" opacity={0.7} />
      {leak && (
        <g>
          {[0, 1, 2].map((i) => {
            const t = ((frame * 0.018 + i * 0.33) % 1);
            const px = RACK.x + 60 + t * 300;
            const py = RACK.y - 540 - t * 300;
            return i === 0 ? <KeyIcon key={i} x={px} y={py} scale={1.2} rot={-20} /> : <AnswerSheet key={i} x={px} y={py} scale={1.1} rot={-10 + i * 8} />;
          })}
        </g>
      )}
      <ContactShadow x={TECH.x} y={TECH.y + 2} w={190} opacity={0.4} />
      <Character {...look("tech")} prop={ta === "hold" ? "none" : "tablet"} x={TECH.x} y={TECH.y} expression={te} arm={ta} mouth={tm} lookX={14} />
      <ContactShadow x={OFFI.x} y={OFFI.y + 2} w={190} opacity={0.4} />
      <Character {...look("official")} prop="clipboard" x={OFFI.x} y={OFFI.y} expression={oe} arm="hold" flip mouth={om} lookX={-14} />
      {form >= 0 && (
        <g transform={`translate(${interpolate(form, [0, 1], [OFFI.x - 160, RACK.x])} ${interpolate(form, [0, 1], [OFFI.y - 360, RACK.y - 300])}) rotate(${interpolate(form, [0, 1], [20, -4])}) scale(${interpolate(form, [0, 1], [0.3, 0.75])})`}>
          <BigForm x={0} y={0} />
        </g>
      )}
    </>
  );
};

const yardLights = (
  <Lighting
    ambient="#3A4468"
    lights={[
      { x: TECH.x, y: TECH.y - 380, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: OFFI.x, y: OFFI.y - 380, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: RACK.x, y: RACK.y - 260, r: 260, ry: 340, color: "#9BFFB0", intensity: 0.9, glow: 0.3 },
      { x: 960, y: 0, r: 900, ry: 260, color: "#FFE3A8", intensity: 0.5, glow: 0.1 },
    ]}
  />
);

type YardLine = { line: string; who: Who; text: string; oe?: Expression; te?: Expression; ta?: "hold" | "shrug" | "wave"; leak?: boolean; formDrop?: boolean };

export const ShotYardWide: React.FC<YardLine> = ({ line, who, text, oe = "neutral", te = "happy", ta = "hold", leak, formDrop }) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const isO = who === "official";
  const form = formDrop ? interpolate(frame, [24, 40], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : -1;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={yardLights} vignette={0.45}
      overlay={isO ? <Say text={text} tailX={OFFI.x - 60} tailY={360} y={90} /> : <Say text={text} tailX={TECH.x + 60} tailY={360} y={90} />}
    >
      <YardStage om={isO ? mouth : 0} tm={isO ? 0 : mouth} oe={oe} te={te} ta={ta} leak={leak} form={form} />
    </StoryShot>
  );
};

export const ShotYardClose: React.FC<YardLine> = ({ line, who, text, oe = "neutral", te = "happy", ta = "hold", leak }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isO = who === "official";
  const cx = isO ? OFFI.x - 60 : TECH.x + 80;
  const cy = (isO ? OFFI.y : TECH.y) - 380;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={isO ? 1260 : 720} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><YardStage om={isO ? mouth : 0} tm={isO ? 0 : mouth} oe={oe} te={te} ta={ta} leak={leak} /></Stage>
          {yardLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isO ? <Say text={text} tailX={1180} tailY={300} y={60} /> : <Say text={text} tailX={760} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- Lawmakers spot the gap ---------------- */
export const ShotGap: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 4;
  return (
    <ExplainShot from={1.0} to={1.05} originX={900} originY={400}>
      <Limbo color="#DCE8F2" floor="#C6D3DE" />
      <PaperWall x={660} y={420} w={260} h={480} />
      <g transform={`translate(${drift} 0)`}>
        <CloudShape x={500} y={240} scale={0.55} />
        <Wifi x={500} y={210} scale={0.8} color="#3E8E8A" />
      </g>
      <Character {...look("unclesam")} prop="none" x={1360} y={980} expression="worried" arm="hold" flip lookX={-12} />
      <Magnifier x={1150} y={430} scale={1.1} rot={-30} />
      <path d={`M 940 420 L 940 120`} stroke="#C0392B" strokeWidth={6} strokeDasharray="18 14" />
      <text x={960} y={110} fontFamily={HAND_FONT} fontSize={48} fill="#C0392B">gap</text>
    </ExplainShot>
  );
};

/* ---------------- Flashback: remember the neighbor ---------------- */
export const ShotRemember: React.FC = () => (
  <AbsoluteFill style={{ filter: "sepia(0.75) saturate(0.8) brightness(0.92)" }}>
    <ShotCable arrows={false} />
  </AbsoluteFill>
);

/* ---------------- Singapore: a tiny firm, a long cable ---------------- */
export const ShotSingapore: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const run = interpolate(frame, [20, durationInFrames - 10], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const ox = TINY_OFFICE.x + TINY_OFFICE.w / 2;
  const oy = TINY_OFFICE.y + TINY_OFFICE.h / 2;
  const d = `M ${TINY_OFFICE.x + TINY_OFFICE.w} ${oy + 10} C 1500 ${oy + 40} 1600 900 2000 980`;
  return (
    <StoryShot from={1.0} to={1.22} originX={ox} originY={oy} vignette={0.7}
      lighting={<Lighting ambient="#3A4070" lights={[{ x: ox, y: oy, r: 220, color: "#FFD27A", intensity: 1, glow: 0.5 }, { x: 960, y: 200, r: 900, ry: 300, color: "#C9D4F0", intensity: 0.5, glow: 0.1 }]} />}
      overlay={<PlaceTag text="Singapore" delay={6} />}
    >
      <CityNight />
      <path d={d} stroke={INK} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - run} strokeLinecap="round" />
      <path d={d} stroke="#E1B83F" strokeWidth={5} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - run} strokeLinecap="round" />
    </StoryShot>
  );
};

