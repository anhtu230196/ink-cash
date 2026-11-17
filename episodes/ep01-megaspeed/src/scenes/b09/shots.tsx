// Shots for B09a · THE EMPTY CHAIR (voice/09a_the-empty-chair.mp3, lines b09_001…b09_025).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Character, GpuCharacter, MiniChip } from "../../../../../kit/Character";
import { DateTag, Lighting, PlaceTag } from "../../../../../kit/look/cinematic";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { Stage } from "../../../../../kit/ui";
import { AMBER, Closer, ExplainShot, StoryShot, look, usePop } from "../common";
import { Limbo, PaperWall, rnd } from "../open/sets";
import { Pie } from "../b02/setsB";
import { Crate, StampMark } from "../b03/sets";
import { BigCheck, TwoHouses } from "../b04/sets";
import { MapSea, SG } from "../b05/sets";
import { GlassDoor, PLATE } from "../b05/sets";
import { CloudShape } from "../b04/sets";
import { Source } from "../b07/shots";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- The empty chair in front of glowing screens ---------------- */
export const Chair: React.FC<{ x: number; y: number; scale?: number; jacket?: boolean }> = ({ x, y, scale = 1, jacket }) => {
  const frame = useCurrentFrame();
  const spin = Math.sin(frame / 30) * 0.12;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * (1 - Math.abs(spin) * 0.6)} ${scale})`}>
      <path d="M -150 -520 Q -160 -700 0 -720 Q 160 -700 150 -520 L 140 -300 L -140 -300 Z" fill="#2E2E2E" stroke={INK} strokeWidth={8} />
      <path d="M -120 -520 Q -126 -660 0 -680" stroke="#6A6A6A" strokeWidth={8} fill="none" strokeLinecap="round" />
      {jacket && (
        <g>
          <path d="M -170 -640 Q 0 -700 170 -640 L 190 -320 L 40 -330 L 0 -560 L -40 -330 L -190 -320 Z" fill="#262626" stroke={INK} strokeWidth={6} />
          <path d="M -40 -330 L 0 -560 L 40 -330" stroke="#6A6A6A" strokeWidth={8} fill="none" />
          <path d="M -120 -620 Q -60 -560 -40 -330 M 120 -620 Q 60 -560 40 -330" stroke="#5A5A5A" strokeWidth={6} fill="none" />
          <path d="M -150 -600 Q -140 -500 -160 -400" stroke="#4A4A4A" strokeWidth={5} fill="none" />
        </g>
      )}
      <rect x={-190} y={-320} width={380} height={70} rx={24} fill="#3A3A3A" stroke={INK} strokeWidth={8} />
      <path d="M -200 -420 L -200 -280 M 200 -420 L 200 -280" stroke="#1D1D1D" strokeWidth={26} strokeLinecap="round" />
      <path d="M 0 -250 L 0 -60" stroke="#5E6268" strokeWidth={24} />
      {[-1, -0.5, 0, 0.5, 1].map((k) => <path key={k} d={`M 0 -60 L ${k * 170} -10`} stroke="#5E6268" strokeWidth={14} strokeLinecap="round" />)}
      {[-1, -0.5, 0, 0.5, 1].map((k) => <circle key={`w${k}`} cx={k * 170} cy={-4} r={14} fill="#1D1D1D" />)}
    </g>
  );
};

export const ScreenWall: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={1920} height={1080} fill="#2A2E48" />
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => {
          const on = (frame + r * 7 + c * 5) % 40 < 34;
          return (
            <g key={`${r}-${c}`}>
              <rect x={120 + c * 290} y={80 + r * 200} width={260} height={170} rx={8} fill="#11141A" stroke={INK} strokeWidth={4} />
              <rect x={130 + c * 290} y={90 + r * 200} width={240} height={150} fill={on ? ["#5DB35F", "#3E8E8A", "#2D4A8A"][(r + c) % 3] : "#1A1E2A"} opacity={0.8} />
              {on && <path d={`M ${140 + c * 290} ${210 + r * 200} ${Array.from({ length: 6 }).map((_, k) => `L ${150 + c * 290 + k * 40} ${200 + r * 200 - rnd(r * 9 + c + k) * 80}`).join(" ")}`} stroke="#F6F1E7" strokeWidth={4} fill="none" />}
            </g>
          );
        }),
      )}
      <rect x={0} y={860} width={1920} height={220} fill="#3A3E58" />
    </g>
  );
};

export const ShotChairScreens: React.FC<{ jacket?: boolean; tags?: boolean }> = ({ jacket, tags }) => (
  <StoryShot from={1.0} to={1.06} originX={960} originY={560} vignette={0.6}
    lighting={<Lighting ambient="#3A3E60" lights={[{ x: 960, y: 560, r: 460, ry: 520, color: "#FFF0DC", intensity: 1, glow: 0.25 }, { x: 960, y: 300, r: 1000, ry: 300, color: "#9BFFB0", intensity: 0.5, glow: 0.3 }]} />}
    overlay={tags ? <><DateTag text="November 12, 2026" delay={2} /><PlaceTag text="Capitol Hill · Santa Clara" delay={8} /></> : undefined}
  >
    <ScreenWall />
    <Chair x={960} y={960} jacket={jacket} />
  </StoryShot>
);

/* ---------------- The nameplate changes ---------------- */
const Plate: React.FC<{ y: number; rot?: number; top: string; name: string; old?: boolean }> = ({ y, rot = 0, top, name, old }) => (
  <g transform={`translate(${PLATE.x} ${y}) rotate(${rot})`}>
    <rect x={-330} y={-100} width={660} height={200} rx={14} fill={old ? "#9A8E70" : "#D4A84A"} stroke={INK} strokeWidth={7} />
    <rect x={-310} y={-80} width={620} height={160} rx={8} fill="none" stroke={old ? "#7A6E50" : "#F5D88A"} strokeWidth={4} />
    <text x={0} y={-16} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill="#3A2A10" letterSpacing={6}>{top}</text>
    <text x={0} y={52} textAnchor="middle" fontFamily={HAND_FONT} fontSize={60} fill="#3A2A10">{name}</text>
  </g>
);

const doorLights = (
  <Lighting ambient="#3A3E5A" lights={[{ x: PLATE.x, y: PLATE.y, r: 560, ry: 320, color: "#FFF0C8", intensity: 1, glow: 0.2 }]} cones={[{ x: PLATE.x, y: 0, topW: 120, bottomW: 900, h: 700, color: "#FFF0C8", opacity: 0.12 }]} />
);

export const ShotResigns: React.FC = () => {
  const frame = useCurrentFrame();
  const fall = interpolate(frame, [40, 56], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return (
    <StoryShot from={1.0} to={1.05} originX={PLATE.x} originY={PLATE.y} lighting={doorLights} vignette={0.5} overlay={<Source text="Source: The Washington Post; CNN" />}>
      <GlassDoor />
      <Plate y={PLATE.y + fall * 560} rot={fall * 28} top="CEO" name="JENSEN HUANG" />
    </StoryShot>
  );
};

export const ShotInterim: React.FC = () => {
  const p = usePop(4, 12);
  return (
    <StoryShot from={1.0} to={1.05} originX={PLATE.x} originY={PLATE.y} lighting={doorLights} vignette={0.5} overlay={<Source text="Source: The Washington Post; CNN" />}>
      <GlassDoor />
      <g transform={`translate(0 ${(1 - p) * -300})`} opacity={p}><Plate y={PLATE.y} top="INTERIM CEO" name="COLETTE KRESS" /></g>
      <rect x={PLATE.x - 150} y={PLATE.y + 130} width={300} height={56} rx={8} fill="#FBF7EE" stroke={INK} strokeWidth={4} />
      <text x={PLATE.x} y={PLATE.y + 168} textAnchor="middle" fontFamily={HAND_FONT} fontSize={32} fill={INK}>(was: finance chief)</text>
    </StoryShot>
  );
};

/* ---------------- Your $600 slice ---------------- */
export const ShotSlice: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [6, 30], [0, 6], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <ExplainShot from={1.0} to={1.04}>
      <Limbo />
      <text x={700} y={180} textAnchor="middle" fontFamily={HAND_FONT} fontSize={70} fill={INK}>your $10,000 fund</text>
      <Pie x={700} y={600} r={320} pct={pct} />
      <path d="M 790 300 Q 1060 240 1200 380" stroke={INK} strokeWidth={6} fill="none" />
      <text x={1220} y={440} fontFamily={HAND_FONT} fontSize={120} fill="#3E8E3F">$600</text>
      <text x={1220} y={520} fontFamily={HAND_FONT} fontSize={60} fill={INK}>Nvidia slice</text>
    </ExplainShot>
  );
};

export const ShotFiftyDollars: React.FC = () => {
  const frame = useCurrentFrame();
  const gone = interpolate(frame, [14, 40], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const n = 12;
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="−9% × $600 ≈ $54" />}>
      <Limbo color="#E2EDE0" floor="#CFE0CB" />
      {Array.from({ length: n }).map((_, i) => {
        const top = i === n - 1;
        const y = 860 - i * 44 - (top ? gone * 500 : 0);
        return (
          <g key={i} transform={`translate(${760 + (top ? gone * 500 : 0)} ${y}) rotate(${top ? gone * 40 : (rnd(i) - 0.5) * 4})`} opacity={top ? 1 - gone * 0.6 : 1}>
            <rect x={-150} y={-36} width={300} height={40} rx={4} fill="#7BB86F" stroke={INK} strokeWidth={4} />
            <circle cx={0} cy={-16} r={14} fill="#5A9A50" stroke={INK} strokeWidth={3} />
          </g>
        );
      })}
      <text x={760} y={200} textAnchor="middle" fontFamily={HAND_FONT} fontSize={70} fill={INK}>$600 of Nvidia</text>
      <text x={1380} y={420} fontFamily={HAND_FONT} fontSize={130} fill="#C0392B" opacity={gone}>−$50</text>
      {/* lunch clock */}
      <g transform="translate(1500 760)">
        <circle r={110} fill="#FBF7EE" stroke={INK} strokeWidth={8} />
        <path d="M 0 0 L 0 -80" stroke={INK} strokeWidth={10} strokeLinecap="round" />
        <path d="M 0 0 L 56 -20" stroke={INK} strokeWidth={10} strokeLinecap="round" transform={`rotate(${frame * 0.6})`} />
        <text x={0} y={170} textAnchor="middle" fontFamily={HAND_FONT} fontSize={44} fill={INK}>before lunch</text>
      </g>
    </ExplainShot>
  );
};

export const ShotRetirement: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ExplainShot from={1.0} to={1.05}>
      <Limbo color="#F3E3E8" floor="#E2CBD2" />
      <g transform="translate(900 640)">
        <ellipse cx={0} cy={0} rx={330} ry={240} fill="#F4A6B5" stroke={INK} strokeWidth={8} />
        <ellipse cx={330} cy={-20} rx={70} ry={60} fill="#F4A6B5" stroke={INK} strokeWidth={8} />
        <circle cx={350} cy={-30} r={10} fill={INK} />
        <circle cx={320} cy={-30} r={10} fill={INK} />
        <path d="M 150 -200 L 200 -300 L 240 -190" fill="#F4A6B5" stroke={INK} strokeWidth={6} />
        <rect x={-60} y={-250} width={120} height={20} rx={8} fill={INK} />
        {[-200, -60, 60, 200].map((x) => <rect key={x} x={x - 30} y={200} width={60} height={110} rx={14} fill="#F4A6B5" stroke={INK} strokeWidth={6} />)}
        <text x={-20} y={30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={70} fill={INK}>RETIREMENT</text>
      </g>
      {/* a chip riding on top */}
      <GpuCharacter x={820 + Math.sin(frame / 10) * 6} y={410} scale={0.5} expression="worried" arm="down" />
      <text x={1460} y={260} fontFamily={HAND_FONT} fontSize={56} fill="#7A2E3A">the chip war</text>
      <text x={1460} y={330} fontFamily={HAND_FONT} fontSize={56} fill="#7A2E3A">reaches you</text>
    </ExplainShot>
  );
};

/* ---------------- Four sides, four realities ---------------- */
const Panel: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const x = (i % 2) * 960;
  const y = Math.floor(i / 2) * 540;
  const bg = ["#E2D9C5", "#DCE8D6", "#D6E4F0", "#F0DCDC"][i];
  const title = ["Washington hawks", "Nvidia's camp", "Megaspeed", "Beijing"][i];
  const say = ["the wall needs cloud rules", "bans make China build rivals faster", "a lawful commercial cloud", "the spy story is false"][i];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={960} height={540} fill={bg} stroke={INK} strokeWidth={8} />
      <text x={40} y={70} fontFamily={HAND_FONT} fontSize={52} fill={INK}>{title}</text>
      <text x={40} y={500} fontFamily={HAND_FONT} fontSize={40} fill="#6B6458">{say}</text>
      {i === 0 && (
        <g>
          <PaperWall x={520} y={140} w={160} h={300} />
          <g transform={`translate(${300 + (frame % 120) * 4} 140) scale(0.35)`}><CloudShape x={0} y={0} /></g>
          <g transform="translate(260 460) scale(0.55)"><Character {...look("hawk")} x={0} y={0} expression="angry" arm="point" lookX={14} /></g>
        </g>
      )}
      {i === 1 && (
        <g>
          <rect x={420} y={180} width={360} height={240} fill="#9A9690" stroke={INK} strokeWidth={6} />
          <path d="M 420 180 L 480 120 L 540 180 L 600 120 L 660 180 L 720 120 L 780 180" fill="#7A7670" stroke={INK} strokeWidth={6} />
          <text x={600} y={330} textAnchor="middle" fontFamily={HAND_FONT} fontSize={40} fill="#F6F1E7">CHIP FAB · CHINA</text>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${820 + ((frame * 2 + k * 40) % 120)} ${380 - k * 10}) scale(0.9)`}><MiniChip size={50} /></g>)}
          <g transform="translate(220 450)"><GpuCharacter x={0} y={0} scale={0.5} expression="worried" arm="down" /></g>
        </g>
      )}
      {i === 2 && (
        <g>
          <g transform="translate(470 290) scale(0.75)"><CloudShape x={0} y={0} /></g>
          <text x={470} y={290} textAnchor="middle" fontFamily={HAND_FONT} fontSize={42} fill={INK}>commercial cloud</text>
          <path d="M 760 270 l 30 34 l 60 -70" stroke="#3E8E3F" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {i === 3 && (
        <g>
          <path d="M 340 440 L 620 440 L 590 220 L 370 220 Z" fill="#7A2E3A" stroke={INK} strokeWidth={6} />
          <rect x={350} y={200} width={260} height={30} rx={6} fill="#5A3E2B" stroke={INK} strokeWidth={5} />
          <rect x={360} y={110} width={240} height={80} rx={12} fill="#C0392B" stroke={INK} strokeWidth={5} />
          <text x={480} y={168} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#fff">FALSE</text>
        </g>
      )}
    </g>
  );
};

