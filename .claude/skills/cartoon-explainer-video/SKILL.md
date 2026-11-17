---
name: cartoon-explainer-video
description: Làm video YouTube hoạt hình 2D giải thích chuyện tiền và công ty (13–20 phút, tiếng Anh, khán giả Mỹ), gồm dạng "The Rise of X Explained Like You're 5" và dạng giải thích tin nóng kiểu phim tài liệu — chọn đề tài và thời điểm đăng, nghiên cứu, storyboard, phong cách hình (hoạt hình phẳng + ánh sáng điện ảnh, nhãn tài liệu), dựng animation bằng code (Remotion + SVG, nhân vật tham số hoá, khớp khẩu hình), tiêu đề, thumbnail và mô tả. Dùng khi Tú nhờ lên ý tưởng, chọn đề tài, làm storyboard, thiết kế visual/ánh sáng/nhân vật cho kênh, dựng cảnh, làm thumbnail, lên kế hoạch đăng, hoặc phân tích thêm video/kênh YouTube mẫu để bổ sung skill.
---

# Video hoạt hình giải thích chuyện tiền và công ty

Skill này rút ra từ việc đo và phân tích hai kênh mẫu:
- `references/analysis-H5GYXhpE5yI.md`: Crayon Capital, dạng "The Rise of X Explained Like You're 5", hình phẳng.
- `references/analysis-eS1zZKHFzwE.md`: Crayon Capital làm tin nóng (14/11/2026): khung "chuyện ai cũng biết → hai chỗ không khớp → lần theo món hàng", đạo cụ bằng chứng, dẫn nguồn ngay trên hình.
- `references/analysis-paperbillions.md`: Paper Billions, dạng giải thích tin nóng, hình có ánh sáng điện ảnh; kèm phân tích vì sao kênh lên nhanh.

Mục tiêu là học **thể loại và kỹ thuật**, không sao chép kênh gốc: dùng tên kênh, nhân vật, nét vẽ và giọng riêng của Tú; không lấy lại kịch bản, hình hay nhạc của kênh mẫu.

**Hướng hình mặc định từ 13/11/2026**: hoạt hình phẳng + ánh sáng điện ảnh + nhãn tài liệu, theo `references/visual-style-cinematic.md`. Đọc file đó trước khi storyboard hoặc dựng bất kỳ cảnh nào.

## Thông số đích

| Mục | Giá trị |
|---|---|
| Độ dài | 13–20 phút (tin nóng 14–15 phút; chuyện dài tới 20) |
| Lời đọc | 150–158 từ/phút → 2,100–3,100 từ |
| Độ dài cảnh | trung vị 2.6–3.4 giây (tin nóng: 2.6); 90% số cảnh dưới 6.5 giây; 2 phút đầu 34–52 lần cắt; phần thân 17–26 lần cắt/phút |
| Số cảnh | 230–350 cho 15–20 phút; gần như 1–2 câu đổi bối cảnh một lần |
| Thẻ chữ đen | 1.2–3.1 thẻ/phút, chiếm 4–13% thời lượng, trung vị 2 giây/thẻ (video tin nóng mới nhất của Crayon Capital chỉ còn 1.2 thẻ/phút; thay bằng cảnh bằng chứng) |
| Skit hoặc trích dẫn | 1 lần mỗi 30–45 giây |
| Độ tối | cảnh truyện tối và có nguồn sáng; xen cảnh giải thích nền sáng |
| Sponsor | kênh mới chưa có; khi có: mốc 30–38%, 60–80 giây, vào bằng một câu thoại trong mạch truyện, nhắc lại 10 giây ở cuối |
| Âm lượng master | -14 đến -16 LUFS |

## Quy trình

### 1. Chọn đề tài
**Dạng "The Rise of X"**, đạt ≥ 4/5: (a) có **con số hiện tại gây sốc** để mở (định giá, doanh thu, IPO, sụp đổ); (b) có **một nhân vật trung tâm** với vết thương/động lực rõ; (c) có **ít nhất 2 lần rơi xuống đáy**; (d) có **một luận đề / cuộc cược** nói được trong 1 câu; (e) đang là thời sự (sự kiện trong 1–3 tháng).

