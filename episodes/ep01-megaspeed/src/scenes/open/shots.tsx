// The 16 shots of B01 · OPEN. Each component fills its own <Sequence>; frame 0 = shot start.
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Grain, Lighting, LowerThird, PlaceTag, Rim, Vignette, Whip } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { Camera, SpeechBubble, Stage } from "../../../../../kit/ui";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import {
  BrickAlley, Box, CaseFile, Corridor, Diner, HQExterior, Limbo, NightOffice, NumberBack, PaperWall, TopDownDesk, Warehouse, WantedPoster, WIN, rnd, s,
} from "./sets";

import { AMBER, EP, ExplainShot, StoryShot, look, usePop } from "../common";

/* 2 · HQ at night ------------------------------------------------------- */
export const ShotHQ: React.FC = () => {
  const j = look("jensen");
  const frame = useCurrentFrame();
  const walk = interpolate(frame, [0, 70], [0, 40], { extrapolateRight: "clamp" });
  const x = 960 + walk;
  const y = 860;
  const sc = 0.42;
  return (
    <StoryShot
      from={1.0} to={1.08} originX={960} originY={700}
      lighting={
        <Lighting
          ambient="#2A3460"
          lights={[
            { x: 960, y: 680, r: 40, rect: { w: 160, h: 160 }, color: "#FFE3A8", intensity: 1, glow: 0.45 },
            { x: 960, y: 270, r: 30, rect: { w: 400, h: 64 }, color: "#C9FF9A", intensity: 1, glow: 0.35 },
            { x, y: y - 350 * sc, r: 130, color: "#FFE9CC", intensity: 0.95, glow: 0 },
            { x: 960, y: 900, r: 380, ry: 140, color: "#FFDFA8", intensity: 0.75, glow: 0 },
            { x: 420, y: 650, r: 240, color: "#FFF0C0", intensity: 0.8, glow: 0.35 },
            { x: 1500, y: 650, r: 240, color: "#FFF0C0", intensity: 0.8, glow: 0.35 },
            { x: 960, y: 470, r: 900, ry: 300, color: "#8FA3D9", intensity: 0.35, glow: 0 },
          ]}
          cones={[{ x: 420, y: 650, topW: 40, bottomW: 300, h: 350, opacity: 0.22 }, { x: 1500, y: 650, topW: 40, bottomW: 300, h: 350, opacity: 0.22 }]}
        />
      }
      overlay={<><DateTag text="Nov 12, 2026" delay={2} /><PlaceTag text="Santa Clara, Calif." delay={6} /></>}
    >
      <HQExterior />
      <ContactShadow x={x} y={y} w={90} />
      <Rim x={960} y={700} color="#FFD9A0" strength={1.1} width={5}>
        <g>
          <Character {...j} x={x} y={y} scale={sc} expression="sad" arm="down" prop="none" />
          <Box x={x} y={y + 18} scale={sc} />
        </g>
      </Rim>
    </StoryShot>
  );
};

/* 3 · Jensen in his office with the box --------------------------------- */
export const ShotOffice: React.FC = () => {
  const j = look("jensen");
  const cx = 1040;
  const cy = 1000;
  const sc = 1.12;
  return (
    <Whip inFrames={6} outFrames={0}>
      <StoryShot
        originX={1000} originY={560}
        lighting={
          <Lighting
            ambient="#3D3B66"
            lights={[
              { x: cx - 70, y: cy - 400, r: 300, color: "#FFE9CC", intensity: 0.9, glow: 0 },
              { x: 770, y: 620, r: 470, ry: 330, color: "#FFDFA8", intensity: 1, glow: 0.32, flicker: 0.015 },
              { x: 500, y: 515, r: 80, rect: { w: 240, h: 170 }, color: "#C4FFBE", intensity: 0.95, glow: 0.28 },
              { x: WIN.x + WIN.w / 2, y: WIN.y + WIN.h / 2, r: 60, rect: { w: WIN.w, h: WIN.h }, color: "#D5DEFF", intensity: 0.95, glow: 0.1 },
              { x: 1400, y: 930, r: 560, ry: 150, color: "#AEBBFF", intensity: 0.5, glow: 0 },
            ]}
            cones={[{ x: 786, y: 540, topW: 50, bottomW: 330, h: 110, color: "#FFE3B8", opacity: 0.3 }]}
          />
        }
        overlay={<LowerThird name="Jensen Huang" role="Nvidia co-founder · CEO since 1993" accent={AMBER} x={1180} y={840} delay={10} />}
      >
        <NightOffice />
        <ContactShadow x={cx} y={cy - 2} w={190} />
        <Rim x={1560} y={360} color="#B9C8FF" strength={0.7} width={7}>
          <Rim x={700} y={600} color="#FFD9A0" strength={1.2} width={9}>
            <g>
              <Character {...j} x={cx} y={cy} scale={sc} expression="sad" arm="down" lookX={-6} prop="none" />
              <Box x={cx} y={cy + 44} scale={sc} />
            </g>
          </Rim>
        </Rim>
      </StoryShot>
    </Whip>
  );
};

