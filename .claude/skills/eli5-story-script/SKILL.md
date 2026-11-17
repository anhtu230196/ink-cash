---
name: eli5-story-script
description: Viết, sửa và chấm kịch bản tiếng Anh cho video YouTube hoạt hình giải thích chuyện tiền và công ty (10–20 phút, giọng deadpan, nhiều skit thoại), gồm dạng "The Rise of X Explained Like You're 5" (kỹ thuật rút từ Crayon Capital) và dạng giải thích tin nóng "Why X Just Happened / How X Did Y" (rút từ Paper Billions). Dùng khi Tú nhờ lên dàn ý, viết kịch bản, viết phần mở đầu, viết lại một đoạn, thêm gag/skit, lồng sponsor, chấm hoặc rút ngắn kịch bản, hoặc phân tích kịch bản của một video mẫu khác.
---

# Viết kịch bản "Explained Like You're 5"

Skill này lo **chữ**: đề tài → nghiên cứu → dàn ý → kịch bản → chấm. Phần hình và dựng thuộc skill `cartoon-explainer-video`. Kịch bản viết theo định dạng bên dưới thì đưa thẳng vào bước tạo giọng và dựng Remotion được.

Đọc trước khi viết:
- `references/craft.md`: 12 nhóm kỹ thuật (xương sống cuộc cược, chuỗi So/Then/But, thang ELI5, skit, open loop, nhịp câu, con số, đáy vực, kết).
- `references/beat-sheet.md`: 11 beat, ngân sách từ cho 10/15/18 phút, phiếu tìm chất liệu.
- `references/humor.md`: 14 loại gag và mật độ.
- `references/sponsor.md`: đoạn sponsor 7 nhịp.
- `references/example-opening.md`: ví dụ gốc 3 beat đầu đúng định dạng.
- `references/real-people.md`: **cho người thật nói trong skit**: được phép, theo bốn mức xanh/vàng/cam/đỏ, kèm `# REAL:`, `{FRAMED}` và `{DRAMATIZED}` (cảnh diễn lại cáo buộc đã được đưa tin) để linter kiểm.
- `references/news-explainer.md`: **dạng giải thích tin nóng** (sự kiện trong 1–14 ngày qua): khuôn tiêu đề, công thức 40 giây đầu, 5 khung chương (khung D "chuyện ai cũng biết, và hai chỗ không khớp" rút từ video tin nóng của Crayon Capital), 28 kỹ thuật riêng, thông số đích, rào pháp lý. Đề tài là tin đang nóng thì đọc file này trước, và mở đầu file kịch bản bằng `# FORMAT: news` + `# QUESTION:`. Khung E "đi theo một món đồ" dùng cho chuyện có chuỗi nhiều bên hoặc phần tiếp theo của một tin đã kể.

Nguyên tắc nguồn: học **cấu trúc và kỹ thuật**, không chép câu chữ của kịch bản mẫu hay của kênh nào. Mọi câu trong kịch bản mới phải do mình viết.

## Thông số đích (từ kịch bản mẫu)

| Chỉ số | Đích |
|---|---|
| Tốc độ đọc | 150 từ/phút (đoạn kết chậm hơn, khoảng 130) |
| Độ dài dòng | mỗi dòng một cảnh, trung bình 6–10 từ (mẫu: 8.5 từ/cảnh; 9.9 từ/câu); ≥ 12% số dòng ≤ 4 từ; dòng > 16 từ phải có lý do |
| Gag | 1 gag mỗi 30–45 giây, không quãng nào trống quá 60 giây |
| Open loop | không quãng nào quá 120 giây không có `{LOOP}` |
| Cuộc cược | `{BET}` ≥ 3 lần, lần đầu trước phút 5 |
| Con số | 1.5–3 con số/phút, số nào cũng có `{SRC:n}` |
| Câu hỏi | ≥ 1 câu/phút |
| Thẻ ngày | ≥ 0.4 thẻ/phút (mở mỗi chương) |
| Thẻ chữ đen | ≥ 1.5 thẻ/phút |
| Skit | ≥ 8 skit cho 15 phút; ≥ 60% là *cảnh* 6–10 lượt câu trọn vẹn, còn lại là gag nhanh 2–4 lượt (`craft.md` mục 5) |
| Sponsor | hiện không dùng (kênh mới); khi có: bắt đầu ở 25–35% thời lượng |

