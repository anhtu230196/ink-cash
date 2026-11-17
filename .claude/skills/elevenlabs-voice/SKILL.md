---
name: elevenlabs-voice
description: Tạo giọng đọc tiếng Anh bằng ElevenLabs (Eleven v4) cho video hoạt hình của kênh Ink & Cash — giọng tự nhiên, vui, có nhấn nhá, không đều đều. Gồm chọn và thử giọng, thiết lập Stability / Similarity / Clone strength, viết thẻ cảm xúc và nhịp ngắt vào kịch bản, tạo giọng người dẫn và giọng nhân vật skit, nghe soát và chọn bản, đổi tài khoản khi hết credit. Dùng khi Tú nhờ làm giọng, lồng tiếng, text to speech, ElevenLabs, chọn giọng cho kênh, chỉnh thiết lập giọng, thêm nhấn nhá cho kịch bản, hoặc khi giọng đọc nghe nhạt, đều đều, máy móc.
---

# Giọng đọc ElevenLabs

Skill này lo **tiếng**: từ kịch bản đã qua linter (skill `eli5-story-script`) đến các file âm thanh trong `public/<tập>/audio/` mà Remotion dùng (skill `cartoon-explainer-video`, mục 6). Thông tin về Eleven v4 lấy từ tài liệu ElevenLabs đọc ngày 13/11/2026. Model còn mới, nên **tin tai mình hơn tin bảng này**: điều gì nghe thử thấy khác thì sửa skill.

## 1. Giọng đích

Giọng của Ink & Cash là **người kể chuyện thông minh, hơi châm biếm**. Không phải MC hô hào, cũng không phải giọng đọc tin tức.

Cái làm giọng hết nhàm là **độ tương phản**, không phải lúc nào cũng hào hứng. Một giọng hào hứng liên tục cũng đều đều y như giọng phẳng. Mỗi tập luân phiên ba màu:

| Màu | Dùng ở đâu | Nghe như thế nào |
|---|---|---|
| **Kể** (mặc định) | dẫn truyện, giải thích, ví von | ấm, tò mò, tốc độ vừa, như kể cho bạn nghe |
| **Chốt** | punchline, câu deadpan, câu thẻ chữ đen | khô, phẳng, ngắn, có khoảng lặng trước |
| **Hồi hộp** | open loop, bí mật, cú rơi xuống đáy | thấp hơn, chậm hơn, gần như thì thầm |

Khoảng 70% số dòng để ở màu **Kể** và không gắn thẻ. Các thẻ chỉ dùng để bẻ sang hai màu kia ở đúng chỗ ngoặt.

## 2. Chọn giọng (một lần cho cả kênh)

**Người dẫn:** giọng Mỹ, tông trung, ấm, có chút cười trong giọng. Tránh giọng trailer quá trầm và giọng quảng cáo quá sáng. Lọc trong Voice Library theo *American, narrative/conversational*, rồi chọn 4–5 giọng để thử.

**Cách thử:** mỗi giọng tạo **2 lần** đoạn dưới đây với cùng thiết lập (mục 3), model `eleven_v4`. Đoạn này cố ý gồm đủ ba màu, có một chữ in hoa, một câu hỏi và các thẻ thường dùng:

```
In twenty twenty-two, nobody wanted this chip.
Investors called it a toy.
[curious] So why is it now worth more than most countries?

Here's the thing… it was never really a toy.
It was a factory for tiny math. Ten thousand kindergarteners, all coloring at once.

[sarcastic] Great business plan, right?
Except one company bought ALL of them.

[whispers] And they didn't tell anyone why.
```

Chấm mỗi giọng trên thang 1–5 ở năm điểm: (a) câu `[sarcastic]` có thật sự mỉa mai không; (b) câu `[whispers]` có thì thầm mà không méo tiếng không; (c) chữ `ALL` có được nhấn không; (d) hai lần tạo có cùng chất giọng không; (e) nghe 10 phút có mệt không. Chọn giọng có tổng điểm cao nhất, gửi Tú nghe bản tốt nhất của hai giọng đứng đầu để Tú quyết.

