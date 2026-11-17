// Shots for B08 · HOW IT CAME OUT (voice/08_how-it-came-out.mp3, lines b08_001…b08_018).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Character, Expression, MiniChip } from "../../../../../kit/Character";
import { DateTag, Grain, Lighting, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, rnd } from "../open/sets";
import { Say } from "../b02/shots";
import { GovBuilding } from "../b03/sets";
import { Magnifier } from "../b04/sets";
import { BoardTable, Boardroom } from "../b05/sets";
import { Newspaper } from "../b06/sets";
import { Source } from "../b07/shots";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- An office floor of monitors, all flashing ---------------- */
const MonitorWall: React.FC<{ from?: string; flash?: boolean }> = ({ from = "URGENT", flash = true }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#1E2236" />
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => {
          const sc = 0.5 + r * 0.12;
          const w = 150 * sc;
          const x = c * (1920 / 11) - 80 + (r % 2) * 40;
          const y = 120 + r * 130 + r * r * 6;
          const on = flash ? (frame + c * 3 + r * 5) % 14 < 9 : true;
          return (
            <g key={`${r}-${c}`} transform={`translate(${x} ${y})`}>
              <rect x={-w / 2} y={-w * 0.62} width={w} height={w * 0.62} rx={4} fill="#11141A" stroke={INK} strokeWidth={3} />
              <rect x={-w / 2 + 5} y={-w * 0.62 + 5} width={w - 10} height={w * 0.62 - 10} fill={on ? "#FFF0C8" : "#2A3050"} />
              {on && <rect x={-w / 2 + 5} y={-w * 0.62 + 5} width={w - 10} height={w * 0.14} fill="#C0392B" />}
              {on && sc > 0.9 && <text x={0} y={-w * 0.25} textAnchor="middle" fontFamily={HAND_FONT} fontSize={16 * sc} fill={INK}>{from}</text>}
              <rect x={-6} y={0} width={12} height={20 * sc} fill="#3A3F44" />
            </g>
          );
        }),
      )}
    </g>
  );
};

export const ShotMonitors: React.FC<{ from?: string; first?: boolean }> = ({ from, first }) => (
  <StoryShot from={1.0} to={1.06} originX={960} originY={600}
    lighting={<Lighting ambient="#5A5E84" lights={[{ x: 960, y: 600, r: 1100, ry: 600, color: "#FFF0C8", intensity: 0.9, glow: 0.25 }]} />}
    overlay={first ? <><DateTag text="November 5 – 8, 2026" delay={2} /><PlaceTag text="Santa Clara, California" delay={8} /></> : <DateTag text="November 8, 2026" delay={2} />}
  >
    <MonitorWall from={from} />
  </StoryShot>
);

/* ---------------- The committee letter ---------------- */
const Letter: React.FC<{ x: number; y: number; scale?: number; rot?: number; hi?: number }> = ({ x, y, scale = 1, rot = 0, hi = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-380} y={-280} width={760} height={560} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
    <text x={0} y={-210} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#2D4A8A" letterSpacing={4}>U.S. HOUSE OF REPRESENTATIVES</text>
    <text x={-330} y={-140} fontFamily={HAND_FONT} fontSize={34} fill="#6B6458">To: Jensen Huang, Nvidia</text>
    <text x={-330} y={-90} fontFamily={HAND_FONT} fontSize={34} fill="#6B6458">Re: request for a briefing</text>
    <text x={-330} y={-20} fontFamily={HAND_FONT} fontSize={36} fill={INK}>…ties to a</text>
    <rect x={-336} y={6} width={480} height={50} fill="#F5D547" opacity={0.75 * hi} />
    <text x={-330} y={44} fontFamily={HAND_FONT} fontSize={42} fill={INK}>"publicly reported</text>
    <text x={-330} y={100} fontFamily={HAND_FONT} fontSize={42} fill={INK}>Chinese intelligence asset"</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M ${-300 + i * 220} 220 q 30 -30 60 0 q 30 30 70 -10`} stroke="#2D4A8A" strokeWidth={4} fill="none" />
        <text x={-260 + i * 220} y={260} textAnchor="middle" fontFamily={HAND_FONT} fontSize={22} fill="#6B6458">committee chair</text>
      </g>
    ))}
  </g>
);

