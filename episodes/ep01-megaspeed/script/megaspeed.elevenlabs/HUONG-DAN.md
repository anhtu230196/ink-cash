# Thu giọng ElevenLabs — Did $7.5 Billion of Nvidia Chips Get Around America's Wall?

Theo skill `elevenlabs-voice`. File này do `script_lint.py --tts-dir` sinh ra: muốn sửa câu, thẻ hay nhịp thì sửa kịch bản gốc rồi xuất lại, đừng sửa tay các file `.txt`.

## 1. Giọng và thiết lập

Một voice cho cả kênh: **Alex - Upbeat, Energetic and Clear** (`yl2ZDV1MzN4HbQJbMihG`). Mọi vai, kể cả vai nữ và trẻ em, đều do voice này đọc bằng thẻ vai đã viết sẵn trong file.

| | Người dẫn | Nhân vật |
|---|---|---|
| Model | `eleven_v4` | `eleven_v4` |
| Stability | 0.45 | 0.35 |
| Similarity | 0.75 | 0.75 |
| Clone strength | 0 | 0 |

Nguồn: `channel/voice.md`. Giữ đúng một bộ thiết lập cho cả tập; câu nào nhạt thì tạo lại câu đó, đừng đổi thiết lập giữa chừng.

## 2. Tạo giọng (theo đoạn, không theo từng câu)

1. Tạo **theo thứ tự** bảng dưới: mỗi file là một lượt.
2. Mỗi file tạo **2–3 lần**, chọn bản hay nhất. Ghép câu hay từ nhiều bản cũng được, miễn là cắt ở chỗ nghỉ.
3. Qua API: `model_id: "eleven_v4"`, `voice_settings` như mục 1, truyền `previous_request_ids` (tối đa 3) của file liền trước để các phần nối liền mạch.
4. Bản đã chọn lưu thành `episodes/ep01-megaspeed/voice/<tên file>.mp3`, trùng tên file chữ (vd. `01_open.mp3`).
5. Xong hết thì báo Claude để cắt thành từng câu vào `public/ep01-megaspeed/audio/<mã câu>.wav` cho Remotion (theo `lines.tsv`). Bước này chưa có script; xem skill `elevenlabs-voice`, mục 5.4.

| # | File | Ký tự | Bản chọn |
|---|---|---|---|
| 1 | `01_open.txt` | 635 | |
| 2 | `02a_the-man-with-the-keys.txt` | 1723 | |
| 3 | `02b_the-man-with-the-keys.txt` | 1779 | |
| 4 | `03_the-locked-door.txt` | 1532 | |
| 5 | `04_the-way-around.txt` | 1231 | |
| 6 | `05a_the-approach.txt` | 1848 | |
| 7 | `05b_the-approach.txt` | 1642 | |
| 8 | `06_the-pipeline.txt` | 2029 | |
| 9 | `07a_what-they-allegedly-wanted.txt` | 1216 | |
| 10 | `07b_what-they-allegedly-wanted.txt` | 1516 | |
| 11 | `08_how-it-came-out.txt` | 930 | |
| 12 | `09a_the-empty-chair.txt` | 1494 | |
| 13 | `09b_the-empty-chair.txt` | 1276 | |

Tổng **18,851** ký tự cho một lượt. Tạo 2–3 lần mỗi file thì dự trù khoảng **37,702–56,553** credit (credit tính cả ký tự trong thẻ).

## 3. Nghe soát (tai nghe, trước khi dựng)

- [ ] Tên riêng và chữ viết tắt đọc đúng. Sai thì thêm vào Pronunciation Dictionary hoặc `TTS_REPLACE` trong linter, không viết sai chính tả trong kịch bản.
- [ ] Không có thẻ nào bị đọc thành chữ, không có tiếng động lạ.
- [ ] Câu chốt có khoảng lặng trước và đọc khô; không cười trước punchline.
- [ ] Không có ba câu liền nhau cùng một giai điệu.
- [ ] Các file nghe như cùng một người: cùng độ cao, cùng độ vang.
- [ ] Không nuốt chữ, không dồn nhanh ở cuối đoạn dài.
- [ ] Nhắm mắt vẫn phân biệt được các vai với nhau và với lời dẫn. Vai nữ, trẻ em giữ cùng chất giọng giữa các câu (bảng dưới).
- [ ] Thẻ nào ăn, thẻ nào hỏng, từ nào phải sửa cách đọc: ghi vào `channel/voice.md`.

## 4. Lời thoại nhân vật (để nghe so từng vai)