export const ShotFourSides: React.FC<{ focus?: number }> = ({ focus }) => {
  const sources = ["Remote Access Security Act debate", "Jensen at Computex, May 2025", "Megaspeed statement", "China's foreign ministry, via TechCrunch"];
  const p = [0, 1, 2, 3].map((i) => usePop(2 + i * 5, 12));
  if (focus === undefined) {
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
          {[0, 1, 2, 3].map((i) => <g key={i} opacity={p[i]}><Panel i={i} /></g>)}
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center" }}>
          <span style={{ fontFamily: HAND_FONT, fontSize: 64, color: "#fff", background: INK, padding: "10px 36px", borderRadius: 12 }}>4 sides · 4 realities</span>
        </div>
      </AbsoluteFill>
    );
  }
  const cx = (focus % 2) * 960 + 480;
  const cy = Math.floor(focus / 2) * 540 + 270;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Closer s={2} cx={cx} cy={cy}>
        <Stage><Panel i={focus} /></Stage>
      </Closer>
      <Source text={`Source: ${sources[focus]}`} />
    </AbsoluteFill>
  );
};

/* ---------------- The Remote Access Security Act ---------------- */
export const ShotVote: React.FC = () => {
  const frame = useCurrentFrame();
  const yea = Math.round(interpolate(frame, [6, 50], [0, 369], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const nay = Math.round(interpolate(frame, [6, 50], [0, 22], { ...clamp, easing: Easing.out(Easing.cubic) }));
  return (
    <AbsoluteFill style={{ background: "#14182A", fontFamily: HAND_FONT }}>
      <DateTag text="January 2026" delay={2} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 160, textAlign: "center", color: "#C9D4F0", fontSize: 54, letterSpacing: 3 }}>U.S. HOUSE · REMOTE ACCESS SECURITY ACT</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", gap: 160 }}>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 70, color: "#9BFFB0" }}>YEA</div><div style={{ fontSize: 220, color: "#9BFFB0", lineHeight: 1 }}>{yea}</div></div>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 70, color: "#FF6B5A" }}>NAY</div><div style={{ fontSize: 220, color: "#FF6B5A", lineHeight: 1 }}>{nay}</div></div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", color: AMBER, fontSize: 60, opacity: frame > 50 ? 1 : 0 }}>PASSED the House</div>
      <Source text="Source: House Select Committee on the CCP; Akin Gump" />
    </AbsoluteFill>
  );
};