export const ShotLetterFlies: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [6, 60], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <StoryShot from={1.0} to={1.04} originX={960} originY={540}
      lighting={<Lighting ambient="#2A3460" lights={[{ x: 960, y: 620, r: 760, ry: 360, color: "#FFE3A8", intensity: 0.9, glow: 0.2 }]} />}
      overlay={<><DateTag text="November 5, 2026" delay={2} /><Source text="Source: House Select Committee on the CCP" /></>}
    >
      <GovBuilding />
      <g transform={`translate(${-200 + t * 2200} ${560 - Math.sin(t * Math.PI) * 300}) rotate(${-10 + t * 20})`}>
        <rect x={-110} y={-70} width={220} height={140} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
        <path d="M -110 -70 L 0 10 L 110 -70" stroke={INK} strokeWidth={5} fill="none" />
        {[-50, 0, 50].map((dx) => <circle key={dx} cx={dx} cy={36} r={14} fill="#C0392B" stroke={INK} strokeWidth={3} />)}
      </g>
      <text x={960} y={160} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#F6F1E7">3 House committee chairs → Jensen</text>
    </StoryShot>
  );
};

export const ShotLetter: React.FC<{ magnify?: boolean }> = ({ magnify }) => {
  const frame = useCurrentFrame();
  const hi = magnify ? interpolate(frame, [6, 16], [0, 1], clamp) : 0;
  const mx = interpolate(frame, [0, 30], [1300, 900], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={magnify ? 1.1 : 1.0} to={magnify ? 1.16 : 1.04} originX={800} originY={600} overlay={<Source text="Source: House Select Committee on the CCP" />}>
      <Limbo color="#E9E2D2" />
      <Letter x={960} y={540} hi={hi} />
      {magnify && <Magnifier x={mx} y={600} scale={1.2} rot={-30} />}
    </ExplainShot>
  );
};

/** Even Congress is citing the newspaper. */
export const ShotCongressReads: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      <Character {...look("unclesam")} prop="none" x={960} y={1000} scale={1.05} expression="smug" arm="hold" lookX={0} />
      <g transform={`translate(960 ${600 + Math.sin(frame / 8) * 4})`}><Newspaper x={0} y={0} scale={0.42} headline="SPY ASSET?" /></g>
      <text x={960} y={140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={70} fill={INK}>Source: …the newspaper</text>
    </ExplainShot>
  );
};

export const ShotTimesReports: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 10], [-700, 0], { ...clamp, easing: Easing.in(Easing.quad) });
  const shake = frame > 10 && frame < 16 ? Math.sin(frame * 3) * 8 : 0;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560}
      lighting={<Lighting ambient="#3A3550" lights={[{ x: 960, y: 560, r: 760, ry: 460, color: "#FFF0C8", intensity: 1, glow: 0.15 }]} />}
      overlay={<><DateTag text="November 8, 2026" delay={2} /><Source text="Source: The New York Times" /></>}
    >
      <rect width={1920} height={1080} fill="#6A5446" />
      <g transform={`translate(${shake} ${y})`}><Newspaper x={960} y={560} scale={0.95} rot={-2} headline="CLASSIFIED MEMO" /></g>
    </StoryShot>
  );
};

/** One monitor, the email opening. */
export const ShotEmail: React.FC = () => {
  const p = usePop(6, 12);
  return (
    <StoryShot from={1.0} to={1.08} originX={960} originY={520} vignette={0.7}
      lighting={<Lighting ambient="#1E2236" lights={[{ x: 960, y: 500, r: 720, ry: 440, color: "#FFF0C8", intensity: 1, glow: 0.25 }]} />}
    >
      <rect width={1920} height={1080} fill="#1E2236" />
      <rect x={360} y={120} width={1200} height={760} rx={20} fill="#11141A" stroke={INK} strokeWidth={8} />
      <rect x={400} y={160} width={1120} height={680} fill="#FBF7EE" />
      <rect x={400} y={160} width={1120} height={70} fill="#2D4A8A" />
      <text x={440} y={208} fontFamily={HAND_FONT} fontSize={40} fill="#fff">Inbox · 1 new message</text>
      <g opacity={p}>
        <text x={450} y={300} fontFamily={HAND_FONT} fontSize={42} fill={INK}>From: Jensen</text>
        <text x={450} y={360} fontFamily={HAND_FONT} fontSize={42} fill={INK}>To: All Nvidia employees</text>
        <path d="M 450 390 L 1470 390" stroke="#B9B2A4" strokeWidth={4} />
        {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={450} y={430 + i * 60} width={900 - rnd(i) * 300} height={26} rx={6} fill="#D9D2C6" />)}
      </g>
      <rect x={860} y={880} width={200} height={120} fill="#3A3F44" stroke={INK} strokeWidth={5} />
    </StoryShot>
  );
};