**Nhân vật skit: một voice duy nhất cho cả kênh.** Mọi vai, kể cả vai nữ và trẻ em, đều do voice người dẫn đọc, kèm thẻ vai. Tú chốt cách này ngày 13/11/2026, sau khi nghe thử: với v4, thẻ `[woman's voice, …]` đổi hẳn sang giọng nữ nghe như thật. Không cần chọn thêm voice nữ hay trẻ em.
- **Vai nam người lớn** (Investor, Hawk, Official, Salesman…): một **thẻ vai** cố định, phân biệt nhau bằng tuổi, tốc độ, năng lượng và thái độ:

  | Kiểu vai | Thẻ vai ví dụ |
  |---|---|
  | già, chậm | `[old, shaky voice]`, `[raspy, slow]` |
  | hăng hái, non nớt | `[excited, talking fast]`, `[whiny]` |
  | quan chức, kẻ cả | `[pompous]`, `[calm, condescending]` |
  | diều hâu, hét | `[gruff, shouting]` |
  | lo sợ | `[nervous]`, `[panicking]` |
  | máy móc, đồ vật | `[robotic]`, `[small, whiny voice]` |
  | giọng vùng miền | `[strong British accent]`, `[strong Texan accent]` (thử nghiệm) |

- **Vai nữ**: mở thẻ bằng `woman's voice`, rồi thêm thái độ: `[woman's voice, cool and confident]`, `[woman's voice, calm and dry]`, `[woman's voice, bored]`.
- **Vai trẻ em** (kể cả đồ vật nói như trẻ con, ví dụ GPU): mở thẻ bằng `small child voice`: `[small child voice, whiny]`, `[small child voice, whispering]`.
- Muốn nghe ra **người dẫn đang nhại** thay vì một người khác lên tiếng (để làm gag), dùng thẻ hành động: `[playfully imitating a woman]`, `[doing a high-pitched impression]`, `[imitating a little kid]`, `[in a silly falsetto]`. Không dùng kiểu nhại giễu này cho người thật.
- Giọng nữ và trẻ em sinh từ thẻ có thể lệch giữa các lần tạo. Giữ **nguyên văn** phần đầu thẻ (`woman's voice`, `small child voice`) cho cùng một vai, và nghe so các câu của cùng vai trước khi dựng; câu nào lệch thì tạo lại.
- **Hai vai đối đáp** (ví dụ Investor và Investor 2) phải có thẻ vai trái ngược: một hấp tấp, một uể oải. Nếu vẫn khó phân biệt, đổi một vai thành nữ bằng thẻ `woman's voice` khi kịch bản cho phép.
- **Người thật** (Jensen Huang, Alice Huang…): **không** clone hay bắt chước giọng thật của họ, **không** dùng thẻ accent, không đùa về giọng nói (`eli5-story-script/references/real-people.md`). Ngoài ba điều đó thì cứ diễn cho **có hồn**: giọng người thật không cần trung tính (Tú chốt 13/11/2026, theo cách Paper Billions cho Alice Huang cười ngượng, thì thầm).
- **Diễn một vai cho hấp dẫn = đổi cảm xúc theo từng lượt thoại.** Giữ nguyên phần đầu thẻ vai (`woman's voice`), đổi phần sau theo diễn biến cảnh. Một cảnh 6–10 lượt nên đi qua 3–4 sắc thái, không đọc cả cảnh bằng một thẻ:

  | Sắc thái | Thẻ (ví dụ cho vai nữ) | Dùng khi |
  |---|---|---|
  | cười ngượng | `[woman's voice, shy laugh]`, `[woman's voice, nervous giggle]`, `[woman's voice, laughing softly, embarrassed]` | được khen, bị hỏi khó, lần đầu gặp |
  | thì thầm | `[woman's voice, whispering]`, `[woman's voice, hushed, leaning in]` | bí mật, cảnh nhận nhiệm vụ, nói riêng |
  | ngập ngừng | `[woman's voice, hesitant]`, `[woman's voice, unsure]` + "…" trong câu | hỏi lại, chưa tin |
  | tò mò | `[woman's voice, curious]`, `[woman's voice, intrigued]` | hỏi "rồi sao nữa?" |
  | tự tin, duyên | `[woman's voice, warm, charming]`, `[woman's voice, playful]`, `[woman's voice, smiling]` | xã giao, chào hàng |
  | tỉnh bơ | `[woman's voice, calm, tiny smile]`, `[woman's voice, deadpan]` | câu chốt |
  | thở ra, nhẹ nhõm | `[woman's voice, relieved sigh]`, `[woman's voice, exhales]` | sau một lúc căng |

  Tiếng cười và hơi thở có thể viết ngay trong câu, không chỉ ở đầu: `[woman's voice, shy laugh] Oh — I just… buy things? [laughs softly] That's it?`. Chữ "…" và "—" trong câu thoại làm vai ngập ngừng thật hơn mọi thẻ.