/* 4 · 33 years, ended ---------------------------------------------------- */
export const ShotThirtyThree: React.FC<{ stampAt: number }> = ({ stampAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.round(interpolate(frame, [0, 34], [0, 33], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const year = Math.round(interpolate(frame, [0, 34], [1993, 2026], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const sf = Math.round(stampAt * fps);
  const stamp = spring({ frame: frame - sf, fps, config: { damping: 14, stiffness: 260 } });
  const shake = frame >= sf && frame < sf + 8 ? Math.sin((frame - sf) * 3) * (8 - (frame - sf)) * 2 : 0;
  return (
    <AbsoluteFill style={{ background: "#000", transform: `translateX(${shake}px)` }}>
      <Camera from={1} to={1.05}>
        <Stage><NumberBack /></Stage>
      </Camera>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT, color: "#fff", opacity: 1 - 0.55 * Math.min(1, stamp), transform: `translateY(${-60 * Math.min(1, stamp)}px)` }}>
        <div style={{ fontSize: 340, lineHeight: 0.9, color: AMBER }}>{n}</div>
        <div style={{ fontSize: 70, letterSpacing: 4 }}>YEARS AS NVIDIA'S BOSS</div>
        <div style={{ fontSize: 48, opacity: 0.7, marginTop: 10 }}>1993 – {year}</div>
      </AbsoluteFill>
      {frame >= sf && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 300 }}>
          <div style={{
            fontFamily: HAND_FONT, fontSize: 210, color: "#E0453A", border: "14px solid #E0453A", borderRadius: 20, padding: "0 50px",
            transform: `rotate(-12deg) scale(${3 - 2 * stamp})`, opacity: Math.min(1, stamp * 1.5), letterSpacing: 10, background: "rgba(0,0,0,0.25)",
          }}>ENDED</div>
        </AbsoluteFill>
      )}
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

/* 5 · Top-down: the case file slides in --------------------------------- */
export const ShotCaseFile: React.FC = () => {
  const slide = usePop(2, 16);
  return (
    <StoryShot
      from={1.0} to={1.06}
      lighting={
        <Lighting
          ambient="#3B2E2A"
          lights={[
            { x: 960, y: 520, r: 620, ry: 460, color: "#FFDFA8", intensity: 1, glow: 0.18, flicker: 0.01 },
            { x: 300, y: 300, r: 300, color: "#FFE9CC", intensity: 0.5, glow: 0 },
          ]}
        />
      }
    >
      <TopDownDesk />
      <CaseFile x={980} y={540 + (1 - slide) * 700} rot={-6 + (1 - slide) * 20} />
    </StoryShot>
  );
};

/* 6 · A woman in a dark corridor, silhouette + reported label ----------- */
export const ShotSilhouette: React.FC<{ noteAt: number }> = ({ noteAt }) => {
  const a = look("alice");
  const { fps } = useVideoConfig();
  const note = usePop(Math.round(noteAt * fps), 13);
  return (
    <StoryShot
      from={1.0} to={1.09} originX={960} originY={520}
      lighting={
        <Lighting
          ambient="#141826"
          lights={[
            { x: 960, y: 545, r: 90, rect: { w: 520, h: 430 }, color: "#D8E4FF", intensity: 1, glow: 0.45 },
            { x: 960, y: 310, r: 120, color: "#E8F0FF", intensity: 1, glow: 0.5 },
            { x: 960, y: 900, r: 420, ry: 120, color: "#9FB3E8", intensity: 0.5, glow: 0 },
          ]}
          cones={[{ x: 960, y: 314, topW: 120, bottomW: 600, h: 460, color: "#DCE6FF", opacity: 0.22 }]}
        />
      }
      overlay={
        <div style={{
          position: "absolute", left: 1250, top: 170, width: 520, padding: "26px 30px", background: "#F5D547", border: `5px solid ${INK}`, borderRadius: 6,
          fontFamily: HAND_FONT, color: INK, transform: `rotate(3deg) scale(${note})`, transformOrigin: "top left", boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
        }}>
          <div style={{ fontSize: 76, lineHeight: 1 }}>“Chinese asset”</div>
          <div style={{ fontSize: 34, marginTop: 12 }}>— what U.S. officials reportedly call her</div>
        </div>
      }
    >
      <defs>
        <filter id="openSilhouette" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.06  0 0 0 0 0.09  0 0 0 1 0" />
        </filter>
      </defs>
      <Corridor />
      <ContactShadow x={960} y={902} w={200} opacity={0.6} />
      <Rim x={960} y={430} color="#CFE0FF" strength={1.8} width={7}>
        <g filter="url(#openSilhouette)">
          <Character {...a} x={960} y={900} scale={1.05} expression="neutral" arm="down" prop="none" />
        </g>
      </Rim>
    </StoryShot>
  );
};

/* 8 · Skit: salesman asks about the wall ------------------------------- */
const SkitStage: React.FC<{ salesMouth: number; officialMouth: number }> = ({ salesMouth, officialMouth }) => (
  <>
    <Limbo />
    <PaperWall x={330} y={250} w={1260} h={520} />
    <ContactShadow x={640} y={962} w={200} opacity={0.3} />
    <ContactShadow x={1290} y={962} w={200} opacity={0.3} />
    {/* glow behind the server box */}
    <ellipse cx={720} cy={790} rx={120} ry={90} fill="#C9FF9A" opacity={0.45} />
    <Character {...look("salesman")} x={640} y={960} expression="happy" arm="hold" mouth={salesMouth} lookX={8} />
    <Character {...look("official")} x={1290} y={960} expression="neutral" arm="hold" mouth={officialMouth} lookX={-8} />
  </>
);

export const ShotSkitAsk: React.FC = () => {
  const mouth = useMouth(audioFile(EP, "b01_005"));
  return (
    <ExplainShot overlay={<SpeechBubble x={90} y={300} w={540} text="Did the wall work?" tailX={600} tailY={500} delay={2} />}>
      <SkitStage salesMouth={mouth} officialMouth={0} />
    </ExplainShot>
  );
};

/* 9 · Push in on the official: "Define… work." -------------------------- */
export const ShotSkitDefine: React.FC = () => {
  const mouth = useMouth(audioFile(EP, "b01_006"));
  return (
    <AbsoluteFill style={{ background: "#EDE6D6" }}>
      <AbsoluteFill style={{ transform: "translate(-330px, -40px) scale(1.8)", transformOrigin: "1290px 580px" }}>
        <Camera from={1} to={1.03} originX={1290} originY={600}>
          <Stage><SkitStage salesMouth={0} officialMouth={mouth} /></Stage>
        </Camera>
      </AbsoluteFill>
      <Vignette strength={0.3} />
      <Grain opacity={0.05} />
      <SpeechBubble x={110} y={150} w={620} text={"Define… “work.”"} tailX={790} tailY={420} delay={2} />
    </AbsoluteFill>
  );
};

/* 10 · Two big questions ------------------------------------------------ */
const QuestionCard: React.FC<{ x: number; n: string; title: string; pop: number; icon: React.ReactNode }> = ({ x, n, title, pop, icon }) => (
  <g transform={`translate(${x} ${560 - (1 - pop) * 700}) rotate(${(1 - pop) * 14})`}>
    <rect x={-300} y={-300} width={600} height={560} rx={28} fill="#fff" {...s} />
    <circle cx={-250} cy={-250} r={58} fill={AMBER} {...s} />
    <text x={-250} y={-228} textAnchor="middle" fontFamily={HAND_FONT} fontSize={72} fill={INK}>{n}</text>
    <g transform="translate(0 -60)">{icon}</g>
    <text x={0} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={92} fill={INK}>{title}</text>
  </g>
);

export const ShotTwoQuestions: React.FC = () => {
  const a = usePop(3, 12);
  const b = usePop(14, 12);
  return (
    <ExplainShot>
      <Limbo />
      <QuestionCard x={620} n="1" title="HOW?" pop={a} icon={
        <g>
          <rect x={-110} y={-80} width={220} height={150} fill="#C79A63" {...s} strokeWidth={5} />
          <g transform="translate(0 -5) scale(1.6)"><MiniChip size={50} /></g>
          <text x={150} y={20} fontFamily={HAND_FONT} fontSize={120} fill={INK}>?</text>
        </g>
      } />
      <QuestionCard x={1300} n="2" title="LEAK?" pop={b} icon={
        <g>
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={-150 + c * 100 - (r % 2) * 50} y={-90 + r * 56} width={100} height={56} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
          )))}
          <ellipse cx={40} cy={-10} rx={26} ry={18} fill="#1B1B1B" stroke={INK} strokeWidth={4} />
          <path d="M 70 0 q 30 10 40 60" stroke="#5DB35F" strokeWidth={14} fill="none" strokeLinecap="round" />
        </g>
      } />
    </ExplainShot>
  );
};

