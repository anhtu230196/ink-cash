import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CafeBack, CafeCounter, Office, Spotlight } from "./components/backgrounds";
import { CUSTOMER, Character, LEO } from "./components/Character";
import { useMouth } from "./components/lipsync";
import { BlackCard, Camera, SpeechBubble, Stage } from "./components/ui";
import { C, HAND_FONT, INK } from "./theme";

const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 170 } });
};

/** Shot 1 — "This is Leo." Today-Leo, CEO, waving in his office. */
export const S1Office: React.FC = () => {
  const label = usePop(10);
  return (
    <Camera from={1.02} to={1.08} originX={700} originY={560}>
      <Stage>
        <Office />
        <Character x={560} y={980} scale={1.3} shirt="#2E3A57" tie="#B5483A" hair={LEO.hair} hairColor={LEO.hairColor} glasses expression="happy" arm="wave" />
        <g transform={`translate(860 300) scale(${label})`}>
          <text x={20} y={-10} fontFamily={HAND_FONT} fontSize={80} fill={INK}>LEO</text>
          <path d="M 10 10 Q -60 30 -120 110" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M -120 110 l 4 -38 M -120 110 l 34 -14" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        </g>
      </Stage>
    </Camera>
  );
};

/** Shot 2 — valuation chart drawing itself up to $1B. */
export const S2Chart: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [6, durationInFrames * 0.62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const head = usePop(Math.round(durationInFrames * 0.6));
  const stamp = usePop(Math.round(durationInFrames * 0.66));
  const d = "M 420 800 L 640 690 L 780 745 L 1000 560 L 1150 615 L 1400 320";
  const ang = (Math.atan2(320 - 615, 1400 - 1150) * 180) / Math.PI;
  return (
    <Camera from={1} to={1.06} originX={1300} originY={300}>
      <Stage>
        <rect width={1920} height={1080} fill={C.chartBg} />
        {[360, 500, 640, 780].map((y) => <path key={y} d={`M 360 ${y} L 1560 ${y}`} stroke="#fff" strokeWidth={2} opacity={0.12} />)}
        <path d="M 360 240 L 360 860 L 1560 860" stroke="#F3F1E8" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x={420} y={925} fontFamily={HAND_FONT} fontSize={52} fill="#F3F1E8">2016</text>
        <text x={1440} y={925} fontFamily={HAND_FONT} fontSize={52} fill="#F3F1E8">2026</text>
        <g transform="translate(140 130)">
          <path d="M -26 -40 L 26 -40 L 20 14 L -20 14 Z" fill="#fff" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <rect x={-26} y={-18} width={52} height={16} fill={C.brandOrange} stroke={INK} strokeWidth={4} />
          <text x={50} y={8} fontFamily={HAND_FONT} fontSize={56} fill="#F3F1E8">LEO'S COFFEE CO.</text>
        </g>
        <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} stroke={INK} strokeWidth={36} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} stroke={C.green} strokeWidth={22} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <g transform={`translate(1400 320) rotate(${ang}) scale(${head})`}>
          <path d="M 40 0 L -30 -42 L -30 42 Z" fill={C.green} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        </g>
        <g transform={`translate(1300 190) rotate(-6) scale(${stamp})`}>
          <rect x={-230} y={-62} width={460} height={124} rx={14} fill="#fff" stroke={INK} strokeWidth={6} />
          <text x={0} y={26} textAnchor="middle" fontFamily={HAND_FONT} fontSize={80} fill={INK}>$1 BILLION</text>
        </g>
      </Stage>
    </Camera>
  );
};

/** Date card — "2016. Seattle." */
export const DateCard: React.FC<{ year: string; place: string }> = ({ year, place }) => {
  const a = usePop(0);
  const b = usePop(14);
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", fontFamily: HAND_FONT, color: "#fff" }}>
      <div style={{ fontSize: 190, transform: `scale(${a})`, lineHeight: 1 }}>{year}</div>
      <div style={{ fontSize: 72, opacity: b, transform: `translateY(${(1 - b) * 20}px)` }}>{place}</div>
    </AbsoluteFill>
  );
};

/** Shot 5a — customer tastes the coffee (two-shot). */
export const S5Customer: React.FC = () => {
  const mouth = useMouth("d1");
  return (
    <AbsoluteFill>
      <Camera from={1} to={1.04}>
        <Stage>
          <CafeBack />
          <Character x={1250} y={840} shirt={LEO.shirt} apron={LEO.apron} hair={LEO.hair} hairColor={LEO.hairColor} glasses expression="happy" lookX={-8} />
          <CafeCounter />
          <Character x={560} y={1010} scale={1.1} shirt={CUSTOMER.shirt} hair={CUSTOMER.hair} hairColor={CUSTOMER.hairColor} expression="disgusted" arm="hold-cup" mouth={mouth} lookX={8} />
        </Stage>
      </Camera>
      <SpeechBubble x={260} y={300} w={640} text="This tastes like regret." tailX={600} tailY={470} delay={2} />
    </AbsoluteFill>
  );
};

/** Shot 5b — push in on Leo, proud of his recipe. */
export const S5Leo: React.FC = () => {
  const mouth = useMouth("d2");
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: "translate(-290px, 60px) scale(1.7)", transformOrigin: "1250px 520px" }}>
        <Camera from={1} to={1.03} originX={1250} originY={480}>
          <Stage>
            <CafeBack />
            <Character x={1250} y={840} shirt={LEO.shirt} apron={LEO.apron} hair={LEO.hair} hairColor={LEO.hairColor} glasses expression="smug" arm="hold-cup" mouth={mouth} />
            <CafeCounter />
          </Stage>
        </Camera>
      </AbsoluteFill>
      <SpeechBubble x={60} y={260} w={700} text="That's the secret ingredient." tailX={790} tailY={440} delay={2} />
    </AbsoluteFill>
  );
};

/** Shot 6 — close-up, awkward shrug, sweat drop slides down. */
export const S6Closeup: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const dropY = interpolate(frame, [10, durationInFrames], [0, 90], { extrapolateLeft: "clamp" });
  const dropO = interpolate(frame, [6, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Camera from={1.0} to={1.07} originX={960} originY={420}>
      <Stage>
        <Spotlight />
        <Character x={960} y={1345} scale={2.3} shirt={LEO.shirt} apron={LEO.apron} hair={LEO.hair} hairColor={LEO.hairColor} glasses expression="awkward" arm="shrug" lookX={-10} />
        <path d={`M 1180 ${300 + dropY} q 0 0 22 40 a 24 24 0 1 1 -44 0 Z`} fill="#8EC5E6" stroke={INK} strokeWidth={5} opacity={dropO} />
      </Stage>
    </Camera>
  );
};

export { BlackCard };
