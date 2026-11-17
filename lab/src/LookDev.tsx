/**
 * Look test: the same shot rendered flat and with the cinematic stack.
 *   npx remotion still build LookDev out/look/flat.png --props='{"mode":"flat"}' --frame=45 --port=3917
 *   npx remotion still build LookDev out/look/cine.png --props='{"mode":"cine"}' --frame=45 --port=3917
 * Shot: B01 hook, "Jensen leaves his office with a box", night.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { CAST } from "../../episodes/ep01-megaspeed/src/cast";
import { Character } from "../../kit/Character";
import { Camera, Stage } from "../../kit/ui";
import { ChapterCard, ContactShadow, Defocus, Grain, Lighting, LowerThird, PlaceTag, Rim, Vignette, Whip } from "../../kit/look/cinematic";
import { INK } from "../../kit/theme";

const s = { stroke: INK, strokeWidth: 6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Deterministic pseudo-random 0..1. */
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const WIN = { x: 1090, y: 120, w: 700, h: 500 };

const Skyline: React.FC = () => {
  const towers = [
    { x: 0, w: 120, h: 300 }, { x: 110, w: 90, h: 210 }, { x: 190, w: 150, h: 380 }, { x: 330, w: 100, h: 260 },
    { x: 420, w: 130, h: 330 }, { x: 540, w: 80, h: 190 }, { x: 610, w: 110, h: 290 },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1030" />
          <stop offset="100%" stopColor="#3A3470" />
        </linearGradient>
        <clipPath id="winClip"><rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} /></clipPath>
      </defs>
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="url(#nightSky)" />
      <g clipPath="url(#winClip)">
        <circle cx={WIN.x + 560} cy={WIN.y + 90} r={38} fill="#F4F1DC" />
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={WIN.x + rnd(i) * WIN.w} cy={WIN.y + rnd(i + 50) * 220} r={1.5 + rnd(i + 9) * 1.8} fill="#fff" opacity={0.5 + rnd(i + 3) * 0.5} />
        ))}
        {towers.map((t, ti) => {
          const top = WIN.y + WIN.h - t.h;
          const cols = Math.floor((t.w - 16) / 22);
          const rows = Math.floor((t.h - 16) / 26);
          return (
            <g key={ti}>
              <rect x={WIN.x + t.x} y={top} width={t.w} height={t.h} fill={ti % 2 ? "#141A38" : "#1B2247"} />
              {Array.from({ length: cols * rows }).map((_, i) => {
                const lit = rnd(ti * 100 + i) > 0.58;
                if (!lit) return null;
                const cx = WIN.x + t.x + 10 + (i % cols) * 22;
                const cy = top + 12 + Math.floor(i / cols) * 26;
                return <rect key={i} x={cx} y={cy} width={13} height={15} fill={rnd(ti * 31 + i) > 0.7 ? "#9FE8FF" : "#FFD98A"} />;
              })}
            </g>
          );
        })}
      </g>
    </g>
  );
};