- Vai nam cũng làm như vậy: `[whispering, urgent]`, `[nervous laugh]`, `[lower, conspiratorial]`, `[chuckles, impressed]`. Người giao việc không tên trong cảnh diễn lại cáo buộc: `[low, calm, unhurried]`, giữ một sắc thái suốt cảnh để tương phản với vai đang đổi cảm xúc.
- Thái độ phải hợp với mức của cảnh trong `real-people.md`: người bị cáo buộc được ngượng, tò mò, ngập ngừng, duyên; **không** dùng thẻ làm họ thành kẻ xấu (`[evil laugh]`, `[sinister]`, `[seductive]`, `[scheming]`).
- **Giữ cố định**: mỗi vai lặp lại có đúng một thẻ vai, ghi trong `channel/voice.md`, dùng y nguyên qua mọi tập. Thoại nhân vật được dùng thẻ thoải mái hơn lời dẫn, vì linter chỉ giới hạn mật độ thẻ ở lời người dẫn.

**Ghi lại** giọng đã chọn vào `channel/voice.md`: tên giọng, `voice_id`, model, thiết lập, thẻ nào ăn và thẻ nào không ăn với giọng đó, bảng vai → giọng. Mọi tập sau đọc file này trước khi tạo giọng. Nếu file chưa có thì nghĩa là chưa chọn giọng: làm mục này trước.

## 3. Thiết lập

Model: **`eleven_v4`**. Không dùng `eleven_v4_turbo`, bản đó dành cho trợ lý giọng nói cần phản hồi nhanh.

| Thiết lập | Người dẫn | Nhân vật skit | Ghi chú |
|---|---|---|---|
| Stability (`stability`) | **0.45** (khoảng 0.35–0.55) | **0.35** | Thấp: biểu cảm, thẻ ăn mạnh, nhưng mỗi lần tạo một khác. Cao: đều, dễ đơn điệu. |
| Similarity (`similarity_boost`, ở API hội thoại là `similarity`) | **0.75** | 0.75 | Cao quá dễ chép cả tạp âm của giọng gốc. |
| Clone strength (`clone_strength`) | **0** | 0 | Chỉ hiện với Professional Voice Clone. Thấp: linh hoạt hơn; cao: giữ chất giọng gốc hơn. ElevenLabs khuyên để 0, có lỗi thì thử 0.5. |
| Style, Speed | — | — | v4 bỏ hai thanh này trên giao diện. API vẫn liệt kê `speed` (0.7–1.2) nhưng chưa rõ có tác dụng với v4. Đừng dựa vào nó: chỉnh nhịp bằng chữ (mục 4). |

Quy tắc:
- **Một bộ thiết lập cho cả tập**, cả kênh càng tốt. Đổi số giữa chừng thì giọng các đoạn sẽ lệch nhau.
- Một câu đọc nhạt thì **tạo lại câu đó, hoặc thêm thẻ**. Đừng hạ stability của cả tập để cứu một câu.

## 4. Viết cho tai: nhấn nhá trong kịch bản

