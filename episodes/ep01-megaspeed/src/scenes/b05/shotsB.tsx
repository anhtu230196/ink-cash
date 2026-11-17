// Shots for B05b · THE APPROACH, part 2 (voice/05b_the-approach.mp3, lines b05_037…b05_062).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, CharacterLook, Expression } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Dramatization, Grain, Lighting, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, DUR, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo } from "../open/sets";
import { Say } from "../b02/shots";
import { Crate, StampMark } from "../b03/sets";
import { Port } from "../b04/sets";
import { Boardroom, GlassTower, PriceSticker } from "./sets";
import {
  AnalystRoom, BusinessCard, Chair, CocktailTable, DeclarationForm, MONITOR, PartyHall, Passport, PoliceOffice, Polaroid, ShrimpBuffet, Tray,
} from "./setsB";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Source: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", right: 70, bottom: 56, fontFamily: HAND_FONT, fontSize: 36, color: "#fff", background: "rgba(14,14,20,0.72)", padding: "6px 22px", borderRadius: 8 }}>{text}</div>
);

/* ---------------- 2025: the pitch (as reported by the FT) ---------------- */
const SCREEN = { x: 1080, y: 110, w: 680, h: 380 };

const Slide: React.FC<{ kind: "intro" | "chips" | "client" }> = ({ kind }) => {
  const p = usePop(4, 12);
  const cx = SCREEN.x + SCREEN.w / 2;
  return (
    <g>
      <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} fill="#F6F1E7" />
      <text x={cx} y={SCREEN.y + 80} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill="#2D4A8A" letterSpacing={4}>MEGASPEED</text>
      {kind === "intro" && <text x={cx} y={SCREEN.y + 220} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill={INK}>raising funds · 2025</text>}
      {kind === "chips" && (
        <g transform={`translate(${cx} ${SCREEN.y + 210}) scale(${p})`}>
          <text x={0} y={0} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill={INK}>Nvidia chips?</text>
          <text x={0} y={80} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#3E8E3F">no problem ✓</text>
        </g>
      )}
      {kind === "client" && (
        <g transform={`translate(${cx} ${SCREEN.y + 200}) scale(${p})`}>
          <text x={0} y={0} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill="#6B6458">CLIENTS</text>
          <text x={0} y={80} textAnchor="middle" fontFamily={HAND_FONT} fontSize={72} fill={INK}>Alibaba</text>
        </g>
      )}
    </g>
  );
};

export const ShotPitch2025: React.FC<{ kind: "intro" | "chips" | "client" }> = ({ kind }) => (
  <StoryShot from={1.0} to={1.05} originX={1100} originY={420}
    lighting={<Lighting ambient="#5A5680" lights={[{ x: 1420, y: 300, r: 480, ry: 300, color: "#E6F0FF", intensity: 1, glow: 0.25 }, { x: 820, y: 640, r: 420, ry: 480, color: "#FFF4E0", intensity: 1, glow: 0 }]} />}
    overlay={
      <>
        {kind === "intro" && <DateTag text="2025" delay={2} />}
        <Source text={kind === "intro" ? "Source: Financial Times" : kind === "chips" ? "An investor's account, via the Financial Times" : "As reported by the Financial Times"} />
      </>
    }
  >
    <Boardroom slide={0} />
    <Slide kind={kind} />
    <Character {...look("alice")} prop="none" x={820} y={1000} expression="happy" arm="point" lookX={14} />
    {/* investors, seen from behind */}
    {[300, 560, 1240, 1560].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={900} r={70} fill="#1A1626" />
        <path d={`M ${x - 120} 1080 Q ${x - 120} 960 ${x} 960 Q ${x + 120} 960 ${x + 120} 1080 Z`} fill="#1A1626" />
      </g>
    ))}
  </StoryShot>
);

