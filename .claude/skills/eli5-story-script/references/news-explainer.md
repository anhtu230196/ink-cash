# Dạng "giải thích tin nóng"

Rút từ 4 kịch bản của kênh Paper Billions (đo ngày 2026-11-13; số liệu ở `cartoon-explainer-video/references/analysis-paperbillions.md`). Đây là dạng thứ hai bên cạnh dạng "The Rise of X". Học cấu trúc, không chép câu; mọi ví dụ dưới đây là ví dụ tự viết.

## Khi nào dùng

| | "The Rise of X" (dạng gốc) | Giải thích tin nóng |
|---|---|---|
| Đề tài | cả hành trình một công ty/nhân vật | một sự kiện vừa xảy ra trong 1–14 ngày |
| Xương sống | cuộc cược `{BET}` | một câu hỏi mà tiêu đề đặt ra (`# QUESTION:`) |
| Tiêu đề | "The Rise of X Explained Like You're 5" | câu người ta đang gõ tìm; đuôi "Explained…" chỉ hợp khi kênh đã có đuôi đó làm thương hiệu (Crayon Capital dùng "[Tên] Scandal Explained Like You're 5") |
| Hạn đăng | không gấp | càng sớm càng tốt; quá 5–7 ngày sau sự kiện thì đổi góc sang "chuyện gì xảy ra tiếp" |
| Đầu file | `# BET:` | `# FORMAT: news` và `# QUESTION:` |

Bốn khuôn tiêu đề đã thấy:
- **Why [chuyện] Just [xảy ra]**: vì sao thị trường vừa sập.
- **How [ai đó] [làm được việc khó tin]**: người lạ lọt vào bên trong một công ty lớn bằng cách nào.
- **[Thứ lớn nhất] + [con số ngược đời]**: thương vụ lớn nhất lịch sử lại lỗ hàng chục tỷ.
- **Why [công ty] Would [gặp chuyện] Without [người]**: hệ quả của một sự ra đi.

## Mở đầu (40 giây đầu, khoảng 100 từ)

1. **Câu 1 là một cảnh ở thì hiện tại, có nơi chốn, nhân vật và cái giá**, hoặc một con số kèm khoảng thời gian rất ngắn. Không tự giới thiệu, không "in this video".
2. **Câu nghịch lý**: điều khiến chuyện này lạ. Kiểu "và họ không làm gì sai cả" hoặc "người duy nhất không biết là ông ấy".
3. **Một skit 2 câu** cho thấy giọng điệu của video.
4. **Lời hứa**: "đây là câu chuyện về…" hoặc đặt thẳng hai câu hỏi mà video sẽ trả lời.
5. **Mũi tên chỉ đường** `{LOOP}`: "chuyện bắt đầu từ…" rồi nhảy sang cảnh mở chương đầu tiên (không hiện chữ tên chương).

Biến thể cho video "vì sao": sau câu hỏi, đưa luôn **câu trả lời ngắn** bằng một câu liệt kê 3 nguyên nhân, rồi nói "câu trả lời dài bắt đầu từ một tháng trước". Người xem biết đích đến nhưng vẫn muốn nghe cách ghép lại.

Ví dụ tự viết:
```
N: On Thursday, Leo's Coffee lost four hundred million dollars before lunch. {SRC:1}
CARD: And it hadn't done anything wrong.
Trader: Should I panic?
Trader 2: Everyone else already did. {GAG}
N: So why did coffee stocks just crash?
N: The short answer: a frost, a tweet, and one very nervous pension fund. {SRC:2}
N: The long answer starts a month earlier. {LOOP}
```

## Năm khung chương

Tỷ lệ tính theo thời lượng thật của video mẫu. Mỗi chương mở bằng một thẻ đen có tên 2–4 từ, đặt theo một hình ảnh trong chương. Viết bằng `CHAPTER:` (chỉ hiện chữ, không đọc), không dùng `CARD:` vì `CARD:` sẽ bị người dẫn đọc lên.

**A. "Vì sao X vừa xảy ra"** (15 phút)

