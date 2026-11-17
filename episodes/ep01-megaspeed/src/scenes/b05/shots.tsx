// Shots for B05a · THE APPROACH (voice/05a_the-approach.mp3, lines b05_001…b05_036).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, CharacterLook, Expression, GpuCharacter } from "../../../../../kit/Character";
import { ContactShadow, DateTag, Grain, Lighting, LowerThird, PlaceTag, Vignette } from "../../../../../kit/look/cinematic";
import { audioFile, useMouth } from "../../../../../kit/lipsync";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Camera, Stage } from "../../../../../kit/ui";
import { AMBER, Closer, EP, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, rnd } from "../open/sets";
import { Say } from "../b02/shots";
import { Crate } from "../b03/sets";
import { KID, Magnifier, RackYard, ServerRack } from "../b04/sets";
import {
  Balloon, BoardTable, Boardroom, Bunting, COASTER, Certificate, Coaster, GlassDoor, GlassTower, GlossyDeck, LemonTree, LemonadeStand, MapSea, Nameplate, PLATE,
  PriceSticker, SG, Turntable, Whiteboard,
} from "./sets";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- March 2023, Singapore: the glass tower ---------------- */
export const ShotTower: React.FC = () => (
  <StoryShot from={1.0} to={1.06} originX={960} originY={600}
    lighting={
      <Lighting
        ambient="#2A3460"
        lights={[
          { x: 950, y: 880, r: 360, ry: 140, color: "#FFE3A8", intensity: 1, glow: 0.3 },
          { x: 960, y: 400, r: 520, ry: 500, color: "#B9CCF0", intensity: 0.55, glow: 0.1 },
        ]}
      />
    }
    overlay={<><DateTag text="March 2023" delay={2} /><PlaceTag text="Singapore" delay={8} /></>}
  >
    <GlassTower />
  </StoryShot>
);

const doorLights = (
  <Lighting
    ambient="#3A3E5A"
    lights={[
      { x: PLATE.x, y: PLATE.y, r: 520, ry: 300, color: "#FFF0C8", intensity: 1, glow: 0.2 },
      { x: 960, y: 1000, r: 900, ry: 200, color: "#FFE3A8", intensity: 0.6, glow: 0 },
    ]}
    cones={[{ x: PLATE.x, y: 0, topW: 120, bottomW: 900, h: 700, color: "#FFF0C8", opacity: 0.12 }]}
  />
);

/** The old plate comes off. */
export const ShotOldPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const at = Math.round(durationInFrames * 0.55);
  const fall = interpolate(frame, [at, at + 14], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const twist = frame < at ? Math.sin(frame / 2) * 18 : 0;
  return (
    <StoryShot from={1.0} to={1.05} originX={PLATE.x} originY={PLATE.y} lighting={doorLights} vignette={0.5}>
      <GlassDoor />
      <Nameplate x={PLATE.x} y={PLATE.y + fall * 520} rot={fall * 24} text="SMALL FIRM PTE. LTD." old />
      {frame < at && (
        <g transform={`translate(${PLATE.x + 262} ${PLATE.y - 46}) rotate(${-40 + twist})`}>
          <rect x={-8} y={0} width={16} height={120} fill="#9AA0A6" stroke={INK} strokeWidth={4} />
          <rect x={-22} y={110} width={44} height={150} rx={14} fill="#E0453A" stroke={INK} strokeWidth={5} />
        </g>
      )}
    </StoryShot>
  );
};

/** The new plate, under a cloth → revealed. */
export const ShotNewPlate: React.FC<{ reveal?: boolean }> = ({ reveal }) => {
  const frame = useCurrentFrame();
  const pull = reveal ? interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) }) : 0;
  const shine = reveal ? interpolate(frame, [8, 26], [0, 1], clamp) : 0;
  return (
    <StoryShot from={reveal ? 1.12 : 1.06} to={reveal ? 1.18 : 1.1} originX={PLATE.x} originY={PLATE.y} lighting={doorLights} vignette={0.5}>
      <GlassDoor />
      <Nameplate x={PLATE.x} y={PLATE.y} text="MEGASPEED" shine={shine} />
      {pull < 1 && (
        <g transform={`translate(${pull * 900} ${-pull * 500}) rotate(${pull * 30} ${PLATE.x} ${PLATE.y})`}>
          <path d={`M ${PLATE.x - 340} ${PLATE.y - 110} Q ${PLATE.x} ${PLATE.y - 150} ${PLATE.x + 340} ${PLATE.y - 110} L ${PLATE.x + 360} ${PLATE.y + 130} Q ${PLATE.x + 200} ${PLATE.y + 100} ${PLATE.x} ${PLATE.y + 140} Q ${PLATE.x - 200} ${PLATE.y + 100} ${PLATE.x - 360} ${PLATE.y + 130} Z`} fill="#8E2A3A" stroke={INK} strokeWidth={6} />
          <path d={`M ${PLATE.x - 200} ${PLATE.y - 120} Q ${PLATE.x - 180} ${PLATE.y} ${PLATE.x - 210} ${PLATE.y + 110} M ${PLATE.x + 120} ${PLATE.y - 128} Q ${PLATE.x + 150} ${PLATE.y} ${PLATE.x + 110} ${PLATE.y + 120}`} stroke="#6A1E2A" strokeWidth={6} fill="none" />
        </g>
      )}
      {reveal && shine > 0.2 && [0, 1, 2].map((i) => {
        const p = interpolate(frame, [10 + i * 4, 22 + i * 4], [0, 1], clamp);
        const sx = PLATE.x - 260 + i * 260;
        const sy = PLATE.y - 120 + (i % 2) * 220;
        return <path key={i} d="M 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 L -30 0 L -8 -8 Z" transform={`translate(${sx} ${sy}) scale(${Math.sin(p * Math.PI)})`} fill="#FFF7C8" />;
      })}
    </StoryShot>
  );
};

