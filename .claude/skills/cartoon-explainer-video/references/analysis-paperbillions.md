# Phân tích kênh mẫu #2: Paper Billions (@PaperBillionsTV)

Đo ngày 2026-11-13 bằng yt-dlp, ffmpeg và Whisper small. Dữ liệu thô (transcript, lưới khung hình, mốc cắt cảnh) ở `research/channels/paperbillions/`. Các nhận định về lý do tăng trưởng là suy luận từ số liệu công khai, không có số liệu nội bộ của kênh (retention, CTR, nguồn traffic).

## 1. Kênh này là gì

- 10.7K sub, 4 video, video đầu đăng 2026-11-06. Sau 7 ngày: khoảng 3 triệu view.
- Phần mô tả ghi "Official partner: Overnight Studio, the studio behind this channel's videos. Make your own: madeovernight.com".
- Overnight (madeovernight.com) là một app desktop trả phí, điều khiển Claude của người dùng để nghiên cứu, viết, tạo giọng và dựng cả video. Paper Billions là kênh trưng bày của chính studio này. Theo trang của họ: một phim mất khoảng 18 giờ từ đề tài đến bản 4K, gồm 358 shot, 1,262 hiệu ứng âm thanh, 14 đoạn nhạc; hình có "real 3D sets and light". Đây là số họ tự công bố, chưa kiểm chứng.
- Tức là video của họ cũng dựng bằng code do Claude viết, cùng hướng với quy trình Remotion của mình.

| # | ID | Đăng | Dài | View | Like | Comment | Tiêu đề | Chữ trên thumbnail |
|---|---|---|---|---|---|---|---|---|
| 1 | hPCywNDA60o | 06/11 | 14:08 | 112K | 538 | 67 | The Biggest IPO in History Lost $80 Billion | -$80 BILLION |
| 2 | zEUKLSrbRZk | 08/11 | 15:00 | 1.12M | 5.7K | 631 | Why the Stock Market Just Crashed | NVIDIA -$400B |
| 3 | _MG4v3foET8 | 10/11 | 19:48 | 1.73M | 6.8K | 1.0K | How a Chinese Spy Got Inside Nvidia | $2 BILLION OF CHIPS |
| 4 | Vy1m4ZXNzpo | 13/11 | 14:20 | mới đăng | – | – | Why Nvidia Would Fail Without Jensen Huang | ONE ZIPPER. -$2 TRILLION |

## 2. Vì sao kênh lên nhanh

Xếp theo mức độ mình tin là quan trọng.

1. **Bám tin nóng với tốc độ mà hoạt hình thường không làm nổi.** Thị trường sập thứ Năm 05/11, video ra Chủ nhật 08/11. Bản ghi nhớ rò rỉ 06/11, video ra 10/11. Jensen từ chức 12/11, video ra 13/11. Một video hoạt hình 15 phút thường mất 2–4 tuần; họ ra trong 1–3 ngày. Lúc rất nhiều người đang tìm lời giải thích cho sự kiện, video của họ là một trong số ít bản hoạt hình chỉn chu đã có mặt.
2. **Tiêu đề là đúng câu người ta đang gõ.** "Why the Stock Market Just Crashed", "How a Chinese Spy Got Inside Nvidia". Không có "Explained Like You're 5", không chơi chữ. Thumbnail không lặp lại tiêu đề mà bổ sung một con số lớn màu đỏ.
3. **Một cụm đề tài duy nhất: tiền của ngành AI.** Cả 4 video xoay quanh Nvidia, Anthropic, bong bóng AI. Nhân vật Jensen xuất hiện lại, video sau nhắc rằng chuyện trước đã kể ở video trước, cuối video hẹn mốc ngày sắp tới (ngày công bố kết quả kinh doanh, ngày điều trần). Người xem xong một video có lý do xem tiếp video kia, và YouTube nhanh chóng biết nên đẩy kênh cho ai. Video 1 được 112K, video 2 và 3 vượt 1 triệu.
4. **6 giây đầu đã có cảnh, nhân vật và cái giá.** Video 3 mở bằng một câu ở thì hiện tại: ông chủ công ty giá trị nhất thế giới đang ăn tối với một điệp viên. Không logo, không chào hỏi. Sau đó là một nghịch lý (có người đang chụp ảnh và biết cô ta là ai, còn ông ấy thì không), một skit 2 câu, lời hứa "đây là câu chuyện về…" và một mũi tên chỉ đường ("chuyện bắt đầu từ một cuộc gọi") ở giây 37.
5. **Mật độ giải trí dày.** Video 3 có khoảng 38 skit hoặc trích dẫn trong 19:48, tức khoảng 31 giây một lần; 36% số câu dài không quá 4 từ; 2.9 câu hỏi mỗi phút. Khái niệm nào cũng có một phép ví von đời thường và con số nào lớn cũng được chia đầu người (ví dụ 4.5 tỷ đô thành khoảng 13 đô mỗi người Mỹ).
6. **Video nào cũng có đoạn "chuyện này dính tới ví của bạn".** Thường nói rằng ai có quỹ chỉ số S&P 500 thì đang sở hữu Nvidia. Nhờ vậy người không theo dõi công nghệ vẫn thấy liên quan.
7. **Hình ảnh cho cảm giác phim tài liệu.** Có bình luận nói nhịp, hình và cấu trúc giống phim tài liệu Netflix hơn là video YouTube. Xem `visual-style-cinematic.md`.
8. **Chủ đề dễ gây tranh cãi và có câu hỏi mời bình luận.** Mỗi mô tả có một câu hỏi ngắn hỏi ý kiến người xem (lẽ ra ai phải cảnh báo ông ấy, bạn có mua cổ phiếu này không). Video 3 có 1,000 bình luận, phần lớn là đùa và cãi nhau về nhân vật chính.
9. **Tín hiệu đáng tin.** Cuối mô tả ghi số liệu tính đến ngày nào và lấy từ những báo nào. Trong video, trích dẫn thật hiện kèm tên và chức danh; cáo buộc luôn gắn với người nói ra nó (tờ báo, công ty, bản ghi nhớ); luôn trình bày cả hai phe.
10. **Nhịp đăng 2–3 ngày một video.**