/* 11 · $7.5 billion -------------------------------------------------------- */
export const ShotBigMoney: React.FC<{ numberAt: number }> = ({ numberAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = usePop(Math.round(numberAt * fps), 9);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Camera from={1} to={1.06}>
        <Stage>
          <NumberBack />
          {Array.from({ length: 26 }).map((_, i) => {
            const y = ((frame * (3 + rnd(i) * 3) + rnd(i + 5) * 1200) % 1300) - 120;
            return <g key={i} opacity={0.35} transform={`translate(${rnd(i + 2) * 1920} ${y}) rotate(${frame * (rnd(i) - 0.5) * 4}) scale(${0.6 + rnd(i + 7)})`}><MiniChip size={46} /></g>;
          })}
        </Stage>
      </Camera>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT }}>
        <div style={{ fontSize: 250, color: AMBER, transform: `scale(${p})`, lineHeight: 1, textShadow: "0 0 40px rgba(242,181,68,0.45)" }}>$7.5 BILLION</div>
        <div style={{ fontSize: 66, color: "#fff", opacity: p, marginTop: 10, letterSpacing: 3 }}>of Nvidia chips</div>
      </AbsoluteFill>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

/* 12 · A GPU rides a conveyor into a question mark --------------------- */
export const ShotConveyor: React.FC = () => {
  const frame = useCurrentFrame();
  const belt = (frame * 7) % 260;
  const gx = 520 + frame * 6;
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo />
      {/* question-mark doorway */}
      <rect x={1520} y={260} width={330} height={540} rx={20} fill="#2A2F3A" {...s} />
      <text x={1685} y={650} textAnchor="middle" fontFamily={HAND_FONT} fontSize={380} fill={AMBER}>?</text>
      {/* belt */}
      <rect x={0} y={800} width={1560} height={44} rx={22} fill="#5A6066" {...s} />
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={(i * 120 + belt / 2) % 1560} cy={822} r={12} fill="#9AA0A6" stroke={INK} strokeWidth={3} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => {
        const bx = ((i * 260 + belt) % 2080) - 260;
        if (bx > 1480) return null;
        return (
          <g key={i}>
            <rect x={bx} y={640} width={200} height={160} fill="#C79A63" {...s} strokeWidth={5} />
            <rect x={bx + 50} y={700} width={100} height={44} fill="#F6F1E7" stroke={INK} strokeWidth={3} />
            <text x={bx + 100} y={732} textAnchor="middle" fontFamily={HAND_FONT} fontSize={28} fill={INK}>GPU</text>
          </g>
        );
      })}
      <GpuCharacter x={gx} y={640} scale={0.75} expression="worried" arm="shrug" />
    </ExplainShot>
  );
};