**Viết ở đâu:** thẻ và dấu nhấn viết thẳng vào kịch bản gốc `episodes/<tập>/script/<slug>.script.md`, vì đây là bản duy nhất được sửa tay:

```
N: [sarcastic] Great business plan, right?
Investor: [panicking] Buy ten thousand!
```

Linter giữ nguyên thẻ khi xuất file `.elevenlabs/*.txt` và `lines.tsv`, bỏ thẻ khỏi bản đọc duyệt `.read.md`, không tính thẻ vào số từ, và cảnh báo khi thẻ quá dày. `make_voice.sh` (giọng tạm `say`) tự bỏ thẻ.

### Thẻ cảm xúc

Cú pháp: ngoặc vuông, đặt **ngay trước** câu cần đổi giọng (hoặc ngay sau với thẻ phản ứng như `[sighs]`). Ghép được nhiều ý trong một thẻ: `[lower, conspiratorial]`, `[pause, dry amusement]`.

| Chỗ trong kịch bản | Thẻ gợi ý |
|---|---|
| Con số gây sốc ở hook | không thẻ; in hoa đúng một chữ, hoặc `[excited]` |
| Câu hỏi treo, tò mò | `[curious]` |
| Ví von, giải thích | thường không cần thẻ; `[warmly]`, `[playful]` khi cần nâng |
| Châm biếm | `[sarcastic]`, `[dismissive]` |
| Câu chốt deadpan | `[deadpan]` hoặc `[dry]`, kèm "…" ở câu ngay trước |
| Bí mật, âm mưu, open loop | `[whispers]`, `[lower, conspiratorial]`, `[mischievously]` |
| Cú rơi, thất bại | `[sighs]`, `[quietly]`, `[pause, then quietly]` |
| Phản ứng sau gag | `[chuckles]`, `[snorts]`, rất ít |
| Nhân vật skit | được dùng thoáng hơn: `[panicking]`, `[smug]`, `[shouting]`, `[appalled]`, `[annoyed]` |

Thẻ có trong danh sách chính thức của ElevenLabs: `[laughs]`, `[laughs harder]`, `[starts laughing]`, `[wheezing]`, `[whispers]`, `[sighs]`, `[exhales]`, `[sarcastic]`, `[curious]`, `[excited]`, `[crying]`, `[snorts]`, `[mischievously]`, `[happy]`, `[sad]`, `[angry]`, `[annoyed]`, `[appalled]`, `[thoughtful]`, `[surprised]`, `[chuckles]`, `[clears throat]`, `[short pause]`, `[long pause]`, `[exhales sharply]`, `[inhales deeply]`. Thẻ tự mô tả như `[deadpan]`, `[dry]`, `[warmly]`, `[lower, conspiratorial]` thường vẫn ăn, nhưng phải nghe thử với giọng đã chọn rồi ghi kết quả vào `channel/voice.md`.

Luật dùng thẻ:
- **Liều lượng:** lời người dẫn tối đa khoảng 3 thẻ trên 10 dòng (≤ 30%), và **không gắn thẻ ba dòng liền nhau**. Thoại nhân vật thì lượt nào cũng có thẻ. Thẻ quá dày ở lời dẫn làm giọng diễn quá và model dễ chập chờn; muốn thêm cảm xúc mà không thêm thẻ thì dùng dấu câu, chữ in hoa và cách viết câu (bảng điều khiển bên dưới), những thứ này không bị giới hạn.
- **Mô tả giọng, không mô tả hành động hay âm thanh.** Không dùng `[gunshot]`, `[applause]`, `[explosion]`, `[music]`, `[standing]`, `[grinning]`: model có thể tạo ra tiếng động thật, hoặc đọc to chữ trong thẻ. Tiếng động thêm lúc dựng.
- **Giọng nghiêm thì thẻ nghịch như `[giggles]` khó ăn.** Muốn người dẫn cười thì dùng `[chuckles]` hoặc `[pause, dry amusement]`.
- Thẻ đôi khi bị đọc to thành chữ. Nghe soát (mục 6) và tạo lại nếu gặp.