/* ---------------- …more like a roller coaster ---------------- */
export const ShotCoaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0.12, 0.62], { ...clamp, easing: Easing.inOut(Easing.sin) });
  // sample the track
  const pathEl = React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", COASTER);
    return el;
  }, []);
  const L = pathEl ? pathEl.getTotalLength() : 1;
  const p = pathEl ? pathEl.getPointAtLength(t * L) : { x: 600, y: 300 };
  const q = pathEl ? pathEl.getPointAtLength(Math.min(L, t * L + 4)) : { x: 601, y: 300 };
  const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
  return (
    <ExplainShot from={1.0} to={1.04} bg="#BFE0F2">
      <Coaster />
      {/* entrance arch */}
      <g>
        <rect x={60} y={560} width={30} height={400} fill="#E1B83F" stroke={INK} strokeWidth={5} />
        <rect x={430} y={560} width={30} height={400} fill="#E1B83F" stroke={INK} strokeWidth={5} />
        <rect x={30} y={500} width={460} height={110} rx={20} fill="#E0453A" stroke={INK} strokeWidth={6} />
        <text x={260} y={576} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#FFF3CC" letterSpacing={6}>MEGASPEED!</text>
      </g>
      <g transform={`translate(${p.x} ${p.y}) rotate(${ang})`}>
        <GpuCharacter x={0} y={-44} scale={0.35} expression="surprised" arm="wave" />
        <rect x={-80} y={-60} width={160} height={60} rx={14} fill="#2D4A8A" stroke={INK} strokeWidth={5} />
        <circle cx={-46} cy={4} r={14} fill="#3A3F44" stroke={INK} strokeWidth={4} />
        <circle cx={46} cy={4} r={14} fill="#3A3F44" stroke={INK} strokeWidth={4} />
      </g>
    </ExplainShot>
  );
};

/* ---------------- Alice Huang (narration only, no dialogue) ---------------- */
const officeLights = (
  <Lighting
    ambient="#5A5E80"
    lights={[
      { x: 820, y: 620, r: 480, ry: 520, color: "#FFF4E0", intensity: 1, glow: 0.05 },
      { x: 1500, y: 300, r: 500, ry: 360, color: "#C9D8FF", intensity: 0.6, glow: 0.15 },
    ]}
  />
);

const OfficeBack: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#5A6078" />
    <rect x={0} y={900} width={1920} height={180} fill="#4A4A58" />
    <rect x={1140} y={110} width={680} height={560} fill="#1C2142" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={1160 + i * 72} y={670 - 140 - rnd(i + 20) * 280} width={56} height={140 + rnd(i + 20) * 280} fill="#2A3058" />)}
    <path d="M 1480 110 L 1480 670" stroke={INK} strokeWidth={8} />
  </g>
);

export const ShotAlice: React.FC = () => (
  <StoryShot from={1.0} to={1.05} originX={820} originY={560} lighting={officeLights} vignette={0.5}
    overlay={<LowerThird name="Alice Huang" role="Director, Megaspeed · Huang Le" delay={10} x={1100} y={780} />}
  >
    <OfficeBack />
    <ContactShadow x={820} y={1002} w={220} opacity={0.4} />
    <Character {...look("alice")} x={820} y={1000} expression="neutral" arm="hold" lookX={10} />
  </StoryShot>
);

