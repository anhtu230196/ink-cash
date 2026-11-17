# Phong cách hình "hoạt hình phẳng + ánh sáng điện ảnh"

Rút từ 4 video của Paper Billions (xem `analysis-paperbillions.md`) và đã dựng thử bằng Remotion ngày 2026-11-13. Ảnh so sánh trước/sau: `lab/out/look/compare.jpg`. Bộ component: `kit/look/cinematic.tsx`, cảnh thử: `lab/src/LookDev.tsx`.

## 1. Ý chính

Nhân vật và đồ vật vẫn là hình phẳng viền đen như kiểu Crayon Capital. Khác biệt nằm ở ba lớp phủ lên trên:

1. **Ánh sáng**: cảnh nào cũng có nguồn sáng nhìn thấy được (nến, đèn bàn, bóng đèn trần, màn hình, cửa sổ, biển neon). Quanh nguồn sáng có quầng và vệt sáng; phần còn lại chìm vào tối; bốn góc khung tối dần.
2. **Máy quay**: phông xa bị mờ khi quay cận, có chuyển cảnh lia nhanh nhoè ngang, góc từ trên xuống, góc nhìn qua ống ngắm, vài cảnh 3D thật.
3. **Nhãn tài liệu**: thẻ tên người, nhãn địa điểm, nhãn ngày, đồng hồ, thẻ trích dẫn, giấy tờ có bút dạ quang. Chúng làm video giống phim tài liệu hơn là hoạt hình giải trí.

Video đầu của kênh mẫu còn sáng và phẳng (độ sáng trung bình 138/255, 9% khung tối). Video được xem nhiều nhất tối hơn hẳn (83/255, 47% khung tối) và cắt nhanh hơn (trung vị 2.6 giây/cảnh so với 3.4).

## 2. Bốn loại cảnh

| Loại | Khi nào dùng | Hình |
|---|---|---|
| **Cảnh truyện** | có nhân vật làm gì đó ở một nơi cụ thể | bối cảnh đầy đủ, tối, có nguồn sáng, có nhãn địa điểm/ngày |
| **Cảnh giải thích** | ví von, sơ đồ dòng tiền, "A đưa B cái gì" | nền trơn sáng (be hoặc xám nhạt) với đường chân trời cong, bóng đổ mềm dưới chân, ít đồ vật |
| **Cảnh bằng chứng** | trích dẫn, văn bản, tweet, email, ảnh chụp lén | vật thể chiếm gần hết khung, dòng quan trọng tô dạ quang, có tên người và ngày |
| **Cảnh số liệu** | con số, so sánh, biểu đồ | 1 con số lớn viết tay (đỏ = mất, xanh lá = được, vàng = nhấn), cột hoặc đường đơn giản tự vẽ ra |

Xen kẽ cảnh truyện tối với cảnh giải thích sáng để mắt được nghỉ. Hầu như 1–2 câu là đổi bối cảnh; 90% số cảnh ngắn hơn 6.5 giây. Một video 15 phút cần khoảng 230–350 cảnh, nên phải có thư viện bối cảnh dùng lại được.

## 3. Quy tắc ánh sáng

- Vẽ cảnh bằng màu "ban ngày" trung tính. Lớp `Lighting` nhân cả khung với màu tối (`ambient`), rồi mở sáng lại ở chỗ có đèn. Không tô sẵn màu tối vào hình.
- **Mặt nhân vật phải là thứ sáng nhất trong khung.** Luôn đặt một đèn chính (`intensity` khoảng 0.9) lệch về phía nguồn sáng, ngay tại đầu nhân vật. Thiếu đèn này nhân vật chìm vào nền.
- Mỗi cảnh tối dùng 2–3 màu đèn: một ấm (đèn, nến), một lạnh (cửa sổ, trăng), và tối đa một màu nhấn (xanh lá của màn hình, đỏ của biển báo).
- Vật tự phát sáng (màn hình, cửa sổ đêm, bóng đèn) cần một đèn hình chữ nhật hoặc elip đặt đúng vị trí, nếu không lớp tối sẽ làm nó xỉn đi.
- Thêm viền sáng (`Rim`) ở mép nhân vật quay về phía đèn. Lồng hai lớp nếu có đèn ấm và đèn lạnh ở hai bên.
- Bóng mềm dưới chân (`ContactShadow`) để nhân vật không lơ lửng.
- Phông xa mờ nhẹ (`Defocus` 3–4) ở cảnh trung; mờ mạnh (8–12) khi quay cận mặt.
- Luôn có `Vignette` (0.5–0.6) và `Grain` (0.08–0.1) ở cảnh truyện. Cảnh giải thích sáng chỉ cần vignette nhẹ (0.25).
- Nến và neon cho `flicker` 0.02–0.1 để ánh sáng nhấp nháy nhẹ.

