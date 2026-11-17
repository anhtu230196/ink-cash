# Thumbnail

Rút từ 6 thumbnail của Crayon Capital mà Tú gửi ngày 17/11/2026: Jensen Huang Scandal (491N view sau 2 ngày), J.P. Morgan (262N), Steve Jobs (239N), Anthropic (1 triệu), "The First Big Victim of the AI Bubble" (467N), BYD (293N). Bản v1 của ep01 làm theo quy tắc cũ (mặt to + bức tường phẳng + chữ viết tay) và bị Tú chê "chưa hấp dẫn". Lý do: thiếu người dẫn phản ứng, phông phẳng, chữ viết tay khó đọc ở cỡ nhỏ.

## Công thức

| # | Thành phần | Cách làm của kênh mẫu | Cách làm của mình |
|---|---|---|---|
| 1 | **Chữ** | 1–2 từ: **tên chủ thể** ("J.P. Morgan", "STEVE JOBS", "Anthropic") hoặc **một con số** ("-$35 Billion"). Chữ không chân, rất đậm, màu trắng, viền tối mỏng + bóng đổ. Nằm dọc mép trên, rộng 55–85% khung, cao 15–20% khung. Được phép lặp tên có trong tiêu đề. | Montserrat 900, trắng, viền `#16141F`. Dài 6–12 ký tự thì cỡ 140–170 px. |
| 2 | **Người dẫn phản ứng** | Mascot của kênh có mặt ở 5/6 thumbnail. Đứng góc trái dưới, bị mép khung cắt, đầu cao 35–45% khung, quay về phía chủ thể. Biểu cảm hoảng hốt, há miệng, lo lắng hoặc cười đắc ý. | Host của Ink & Cash: tóc xoăn nâu, kính tròn, vest navy, cà vạt hổ phách. **Tròng kính tô trắng, con ngươi đen to nhìn về chủ thể**, có chấm sáng; thêm giọt mồ hôi, 3 vạch sốc. Không cần cây bút: chi tiết nhỏ chỉ làm rối mặt. |
| 3 | **Chủ thể** | Nhân vật chính ở giữa hoặc lệch phải, đầu cao 30–40% khung. Biểu cảm mạnh (đắc ý, giận, sợ). Sáng nhất khung, được ngược sáng từ phía sau. | Đặt đầu ngay trước nguồn sáng xa nhất của cảnh để có quầng sáng (`Halo`); má hồng, mồ hôi. |
| 4 | **Một vật kể chuyện** | Máy Macintosh, xe BYD, quả cầu pha lê có logo AI, ngai vàng + núi tiền, quả cầu phát sáng trong lồng kính. | Chọn vật nói được "chuyện gì xảy ra" mà không cần chữ. Ví dụ ep01: thùng các-tông đồ đạc (rời công ty) có con GPU ló ra. |
| 5 | **Phông đầy chi tiết, tối, một nguồn sáng** | Không bao giờ để nền phẳng: cột ngân hàng, giá server, cọc tiền, phối cảnh có chiều sâu. Toàn khung tối, một nguồn sáng mạnh sau chủ thể. Màu bão hoà. | Dựng phối cảnh một điểm tụ bằng code (dãy server, đèn trần, sàn bóng, sương sáng, tia sáng). Điểm tụ nằm sau đầu chủ thể. |
| 6 | **Một điểm đỏ** | Đường biểu đồ đỏ lao xuống, dây đỏ, nhãn đỏ, nền đỏ. | Một thứ màu đỏ có viền + phát sáng, ví dụ đường giá cổ phiếu cắm xuống. Không quá một thứ đỏ. |
| 7 | **Đổ bóng nhân vật** | Mặt và áo có tô bóng, viền sáng, viền đen dày. | `Shaded`: dải màu hổ phách ấm ở phía có đèn, tối dần ở phía kia, cắt theo đúng hình nhân vật. `Halo`: hai lớp quầng (một rộng mờ, một sát và sáng). Không dùng `Rim` cho thumbnail vì nguồn sáng nằm trong hình nhân vật sẽ tạo đốm trắng trên trán. |

Quy tắc của Paper Billions ("con số đỏ, chữ bổ sung chứ không lặp tiêu đề") vẫn đúng **khi chữ là con số**. Khi chữ là tên chủ thể thì làm theo Crayon Capital: trắng, được lặp tên.

## Không chép
- Bố cục thumbnail cụ thể của kênh mẫu. Ví dụ: bảng ghim ảnh nối dây đỏ (Crayon đã dùng cho chính chuyện Jensen), quả cầu pha lê, ngai vàng.
- Thiết kế mascot của họ (tóc nâu ngắn, kính to, nơ đỏ, áo nâu). Mình dùng host riêng.
- Logo thật vẽ to làm nhân vật chính. Tên công ty viết bằng chữ là đủ.

## Kiểm trước khi xuất
1. Thu về rộng 246 px (cỡ gợi ý trên điện thoại): vẫn đọc được chữ, nhận ra hai khuôn mặt và cảm xúc, thấy được vật kể chuyện.
2. Không có gì nằm trong góc phải dưới (YouTube che bằng nhãn thời lượng) ngoài thứ phụ, như đầu mũi tên.
3. Ghép cạnh 2–3 thumbnail đối thủ cùng đề tài: thumbnail của mình phải khác màu chủ đạo và khác bố cục.
4. PNG 1280x720, dưới 2 MB.
5. Làm 2 phương án chỉ khác dòng chữ (tên hoặc con số) để chạy *Test & compare*.

## Code mẫu
`episodes/ep01-megaspeed/src/thumbnail/Thumbnail.tsx` (composition `ep01-Thumbnail`, prop `variant`). Có thể dùng lại các phần: `Aisle`/`Racks` (phối cảnh một điểm tụ), `Shaded`, `Halo`, `Sweat`, `Blush`, `BigText`, và đoạn tô tròng kính cho host. Tập mới thì chép file, đổi phông, vật kể chuyện và dòng chữ.