## Quy trình

1. **Chốt đề tài**: chấm theo 5 tiêu chí trong `cartoon-explainer-video`. Chưa đạt 4/5 thì đề xuất đề tài khác.
2. **Nghiên cứu**: dòng thời gian có ngày, con số, nguồn. Lưu ở `research/<slug>.md`, đánh số nguồn để dùng trong `{SRC:n}`. Ghi rõ chỗ nào là tái hiện hư cấu.
3. **Phiếu chất liệu**: điền 11 ô trong `beat-sheet.md`. Thiếu ô "Cuộc cược" hoặc "Đối thủ có lý" thì chưa viết.
4. **Dàn ý**: mỗi beat 2–4 gạch đầu dòng, kèm ngân sách từ. Gửi Tú duyệt dàn ý trước khi viết đầy đủ nếu đề tài mới.
5. **Viết nháp** theo định dạng bên dưới, một dòng một cảnh.
6. **Ba lượt sửa**:
   - *Lượt nhân quả*: câu đầu mỗi đoạn có nối bằng So/Then/But được không; tìm và xoá "and then".
   - *Lượt hài*: đủ mật độ gag, không 2 gag cùng loại đứng cạnh nhau, mỗi skit kết bằng punchline hoặc câu chốt.
   - *Lượt sự thật*: mọi con số có `{SRC}`, từ rào cho số chưa chắc, thoại của người thật đúng mức xanh/vàng trong `real-people.md`, không có lời tưởng tượng nào trên thẻ trích dẫn.
7. **Chấm bằng linter**:
   ```bash
   python3 -I .claude/skills/eli5-story-script/scripts/script_lint.py episodes/<tập>/script/<slug>.script.md
   ```
   Sửa đến khi hết ⚠, hoặc giải thích vì sao giữ.
8. **Xuất file**: kịch bản gốc (`.script.md`) là bản duy nhất được sửa tay; mọi bản khác đều xuất từ nó.
   ```bash
   python3 -I .claude/skills/eli5-story-script/scripts/script_lint.py episodes/<tập>/script/<slug>.script.md \
     --read episodes/<tập>/script/<slug>.read.md \
     --tts-dir episodes/<tập>/script/<slug>.elevenlabs \
     --tsv episodes/<tập>/lines.tsv --voice "N=Eddy (English (US))" --voice "Leo=Rocko (English (US))"
   ```
   - `--read`: bản đọc duyệt cho Tú. Không có thẻ, ghi chú hình, số nguồn; thoại ghi tên người nói; câu lên thẻ chữ in đậm; ngày in nghiêng; đoạn ≤ 6 câu.
   - `--tts-dir`: mỗi phần một file `.txt` (≤ 2,400 ký tự; phần dài hơn được chia thành các file dài xấp xỉ nhau) để dán vào ElevenLabs, kèm `HUONG-DAN.md` theo skill `elevenlabs-voice` (giọng và thiết lập đọc từ `channel/voice.md`, thứ tự tạo, chỗ lưu bản chọn `episodes/<tập>/voice/`, credit dự trù, danh sách nghe soát, bảng lời thoại theo vai). Số, ngày, năm, tiền, % **giữ nguyên chữ số** vì ElevenLabs v4 đọc đúng (Tú chốt 13/11/2026); chỉ sửa chữ viết tắt dễ đọc sai: `US` → `U.S.`, `FT` → `Financial Times` (thêm từ mới vào `TTS_REPLACE`). Nếu một giọng đọc sai số thì xuất lại với `--spell-numbers` để viết số thành chữ. Thoại để trong ngoặc kép, không có nhãn người nói.
   - `--tsv`: từng dòng cho `make_voice.sh` / Remotion (chữ cũng đã chuẩn hoá cho giọng đọc).
   - Model ElevenLabs v3/v4 không nhận thẻ `<break>`; nhịp nghỉ đến từ xuống dòng, dấu câu và "…".
   - Thẻ giọng như `N: [sarcastic] Great plan, right?` viết thẳng trong kịch bản gốc: giữ trong `--tts-dir` và `--tsv`, bị bỏ khỏi `--read` và số từ. Linter cảnh báo khi quá 20% dòng người dẫn có thẻ, hai dòng liền nhau cùng có thẻ, có thẻ tiếng động, hoặc một dòng có từ 2 chữ IN HOA. Cách viết thẻ và nhịp cho giọng đọc: skill `elevenlabs-voice` mục 4.

