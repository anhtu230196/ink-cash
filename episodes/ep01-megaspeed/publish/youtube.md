# ep01 — gói đăng YouTube (v5, 16/11/2026)

File video: `out/ep01-megaspeed_full.mp4` (17:40, -14 LUFS)
Thumbnail (v2, 17/11): `publish/thumb-nvidia.png` (chính), `publish/thumb-billion.png` (A/B) — 1280x720, < 2 MB. Bản v1 bị loại để ở `publish/v1/`. Quy tắc: `references/thumbnails.md` của skill. Dựng lại: composition `ep01-Thumbnail` (`src/thumbnail/Thumbnail.tsx`, prop `variant`).
Phụ đề: `publish/captions.en.srt` (357 câu, khớp từng câu thoại). Dựng lại: `python3 -I tools/make_captions.py episodes/ep01-megaspeed`.
Nguồn: `publish/sources.md` (dán vào Google Doc hoặc bình luận ghim).

> **Đăng ngay hôm nay (17/11).** Video nói "November 17: Nvidia reports earnings…" như sự kiện sắp tới. Nvidia công bố sau giờ đóng cửa thị trường Mỹ (16:00 giờ miền Đông, tức 04:00 sáng 18/11 giờ Việt Nam). Đăng sau mốc đó thì đoạn kết lỗi thời. Nếu lỡ mốc, cần sửa câu kết thành thì quá khứ rồi xuất lại.

## Tiêu đề

| # | Tiêu đề | Ký tự | Ghi chú |
|---|---|---|---|
| 1 ⭐ | **Jensen Huang, an Alleged Spy, and $7.5 Billion of Nvidia Chips** | 62 | Có từ khoá người ta đang tìm nhất (Jensen Huang, Nvidia, spy); chỉ liệt kê sự kiện, không khẳng định điều gì chưa chứng minh. Ghép với thumb **NVIDIA** |
| 2 | Did $7.5 Billion of Nvidia Chips Get Around America's Wall? | 59 | Tựa trong kịch bản. Gợi tò mò tốt nhưng thiếu "Jensen Huang" nên yếu ở tìm kiếm. |
| 3 | How a Cloud Loophole Put $7.5 Billion of Nvidia Chips in a Spy Story | 68 | Góc riêng (cloud loophole) khác hẳn hai kênh mẫu. |
| 4 | The Nvidia Spy Story Explained: Where Did $7.5 Billion of Chips Go? | 67 | Dạng "explained" dễ được tìm; câu trả lời có trong video (Đông Nam Á). |

Vì sao không dùng các tiêu đề khác:
- "How a Chinese Spy Got Inside Nvidia" là tiêu đề của Paper Billions, và "Jensen Huang Scandal Explained…" là của Crayon Capital: tránh giống.
- "Why Jensen Huang Left Nvidia…": video không khẳng định nguyên nhân từ chức, chỉ thuật lại theo báo chí.
- "Spy" luôn đi với "alleged": Alice Huang chưa bị buộc tội.

**Chữ trên thumbnail**: theo Crayon Capital, chữ là tên chủ thể (NVIDIA), trắng, được lặp tên có trong tiêu đề. Bản B dùng con số ($7.5 Billion). Cảnh: Jensen ôm thùng đồ rời đi giữa dãy server Nvidia, host Ink & Cash hoảng hốt ở góc trái, đường giá đỏ cắm xuống.

**A/B test**: YouTube Studio → *Test & compare* → tải `thumb-nvidia.png` + `thumb-billion.png`. YouTube tự chọn bản thắng theo thời gian xem sau vài ngày.

## Mô tả (dán nguyên khối dưới đây)

```
Jensen Huang just stepped down after 33 years running Nvidia. At the center of the story: a woman US officials reportedly call a Chinese intelligence asset, a Singapore cloud company called Megaspeed, and up to $7.5 billion of Nvidia AI chips.

Since 2022, Washington has used export controls to keep its most advanced AI chips out of China. But those rules watched where the chips were shipped, not who rented them over the internet. Between 2024 and 2026, Megaspeed and its Malaysian arm reportedly bought between $4.6 billion and $7.5 billion of Nvidia hardware, according to Bloomberg, The New York Times and The Information. In this animated explainer we follow the chips: how the cloud loophole works, what Singapore's investigation found, what the classified memo reportedly says, and what Nvidia's fall means for the index fund in your retirement account.

Do you think closing the cloud loophole protects America's AI lead, or pushes the world toward Chinese chips faster? Tell me in the comments.

00:00 Jensen Huang leaves Nvidia
00:41 How Nvidia's GPUs took over AI
03:50 America's chip export wall
05:15 The cloud loophole, explained
06:21 Alice Huang and Megaspeed
09:30 How many Nvidia chips? $4.6B to $7.5B
11:20 What US officials allege
13:57 How the story came out
14:55 Who's right, your money, and what happens next

Coming up: Nvidia reports earnings on November 17, its first without Jensen Huang as CEO. Three House committee chairs asked him to brief them on November 18.

Figures as of November 13, 2026, from reporting by The Washington Post, CNN, The New York Times, the Financial Times, Bloomberg, Reuters and The Information, plus statements from Nvidia, Megaspeed, Singapore's Ministry of Home Affairs and the House Select Committee on the CCP. Full source list: [LINK NGUỒN]

Allegations described in this video are unproven. Alice Huang has not been charged with any crime; Megaspeed says it ran a lawful commercial cloud and denies wrongdoing; China rejects the espionage claims. Scenes with real people are animated dramatizations, not real quotes. This video is for education and entertainment, not financial advice.

Music & sound effects (Freesound.org), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), audio edited and looped:
"Morning Coffee" by YellowTree – https://freesound.org/s/584304/
"Bright Beginnings (Uplifting Piano and Energetic Drums)" by Gustavo_Alivera – https://freesound.org/s/761372/
"Spy/Secret Agent Loop" by Sirkoto51 – https://freesound.org/s/371580/
"Troubled (loopable)" by OSFX – https://freesound.org/s/418477/
"Melancholic Ambient Documentary" by Matio888 – https://freesound.org/s/789297/
"camera_snap1.wav" by thecheeseman – https://freesound.org/s/51360/
Additional sounds (CC0) by DanJFilms, I.fekry, Talitha5, jakobhandersen, Zott820, lezaarth, qubodup, thaighaudio, TheWAVLab, JohnsonBrandEditing, _stubb, mohomran, plasterbrain and TaranP on Freesound.org.

#Nvidia #JensenHuang #ChipWar
```