/* 13 · Did the wall leak? --------------------------------------------------- */
export const ShotLeakyWall: React.FC = () => {
  const frame = useCurrentFrame();
  const crack = interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const worried = frame > 50;
  return (
    <Whip inFrames={6} outFrames={0} dir={-1}>
      <ExplainShot from={1.0} to={1.06} originX={1000} originY={600}>
        <Limbo />
        <PaperWall x={200} y={200} w={1150} h={600} crack={crack} />
        <ContactShadow x={1600} y={962} w={200} opacity={0.3} />
        <Character {...look("unclesam")} x={1600} y={960} expression={worried ? "worried" : "smug"} arm={worried ? "shrug" : "hold"} lookX={-14} />
      </ExplainShot>
    </Whip>
  );
};

/* 14 · Wanted: 240,000 chips ------------------------------------------- */
export const ShotWanted: React.FC = () => {
  const p = usePop(0, 10);
  return (
    <StoryShot
      from={1.0} to={1.08} originX={960} originY={430}
      lighting={
        <Lighting
          ambient="#2B2440"
          lights={[
            { x: 960, y: 420, r: 520, ry: 560, color: "#FFE3A8", intensity: 1, glow: 0.25, flicker: 0.02 },
            { x: 1700, y: 300, r: 260, color: "#8FA3D9", intensity: 0.4, glow: 0 },
          ]}
          cones={[{ x: 960, y: 0, topW: 160, bottomW: 900, h: 950, opacity: 0.18 }]}
        />
      }
    >
      <BrickAlley />
      <g transform={`translate(960 470) scale(${0.6 + 0.4 * p}) translate(-960 -470)`} opacity={Math.min(1, p * 2)}>
        <WantedPoster x={960} y={470} />
      </g>
    </StoryShot>
  );
};