| % | Chương | Nội dung |
|---|---|---|
| 5 | Mở | con số + nghịch lý + trả lời ngắn + "câu trả lời dài bắt đầu từ…" |
| 8 | Đỉnh cao | mọi thứ trông tuyệt vời ra sao ngay trước đó; cài sẵn ý "bạn cũng đang sở hữu nó" |
| 20 | Các vết nứt | 3–4 điểm yếu đánh số, mỗi điểm một ví von và một skit ngắn |
| 12 | Ngòi nổ | sự kiện bên ngoài (bầu cử, lệnh cấm, một bản tin) và vì sao nó chạm tới thị trường |
| 9 | Bình yên giả | một ngày tăng trước khi sập, để cú rơi đau hơn |
| 19 | Ngày đó | **đồng hồ đếm giờ**: mỗi mốc giờ một sự kiện, một con số, một câu nói thật |
| 7 | Ai chịu | người xem bình thường bị ảnh hưởng thế nào `{YOU}` |
| 20 | Trả lời | không có kẻ xấu duy nhất → tóm lại nguyên nhân trong 4 câu → tiền lệ lịch sử → trả lời thẳng câu hỏi lớn ("chưa phải") → dấu hiệu nhỏ ít ai để ý → mốc ngày sắp tới → câu kết gọi lại hình ảnh mở đầu |

**B. "X đã làm Y như thế nào"** (20 phút)

| % | Chương | Nội dung |
|---|---|---|
| 3.5 | Mở | cảnh hiện tại + nghịch lý + lời hứa |
| 19 | Người nắm chìa khoá | tiểu sử nhân vật chính, kể bằng skit; kết bằng lý do ông ấy quan trọng với phe kia |
| 8 | Cánh cửa khoá | luật cấm hoặc rào cản tạo ra động cơ |
| 6 | Vỏ bọc | phía bên kia dựng lên cái gì để lách |
| 15 | Tiếp cận | gặp gỡ, lớn nhanh bất thường, người đầu tiên nghi ngờ nhưng không ai làm gì |
| 8 | Đường dây | hàng và tiền đi đường nào; so quy mô với một vụ nhỏ mà ai cũng biết |
| 19 | Mục đích thật | thứ họ muốn không phải món hàng mà là ảnh hưởng; nhân vật chính nói gì công khai |
| 4 | Lộ ra | ai viết ra, ai được đọc |
| 17 | Chiếc ghế trống | phản ứng các bên → câu hỏi chưa ai trả lời → `{YOU}` → mốc ngày sắp tới → quay lại cảnh mở, giờ đã khác |

**C. "Con số gây sốc thật ra nghĩa là gì"** (14 phút)

| % | Chương | Nội dung |
|---|---|---|
| 4 | Mở | con số quy ra mỗi giờ + phản ứng ngược đời của thị trường + 2 câu hỏi |
| 20 | Gốc gác chi phí | công ty tiêu tiền vào đâu; một chi tiết cài sẵn "nhớ lấy, nó sẽ quay lại" |
| 18 | Giỏi quá hoá rắc rối | tăng trưởng, rồi một cú va với chính phủ hoặc đối thủ |
| 22 | Con số đó | vì sao phần lớn chỉ là bút toán; ví von quầy nước chanh; cùng một tờ giấy, bên này ghi lỗ, bên kia ghi lãi |
| 11 | Hoá đơn thật | con số ít ai nhắc mới là thứ đáng lo |
| 25 | Đến lượt bạn | công ty lên sàn thế nào, người thường mua được gì, chuyên gia nói gì, lời tự cảnh báo của chính CEO, hiện trạng, câu kết |

**D. "Chuyện ai cũng biết, và hai chỗ không khớp"** (14–15 phút; rút từ video tin nóng của Crayon Capital, 14/11/2026)

Dùng khi tin đã lên báo khắp nơi và người xem tưởng mình biết hết. Video không kể lại tin; nó đưa lời giải thích phổ biến ra trước rồi phá nó.