### Bảng điều khiển cảm xúc (lời dẫn và thoại)

Tú chốt 13/11/2026: giọng phải **có cảm xúc, lên xuống rõ**, ở cả lời dẫn lẫn thoại. Có ba lớp công cụ, dùng chồng lên nhau. Lớp 1 và 2 là chữ thường nên ổn định nhất; lớp 3 (thẻ) mạnh nhất nhưng dễ lệch giữa các lần tạo.

**Lớp 1 — Dấu câu: điều khiển lên giọng, xuống giọng, ngập ngừng**

| Muốn | Viết | Ví dụ |
|---|---|---|
| lên giọng cuối câu | `?` | `Three BILLION dollars?` |
| lên giọng, sửng sốt | `?!` | `They bought HOW many?!` |
| bật mạnh | `!` (mỗi cảnh 1–2 lần, không rải) | `Buy ten thousand!` |
| xuống giọng, dứt khoát | câu ngắn kết bằng `.` | `No. Nothing. Not one.` |
| ngập ngừng, tìm chữ | `…` giữa câu | `Well… technically… no.` |
| bỏ lửng, hạ giọng dần | `…` cuối câu | `And nobody asked why…` |
| tự ngắt lời, đổi ý | `—` | `It was perfect — until Tuesday.` |
| bị ngắt lời | `—` cuối lượt thoại | `But the rules say—` |
| lắp bắp, hoảng | lặp chữ đầu + `—` | `I— I just buy things?` |
| chêm tiếng đệm | `uh,` `um,` `well,` `oh —` `hm.` `huh.` | `Oh — small. For now.` |
| chậm lại từng chữ | mỗi chữ một câu | `Every. Single. Hour.` |
| chèn ý mỉa trong ngoặc | `—…—` | `The plan — and I use that word loosely — worked.` |

**Lớp 2 — Chữ: nhấn và kéo dài**

| Muốn | Viết | Ví dụ |
|---|---|---|
| nhấn một chữ | IN HOA đúng một chữ mỗi câu | `That's a LOT of chips.` |
| kéo dài, lười biếng, mỉa | lặp nguyên âm 2–3 lần | `Sooo… that went well.` · `Riiight.` |
| đối lập hai vế | in hoa hai chữ đối nhau ở **hai câu** khác nhau | `Not the BOXES. The MATH.` |
| đọc chậm một con số | viết con số thành câu riêng | `Seven and a half. Billion. Dollars.` |

**Lớp 3 — Thẻ: cảm xúc, cao độ, tốc độ, âm lượng**

| Nhóm | Thẻ | Ghi chú |
|---|---|---|
| Cảm xúc chính thức | `[excited]` `[curious]` `[sarcastic]` `[surprised]` `[thoughtful]` `[happy]` `[sad]` `[annoyed]` `[appalled]` `[mischievously]` | ổn định nhất |
| Tiếng người | `[laughs]` `[chuckles]` `[sighs]` `[exhales]` `[snorts]` `[clears throat]` `[gasps]` `[laughs nervously]` | đặt đầu câu **hoặc giữa câu** |
| Âm lượng | `[whispers]` `[quietly]` `[shouting]` `[under his breath]` | |
| Cao độ, hướng giọng *(thử nghiệm)* | `[voice rising]` `[higher pitch]` `[voice dropping]` `[lower]` `[trailing off]` | thẻ tự mô tả, phải nghe thử |
| Tốc độ *(thử nghiệm)* | `[speeding up]` `[rushed]` `[slowly]` `[deliberately]` `[drawn out]` | |
| Thái độ ghép | `[deadpan]` `[dry]` `[warmly]` `[lower, conspiratorial]` `[pause, then quietly]` `[excited, building]` `[disbelief, voice rising]` | ghép 2 ý trong một thẻ |