/** Same last name; zero relation. */
export const ShotSameName: React.FC<{ zero?: boolean }> = ({ zero }) => {
  const a = usePop(4, 11);
  const z = usePop(6, 9);
  const Tag: React.FC<{ x: number; who: string }> = ({ x, who }) => (
    <g transform={`translate(${x} 200) scale(${a})`}>
      <rect x={-200} y={-70} width={400} height={140} rx={14} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
      <text x={0} y={-20} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill="#6B6458">{who}</text>
      <rect x={-130} y={-2} width={260} height={56} rx={8} fill={AMBER} opacity={0.75} />
      <text x={0} y={44} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill={INK} letterSpacing={6}>HUANG</text>
    </g>
  );
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#E9E2D2" />
      <ContactShadow x={560} y={952} w={200} opacity={0.3} />
      <Character {...look("alice")} x={560} y={950} scale={0.95} expression="neutral" arm="down" lookX={10} />
      <ContactShadow x={1360} y={952} w={200} opacity={0.3} />
      <Character {...look("jensen")} prop="none" x={1360} y={950} scale={0.95} expression="neutral" arm="down" flip lookX={-10} />
      <Tag x={560} who="Megaspeed director" />
      <Tag x={1360} who="Nvidia CEO" />
      {zero && (
        <g transform={`translate(960 560) scale(${z})`}>
          <circle r={130} fill="#FBF7EE" stroke={INK} strokeWidth={8} />
          <text x={0} y={60} textAnchor="middle" fontFamily={HAND_FONT} fontSize={190} fill="#C0392B">0</text>
          <rect x={-170} y={150} width={340} height={70} rx={10} fill={INK} />
          <text x={0} y={198} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#fff">family relation</text>
        </g>
      )}
    </ExplainShot>
  );
};

/* ---------------- The business model ---------------- */
export const ShotModelQ: React.FC = () => {
  const q = usePop(6, 9);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Whiteboard title="MEGASPEED · BUSINESS MODEL" />
      <text x={960} y={720} textAnchor="middle" fontFamily={HAND_FONT} fontSize={340} fill={AMBER} stroke={INK} strokeWidth={6} transform={`translate(960 600) scale(${q}) translate(-960 -600)`}>?</text>
    </ExplainShot>
  );
};

export const ShotModelSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = [0, 0.3, 0.62].map((t) => interpolate(frame, [durationInFrames * t, durationInFrames * t + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }));
  const col = [480, 960, 1440];
  return (
    <ExplainShot from={1.0} to={1.03}>
      <Whiteboard title="MEGASPEED · BUSINESS MODEL" />
      {/* 1 · buy */}
      <g transform={`translate(${col[0]} 640) scale(${p[0]})`}>
        <ServerRack x={0} y={120} scale={0.5} seed={11} />
        <PriceSticker x={60} y={-140} text="BUY" rot={-6} />
      </g>
      {/* 2 · plug in */}
      <g transform={`translate(${col[1]} 640) scale(${p[1]})`}>
        <rect x={-70} y={-110} width={140} height={180} rx={18} fill="#F6F1E7" stroke={INK} strokeWidth={6} />
        <circle cx={-22} cy={-30} r={10} fill={INK} />
        <circle cx={22} cy={-30} r={10} fill={INK} />
        <path d="M -150 140 Q -120 40 -30 20" stroke={INK} strokeWidth={14} fill="none" />
        <rect x={-50} y={-6} width={60} height={44} rx={8} fill="#3A3F44" stroke={INK} strokeWidth={4} />
        <text x={0} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill={INK}>PLUG IN</text>
      </g>
      {/* 3 · rent */}
      <g transform={`translate(${col[2]} 640) scale(${p[2]})`}>
        <ServerRack x={0} y={120} scale={0.5} seed={12} />
        <PriceSticker x={40} y={-140} text="RENT $/hr" rot={6} />
      </g>
      {[0, 1].map((i) => <path key={i} d={`M ${col[i] + 150} 600 L ${col[i + 1] - 150} 600`} stroke="#2D4A8A" strokeWidth={10} strokeLinecap="round" opacity={p[i + 1]} />)}
    </ExplainShot>
  );
};

/* ---------------- Official Nvidia cloud partner ---------------- */
export const ShotCertificate: React.FC = () => {
  const p = usePop(4, 12);
  return (
    <StoryShot from={1.0} to={1.06} originX={960} originY={500}
      lighting={<Lighting ambient="#4A4466" lights={[{ x: 960, y: 480, r: 620, ry: 420, color: "#FFF4E0", intensity: 1, glow: 0.15 }]} cones={[{ x: 960, y: 0, topW: 140, bottomW: 1000, h: 820, color: "#FFF4E0", opacity: 0.1 }]} />}
    >
      <rect width={1920} height={1080} fill="#6E5A78" />
      <g transform={`translate(960 500) scale(${0.9 + 0.1 * p}) translate(-960 -500)`} opacity={p}>
        <Certificate x={960} y={500} />
      </g>
    </StoryShot>
  );
};

