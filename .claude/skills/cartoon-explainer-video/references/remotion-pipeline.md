# Dựng bằng code: Remotion + SVG

Đã thử thành công ngày 2026-11-12 với cảnh 25 giây "Leo's Coffee" (nay là `episodes/ep00-leo-coffee/`). Từ 2026-11-13 cả kênh là **một dự án Remotion ở gốc** (xem `README.md` gốc): code dùng chung ở `kit/`, mỗi video một thư mục `episodes/epNN-slug/`. Video mới: `npm run new -- NN slug` (copy `episodes/_template/` và đăng ký vào `src/episodes.ts`). Không copy cả dự án nữa.

## Vì sao chọn Remotion + SVG, không dùng Three.js
- Phong cách mục tiêu là 2D phẳng, viền đen. SVG vẽ kiểu này trực tiếp; Three.js là 3D, phải ép camera trực giao, toon shader và outline mới ra được, tốn công mà không đẹp hơn.
- Remotion render theo từng frame bằng React, nên khớp giọng đọc, typewriter và spring chính xác tới từng frame, rồi xuất thẳng ra MP4.
- Chỉ dùng Three.js cho cảnh nào thật sự cần 3D (xoay camera quanh server, võ đài); có thể nhúng bằng `@remotion/three`. Kênh mẫu Paper Billions có vài cảnh 3D thật mỗi video (bay qua dãy nhà, bàn làm việc có phối cảnh, bản đồ có cột phát sáng); mình chưa thử.

## Lớp ánh sáng điện ảnh (13/11/2026)

- Bộ component ở `kit/look/cinematic.tsx`: `Lighting`, `Vignette`, `Grain`, `Defocus`, `Rim`, `ContactShadow`, `LowerThird`, `PlaceTag`, `DateTag`, `ChapterCard`, `Whip`. Cách xếp lớp, tham số và bài học ở `visual-style-cinematic.md` mục 9.
- Cảnh thử: `lab/src/LookDev.tsx` (composition `LookDev` với prop `mode: "flat" | "cine"`, và `LookChapter`). Ảnh so sánh: `lab/out/look/compare.jpg`.
- Render thử:
  ```bash
  npm run render -- lab LookDev --still --frame=45 --props='{"mode":"cine"}'   # → lab/out/LookDev.png
  ```

## Cấu trúc dự án

Sơ đồ đầy đủ ở `README.md` gốc. Tóm tắt:

```
kit/                       dùng chung: Character.tsx, cast.ts (kiểu CastEntry), theme.ts, ui.tsx,
                           backgrounds.tsx, lipsync.ts (useMouth, audioFile), look/cinematic.tsx
episodes/epNN-slug/
  script/ research/ prompts/ publish/ out/
  src/cast.ts              dàn nhân vật của tập
  src/compositions.tsx     mọi composition id bắt đầu bằng "epNN-"
  src/scenes/*.tsx         mỗi shot một component; Full.tsx ghép SHOTS → <Series>, mỗi shot kèm <Audio>
public/epNN-slug/audio/    giọng đọc; gọi bằng staticFile(audioFile("epNN-slug", "n1"))
src/episodes.ts            danh sách tập + dàn nhân vật (new-episode.sh tự thêm dòng)
tools/                     new-episode.sh, render.sh, render-sheets.sh (đã kèm cờ Chrome)
```

## Các khối tái dùng

| Khối | Tham số / cách dùng |
|---|---|
| `Character` | `x, y` (vị trí chân), `scale`, `shirt`, `hair: curly/long/short`, `hairColor`, `glasses`, `tie`, `apron`, `expression: happy/neutral/sad/awkward/smug/disgusted`, `arm: down/wave/hold-cup/shrug/point`, `mouth` (0..1), `lookX`. Tự thở và chớp mắt. Hệ toạ độ: chân ở (0,0), tâm đầu ở (0,-350), đầu r=98, thân rộng 150. Tuổi: `wrinkles` 0–3, `hairVolume` 0..1 (kiểu rẽ ngôi); thời kỳ của người thật qua `born`/`eras` + `lookAt` trong `kit/age.ts` (xem `characters-by-age.md`). |
| `Camera` | Bọc mỗi shot, zoom chậm `from → to` (mặc định 1 → 1.05); `originX/Y` chọn điểm giữ cố định; `shake` rung 10 frame đầu. |
| `BlackCard` | Thẻ nền đen, chữ trắng hiện dần trong 75% thời lượng shot. `maxWidth` 1150 để xuống dòng cân. |
| `DateCard` | Năm lớn + địa điểm nhỏ, bật nảy. |
| `SpeechBubble` | `x, y, w` của khung, `tailX/Y` là điểm đuôi chỉ vào miệng nhân vật. Đặt **ngoài** `Camera` để chữ không bị zoom. |
| `useMouth(id)` | RMS từng frame của file `audio/<id>.wav`, chia cho frame to nhất của chính câu đó, ngưỡng 0.18. |
| `SHOTS` | `{ key, audio, frames: len(id, pad), node }`; `len` = ceil(giây × 30) + số frame đệm. |

