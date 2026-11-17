# Giọng đọc của kênh Ink & Cash

Cách chọn giọng, thiết lập và viết thẻ: skill `elevenlabs-voice`. File này ghi những gì **đã chốt**; mọi tập đọc file này trước khi tạo giọng.

## Voice

| Vai trò | Tên giọng | voice_id | Ghi chú |
|---|---|---|---|
| Người dẫn chính | Alex - Upbeat, Energetic and Clear | `yl2ZDV1MzN4HbQJbMihG` | Chốt ngày 13/11/2026. Đọc lời dẫn và mọi vai (nam, nữ, trẻ em) bằng thẻ vai. |

Chỉ dùng **một voice** cho cả kênh (chốt 13/11/2026). Vai nữ và trẻ em do Alex đọc bằng thẻ `[woman's voice, …]` và `[small child voice, …]`; không chọn thêm voice khác.

### Khi đổi sang tài khoản ElevenLabs khác
1. Mở Voice Library ở tài khoản mới, tìm giọng người dẫn theo tên giọng hoặc dán `voice_id` vào ô tìm kiếm, rồi bấm **Add to my voices**.
2. Vào My Voices, mở giọng vừa thêm và kiểm tra `voice_id`. Nếu ID khác với ID trong bảng trên, ghi ID mới vào bảng **Tài khoản** bên dưới.
3. Tạo thử đoạn thử giọng (skill `elevenlabs-voice`, mục 2) với đúng thiết lập bên dưới, rồi nghe so với tài khoản cũ trước khi dùng cho tập đang làm.

## Thiết lập (dùng cho mọi tập)

| | Người dẫn | Nhân vật |
|---|---|---|
| Model | `eleven_v4` | `eleven_v4` |
| Stability | 0.45 | 0.35 |
| Similarity | 0.75 | 0.75 |
| Clone strength | 0 | 0 |

## Vai → voice + thẻ vai

| Vai | Voice | Thẻ vai |
|---|---|---|
Thẻ gốc của mỗi vai; một vài câu đổi thái độ nhưng vai nữ và trẻ em luôn giữ nguyên phần đầu `woman's voice` / `small child voice`. Áp dụng lần đầu ở ep01-megaspeed.

| Vai | Voice | Thẻ vai gốc | Biến thể đã dùng |
|---|---|---|---|
| Alice Huang (người thật, nữ) | Alex | `[woman's voice, warm, charming]` | `[woman's voice, shy laugh]`, `[woman's voice, nervous giggle]`, `[woman's voice, whispering]`, `[woman's voice, hesitant]`, `[woman's voice, curious]`, `[woman's voice, calm, tiny smile]`, `[woman's voice, cool and confident]`. Đổi sắc thái theo từng lượt; không dùng thẻ biến cô thành kẻ xấu. Chưa nghe thử các thẻ cười và thì thầm với giọng Alex. |
| Handler (không tên, cảnh `{DRAMATIZED}`) | Alex | `[low, calm, unhurried]` | giữ một sắc thái suốt cảnh |
| Jensen Huang (người thật) | Alex | `[warm, outgoing]` | `[warm, nostalgic]`, `[dry, amused]`, `[calm, matter-of-fact]`, `[curious]`, `[intrigued, leaning in]` |
| Investor 2 (nữ) | Alex | `[woman's voice, calm and dry]` | `[woman's voice, slowly, raising an eyebrow]` |
| Analyst 2 (nữ) | Alex | `[woman's voice, bored]` | `[woman's voice, flat]` |
| GPU (trẻ em) | Alex | `[small child voice, whiny]` | `[small child voice, whiny, close to tears]`, `[small child voice, whispering, curious]` |
| GPU 2 (trẻ em) | Alex | `[small child voice, flat and bossy]` | `[small child voice, deadpan]`, `[small child voice, whispering sharply]` |
| Investor | Alex | `[excited, talking fast]` | `[excited, shouting]`, `[panicking]`, `[nervous]` |
| Salesman | Alex | `[smooth salesman voice, upbeat]` | `[smooth salesman voice, suddenly nervous]` |
| Official | Alex | `[flat bureaucrat voice]` | `[flat bureaucrat voice, bored]` ("Fill out form seven.") |
| Hawk | Alex | `[gruff, shouting]` | `[gruff, proudly]` |
| Industry | Alex | `[calm, patient]` | |
| Tech | Alex | `[laid-back, casual]` | |
| Analyst | Alex | `[suspicious, hushed]` | |

## Tài khoản

Không ghi API key ở đây; key để trong `.env`.

| Tài khoản | voice_id người dẫn | Ghi chú |
|---|---|---|
| _(tài khoản 1)_ | `yl2ZDV1MzN4HbQJbMihG` | |

## Nhật ký thẻ

Cần nghe thử với giọng Alex rồi ghi kết quả ở đây (skill `elevenlabs-voice`, "Bảng điều khiển cảm xúc"): `[voice rising]`, `[higher pitch]`, `[voice dropping]`, `[trailing off]`, `[speeding up]`, `[slowly]`, `[laughs nervously]` giữa câu, chữ kéo dài ("Sooo…"), lắp bắp ("I— I just").

Thẻ nào ăn, thẻ nào hỏng với giọng người dẫn; từ nào phải sửa cách đọc.

- 13/11/2026: `[woman's voice, …]` đổi hẳn sang giọng nữ nghe như thật → dùng cho mọi vai nữ.
- Thẻ nhại kiểu `[playfully imitating a woman]`, `[in a silly falsetto]`: có trong skill, chưa nghe thử.