/* ---------------- An authorized dealership, but for AI supercomputers ---------------- */
const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const cols = ["#E0453A", "#F5D547", "#2D4A8A", "#3E8E4F", "#F2B544"];
  return (
    <>
      {Array.from({ length: 60 }).map((_, i) => {
        const y = ((frame * (6 + rnd(i) * 6) + rnd(i + 5) * 1100) % 1200) - 100;
        const x = rnd(i + 9) * 1920 + Math.sin(frame / 7 + i) * 20;
        return <rect key={i} x={x} y={y} width={18} height={10} fill={cols[i % 5]} transform={`rotate(${frame * 8 + i * 37} ${x} ${y})`} />;
      })}
    </>
  );
};

export const ShotDealer: React.FC<{ win?: boolean }> = ({ win }) => (
  <ExplainShot from={win ? 1.15 : 1.0} to={win ? 1.2 : 1.05} originY={560} bg="#F3E9D8">
    <rect width={1920} height={1080} fill="#F3E9D8" />
    <rect x={0} y={860} width={1920} height={220} fill="#D9D2C6" />
    <path d="M 0 860 L 1920 860" stroke={INK} strokeWidth={6} />
    <Bunting y={60} />
    <rect x={560} y={160} width={800} height={130} rx={16} fill="#2D4A8A" stroke={INK} strokeWidth={6} />
    <text x={960} y={225} textAnchor="middle" fontFamily={HAND_FONT} fontSize={62} fill="#fff" letterSpacing={4}>AUTHORIZED DEALER</text>
    <text x={960} y={272} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill={AMBER}>AI supercomputers</text>
    <Turntable x={620} y={900} />
    <Turntable x={1300} y={900} />
    <PriceSticker x={820} y={500} text="NEW!" />
    <PriceSticker x={1500} y={480} text="0% APR*" rot={-6} />
    <Balloon x={160} y={420} color="#E0453A" />
    <Balloon x={260} y={380} color="#F5D547" />
    <Balloon x={1760} y={400} color="#3E8E4F" />
    <Balloon x={1660} y={440} color="#2D4A8A" />
    {win && <Confetti />}
    {win && <text x={960} y={700} textAnchor="middle" fontFamily={HAND_FONT} fontSize={110} fill="#C0392B" stroke={INK} strokeWidth={3}>everyone wins!</text>}
  </ExplainShot>
);

const ACCOUNTANT: CharacterLook = { outfit: "plain", color: "#F6F1E7", tie: "#2D4A8A", hair: "side", hairColor: "#3B2A1E", glasses: true };

export const ShotAccountants: React.FC = () => {
  const frame = useCurrentFrame();
  const tape = interpolate(frame, [0, 60], [80, 520], clamp);
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#E2EDE0" floor="#CFE0CB" />
      <Character {...ACCOUNTANT} x={760} y={900} scale={1.1} expression="happy" arm="hold" lookX={12} />
      {/* desk */}
      <rect x={420} y={800} width={1080} height={40} fill="#8A5A3B" stroke={INK} strokeWidth={6} />
      <rect x={460} y={840} width={1000} height={240} fill="#7A4E32" stroke={INK} strokeWidth={6} />
      <rect x={560} y={860} width={400} height={64} rx={8} fill="#F6F1E7" stroke={INK} strokeWidth={4} />
      <text x={760} y={906} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill={INK}>NVIDIA ACCOUNTING</text>
      {/* calculator + paper tape */}
      <rect x={1060} y={700} width={200} height={100} rx={10} fill="#3A3F44" stroke={INK} strokeWidth={5} />
      <rect x={1080} y={712} width={160} height={30} fill="#9FE0A0" />
      <path d={`M 1240 720 Q 1300 640 1360 720 L 1360 ${720 + tape * 0.6}`} stroke={INK} strokeWidth={46} fill="none" />
      <path d={`M 1240 720 Q 1300 640 1360 720 L 1360 ${720 + tape * 0.6}`} stroke="#FBF7EE" strokeWidth={38} fill="none" />
      {/* cash stacks */}
      {Array.from({ length: Math.min(6, Math.floor(frame / 8) + 1) }).map((_, i) => (
        <g key={i}>
          <rect x={500 + (i % 3) * 120} y={750 - Math.floor(i / 3) * 50} width={100} height={50} rx={4} fill="#7BB86F" stroke={INK} strokeWidth={4} />
          <circle cx={550 + (i % 3) * 120} cy={775 - Math.floor(i / 3) * 50} r={14} fill="#5A9A50" stroke={INK} strokeWidth={3} />
        </g>
      ))}
    </ExplainShot>
  );
};