### Những điều chưa chắc
- **Không loại trừ được quảng cáo trả tiền hoặc đẩy chéo.** Tỷ lệ like/view chỉ 0.39–0.50% (video mẫu của Crayon Capital: 1.17%) và 3 triệu view chỉ đổi ra 10.7K sub (0.36%). Hai con số này khớp với traffic gần như toàn người lạ từ trang chủ và đề xuất, nhưng cũng khớp với view mua bằng quảng cáo. Studio có động cơ làm đẹp số liệu vì kênh là mẫu chào hàng, và họ nói đang quản lý nhiều kênh khác.
- **Mới 4 video trong một tuần tin tức cực nóng.** Chưa biết kênh có giữ được khi tin nguội. Video 4 chưa có số liệu.
- **Video 1 kém nhất nhưng khác các video sau ở nhiều điểm cùng lúc** (kênh chưa có ai biết, đề tài ít tính sự kiện, hình sáng và phẳng, cắt chậm, dày số liệu nhất), nên không tách được yếu tố nào quyết định.

## 3. Số đo

| Chỉ số | V1 IPO | V2 Crash | V3 Spy | V4 Jensen |
|---|---|---|---|---|
| View (13/11) | 112K | 1.12M | 1.73M | mới đăng |
| Tốc độ đọc (từ/phút) | 151 | 151 | 158 | 158 |
| Số lần cắt · trung bình/cảnh | 166 · 5.1 s | 229 · 3.9 s | 352 · 3.4 s | 244 · 3.5 s |
| Trung vị độ dài cảnh | 3.4 s | 3.2 s | 2.6 s | 2.6 s |
| Cảnh ngắn hơn 1.5 s | 11% | 12% | 23% | 22% |
| Số cắt trong 2 phút đầu | 25 | 34 | 42 | 52 |
| Thẻ đen: số lượng · % thời lượng | 39 · 10.0% | 46 · 13.2% | 50 · 10.8% | 33 · 7.5% |
| Độ sáng trung bình (0–255, bỏ thẻ đen) | 138 | 110 | 83 | 106 |
| Tỷ lệ khung tối (luma < 70) | 9% | 25% | 47% | 23% |
| Câu ≤ 4 từ | 24% | 26% | 36% | 26% |
| Câu hỏi/phút | 1.4 | 0.8 | 2.9 | 2.0 |
| Con số/phút (đếm lần xuất hiện) | 9.8 | 6.9 | 5.3 | 4.6 |
| Âm lượng | -17.7 LUFS | -17.7 | -17.4 | -17.5 |

Xu hướng qua 4 video: cắt nhanh hơn, tối và nhiều ánh sáng hơn, ít số hơn, nhiều thoại hơn.

## 4. Cấu trúc kịch bản

Chi tiết kỹ thuật viết nằm ở skill `eli5-story-script`, file `references/news-explainer.md`. Tóm tắt 3 kiểu video:

- **"Vì sao X vừa xảy ra"** (V2): con số sốc + "không ai làm gì sai" → câu trả lời ngắn → "câu trả lời dài bắt đầu từ một tháng trước" → bối cảnh → danh sách vết nứt đánh số → ngòi nổ → đồng hồ đếm giờ của ngày xảy ra → ai bị ảnh hưởng (bạn) → trả lời thẳng câu hỏi tiêu đề → mốc ngày sắp tới.
- **"X đã làm Y như thế nào"** (V3): cảnh mở ở hiện tại → tiểu sử nhân vật chính (4 phút) → lệnh cấm tạo ra động cơ → vỏ bọc → tiếp cận → đường dây → mục đích thật → bị lộ → câu hỏi còn bỏ ngỏ → ví của bạn → quay lại cảnh mở.
- **"Con số gây sốc thật ra nghĩa là gì"** (V1): con số → lịch sử ngắn → vì sao con số đó là "trên giấy" → con số thật sự đáng lo → bạn có nên mua không → câu trích dẫn.

## 5. Học gì, không chép gì

Học: tốc độ bám tin, cách đặt tiêu đề, cụm đề tài, cấu trúc mở đầu, đoạn "ví của bạn", lớp ánh sáng điện ảnh, hệ thống nhãn tài liệu, kỷ luật ghi nguồn.

Không chép: tên kênh, thiết kế nhân vật, bố cục cảnh cụ thể (bữa tối dưới nến, bản đồ có toà tháp phát sáng), câu chữ, các câu đùa lặp lại của họ, thumbnail, tên chương. Bảng màu nhấn và kiểu nhãn của mình phải khác để người xem không nhầm hai kênh.
