// Shots for B07b · WHAT THEY ALLEGEDLY WANTED, part 2 (voice/07b_what-they-allegedly-wanted.mp3, lines b07_023…b07_050).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Character, CharacterLook, Expression, GpuCharacter } from "../../../../../kit/Character";
import { DateTag, Grain, Lighting, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, rnd } from "../open/sets";
import { Say } from "../b02/shots";
import { Pie, Podium } from "../b02/setsB";
import { StampMark } from "../b03/sets";
import { Magnifier } from "../b04/sets";
import { BoardTable, Boardroom } from "../b05/sets";
import { Passport } from "../b05/setsB";
import { Newspaper } from "../b06/sets";
import { MemoPage } from "./sets";
import { Source } from "./shots";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- Goal two (alleged) ---------------- */
export const ShotGoalTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [6, 70], [520, 900], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<><div style={{ position: "absolute", left: 70, top: 60, fontFamily: HAND_FONT, fontSize: 64, color: "#fff", background: "#C0392B", padding: "4px 26px", borderRadius: 10 }}>GOAL 2 (alleged)</div><Source text="Source: The New York Times" /></>}>
      <Limbo />
      <path d="M 640 860 L 1500 860" stroke={INK} strokeWidth={12} strokeDasharray="34 22" />
      <path d="M 1480 820 L 1530 860 L 1480 900" stroke={INK} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={1640} y={880} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill="#6B6458">CHINA</text>
      {/* a hand nudging the chip along */}
      <g transform={`translate(${x - 250} 760)`}>
        <path d="M -400 0 L -40 0" stroke={INK} strokeWidth={70} strokeLinecap="round" />
        <path d="M -400 0 L -40 0" stroke="#2E3A57" strokeWidth={56} strokeLinecap="round" />
        <circle cx={0} cy={0} r={46} fill="#F1D3B0" stroke={INK} strokeWidth={6} />
      </g>
      <GpuCharacter x={x} y={860} scale={0.8} label="NVIDIA" expression="worried" arm="down" />
    </ExplainShot>
  );
};