/* ---------------- Speedmatrix: a Malaysian arm ---------------- */
export const ShotArm: React.FC = () => {
  const frame = useCurrentFrame();
  const g = interpolate(frame, [6, 50], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const tip = { x: SG.x - 260 * g, y: SG.y - 330 * g };
  const d = `M ${SG.x} ${SG.y - 10} Q ${SG.x - 40} ${SG.y - 180 * g} ${tip.x} ${tip.y}`;
  const sign = usePop(46, 10);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <MapSea />
      <path d={d} stroke={INK} strokeWidth={60} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#2D4A8A" strokeWidth={46} fill="none" strokeLinecap="round" />
      <circle cx={tip.x} cy={tip.y} r={36} fill="#F1D3B0" stroke={INK} strokeWidth={6} />
      <g transform={`translate(${tip.x} ${tip.y - 40}) scale(${sign})`}>
        <path d="M 0 0 L 0 -150" stroke={INK} strokeWidth={10} />
        <rect x={-10} y={-260} width={420} height={110} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
        <text x={200} y={-190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={58} fill="#2D4A8A">SPEEDMATRIX</text>
      </g>
      <circle cx={SG.x} cy={SG.y - 20} r={22} fill="#E0453A" stroke={INK} strokeWidth={5} />
      <text x={SG.x + 40} y={SG.y + 10} fontFamily={HAND_FONT} fontSize={36} fill={INK}>Megaspeed</text>
    </ExplainShot>
  );
};

/** Cheap land, big power grids, a short cable. */
export const ShotWhyMalaysia: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = [0.0, 0.3, 0.6].map((t) => interpolate(frame, [durationInFrames * t, durationInFrames * t + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }));
  return (
    <ExplainShot from={1.0} to={1.04}>
      <MapSea />
      {/* land */}
      <g transform={`translate(700 450) scale(${p[0]})`}>
        <rect x={-150} y={-70} width={300} height={140} fill="#C9A15B" stroke={INK} strokeWidth={6} strokeDasharray="20 10" />
        <PriceSticker x={40} y={-110} text="cheap land" rot={-6} />
      </g>
      {/* pylons */}
      <g transform={`translate(1220 300) scale(${p[1]})`}>
        {[-90, 90].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M -40 120 L 0 -120 L 40 120 M -50 -60 L 50 -60 M -60 -20 L 60 -20 M -28 40 L 28 -40 M 28 40 L -28 -40" stroke={INK} strokeWidth={8} fill="none" />
          </g>
        ))}
        <path d="M -150 -60 Q 0 -10 150 -60" stroke={INK} strokeWidth={4} fill="none" />
        <text x={0} y={190} textAnchor="middle" fontFamily={HAND_FONT} fontSize={50} fill={INK}>big power grids</text>
      </g>
      {/* short cable across the strait */}
      <g opacity={p[2]}>
        <path d={`M ${SG.x - 20} ${SG.y - 30} C ${SG.x - 30} ${SG.y - 90} ${SG.x - 60} ${SG.y - 120} ${SG.x - 80} ${SG.y - 150}`} stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d={`M ${SG.x - 20} ${SG.y - 30} C ${SG.x - 30} ${SG.y - 90} ${SG.x - 60} ${SG.y - 120} ${SG.x - 80} ${SG.y - 150}`} stroke="#E1B83F" strokeWidth={9} fill="none" strokeLinecap="round" />
        <rect x={SG.x + 40} y={SG.y - 190} width={300} height={70} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
        <text x={SG.x + 190} y={SG.y - 140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>short cable</text>
      </g>
    </ExplainShot>
  );
};

/* ---------------- Skit: the delivery (Salesman + Tech, Speedmatrix yard) ---------------- */
const SAL = { x: 1380, y: 1000 };
const TEC = { x: 560, y: 1000 };