const NightOffice: React.FC<{ blurFar: boolean }> = ({ blurFar }) => {
  const far = <Skyline />;
  return (
    <g>
      {/* wall + floor, drawn in neutral daylight colours: the Lighting layer makes it night */}
      <rect x={0} y={0} width={1920} height={810} fill="#93A0A8" />
      {[160, 480, 800].map((x) => <path key={x} d={`M ${x} 0 L ${x} 810`} stroke="#86939B" strokeWidth={10} />)}
      <rect x={0} y={770} width={1920} height={40} fill="#6F7B83" {...s} strokeWidth={4} />
      <rect x={0} y={810} width={1920} height={270} fill="#8D7159" />
      {[870, 940, 1010].map((y) => <path key={y} d={`M 0 ${y} L 1920 ${y}`} stroke="#7B614B" strokeWidth={4} />)}
      <path d="M 0 810 L 1920 810" {...s} />

      {/* window */}
      {blurFar ? <Defocus amount={3.5}>{far}</Defocus> : far}
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="none" {...s} strokeWidth={14} stroke="#2A2F3A" />
      <path d={`M ${WIN.x + WIN.w / 2} ${WIN.y} L ${WIN.x + WIN.w / 2} ${WIN.y + WIN.h} M ${WIN.x} ${WIN.y + WIN.h / 2} L ${WIN.x + WIN.w} ${WIN.y + WIN.h / 2}`} stroke="#2A2F3A" strokeWidth={10} />
      <rect x={WIN.x - 26} y={WIN.y + WIN.h} width={WIN.w + 52} height={24} fill="#D9D5CC" {...s} strokeWidth={5} />

      {/* shelf with awards */}
      <rect x={210} y={250} width={420} height={16} fill="#6B4A31" {...s} strokeWidth={5} />
      {[260, 350, 440, 540].map((x, i) => (
        <g key={x}>
          <rect x={x - 18} y={232} width={36} height={18} fill="#3A3F48" stroke={INK} strokeWidth={4} />
          <path d={`M ${x - 22} 170 L ${x + 22} 170 L ${x + 14} 214 L ${x - 14} 214 Z`} fill={["#E1B83F", "#C9CED3", "#E1B83F", "#C98A4B"][i]} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d={`M ${x} 214 L ${x} 232`} stroke={INK} strokeWidth={5} />
        </g>
      ))}

      {/* desk */}
      <rect x={230} y={640} width={700} height={34} fill="#7A5536" {...s} />
      <rect x={260} y={674} width={640} height={170} fill="#6A4A30" {...s} />
      <path d="M 480 690 L 480 830 M 690 690 L 690 830" stroke={INK} strokeWidth={4} opacity={0.5} />
      {/* monitor */}
      <rect x={380} y={430} width={240} height={170} rx={10} fill="#0F1A14" {...s} />
      <path d="M 404 560 L 450 520 L 484 540 L 530 482 L 562 505 L 598 452" stroke="#7CFF6B" strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M 500 600 L 500 640 M 450 640 L 550 640" {...s} />
      {/* desk lamp */}
      <path d="M 842 640 L 842 560 L 790 500" {...s} strokeWidth={8} fill="none" />
      <ellipse cx={842} cy={640} rx={40} ry={9} fill="#2A2F3A" {...s} strokeWidth={5} />
      <path d="M 742 512 L 808 474 L 826 520 L 770 548 Z" fill="#3E6B4F" {...s} strokeWidth={5} />
      <ellipse cx={792} cy={534} rx={22} ry={9} fill="#FFF3C4" transform="rotate(-27 792 534)" />
      {/* papers under the lamp */}
      <path d="M 640 634 L 760 628 L 772 642 L 650 646 Z" fill="#F6F1E7" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

const Box: React.FC<{ x: number; y: number; scale: number }> = ({ x, y, scale }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -104 -206 L 104 -206 L 96 -92 L -96 -92 Z" fill="#C79A63" {...s} strokeWidth={5} />
    <path d="M -104 -206 L -128 -232 L 80 -232 L 104 -206 Z" fill="#B4854F" {...s} strokeWidth={5} />
    <path d="M -30 -206 L -30 -92" stroke={INK} strokeWidth={3} opacity={0.35} />
    {/* things poking out: a plant and a framed photo */}
    <path d="M 40 -232 q -20 -50 -6 -86 M 44 -232 q 18 -40 44 -52" stroke="#3E6B4F" strokeWidth={9} fill="none" strokeLinecap="round" />
    <rect x={-84} y={-286} width={62} height={56} fill="#F6F1E7" stroke={INK} strokeWidth={4} transform="rotate(-8 -52 -258)" />
  </g>
);

const JENSEN = CAST.find((c) => c.id === "jensen");

export const LookDev: React.FC<{ mode: "flat" | "cine" }> = ({ mode }) => {
  const cine = mode === "cine";
  const look = JENSEN && JENSEN.kind === "human" ? JENSEN.look : null;
  const cx = 1040;
  const cy = 1000;
  const sc = 1.12;
  const figure = look ? (
    <g>
      <Character {...look} x={cx} y={cy} scale={sc} expression="sad" arm="down" lookX={-6} prop="none" />
      <Box x={cx} y={cy + 44} scale={sc} />
    </g>
  ) : null;
  const shot = (
    <AbsoluteFill style={{ background: "#000" }}>
      <Camera from={1.02} to={1.07} originX={1000} originY={560}>
        <Stage>
          <NightOffice blurFar={cine} />
          {cine && <ContactShadow x={cx} y={cy - 2} w={190} />}
          {cine ? (
            <Rim x={1560} y={360} color="#B9C8FF" strength={0.7} width={7}>
              <Rim x={700} y={600} color="#FFD9A0" strength={1.2} width={9}>{figure}</Rim>
            </Rim>
          ) : figure}
        </Stage>
        {cine && (
          <Lighting
            ambient="#3D3B66"
            lights={[
              // key light on the face: the character must be the brightest thing in frame
              { x: cx - 70, y: cy - 400, r: 300, color: "#FFE9CC", intensity: 0.9, glow: 0 },
              { x: 770, y: 620, r: 470, ry: 330, color: "#FFDFA8", intensity: 1, glow: 0.32, flicker: 0.015 },
              { x: 500, y: 515, r: 80, rect: { w: 240, h: 170 }, color: "#C4FFBE", intensity: 0.95, glow: 0.28 },
              { x: WIN.x + WIN.w / 2, y: WIN.y + WIN.h / 2, r: 60, rect: { w: WIN.w, h: WIN.h }, color: "#D5DEFF", intensity: 0.95, glow: 0.1 },
              { x: 1400, y: 930, r: 560, ry: 150, color: "#AEBBFF", intensity: 0.5, glow: 0 },
            ]}
            cones={[{ x: 786, y: 540, topW: 50, bottomW: 330, h: 110, color: "#FFE3B8", opacity: 0.3 }]}
          />
        )}
      </Camera>
      {cine && <Vignette strength={0.6} />}
      {cine && <Grain opacity={0.09} />}
      {cine && <LowerThird name="Jensen Huang" role="CEO, Nvidia · 33 years" accent="#F2B544" x={1240} y={850} />}
      {cine && <PlaceTag text="Santa Clara, Calif." />}
    </AbsoluteFill>
  );
  return cine ? <Whip inFrames={6} outFrames={0}>{shot}</Whip> : shot;
};

export const LookChapter: React.FC = () => <ChapterCard title="The Last Day" />;
