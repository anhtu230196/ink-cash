# Kỹ thuật viết — rút từ kịch bản mẫu "The Rise of Anthropic Explained Like You're 5"

Mỗi kỹ thuật có: **cơ chế** (vì sao nó giữ người xem) → **khuôn** (mẫu câu dùng lại) → **ví dụ gốc** do mình viết, không chép từ video mẫu. Không đưa nguyên câu của kịch bản mẫu vào kịch bản mới.

---

## 1. Xương sống: một nhân vật, một giá trị, một cuộc cược

Kịch bản mẫu không kể "lịch sử công ty". Nó kể chuyện **một người mang một giá trị đặt cược vào một điều tưởng như không thể**, rồi để các sự kiện thử thách cuộc cược đó.

- **Giá trị cốt lõi** của nhân vật được *cho thấy* ngay ở phút đầu bằng một skit nhỏ (cậu bé đứng ra bênh bạn bị bắt nạt), sau đó mới *nói ra*.
- **Vết thương** biến giá trị đó thành động cơ (bố mất → khoa học quá chậm).
- **Cuộc cược** (`{BET}`) là 1 câu, đặt trước phút 5: *"Chứng minh rằng X cũng có thể Y."*
- Cuộc cược được **gọi lại ít nhất 3 lần**: lúc nêu, lúc đảo chiều ("cuộc cược… đang thật sự hiệu quả"), và ở kết (nhìn lại dưới góc mới).
- **Trả nợ setup**: giá trị lộ ra ở skit tuổi thơ phải quay lại ở xung đột lớn nhất (bênh bạn ↔ từ chối khách hàng quyền lực). Nếu không có payoff thì bỏ skit tuổi thơ.

Khuôn câu cuộc cược:
> So they make an impossible bet. Prove that [điều bị coi là yếu thế] can also become [điều mạnh nhất].

Ví dụ gốc:
> So Leo makes a ridiculous bet. Prove that the slowest coffee in Seattle can also be the most popular.

## 2. Chuỗi nhân quả "So / Then / But", không bao giờ "and then"

Trong kịch bản mẫu, câu mở đầu bằng **So** (17), **Then** (13) và **But** (9) là ba loại nhiều nhất. Mỗi đoạn hoặc là *hệ quả* của đoạn trước (So), hoặc *biến cố mới* (Then), hoặc *trở ngại* (But). Nhờ vậy người xem luôn thấy câu chuyện **đang được đẩy đi**.

Nhịp điển hình: thành công → **But** cái giá → **So** quyết định → **Then** biến cố → **But**…

Kiểm tra: đọc riêng câu đầu của mỗi đoạn. Nếu hai đoạn liền nhau nối được bằng "and then" mà không mất gì, thì đoạn sau thiếu nhân quả: viết lại, hoặc cắt.

## 3. Mở bằng hiện tại, kể từ đầu, kết ở hiện tại

1. **Hook (≤ 25 giây, ~50 từ)**: tên chủ thể → con số khủng hôm nay → so với 2 thứ khán giả đã biết → 2 câu hỏi ("làm sao…?", "chẳng phải chỉ là…?") → "Well, it all started with [nhân vật]…"
2. Thân bài kể theo thời gian, mỗi chương mở bằng **thẻ năm + địa điểm** (`DATE:`).
3. Gần cuối quay lại **đúng sự kiện ở hook** và mở rộng nó thành một cuộc tranh luận.
4. Kết: "So where's [nhân vật] while [thế giới đang ồn ào về họ]?" → nhân vật vẫn làm việc của mình → luận đề nhìn lại → **3 vế song song** → câu trích dẫn.

## 4. Thang giải thích ELI5

Mỗi khái niệm kỹ thuật đi đủ 5 nấc, theo thứ tự:

1. **Mục tiêu bằng lời thường**: "Build a machine that understands language."
2. **Cách làm bằng hình ảnh**: "Feed it a mountain of books and make it guess the next word."
3. **Ví dụ ngớ ngẩn** (`{GAG}`) cho thấy nó chưa ổn → rồi một ví dụ **nguy hiểm** cho thấy vì sao phải quan tâm. Hai ví dụ leo thang: dễ thương → đáng lo.
4. **Giải pháp**, *sau đó mới gắn nhãn* thuật ngữ: "This is called…". Giải thích trước, đặt tên sau.
5. **Giới hạn của giải pháp**: "It works, but it treats the symptom, not the disease." Câu này mở xung đột kế tiếp.

