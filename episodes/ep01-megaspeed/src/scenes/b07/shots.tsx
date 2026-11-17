// Shots for B07a · WHAT THEY ALLEGEDLY WANTED (voice/07a_what-they-allegedly-wanted.mp3, lines b07_001…b07_022).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Character, Expression } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Grain, Lighting, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo } from "../open/sets";
import { Say } from "../b02/shots";
import { GovBuilding, StampMark } from "../b03/sets";
import { Magnifier } from "../b04/sets";
import { AnalystRoom, MONITOR, Passport, Tray } from "../b05/setsB";
import {
  AgencyBuilding, Airport, BigHeadphones, Blueprint, DeskPlate, LongTable, MemoPage, PressBox, Silhouette, TopSecretFolder, Waveform,
} from "./sets";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Source: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", right: 70, bottom: 56, fontFamily: HAND_FONT, fontSize: 36, color: "#fff", background: "rgba(14,14,20,0.72)", padding: "6px 22px", borderRadius: 8 }}>{text}</div>
);

/* ---------------- Spring 2026, Washington ---------------- */
export const ShotWashington: React.FC = () => (
  <StoryShot from={1.0} to={1.06} originX={960} originY={520}
    lighting={<Lighting ambient="#2A3460" lights={[{ x: 960, y: 620, r: 560, ry: 260, color: "#FFE3A8", intensity: 0.9, glow: 0.25 }, { x: 960, y: 300, r: 300, color: "#DDE6FF", intensity: 0.6, glow: 0.1 }]} />}
    overlay={<><DateTag text="Spring 2026" delay={2} /><PlaceTag text="Washington, D.C." delay={8} /></>}
  >
    <GovBuilding />
  </StoryShot>
);

/* ---------------- Feb 26, 2026: the passport comes back ---------------- */
export const ShotPassportBack: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [12, 40], [690, 470], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.05} overlay={<><DateTag text="February 26, 2026" delay={2} /><Source text="Source: Singapore Ministry of Home Affairs" /></>}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <Tray x={960} y={860} />
      <Passport x={960} y={y} rot={-6 + (690 - y) * 0.03} scale={1.1 + (690 - y) * 0.002} />
      <text x={960} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill={INK}>passport returned</text>
    </ExplainShot>
  );
};

export const ShotDeparts: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 70], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return (
    <StoryShot from={1.0} to={1.05} originX={900} originY={600}
      lighting={<Lighting ambient="#2A3460" lights={[{ x: 1550, y: 320, r: 360, ry: 240, color: "#C9D4F0", intensity: 0.8, glow: 0.25 }, { x: 960, y: 800, r: 900, ry: 160, color: "#FFE3A8", intensity: 0.6, glow: 0.1 }]} />}
      overlay={<div style={{ position: "absolute", left: 70, top: 60, fontFamily: HAND_FONT, fontSize: 64, color: AMBER, textShadow: "0 4px 0 #000" }}>the SAME day</div>}
    >
      <Airport takeoff={t} />
    </StoryShot>
  );
};

/* ---------------- The memo circulates ---------------- */
export const ShotMemoSlides: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 60], [560, 900], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sc = interpolate(y, [560, 900], [0.4, 1.1]);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={700}
      lighting={<Lighting ambient="#262A40" lights={[{ x: 960, y: 760, r: 520, ry: 320, color: "#FFF0C8", intensity: 1, glow: 0.2 }]} cones={[{ x: 960, y: 0, topW: 120, bottomW: 900, h: 900, color: "#FFF0C8", opacity: 0.12 }]} />}
    >
      <LongTable />
      <TopSecretFolder x={960} y={y} scale={sc} rot={(y - 560) * 0.02} />
    </StoryShot>
  );
};