| Phần | Nhân vật | Câu |
|---|---|---|
| 01 | Salesman | [smooth salesman voice, upbeat] Did the wall work? |
| 01 | Official | [flat bureaucrat voice] Define… "work." |
| 02 | Jensen | [warm, nostalgic] Three engineers, one booth — and bottomless coffee. |
| 02 | GPU | [small child voice, curious] Did you have a business plan? |
| 02 | Jensen | [dry, amused] We had an idea. And… a LOT of refills. |
| 02 | GPU | [small child voice, whiny] And the leather jacket? |
| 02 | Jensen | [warm, outgoing] The jacket came later. The coffee came first. |
| 02 | GPU | [small child voice, flat] So… I was born in a diner. |
| 02 | Jensen | [chuckles] The best ones usually are. |
| 02 | GPU | [small child voice, whiny] I used to draw dragons for video games. |
| 02 | GPU 2 | [small child voice, flat and bossy] Now you do math. Keep coloring. |
| 02 | GPU | [small child voice, whiny] How many problems are left? |
| 02 | GPU 2 | [small child voice, deadpan] A few trillion… give or take. |
| 02 | GPU | [small child voice, whiny, close to tears] My crayons are melting! |
| 02 | GPU 2 | [small child voice, deadpan] That means it's working. Welcome to AI. |
| 02 | Investor | [excited, talking fast] How much is one of these chips? |
| 02 | Investor 2 | [woman's voice, calm and dry] Tens of thousands of dollars… Each. |
| 02 | Investor | [excited, shouting] Great. I'll take ten thousand of them! |
| 02 | Investor 2 | [woman's voice, calm and dry] So will everyone else… There's a waitlist. |
| 02 | Investor | [panicking, voice rising] How LONG is the waitlist?! |
| 02 | Investor 2 | [woman's voice, slowly] Well… how long is your patience? |
| 02 | Hawk | [gruff, shouting] That chip is a missile brain! |
| 02 | Industry | [calm, patient] It's a very fast… calculator. |
| 02 | Hawk | [gruff, shouting] A calculator that does missile math! |
| 02 | Industry | [calm, patient] Mostly, it makes cat videos. |
| 02 | Hawk | [gruff, suspicious] And what do the cats want? |
| 02 | Industry | [calm, patient] …I'm going to need a minute. |
| 02 | Jensen | [calm, matter-of-fact] If you block our chips, China builds its own. |
| 02 | Hawk | [gruff, shouting] Then we'll block those too! |
| 02 | Jensen | [curious] Chips made in China? By China? For China? |
| 02 | Hawk | [gruff, less sure] We'll… find a way. |
| 02 | Jensen | [dry, amused] With what, exactly? |
| 02 | Hawk | [gruff, proudly] More paperwork! |
| 03 | GPU | [small child voice, whiny] Why am I so slow? |
| 03 | GPU 2 | [small child voice, flat and bossy] You're the LEGAL model. |
| 03 | Official | [flat bureaucrat voice] This chip is too fast for China. |
| 03 | Salesman | [smooth salesman voice, upbeat] No problem! We made a slower one. |
| 03 | Official | [flat bureaucrat voice] That one is also too fast. |
| 03 | Salesman | [smooth salesman voice, upbeat] So we made an even slower one! |
| 03 | Official | [flat bureaucrat voice] Still… too fast. |
| 03 | Salesman | [smooth salesman voice, suddenly nervous] What if I just ship the empty box? |
| 03 | Official | [flat bureaucrat voice, bored] Fill out form seven. |
| 04 | Official | [flat bureaucrat voice] Did any of these chips go to China? |
| 04 | Tech | [laid-back, casual] Nope. The servers stay riiight here in Malaysia. |
| 04 | Official | [flat bureaucrat voice] Then what leaves the building? |
| 04 | Tech | [laid-back, casual] Just the login… and the answers. |
| 04 | Official | [flat bureaucrat voice] Is there a form for answers? |
| 04 | Tech | [laid-back, casual] You tell me, man. |
| 04 | Official | [flat bureaucrat voice, bored] …Fill out form seven. |
| 05 | Salesman | [smooth salesman voice, upbeat] Delivery for Speedmatrix! Where do these plug in? |
| 05 | Tech | [laid-back, casual] Right across the bridge from Singapore. |
| 05 | Salesman | [smooth salesman voice, upbeat] And how many servers are we talking about? |
| 05 | Tech | [laid-back, casual] Yes. |
| 05 | Salesman | [smooth salesman voice, suddenly nervous] That's— that's not a number. |
| 05 | Tech | [laid-back, casual] It will be… Keep unloading. |
| 05 | Investor | [excited, talking fast] Wait. This tiny company gets Nvidia's best chips? |
| 05 | Investor 2 | [woman's voice, calm and dry] Easily… according to the pitch. |
| 05 | Investor | [panicking] Everyone else has been waiting for months! |
| 05 | Investor 2 | [woman's voice, slowly, raising an eyebrow] Does that seem suspicious to you? |
| 05 | Investor | [excited, talking fast] It seems like a great investment to me! |
| 05 | Investor 2 | [woman's voice, calm and dry] Those are… sometimes the same thing. |
| 05 | Jensen | [warm, outgoing] I don't think we've met. And I meet everybody. |
| 05 | Alice | [woman's voice, warm, charming] Alice. Megaspeed. We're a cloud company in Singapore. |
| 05 | Jensen | [warm, outgoing] Cloud! I love cloud. How big are you? |
| 05 | Alice | [woman's voice, shy laugh] Oh — small. [laughs nervously] For now. |
| 05 | Jensen | [dry, amused] Everybody says "for now." How many chips do you need? |
| 05 | Alice | [woman's voice, playful] How many do you have? |
| 05 | Jensen | [chuckles] I LIKE her. Somebody get her a chair! |
| 05 | Analyst | [suspicious, hushed] Look at this. Same party… same table. |
| 05 | Analyst 2 | [woman's voice, bored] It's a trade show. Everyone's at the same table. |
| 05 | Analyst | [suspicious, hushed] She's standing RIGHT next to him. |
| 05 | Analyst 2 | [woman's voice, bored] So is… the shrimp buffet. |
| 05 | Analyst | [suspicious, hushed] So it's nothing? |
| 05 | Analyst 2 | [woman's voice, flat] It's networking. Write that down. |
| 06 | Investor | [excited, voice rising] That's a LOT of chips! |
| 06 | Investor 2 | [woman's voice, calm and dry] That was… count one. |
| 06 | Investor | [excited, talking fast] Three hundred thousand an hour? |
| 06 | Investor 2 | [woman's voice, calm and dry] Every. Hour. |
| 06 | Investor | [excited, talking fast] Even on Sundays? |
| 06 | Investor 2 | [woman's voice, calm and dry] Especially Sundays. |
| 06 | GPU | [small child voice, whispering, curious] Are we training AI yet? |
| 06 | GPU 2 | [small child voice, whispering sharply] Shh! Not yet. |
| 06 | GPU | [small child voice, whispering] Then why is it so dark? |
| 06 | GPU 2 | [small child voice, whispering, matter-of-fact] Because… we're still in the box. |
| 06 | GPU | [small child voice, whispering] When do we get plugged in? |
| 06 | GPU 2 | [small child voice, deadpan] When they find a bigger apartment. |
| 07 | Analyst | [suspicious, hushed] This could be… big. |
| 07 | Analyst 2 | [woman's voice, bored] How big? |
| 07 | Analyst | [suspicious, hushed] Write-a-memo big. |
| 07 | Analyst 2 | [woman's voice, flat] Ugh… I hate memos. |
| 07 | Analyst | [suspicious, hushed] Should we tell somebody first? |
| 07 | Analyst 2 | [woman's voice, bored] First, we schedule a meeting. |
| 07 | Analyst | [suspicious, hushed] A meeting about what? |
| 07 | Analyst 2 | [woman's voice, bored] About… the meeting. |
| 07 | Hawk | [gruff, shouting] This is a spy operation! |
| 07 | Industry | [calm, patient] It's a leaked memo… that nobody has seen. |
| 07 | Hawk | [gruff, shouting] There were wiretaps! |
| 07 | Industry | [calm, patient] Reported wiretaps. And how many indictments? |
| 07 | Hawk | [gruff, quieter] …None. So far. |
| 07 | Industry | [calm, patient] Call me when "so far" is over. |
| 07 | Investor | [excited, talking fast] Nobody is charged? |
| 07 | Investor 2 | [woman's voice, calm and dry] Nobody. |
| 07 | Investor | [panicking, voice rising] Tell that to my 401(k)! |
| 08 | Investor | [nervous] Is that bad? |
| 08 | Investor 2 | [woman's voice, calm and dry] Ask me… Thursday. |
| 09 | Hawk | [gruff, shouting] Ban the cloud rentals. All of them! |
| 09 | Industry | [calm, patient] Then China builds its own chips even faster. |
| 09 | Hawk | [gruff, shouting] Then we write faster rules! |
| 09 | Industry | [calm, patient] How fast can you write a rule? |
| 09 | Hawk | [gruff, proudly] Eighteen months! If we hurry. |
| 09 | Industry | [calm, patient] Wonderful… Very fast paperwork. |
| 09 | Salesman | [smooth salesman voice, suddenly nervous] So… the CEO is gone. |
| 09 | Official | [flat bureaucrat voice] And where are the two hundred forty thousand chips? |
| 09 | Salesman | [smooth salesman voice, upbeat] Still humming away overseas. |
| 09 | Official | [flat bureaucrat voice] So did the wall work, or not? |
| 09 | Salesman | [smooth salesman voice, upbeat] Define… "work." |
| 09 | Official | [flat bureaucrat voice, bored] …Fill out form seven. |