Với con số kỹ thuật, dùng **thang quy đổi**: đơn vị kỹ thuật → đơn vị đời thường → vật quen thuộc → so với đối thủ → việc làm được nhờ nó.
> 100,000 tokens. In human language, that's about 75,000 words. Roughly one entire book. Three times what the competition can hold. (khuôn; thay số thật của đề tài)

Khuôn câu giải thích:
- "In other words, …" / "In human language, …"
- "An X is basically a [đồ vật] that …"
- "So you might be wondering: why would [ai đó] [làm điều nghịch lý]? Well, it's actually [một khái niệm đời thường]."

Tên sản phẩm hay các gói (tier): mỗi cái **1 đặc điểm, cái cuối kèm câu đùa**.
> Small: fast and cheap. Medium: smarter, still affordable. Large: the one you call when Medium starts sweating. (khuôn)

## 5. Skit thay cho kể

Mọi khoảnh khắc **cảm xúc, xung đột, phát hiện** đều được viết thành thoại 2–6 lượt giữa các nhân vật, không kể lại bằng lời người dẫn.

| Loại skit | Khi nào | Cấu trúc |
|---|---|---|
| Chứng minh tính cách | Phút 1 | Kẻ xấu → nhân vật ra tay → kẻ xấu hỏi vặn → nhân vật đáp 2–3 chữ |
| Demo công nghệ | Mỗi khái niệm | Người dùng hỏi → AI/sản phẩm trả lời sai buồn cười → người dùng phản ứng 1 câu |
| Đối đầu | Trước bước ngoặt | Lý lẽ phe kia **phải hợp lý** → nhân vật phản bác → câu chốt lập trường |
| Phát biểu | Đáy vực | 5–7 câu: thừa nhận thực tế → 2 lựa chọn → lựa chọn của tôi → mời người khác tin |
| Khám phá | Bước ngoặt | Câu hỏi nhỏ, vô hại → kết quả bất ngờ → "Interesting." → người dẫn: "The X doesn't matter. What it just did, does." |
| Tranh luận 2 phe | Hiện tại | Bear: rủi ro cụ thể → Bull: dữ kiện → Bear: câu hỏi khó nhất → Bull: câu đáp gói cả vấn đề |

Quy tắc:
- **Phe đối lập không phải kẻ ác.** Cho họ câu thoại mạnh nhất có thể. Xung đột hay là khi cả hai đều có lý.
- **Hai cỡ skit, dùng xen kẽ** (đo từ Paper Billions, quyết định của Tú 13/11/2026: thoại phải đầy đủ, không cụt lủn):
  - *Cảnh* (mặc định, ≥ 60% số skit): **6–10 lượt**, mỗi lượt là một câu trọn vẹn 4–14 từ, có chủ ngữ và động từ. Cảnh có ba nhịp: **mở** (ai muốn gì) → **leo thang** (2–3 lần hỏi lại, mỗi lần lộ thêm một thông tin) → **câu chốt** (punchline hoặc câu đổi hướng câu chuyện). Sau khi xem cảnh, người xem phải hiểu thêm một điều mà lời dẫn chưa nói.
  - *Gag nhanh* (≤ 40%): 2–4 lượt, 1–5 từ mỗi lượt, kiểu "Bao nhiêu?" – "Có." Dùng làm dấu chấm câu giữa hai đoạn nhiều số, không dùng để kể chuyện.
- Lượt thoại ≤ 18 từ. Không có hai lượt liền nhau cùng chỉ 1–2 từ, trừ khi đó là gag nhanh. Lượt cuối là punchline hoặc câu chốt.
- Nhân vật có **thái độ riêng** và giữ nó suốt cảnh (một người sốt ruột, một người tỉnh bơ); thái độ va nhau thì mới có cảnh.
- Người thật **được** nói trong skit, theo ba mức xanh/vàng/đỏ ở `real-people.md`. Tóm tắt: phóng đại nét tính cách công khai và lập trường thật thì thoải mái; cảnh có thật với lời tưởng tượng thì phải có câu khung `{FRAMED}`; không cho ai tự nhận một cáo buộc chưa được chứng minh, không đụng đời tư. Trích dẫn thật thì để nguyên văn và ghi nguồn.