const DeliveryStage: React.FC<{ sm: number; tm: number; se: Expression; te: Expression; ta?: "hold" | "point" | "shrug"; stack: number }> = ({ sm, tm, se, te, ta = "hold", stack }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <RackYard sign="SPEEDMATRIX" />
      {/* the crates: the pile keeps growing */}
      {Array.from({ length: stack }).map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return <Crate key={i} x={880 + col * 150} y={990 - row * 120} label="SERVERS" scale={0.65} />;
      })}
      <ContactShadow x={TEC.x} y={TEC.y + 2} w={190} opacity={0.4} />
      <Character {...look("tech")} prop="none" x={TEC.x} y={TEC.y} expression={te} arm={ta} mouth={tm} lookX={14} />
      {/* the power cord Tech holds */}
      {ta === "hold" && (
        <g>
          <path d={`M ${TEC.x + 130} ${TEC.y - 190} Q ${TEC.x + 60} ${TEC.y - 20} ${TEC.x - 260} ${TEC.y}`} stroke={INK} strokeWidth={12} fill="none" />
          <rect x={TEC.x + 112} y={TEC.y - 236} width={40} height={50} rx={6} fill="#3A3F44" stroke={INK} strokeWidth={4} />
          <path d={`M ${TEC.x + 122} ${TEC.y - 236} l 0 -18 M ${TEC.x + 142} ${TEC.y - 236} l 0 -18`} stroke="#C9A35A" strokeWidth={6} />
        </g>
      )}
      <ContactShadow x={SAL.x} y={SAL.y + 2} w={190} opacity={0.4} />
      <Character {...look("salesman")} prop="chipbox" x={SAL.x} y={SAL.y + Math.abs(Math.sin(frame / 9)) * -6} expression={se} arm="hold" flip mouth={sm} lookX={-14} />
    </>
  );
};

const deliveryLights = (
  <Lighting
    ambient="#3A4468"
    lights={[
      { x: TEC.x, y: TEC.y - 380, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: SAL.x, y: SAL.y - 380, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 1030, y: 860, r: 340, ry: 220, color: "#FFE3A8", intensity: 0.9, glow: 0.1 },
      { x: 960, y: 0, r: 900, ry: 260, color: "#FFE3A8", intensity: 0.5, glow: 0.1 },
    ]}
  />
);

type DelLine = { line: string; who: "salesman" | "tech"; text: string; se?: Expression; te?: Expression; ta?: "hold" | "point" | "shrug"; stack?: number; grow?: boolean };

export const ShotDeliveryWide: React.FC<DelLine> = ({ line, who, text, se = "happy", te = "neutral", ta = "hold", stack = 3, grow }) => {
  const frame = useCurrentFrame();
  const mouth = useMouth(audioFile(EP, line));
  const isS = who === "salesman";
  const n = grow ? Math.min(12, stack + Math.floor(frame / 5)) : stack;
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={600} lighting={deliveryLights} vignette={0.45}
      overlay={isS ? <Say text={text} tailX={SAL.x - 60} tailY={360} y={90} /> : <Say text={text} tailX={TEC.x + 60} tailY={360} y={90} />}
    >
      <DeliveryStage sm={isS ? mouth : 0} tm={isS ? 0 : mouth} se={se} te={te} ta={ta} stack={n} />
    </StoryShot>
  );
};

export const ShotDeliveryClose: React.FC<DelLine> = ({ line, who, text, se = "happy", te = "neutral", ta = "hold", stack = 3 }) => {
  const mouth = useMouth(audioFile(EP, line));
  const isS = who === "salesman";
  const cx = isS ? SAL.x - 60 : TEC.x + 80;
  const cy = (isS ? SAL.y : TEC.y) - 380;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={isS ? 1260 : 720} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><DeliveryStage sm={isS ? mouth : 0} tm={isS ? 0 : mouth} se={se} te={te} ta={ta} stack={stack} /></Stage>
          {deliveryLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {isS ? <Say text={text} tailX={1180} tailY={300} y={60} /> : <Say text={text} tailX={760} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};

/* ---------------- The tiny company goes shopping ---------------- */
export const ShotShopping: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 70], [-300, 900], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo color="#F3E3E8" floor="#E2CBD2" />
      <g transform={`translate(${x} 0)`}>
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-120 - i * 10} ${560 + i * 70} l -180 0`} stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.4} />)}
        {/* racks piled in the cart */}
        <ServerRack x={60} y={720} scale={0.6} seed={21} />
        <ServerRack x={200} y={700} scale={0.66} seed={22} />
        <ServerRack x={340} y={720} scale={0.6} seed={23} />
        {/* cart */}
        <path d="M -60 560 L 460 560 L 420 820 L -20 820 Z" fill="#C9CDD2" fillOpacity={0.6} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M ${-40 + i * 84} 560 L ${-10 + i * 74} 820`} stroke={INK} strokeWidth={4} />)}
        <path d="M 460 560 L 540 480 L 600 480" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -20 820 L -20 880 L 420 880" stroke={INK} strokeWidth={8} fill="none" />
        <circle cx={20} cy={900} r={26} fill="#3A3F44" stroke={INK} strokeWidth={5} />
        <circle cx={380} cy={900} r={26} fill="#3A3F44" stroke={INK} strokeWidth={5} />
        <rect x={60} y={760} width={300} height={56} rx={8} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
        <text x={210} y={800} textAnchor="middle" fontFamily={HAND_FONT} fontSize={38} fill={INK}>MEGASPEED</text>
      </g>
    </ExplainShot>
  );
};