/* ---------------- Pause right here ---------------- */
export const ShotPause: React.FC<{ rows: string[] }> = ({ rows }) => {
  const p = usePop(2, 12);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: "grayscale(1) brightness(0.55)" }}>
        <ExplainShot from={1.0} to={1.0}>
          <Limbo color="#E9E2D2" />
          <MemoPage x={960} y={520} rows={rows} title="ALLEGED" />
        </ExplainShot>
      </AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(960 540) scale(${p})`}>
          <circle r={180} fill="rgba(0,0,0,0.55)" stroke="#fff" strokeWidth={10} />
          <rect x={-70} y={-90} width={46} height={180} rx={10} fill="#fff" />
          <rect x={24} y={-90} width={46} height={180} rx={10} fill="#fff" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

const LAWYER = (color: string, hair: CharacterLook["hair"], hairColor: string): CharacterLook => ({ outfit: "suit", color, tie: "#C9A35A", hair, hairColor, glasses: true, prop: "briefcase" });

/** Lawyers, this is your favorite part. */
export const ShotLawyers: React.FC = () => {
  const frame = useCurrentFrame();
  const bob = Math.abs(Math.sin(frame / 5)) * 8;
  return (
    <ExplainShot from={1.0} to={1.05} bg="#E9DDC4">
      <rect width={1920} height={1080} fill="#E9DDC4" />
      <rect x={0} y={880} width={1920} height={200} fill="#8A5A3B" />
      {/* bookshelf of law books */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={160} y={200 + r * 200} width={1600} height={18} fill="#6B4A36" />
          {Array.from({ length: 30 }).map((_, i) => (
            <rect key={i} x={170 + i * 53} y={80 + r * 200} width={44} height={120} fill={["#7A2E3A", "#2E3A57", "#3E6B4F", "#8A6A45"][(i + r) % 4]} stroke={INK} strokeWidth={3} />
          ))}
        </g>
      ))}
      {[{ x: 560, c: "#2B2F36", h: "slick" as const, hc: "#1F1F1F" }, { x: 960, c: "#4A4E58", h: "bob" as const, hc: "#C9A15B" }, { x: 1360, c: "#3A3F44", h: "bald" as const, hc: "#7A6A5A" }].map((l, i) => (
        <Character key={i} {...LAWYER(l.c, l.h, l.hc)} x={l.x} y={1000 - (i === 1 ? bob : 0)} expression="smug" arm={i === 1 ? "wave" : "hold"} lookX={0} />
      ))}
    </ExplainShot>
  );
};

/** The fine print. */
export const ShotFinePrint: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = interpolate(frame, [4, 50], [1400, 1060], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <StoryShot from={1.0} to={1.1} originX={1000} originY={820}
      lighting={<Lighting ambient="#4A4560" lights={[{ x: 1000, y: 820, r: 380, ry: 220, color: "#FFF0C8", intensity: 1, glow: 0.2 }, { x: 960, y: 400, r: 800, ry: 400, color: "#DDE6FF", intensity: 0.5, glow: 0 }]} />}
    >
      <rect width={1920} height={1080} fill="#6A5446" />
      <Newspaper x={960} y={520} scale={0.95} headline="SECRET MEMO!" />
      <Magnifier x={mx} y={830} scale={1.3} rot={-30} />
    </StoryShot>
  );
};

/* ---------------- The fine print, item by item ---------------- */
const FineCard: React.FC<{ n: number; title: string; sub?: string; children?: React.ReactNode }> = ({ n, title, sub, children }) => {
  const p = usePop(2, 12);
  return (
    <g>
      <Limbo color="#F6F1E7" floor="#E8E0CE" />
      <g transform={`translate(0 ${(1 - p) * 40})`} opacity={p}>
        <text x={160} y={170} fontFamily={HAND_FONT} fontSize={50} fill="#6B6458" letterSpacing={4}>FINE PRINT #{n}</text>
        <text x={160} y={260} fontFamily={HAND_FONT} fontSize={72} fill={INK}>{title}</text>
        {sub && <text x={160} y={330} fontFamily={HAND_FONT} fontSize={46} fill="#6B6458">{sub}</text>}
      </g>
      {children}
    </g>
  );
};

export const ShotFine1: React.FC = () => (
  <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: The New York Times" />}>
    <FineCard n={1} title="US officials don't believe Jensen knew" sub="about any spying">
      <Character {...look("jensen")} prop="none" x={1500} y={1000} expression="neutral" arm="down" flip lookX={-10} />
    </FineCard>
  </ExplainShot>
);

export const ShotFine2: React.FC = () => {
  const p = usePop(10, 10);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: TechCrunch (China's response)" />}>
      <FineCard n={2} title="Beijing: the spy claims are false">
        <g transform="translate(1300 1000)">
          <path d="M -170 0 L 170 0 L 140 -300 L -140 -300 Z" fill="#7A2E3A" stroke={INK} strokeWidth={6} />
          <rect x={-190} y={-326} width={380} height={34} rx={6} fill="#5A3E2B" stroke={INK} strokeWidth={6} />
          {[-60, 0, 60].map((dx) => <path key={dx} d={`M ${dx} -326 L ${dx * 1.2} -420`} stroke="#3A3F44" strokeWidth={6} />)}
          {[-60, 0, 60].map((dx) => <ellipse key={`m${dx}`} cx={dx * 1.2} cy={-430} rx={14} ry={18} fill="#3A3F44" stroke={INK} strokeWidth={3} />)}
          <g transform={`translate(0 -560) scale(${p})`}>
            <rect x={-200} y={-60} width={400} height={120} rx={14} fill="#C0392B" stroke={INK} strokeWidth={6} />
            <text x={0} y={22} textAnchor="middle" fontFamily={HAND_FONT} fontSize={72} fill="#fff" letterSpacing={6}>FALSE</text>
          </g>
        </g>
      </FineCard>
    </ExplainShot>
  );
};

export const ShotFine3: React.FC = () => (
  <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Singapore Ministry of Home Affairs" />}>
    <FineCard n={3} title="Singapore: we never investigated her" sub="for espionage">
      <g transform="translate(1340 720) rotate(-3)">
        <rect x={-300} y={-220} width={600} height={440} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
        <text x={0} y={-150} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>INVESTIGATION SCOPE</text>
        {[["server declarations", true], ["espionage", false]].map(([k, v], i) => (
          <g key={String(k)}>
            <rect x={-250} y={-90 + i * 120} width={70} height={70} rx={8} fill="#fff" stroke={INK} strokeWidth={5} />
            {v ? <path d={`M -238 ${-56 + i * 120} l 18 20 l 36 -42`} stroke="#3E8E3F" strokeWidth={10} fill="none" strokeLinecap="round" /> : <path d={`M -236 ${-76 + i * 120} l 42 42 M -194 ${-76 + i * 120} l -42 42`} stroke="#C0392B" strokeWidth={10} strokeLinecap="round" />}
            <text x={-150} y={-40 + i * 120} fontFamily={HAND_FONT} fontSize={44} fill={INK}>{String(k)}</text>
          </g>
        ))}
      </g>
    </FineCard>
  </ExplainShot>
);

export const ShotFine4: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [6, 30], [0, -14], { ...clamp, easing: Easing.out(Easing.back(2)) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Singapore Ministry of Home Affairs" />}>
      <FineCard n={4} title="Police: insufficient evidence to charge">
        <g transform="translate(1300 960)">
          <path d="M -120 0 L 120 0 L 20 -40 L -20 -40 Z" fill="#C9A35A" stroke={INK} strokeWidth={5} />
          <path d="M 0 -40 L 0 -500" stroke={INK} strokeWidth={14} />
          <g transform={`translate(0 -500) rotate(${tilt})`}>
            <path d="M -320 0 L 320 0" stroke={INK} strokeWidth={12} />
            {[-320, 320].map((px, i) => (
              <g key={px} transform={`translate(${px} 0) rotate(${-tilt})`}>
                <path d="M -90 180 L 0 0 L 90 180" stroke={INK} strokeWidth={4} fill="none" />
                <path d="M -110 180 Q 0 250 110 180 Z" fill="#C9CDD2" stroke={INK} strokeWidth={5} />
                <text x={0} y={290} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>{i === 0 ? "needed" : "evidence"}</text>
                {i === 0 && <rect x={-60} y={110} width={120} height={70} fill="#5C7A99" stroke={INK} strokeWidth={4} />}
                {i === 1 && <rect x={-20} y={150} width={40} height={30} fill="#FBF7EE" stroke={INK} strokeWidth={3} />}
              </g>
            ))}
          </g>
        </g>
      </FineCard>
    </ExplainShot>
  );
};

export const ShotFine5: React.FC = () => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [16, 21], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: WION, citing Singapore police" />}>
      <FineCard n={5} title="But: barred from re-entering Singapore">
        <Passport x={1300} y={700} scale={1.4} rot={-4} />
        <StampMark x={1300} y={700} text="ENTRY BARRED" show={show} size={66} rot={-14} />
      </FineCard>
    </ExplainShot>
  );
};

export const ShotFine6: React.FC = () => {
  const frame = useCurrentFrame();
  const shrink = interpolate(frame, [10, 40], [1.4, 0.8], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: WION, citing Singapore police" />}>
      <FineCard n={6} title="Police: she knowingly downplayed" sub="her role at Megaspeed">
        <g transform="translate(1300 720)">
          <rect x={-150} y={-240} width={300} height={90} rx={10} fill="#2D4A8A" stroke={INK} strokeWidth={5} />
          <text x={0} y={-182} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#fff">MEGASPEED</text>
          <path d="M 0 -150 L 0 -60" stroke={INK} strokeWidth={6} />
          <g transform={`translate(0 20) scale(${shrink})`}>
            <rect x={-170} y={-80} width={340} height={160} rx={12} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
            <text x={0} y={-10} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>Alice Huang</text>
            <text x={0} y={46} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#6B6458">her role</text>
          </g>
        </g>
      </FineCard>
    </ExplainShot>
  );
};

export const ShotFine7: React.FC = () => {
  const p = usePop(8, 11);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Source: Singapore MHA; no charges reported anywhere" />}>
      <FineCard n={7} title="No country has charged her">
        <g transform={`translate(1300 700) scale(${p})`}>
          <circle r={240} fill="#5B9BD5" stroke={INK} strokeWidth={8} />
          <path d="M -150 -120 Q -60 -180 20 -110 Q 80 -60 40 0 Q -40 40 -120 -20 Z M 60 60 Q 140 30 180 100 Q 120 180 60 140 Z" fill="#9CCB7A" stroke={INK} strokeWidth={5} />
          <rect x={-180} y={170} width={360} height={110} rx={16} fill={INK} />
          <text x={0} y={244} textAnchor="middle" fontFamily={HAND_FONT} fontSize={62} fill="#fff">charges: 0</text>
        </g>
      </FineCard>
    </ExplainShot>
  );
};

/* ---------------- Skit: Hawk vs Industry at podiums ---------------- */
const HK = { x: 520, y: 1010 };
const IN = { x: 1400, y: 1010 };

const DebateStage: React.FC<{ hm: number; im: number; he: Expression; ie: Expression }> = ({ hm, im, he, ie }) => (
  <>
    <rect width={1920} height={1080} fill="#1E2846" />
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={i * 80} y={0} width={40} height={1080} fill="#22305A" opacity={0.5} />)}
    <rect x={0} y={860} width={1920} height={220} fill="#2A3050" />
    <rect x={660} y={110} width={600} height={110} rx={12} fill="#14182A" stroke={INK} strokeWidth={5} />
    <text x={960} y={182} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={AMBER} letterSpacing={6}>THE DEBATE</text>
    <Character {...look("hawk")} x={HK.x} y={HK.y - 130} expression={he} arm="point" mouth={hm} lookX={14} />
    <Character {...look("industry")} prop="none" x={IN.x} y={IN.y - 130} expression={ie} arm="hold" flip mouth={im} lookX={-14} />
    <Podium x={HK.x} y={HK.y - 250} label="HAWK" color="#7A2E3A" />
    <Podium x={IN.x} y={IN.y - 250} label="INDUSTRY" color="#2D4A8A" />
  </>
);

const debateLights = (
  <Lighting
    ambient="#4E5688"
    lights={[
      { x: HK.x, y: HK.y - 520, r: 340, color: "#FFE2C0", intensity: 1, glow: 0 },
      { x: IN.x, y: IN.y - 520, r: 340, color: "#DDE6FF", intensity: 1, glow: 0 },
    ]}
    cones={[{ x: HK.x, y: 0, topW: 80, bottomW: 500, h: 900, color: "#FFE2C0", opacity: 0.14 }, { x: IN.x, y: 0, topW: 80, bottomW: 500, h: 900, color: "#DDE6FF", opacity: 0.14 }]}
  />
);

type DebateLine = { line: string; who: "hawk" | "industry"; text: string; he?: Expression; ie?: Expression };

export const ShotDebateWide: React.FC<DebateLine> = ({ line, who, text, he = "angry", ie = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isH = who === "hawk";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={debateLights} vignette={0.45}
      overlay={isH ? <Say text={text} tailX={HK.x + 60} tailY={330} y={240} /> : <Say text={text} tailX={IN.x - 60} tailY={330} y={240} />}
    >
      <DebateStage hm={isH ? mouth : 0} im={isH ? 0 : mouth} he={he} ie={ie} />
    </StoryShot>
  );
};

export const ShotDebateClose: React.FC<DebateLine> = ({ line, who, text, he = "angry", ie = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isH = who === "hawk";
  const cx = isH ? HK.x + 60 : IN.x - 60;
  const cy = (isH ? HK.y : IN.y) - 520;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={isH ? 720 : 1220} ty={620}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><DebateStage hm={isH ? mouth : 0} im={isH ? 0 : mouth} he={he} ie={ie} /></Stage>
          {debateLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isH ? <Say text={text} tailX={760} tailY={320} y={70} /> : <Say text={text} tailX={1160} tailY={320} y={70} />}
    </AbsoluteFill>
  );
};

/* ---------------- Why it matters to your bank account ---------------- */
export const ShotBankApp: React.FC = () => {
  const frame = useCurrentFrame();
  const q = usePop(30, 9);
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#DCE8F2" floor="#C6D3DE" />
      <g transform="translate(960 560)">
        <rect x={-230} y={-430} width={460} height={860} rx={60} fill="#1E2430" stroke={INK} strokeWidth={8} />
        <rect x={-200} y={-380} width={400} height={760} rx={30} fill="#F6F1E7" />
        <text x={0} y={-300} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#6B6458">MY BANK</text>
        <text x={0} y={-200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill={INK}>$10,000</text>
        <text x={0} y={-140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill="#6B6458">S&P 500 index fund</text>
        <path d={`M -160 120 ${Array.from({ length: 10 }).map((_, i) => `L ${-160 + i * 36} ${120 - Math.sin(i + frame / 10) * 30 - i * 8}`).join(" ")}`} stroke="#3E8E3F" strokeWidth={8} fill="none" />
      </g>
      <text x={1460} y={460} fontFamily={HAND_FONT} fontSize={200} fill={AMBER} stroke={INK} strokeWidth={5} transform={`translate(1460 400) scale(${q}) translate(-1460 -400)`}>?</text>
      <rect x={420} y={420} width={300} height={140} rx={14} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
      <text x={570} y={480} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill={INK}>unverified</text>
      <text x={570} y={530} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill={INK}>memo</text>
    </ExplainShot>
  );
};

export const ShotSixPercent: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [6, 30], [0, 6], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Index weight ~6%, Nov 2026 (State Street SPY data)" />}>
      <Limbo />
      <text x={760} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={78} fill={INK}>the S&P 500</text>
      <Pie x={760} y={590} r={320} pct={pct} />
      <path d="M 840 300 Q 1100 240 1240 360" stroke={INK} strokeWidth={6} fill="none" />
      <text x={1260} y={420} fontFamily={HAND_FONT} fontSize={110} fill="#3E8E3F">≈ 6%</text>
      <text x={1260} y={500} fontFamily={HAND_FONT} fontSize={60} fill={INK}>is Nvidia</text>
      <text x={1260} y={640} fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">the other 499-ish companies</text>
      <text x={1260} y={690} fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">share the rest</text>
    </ExplainShot>
  );
};

export const ShotTenThousand: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.min(10, Math.floor(frame / 4) + 1);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#E2EDE0" floor="#CFE0CB" />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${460 + (i % 5) * 250} ${420 + Math.floor(i / 5) * 260}) rotate(${(rnd(i) - 0.5) * 10})`}>
          <rect x={-110} y={-60} width={220} height={120} rx={8} fill="#7BB86F" stroke={INK} strokeWidth={5} />
          <circle r={36} fill="#5A9A50" stroke={INK} strokeWidth={4} />
          <text x={0} y={14} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#F6F1E7">$1K</text>
        </g>
      ))}
      <text x={960} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill={INK}>$10,000 in an S&P 500 fund</text>
    </ExplainShot>
  );
};