export const ShotCableLicense: React.FC = () => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [18, 23], [0, 1], clamp);
  return (
    <ExplainShot from={1.0} to={1.04}>
      <TwoHouses cable={1} />
      {/* a toll gate on the cable */}
      <g transform="translate(980 470)">
        <rect x={-20} y={-10} width={40} height={300} fill="#C0392B" stroke={INK} strokeWidth={5} />
        <rect x={-120} y={-120} width={240} height={110} rx={10} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
        <text x={0} y={-74} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill={INK}>LICENSE</text>
        <text x={0} y={-30} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill={INK}>REQUIRED</text>
      </g>
      <StampMark x={980} y={230} text="NEW RULE" show={show} size={70} rot={-8} />
    </ExplainShot>
  );
};

/* ---------------- Not dark trucks: Southeast Asia ---------------- */
export const ShotDarkTruck: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 60], [-200, 900], clamp);
  const cross = interpolate(frame, [50, 60], [0, 1], clamp);
  return (
    <StoryShot from={1.0} to={1.05} originX={960} originY={620}
      lighting={<Lighting ambient="#5A6088" lights={[{ x: x + 200, y: 700, r: 420, ry: 220, color: "#FFF3A0", intensity: 1, glow: 0.3 }]} />}
      overlay={<Source text="No such evidence shown (Bloomberg)" />}
    >
      <rect width={1920} height={1080} fill="#20243A" />
      <rect x={0} y={760} width={1920} height={320} fill="#2A2E38" />
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 200} y={900} width={110} height={12} fill="#E1B83F" opacity={0.6} />)}
      <rect x={1500} y={620} width={300} height={140} fill="#3A3F44" stroke={INK} strokeWidth={5} />
      <text x={1650} y={710} textAnchor="middle" fontFamily={HAND_FONT} fontSize={56} fill="#C9D4F0">CHINA</text>
      <g transform={`translate(${x} 700)`}>
        <rect x={-260} y={-200} width={380} height={200} fill="#4A4E5E" stroke={INK} strokeWidth={6} />
        <path d="M 120 -140 L 220 -140 L 260 -60 L 260 0 L 120 0 Z" fill="#4A4E5E" stroke={INK} strokeWidth={6} />
        <path d="M 150 -120 L 210 -120 L 236 -70 L 150 -70 Z" fill="#9FB0E0" stroke={INK} strokeWidth={4} />
        <circle cx={-170} cy={10} r={36} fill="#11141A" stroke={INK} strokeWidth={5} />
        <circle cx={180} cy={10} r={36} fill="#11141A" stroke={INK} strokeWidth={5} />
        <text x={-70} y={-90} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#C9D4F0">TOTALLY NOT CHIPS</text>
      </g>
      <g opacity={cross}>
        <path d="M 560 380 L 1360 1000 M 1360 380 L 560 1000" stroke="#C0392B" strokeWidth={40} strokeLinecap="round" />
      </g>
    </StoryShot>
  );
};

export const ShotToSEA: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePop(40, 10);
  return (
    <ExplainShot from={1.0} to={1.04} overlay={<Source text="Sources: Bloomberg; The Register" />}>
      <MapSea />
      {Array.from({ length: 6 }).map((_, i) => {
        const t = Math.min(1, Math.max(0, (frame - i * 6) / 30));
        const x = interpolate(t, [0, 1], [1900, 760]);
        const y = interpolate(t, [0, 1], [900, 460]) - Math.sin(t * Math.PI) * 120;
        return <Crate key={i} x={x + (i % 3) * 60} y={y + Math.floor(i / 3) * 70} label="GPU" scale={0.4} />;
      })}
      <circle cx={SG.x} cy={SG.y - 20} r={18} fill="#E0453A" stroke={INK} strokeWidth={4} />
      <BigCheck x={1650} y={520} show={c} text="generally allowed" />
    </ExplainShot>
  );
};
