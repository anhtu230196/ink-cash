// Sets and props for B04 · THE WAY AROUND (port + Wi-Fi → the neighbor's long cable → cloud computing → a Malaysian data center → the cloud loophole).
import React from "react";
import { useCurrentFrame } from "remotion";
import { CharacterLook } from "../../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../../kit/theme";
import { NightSky, rnd, s } from "../open/sets";

/* ---------------- Generic looks for the analogy (fictional, not in the cast) ---------------- */
export const KID: CharacterLook = { outfit: "plain", color: "#E0453A", hair: "spiky", hairColor: "#3B2A1E" };
export const MOM: CharacterLook = { outfit: "cardigan", color: "#7A4E8A", color2: "#F3E9D8", hair: "bob", hairColor: "#5A3A22" };
export const NEIGHBOR: CharacterLook = { outfit: "polo", color: "#3E6B4F", color2: "#F3E9D8", hair: "swept", hairColor: "#C9A15B", facialHair: "mustache", facialHairColor: "#C9A15B" };

/* ---------------- Wi-Fi symbol (flies over borders) ---------------- */
export const Wifi: React.FC<{ x: number; y: number; scale?: number; color?: string; rot?: number; opacity?: number }> = ({ x, y, scale = 1, color = "#7DFFB0", rot = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`} opacity={opacity}>
    {[70, 46, 22].map((r) => (
      <path key={r} d={`M ${-r} ${-r * 0.2} A ${r} ${r} 0 0 1 ${r} ${-r * 0.2}`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" transform="translate(0 10)" />
    ))}
    <circle cx={0} cy={18} r={9} fill={color} />
  </g>
);

/* ---------------- Night port: cargo ship, crane, crates on the dock ---------------- */
export const Port: React.FC = () => (
  <g>
    <NightSky h={1080} />
    {/* water */}
    <rect x={0} y={720} width={1920} height={360} fill="#1C2A48" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M ${rnd(i) * 1700} ${760 + i * 36} q 30 -10 60 0 q 30 10 60 0`} stroke="#3B5A86" strokeWidth={5} fill="none" />)}
    {/* ship */}
    <path d="M 120 560 L 1280 560 L 1200 760 L 200 760 Z" fill="#8A2E2A" {...s} />
    <rect x={120} y={540} width={1160} height={28} fill="#E9E2D2" {...s} />
    {Array.from({ length: 14 }).map((_, i) => {
      const col = i % 7;
      const row = Math.floor(i / 7);
      const colors = ["#2D4A8A", "#C0392B", "#3E8E8A", "#E1B83F", "#5E6268"];
      return <rect key={i} x={200 + col * 140} y={420 - row * 110 + 10} width={130} height={110} fill={colors[(i * 3) % 5]} {...s} />;
    })}
    <rect x={1150} y={300} width={110} height={240} fill="#E9E2D2" {...s} />
    {[0, 1, 2].map((i) => <rect key={i} x={1168} y={330 + i * 60} width={74} height={30} fill="#FFE3A8" stroke={INK} strokeWidth={3} />)}
    {/* crane */}
    <path d="M 1500 860 L 1500 180 M 1620 860 L 1620 180 M 1500 180 L 1300 180 L 1900 180" stroke="#C99B2E" strokeWidth={22} fill="none" />
    <path d="M 1500 860 L 1500 180 M 1620 860 L 1620 180 M 1300 180 L 1900 180" stroke={INK} strokeWidth={4} fill="none" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M 1500 ${860 - i * 110} L 1620 ${750 - i * 110}`} stroke="#A07A20" strokeWidth={8} />)}
    {/* dock */}
    <rect x={0} y={860} width={1920} height={220} fill="#4A4E58" {...s} />
    <rect x={0} y={860} width={1920} height={18} fill="#E1B83F" />
  </g>
);

/* ---------------- Generic game console + controller (no brand) ---------------- */
export const Console: React.FC<{ x: number; y: number; scale?: number; glow?: boolean }> = ({ x, y, scale = 1, glow }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {glow && <ellipse cx={0} cy={-40} rx={150} ry={80} fill="#7DC8FF" opacity={0.25} />}
    <rect x={-110} y={-80} width={220} height={80} rx={14} fill="#2B2F36" stroke={INK} strokeWidth={6} />
    <rect x={-90} y={-48} width={110} height={8} rx={4} fill="#11141A" />
    <circle cx={74} cy={-40} r={9} fill={glow ? "#7DC8FF" : "#4A5058"} />
    <rect x={-110} y={-80} width={220} height={14} rx={7} fill="#3B4048" />
  </g>
);

export const Pad: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M -60 -20 Q 0 -32 60 -20 Q 82 20 60 36 Q 44 40 30 20 L -30 20 Q -44 40 -60 36 Q -82 20 -60 -20 Z" fill="#3A3F44" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -42 -6 L -42 14 M -52 4 L -32 4" stroke="#ECE6D8" strokeWidth={6} strokeLinecap="round" />
    <circle cx={36} cy={-2} r={6} fill="#E0453A" />
    <circle cx={50} cy={10} r={6} fill="#F5D547" />
  </g>
);

/* ---------------- The kid's bedroom (bright explainer) ---------------- */
export const BEDROOM_WIN = { x: 1260, y: 230, w: 380, h: 300 };
export const Bedroom: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="#BFD8E8" />
    <rect x={0} y={880} width={1920} height={200} fill="#C79A63" />
    <path d="M 0 880 L 1920 880" stroke={INK} strokeWidth={6} />
    {/* window */}
    <rect x={BEDROOM_WIN.x} y={BEDROOM_WIN.y} width={BEDROOM_WIN.w} height={BEDROOM_WIN.h} fill="#FFE9B8" {...s} />
    <path d={`M ${BEDROOM_WIN.x + BEDROOM_WIN.w / 2} ${BEDROOM_WIN.y} L ${BEDROOM_WIN.x + BEDROOM_WIN.w / 2} ${BEDROOM_WIN.y + BEDROOM_WIN.h} M ${BEDROOM_WIN.x} ${BEDROOM_WIN.y + BEDROOM_WIN.h / 2} L ${BEDROOM_WIN.x + BEDROOM_WIN.w} ${BEDROOM_WIN.y + BEDROOM_WIN.h / 2}`} stroke={INK} strokeWidth={8} />
    {/* bed */}
    <rect x={160} y={700} width={560} height={180} rx={20} fill="#5C7A99" {...s} />
    <rect x={160} y={640} width={150} height={240} rx={18} fill="#8A5A3B" {...s} />
    <rect x={330} y={670} width={170} height={60} rx={24} fill="#F6F1E7" {...s} />
    {/* poster */}
    <rect x={620} y={240} width={220} height={290} rx={8} fill="#F5D547" {...s} />
    <path d="M 660 460 L 730 300 L 800 460 Z" fill="#E0453A" stroke={INK} strokeWidth={4} />
    {/* TV on a low cabinet */}
    <rect x={900} y={760} width={420} height={120} fill="#8A5A3B" {...s} />
    <rect x={930} y={500} width={360} height={240} rx={14} fill="#1E2430" {...s} />
    <rect x={1080} y={740} width={60} height={20} fill="#3A3F44" stroke={INK} strokeWidth={4} />
  </g>
);

export const BanSign: React.FC<{ x: number; y: number; show: number }> = ({ x, y, show }) => (
  <g transform={`translate(${x} ${y}) scale(${show}) rotate(-4)`}>
    <rect x={-170} y={-70} width={340} height={140} rx={14} fill="#FBF7EE" stroke="#C0392B" strokeWidth={10} />
    <text x={0} y={-12} textAnchor="middle" fontFamily={HAND_FONT} fontSize={52} fill="#C0392B">NO GAMES</text>
    <text x={0} y={42} textAnchor="middle" fontFamily={HAND_FONT} fontSize={30} fill={INK}>— MOM</text>
  </g>
);

/* ---------------- Two houses, a long cable between them ---------------- */
export const NB = { x: 220, w: 640 }; // neighbor's house (cutaway)
export const KH = { x: 1140, w: 600, win: { x: 1260, y: 470, w: 200, h: 170 } }; // kid's house
export const CABLE = `M 700 760 C 840 760 860 520 980 470 S 1220 520 ${KH.win.x + 40} ${KH.win.y + 100} L 1390 700`;

export const TwoHouses: React.FC<{ cable: number; consoles?: number; dusk?: boolean }> = ({ cable, consoles = 10, dusk }) => (
  <g>
    <rect width={1920} height={1080} fill={dusk ? "#2C3360" : "#A9D3EE"} />
    <rect x={0} y={880} width={1920} height={200} fill={dusk ? "#2E4A2E" : "#7DB46C"} />
    {/* fence */}
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={900 + i * 36} y={800} width={24} height={90} fill="#F3F1E8" stroke={INK} strokeWidth={4} />)}
    <rect x={890} y={830} width={230} height={14} fill="#F3F1E8" stroke={INK} strokeWidth={4} />
    {/* neighbor: cutaway house full of consoles */}
    <path d={`M ${NB.x - 30} 420 L ${NB.x + NB.w / 2} 230 L ${NB.x + NB.w + 30} 420 Z`} fill="#8A3B32" {...s} />
    <rect x={NB.x} y={420} width={NB.w} height={460} fill="#E9DDC4" {...s} />
    <rect x={NB.x + 30} y={450} width={NB.w - 60} height={400} fill="#3A3550" stroke={INK} strokeWidth={5} />
    {[0, 1, 2].map((r) => <rect key={r} x={NB.x + 40} y={560 + r * 110} width={NB.w - 80} height={14} fill="#8A5A3B" stroke={INK} strokeWidth={3} />)}
    {Array.from({ length: Math.min(10, consoles) }).map((_, i) => {
      const r = i < 4 ? 0 : i < 7 ? 1 : 2;
      const k = i < 4 ? i : i < 7 ? i - 4 : i - 7;
      const n = r === 0 ? 4 : 3;
      return <Console key={i} x={NB.x + 100 + k * ((NB.w - 200) / (n - 1))} y={560 + r * 110} scale={0.5} glow />;
    })}
    {/* kid's house */}
    <path d={`M ${KH.x - 30} 420 L ${KH.x + KH.w / 2} 240 L ${KH.x + KH.w + 30} 420 Z`} fill="#2D4A8A" {...s} />
    <rect x={KH.x} y={420} width={KH.w} height={460} fill="#F3E3C8" {...s} />
    <rect x={KH.win.x} y={KH.win.y} width={KH.win.w} height={KH.win.h} fill={dusk ? "#FFD27A" : "#FFE9B8"} {...s} />
    <path d={`M ${KH.win.x + KH.win.w / 2} ${KH.win.y} L ${KH.win.x + KH.win.w / 2} ${KH.win.y + KH.win.h}`} stroke={INK} strokeWidth={6} />
    <rect x={1540} y={640} width={120} height={240} fill="#8A5A3B" {...s} />
    {/* the cable */}
    <path d={CABLE} stroke={INK} strokeWidth={16} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - cable} strokeLinecap="round" />
    <path d={CABLE} stroke="#E1B83F" strokeWidth={8} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - cable} strokeLinecap="round" />
  </g>
);

/* ---------------- Server rack (humming) ---------------- */
export const ServerRack: React.FC<{ x: number; y: number; scale?: number; seed?: number }> = ({ x, y, scale = 1, seed = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-110} y={-520} width={220} height={520} rx={10} fill="#262A33" stroke={INK} strokeWidth={6} />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={-92} y={-500 + i * 62} width={184} height={48} rx={5} fill="#3A3F4A" stroke={INK} strokeWidth={3} />
          {[0, 1, 2].map((k) => {
            const on = rnd(seed * 97 + i * 7 + k + Math.floor(frame / (5 + k))) > 0.35;
            return <circle key={k} cx={56 + k * 14} cy={-476 + i * 62} r={5} fill={on ? (k === 2 ? "#F5D547" : "#7DFFB0") : "#1A1D24"} />;
          })}
          <path d={`M -76 ${-476 + i * 62} L 10 ${-476 + i * 62}`} stroke="#1A1D24" strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
};

/* ---------------- Cloud with servers inside ---------------- */
export const CloudShape: React.FC<{ x: number; y: number; scale?: number; fill?: string }> = ({ x, y, scale = 1, fill = "#FBF7EE" }) => (
  <path
    transform={`translate(${x} ${y}) scale(${scale})`}
    d="M -300 80 Q -380 80 -380 10 Q -380 -70 -290 -70 Q -280 -170 -160 -170 Q -100 -250 10 -230 Q 120 -270 180 -160 Q 300 -180 320 -70 Q 400 -60 390 20 Q 380 80 300 80 Z"
    fill={fill} stroke={INK} strokeWidth={7} strokeLinejoin="round"
  />
);

export const LaptopIcon: React.FC<{ x: number; y: number; scale?: number; screen?: string }> = ({ x, y, scale = 1, screen = "#7DC8FF" }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-80} y={-110} width={160} height={104} rx={8} fill="#2B2F36" stroke={INK} strokeWidth={5} />
    <rect x={-66} y={-96} width={132} height={76} rx={4} fill={screen} />
    <path d="M -110 0 L 110 0 L 96 -10 L -96 -10 Z" fill="#9AA0A6" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

/* ---------------- Palm tree ---------------- */
export const Palm: React.FC<{ x: number; y: number; scale?: number; lean?: number }> = ({ x, y, scale = 1, lean = 10 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 18 + x) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={`M 0 0 Q ${lean * 2} -200 ${lean * 4} -400`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d={`M 0 0 Q ${lean * 2} -200 ${lean * 4} -400`} stroke="#8A6A45" strokeWidth={24} fill="none" strokeLinecap="round" />
      <g transform={`translate(${lean * 4} -400) rotate(${sway})`}>
        {[-160, -120, -60, -20, 30, 80].map((a, i) => (
          <path key={i} d="M 0 0 Q 90 -60 190 20 Q 100 -20 0 0 Z" transform={`rotate(${a})`} fill="#3E8E4F" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        ))}
      </g>
    </g>
  );
};

/* ---------------- Malaysian data center at night (generic building) ---------------- */
export const DataCenter: React.FC = () => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={880} width={1920} height={200} fill="#22302A" />
    <rect x={380} y={460} width={1160} height={420} fill="#D9DCE0" {...s} />
    <rect x={380} y={460} width={1160} height={40} fill="#9AA0A6" {...s} />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={430 + i * 180} y={540} width={140} height={60} fill="#5E6268" stroke={INK} strokeWidth={4} />)}
    {/* chillers on the roof */}
    {[520, 760, 1000, 1240].map((cx) => (
      <g key={cx}>
        <rect x={cx} y={400} width={140} height={60} fill="#7A8088" stroke={INK} strokeWidth={4} />
        <circle cx={cx + 70} cy={430} r={20} fill="#3A3F44" stroke={INK} strokeWidth={3} />
      </g>
    ))}
    <rect x={860} y={700} width={200} height={180} fill="#3A3F44" {...s} />
    <rect x={700} y={640} width={520} height={44} rx={8} fill="#1E2430" stroke={INK} strokeWidth={4} />
    <text x={960} y={674} textAnchor="middle" fontFamily={HAND_FONT} fontSize={34} fill="#7DFFB0" letterSpacing={6}>DATA CENTER</text>
    <Palm x={220} y={900} scale={1.1} />
    <Palm x={1700} y={900} scale={1.2} lean={-12} />
    <Palm x={1840} y={910} scale={0.8} />
  </g>
);

/* ---------------- Outdoor skit set: rack under palm trees ---------------- */
export const RackYard: React.FC<{ sign?: string }> = ({ sign = "MALAYSIA" }) => (
  <g>
    <rect width={1920} height={1080} fill="#2B3A5C" />
    <rect x={0} y={860} width={1920} height={220} fill="#3B4A3A" />
    <rect x={0} y={860} width={1920} height={10} fill="#56664F" />
    {/* the data-center wall behind */}
    <rect x={0} y={280} width={1920} height={580} fill="#C9CDD2" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M ${i * 260 + 60} 280 L ${i * 260 + 60} 860`} stroke="#AEB3B9" strokeWidth={6} />)}
    <rect x={1260} y={420} width={300} height={70} rx={8} fill="#1E2430" stroke={INK} strokeWidth={4} />
    <text x={1410} y={468} textAnchor="middle" fontFamily={HAND_FONT} fontSize={36} fill="#7DFFB0">{sign}</text>
    <Palm x={110} y={880} scale={1.25} />
    <Palm x={1820} y={880} scale={1.2} lean={-12} />
  </g>
);