/* ---------------- Skit: the red retirement app ---------------- */
const I1 = { x: 640, y: 1000 };
const I2 = { x: 1300, y: 1000 };

const RedScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const on = frame % 16 < 9;
  return (
    <g>
      <rect x={1080} y={110} width={680} height={380} fill={on ? "#5A1418" : "#2A0A0C"} />
      <text x={1420} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#FFB3A8">MY 401(k)</text>
      <path d="M 1140 260 L 1260 300 L 1360 290 L 1460 380 L 1560 360 L 1700 450" stroke="#FF6B5A" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={1420} y={470} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#FF6B5A">▼ red</text>
    </g>
  );
};

const RetireStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression }> = ({ m1, m2, e1, e2 }) => (
  <>
    <Boardroom slide={0} />
    <RedScreen />
    <Character {...look("investor")} prop="none" x={I1.x} y={I1.y} expression={e1} arm="hold" mouth={m1} lookX={14} />
    <Character {...look("investor2")} x={I2.x} y={I2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
    <BoardTable />
  </>
);

const retireLights = (
  <Lighting
    ambient="#3E3A5A"
    lights={[
      { x: I1.x, y: I1.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: I2.x, y: I2.y - 400, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 1420, y: 300, r: 460, ry: 300, color: "#FF8A7A", intensity: 0.8, glow: 0.35 },
    ]}
  />
);

type RetireLine = { line: string; who: "i1" | "i2"; text: string; e1?: Expression; e2?: Expression };

export const ShotRetireWide: React.FC<RetireLine> = ({ line, who, text, e1 = "worried", e2 = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={retireLights} vignette={0.45}
      overlay={is1 ? <Say text={text} tailX={I1.x + 60} tailY={360} y={90} /> : <Say text={text} tailX={I2.x - 60} tailY={360} y={90} />}
    >
      <RetireStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} />
    </StoryShot>
  );
};