**Dạng tin nóng**, đạt ≥ 4/5: (a) sự kiện xảy ra trong 7 ngày qua và mình đăng được trong 1–3 ngày; (b) có **một con số** đặt lên thumbnail; (c) tiêu đề viết được thành đúng câu người ta đang gõ tìm ("Why X Just…", "How X…"); (d) nối được về **ví của người xem** (quỹ chỉ số, hoá đơn, việc làm); (e) thuộc **cụm đề tài của kênh** và dùng lại được nhân vật, bối cảnh đã có.

Giữ kênh trong một cụm đề tài (hiện là tiền của ngành AI: Nvidia, các phòng thí nghiệm AI, chip, bong bóng) để video sau kéo người xem của video trước. Trước khi chốt, tìm trên YouTube xem kênh lớn nào đã làm cùng đề tài trong tuần; nếu có, chọn góc "chuyện gì xảy ra tiếp theo" hoặc mốc tin kế tiếp thay vì kể lại.

### 2. Nghiên cứu
- Lập dòng thời gian có ngày tháng, con số, nguồn. Mỗi con số trong kịch bản phải có nguồn; lưu vào file `research/<slug>.md` và một Google Doc nguồn để dán link vào mô tả.
- Tìm: tuổi thơ / gia đình, bước ngoặt cá nhân, xung đột với người quyền lực, khủng hoảng, quyết định gây tranh cãi, hiện trạng + 2 phe tranh luận, 1 câu trích dẫn để kết.
- Đánh dấu chỗ nào là **tái hiện bằng thoại hư cấu** (skit) để không trình bày như lời nói thật; giữ disclaimer ở mô tả.

### 3. Kịch bản
Dùng skill **`eli5-story-script`**: beat sheet, kỹ thuật viết, các loại gag, đoạn sponsor, định dạng `episodes/<tập>/script/<slug>.script.md` và linter `script_lint.py`. Kịch bản phải qua linter trước khi làm storyboard. Linter xuất luôn `lines.tsv` cho bước tạo giọng (mục 6).

### 4. Storyboard
Xuất bảng `storyboard/<slug>.csv` với cột: `id, start, dur_s, line, shot_type, scene_desc, characters, text_on_screen, sfx, motion`.
- `shot_type`: `char-medium`, `char-closeup`, `two-shot-dialogue`, `wide-location`, `low-angle`, `top-down`, `pov-viewfinder`, `split-panel`, `explainer-limbo` (nền trơn sáng cho ví von), `evidence` (giấy tờ, tweet, email, ảnh), `number` (một con số lớn), `chart`, `map`, `ui-mock`, `chapter-card`, `black-card`, `logo-character`, `screen-recording` (chỉ cho sponsor).
- `motion`: `slow-zoom-in` (mặc định), `slow-pan`, `whip-in`, `whip-out`, `flash-montage`, `pop-in`, `typewriter-text`, `xray-reveal`, `shake`. Không dùng `static`.
- Thêm ba cột: `mood` (dòng nào trong bảng kịch bản màu), `lights` (nguồn sáng nhìn thấy được: lamp, candle, window, monitor, neon), `tags` (lower-third, place, date, clock, quote).
- Mỗi chương có một bối cảnh "nhà" quay lại nhiều lần, nhưng hai cảnh liền nhau phải khác bối cảnh hoặc khác cỡ cảnh. Cảnh truyện tối xen với cảnh giải thích sáng.

### 5. Hình ảnh
Có hai hướng. **Mặc định là dựng bằng code** (Remotion + SVG), xem `references/remotion-pipeline.md`; mỗi video là một thư mục `episodes/epNN-slug/` trong dự án chung ở gốc, tạo bằng `npm run new -- NN slug`. Hướng này cho nhân vật cử động thật và miệng khớp giọng, không tốn tiền ảnh. Điểm yếu: nét vẽ sạch kiểu vector, bối cảnh đơn giản hơn bản gốc. Hướng thứ hai là AI vẽ ảnh tĩnh (Midjourney/Flux/GPT-image…) cho phông nền chi tiết, đặt nhân vật SVG lên trên; chỉ dùng khi Tú muốn bối cảnh giàu chi tiết hơn.

