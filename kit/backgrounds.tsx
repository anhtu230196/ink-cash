import React from "react";
import { C, HAND_FONT, INK, STROKE } from "./theme";

const s = { stroke: INK, strokeWidth: STROKE, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const Office: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1920} height={830} fill={C.wall} />
    <rect x={0} y={830} width={1920} height={250} fill={C.floor} />
    <path d="M 0 830 L 1920 830" {...s} />
    <rect x={0} y={808} width={1920} height={22} fill="#B5B1A8" />
    {/* window */}
    <rect x={1260} y={150} width={430} height={330} fill={C.sky} {...s} />
    <path d="M 1300 300 q 30 -40 70 -10 q 30 -30 60 0 q 20 20 -10 30 l -110 0 q -30 -5 -10 -20 Z" fill="#fff" stroke={INK} strokeWidth={4} />
    <path d="M 1475 150 L 1475 480 M 1260 315 L 1690 315" {...s} />
    <rect x={1240} y={480} width={470} height={24} fill="#EDEBE6" {...s} />
    {/* clock */}
    <circle cx={300} cy={210} r={64} fill="#fff" {...s} />
    <path d="M 300 210 L 300 168 M 300 210 L 330 225" {...s} strokeWidth={5} />
    {/* bookshelf */}
    <rect x={110} y={380} width={280} height={450} fill={C.wood} {...s} />
    {[490, 600, 710].map((yy) => <path key={yy} d={`M 110 ${yy} L 390 ${yy}`} {...s} />)}
    {[[130, 400, "#B5483A"], [168, 410, "#3E6B4F"], [200, 395, "#D8A748"], [242, 405, "#4A6FA5"], [130, 512, "#4A6FA5"], [175, 520, "#B5483A"], [214, 515, "#E9E4D8"], [300, 625, "#3E6B4F"], [338, 630, "#D8A748"]].map(([bx, by, col], i) => (
      <rect key={i} x={bx as number} y={by as number} width={34} height={(by as number) < 450 ? 488 - (by as number) : (by as number) < 560 ? 598 - (by as number) : 708 - (by as number)} fill={col as string} stroke={INK} strokeWidth={4} />
    ))}
    {/* desk + laptop */}
    <path d="M 820 650 L 880 560 L 1010 560 L 1000 650 Z" fill="#555" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={760} y={650} width={640} height={40} fill={C.wood} {...s} />
    <path d="M 790 690 L 790 830 M 1370 690 L 1370 830" {...s} strokeWidth={10} />
    <path d="M 1150 650 l 20 -60 l 40 0 l -10 60 Z" fill="#fff" stroke={INK} strokeWidth={4} />
  </g>
);

export const CafeBack: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1920} height={1080} fill="#D9C4A6" />
    {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M ${i * 130 + 40} 0 L ${i * 130 + 40} 700`} stroke="#CDB696" strokeWidth={18} />)}
    {/* chalkboard menu */}
    <rect x={1130} y={95} width={600} height={340} fill="#2F4A3A" stroke={C.woodDark} strokeWidth={22} />
    <rect x={1130} y={95} width={600} height={340} fill="none" {...s} />
    <text x={1430} y={180} textAnchor="middle" fontFamily={HAND_FONT} fontSize={64} fill="#F3F1E8">MENU</text>
    <text x={1190} y={265} fontFamily={HAND_FONT} fontSize={48} fill="#F3F1E8">Coffee ........ $3</text>
    <text x={1190} y={340} fontFamily={HAND_FONT} fontSize={48} fill="#F3F1E8">Refund ........ no</text>
    <path d="M 1190 365 q 60 12 120 0" stroke="#F3F1E8" strokeWidth={3} fill="none" opacity={0.6} />
    {/* shelf with mugs */}
    <path d="M 140 330 L 620 330" {...s} strokeWidth={14} stroke={C.woodDark} />
    {[180, 270, 360, 450, 540].map((mx, i) => (
      <g key={mx}>
        <rect x={mx} y={268} width={52} height={60} rx={8} fill={["#fff", C.brandOrange, "#4A6FA5", "#fff", "#3E6B4F"][i]} stroke={INK} strokeWidth={4} />
        <path d={`M ${mx + 52} 284 q 22 4 0 28`} stroke={INK} strokeWidth={4} fill="none" />
      </g>
    ))}
    {/* plant */}
    <path d="M 250 760 L 330 760 L 318 840 L 262 840 Z" fill={C.brandOrange} {...s} />
    <path d="M 290 760 q -60 -80 -40 -150 M 290 760 q 10 -120 60 -160 M 290 760 q 50 -60 90 -60" stroke="#3E6B4F" strokeWidth={14} fill="none" strokeLinecap="round" />
    <rect x={0} y={840} width={1920} height={240} fill="#8B7B69" />
    <path d="M 0 840 L 1920 840" {...s} />
  </g>
);

export const CafeCounter: React.FC = () => (
  <g>
    {/* espresso machine sits on the counter, right of Leo */}
    <rect x={1500} y={510} width={230} height={190} rx={14} fill="#B8BCBF" {...s} />
    <rect x={1530} y={540} width={170} height={50} rx={8} fill="#62686C" stroke={INK} strokeWidth={4} />
    <path d="M 1580 610 L 1580 650 M 1650 610 L 1650 650" {...s} />
    <rect x={1565} y={655} width={30} height={40} fill="#fff" stroke={INK} strokeWidth={4} />
    <rect x={880} y={700} width={1040} height={40} fill="#6E4529" {...s} />
    <rect x={900} y={740} width={1020} height={340} fill="#8A5A3B" {...s} />
    {[1060, 1250, 1440, 1630].map((px) => <path key={px} d={`M ${px} 760 L ${px} 1080`} stroke={INK} strokeWidth={4} opacity={0.5} />)}
  </g>
);

export const Spotlight: React.FC = () => (
  <g>
    <defs>
      <radialGradient id="spot" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#C8C6C0" />
        <stop offset="100%" stopColor="#6E6C68" />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill="url(#spot)" />
  </g>
);
