import { Expression, SKIN } from "../../../kit/Character";
import { CastEntry } from "../../../kit/cast";
import { SILVER, greyHair } from "../../../kit/age";

const STD: [Expression, Expression, Expression] = ["neutral", "smug", "worried"];
const REAL: [Expression, Expression, Expression] = ["neutral", "happy", "worried"];

export const CAST: CastEntry[] = [
  {
    id: "jensen", kind: "human", real: true, name: "Jensen Huang", role: "Người thật · CEO Nvidia · áo khoác da đen · 2026: 63 tuổi, tóc bạc đầy đầu",
    // Present day (2026, 63): full head of silver hair, age lines, black leather jacket.
    look: { outfit: "leather", color: "#1D1D1D", color2: "#2B2B2B", hair: "part73", hairColor: SILVER, hairVolume: 1, skin: SKIN.light, prop: "chip", wrinkles: 2 },
    pose: "hold", moods: REAL,
    born: 1963,
    eras: [
      // Denny's, 1993 (30): jet-black hair, no lines, no leather jacket yet ("the jacket came later").
      { label: "1993 · 30 tuổi", from: 1980, to: 1999, look: { outfit: "plain", color: "#5C7A99", hairColor: "#1B1B1B", hairVolume: 0.3, wrinkles: 0, prop: "none" } },
      // Early leather-jacket years (2000s–2010s, 37–56): dark hair going salt-and-pepper.
      { label: "2010 · 47 tuổi", from: 2000, to: 2017, look: { hairColor: greyHair("#1B1B1B", 0.35), hairVolume: 0.6, wrinkles: 1 } },
    ],
  },
  {
    id: "alice", kind: "human", real: true, name: "Alice Huang", role: "Người thật · cựu giám đốc Megaspeed · vest xanh than, tóc dài",
    look: { outfit: "blazer", color: "#2E3A57", color2: "#EDE6D6", hair: "long", hairColor: "#2B2622", skin: SKIN.light, prop: "briefcase" },
    pose: "hold", moods: ["neutral", "happy", "worried"],
  },
  {
    id: "unclesam", kind: "human", name: "Uncle Sam", role: "Biểu tượng chính phủ Mỹ · xây bức tường giấy tờ",
    look: { outfit: "coat-sam", color: "#2D4A8A", color2: "#FFFFFF", bowtie: "#C0392B", hair: "short", hairColor: "#F2F2F2", hat: "tophat", facialHair: "big-goatee", facialHairColor: "#F2F2F2", skin: SKIN.light, prop: "papers" },
    pose: "hold", moods: STD,
  },
  {
    id: "official", kind: "human", name: "Official", role: "Hư cấu · quan chức Mỹ với con dấu (skit B03)",
    look: { outfit: "suit", color: "#6B7280", tie: "#C0392B", hair: "side", hairColor: "#5A4632", glasses: true, skin: SKIN.tan, prop: "stamp" },
    pose: "hold", moods: ["neutral", "smug", "angry"],
  },
  {
    id: "salesman", kind: "human", name: "Salesman", role: "Hư cấu · người bán chip ôm hộp (skit B03)",
    look: { outfit: "suit", color: "#8A5A3B", tie: "#E1B83F", hair: "slick", hairColor: "#1F1F1F", skin: SKIN.medium, prop: "chipbox" },
    pose: "hold", moods: ["happy", "smug", "worried"],
  },
  {
    id: "tech", kind: "human", name: "Tech", role: "Hư cấu · kỹ thuật viên trung tâm dữ liệu ở Malaysia (B04)",
    look: { outfit: "polo", color: "#3E8E8A", color2: "#E1B83F", hair: "short", hairColor: "#1F1F1F", hat: "cap", hatColor: "#2E3A57", skin: SKIN.medium, prop: "tablet" },
    pose: "hold", moods: STD,
  },
  {
    id: "investor", kind: "human", name: "Investor", role: "Hư cấu · nhà đầu tư cầm pitch deck (skit B05)",
    look: { outfit: "suit", color: "#2E3A57", tie: "#3E6B4F", hair: "bald", hairColor: "#7A6A5A", glasses: true, skin: SKIN.deep, prop: "deck" },
    pose: "hold", moods: ["surprised", "smug", "worried"],
  },
  {
    id: "investor2", kind: "human", name: "Investor 2", role: "Hư cấu · nhà đầu tư thứ hai (skit B05)",
    look: { outfit: "blazer", color: "#7A2E3A", color2: "#F6F1E7", hair: "bob", hairColor: "#C9A15B", skin: SKIN.light, prop: "cup" },
    pose: "hold", moods: STD,
  },
  {
    id: "analyst", kind: "human", name: "Analyst", role: "Hư cấu · nhà phân tích tình báo đeo tai nghe (skit B07)",
    look: { outfit: "cardigan", color: "#7B8288", color2: "#E9E4D8", hair: "short", hairColor: "#3B2A1E", headphones: true, skin: SKIN.tan, prop: "clipboard" },
    pose: "hold", moods: STD,
  },
  {
    id: "analyst2", kind: "human", name: "Analyst 2", role: "Hư cấu · nhà phân tích thứ hai (skit B07)",
    look: { outfit: "cardigan", color: "#3E6B4F", color2: "#E9E4D8", hair: "bun", hairColor: "#1F1F1F", headphones: true, glasses: true, skin: SKIN.deep, prop: "folder" },
    pose: "hold", moods: STD,
  },
  {
    id: "hawk", kind: "human", name: "Hawk", role: "Hư cấu · chính khách diều hâu an ninh quốc gia (skit B09)",
    look: { outfit: "suit", color: "#23262B", tie: "#C0392B", pin: true, hair: "slick", hairColor: "#9AA0A6", facialHair: "mustache", facialHairColor: "#9AA0A6", skin: SKIN.light },
    pose: "point", moods: ["angry", "smug", "worried"],
  },
  {
    id: "industry", kind: "human", name: "Industry Analyst", role: "Hư cấu · chuyên gia ngành chip, bình tĩnh (skit B09)",
    look: { outfit: "blazer", color: "#5C6B7A", color2: "#2B2B2B", hair: "curly", hairColor: "#2B2622", glasses: true, skin: SKIN.medium, prop: "laptop" },
    pose: "hold", moods: ["neutral", "smug", "worried"],
  },
  { id: "gpu", kind: "gpu", name: "GPU", role: "Hư cấu · con chip biết nói (B02, B06)", color: "#5DB35F", scale: 1, moods: ["neutral", "happy", "worried"] },
  { id: "gpu2", kind: "gpu", name: "GPU 2", role: "Hư cấu · con chip thứ hai, nhỏ hơn (B06)", color: "#3E8E8A", scale: 0.82, moods: ["neutral", "smug", "worried"] },
  { id: "dog", kind: "dog", name: "Customs Dog", role: "Hư cấu · chó hải quan đánh hơi hàng (B04)", moods: ["neutral", "happy", "worried"] },
];
