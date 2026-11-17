import React from "react";
import { AbsoluteFill } from "remotion";
import { CAST } from "../cast";
import { Character, CharacterLook, Hair } from "../../../../kit/Character";
import { HAND_FONT, INK } from "../../../../kit/theme";

const OPTIONS: { hair: Hair; label: string; note: string }[] = [
  { hair: "side", label: "Hiện tại", note: "rẽ ngôi, phủ thấp" },
  { hair: "part73", label: "7/3", note: "ngôi lệch nhiều, gọn" },
  { hair: "part64", label: "6/4", note: "ngôi gần giữa hơn" },
];

export const HairCompare: React.FC = () => {
  const jensen = CAST.find((c) => c.id === "jensen");
  const look = (jensen && jensen.kind === "human" ? jensen.look : {}) as CharacterLook;
  return (
    <AbsoluteFill style={{ background: "#EEECE6", fontFamily: HAND_FONT, color: INK }}>
      <div style={{ position: "absolute", left: 70, top: 40, fontSize: 72 }}>Jensen Huang — chọn kiểu tóc</div>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d="M 60 935 L 1860 935" stroke="#D3CFC6" strokeWidth={3} />
        {OPTIONS.map((o, i) => (
          <g key={o.hair}>
            <Character {...look} hair={o.hair} hairColor="#3E3E3E" x={380 + i * 580} y={930} scale={1.05} expression="happy" arm="down" />
          </g>
        ))}
      </svg>
      {OPTIONS.map((o, i) => (
        <div key={o.hair} style={{ position: "absolute", left: 380 + i * 580 - 200, width: 400, top: 965, textAlign: "center" }}>
          <div style={{ fontSize: 44 }}>{o.label}</div>
          <div style={{ fontSize: 30, color: "#55524C" }}>{o.note}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
