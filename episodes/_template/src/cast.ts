// Dàn nhân vật của tập __ID__. Xem mẫu đầy đủ ở episodes/ep01-megaspeed/src/cast.ts.
import { Expression, SKIN } from "../../../kit/Character";
import { CastEntry } from "../../../kit/cast";

const STD: [Expression, Expression, Expression] = ["neutral", "smug", "worried"];

export const CAST: CastEntry[] = [
  {
    id: "host", kind: "human", name: "Host", role: "Hư cấu · nhân vật mẫu, thay bằng vai thật của tập",
    look: { outfit: "suit", color: "#2E3A57", tie: "#F2B544", hair: "curly", hairColor: "#2B2622", glasses: true, skin: SKIN.light },
    pose: "wave", moods: STD,
  },
];