/* ---------------- June 2024: an Alibaba unit lends to Speedmatrix ---------------- */
export const ShotLoan: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [14, 60], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const Box: React.FC<{ x: number; title: string; sub: string; color: string }> = ({ x, title, sub, color }) => (
    <g>
      <rect x={x - 230} y={380} width={460} height={260} rx={22} fill={color} stroke={INK} strokeWidth={7} />
      <text x={x} y={490} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill="#fff">{title}</text>
      <text x={x} y={560} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill="#F6F1E7">{sub}</text>
    </g>
  );
  const bx = 640 + t * 640;
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<><DateTag text="June 2024" delay={2} /><Source text="As reported by the Financial Times" /></>}>
      <Limbo />
      <Box x={420} title="Alibaba unit" sub="(lender)" color="#C46A2B" />
      <Box x={1500} title="Speedmatrix" sub="Malaysia" color="#2D4A8A" />
      <path d="M 660 510 L 1250 510" stroke={INK} strokeWidth={10} strokeDasharray="26 18" />
      <path d="M 1230 480 L 1268 510 L 1230 540" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
      <g transform={`translate(${bx} 420)`}>
        <path d="M -60 -10 Q -80 80 0 90 Q 80 80 60 -10 Q 30 -40 0 -40 Q -30 -40 -60 -10 Z" fill="#C9A15B" stroke={INK} strokeWidth={6} />
        <path d="M -24 -40 L -36 -70 L 36 -70 L 24 -40" fill="#C9A15B" stroke={INK} strokeWidth={6} />
        <text x={0} y={52} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>$</text>
      </g>
      <PriceSticker x={960} y={760} text="LOAN" rot={-4} />
    </ExplainShot>
  );
};

/* ---------------- Taipei, 2024 & 2025: photos ---------------- */
const MiniParty: React.FC<{ gap?: number }> = ({ gap = 0 }) => (
  <g transform="translate(176 330) scale(0.42)">
    <Character {...look("alice")} prop="none" x={-160 - gap} y={0} expression="happy" arm="down" lookX={10} />
    <Character {...look("jensen")} prop="none" x={160 + gap} y={0} expression="happy" arm="wave" flip lookX={-10} />
  </g>
);

export const ShotPhotos: React.FC<{ noAudio?: boolean }> = ({ noAudio }) => {
  const frame = useCurrentFrame();
  const flash = noAudio ? 0 : interpolate(frame % 24, [0, 3, 8], [0, 0.8, 0], clamp);
  const a = usePop(2, 12);
  const b = usePop(16, 12);
  const m = usePop(8, 10);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={520}
      lighting={<Lighting ambient="#3A3550" lights={[{ x: 960, y: 520, r: 760, ry: 460, color: "#FFF0C8", intensity: 1, glow: 0.1 }]} />}
      overlay={
        <>
          {!noAudio && <PlaceTag text="Taipei" delay={4} />}
          {!noAudio && <Source text="Source: event photos reported by IBTimes UK" />}
          <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
        </>
      }
    >
      <rect width={1920} height={1080} fill="#5A4636" />
      <g transform={`translate(0 ${(1 - a) * 300})`} opacity={a}>
        <Polaroid x={640} y={520} rot={-6} caption="Taipei · 2024"><MiniParty gap={10} /></Polaroid>
      </g>
      <g transform={`translate(0 ${(1 - b) * 300})`} opacity={b}>
        <Polaroid x={1280} y={540} rot={5} caption="Taipei · 2025"><MiniParty gap={40} /></Polaroid>
      </g>
      {noAudio && (
        <g transform={`translate(960 900) scale(${m})`}>
          <rect x={-330} y={-70} width={660} height={140} rx={20} fill="#14182A" stroke={INK} strokeWidth={6} />
          <path d="M -280 0 L 120 0" stroke="#7DFFB0" strokeWidth={6} />
          <path d="M 170 -30 L 200 -30 L 240 -60 L 240 60 L 200 30 L 170 30 Z" fill="#F6F1E7" stroke={INK} strokeWidth={4} />
          <path d="M 262 -30 L 300 30 M 300 -30 L 262 30" stroke="#FF6B5A" strokeWidth={8} strokeLinecap="round" />
          <text x={-80} y={-20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill="#C9D4F0">no recording</text>
        </g>
      )}
    </StoryShot>
  );
};

/* ---------------- Skit (dramatization): small talk at a trade-show party ---------------- */
const AL = { x: 680, y: 1000 };
const JH = { x: 1260, y: 1000 };