### Màu theo tâm trạng (kịch bản màu)

| Tâm trạng / nơi chốn | Màu tối nền (`ambient`) | Đèn chính | Màu nhấn | Đã thử? |
|---|---|---|---|---|
| Văn phòng ban đêm, một mình | `#3D3B66` (chàm) | đèn bàn `#FFDFA8` | màn hình xanh lá `#C4FFBE`, cửa sổ `#D5DEFF` | có |
| Bữa tối, thân mật, âm mưu | nâu đỏ sẫm, ví dụ `#4A2E2E` | nến `#FFD08A`, flicker 0.06 | đỏ nhung | chưa |
| Cơ quan tình báo, Washington | xanh đen, ví dụ `#22304A` | đèn bàn hẹp | xanh lá của màn hình giám sát | chưa |
| Thị trường sập | đỏ sẫm, ví dụ `#4A2226` | bảng điện đỏ `#FF8A80` | trắng của giấy bay | chưa |
| Hồi tưởng tuổi thơ | nâu ấm nhạt, ví dụ `#7A6650` | nắng chiều qua cửa `#FFD9A0` | – | chưa |
| Phòng máy chủ | xanh than `#1F2A44` | dải đèn trần lạnh | đèn LED xanh lá hoặc xanh dương | chưa |

Các dòng "chưa" là điểm bắt đầu, phải xem ảnh tĩnh rồi chỉnh.

## 4. Ngôn ngữ máy quay

- Mỗi cảnh đều có chuyển động: đẩy vào chậm 3–7% là mặc định.
- **Lia nhanh (whip pan)** 5–6 khung hình nhoè ngang khi đổi địa điểm hoặc đổi thời gian. Dùng vài lần mỗi phút, không dùng cho mọi lần cắt.
- **Dựng nhanh kiểu chớp**: 8–12 cảnh trong 2 giây để tóm tắt nhiều năm (video 4 dùng ở giây thứ 7).
- Góc đặc biệt, mỗi video vài lần: từ trên xuống (bàn ăn, bàn họp), qua ống ngắm hoặc camera giám sát (khung REC, chữ thập), từ dưới lên (toà nhà, máy chủ), cận vật thể trên bàn.
- **Tiết lộ kiểu X-quang**: phần bị che (gầm bàn, trong hộp) hiện ra bằng vùng phát sáng màu nhấn.
- **3D thật** chỉ ở vài cảnh mỗi video: bay qua dãy nhà, bàn làm việc có phối cảnh, bản đồ thế giới có cột phát sáng. Nhân vật trong đó vẫn là hình phẳng. Mình làm 2D nhiều lớp trước; cảnh nào thật sự cần xoay máy quay mới dùng `@remotion/three`.

## 5. Nhân vật

- Đầu tròn lớn, viền đen dày, thân nhỏ hình viên thuốc, tay chân nét mảnh, bàn tay 3–4 nét.
- Người thật nhận ra bằng 3 dấu hiệu: **kiểu tóc + kính + một món đồ đặc trưng** (áo khoác da, váy đỏ, áo len). Không cần giống mặt.
- Nhân vật phụ vô danh: bớt chi tiết, màu nhạt hơn, hoặc bóng đen.
- Biểu cảm đổi theo từng câu thoại; mắt nhắm cong khi cười, mồ hôi khi lo.
- Bộ nhân vật hiện có của mình: `kit/Character.tsx` và `episodes/<tập>/src/cast.ts`.

