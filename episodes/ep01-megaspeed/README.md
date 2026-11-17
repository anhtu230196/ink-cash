# ep01-megaspeed

| | |
|---|---|
| Tiêu đề (EN) | Did $7.5 Billion of Nvidia Chips Get Around America's Wall? (xem `publish/youtube.md`) |
| Dạng | `news` (khung B "How X did Y") |
| Thời lượng mục tiêu | ~17:10 (2,576 từ) |
| Ngày tạo | 2026-11-12 |
| Ngày đăng dự kiến | |
| Trạng thái | kịch bản v5 (cảnh thoại đầy đủ + nhấn nhá giọng đọc) **Tú duyệt 13/11/2026**; bước tiếp: thu giọng ElevenLabs (13 file trong `script/megaspeed.elevenlabs/`) |

## Tiến độ
- [x] 1. Chọn đề tài, góc kể, "bet" của tập
- [x] 2. Nguồn: mục `## SOURCES` cuối `script/megaspeed.script.md`; các nguồn ◻ còn lại là bối cảnh rủi ro thấp, Tú chấp nhận không kiểm thêm
- [x] 3. Kịch bản `script/megaspeed.script.md` → chấm bằng `script_lint.py`
- [x] 4. Xuất bản đọc + file ElevenLabs (`script/megaspeed.read.md`, `script/megaspeed.elevenlabs/`)
- [ ] 5. Thu giọng theo `script/megaspeed.elevenlabs/HUONG-DAN.md` (13 file, giọng Alex, `eleven_v4`): bản chọn của mỗi file → `voice/<tên file>.mp3`
- [ ] 5b. Cắt thành từng câu → `public/ep01-megaspeed/audio/<mã câu>.wav` + `src/timing.json` (theo `lines.tsv`, 356 câu): `python3 -I tools/split_voice.py episodes/ep01-megaspeed <tên file> <bNN>`. Xong: `01_open` (b01, 11 câu), `02a_the-man-with-the-keys` (b02_001–b02_037; chương chia a/b thì truyền khoảng `b02_001-b02_037`), `02b_the-man-with-the-keys` (b02_038–b02_073), `03_the-locked-door` (b03, 33 câu), `04_the-way-around` (b04, 27 câu), `05a_the-approach` (b05_001–b05_036), `05b_the-approach` (b05_037–b05_062), `06_the-pipeline` (b06, 36 câu), `07a_what-they-allegedly-wanted` (b07_001–b07_022), `07b_what-they-allegedly-wanted` (b07_023–b07_050), `08_how-it-came-out` (b08, 18 câu), `09a_the-empty-chair` (b09_001–b09_025), `09b_the-empty-chair` (b09_026–b09_046).
- [x] 6. Dàn nhân vật `src/cast.ts` → `npm run sheets -- ep01-megaspeed` → duyệt `out/characters/_all.jpg`
- [ ] 7. Storyboard & dựng cảnh trong `src/scenes/`, đăng ký ở `src/compositions.tsx`. Xong: B01 (`src/scenes/open/`, `ep01-Open`, 16 cảnh), B02a (`src/scenes/b02/`, `ep01-B02a`, 39 cảnh), B02b (`shotsB.tsx`/`setsB.tsx`, `ep01-B02b`, 36 cảnh), B03 (`src/scenes/b03/`, `ep01-B03`, 34 cảnh), B04 (`src/scenes/b04/`, `ep01-B04`, 27 cảnh), B05a (`src/scenes/b05/`, `ep01-B05a`, 36 cảnh), B05b (`shotsB.tsx`/`setsB.tsx`, `ep01-B05b`, 26 cảnh), B06 (`src/scenes/b06/`, `ep01-B06`, 36 cảnh), B07a (`src/scenes/b07/`, `ep01-B07a`, 22 cảnh), B07b (`shotsB.tsx`, `ep01-B07b`, 28 cảnh), B08 (`src/scenes/b08/`, `ep01-B08`, 18 cảnh), B09a (`src/scenes/b09/`, `ep01-B09a`, 25 cảnh), B09b (`shotsB.tsx`, `ep01-B09b`, 21 cảnh). Không có thẻ tên chương (từ 16/11/2026). Phần dùng chung của mọi chương: `src/scenes/common.tsx` (StoryShot, ExplainShot, Closer, Section).
- [x] 8. Ghép 13 phân đoạn + nhạc nền + SFX: `python3 -I tools/mix_episode.py episodes/ep01-megaspeed` → `out/ep01-megaspeed_full.mp4` (17.7 phút, -14 LUFS). Kế hoạch nhạc và chỗ đặt SFX ở `mix.json`; stem để soát ở `out/mix/`. Ghi nguồn nhạc/SFX CC-BY theo `publish/sfx-credits.md`.
- [x] 9. Thumbnail, tiêu đề, mô tả, nguồn, phụ đề → `publish/` (xem `publish/youtube.md`, 16/11/2026)
- [ ] 10. Đăng, ghi link + số liệu 48 giờ đầu vào bảng dưới

## Sau khi đăng
| Link | Views 48h | CTR | AVD | Ghi chú |
|---|---|---|---|---|

## Ghi chú
- Có cáo buộc pháp lý: mọi câu cáo buộc phải có người nói + `{SRC:n}`.
- Jensen và Alice có thoại trong skit (`# REAL: Jensen, Alice!`, quy tắc `real-people.md`). Giọng của hai người dùng giọng có sẵn của ElevenLabs, không clone giọng thật. Skit có người thật thì gắn nhãn "DRAMATIZATION" ở góc dưới phải (`<Dramatization />` trong `kit/look/cinematic.tsx`).
- Paper Billions đã làm cùng đề tài (video 3, 2026-11-10) — xem `research/channels/paperbillions/`.
- `script/megaspeed.gemini.script.md` (v2) và `script/megaspeed.gemini-v4.script.md` là bản Gemini thô; `script/megaspeed.v3.script.md` là bản eli5 cũ. Chỉ sửa `script/megaspeed.script.md`.
- Tiêu đề, mô tả, mốc chương: `publish/youtube.md`.
- `script/megaspeed.v4-short-skits.script.md`: bản v4 trước khi viết lại hội thoại (skit ngắn, không có cảnh nhận nhiệm vụ).