## 6. Vòng lặp mở (open loop)

Cứ **60–90 giây** cần một câu hứa hẹn điều sắp đến, để người xem không thoát ra:

- "Then comes the part that actually [hậu quả mạnh]."
- "Then one [người] realizes something."
- "And somehow, the week gets worse."
- "But then something unexpected happens."
- "Then a number begins spreading around [nơi chốn]."
- "And there is one place [ai đó] goes when [điều kiện]."

Câu mở vòng luôn đứng **cuối một đoạn**, và đoạn sau phải trả lời ngay trong 1–3 câu đầu.

## 7. Nhịp câu

Số đo kịch bản mẫu: trung bình **9.9 từ/câu**, trung vị 9, **16% câu ≤ 4 từ**, câu dài nhất 35 từ (hiếm).

- **Mảnh câu đấm** (1–3 từ) sau một câu dài: "Nothing." / "Time." / "It's a lot." / "Gone."
- **Cặp đối lập**: "Not X. Y." · "X is easy. Y is not." · "It treats the symptom, not the disease."
- **Câu soi gương** nối quá khứ với hiện tại: "He's seen what happens when X is too slow. Now he's afraid of what happens if it's too fast."
- **Bộ ba**: "more people, more chips, and more money"; ở kết: "Every X costs…, every Y angers…, every Z shows up in…".
- **Chuỗi động từ dồn dập** để tả quy trình: "find the file, make a change, run a test, read the error, try again."
- Kể chuyện quá khứ bằng **thì hiện tại** ("he walks out", "the lab erupts") cho có cảm giác đang diễn ra.
- Khoảng **1.3 câu hỏi/phút**: câu hỏi tu từ để mở khoảng trống, câu tiếp theo trả lời.

## 8. Con số

- Mật độ: khoảng **2 con số/phút**. Con số nào cũng có **mốc so sánh** (lớn hơn X, gấp 3 lần Y, từ 50% lên 95%).
- **Mốc thời gian** mở chương: khoảng 10 lần trong 18 phút.
- Số chưa chắc chắn thì kèm từ rào: *up to, reportedly, estimated, roughly, may*.
- Mọi con số phải có nguồn trong file nghiên cứu (gắn `{SRC:…}`).

## 9. Hài

Xem `humor.md`. Mật độ trong mẫu: **1 gag mỗi 30–45 giây**; gag luôn đến **ngay sau một đoạn nhiều thông tin** để người xem thở.

## 10. Đáy vực và bài phát biểu

- Chồng **hai tai hoạ trong cùng một khoảng thời gian** ("And somehow, the week gets worse").
- Đối thủ thành công **đúng lúc** nhân vật gục.
- Công chúng thờ ơ (1 chữ "meh").
- Người rời đi → **câu hỏi không ai dám nói ra** (nghi ngờ chính cuộc cược).
- Nhân vật phát biểu: thừa nhận → hai lựa chọn → chọn khó → mời tin.
- Ngay sau đó là **câu chuyển ngoặt chiến lược**: "[Chủ thể] cannot win by becoming a second, slightly [tính từ] [đối thủ]. It needs to do something [đối thủ] flatly cannot do."

## 11. Lồng sponsor vào truyện

Xem `sponsor.md`. Ý chính: dùng một **beat thật của câu chuyện làm cú lừa** (tấm séc của nhà đầu tư → hoá ra từ sponsor). Đặt ở **~30% thời lượng**, ngay sau một cliffhanger. Sau sponsor nói "Okay, back to the video" và **trả lời cliffhanger ngay câu đầu**.

## 12. Kết

- Tốc độ đọc chậm lại (mẫu: 132 từ/phút so với 150 ở thân bài). Câu dài hơn, ít gag.
- Một câu gói hai tương lai, vế thứ hai là câu đùa nhẹ: "Either X is becoming [điều vĩ đại], or [người ta] is about to spend [số tiền] on [điều nhỏ bé] with [đức tính dễ thương]."
- "Nobody knows which future is coming. Not even [chủ thể]."
- Luận đề nhìn lại: sự kiện hiện tại **không hoàn thành** cuộc cược mà **làm nó khó hơn**.
- Câu trích dẫn cuối (`CARD:`), có tên tác giả, và **khớp với giá trị cốt lõi** ở phút 1.