## 6. Hệ thống nhãn

| Nhãn | Vị trí | Hình | Component |
|---|---|---|---|
| Tên người + vai trò | góc dưới phải, lần đầu nhân vật xuất hiện | nền tối, 1 thanh màu nhấn, tên in hoa | `LowerThird` |
| Địa điểm | góc dưới trái, gõ từng chữ | nền tối nhỏ | `PlaceTag` |
| Ngày hoặc khoảng thời gian ("+2 WEEKS") | góc trên | nhãn giấy màu, hơi nghiêng | `DateTag` |
| Giờ trong ngày (cảnh đếm giờ) | góc trên trái, giữ suốt cả chương | đồng hồ + "11:37 AM ET" | chưa làm |
| Trích dẫn thật | giữa khung hoặc cạnh người nói | khung giấy, chữ nghiêng, dòng dưới ghi tên và ngày | chưa làm |
| Tên chương | **không dùng** (từ 16/11/2026): chương mở thẳng vào cảnh đầu | — | — |
| Câu nhấn | thẻ đen, chữ gõ theo lời đọc, 1.5–2.5 giây | chữ viết tay trắng | `BlackCard` (trong `ui.tsx`) |

Thẻ đen chiếm 7–13% thời lượng ở kênh mẫu, trung vị 2 giây mỗi thẻ. Mỗi chương mở bằng một thẻ tên chương 2–4 từ, đặt như tên một hồi phim (một đồ vật hoặc hình ảnh trong chương, không phải mô tả nội dung).

**Nhận diện riêng của mình**: màu nhấn hổ phách `#F2B544` cho thẻ tên (kênh mẫu dùng xanh lá), font nhãn Patrick Hand, font thẻ chương Caveat Brush. Muốn đổi thì sửa trong `theme.ts` và `cinematic.tsx`, giữ nhất quán cả kênh.

## 7. Thumbnail

Kênh mẫu vẽ thumbnail bằng phong cách khác hẳn video: tranh chi tiết, đổ bóng nhiều lớp, có lửa hoặc ánh sáng mạnh (nhiều khả năng là AI vẽ). Công thức:

- Mặt nhân vật chính chiếm khoảng nửa chiều cao khung, biểu cảm cực đoan (toát mồ hôi, nghiến răng, hoảng hốt).
- Một vật ẩn dụ duy nhất (cái chuông, con chip nứt, khoá kéo).
- Dòng chữ trên cùng, tối đa 4 từ, font không chân rất đậm, viền đen. **Con số màu đỏ, phần còn lại trắng.**
- Chữ trên thumbnail không lặp tiêu đề: tiêu đề kể chuyện gì, thumbnail nói con số.

Claude không tự vẽ được kiểu tranh này. Cách làm: dựng một khung hình cận mặt bằng bộ component (ánh sáng mạnh, biểu cảm cực đoan), hoặc dùng công cụ vẽ AI với ảnh nhân vật của mình làm mẫu, rồi đặt chữ bằng code.

## 8. Âm thanh (ghi nhận, chưa làm)

Studio đứng sau kênh mẫu nói một phim có 1,262 hiệu ứng âm thanh và 14 đoạn nhạc, tức khoảng 1 hiệu ứng mỗi giây và đổi nhạc mỗi 1–1.5 phút. Âm lượng đo được -17.5 LUFS. Việc cần làm cho pipeline của mình: thư viện SFX gắn theo loại chuyển động (pop, whoosh cho whip pan, tiếng gõ chữ cho thẻ đen, tiếng giấy, tiếng "ding" cho con số) và nhạc theo chương.

## 9. Bộ component `cinematic.tsx`