| % | Chương | Nội dung |
|---|---|---|
| 4 | Mở | thời điểm + sự kiện + con số thiệt hại trong một tuần → "mọi tờ báo nói cùng một điều" → "nhưng có chỗ lạ" → câu hỏi "thật ra cái gì…" → câu bàn giao có một đồ vật ("phải bắt đầu từ một cái email") |
| 10 | Chuyện ai cũng biết | cái gì bị đặt cược → văn bản gốc đọc thành tiếng, có người nghe chen ngang → "rồi tệ hơn" ba lần, mỗi lần một nguồn → câu chốt đối xứng ("33 năm. Kết thúc trong bốn ngày.") |
| 8 | Hai chỗ không khớp | "Vụ án khép lại. Trừ hai điều." Một: chi tiết phá lời giải thích quen thuộc. Hai: mốc thời gian. → câu hỏi mới → "quên [chuyện bề mặt] đi, lần theo [món hàng]" |
| 18 | Luật và nghịch lý | rào cản ra đời (skit) → nhân vật chính chống lại nó → mất thị trường → **đáng lẽ co lại mà lại tăng** → skit hai người đọc bảng số → nhân vật chính thách "tôi muốn thấy" → "Được thôi, đi xem." |
| 18 | Đi xem tận nơi | 2–3 chi tiết thực địa buồn cười mà có nguồn → lịch sử pháp nhân → hai con số đặt cạnh nhau → đường tiền → skit người kiểm tra → con số cáo buộc → "vậy đây chưa bao giờ chỉ là [chuyện bề mặt]" |
| 5 | Ai được gì | ba bên, mỗi bên một câu → "ai cũng thắng, trừ…" → gọi lại chỗ lạ ở phần mở |
| 14 | Tấm khiên | vì sao không ai ra tay: skit quan chức trả lời vòng vo → một con số bằng không → quan hệ che chắn → đặt tên cho nó bằng một danh từ ("tấm khiên") |
| 6 | Khiên vỡ | sự kiện bên ngoài đổi cán cân → mọi thứ bị giữ lại tràn ra cùng lúc → kết cục |
| 11 | Tranh luận | hai giọng: người bênh và người buộc tội (3 lý do đánh số). Câu rào "allegedly, chưa ai bị buộc tội" do người bênh nói. Rồi câu hỏi kế tiếp ("ai thay được?") |
| 5 | Kết | giới thiệu video cũ như một phần luận điểm → luận đề → ba vế song song → thẻ trích dẫn |

Lưu ý khi dùng khung D: nó dựa nhiều vào chuyện đời tư và cáo buộc. Giữ quy tắc `real-people.md`: không đùa về đời tư hay giới tính của người có tên, không đặt câu thô vào miệng người thật (video mẫu làm cả hai, mình không theo).

**E. "Đi theo một món đồ"** (18–20 phút; rút từ video thứ năm của Paper Billions, phần tiếp theo vụ Megaspeed, 11/2026)

Dùng khi câu chuyện là một **chuỗi nhiều bên** (chuỗi cung ứng, đường tiền, đường hàng lậu) hoặc khi làm phần tiếp theo của một tin đã kể. Một món đồ cụ thể (cái hộp, tấm séc, container) đi qua cả video; mỗi chương là một trạm dừng, mỗi trạm có một người được trả tiền.