const PartyStage: React.FC<{ am: number; jm: number; ae: Expression; je: Expression; card?: boolean; chair?: number }> = ({ am, jm, ae, je, card = true, chair = -1 }) => (
  <>
    <PartyHall />
    <ShrimpBuffet x={1700} y={860} scale={0.8} />
    <CocktailTable x={970} y={980} />
    <ContactShadow x={AL.x} y={AL.y + 2} w={190} opacity={0.4} />
    <Character {...look("alice")} prop="none" x={AL.x} y={AL.y} expression={ae} arm="hold" mouth={am} lookX={14} />
    {card && <BusinessCard x={AL.x + 150} y={AL.y - 330} />}
    <ContactShadow x={JH.x} y={JH.y + 2} w={200} opacity={0.4} />
    <Character {...look("jensen")} prop="none" x={JH.x} y={JH.y} expression={je} arm="wave" flip mouth={jm} lookX={-14} />
    {chair >= 0 && <Chair x={interpolate(chair, [0, 1], [2100, AL.x - 230])} y={AL.y} scale={0.95} />}
  </>
);

const partyLights = (
  <Lighting
    ambient="#4A4470"
    lights={[
      { x: AL.x, y: AL.y - 400, r: 300, color: "#FFF0DC", intensity: 1, glow: 0 },
      { x: JH.x, y: JH.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: 960, y: 260, r: 1000, ry: 160, color: "#FFE3A8", intensity: 0.6, glow: 0.35 },
      { x: 1700, y: 760, r: 260, ry: 140, color: "#FFE3A8", intensity: 0.7, glow: 0.1 },
    ]}
  />
);

type PartyLine = { line: string; who: "alice" | "jensen"; text: string; ae?: Expression; je?: Expression; card?: boolean; chair?: boolean };

export const ShotPartyWide: React.FC<PartyLine> = ({ line, who, text, ae = "happy", je = "happy", card = true, chair }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mouth = useMouth(audioFile(EP, line));
  const isA = who === "alice";
  const c = chair ? interpolate(frame, [Math.round(DUR[line] * fps * 0.45), Math.round(DUR[line] * fps * 0.45) + 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : -1;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={partyLights} vignette={0.45}
      overlay={<>{isA ? <Say text={text} tailX={AL.x + 60} tailY={360} y={90} /> : <Say text={text} tailX={JH.x - 60} tailY={360} y={90} />}<Dramatization /></>}
    >
      <PartyStage am={isA ? mouth : 0} jm={isA ? 0 : mouth} ae={ae} je={je} card={card} chair={c} />
    </StoryShot>
  );
};

export const ShotPartyClose: React.FC<PartyLine> = ({ line, who, text, ae = "happy", je = "happy", card = true }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isA = who === "alice";
  const cx = isA ? AL.x + 80 : JH.x - 60;
  const cy = (isA ? AL.y : JH.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={isA ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><PartyStage am={isA ? mouth : 0} jm={isA ? 0 : mouth} ae={ae} je={je} card={card} /></Stage>
          {partyLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isA ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
      <Dramatization />
    </AbsoluteFill>
  );
};

/* ---------------- Nvidia's response ---------------- */
export const ShotNvidiaResponse: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = ["9:00  keynote", "11:00  meet a big customer", "13:00  meet another customer", "15:00  photos"];
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Nvidia: meeting big customers is normal for a CEO (via TweakTown)" />}>
      <Limbo color="#E2EDE0" floor="#CFE0CB" />
      <rect x={460} y={140} width={1000} height={720} rx={20} fill="#FBF7EE" stroke={INK} strokeWidth={8} />
      <rect x={460} y={140} width={1000} height={120} rx={20} fill="#3E8E4F" stroke={INK} strokeWidth={8} />
      <text x={960} y={222} textAnchor="middle" fontFamily={HAND_FONT} fontSize={62} fill="#fff">A CEO'S SCHEDULE</text>
      {rows.map((r, i) => {
        const p = interpolate(frame, [6 + i * 10, 14 + i * 10], [0, 1], clamp);
        return (
          <g key={r} opacity={p}>
            <text x={540} y={360 + i * 120} fontFamily={HAND_FONT} fontSize={54} fill={INK}>{r}</text>
            {i === 1 || i === 2 ? <path d={`M 1340 ${340 + i * 120} l 22 24 l 44 -50`} stroke="#3E8E3F" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
          </g>
        );
      })}
    </ExplainShot>
  );
};

/* ---------------- Skit: the analysts and the party photo ---------------- */
const A1 = { x: 380, y: 1000 };
const A2 = { x: 1540, y: 1000 };

/** The party photo on the monitor (same people, same table, the shrimp buffet). */
const PhotoOnScreen: React.FC<{ circle?: "her" | "shrimp" }> = ({ circle }) => {
  const frame = useCurrentFrame();
  const c = interpolate(frame, [6, 20], [0, 1], clamp);
  return (
    <g>
      <g transform="scale(0.42) translate(-80 -60)">
        <PartyHall crowd={false} />
        <ShrimpBuffet x={1700} y={860} scale={0.8} />
        <CocktailTable x={970} y={980} />
        <Character {...look("alice")} prop="none" x={AL.x + 120} y={AL.y} expression="happy" arm="hold" lookX={14} />
        <Character {...look("jensen")} prop="none" x={JH.x} y={JH.y} expression="happy" arm="wave" flip lookX={-14} />
      </g>
      {circle === "her" && <ellipse cx={360} cy={240} rx={240} ry={170} fill="none" stroke="#FF6B5A" strokeWidth={8} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - c} />}
      {circle === "shrimp" && <ellipse cx={680} cy={320} rx={110} ry={90} fill="none" stroke={AMBER} strokeWidth={8} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - c} />}
    </g>
  );
};