Thẻ đánh dấu *thử nghiệm* không có trong danh sách chính thức của ElevenLabs. Lần đầu dùng một thẻ thì nghe thử với giọng của kênh, rồi ghi "ăn / không ăn" vào nhật ký thẻ trong `channel/voice.md`. Thẻ không ăn thì thay bằng lớp 1 và 2.

**Cách dùng cho lời dẫn**
- Mỗi **đoạn** (3–6 dòng) có một đường cảm xúc: mở bình thường → **một** chỗ lên (câu hỏi, chữ in hoa, `[curious]`) → **một** chỗ xuống (câu ngắn, `[deadpan]`, `…`). Đoạn nào đọc lên thấy phẳng thì thiếu một trong hai.
- Trước mỗi con số lớn hoặc câu chốt: câu ngay trước kết bằng `…`.
- Câu treo (`{LOOP}`): hạ giọng (`[lower, conspiratorial]`, `[whispers]`) hoặc bỏ lửng bằng `…`.
- Không quá 30% số dòng có thẻ; phần còn lại lấy cảm xúc từ lớp 1 và 2.

**Cách dùng cho thoại**
- **Lượt nào cũng mang ít nhất một tín hiệu**: thẻ vai + cảm xúc, và thêm dấu câu lớp 1 khi nhân vật ngập ngừng, hoảng hay mỉa.
- Trong một cảnh, cảm xúc của mỗi nhân vật **đi một đường**: tò mò → nghi ngờ → hoảng; hoặc tự tin → ngập ngừng → cười trừ. Không lặp một thẻ quá 2 lượt liền.
- Hai nhân vật đối đáp thì đi **ngược chiều**: một người càng lúc càng to (`[voice rising]`, `!`, `?!`), người kia càng lúc càng phẳng (`[deadpan]`, câu 2–3 chữ).
- Tiếng cười, thở, ngập ngừng đặt **giữa câu** nghe thật hơn đặt đầu câu: `Oh — small. [laughs nervously] For now.`

Ví dụ một cảnh trước và sau:

```
Trước:
Investor: [excited, talking fast] How long is the waitlist?
Investor 2: [woman's voice, calm and dry] How long is your patience?

Sau:
Investor: [excited, voice rising] Wait — there's a WAITLIST?!
Investor 2: [woman's voice, calm and dry] There's always a waitlist.
Investor: [panicking, speeding up] How long? A week? A month? Is it— is it a year?
Investor 2: [woman's voice, slowly] Well… [sighs] how patient are you?
Investor: [quietly, defeated] …Not very.
```

### Dấu câu và nhịp

Eleven v4 **không nhận `<break>` và SSML**. Nhịp đến từ chữ:
- **Xuống dòng** = một nhịp thở. Linter đã xuất mỗi câu một dòng.
- **"…"** = khoảng lặng có sức nặng. Đặt trước punchline, sau một con số lớn, hoặc ở chỗ ngập ngừng: `Here's the thing… it was never a toy.`
- **"—"** = rẽ ngang hoặc bị ngắt lời: `It was perfect — until Tuesday.`
- **`[short pause]` / `[long pause]`** khi "…" chưa đủ dài. Dùng ít.
- **IN HOA một chữ** để nhấn: `Except one company bought ALL of them.` Tối đa một chữ in hoa mỗi câu (lời dẫn: khoảng một chữ mỗi đoạn; thoại: thoải mái hơn), chọn chữ mang nghĩa đối lập hoặc con số. Chữ viết tắt (AI, GPU, CEO) không tính, vì vốn đã đọc từng chữ cái.
- Dấu `?` và `!` thật sự đổi ngữ điệu. Câu hỏi tu từ phải có `?`.

### Câu văn chống nhàm

- **Xen câu dài với câu rất ngắn.** Ba câu cùng độ dài liền nhau là ba câu cùng giai điệu. Câu một hai chữ ("Brilliant." "Very serious.") là vũ khí mạnh nhất của giọng deadpan.
- **Hỏi → xuống dòng → trả lời.** Khoảng trống giữa hai dòng tạo kỳ vọng.
- **Liệt kê ba, cái thứ ba lệch:** `Brilliant. Very serious. Eats the paste.`
- **Mỗi đoạn kết bằng một câu ngắn.** Câu dài ở cuối đoạn làm giọng chùng xuống và nghe như hết hơi.