| % | Chương | Nội dung |
|---|---|---|
| 3 | Mở | ẩn dụ ở câu đầu ("đây là một lá thư tình") → trong đó là gì, bao nhiêu → lật giả định của người xem bằng một giọng hỏi (kỹ thuật 24) → mệnh lệnh "hãy đi theo một cái hộp" → lời hứa `{YOU}`: "cái tên cuối trên hoá đơn là bạn" |
| 12 | Món đồ là gì | giá, vì sao đắt, ai cần → vì sao bên kia không tự làm được → rào cản (luật cấm) |
| 12 | Thang quy mô | người buôn nhỏ nhất (một nhân vật có tên gọi, có chi tiết buồn cười) → cách làm đông người, nhỏ lẻ → vì sao cách đó không đủ → "muốn số lượng đó thì không cần kẻ buôn lậu, cần một khách hàng" (kỹ thuật 25) |
| 14 | Người mua | khách hàng xuất hiện, quan hệ với nhân vật chính → trả lời lại câu hỏi ở phần mở với nghĩa đầy đủ |
| 14 | Địa chỉ | hoá đơn ghi một nơi, hàng đi nơi khác → kẽ hở hợp pháp (thuê thay vì mua) → một lần kiểm tra suýt làm lộ |
| 14 | Qua mặt kiểm đếm | một vụ khác cùng ngành làm mẫu: cách che một nhà kho rỗng, chi tiết thực địa có nguồn |
| 9 | Tờ hoá đơn | đọc từng dòng: ai được trả, bao nhiêu → nhân vật nhỏ ở đầu video quay lại (kỹ thuật 26) → dòng cuối bất ngờ (chính phủ cũng thu phần) → nghịch lý chốt chương |
| 10 | Người gác cổng | ai có quyền chặn, vì sao không chặn → cái gì làm họ phải động tay → mọi thứ vỡ ra trong hai tuần |
| 12 | Ai trả giá | nhân vật chính → cổ phiếu → `{YOU}` bằng tiền cụ thể → luật sắp tới và lịch điều trần → ẩn dụ ở câu đầu đổi nghĩa (kỹ thuật 23) → quay lại món đồ, một hình ảnh yên tĩnh → một món đồ mới ra khỏi dây chuyền |

## Kỹ thuật riêng của dạng này

1. **Chia đầu người.** Số quá lớn thì chia cho dân số, cho mỗi giờ, hoặc cho một tài khoản hưu trí điển hình. "Bốn tỷ rưỡi" thành "khoảng mười ba đô mỗi người Mỹ".
2. **Mỗi khái niệm một ví von bằng đồ trong nhà.** Cho thuê chip = mua xe đậu sát biên giới rồi cho thuê chìa theo giờ. Hỏi "đứa trẻ 10 tuổi đã thấy thứ gì giống vậy?".
3. **Cài rồi trả.** Nói rõ "nhớ chi tiết này" hoặc "giữ ý đó" ở phút 2, trả lại ở phút 7 với một con số. Đánh `{LOOP}` ở dòng cài.
4. **Danh sách đánh số.** "Bốn vết nứt. Vết nứt một." Người xem biết còn bao nhiêu và ở lại để nghe hết.
5. **Đồng hồ.** Trong chương kể ngày xảy ra, mỗi đoạn mở bằng giờ ("9:30.", "11:17."). Hình giữ một đồng hồ ở góc.
6. **Đoạn "ví của bạn"** `{YOU}`: bắt buộc có ít nhất một lần, tốt nhất là hai (một lần cài sớm, một lần gần cuối). Nói bằng tiền cụ thể: "nếu quỹ của bạn có 10,000 đô thì khoảng 650 đô nằm ở công ty này".
7. **Không có kẻ xấu duy nhất.** Cho mỗi bên nói một câu lý do của mình; từng lựa chọn đều hợp lý, chỉ là rơi vào cùng một buổi sáng.
8. **Trả lời thẳng câu hỏi tiêu đề**, kèm sắc thái. "Vậy đó có phải bong bóng vỡ không? Chưa." Rồi một câu ẩn dụ để người xem nhớ.
9. **Cho phe ngược lại nói đàng hoàng.** "Phe lạc quan có lý do thật." Rồi mới phản biện.
10. **Tiền lệ lịch sử** một đoạn 30–40 giây (cơn sốt đường sắt, lần trước một CEO ra đi) và nói rõ lần này khác ở đâu.
11. **Kết bằng lịch.** Nêu 2–3 mốc ngày sắp tới mà người xem có thể tự theo dõi, rồi gọi lại hình ảnh mở đầu.
12. **Câu đùa lặp lại.** Một câu thoại ngắn xuất hiện 3 lần trong video, lần cuối mang nghĩa khác.
13. **Skit là cảnh đầy đủ, gag cụt chỉ là gia vị.** Phần lớn skit của kênh mẫu dài 6–10 lượt với câu trọn vẹn và ba nhịp mở → leo thang → chốt (cảnh thanh tra bước vào data center toàn thùng giấy; cảnh giao nhiệm vụ). Gag hỏi đáp 1–5 từ ("Bao nhiêu chiếc?" "Có.") chỉ chiếm phần nhỏ, đặt giữa các đoạn nhiều số. Quy tắc cỡ skit ở `craft.md` mục 5; cảnh diễn lại cáo buộc theo mức cam trong `real-people.md`.
14. **Trích dẫn thật để nguyên văn, có tên và ngày.** Thoại tái hiện thì không gắn tên như một trích dẫn. Cáo buộc luôn đi kèm người nói ra nó.
15. **Nối các video với nhau.** Nhắc "chuyện đó đã kể ở video trước" thay vì kể lại; cuối video nêu mốc ngày để có cớ làm video sau.