Phong cách (áp dụng cho nét vẽ riêng của Tú, giữ đồng nhất toàn kênh). Chi tiết, bảng màu theo tâm trạng và cách dùng bộ component ánh sáng ở `references/visual-style-cinematic.md`:
- Hình vẫn 2D phẳng, viền đen đậm; nhân vật đầu tròn to, thân con nhộng, tay chân nét que mảnh, mắt chấm. Người thật nhận ra bằng kiểu tóc + kính + một món đồ đặc trưng.
- Vẽ cảnh bằng màu ban ngày, rồi phủ lớp ánh sáng: `Lighting` (tối nền + vùng sáng + quầng), `Rim`, `ContactShadow`, `Defocus` cho phông xa, `Vignette`, `Grain`. Mặt nhân vật là chỗ sáng nhất khung.
- Nhãn tài liệu: thẻ tên người (`LowerThird`), địa điểm (`PlaceTag`), ngày (`DateTag`), Màu nhấn của kênh: hổ phách `#F2B544`.
- Cảnh bằng chứng dùng đạo cụ giấy tờ (hồ sơ, bảng ghim, sơ đồ tổ chức, sổ, bản đồ có ghim) và **ghi nguồn của cáo buộc ngay trên hình**; danh mục ở `references/visual-style-cinematic.md` mục 11.
- Người vô danh vẽ đơn giản và nhạt hơn hẳn người có tên, để mắt người xem tìm ngay nhân vật thật.
- Font viết tay cho bóng thoại, nhãn, thẻ chữ; thẻ chữ = nền đen + chữ trắng.
- Logo/công ty → nhân vật (quả cầu có mặt, robot có logo ở ngực); sản phẩm số → UI vẽ lại.
- Tạo **character sheet** (trước/nghiêng/3 biểu cảm) cho mỗi nhân vật trước khi vẽ cảnh, để giữ đồng nhất.
- **Theo độ tuổi**: nhân vật xuất hiện ở nhiều thời điểm (hồi tưởng, "33 năm sau") thì khai báo `born` + `eras` trong cast và chọn bằng `lookAt(entry, năm)`; nhân vật hư cấu dùng `ageLook(look, tuổi)`. Tóc bạc, độ phồng tóc, nếp nhăn, cỡ người và quy tắc cho người thật ở `references/characters-by-age.md`. Kiểm bằng composition `AgeSheet`.
- Khi viết prompt cho AI vẽ hình: mô tả phong cách bằng các đặc điểm trên, không ghi tên kênh mẫu.

### 6. Âm thanh
- Lời kể 1 giọng chính; mỗi nhân vật skit 1 giọng khác. Tách mỗi câu thành 1 file để thời lượng shot tính tự động từ file giọng.
- Giọng tạm khi dựng thử: `bash .claude/skills/cartoon-explainer-video/scripts/make_voice.sh episodes/<tập>` (đọc `episodes/<tập>/lines.tsv`, dùng macOS `say`, ghi `public/<tập>/audio/*.wav` và `episodes/<tập>/src/timing.json`). Bản thật làm bằng ElevenLabs theo skill **`elevenlabs-voice`** (chọn giọng, thiết lập v4, thẻ cảm xúc, tạo theo đoạn rồi cắt về từng dòng), giữ nguyên tên file và `timing.json`.
- Nhạc nền đổi theo chương; SFX cho mỗi gag và mỗi pop-in.
- Master -14 đến -16 LUFS: `ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11 out.wav`.
- Ghép cả tập + trộn nhạc/SFX: viết `episodes/<tập>/mix.json` (nhạc theo chương, nhạc skit đè lên, tiếng nền, SFX theo mã câu như `"b03_029@start+1.2"`), rồi chạy `python3 -I tools/mix_episode.py episodes/<tập>`. Công cụ cân mọi file về cùng độ to, ép nhạc xuống dưới lời đọc (side-chain), nối hình theo từng khung, master -14 LUFS và báo nhạc nằm dưới lời bao nhiêu dB.
- Mức đã thử ở ep01 (lời ≈ -15 LUFS trước master): nhạc nền -23, nhạc skit -24, tiếng nền -35, SFX -27 (riêng tiếng rơi đúng lúc có lời thì -30 đến -32); duck threshold 0.025, ratio 3.5, attack 25 ms, release 700 ms. Kết quả: nhạc thấp hơn lời ~21 dB khi đang nói, ~14 dB ở chỗ nghỉ; không SFX nào to hơn lời. Skit ngắn dưới 6 giây giữ nhạc chương, không đổi bài.