Ví dụ trước và sau:

```
Trước:
N: The company sold the chips to a firm in Malaysia, which then rented the computing power to customers in China, and nobody broke any rules.

Sau:
N: The company sold the chips to a firm in Malaysia.
N: Malaysia rented the computing power to China.
N: Did anyone break a rule?
N: [deadpan] Technically… no.
```

## 5. Tạo giọng

1. **Xuất file từ kịch bản** (xem `eli5-story-script` mục 8):
   ```bash
   python3 -I .claude/skills/eli5-story-script/scripts/script_lint.py episodes/<tập>/script/<slug>.script.md \
     --tts-dir episodes/<tập>/script/<slug>.elevenlabs --tsv episodes/<tập>/lines.tsv
   ```
   Sửa hết cảnh báo ở mục "Giọng đọc" của linter trước khi tốn credit.

2. **Người dẫn: tạo theo đoạn, không tạo từng câu.** Tạo riêng từng câu làm mỗi câu thành một câu mở đầu, ngữ điệu reset liên tục: đó chính là giọng nhàm. Tạo mỗi file `.txt` (một phần, ≤ 2,400 ký tự) thành một lượt.
   - Mỗi phần tạo **2–3 lần**, chọn bản hay nhất. Lấy câu hay từ nhiều bản ghép lại cũng được, nếu cắt ở chỗ nghỉ.
   - Qua API: `model_id: "eleven_v4"`, `voice_settings` như mục 3, và truyền `previous_request_ids` (tối đa 3) của phần trước để các phần nối liền mạch. Truyền cả request id thì `previous_text` bị bỏ qua.
   - Qua web: dán từng file, cùng giọng, cùng thiết lập, tải về và đặt tên trùng file chữ.
   - Bản đã chọn của mỗi file lưu ở `episodes/<tập>/voice/<tên file>.mp3` (ví dụ `voice/05b_the-approach.mp3`). Thư mục này chỉ giữ bản chọn; bản thô không cần giữ. `public/<tập>/audio/` để dành cho file từng câu sau khi cắt (bước 4).
   - `HUONG-DAN.md` trong thư mục xuất đã ghi sẵn giọng, thiết lập (đọc từ `channel/voice.md`), thứ tự file, số credit dự trù và danh sách nghe soát. Một phần dài quá 2,400 ký tự được chia thành các file dài xấp xỉ nhau (`05a`, `05b`), không để lại file đuôi chỉ có một câu.

3. **Nhân vật skit:**
   - Thẻ vai viết ngay trong kịch bản gốc (`Hawk: [gruff, shouting] Ban cloud rentals!`, `Alice: [woman's voice, brief] Cloud.`). Mọi vai dùng voice người dẫn, không cần `--voice` riêng cho vai nào.
   - Câu lẻ: tạo từng câu bằng voice của vai, theo bảng "Lời thoại nhân vật" trong `HUONG-DAN.md` hoặc các dòng có tên vai trong `lines.tsv`. Lời thoại vai nam do voice người dẫn đọc thì để nguyên trong file đoạn, tạo cùng lời dẫn luôn.
   - Skit đối đáp nhiều lượt: dùng Text to Dialogue (`POST /v1/text-to-dialogue`) để các vai phản ứng với nhau tự nhiên hơn. Phải truyền `model_id: "eleven_v4"` vì mặc định của endpoint này là v3. Giới hạn: tối đa 10 giọng và khoảng 2,000 ký tự mỗi lượt.