16. **Câu bàn giao giữa các chương là một mệnh lệnh có đồ vật.** "Phải bắt đầu từ một cái email." "Quên chuyện tình đi, lần theo con chip." Mạnh nhất là biến lời thách của nhân vật thành cớ chuyển chương: nhân vật nói "tôi rất muốn thấy", người dẫn đáp "Được thôi, đi xem." Đánh `{LOOP}`.
17. **Người nghe chen ngang.** Một giọng phụ nói thay khán giả, 1–3 từ, đúng chỗ người xem sẽ thắc mắc: "Wow." "Sao ông ấy lại nói câu đó?" "Đáng ngờ." Người dẫn đáp "Câu hỏi hay." rồi trả lời. Viết thành dòng thoại của một vai `Viewer`, tối đa 6–8 lần mỗi video.
18. **Đặt tên mỗi hồi bằng một danh từ rồi nhắc lại.** "Vậy đó là tấm khiên." Hồi sau dùng lại đúng từ đó ("tấm khiên biến mất"). Người xem nhớ cấu trúc bằng 3–4 danh từ.
19. **Bảng "ai được gì".** Sau phần điều tra, liệt kê ba bên, mỗi bên một câu, kết bằng "ai cũng thắng, trừ…". Biến một mớ chi tiết thành động cơ.
20. **Rào pháp lý đặt trong miệng nhân vật.** Trong đoạn tranh luận, phe bênh nói "Allegedly, though. Chưa ai buộc tội ông ấy." Nghe tự nhiên hơn người dẫn đọc disclaimer, và vẫn phải có. Không thay cho việc nêu nguồn ở từng câu cáo buộc.
21. **Giới thiệu video cũ như một luận điểm.** "Cách ông ấy dựng công ty vẫn đáng nể — bọn mình có cả một video về chuyện đó." Đặt 30–40 giây trước khi hết, trước câu luận đề, không đặt sau câu kết.