/* ---------------- Reuters checks the filings ---------------- */
export const ShotFilings: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = interpolate(frame, [0, 70], [700, 1200], clamp);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560}
      lighting={<Lighting ambient="#3E3A52" lights={[{ x: 960, y: 560, r: 640, ry: 420, color: "#FFF0C8", intensity: 1, glow: 0.1 }]} />}
      overlay={<div style={{ position: "absolute", right: 70, bottom: 60, fontFamily: HAND_FONT, fontSize: 40, color: "#fff", background: "rgba(14,14,20,0.7)", padding: "6px 22px", borderRadius: 8 }}>Source: Reuters review of corporate filings</div>}
    >
      <rect width={1920} height={1080} fill="#6B4A36" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} transform={`translate(${960 + (rnd(i) - 0.5) * 80} ${880 - i * 34}) rotate(${(rnd(i + 4) - 0.5) * 8})`}>
          <rect x={-380} y={-30} width={760} height={34} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <g transform="translate(960 440) rotate(-2)">
        <rect x={-380} y={-260} width={760} height={420} fill="#FBF7EE" stroke={INK} strokeWidth={6} />
        <text x={0} y={-180} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill={INK}>CORPORATE FILING</text>
        <text x={-320} y={-110} fontFamily={HAND_FONT} fontSize={36} fill="#6B6458">Company: Megaspeed</text>
        <text x={-320} y={-60} fontFamily={HAND_FONT} fontSize={36} fill="#6B6458">Total assets: ______</text>
        <text x={-320} y={-10} fontFamily={HAND_FONT} fontSize={36} fill="#6B6458">Revenue: ______</text>
        {Array.from({ length: 3 }).map((_, i) => <path key={i} d={`M -320 ${40 + i * 36} L ${280 - rnd(i) * 160} ${40 + i * 36}`} stroke="#B9B2A4" strokeWidth={6} strokeLinecap="round" />)}
      </g>
      <Magnifier x={mx} y={420} scale={1.3} rot={-25} />
    </StoryShot>
  );
};

/* ---------------- Assets: $33M → $3B ---------------- */
export const ShotAssets: React.FC<{ year2024?: boolean }> = ({ year2024 }) => {
  const frame = useCurrentFrame();
  const a = usePop(6, 12);
  const big = year2024 ? interpolate(frame, [6, 34], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) }) : 0;
  const base = 860;
  const h33 = 40 * a;
  const hBig = big * 1200;
  return (
    <ExplainShot from={1.0} to={1.04} bg="#F6F1E7">
      <Limbo color="#F6F1E7" floor="#E8E0CE" />
      <text x={960} y={140} textAnchor="middle" fontFamily={HAND_FONT} fontSize={70} fill={INK}>MEGASPEED · total assets</text>
      <path d={`M 360 ${base} L 1560 ${base}`} stroke={INK} strokeWidth={8} />
      <rect x={560} y={base - h33} width={240} height={h33} fill="#5DB35F" stroke={INK} strokeWidth={6} />
      <text x={680} y={base - h33 - 30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill={INK} opacity={a}>$33M</text>
      <text x={680} y={base + 70} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#6B6458">2023</text>
      <text x={1240} y={base + 70} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#6B6458">2024</text>
      {year2024 && hBig > 0 && <rect x={1120} y={base - hBig} width={240} height={hBig} fill="#E0453A" stroke={INK} strokeWidth={6} />}
      {!year2024 && <text x={1240} y={base - 40} textAnchor="middle" fontFamily={HAND_FONT} fontSize={120} fill={AMBER} stroke={INK} strokeWidth={4}>?</text>}
    </ExplainShot>
  );
};