/* 15 · Warehouse, flashlight sweep ------------------------------------- */
export const ShotWarehouse: React.FC = () => {
  const frame = useCurrentFrame();
  const fx = interpolate(frame, [0, 90], [260, 1500], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
  const fy = 640 + Math.sin(frame / 9) * 30;
  return (
    <StoryShot
      from={1.04} to={1.0} originX={960} originY={600}
      lighting={
        <Lighting
          ambient="#1E2742"
          lights={[
            { x: fx, y: fy, r: 260, ry: 220, color: "#FFF4DC", intensity: 1, glow: 0.35 },
            { x: 1300, y: 560, r: 160, color: "#9BFF8A", intensity: 0.85, glow: 0.4, flicker: 0.05 },
            { x: 960, y: 140, r: 700, ry: 160, color: "#5C6FA8", intensity: 0.35, glow: 0 },
          ]}
        />
      }
      overlay={<PlaceTag text="Location: unknown" delay={8} />}
    >
      <Warehouse />
    </StoryShot>
  );
};

/* 16 · The diner booth ------------------------------------------------- */
export const ShotDiner: React.FC = () => (
  <Whip inFrames={6} outFrames={0}>
    <StoryShot
      from={1.0} to={1.07} originX={1000} originY={640}
      lighting={
        <Lighting
          ambient="#4A2E2E"
          lights={[
            { x: 960, y: 640, r: 520, ry: 380, color: "#FFD08A", intensity: 1, glow: 0.3, flicker: 0.02 },
            { x: 690, y: 330, r: 60, rect: { w: 520, h: 160 }, color: "#FF8FA0", intensity: 0.9, glow: 0.45, flicker: 0.08 },
            { x: 1230, y: 330, r: 50, rect: { w: 260, h: 120 }, color: "#9FE8FF", intensity: 0.8, glow: 0.35, flicker: 0.04 },
            { x: 1055, y: 640, r: 160, color: "#FFF0D0", intensity: 0.9, glow: 0.15 },
          ]}
          cones={[{ x: 960, y: 422, topW: 160, bottomW: 760, h: 300, color: "#FFE3B8", opacity: 0.26 }]}
        />
      }
    >
      <Diner />
    </StoryShot>
  </Whip>
);