22. **Một món đồ làm xương sống.** "Follow one box." Người dẫn luôn nói món đồ đang ở đâu ("Now our box has a buyer. Next it needs an address."). Câu bàn giao giữa các chương là món đồ cần gì tiếp theo. Người xem không bao giờ lạc, kể cả khi video đi qua bảy bên và bốn nước.
23. **Ẩn dụ mở ở câu đầu, đổi nghĩa ở cuối.** Chọn một hình ảnh cho cả video (lá thư tình, sợi dây xích). Giữa video dùng lại 1–2 lần. Cuối video trả lại với nghĩa khác: mở thư ra chỉ thấy hoá đơn; sợi dây "không biến mất, nó chỉ đổi tay". Không trả lại nguyên nghĩa cũ, và không dùng quá hai ẩn dụ lớn trong một video.
24. **Lật giả định trong 20 giây đầu.** Một giọng phụ nói ra điều người xem đang nghĩ, người dẫn bác từng câu, ngắn: "Vậy là bị tống tiền?" – "Không cần." – "Thế sao ông ấy đưa?" – "Không đưa. Ông ấy bán." Chỉ dùng khi lời giải thích phổ biến thật sự sai hoặc thiếu, và câu bác phải có nguồn ở phần sau.
25. **Thang quy mô.** Kể từ người nhỏ nhất lên: một cá nhân → cả một phong trào nhỏ lẻ → lý do nó không thể đạt con số ở tiêu đề → nhân vật chính bước vào. Mỗi bậc có một nhân vật hoặc một chi tiết buồn cười có nguồn, và một con số tiền lời để so với bậc sau.
26. **Nhân vật nhỏ quay lại để trả.** Một nhân vật phụ ở phút 3 (anh lái Prius lãi 300 đô) xuất hiện lại ở đoạn tổng kết với đúng con số đó, làm thước đo cho mọi người khác. Một **tình huống** lặp lại 3 lần với ba câu trả lời khác nhau (bàn hải quan: "Có gì khai báo không?") mạnh hơn lặp nguyên một câu thoại; lần cuối đáp án mang nghĩa của cả video.
27. **Tự đính chính con số của video trước.** "Bọn mình đã nói 2 tỷ. Thật ra là 7 tỷ rưỡi." Dùng khi làm phần tiếp theo: nó vừa giữ uy tín, vừa cho người xem cũ một lý do để xem. Phải nói rõ số mới đến từ nguồn nào.
28. **Nghịch lý có thật làm đỉnh chương.** Tìm một sự kiện tự mâu thuẫn và nói nó bằng hai vế đối nhau: "Mỹ cuối cùng cũng đồng ý bán… và Trung Quốc từ chối. Họ chặn thứ được phép và giữ thứ bị cấm." Mỗi video nên có ít nhất một nghịch lý như vậy, đặt cuối một chương, có `{SRC:n}`.

Lưu ý khi học video nguồn của kỹ thuật 22–28: video đó gọi thẳng một người chưa bị truy tố là điệp viên và nói về quan hệ riêng tư như sự thật. Kênh mình không làm vậy: mọi cáo buộc vẫn theo `real-people.md` và mục "Rào pháp lý".

## Thông số đích cho dạng này

| Chỉ số | Đích |
|---|---|
| Tốc độ đọc | 150–158 từ/phút |
| Câu ≤ 4 từ | ≥ 25% |
| Câu hỏi | ≥ 1.5 câu/phút |
| Dòng có con số | 2.5–7 dòng/phút, mỗi dòng có `{SRC:n}` |
| Skit hoặc trích dẫn | 1 lần mỗi 30–40 giây |
| Thẻ chương | 6–9 thẻ (khung D: 1 thẻ tựa + chuyển chương bằng câu bàn giao) |
| `{YOU}` | ≥ 1, nên 2 |
| Mô tả video | câu tóm tắt chứa từ khoá → 1 đoạn 3 câu → câu hỏi mời bình luận → mốc chương → "Figures as of <ngày>, from…" |

Linter: thêm `# FORMAT: news` và `# QUESTION:` ở đầu file. Khi đó linter bỏ kiểm cuộc cược và tỷ lệ 11 beat, đòi ít nhất một dòng `{YOU}`, và nới ngưỡng con số lên 2.5–7 dòng/phút. Beat đặt tên tự do theo chương (`## B01 · MỞ`, `## B02 · ĐỈNH CAO`…).

## Rào pháp lý

Dạng này nói về người thật và sự kiện đang diễn ra, nên lượt "sự thật" phải kỹ hơn dạng gốc:
- Mọi cáo buộc có chủ ngữ là nguồn: "theo bản ghi nhớ", "tờ báo viết", "công ty nói".
- Luôn có câu phản hồi của bên bị cáo buộc.
- Ghi "số liệu tính đến ngày…" trong mô tả.
- Người thật được nói trong skit theo `real-people.md` (xanh/vàng/cam/đỏ). Lời tưởng tượng không bao giờ lên thẻ trích dẫn. Cảnh diễn lại cáo buộc (mức cam) phải có câu mở khung `{DRAMATIZED}` kèm nguồn, người giao việc không tên, câu đóng khung nêu phủ nhận, và nhãn trên hình.