const ANALYST2: CharacterLook = look("analyst2");

const AnalystStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression; circle?: "her" | "shrimp"; write?: boolean }> = ({ m1, m2, e1, e2, circle, write }) => (
  <>
    <AnalystRoom><PhotoOnScreen circle={circle} /></AnalystRoom>
    <ContactShadow x={A1.x} y={A1.y + 2} w={190} opacity={0.4} />
    <Character {...look("analyst")} x={A1.x} y={A1.y} expression={e1} arm={write ? "hold" : "point"} mouth={m1} lookX={14} />
    <ContactShadow x={A2.x} y={A2.y + 2} w={190} opacity={0.4} />
    <Character {...ANALYST2} prop="cup" x={A2.x} y={A2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
  </>
);

const analystLights = (
  <Lighting
    ambient="#2E3248"
    lights={[
      { x: MONITOR.x + MONITOR.w / 2, y: MONITOR.y + MONITOR.h / 2, r: 560, ry: 380, color: "#C9D8FF", intensity: 1, glow: 0.3 },
      { x: A1.x, y: A1.y - 400, r: 280, color: "#C9D8FF", intensity: 0.9, glow: 0 },
      { x: A2.x, y: A2.y - 400, r: 280, color: "#FFF0DC", intensity: 0.9, glow: 0 },
    ]}
  />
);

type AnalystLine = { line: string; who: "a1" | "a2"; text: string; e1?: Expression; e2?: Expression; circle?: "her" | "shrimp"; write?: boolean };

export const ShotAnalystWide: React.FC<AnalystLine> = ({ line, who, text, e1 = "worried", e2 = "neutral", circle, write }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "a1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={500} lighting={analystLights} vignette={0.45}
      overlay={is1 ? <Say text={text} tailX={A1.x + 60} tailY={470} y={20} /> : <Say text={text} tailX={A2.x - 60} tailY={470} y={20} />}
    >
      <AnalystStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} circle={circle} write={write} />
    </StoryShot>
  );
};