/* ---------------- Key (login) ---------------- */
export const KeyIcon: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <circle cx={-40} cy={0} r={30} fill="#E1B83F" stroke={INK} strokeWidth={5} />
    <circle cx={-40} cy={0} r={10} fill="#2B3A5C" stroke={INK} strokeWidth={4} />
    <path d="M -10 -8 L 60 -8 L 60 20 L 46 20 L 46 8 L 34 8 L 34 20 L 20 20 L 20 8 L -10 8 Z" fill="#E1B83F" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

/* ---------------- Paper with a check-mark "answer" ---------------- */
export const AnswerSheet: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-50} y={-64} width={100} height={128} rx={6} fill="#FBF7EE" stroke={INK} strokeWidth={5} />
    {[0, 1, 2].map((i) => <path key={i} d={`M -32 ${-38 + i * 24} L 30 ${-38 + i * 24}`} stroke="#B9B2A4" strokeWidth={5} strokeLinecap="round" />)}
    <path d="M -22 36 L -6 50 L 26 14" stroke="#3E8E3F" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* ---------------- Magnifying glass ---------------- */
export const Magnifier: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = -30 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-14} y={70} width={28} height={140} rx={10} fill="#8A5A3B" stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={0} r={80} fill="#CFE8F5" fillOpacity={0.45} stroke={INK} strokeWidth={10} />
    <path d="M -40 -30 Q -20 -56 14 -58" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