4. **Cắt về từng dòng cho Remotion.** Remotion cần mỗi dòng một file `public/<tập>/audio/<id>.wav`, với id theo `lines.tsv` (dùng cho thời lượng shot và khẩu hình), cùng `episodes/<tập>/src/timing.json` như `make_voice.sh` ghi ra. Cắt file của mỗi phần theo khoảng lặng giữa các dòng (`ffmpeg -af silencedetect=noise=-35dB:d=0.25`). Số đoạn cắt được phải bằng số dòng của phần đó; lệch thì chỉnh ngưỡng hoặc cắt tay ở chỗ sai. **Hiện chưa có script tự làm bước này và bước gọi API**: khi Tú cần, viết `scripts/make_voice_elevenlabs.sh` (hoặc `.py`) với đầu ra trùng với `make_voice.sh`. Không dùng `/with-timestamps`: giọng đọc tự do theo nhịp của nó, hình dựng theo tiếng chứ không ép tiếng theo hình.

## 6. Nghe soát

Nghe hết bằng tai nghe trước khi dựng. Mỗi phần kiểm:
- [ ] Tên riêng, chữ viết tắt **và con số** đọc đúng. File xuất giữ nguyên chữ số (ngày, năm, tiền, %, số lớn) vì v4 đọc được. Nếu giọng đọc sai một kiểu số (ví dụ năm đọc thành "two thousand twenty-six"), xuất lại với `script_lint.py --spell-numbers` rồi tạo lại phần đó.
- [ ] Tên riêng và chữ viết tắt đọc đúng. Sai thì thêm vào Pronunciation Dictionary của ElevenLabs, hoặc vào `TTS_REPLACE` trong linter. Không viết sai chính tả trong kịch bản.
- [ ] Không có thẻ nào bị đọc thành chữ, không có tiếng động lạ.
- [ ] Câu chốt có khoảng lặng trước và đọc khô. Không cười trước punchline.
- [ ] Không có ba câu liền nhau cùng một giai điệu.
- [ ] Câu hỏi có lên giọng, câu chốt có xuống giọng, chỗ `…` có ngập ngừng thật. Chỗ nào viết mà giọng không làm theo thì đổi công cụ (thẻ ↔ dấu câu), đừng chỉ tạo lại. Nếu có, quay lại mục 4 sửa câu chứ đừng chỉ tạo lại.
- [ ] Giọng giữa các phần cùng một người: cùng độ cao, cùng độ vang.
- [ ] Không nuốt chữ, không nhanh dồn ở cuối đoạn dài, không có tiếng thở hay tiếng rè lạ.
- [ ] Nhắm mắt nghe vẫn phân biệt được vai nhại với lời dẫn và với nhau. Vai nhại nào lẫn thì đổi thẻ vai cho khác hẳn.

Sau mỗi tập, ghi vào `channel/voice.md`: thẻ nào ăn, thẻ nào hỏng, từ nào phải sửa cách đọc.

## 7. Credit và tài khoản

- Credit tính theo ký tự, **kể cả ký tự trong thẻ**. Một tập khoảng 14–16 nghìn ký tự; tạo 2–3 lần mỗi phần nên dự trù **gấp 2–3 lần**. Kiểm số dư bằng `GET /v1/user/subscription` (`character_count` / `character_limit`).
- API key để trong biến môi trường hoặc `.env` (đã nằm trong `.gitignore`). Không dán key vào chat, kịch bản hay `.mcp.json` của dự án.
- **Dùng nhiều tài khoản:** `voice_id` gắn với từng tài khoản, nên phải thêm cùng giọng vào mọi tài khoản, và dùng cùng thiết lập. Nghe thử một đoạn ở tài khoản mới trước khi dùng lẫn trong một tập. Giọng tự clone thì clone lại ở mỗi tài khoản sẽ hơi khác nhau. Nhiều tài khoản miễn phí để lách giới hạn có thể trái điều khoản của ElevenLabs. Nếu tổng tiền tương đương, một gói lớn hơn thường rẻ hơn tính theo credit.
- Nếu cài MCP ElevenLabs: mỗi tài khoản một mục với key riêng, cài ở phạm vi user (`claude mcp add elevenlabs-a -s user -e ELEVENLABS_API_KEY=… -- uvx elevenlabs-mcp`); hết credit thì chuyển sang mục kia.