/* ---------------- The board's investigation ---------------- */
export const ShotBoard: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={1200} originY={420}
    lighting={<Lighting ambient="#4A4668" lights={[{ x: 1420, y: 300, r: 520, ry: 320, color: "#E6F0FF", intensity: 1, glow: 0.3 }]} />}
    overlay={<Source text="Source: Nvidia memo (Nov 8); Khaleej Times" />}
  >
    <Boardroom slide={0} />
    <rect x={1080} y={110} width={680} height={380} fill="#F6F1E7" />
    <text x={1420} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#2D4A8A">INDEPENDENT INVESTIGATION</text>
    <text x={1420} y={290} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>Was the CEO a target of</text>
    <text x={1420} y={350} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill={INK}>foreign intelligence?</text>
    {[300, 520, 740, 1180, 1400, 1620].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={900} r={64} fill="#1A1626" />
        <path d={`M ${x - 110} 1080 Q ${x - 110} 960 ${x} 960 Q ${x + 110} 960 ${x + 110} 1080 Z`} fill="#1A1626" />
      </g>
    ))}
    <BoardTable />
  </StoryShot>
);

export const ShotTechQ: React.FC<{ vault?: boolean }> = ({ vault }) => {
  const q = usePop(6, 9);
  const frame = useCurrentFrame();
  const door = vault ? interpolate(frame, [6, 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) }) : 0;
  return (
    <ExplainShot from={1.0} to={1.04} overlay={vault ? <Source text="Nvidia board, via TechCrunch" /> : undefined}>
      <Limbo color="#DCE3E8" floor="#C9D2D8" />
      {!vault && (
        <g>
          <rect x={800} y={700} width={320} height={200} fill="#C9C2B2" stroke={INK} strokeWidth={6} />
          <g transform="translate(960 560) scale(3.4)"><MiniChip size={60} /></g>
          <text x={1300} y={480} fontFamily={HAND_FONT} fontSize={240} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(1300 400) scale(${q}) translate(-1300 -400)`}>?</text>
        </g>
      )}
      {vault && (
        <g>
          <rect x={660} y={240} width={600} height={600} rx={30} fill="#7A8088" stroke={INK} strokeWidth={8} />
          <rect x={700} y={280} width={520} height={520} rx={20} fill="#3A3F44" />
          <g transform="translate(960 560) scale(3)"><MiniChip size={60} /></g>
          <g transform={`translate(700 280) scale(${1 - door * 0} 1)`}>
            <rect x={0} y={0} width={520 * door} height={520} rx={20} fill="#9AA0A6" stroke={INK} strokeWidth={6} />
            {door > 0.9 && <circle cx={260} cy={260} r={80} fill="#C9CDD2" stroke={INK} strokeWidth={8} />}
            {door > 0.9 && [0, 60, 120].map((a) => <path key={a} d="M 260 180 L 260 340" stroke={INK} strokeWidth={8} transform={`rotate(${a + frame * 2} 260 260)`} />)}
          </g>
          <text x={960} y={160} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>"no reason to believe" secrets were compromised</text>
        </g>
      )}
    </ExplainShot>
  );
};

export const ShotTornContract: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [14, 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const half = (side: -1 | 1) => (
    <g transform={`translate(${side * t * 140} ${t * 40}) rotate(${side * t * 10} 960 540)`}>
      <clipPath id={`b08tear${side}`}><path d={side < 0 ? "M 0 0 L 960 0 L 930 200 L 990 380 L 940 560 L 980 760 L 950 1080 L 0 1080 Z" : "M 1920 0 L 960 0 L 930 200 L 990 380 L 940 560 L 980 760 L 950 1080 L 1920 1080 Z"} /></clipPath>
      <g clipPath={`url(#b08tear${side})`}>
        <rect x={560} y={200} width={800} height={680} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
        <text x={960} y={300} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>BUSINESS AGREEMENT</text>
        <text x={760} y={460} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#3E8E3F">NVIDIA</text>
        <text x={1160} y={460} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#2D4A8A">MEGASPEED</text>
        {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M 620 ${560 + i * 50} L ${1300 - rnd(i) * 200} ${560 + i * 50}`} stroke="#B9B2A4" strokeWidth={6} strokeLinecap="round" />)}
      </g>
    </g>
  );
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Nvidia, as reported by Bloomberg" />}>
      <Limbo />
      {half(-1)}
      {half(1)}
    </ExplainShot>
  );
};

export const ShotStockDrop: React.FC<{ pct?: string; when?: string; source?: string }> = ({ pct = "≈ −4%", when = "NVDA · next trading day", source = "Source: Gotrade market news, Nov 10" }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [6, 50], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const pts = Array.from({ length: 20 }).map((_, i) => {
    const x = 260 + i * 70;
    const base = 380 - i * 6 + Math.sin(i * 1.7) * 18;
    const y = i < 14 ? base : base + (i - 13) * 60 * t;
    return `${x} ${y}`;
  });
  return (
    <AbsoluteFill style={{ background: "#14182A" }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M 220 ${220 + i * 120} L 1700 ${220 + i * 120}`} stroke="#2A3050" strokeWidth={3} />)}
        <path d={`M ${pts.join(" L ")}`} stroke={t > 0.2 ? "#FF6B5A" : "#7DFFB0"} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", right: 140, top: 140, textAlign: "right", fontFamily: HAND_FONT }}>
        <div style={{ fontSize: 60, color: "#C9D4F0" }}>{when}</div>
        <div style={{ fontSize: 170, color: "#FF6B5A", lineHeight: 1, opacity: t > 0.5 ? 1 : 0, textShadow: "0 6px 0 #000" }}>{pct}</div>
      </div>
      <Source text={source} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

/* ---------------- Skit: "Is that bad?" ---------------- */
const I1 = { x: 640, y: 1000 };
const I2 = { x: 1300, y: 1000 };

const MarketStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression }> = ({ m1, m2, e1, e2 }) => (
  <>
    <Boardroom slide={0} />
    <rect x={1080} y={110} width={680} height={380} fill="#14182A" />
    <path d="M 1120 220 L 1240 240 L 1360 210 L 1480 250 L 1560 360 L 1700 440" stroke="#FF6B5A" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x={1720} y={180} textAnchor="end" fontFamily={HAND_FONT} fontSize={52} fill="#FF6B5A">NVDA −4%</text>
    <Character {...look("investor")} prop="none" x={I1.x} y={I1.y} expression={e1} arm="hold" mouth={m1} lookX={14} />
    <Character {...look("investor2")} x={I2.x} y={I2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
    <BoardTable />
  </>
);

const marketLights = (
  <Lighting
    ambient="#3E3A5A"
    lights={[
      { x: I1.x, y: I1.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: I2.x, y: I2.y - 400, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 1420, y: 300, r: 440, ry: 280, color: "#FF9A8A", intensity: 0.7, glow: 0.3 },
    ]}
  />
);

export const ShotMarketClose: React.FC<{ line: string; who: "i1" | "i2"; text: string; e1?: Expression; e2?: Expression }> = ({ line, who, text, e1 = "worried", e2 = "neutral" }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  const cx = is1 ? I1.x + 80 : I2.x - 60;
  const cy = (is1 ? I1.y : I2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><MarketStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} /></Stage>
          {marketLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- Four days later: the empty chair ---------------- */
export const ShotEmptyChair: React.FC = () => {
  const frame = useCurrentFrame();
  const spin = Math.sin(frame / 40) * 6;
  return (
    <StoryShot from={1.0} to={1.12} originX={960} originY={600} vignette={0.8}
      lighting={<Lighting ambient="#2E3250" lights={[{ x: 960, y: 560, r: 460, ry: 520, color: "#FFF0DC", intensity: 1, glow: 0.3 }]} cones={[{ x: 960, y: 0, topW: 80, bottomW: 600, h: 960, color: "#FFF0DC", opacity: 0.16 }]} />}
      overlay={<div style={{ position: "absolute", left: 70, top: 60, fontFamily: HAND_FONT, fontSize: 58, color: "#C9D4F0" }}>four days later…</div>}
    >
      <rect width={1920} height={1080} fill="#4A4E6A" />
      <rect x={0} y={860} width={1920} height={220} fill="#5A5E78" />
      <g transform={`translate(960 900) skewX(${spin * 0.3})`}>
        <path d="M -150 -520 Q -160 -700 0 -720 Q 160 -700 150 -520 L 140 -300 L -140 -300 Z" fill="#2E2E2E" stroke={INK} strokeWidth={8} />
        <path d="M -120 -520 Q -126 -660 0 -680" stroke="#6A6A6A" strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -110 -660 Q 0 -690 110 -660" stroke="#3A3A3A" strokeWidth={6} fill="none" />
        <rect x={-190} y={-320} width={380} height={70} rx={24} fill="#3A3A3A" stroke={INK} strokeWidth={8} />
        <path d="M -200 -420 L -200 -280 M 200 -420 L 200 -280" stroke="#1D1D1D" strokeWidth={26} strokeLinecap="round" />
        <path d="M 0 -250 L 0 -60" stroke="#5E6268" strokeWidth={24} />
        {[-1, -0.5, 0, 0.5, 1].map((k) => <path key={k} d={`M 0 -60 L ${k * 170} -10`} stroke="#5E6268" strokeWidth={14} strokeLinecap="round" />)}
        {[-1, -0.5, 0, 0.5, 1].map((k) => <circle key={`w${k}`} cx={k * 170} cy={-4} r={14} fill="#1D1D1D" />)}
      </g>
    </StoryShot>
  );
};