Ghi chú:
- 2 câu đầu là phần hiện trên kết quả tìm kiếm và trước nút "...more": đã nhét đủ Jensen Huang, Nvidia, Megaspeed, $7.5 billion.
- Mốc chương tính từ số khung hình thật của 13 phân đoạn (`tools/make_captions.py`), không phải ước lượng. Tên chương viết theo câu người ta tìm (khác tên chương trong kịch bản), vì YouTube dùng chúng làm "key moments" trên Google.
- `[LINK NGUỒN]`: tạo Google Doc từ `sources.md` (chia sẻ "Anyone with the link"), dán link vào. Nếu chưa kịp, thay câu đó bằng "Full source list in the pinned comment."
- 3 hashtag cuối mô tả sẽ hiện phía trên tiêu đề. Không dùng quá 3.

## Tags (ô "Tags", 437/500 ký tự)

```
Jensen Huang, Nvidia, Jensen Huang resigns, Nvidia CEO, Nvidia scandal, Alice Huang, Megaspeed, Nvidia spy, Nvidia chips China, AI chip export controls, cloud loophole, Remote Access Security Act, US China chip war, chip war explained, Nvidia stock, NVDA, Colette Kress, Nvidia earnings, Singapore Megaspeed investigation, Nvidia GPU, AI chips, export controls explained, Nvidia news, animated explainer, business explained, Ink and Cash
```

Tags ảnh hưởng ít tới xếp hạng; chủ yếu giúp khi người ta gõ sai chính tả. Tiêu đề, mô tả và phụ đề mới là chỗ quan trọng.

## Bình luận ghim (đăng ngay sau khi video public, rồi ghim)

```
Where do you land: should renting AI chips over the cloud need a license, or does that just push buyers to Chinese chips?

Sources for every number in this video: [LINK NGUỒN]
Next dates to watch: Nvidia earnings Nov 17, the House briefing request for Nov 18, and whether the Senate takes up the Remote Access Security Act.
```

## Thiết lập trong YouTube Studio

| Mục | Chọn |
|---|---|
| Playlist | Tạo "The AI Money Files" (cụm đề tài của kênh: tiền ngành AI) và thêm video vào |
| Audience | **No, it's not made for kids** (hoạt hình nhưng nội dung tài chính, pháp lý) |
| Age restriction | Không |
| Paid promotion | Không |
| Altered or synthetic content | **Yes**. Hoạt hình thì YouTube không bắt buộc, nhưng skit đặt lời thoại hư cấu bằng giọng AI vào miệng người thật (Jensen, Alice); khai báo chỉ thêm một nhãn nhỏ, đổi lại tránh rủi ro bị gỡ |
| Automatic chapters | Tắt (đã có mốc chương thủ công) |
| Featured places / Automatic concepts | Bật |
| Language / Caption certification | Video language: **English**; caption certification: "This content has never aired on television in the U.S." |
| Subtitles | Upload file → *With timing* → `captions.en.srt` (đè lên phụ đề tự động; YouTube đọc được toàn văn, tốt cho tìm kiếm) |
| Recording date & location | 13/11/2026; bỏ trống địa điểm |
| License | Standard YouTube License; Allow embedding: bật |
| Category | **Education** (hoặc News & Politics; Education hợp với dạng explainer và ít bị gắn cờ "tin nhạy cảm" hơn) |
| Comments | On; "Hold potentially inappropriate comments for review" |
| Shorts remixing | Allow |
| End screen (20 giây cuối, 17:20–17:40) | Kênh mới chưa có video cũ: 1 nút **Subscribe** + 1 ô "Best for viewer". Đặt ở nửa phải, tránh che chữ ở giữa khung |
| Cards | Chưa có video để gắn; video 2 ra thì thêm card ở 14:55 (đoạn "what happens next") |

## Sau khi đăng
- 48 giờ đầu: ghi views, CTR thumbnail, AVD vào bảng trong `README.md`.
- CTR < 4% sau 24 giờ: đổi tiêu đề sang #3 hoặc #4 (giữ thumbnail), đổi từng thứ một để biết cái nào có tác dụng.
- Video 2 nên là mốc tin kế tiếp (kết quả kinh doanh 17/11 hoặc buổi điều trần) để nối người xem từ video này sang.

<!-- v4 (13/11) đề xuất tiêu đề "Did $7.5 Billion…" làm chính; v5 đổi sang tiêu đề có tên Jensen Huang vì hai kênh mẫu đã chiếm góc "spy", còn tên người là từ khoá tìm nhiều nhất. -->