export const ShotAnalystClose: React.FC<AnalystLine> = ({ line, who, text, e1 = "worried", e2 = "neutral", circle }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "a1";
  const cx = is1 ? A1.x + 80 : A2.x - 60;
  const cy = (is1 ? A1.y : A2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><AnalystStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} circle={circle} /></Stage>
          {analystLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/** Close on the monitor; the speaker is off-screen (bubble tail to the frame edge). */
export const ShotMonitor: React.FC<AnalystLine> = ({ line, who, text, circle }) => {
  useMouth(audioFile(EP, line));
  const is1 = who === "a1";
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.9} cx={MONITOR.x + MONITOR.w / 2} cy={MONITOR.y + MONITOR.h / 2} tx={960} ty={600}>
        <Camera from={1} to={1.05} originX={MONITOR.x + MONITOR.w / 2} originY={MONITOR.y + MONITOR.h / 2}>
          <Stage><AnalystStage m1={0} m2={0} e1="worried" e2="neutral" circle={circle} /></Stage>
          {analystLights}
        </Camera>
      </Closer>
      <Vignette strength={0.45} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={60} tailY={400} y={60} /> : <Say text={text} tailX={1860} tailY={400} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- February 2025: Singapore investigates ---------------- */
const OFFICER: CharacterLook = { outfit: "uniform", color: "#2E3A57", hair: "short", hairColor: "#1F1F1F", hat: "cap", hatColor: "#1E2A40" };

export const ShotNotices: React.FC = () => {
  const frame = useCurrentFrame();
  const lamp = frame > 12 ? 1 : 0;
  const bang = usePop(22, 9);
  return (
    <StoryShot from={1.0} to={1.06} originX={960} originY={560}
      lighting={<Lighting ambient="#2A2E48" lights={[{ x: 1390, y: 640, r: 520 * lamp + 40, ry: 300 * lamp + 30, color: "#FFF0C8", intensity: 1, glow: 0.2 }, { x: 1480, y: 330, r: 360, ry: 260, color: "#9FB0E0", intensity: 0.5, glow: 0 }]} />}
      overlay={<><DateTag text="February 2025" delay={2} /><PlaceTag text="Singapore" delay={8} /></>}
    >
      <PoliceOffice />
      <Character {...OFFICER} prop="folder" x={1000} y={900} expression={bang > 0.3 ? "surprised" : "neutral"} arm="hold" lookX={10} />
      <rect x={560} y={760} width={900} height={40} fill="#6B4A36" stroke={INK} strokeWidth={6} />
      <rect x={600} y={800} width={820} height={260} fill="#5A3E2B" stroke={INK} strokeWidth={6} />
      <text x={1130} y={430} fontFamily={HAND_FONT} fontSize={200} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(1130 430) scale(${bang}) translate(-1130 -430)`}>!</text>
    </StoryShot>
  );
};

export const ShotDeclaration: React.FC = () => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [30, 35], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Singapore Ministry of Home Affairs" />}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <DeclarationForm x={960} y={520} />
      <StampMark x={1000} y={640} text="UNDER INVESTIGATION" show={show} size={64} rot={-8} />
    </ExplainShot>
  );
};

export const ShotPassport: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [4, 30], [-200, 690], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.05} overlay={<Source text="Source: Singapore Ministry of Home Affairs" />}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <Tray x={960} y={860} />
      <Passport x={960} y={y} rot={-6} scale={1.1} />
      <text x={960} y={160} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>held while she stays in Singapore</text>
      <text x={960} y={230} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">(she doesn't live there)</text>
    </ExplainShot>
  );
};

/** In public: the tower, quiet. */
export const ShotQuiet: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StoryShot from={1.04} to={1.08} originX={960} originY={600}
      lighting={<Lighting ambient="#2A3460" lights={[{ x: 950, y: 880, r: 360, ry: 140, color: "#FFE3A8", intensity: 1, glow: 0.3 }, { x: 960, y: 400, r: 520, ry: 500, color: "#B9CCF0", intensity: 0.55, glow: 0.1 }]} />}
      overlay={<div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontFamily: HAND_FONT, fontSize: 64, color: "#C9D4F0", opacity: (frame % 20) < 12 ? 0.9 : 0.4 }}>chirp… chirp…</div>}
    >
      <GlassTower />
    </StoryShot>
  );
};

/** The shipments keep rolling in. */
export const ShotRolling: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StoryShot from={1.0} to={1.06} originX={900} originY={760}
      lighting={<Lighting ambient="#2E3658" lights={[{ x: 960, y: 820, r: 900, ry: 260, color: "#FFE3A8", intensity: 0.9, glow: 0.15 }]} cones={[{ x: 960, y: 0, topW: 60, bottomW: 900, h: 880, color: "#FFF0C8", opacity: 0.1 }]} />}
    >
      <Port />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = ((frame * 7 + i * 260) % 2340) - 210;
        return <Crate key={i} x={x} y={880} label="SERVERS" scale={0.6} />;
      })}
    </StoryShot>
  );
};
