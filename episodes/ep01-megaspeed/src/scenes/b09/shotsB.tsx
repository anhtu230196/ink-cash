// Shots for B09b · THE EMPTY CHAIR, part 2 (voice/09b_the-empty-chair.mp3, lines b09_026…b09_046).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, Expression } from "../../../../../kit/Character";
import { ContactShadow, Grain, Lighting, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, NightSky, PaperWall, rnd } from "../open/sets";
import { Say } from "../b02/shots";
import { BigForm } from "../b03/sets";
import { ServerRack } from "../b04/sets";
import { Source } from "../b07/shots";
import { Chair } from "./shots";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** So did the wall leak? */
export const ShotLeak: React.FC = () => {
  const frame = useCurrentFrame();
  const q = usePop(10, 9);
  return (
    <ExplainShot from={1.0} to={1.05} originX={960} originY={500}>
      <Limbo color="#DCE3E8" floor="#C6D3DE" />
      <PaperWall x={560} y={240} w={800} h={660} />
      {[0, 1, 2].map((i) => {
        const t = ((frame * 0.03 + i * 0.33) % 1);
        return <path key={i} d={`M ${900 + i * 60} ${600 + t * 300} q -10 20 0 30 q 10 -10 0 -30`} fill="#5DA8FF" opacity={1 - t} />;
      })}
      <text x={1500} y={460} fontFamily={HAND_FONT} fontSize={240} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(1500 380) scale(${q}) translate(-1500 -380)`}>?</text>
    </ExplainShot>
  );
};

/** The cable goes over the wall. */
export const ShotOverWall: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const draw = interpolate(frame, [4, durationInFrames * 0.6], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const d = "M 1640 760 C 1500 300 1160 120 960 140 C 760 160 420 300 300 760";
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Sources: Fortune / The Information; Bloomberg" />}>
      <Limbo color="#E9E2D2" />
      <PaperWall x={860} y={300} w={200} h={600} />
      <text x={300} y={920} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#6B6458">CHINA</text>
      <text x={1640} y={920} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#6B6458">MALAYSIA</text>
      <ServerRack x={1640} y={860} scale={0.55} seed={3} />
      {[220, 360].map((x) => (
        <g key={x} transform={`translate(${x} 860)`}>
          <rect x={-70} y={-96} width={140} height={90} rx={8} fill="#2B2F36" stroke={INK} strokeWidth={5} />
          <rect x={-58} y={-84} width={116} height={66} fill="#7DC8FF" />
          <path d="M -90 0 L 90 0 L 76 -8 L -76 -8 Z" fill="#9AA0A6" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <path d={d} stroke={INK} strokeWidth={16} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} strokeLinecap="round" />
      <path d={d} stroke="#E1B83F" strokeWidth={8} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} strokeLinecap="round" />
      <text x={960} y={100} textAnchor="middle" fontFamily={HAND_FONT} fontSize={48} fill={INK} opacity={draw}>rented from afar (reported)</text>
    </ExplainShot>
  );
};

/** A steel vault door in the middle of an open field. */
export const ShotVaultField: React.FC = () => {
  const frame = useCurrentFrame();
  const walk = (frame * 4) % 1400;
  return (
    <ExplainShot from={1.0} to={1.05} bg="#BFE0F2">
      <rect width={1920} height={1080} fill="#BFE0F2" />
      <rect x={0} y={760} width={1920} height={320} fill="#8CC07A" />
      {Array.from({ length: 30 }).map((_, i) => <path key={i} d={`M ${rnd(i) * 1920} ${800 + rnd(i + 5) * 260} l 6 -18 l 6 18`} stroke="#5E9E4F" strokeWidth={4} fill="none" />)}
      {/* the vault door, standing alone */}
      <rect x={760} y={260} width={400} height={540} rx={20} fill="#9AA0A6" stroke={INK} strokeWidth={8} />
      <circle cx={960} cy={520} r={130} fill="#C9CDD2" stroke={INK} strokeWidth={8} />
      {[0, 60, 120].map((a) => <path key={a} d="M 960 400 L 960 640" stroke={INK} strokeWidth={10} transform={`rotate(${a} 960 520)`} />)}
      <circle cx={960} cy={520} r={30} fill="#7A8088" stroke={INK} strokeWidth={5} />
      {[300, 460, 620].map((y) => <rect key={y} x={730} y={y} width={40} height={50} rx={6} fill="#7A8088" stroke={INK} strokeWidth={4} />)}
      <rect x={830} y={190} width={260} height={56} rx={8} fill="#2D4A8A" stroke={INK} strokeWidth={4} />
      <text x={960} y={230} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#fff">EXPORT RULES</text>
      {/* someone strolls right around it */}
      <g transform={`translate(${-200 + walk} 0)`}>
        <path d={`M 0 820 Q 200 ${walk > 900 ? 860 : 880} 400 860`} stroke="#7A5A3B" strokeWidth={4} strokeDasharray="10 12" fill="none" opacity={0.6} />
      </g>
      <g transform={`translate(${-100 + walk} 900) scale(0.55)`}>
        <Character {...look("tech")} prop="tablet" x={0} y={0} expression="happy" arm="hold" lookX={14} />
      </g>
    </ExplainShot>
  );
};

/* ---------------- Skit: the empty CEO desk (Salesman + Official) ---------------- */
const SA = { x: 520, y: 1000 };
const OF = { x: 1500, y: 1000 };

const CeoOffice: React.FC<{ sm: number; om: number; se: Expression; oe: Expression; form?: number }> = ({ sm, om, se, oe, form = -1 }) => (
  <>
    <rect width={1920} height={1080} fill="#4A4E68" />
    <rect x={0} y={860} width={1920} height={220} fill="#5A4636" />
    <rect x={620} y={110} width={680} height={400} fill="#1C2142" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={640 + i * 72} y={510 - 120 - rnd(i + 30) * 220} width={56} height={120 + rnd(i + 30) * 220} fill="#2A3058" />)}
    <Chair x={960} y={900} scale={0.8} />
    <rect x={700} y={720} width={520} height={30} fill="#6B4A36" stroke={INK} strokeWidth={6} />
    <rect x={720} y={750} width={480} height={150} fill="#5A3E2B" stroke={INK} strokeWidth={6} />
    <rect x={860} y={680} width={200} height={40} rx={6} fill="#C9A35A" stroke={INK} strokeWidth={4} />
    <text x={960} y={710} textAnchor="middle" fontFamily={HAND_FONT} fontSize={28} fill="#2A1C10">CEO</text>
    <ContactShadow x={SA.x} y={SA.y + 2} w={190} opacity={0.4} />
    <Character {...look("salesman")} prop="none" x={SA.x} y={SA.y} expression={se} arm="point" mouth={sm} lookX={14} />
    <ContactShadow x={OF.x} y={OF.y + 2} w={190} opacity={0.4} />
    <Character {...look("official")} x={OF.x} y={OF.y} expression={oe} arm="hold" flip mouth={om} lookX={-14} />
    {form >= 0 && (
      <g transform={`translate(${interpolate(form, [0, 1], [OF.x - 200, 960])} ${interpolate(form, [0, 1], [OF.y - 380, 560])}) rotate(${interpolate(form, [0, 1], [20, -6])}) scale(${interpolate(form, [0, 1], [0.3, 0.55])})`}>
        <BigForm x={0} y={0} />
      </g>
    )}
  </>
);

const officeLights = (
  <Lighting
    ambient="#4A4E70"
    lights={[
      { x: SA.x, y: SA.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: OF.x, y: OF.y - 400, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 960, y: 560, r: 360, ry: 420, color: "#FFF0DC", intensity: 0.9, glow: 0.2 },
    ]}
  />
);

type OfficeLine = { line: string; who: "salesman" | "official"; text: string; se?: Expression; oe?: Expression; formDrop?: boolean };

export const ShotOfficeWide: React.FC<OfficeLine> = ({ line, who, text, se = "worried", oe = "neutral", formDrop }) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const isS = who === "salesman";
  const form = formDrop ? interpolate(frame, [20, 36], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : -1;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={officeLights} vignette={0.45}
      overlay={isS ? <Say text={text} tailX={SA.x + 60} tailY={360} y={90} /> : <Say text={text} tailX={OF.x - 60} tailY={360} y={90} />}
    >
      <CeoOffice sm={isS ? mouth : 0} om={isS ? 0 : mouth} se={se} oe={oe} form={form} />
    </StoryShot>
  );
};

export const ShotOfficeClose: React.FC<OfficeLine> = ({ line, who, text, se = "worried", oe = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isS = who === "salesman";
  const cx = isS ? SA.x + 80 : OF.x - 60;
  const cy = (isS ? SA.y : OF.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={isS ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><CeoOffice sm={isS ? mouth : 0} om={isS ? 0 : mouth} se={se} oe={oe} /></Stage>
          {officeLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isS ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- Who logged in? ---------------- */
export const ShotLogin: React.FC = () => {
  const frame = useCurrentFrame();
  const cursor = frame % 20 < 10;
  return (
    <StoryShot from={1.0} to={1.08} originX={960} originY={480} vignette={0.7}
      lighting={<Lighting ambient="#4A5078" lights={[{ x: 960, y: 460, r: 760, ry: 460, color: "#9BFFB0", intensity: 1, glow: 0.3 }]} />}
      overlay={<Source text="Still unanswered (Bloomberg)" />}
    >
      <rect width={1920} height={1080} fill="#2E344E" />
      {[160, 400, 1520, 1760].map((x, i) => <ServerRack key={x} x={x} y={1000} scale={0.9} seed={i + 40} />)}
      <rect x={560} y={200} width={800} height={520} rx={20} fill="#11141A" stroke={INK} strokeWidth={8} />
      <rect x={590} y={230} width={740} height={460} fill="#14182A" />
      <text x={960} y={330} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#9BFFB0">SERVER LOGIN</text>
      <text x={650} y={450} fontFamily={HAND_FONT} fontSize={46} fill="#C9D4F0">user:</text>
      <rect x={800} y={410} width={460} height={56} rx={6} fill="#20263D" />
      <text x={820} y={450} fontFamily={HAND_FONT} fontSize={46} fill={AMBER}>???{cursor ? "|" : ""}</text>
      <text x={650} y={560} fontFamily={HAND_FONT} fontSize={46} fill="#C9D4F0">from:</text>
      <rect x={800} y={520} width={460} height={56} rx={6} fill="#20263D" />
      <text x={820} y={560} fontFamily={HAND_FONT} fontSize={46} fill={AMBER}>???</text>
    </StoryShot>
  );
};

/* ---------------- What to watch next ---------------- */
const CalendarPage: React.FC<{ x: number; y: number; day?: string; title: string; sub?: string; scale?: number; mark?: string }> = ({ x, y, day, title, sub, scale = 1, mark }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-300} y={-330} width={600} height={660} rx={20} fill="#FBF7EE" stroke={INK} strokeWidth={8} />
    <rect x={-300} y={-330} width={600} height={130} rx={20} fill="#C0392B" stroke={INK} strokeWidth={8} />
    <text x={0} y={-238} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#fff" letterSpacing={8}>{day ? "NOV" : "WATCH"}</text>
    <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={day ? 220 : 120} fill={INK}>{day ?? "LIST"}</text>
    <text x={0} y={140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={46} fill={INK}>{title}</text>
    {sub && <text x={0} y={210} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#6B6458">{sub}</text>}
    {mark && <text x={230} y={-120} textAnchor="middle" fontFamily={HAND_FONT} fontSize={160} fill={AMBER} stroke={INK} strokeWidth={5}>{mark}</text>}
  </g>
);

export const ShotWatch: React.FC<{ day?: string; title: string; sub?: string; source?: string; mark?: string }> = ({ day, title, sub, source, mark }) => {
  const p = usePop(2, 12);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={source ? <Source text={source} /> : undefined}>
      <Limbo color="#E9E2D2" />
      <g transform={`translate(960 ${560 + (1 - p) * 60})`} opacity={p}><CalendarPage x={0} y={0} day={day} title={title} sub={sub} mark={mark} /></g>
    </ExplainShot>
  );
};

export const ShotSenate: React.FC = () => (
  <ExplainShot from={1.0} to={1.05} overlay={<Source text="Sources: House Select Committee on the CCP; Akin Gump" />}>
    <Limbo color="#DCE3E8" floor="#C9D2D8" />
    <rect x={460} y={700} width={1000} height={40} fill="#6B4A36" stroke={INK} strokeWidth={6} />
    <rect x={500} y={740} width={920} height={220} fill="#5A3E2B" stroke={INK} strokeWidth={6} />
    <text x={960} y={860} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#F6F1E7">U.S. SENATE</text>
    <g transform="translate(960 520) rotate(-3)">
      <rect x={-300} y={-180} width={600} height={360} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
      <text x={0} y={-100} textAnchor="middle" fontFamily={HAND_FONT} fontSize={42} fill={INK}>Remote Access</text>
      <text x={0} y={-46} textAnchor="middle" fontFamily={HAND_FONT} fontSize={42} fill={INK}>Security Act</text>
      <rect x={-140} y={20} width={280} height={80} rx={10} fill="none" stroke="#C0392B" strokeWidth={8} />
      <text x={0} y={76} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill="#C0392B">PENDING</text>
      <path d="M -300 -180 L -220 -100 M -300 -180 L -300 -80 M -300 -180 L -240 -130 M -270 -180 Q -264 -140 -300 -132" stroke="#9AA0A6" strokeWidth={3} fill="none" />
    </g>
  </ExplainShot>
);

export const ShotProbeOpen: React.FC = () => {
  const p = usePop(4, 12);
  const tabs = ["MEGASPEED", "PERSON 1", "PERSON 2", "PERSON 3", "PERSON 4", "PERSON 5", "PERSON 6"];
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Singapore Ministry of Home Affairs" />}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <g transform={`translate(960 560) scale(${0.9 + 0.1 * p})`}>
        <rect x={-460} y={-280} width={920} height={560} rx={12} fill="#C9A15B" stroke={INK} strokeWidth={8} />
        {tabs.map((t, i) => (
          <g key={t}>
            <rect x={-440 + i * 126} y={-340} width={118} height={70} rx={8} fill={i === 0 ? "#2D4A8A" : "#E9DDC4"} stroke={INK} strokeWidth={4} />
            <text x={-381 + i * 126} y={-296} textAnchor="middle" fontFamily={HAND_FONT} fontSize={20} fill={i === 0 ? "#fff" : INK}>{t}</text>
          </g>
        ))}
        <text x={0} y={-60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill={INK}>SINGAPORE PROBE</text>
        <rect x={-200} y={20} width={400} height={130} rx={14} fill="none" stroke="#3E8E3F" strokeWidth={10} />
        <text x={0} y={110} textAnchor="middle" fontFamily={HAND_FONT} fontSize={86} fill="#3E8E3F">OPEN</text>
      </g>
    </ExplainShot>
  );
};

/* ---------------- The last shot: green lights across the ocean ---------------- */
export const ShotBlinking: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fade = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: "#000", opacity: fade }}>
      <StoryShot from={1.0} to={1.1} originX={960} originY={700} vignette={0.75}
        lighting={<Lighting ambient="#3A4470" lights={[{ x: 960, y: 580, r: 1100, ry: 260, color: "#7DFFB0", intensity: 1, glow: 0.5 }]} />}
      >
        <NightSky h={1080} />
        <rect x={0} y={560} width={1920} height={520} fill="#0E1630" />
        {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M ${rnd(i) * 1700} ${620 + i * 50} q 30 -8 60 0 q 30 8 60 0`} stroke="#2A3A66" strokeWidth={4} fill="none" />)}
        {/* the far shore: rows of tiny green lights */}
        <rect x={0} y={520} width={1920} height={60} fill="#0A0E1E" />
        {Array.from({ length: 160 }).map((_, i) => {
          const on = rnd(i * 7 + Math.floor((frame + i * 3) / 9)) > 0.3;
          return <circle key={i} cx={20 + (i % 80) * 24} cy={536 + Math.floor(i / 80) * 22} r={6} fill={on ? "#9BFFC0" : "#1E3A2A"} />;
        })}
        {Array.from({ length: 160 }).map((_, i) => {
          const on = rnd(i * 5 + 3 + Math.floor((frame + i * 2) / 9)) > 0.3;
          return <circle key={`r${i}`} cx={20 + (i % 80) * 24} cy={600 + Math.floor(i / 80) * 30 + Math.sin(frame / 10 + i) * 2} r={3} fill={on ? "#7DFFB0" : "#123020"} opacity={0.35} />;
        })}
      </StoryShot>
    </AbsoluteFill>
  );
};
