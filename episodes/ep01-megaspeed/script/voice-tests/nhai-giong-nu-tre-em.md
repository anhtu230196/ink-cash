# Thử nhại giọng nữ và trẻ em bằng voice người dẫn (Alex)

Mục đích: nghe xem voice người dẫn **Alex - Upbeat, Energetic and Clear** (`yl2ZDV1MzN4HbQJbMihG`) tự nhại được vai trẻ em và vai nữ không, trước khi chọn thêm voice riêng (skill `elevenlabs-voice`, mục 2).

Cách thử:
- Model `eleven_v4`, Stability **0.35** (thiết lập cho nhân vật), Similarity 0.75, Clone strength 0.
- Dán từng khối trong ô code vào ElevenLabs, mỗi khối tạo **2 lần**.
- Ở mỗi khối, lời dẫn đứng trước để nghe độ tương phản giữa giọng dẫn và giọng vai.
- Thoại lấy nguyên từ `megaspeed.script.md`; số và chữ viết tắt đã viết thành chữ.

## Thử 1 — Trẻ em: GPU và GPU 2 (B02)

Kịch bản ví chip GPU như **lũ trẻ mẫu giáo cầm bút sáp**, nên hai con chip đọc giọng trẻ con là hợp nhất tập. GPU nhõng nhẽo, GPU 2 là đứa lớn hơn, tỉnh bơ.

```
What is AI training?
Trillions of tiny math problems.
Exactly what those kindergarteners do best.

[small child voice, whiny] I used to draw dragons.
[small child voice, flat and bossy] Keep coloring.
[small child voice, whiny, close to tears] My crayons are melting.
[small child voice, deadpan] Welcome to AI.
```

## Thử 2 — Trẻ em thì thầm: GPU và GPU 2 (B06)

Hai con chip trốn trong thùng hàng, nên thử thêm giọng trẻ con thì thầm.

```
Picture buying a thousand couches for a studio apartment.

[small child voice, whispering, curious] Are we training AI?
[small child voice, whispering sharply] Shh.
[small child voice, whispering] Why?
[small child voice, whispering, matter-of-fact] We're in the hallway.
```

## Thử 3 — Nữ: Investor 2 (B05)

Investor và Investor 2 đối đáp nhiều nhất tập (5 skit). Nếu Investor 2 thành nữ thì cặp này hết bị lẫn giọng: Investor (nam, Alex) hấp tấp, Investor 2 (nữ) điềm tĩnh, mỉa mai.

```
That's like opening a lemonade stand and owning the orchard by Christmas.

[excited, talking fast] Wait. They get H one hundreds?
[woman's voice, calm and dry] Easily, apparently.
[panicking] Everyone else waits months!
[woman's voice, slowly, raising an eyebrow] Should we be suspicious?
[excited] Should we be investing?
```

## Thử 4 — Nữ: Analyst 2 (B05)

Analyst 2 chỉ nói câu ngắn và khô, nên dễ nhại hơn.

```
Nvidia says meeting a big customer is normal for a CEO.

[suspicious, squinting] A photo in Taipei?
[woman's voice, bored] At a trade show.
[conspiratorial] Spy craft?
[woman's voice, flat] Or standard networking.
```

## Thử 5 — Nữ, người thật: Alice Huang với Jensen (B05)

Skit mới thêm ở bữa tiệc Computex. Đây là **vai nữ quan trọng nhất tập**, nên nếu Alex nhại không đạt thì Alice nên là lý do chính để chọn voice nữ riêng.

Alice và Jensen là **người thật**, theo `eli5-story-script/references/real-people.md`:
- **Không** dùng thẻ accent (`[Chinese accent]`, `[Taiwanese accent]`…) và không đùa về giọng nói của họ.
- **Không** clone hay bắt chước giọng thật của họ. Chỉ là giọng hoạt hình trung tính.
- Tính cách đến từ thái độ, không từ giọng: Jensen xởi lởi, hào hứng; Alice ngắn gọn, tự tin, bí ẩn.

```
Nobody recorded what they said. Here's roughly how that small talk goes.

[warm, outgoing] Who haven't I met yet?
[woman's voice, cool and confident] Megaspeed. Singapore.
[curious] What do you do?
[woman's voice, brief] Cloud.
[intrigued, leaning in] How much cloud?
[woman's voice, calm, tiny smile] All of it.
```

## Chấm

| Thử | Vai | Nghe ra đúng vai? (1–5) | Tách được khỏi giọng dẫn? (1–5) | Thẻ bị đọc thành chữ? | Ghi chú |
|---|---|---|---|---|---|
| 1 | GPU, GPU 2 (trẻ em) | | | | |
| 2 | GPU, GPU 2 (thì thầm) | | | | |
| 3 | Investor 2 (nữ) | | | | |
| 4 | Analyst 2 (nữ) | | | | |
| 5 | Alice Huang (nữ, người thật) | | | | |

Quyết định:
- Vai nào đạt **≥ 4 ở cả hai cột** thì Alex tự nhại vai đó. Ghi thẻ vai vào bảng "Vai → voice + thẻ vai" trong `channel/voice.md`, rồi thêm thẻ vào `megaspeed.script.md`.
- Vai nào dưới 4 thì chọn voice riêng (nữ hoặc trẻ em) trong Voice Library. Thử lại đúng khối đó với voice mới, chỉ bỏ phần `woman's voice` / `small child voice` khỏi thẻ.
- Nếu `[small child voice]` bị đọc to thành chữ hoặc làm méo tiếng, thử thẻ ngắn hơn: `[childlike]`, `[whiny]`.
