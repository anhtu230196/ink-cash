# Paper Billions (@PaperBillionsTV): dữ liệu thô, đo ngày 2026-11-13

Bản phân tích nằm trong skill: `.claude/skills/cartoon-explainer-video/references/analysis-paperbillions.md` (vì sao kênh lên nhanh, số đo) và `visual-style-cinematic.md` (phong cách hình); kỹ thuật kịch bản ở `.claude/skills/eli5-story-script/references/news-explainer.md`.

Kênh: 10.7K sub. Video đầu tiên đăng ngày 2026-11-06.
Phần mô tả video ghi đối tác là "Overnight Studio" (madeovernight.com), studio làm video cho kênh.

| ID | Ngày đăng | Dài | View | Like | Comment | Tiêu đề | Thumbnail |
|---|---|---|---|---|---|---|---|
| hPCywNDA60o | 2026-11-06 | 14:08 | 112K | 538 | 67 | The Biggest IPO in History Lost $80 Billion | -$80 BILLION |
| zEUKLSrbRZk | 2026-11-08 | 15:00 | 1.12M | 5.7K | 631 | Why the Stock Market Just Crashed | NVIDIA -$400B |
| _MG4v3foET8 | 2026-11-10 | 19:48 | 1.73M | 6.8K | 1.0K | How a Chinese Spy Got Inside Nvidia | $2 BILLION OF CHIPS |
| Vy1m4ZXNzpo | 2026-11-13 | 14:20 | 565 (vừa đăng) | 11 | 15 | Why Nvidia Would Fail Without Jensen Huang | ONE ZIPPER. -$2 TRILLION |

## Số đo (ffmpeg scene > 0.3, blackdetect, ebur128; Whisper small)

| ID | Số lần cắt | Trung bình/cảnh | Số cắt trong 2 phút đầu | Thẻ đen | LUFS | Số từ |
|---|---|---|---|---|---|---|
| hPCywNDA60o | 166 | 5.1 s | 25 | 39 | -17.7 | 2,128 |
| zEUKLSrbRZk | 229 | 3.9 s | 34 | 46 | -17.7 | 2,269 |
| _MG4v3foET8 | 352 | 3.4 s | 42 | 50 | -17.4 | 3,121 |
| Vy1m4ZXNzpo | 244 | 3.5 s | 52 | 33 | -17.5 | 2,263 |

## Mỗi thư mục video có
- `transcript.txt`, `transcript.srt`: lời đọc do Whisper chép, có thể sai tên riêng.
- `sheet_*.jpg`: lưới 4x4, mỗi ô là một khung lấy cách nhau 20 giây.
- `cuts.txt`: mốc thời gian (giây) của từng lần chuyển cảnh.

`thumbs.jpg`: 4 thumbnail ghép lại, thứ tự trái→phải, trên→dưới theo bảng trên.

## Ghi chú khi xem nhanh (chưa phân tích)
- Video 1 dùng nền sáng, phẳng, nhiều biểu đồ. Video 2–3 tối hơn, có ánh sáng điện ảnh và vignette, bối cảnh có chiều sâu, khung giao diện camera giám sát và thẻ tên kiểu lower-third.
- Video 3 có cảnh 3D thật (nhân vật 3D trong hành lang trường học, có motion blur) xen giữa các cảnh 2D.
- Thumbnail là tranh hoạt hình chi tiết, ánh sáng mạnh, khác hẳn phong cách trong video. Chữ trên thumbnail là con số lớn màu đỏ/trắng.
- Phần chương (chapter) trong mô tả có tên kiểu phim: "Dinner in Singapore", "The Locked Door", "The Empty Chair".
- Bình luận top của video 3: nhiều câu đùa về Jensen, tranh cãi ông ấy vô tội hay cố ý; có người nói video "giống phim tài liệu Netflix"; có người nhắc video được làm bằng Claude Code.

Video gốc (720p) và audio nằm trong scratchpad của phiên trước, không chép vào đây:
`/private/tmp/claude-501/-Users-admin-Desktop-crayon-capital-clone/eeef070e-57a1-4744-99ca-7bd3d1ed84e1/scratchpad/pb/`

## Video 5 (phần tiếp theo vụ Megaspeed, "follow one box")
Tú dán transcript ngày 15/11/2026 (chưa có ID video, chưa tải về). Khoảng 3,000 từ. Cấu trúc và kỹ thuật rút ra: khung E và kỹ thuật 22–28 trong `.claude/skills/eli5-story-script/references/news-explainer.md`. Video này đi cùng góc "đường đi của chip" với ep01-megaspeed.