Thứ tự lớp trong một cảnh (dưới lên trên):

```tsx
<Whip inFrames={6} outFrames={0}>            {/* tuỳ chọn: lia nhanh vào cảnh */}
  <AbsoluteFill style={{ background: "#000" }}>
    <Camera from={1.02} to={1.07}>
      <Stage>
        <Background />                        {/* vẽ màu ban ngày; phần xa bọc <Defocus amount={3.5}> */}
        <ContactShadow x={cx} y={cy} w={190} />
        <Rim x={1560} y={360} color="#B9C8FF" strength={0.7} width={7}>      {/* viền lạnh từ cửa sổ */}
          <Rim x={700} y={600} color="#FFD9A0" strength={1.2} width={9}>     {/* viền ấm từ đèn */}
            <Character ... />
          </Rim>
        </Rim>
      </Stage>
      <Lighting
        ambient="#3D3B66"
        lights={[
          { x: cx - 70, y: cy - 400, r: 300, color: "#FFE9CC", intensity: 0.9, glow: 0 },            // đèn chính trên mặt
          { x: 770, y: 620, r: 470, ry: 330, color: "#FFDFA8", intensity: 1, glow: 0.32, flicker: 0.015 }, // đèn bàn
          { x: 500, y: 515, r: 80, rect: { w: 240, h: 170 }, color: "#C4FFBE", intensity: 0.95, glow: 0.28 }, // màn hình
        ]}
        cones={[{ x: 786, y: 540, topW: 50, bottomW: 330, h: 110, opacity: 0.3 }]}
      />
    </Camera>
    <Vignette strength={0.6} />
    <Grain opacity={0.09} />
    <LowerThird name="Jensen Huang" role="CEO, Nvidia · 33 years" />
    <PlaceTag text="Santa Clara, Calif." />
  </AbsoluteFill>
</Whip>
```

| Component | Việc nó làm | Tham số chính |
|---|---|---|
| `Lighting` | lớp `multiply` làm tối theo `ambient` rồi mở sáng ở các đèn; lớp `screen` thêm quầng và vệt sáng | `lights[]`: `x, y, r, ry, rect, color, intensity, glow, flicker`; `cones[]` |
| `Vignette` | tối bốn góc | `strength` |
| `Grain` | hạt phim, một ô nhiễu 256px dịch mỗi khung | `opacity` |
| `Defocus` | làm mờ một nhóm SVG | `amount` |
| `Rim` | viền sáng ở mép nhân vật phía có đèn | `x, y` (toạ độ sân khấu), `color, strength, width` |
| `ContactShadow` | bóng mềm dưới chân | `x, y, w` |
| `LowerThird`, `PlaceTag`, `DateTag` | nhãn tài liệu, đặt ngoài `Camera` | `name, role, accent` / `text` |
| `ChapterCard` | thẻ tên chương — **không dùng cho kênh nữa** (giữ lại trong kit) | `title` |
| `Whip` | lia nhanh nhoè ngang ở đầu và/hoặc cuối cảnh | `inFrames, outFrames, dir` |

### Bài học khi dựng thử
- `Lighting` phải nằm cùng phần tử cha với `Stage` (trong `Camera`), nếu không chế độ hoà trộn không thấy hình bên dưới.
- Đèn của `Rim` phải đặt gần ngang mặt hình (`z` thấp, hiện là 36). Đặt cao thì cả nhân vật bị phủ một lớp xám như sương.
- Không có đèn chính trên mặt thì nhân vật tối hơn cả cái bàn.
- Nhóm bọc bởi `Rim` không được có `transform` riêng, vì toạ độ đèn tính theo sân khấu 1920×1080.
- Thời gian render: đoạn 90 khung hình mất 14.4 giây khi phẳng và 12.7 giây khi có đủ lớp ánh sáng (cả hai gồm thời gian khởi động Chrome), tức lớp ánh sáng không làm chậm đáng kể. Chưa đo trên video dài.
- Chưa làm: nhãn giờ, thẻ trích dẫn, giấy tờ có dạ quang, khung ống ngắm, nền cảnh giải thích, con số lớn bật ra, cảnh 3D.