### 7. Dựng
- Dựng bằng code theo các bước trong `references/remotion-pipeline.md`: viết shot → `tsc` → soát ảnh tĩnh từng shot → render → chuẩn hoá âm lượng → kiểm tra khẩu hình. Luôn chạy Remotion với `--port=3917` (cổng 3000 trên máy Tú đã bị chiếm).
- Luôn tự xem ảnh tĩnh trước khi render cả video; lỗi hay gặp là bóng thoại đè chữ trên phông, nhãn đè đồ vật, tóc che lông mày.
- Dựng theo storyboard; 2 phút đầu cắt gấp đôi tốc độ.
- Mọi cảnh phải có chuyển động nhẹ (zoom/pan 3–7%). Đổi địa điểm hoặc thời gian thì dùng `Whip` (lia nhanh 5–6 khung hình).
- Chèn thẻ đen ở các câu chốt và câu luận đề. **Không hiện chữ tên chương** (từ 16/11/2026, Tú quyết định): mỗi chương mở thẳng vào cảnh đầu, không dùng `ChapterCard`; ngày và địa điểm vẫn dùng `DateTag`/`PlaceTag`.
- Trước khi render, soát từng cảnh theo danh sách 6 câu ở cuối `references/visual-style-cinematic.md`.
- Kiểm tra bằng `scripts/analyze_youtube.sh` trên bản xuất (hoặc chạy các lệnh ffmpeg trong đó với file local) để so số đo với bảng thông số đích.

### 8. Đăng
- Tiêu đề dạng Rise: "The Rise of [X] Explained Like You're 5". Tiêu đề dạng tin nóng: đúng câu người ta gõ tìm ("Why [X] Just [Y]", "How [X] [làm được Y]"). Crayon Capital giữ đuôi thương hiệu cả cho tin nóng ("[Tên người] Scandal Explained Like You're 5"); kênh mình chưa có đuôi quen thuộc nên ưu tiên câu tìm kiếm, và đặt một **tên phim riêng** trên thẻ tựa trong video.
- Màn kết: lời kể giới thiệu một video cũ của kênh như một phần luận điểm, 30–40 giây trước khi hết; sau thẻ trích dẫn là hình người dẫn chỉ vào thumbnail video đó.
- Thumbnail: theo `references/thumbnails.md` (công thức rút từ Crayon Capital ngày 17/11/2026, có code mẫu). Tóm tắt:
  - 1–2 từ chữ trắng rất đậm dọc mép trên, là tên chủ thể hoặc một con số.
  - Host của kênh ở góc trái dưới, phản ứng (mắt to, há miệng).
  - Chủ thể ở giữa, ngược sáng, biểu cảm mạnh.
  - Một vật kể chuyện; phông tối đầy chi tiết có một nguồn sáng; một điểm đỏ.
  - Soát ở cỡ rộng 246 px.
- Mô tả: câu tóm tắt chứa từ khoá → đoạn 3 câu → **một câu hỏi mời bình luận** → mốc chương có tên → "Figures as of <ngày>, from reporting by <các nguồn>" → disclaimer.
- Thời điểm: video tin nóng đăng trong 1–3 ngày sau sự kiện. Nhịp kênh mẫu là 2–3 ngày một video; cuối mỗi video nêu mốc ngày sắp tới để nối sang video sau.

## Thêm video mẫu
Khi Tú gửi link mới:
```bash
bash .claude/skills/cartoon-explainer-video/scripts/analyze_youtube.sh "<url>" "<thư mục scratchpad>/yt_<id>"
```
Sau đó đọc `stats.txt`, các `sheet_*.jpg`, transcript `.tsv`; viết `references/analysis-<id>.md` theo cùng mục lục với file phân tích #1; cập nhật bảng **Thông số đích** và quy tắc ở trên nếu video mới cho thấy khác biệt có hệ thống. Không lưu transcript đầy đủ hay video vào thư mục skill.