export const ShotRetireClose: React.FC<RetireLine> = ({ line, who, text, e1 = "worried", e2 = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  const cx = is1 ? I1.x + 80 : I2.x - 60;
  const cy = (is1 ? I1.y : I2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><RetireStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} /></Stage>
          {retireLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- Late October: in the newspapers ---------------- */
export const ShotPapers: React.FC = () => {
  const frame = useCurrentFrame();
  const drops = [0, 8, 16].map((d) => interpolate(frame, [d, d + 8], [-900, 0], { ...clamp, easing: Easing.in(Easing.quad) }));
  return (
    <StoryShot from={1.0} to={1.06} originX={960} originY={560}
      lighting={<Lighting ambient="#2E3048" lights={[{ x: 960, y: 560, r: 760, ry: 460, color: "#FFF0C8", intensity: 1, glow: 0.15 }]} />}
      overlay={<DateTag text="Late October 2026" delay={2} />}
    >
      <rect width={1920} height={1080} fill="#4A3426" />
      <g transform={`translate(0 ${drops[0]})`}><Newspaper x={620} y={560} rot={-8} scale={0.85} headline="SPY MEMO?" /></g>
      <g transform={`translate(0 ${drops[1]})`}><Newspaper x={1300} y={560} rot={6} scale={0.85} headline="NVIDIA PROBE" /></g>
      <g transform={`translate(0 ${drops[2]})`}><Newspaper x={960} y={600} rot={-1} scale={0.9} headline="ALLEGATIONS" /></g>
    </StoryShot>
  );
};