## Sponsor
Kênh của Tú còn mới, **chưa có nhà tài trợ** → mặc định **không có beat B05**. Câu treo cuối B04 nối thẳng sang B06. Thời lượng đích giảm khoảng 7% (kịch bản 15 phút còn ~13–14 phút); đặt `# RUNTIME:` theo con số mới. Chỉ dùng `references/sponsor.md` khi Tú báo đã có nhà tài trợ.

## Định dạng kịch bản (`episodes/<tập>/script/<slug>.script.md`)

```
# TITLE: The Rise of Leo's Coffee Explained Like You're 5
# RUNTIME: 15
# BET: Prove the slowest coffee in Seattle can also be the most popular.

## B01 · HOOK
N: This is Leo.
N: Today, his coffee company is worth one billion dollars. {SRC:1}
> chart draws itself up to a $1B stamp
CARD: But ten years ago, Leo made the worst coffee in Seattle.
DATE: 2016. Seattle.
Customer: This tastes like regret.
Leo: That's the secret ingredient. {GAG}

## B05 · SPONSOR
...

## SOURCES
1. https://example.com/article — định giá 2026
```

| Ký hiệu | Nghĩa | Đọc lên? |
|---|---|---|
| `N:` | lời người dẫn | có |
| `CARD:` | người dẫn đọc, hình là thẻ chữ đen hiện chữ | có |
| `DATE:` | người dẫn đọc, hình là thẻ năm + địa điểm | có |
| `CHAPTER:` | tên chương (2–4 từ) ở đầu mỗi chương: **chỉ để đặt tên mốc chương trong mô tả YouTube, không hiện lên video** (từ 16/11/2026), người dẫn không đọc; không vào file ElevenLabs, `lines.tsv` hay số từ, không tính là thẻ chữ | không |
| `Tên:` | thoại skit của nhân vật (bóng thoại) | có, giọng nhân vật |
| `> …` | ghi chú hình cho storyboard | không |
| `{GAG}` `{LOOP}` `{BET}` `{SRC:n}` | thẻ đánh dấu cuối dòng cho linter | không (bị bỏ khi xuất TSV) |
| `{ANALOGY}` | dòng ví von có chữ số nhưng không phải dữ kiện (vd. "ten thousand kindergarteners"), để linter không đòi nguồn | không |
| `{YOU}` | dòng nối câu chuyện về ví của người xem (dạng tin nóng bắt buộc ≥ 1) | không |
| `# REAL: Jensen, Alice!` | tên người nói là người thật; `!` = đang bị cáo buộc. Linter kiểm từ ngữ nguy hiểm và khung `{FRAMED}` | không |
| `{DRAMATIZED}` | dòng người dẫn mở một cảnh diễn lại cáo buộc: phải có tên nguồn + `{SRC:n}`, và sau cảnh phải có câu nêu phủ nhận | có (câu người dẫn) |
| `{FRAMED}` | dòng người dẫn báo trước rằng cảnh sau là tưởng tượng ("Here's roughly how that goes.") | có (câu người dẫn) |
| `# FORMAT: news` + `# QUESTION:` | đặt ở đầu file thay cho `# BET:` khi viết dạng tin nóng; linter bỏ kiểm cuộc cược và tỷ lệ 11 beat | không |
| `## Bxx · TÊN` | đầu beat; beat sponsor phải có chữ `SPONSOR` | không |

## Phân tích kịch bản mẫu khác
Với transcript thô (ví dụ Whisper `audio.txt`), chạy linter ở chế độ `--plain` để lấy số đo câu, nhịp, câu hỏi, con số:
```bash
python3 -I .claude/skills/eli5-story-script/scripts/script_lint.py <transcript.txt> --plain
```
Sau đó đánh dấu beat bằng mốc thời gian trong `audio.tsv`, rồi cập nhật bảng tỷ lệ trong `beat-sheet.md` nếu mẫu mới khác biệt có hệ thống.