## Quy trình

1. Tạo `lines.tsv` từ kịch bản bằng `script_lint.py --tsv` của skill `eli5-story-script` (mỗi dòng 1 câu, id theo beat).
2. Có file ElevenLabs theo đoạn (`episodes/<tập>/voice/<NN_tên>.mp3`): cắt thành từng câu bằng `python3 -I tools/split_voice.py episodes/<tập> <NN_tên> bNN`. Công cụ dùng Whisper tìm từ cuối mỗi câu rồi cắt giữa khoảng lặng, các đoạn nối liền nên giữ nguyên nhịp gốc; in bảng câu/thời điểm để soát. Trong cảnh, mốc cắt hình đặt theo `đầu câu + giây lệch` (xem `episodes/ep01-megaspeed/src/scenes/open/Open.tsx`), nên thu lại giọng thì hình tự chạy theo. Chưa có giọng thật thì sinh giọng tạm bằng `scripts/make_voice.sh`. Bản tạm dùng giọng macOS `say`; bản thật làm bằng ElevenLabs theo skill `elevenlabs-voice`, giữ nguyên tên file và `timing.json`.
3. Viết từng shot trong `scenes.tsx` và thêm vào `SHOTS`.
4. `npx tsc -p .` để kiểm tra kiểu.
5. Soát bố cục bằng ảnh tĩnh: `npm run render -- <tập> <composition> --still --frame=N` (ảnh ra `episodes/<tập>/out/`), ghép lưới bằng ffmpeg `xstack`/`tile` rồi xem.
6. `npm run render -- <tập> epNN-Full` → `episodes/<tập>/out/epNN-Full.mp4`.
7. Chuẩn hoá âm lượng (Remotion xuất ra khoảng -21 LUFS):
   `ffmpeg -i episodes/<tập>/out/epNN-Full.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 -c:a aac -b:a 192k episodes/<tập>/out/epNN-Full_final.mp4`
8. Kiểm tra khẩu hình: cắt vùng miệng trong 1–2 giây thoại, `fps=6,crop=...,tile=4x2`, xem miệng có đóng mở xen kẽ không.

## Bài học khi làm thử

- **13/11/2026: Chrome headless của Remotion bị treo** (`Waiting for root component to load`, kể cả với composition tối giản). Cách chữa: thêm `--browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` vào lệnh `still`/`render` (đã có sẵn trong `tools/_common.sh`, mọi lệnh `tools/*.sh` đều dùng).
- Bộ nhân vật đầy đủ (trang phục, tóc, mũ, tai nghe, râu, đạo cụ, GPU, chó hải quan) nằm ở `kit/Character.tsx`; danh sách vai của từng tập ở `episodes/<tập>/src/cast.ts`; xem lại bằng `npm run sheets -- <tập> [id...]`.

- **Cổng 3000 trên máy Tú đã bị một tiến trình node khác chiếm.** Remotion báo `net::ERR_EMPTY_RESPONSE`. Luôn chạy với `--port=3917`.
- **npm 11 chặn postinstall của esbuild**, nhưng gói `@esbuild/darwin-arm64` vẫn chạy được nên không cần duyệt script.
- **Không dùng `getWaveformPortion` để làm khẩu hình**: biên độ bị chuẩn hoá nên frame nào cũng gần đỉnh, miệng há suốt. Phải tự tính RMS theo frame.
- **Tóc xoăn che lông mày**: các vòng tóc phía trong phải đặt cao (tâm ở y ≈ -445), và lông mày giới hạn trong khoảng x ±44.
- **Nhân vật đứng sau quầy**: đặt chân cao hơn mặt quầy khoảng 140px để lộ cổ áo và tay cầm cốc.
- **Đuôi bóng thoại** phải chỉ tới sát đỉnh đầu nhân vật; khung bóng thoại không được đè lên chữ trên phông nền (bảng menu).
- **Zoom cận một nhân vật** trong cùng bối cảnh: bọc thêm `translate(...) scale(1.7)` với `transformOrigin` ở đầu nhân vật, để không phải vẽ lại phông.
- Giọng `say` nhanh (`-r 185`) vẫn chậm hơn giọng mẫu, nên 20 giây dự kiến thành 25 giây. Với giọng thật, căn lại theo 150 từ/phút.

## Chưa làm
- Nhạc nền và SFX: thêm `<Audio>` ở cấp `Intro` với `volume` thấp cho nhạc, và `<Audio>` trong từng shot cho tiếng pop/whoosh.
- Nét run kiểu vẽ tay: có thể thử SVG filter `feTurbulence` + `feDisplacementMap` với scale nhỏ.
- Phụ đề: chạy Whisper trên bản xuất để tạo `.srt`.