/* ---------------- Big green check (a "legal" stamp) ---------------- */
export const BigCheck: React.FC<{ x: number; y: number; show: number; size?: number; text?: string }> = ({ x, y, show, size = 1, text }) => {
  if (show <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${size * show})`}>
      <circle r={110} fill="#E8F5E2" stroke="#3E8E3F" strokeWidth={12} />
      <path d="M -52 4 L -14 44 L 58 -42" stroke="#3E8E3F" strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {text && <text x={0} y={180} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#3E8E3F">{text}</text>}
    </g>
  );
};

/* ---------------- Singapore at night: generic towers, one tiny lit office ---------------- */
export const TINY_OFFICE = { x: 1180, y: 610, w: 120, h: 80 };
export const CityNight: React.FC = () => (
  <g>
    <NightSky h={1080} />
    <rect x={0} y={960} width={1920} height={120} fill="#141A2C" />
    {Array.from({ length: 13 }).map((_, i) => {
      const w = 110 + rnd(i + 40) * 80;
      const h = 380 + rnd(i + 12) * 420;
      const bx = i * 150 - 20;
      return (
        <g key={i}>
          <rect x={bx} y={1000 - h} width={w} height={h} fill={i % 2 ? "#1A1F33" : "#20263D"} stroke={INK} strokeWidth={4} />
          {Array.from({ length: Math.floor(h / 70) * 2 }).map((_, k) =>
            rnd(i * 17 + k) > 0.75 ? <rect key={k} x={bx + 14 + (k % 2) * (w / 2 - 4)} y={1000 - h + 26 + Math.floor(k / 2) * 70} width={w / 2 - 28} height={26} fill={rnd(i * 5 + k) > 0.85 ? "#C9A35A" : "#56628C"} /> : null,
          )}
        </g>
      );
    })}
    {/* the one lit office */}
    <rect x={TINY_OFFICE.x} y={TINY_OFFICE.y} width={TINY_OFFICE.w} height={TINY_OFFICE.h} fill="#FFD27A" stroke={INK} strokeWidth={4} />
    <rect x={TINY_OFFICE.x + 10} y={TINY_OFFICE.y + 34} width={36} height={46} fill="#2B2F36" />
    <circle cx={TINY_OFFICE.x + 84} cy={TINY_OFFICE.y + 48} r={18} fill="#E1B83F" stroke={INK} strokeWidth={4} />
    <circle cx={TINY_OFFICE.x + 84} cy={TINY_OFFICE.y + 48} r={6} fill={INK} />
  </g>
);