/* ---------------- Revenue: zero → $294M in one year ---------------- */
export const ShotRevenue: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const v = interpolate(frame, [12, durationInFrames * 0.75], [0, 294], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const n = Math.round(v * 1_000_000).toLocaleString("en-US");
  return (
    <AbsoluteFill style={{ background: "#14182A", alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT }}>
      <div style={{ fontSize: 60, color: "#C9D4F0", letterSpacing: 4 }}>MEGASPEED · REVENUE</div>
      <div style={{ fontSize: 170, color: v > 293 ? AMBER : "#fff", lineHeight: 1.1 }}>${n}</div>
      <div style={{ fontSize: 56, color: "#9BFFB0" }}>in one year</div>
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

/* ---------------- Lemonade stand → the orchard by Christmas ---------------- */
export const ShotLemonade: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const grow = interpolate(frame, [durationInFrames * 0.35, durationInFrames * 0.8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const snow = grow;
  return (
    <ExplainShot from={1.0} to={1.05} bg="#CFE6F2">
      <rect width={1920} height={1080} fill="#CFE6F2" />
      <rect x={0} y={860} width={1920} height={220} fill={grow > 0.5 ? "#F3F6F8" : "#9CCB7A"} />
      {Array.from({ length: 8 }).map((_, i) => (
        <LemonTree key={i} x={980 + (i % 4) * 230} y={860 - Math.floor(i / 4) * 140 + 140 * 0} scale={grow * (Math.floor(i / 4) ? 0.75 : 1)} i={i} />
      ))}
      <Character {...KID} x={460} y={900} scale={0.7} expression={grow > 0.5 ? "smug" : "happy"} arm="hold" lookX={14} />
      <LemonadeStand x={460} y={900} scale={0.9} />
      {grow > 0.4 && (
        <g transform="translate(700 600)">
          <circle r={62} fill="none" stroke={INK} strokeWidth={34} />
          <circle r={62} fill="none" stroke="#3E8E4F" strokeWidth={24} />
          {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={Math.cos(k) * 62} cy={Math.sin(k) * 62} r={7} fill="#E0453A" />)}
          <path d="M -24 62 L 0 50 L 24 62 L 14 92 M -24 62 L -14 92" stroke="#C0392B" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
      {snow > 0 && Array.from({ length: 50 }).map((_, i) => {
        const y = ((frame * (2 + rnd(i) * 2) + rnd(i + 3) * 1080) % 1080);
        return <circle key={i} cx={rnd(i + 8) * 1920 + Math.sin(frame / 10 + i) * 10} cy={y} r={4 + rnd(i) * 4} fill="#fff" opacity={snow} />;
      })}
      <text x={1360} y={300} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#2E4A2E" opacity={grow}>MY ORCHARD</text>
    </ExplainShot>
  );
};

/* ---------------- Skit: the pitch deck (Investor + Investor 2) ---------------- */
const I1 = { x: 640, y: 1000 };
const I2 = { x: 1300, y: 1000 };

const PitchStage: React.FC<{ m1: number; m2: number; e1: Expression; e2: Expression; slide: number }> = ({ m1, m2, e1, e2, slide }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <Boardroom slide={slide} />
      <Character {...look("investor")} x={I1.x} y={I1.y} expression={e1} arm="hold" mouth={m1} lookX={14} />
      <Character {...look("investor2")} x={I2.x} y={I2.y} expression={e2} arm="hold" flip mouth={m2} lookX={-14} />
      <BoardTable />
      <GlossyDeck x={960} y={860} flip={(frame % 40) / 40} />
    </>
  );
};

const pitchLights = (
  <Lighting
    ambient="#3E3A5A"
    lights={[
      { x: I1.x, y: I1.y - 400, r: 300, color: "#FFF4E0", intensity: 1, glow: 0 },
      { x: I2.x, y: I2.y - 400, r: 300, color: "#FFF8F0", intensity: 1, glow: 0 },
      { x: 1420, y: 300, r: 420, ry: 260, color: "#E6F0FF", intensity: 0.8, glow: 0.25 },
      { x: 960, y: 860, r: 300, ry: 100, color: "#FFF4E0", intensity: 0.8, glow: 0.1 },
    ]}
  />
);

type PitchLine = { line: string; who: "i1" | "i2"; text: string; e1?: Expression; e2?: Expression; slide?: number };

export const ShotPitchWide: React.FC<PitchLine> = ({ line, who, text, e1 = "surprised", e2 = "neutral", slide = 0 }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={560} lighting={pitchLights} vignette={0.45}
      overlay={is1 ? <Say text={text} tailX={I1.x + 60} tailY={360} y={90} /> : <Say text={text} tailX={I2.x - 60} tailY={360} y={90} />}
    >
      <PitchStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} slide={slide} />
    </StoryShot>
  );
};

export const ShotPitchClose: React.FC<PitchLine> = ({ line, who, text, e1 = "surprised", e2 = "neutral", slide = 0 }) => {
  const mouth = useMouth(audioFile(EP, line));
  const is1 = who === "i1";
  const cx = is1 ? I1.x + 80 : I2.x - 60;
  const cy = (is1 ? I1.y : I2.y) - 400;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={1.6} cx={cx} cy={cy} tx={is1 ? 720 : 1220} ty={600}>
        <Camera from={1} to={1.03} originX={cx} originY={cy}>
          <Stage><PitchStage m1={is1 ? mouth : 0} m2={is1 ? 0 : mouth} e1={e1} e2={e2} slide={slide} /></Stage>
          {pitchLights}
        </Camera>
      </Closer>
      <Vignette strength={0.5} />
      <Grain opacity={0.08} />
      {is1 ? <Say text={text} tailX={760} tailY={300} y={60} /> : <Say text={text} tailX={1160} tailY={300} y={60} />}
    </AbsoluteFill>
  );
};