export const ShotAnonymous: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={960} originY={540} vignette={0.6}
    lighting={<Lighting ambient="#2A2E44" lights={[{ x: 960, y: 500, r: 900, ry: 400, color: "#9FB0E0", intensity: 0.7, glow: 0.1 }]} />}
    overlay={<div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: HAND_FONT, fontSize: 70, color: "#fff", textShadow: "0 4px 0 #000" }}>anonymous sources → reporters</div>}
  >
    <rect width={1920} height={1080} fill="#4A5068" />
    <Silhouette x={420} y={1000} scale={1.1} />
    <Silhouette x={1500} y={1000} scale={1.0} />
    <Waveform x={300} y={420} w={260} h={120} color="#C9D4F0" />
    <Waveform x={1380} y={440} w={260} h={120} color="#C9D4F0" seed={4} />
    {/* reporter's notepad */}
    <g transform="translate(960 700) rotate(-4)">
      <rect x={-170} y={-220} width={340} height={420} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M -140 ${-150 + i * 44} L 140 ${-150 + i * 44}`} stroke="#9BC6EC" strokeWidth={3} />)}
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-130 + i * 52} cy={-220} r={12} fill="#9AA0A6" stroke={INK} strokeWidth={3} />)}
      <text x={-130} y={-120} fontFamily={HAND_FONT} fontSize={36} fill="#2D4A8A">"a memo exists…"</text>
    </g>
  </StoryShot>
);

/** Oversaw by the Secretary of State (per the NYT) — the desk, not the person. */
export const ShotOversaw: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={960} originY={620}
    lighting={<Lighting ambient="#5A5A78" lights={[{ x: 1060, y: 560, r: 900, ry: 520, color: "#FFF0C8", intensity: 1, glow: 0.15 }]} />}
    overlay={<Source text="Source: The New York Times" />}
  >
    <rect width={1920} height={1080} fill="#7A6A8A" />
    <rect x={0} y={760} width={1920} height={320} fill="#8A6040" />
    <TopSecretFolder x={960} y={600} scale={1.1} rot={-3} />
    <DeskPlate x={960} y={900} text="SECRETARY OF STATE" />
    <g transform="translate(1340 330) rotate(6)">
      <rect x={-170} y={-70} width={340} height={140} fill="#F5D547" stroke={INK} strokeWidth={4} />
      <text x={0} y={-12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={32} fill={INK}>overseen by</text>
      <text x={0} y={36} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill={INK}>Marco Rubio</text>
    </g>
  </StoryShot>
);

export const ShotSurveillance: React.FC = () => (
  <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: The New York Times" />}>
    <Limbo color="#DCE3E8" floor="#C9D2D8" />
    <MemoPage x={760} y={540} rows={["Source:", "electronic surveillance"]} hi={1} title="BASED ON" />
    <g transform="translate(1520 640)"><BigHeadphones x={0} y={0} scale={0.9} /></g>
  </ExplainShot>
);

export const ShotListening: React.FC = () => (
  <StoryShot from={1.0} to={1.08} originX={960} originY={560} vignette={0.7}
    lighting={<Lighting ambient="#1E2236" lights={[{ x: 960, y: 560, r: 520, ry: 340, color: "#9BFFB0", intensity: 0.9, glow: 0.35 }]} />}
    overlay={<div style={{ position: "absolute", left: 0, right: 0, bottom: 120, textAlign: "center", fontFamily: HAND_FONT, fontSize: 64, color: "#C9D4F0" }}>someone was <i>reportedly</i> listening</div>}
  >
    <rect width={1920} height={1080} fill="#20243A" />
    <rect x={0} y={760} width={1920} height={320} fill="#2A2E44" />
    <BigHeadphones x={960} y={680} scale={1.3} />
    <Waveform x={640} y={360} w={640} h={140} />
  </StoryShot>
);

/* ---------------- Skit: the listeners (Analyst + Analyst 2) ---------------- */
const A1 = { x: 380, y: 1000 };
const A2 = { x: 1540, y: 1000 };

const MonitorContent: React.FC<{ meeting?: boolean }> = ({ meeting }) => {
  const p = usePop(8, 11);
  return (
    <g>
      <rect width={MONITOR.w} height={MONITOR.h} fill="#14182A" />
      <Waveform x={60} y={MONITOR.h / 2} w={MONITOR.w - 120} h={200} />
      <text x={40} y={60} fontFamily={HAND_FONT} fontSize={36} fill="#9BFFB0">● REC</text>
      {meeting && (
        <g transform={`translate(${MONITOR.w / 2} ${MONITOR.h / 2}) scale(${p})`}>
          <rect x={-330} y={-130} width={660} height={260} rx={16} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
          <rect x={-330} y={-130} width={660} height={60} rx={16} fill="#2D4A8A" />
          <text x={0} y={-88} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill="#fff">CALENDAR INVITE</text>
          <text x={0} y={-10} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>Meeting about</text>
          <text x={0} y={50} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>the meeting</text>
        </g>
      )}
    </g>
  );
};

const ListenStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression; meeting?: boolean }> = ({ m1, m2, e1, e2, meeting }) => (
  <>
    <AnalystRoom><MonitorContent meeting={meeting} /></AnalystRoom>
    <ContactShadow x={A1.x} y={A1.y + 2} w={190} opacity={0.4} />
    <Character {...look("analyst")} x={A1.x} y={A1.y} expression={e1} arm="hold" mouth={m1} lookX={14} />
    <ContactShadow x={A2.x} y={A2.y + 2} w={190} opacity={0.4} />
    <Character {...look("analyst2")} x={A2.x} y={A2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
  </>
);

const listenLights = (
  <Lighting
    ambient="#2E3248"
    lights={[
      { x: MONITOR.x + MONITOR.w / 2, y: MONITOR.y + MONITOR.h / 2, r: 560, ry: 380, color: "#9BFFB0", intensity: 0.9, glow: 0.3 },
      { x: A1.x, y: A1.y - 400, r: 280, color: "#C9D8FF", intensity: 0.9, glow: 0 },
      { x: A2.x, y: A2.y - 400, r: 280, color: "#FFF0DC", intensity: 0.9, glow: 0 },
    ]}
  />
);

type ListenLine = { line: string; who: "a1" | "a2"; text: string; e1?: Expression; e2?: Expression; meeting?: boolean };

export const ShotListenWide: React.FC<ListenLine> = ({ line, who, text, e1 = "worried", e2 = "neutral", meeting }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "a1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={500} lighting={listenLights} vignette={0.45}
      overlay={is1 ? <Say text={text} tailX={A1.x + 60} tailY={470} y={20} /> : <Say text={text} tailX={A2.x - 60} tailY={470} y={20} />}
    >
      <ListenStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} meeting={meeting} />
    </StoryShot>
  );
};

export const ShotListenClose: React.FC<ListenLine> = ({ line, who, text, e1 = "worried", e2 = "neutral", meeting }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "a1";
  const cx = is1 ? A1.x + 80 : A2.x - 60;
  const cy = (is1 ? A1.y : A2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><ListenStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} meeting={meeting} /></Stage>
          {listenLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- What the memo allegedly said ---------------- */
export const ShotMemoOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [20, 25], [0, 1], clamp);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560}
      lighting={<Lighting ambient="#2E3048" lights={[{ x: 960, y: 560, r: 700, ry: 420, color: "#FFF0C8", intensity: 1, glow: 0.15 }]} />}
    >
      <rect width={1920} height={1080} fill="#4A3426" />
      <TopSecretFolder x={960} y={540} scale={1.6} open />
      <StampMark x={960} y={640} text="ALLEGED" show={show} size={110} rot={-10} />
    </StoryShot>
  );
};

export const ShotMemoClaim: React.FC<{ rows: string[]; hi?: number; title?: string; source: string; alleged?: boolean }> = ({ rows, hi, title, source, alleged = true }) => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [10, 15], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text={source} />}>
      <Limbo color="#E9E2D2" />
      <MemoPage x={960} y={520} rows={rows} hi={hi} title={title} />
      {alleged && <StampMark x={1160} y={720} text="ALLEGED" show={show} size={70} rot={-8} />}
    </ExplainShot>
  );
};

export const ShotSpyAgency: React.FC<{ joke?: boolean }> = ({ joke }) => {
  const p = usePop(6, 11);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600}
      lighting={<Lighting ambient="#5A6080" lights={[{ x: 960, y: 520, r: 900, ry: 520, color: "#DDE6FF", intensity: 0.9, glow: 0.1 }]} />}
    >
      <rect width={1920} height={1080} fill="#3A4060" />
      <rect x={0} y={900} width={1920} height={180} fill="#2A2E3A" />
      {!joke && <AgencyBuilding x={560} y={900} w={800} h={620} label="Ministry of State Security" />}
      {joke && (
        <g>
          <AgencyBuilding x={460} y={900} w={500} h={620} label="CIA" color="#7A8098" />
          <AgencyBuilding x={960} y={900} w={500} h={620} label="FBI" color="#8A8F98" />
          <path d="M 960 280 L 960 900" stroke={INK} strokeWidth={6} />
          <g transform={`translate(1640 900) scale(${p})`}><PressBox x={0} y={0} /></g>
          <text x={1640} y={640} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill="#F6F1E7" opacity={p}>(rarely used)</text>
        </g>
      )}
      {!joke && <text x={960} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={66} fill="#F6F1E7">China's top spy agency</text>}
    </StoryShot>
  );
};

export const ShotGoalOne: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = interpolate(frame, [0, 80], [700, 1150], clamp);
  return (
    <ExplainShot from={1.0} to={1.05} overlay={<><div style={{ position: "absolute", left: 70, top: 60, fontFamily: HAND_FONT, fontSize: 64, color: "#fff", background: "#C0392B", padding: "4px 26px", borderRadius: 10 }}>GOAL 1 (alleged)</div><Source text="Source: The New York Times" /></>}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <Blueprint x={960} y={560} />
      <Magnifier x={mx} y={480} scale={1.3} rot={-25} />
    </ExplainShot>
  );
};