## 10. Danh sách kiểm trước khi render một cảnh

1. Nhìn 1 giây có biết ai đang ở đâu không?
2. Mặt nhân vật chính có phải chỗ sáng nhất không?
3. Có ít nhất một nguồn sáng nhìn thấy được và hai màu đèn không?
4. Chữ trên nhãn có bị quầng sáng hoặc vật khác che không?
5. Cảnh có chuyển động (đẩy máy, vật bật ra, chữ gõ) không?
6. Cảnh này có khác bối cảnh với cảnh trước không, hoặc ít nhất khác cỡ cảnh?

## 11. Đạo cụ bằng chứng và dẫn nguồn trên hình

Rút từ video tin nóng của Crayon Capital (`analysis-eS1zZKHFzwE.md`). Video đó giảm thẻ đen xuống một nửa và thay bằng các cảnh giấy tờ. Dùng cho mọi câu có cáo buộc hoặc con số.

| Đạo cụ | Dùng khi | Chi tiết cần có |
|---|---|---|
| Hồ sơ mật | giới thiệu một người bị nghi | ảnh kẹp ghim, vài dòng bôi đen, dấu đỏ **kết bằng dấu hỏi** |
| Bảng ghim thám tử | liệt kê những chỗ không khớp | tên vụ ở trên, thẻ đánh số, ảnh nối bằng dây, dấu "DOESN'T FIT" |
| Sơ đồ tổ chức | quan hệ cấp trên – cấp dưới | các ô xám giống nhau, một ô có màu và vòng khoanh đỏ |
| Tờ "luật 101" có ô đánh dấu | cho thấy chuyện này sai khuôn mẫu | 3 dòng, 2 ô gạch, 1 ô trống |
| Sổ hai trang | so "năm 1 / năm 2" | con số viết dần lên trang |
| Bản đồ có ghim | hàng đi đâu | nhãn trong ngoặc kép cho chỗ chỉ đúng trên giấy tờ ("officially") |
| Hai thẻ treo dây | chia một câu hỏi làm hai (tiền / động cơ) | số thứ tự ở góc |
| Bảng 3 cột | "mỗi bên được gì" | tên ở trên, một nhãn kết quả ở dưới mỗi cột |
| Quầy báo, màn hình TV | "mọi tờ báo đều nói" | tít ngắn 3–5 từ |
| Tờ "CHARGE SHEET — Charges: 0" | câu rào "chưa ai bị buộc tội" | con số 0 khoanh đỏ |

Quy tắc đi kèm:
- **Cáo buộc nào cũng có chủ ngữ trên màn hình**: một dòng viết tay nhỏ ("according to US investigators") hoặc giấy note ghi tên nguồn, hiện cùng lúc với lời đọc.
- Dấu hỏi trên con dấu, ngoặc kép trên nhãn và chữ "allegedly" là ba cách rào bằng hình. Dùng ít nhất một cách trong mỗi cảnh bằng chứng nói về người thật.
- Người bí ẩn: lần đầu chỉ là bóng đen trong ảnh hồ sơ; khi lời kể nêu tên mới cho thấy mặt.
- Người mới xuất hiện có nhãn tên viết tay kèm mũi tên; thẻ `LowerThird` dành cho nhân vật chính.
- Lời người dẫn thuật lại một câu nói thì hiện thành chữ viết tay không khung, có vạch nhỏ chỉ về người nói. Bóng thoại có khung dành cho thoại skit.
- Không vẽ lại logo thật của công ty; viết tên bằng chữ.
- Chưa có component: hồ sơ, bảng ghim, sơ đồ tổ chức, bảng 3 cột. Tập 1 đã có `CaseFile`, `WantedPoster`, giấy note trong `episodes/ep01-megaspeed/src/scenes/open/`; cái nào dùng lại ở tập sau thì chuyển lên `kit/`.

