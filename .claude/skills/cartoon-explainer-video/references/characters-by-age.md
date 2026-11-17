# Dựng nhân vật theo độ tuổi

Từ 15/11/2026. Một người có thể xuất hiện ở nhiều độ tuổi trong cùng một video, ví dụ Jensen Huang 30 tuổi ở Denny's năm 1993 và 63 tuổi năm 2026. Người xem phải nhận ra ngay **cùng một người, khác thời điểm**, nên đổi tuổi bằng vài dấu hiệu rõ, còn dáng người, kiểu tóc và món đồ nhận diện thì giữ nguyên.

Code: `kit/age.ts` (bảng tuổi, `ageLook`, `lookAt`, `greyHair`), `kit/Character.tsx` (`wrinkles`, `hairVolume`), `kit/cast.ts` (`born`, `eras`). Ảnh kiểm tra: composition `AgeSheet` trong thư mục `lab`.

## 1. Thang tuổi mặc định

| Giai đoạn | Tuổi | Tóc (`grey`) | Nếp nhăn (`wrinkles`) | Cỡ người (`scale`) | Dấu hiệu nên thêm |
|---|---|---|---|---|---|
| child | 0–12 | màu tự nhiên | 0 | ×0.68 | quần áo đơn giản, không cà vạt/cặp; ba lô, đồ chơi |
| teen | 13–19 | màu tự nhiên | 0 | ×0.88 | áo phông, hoodie, tai nghe; tóc rối hoặc mái dài |
| young | 20–34 | màu tự nhiên | 0 | ×1 | trang phục của thời đó; tóc gọn, ít phồng |
| adult | 35–44 | 12% bạc | 0 | ×1 | đồ công sở |
| middle | 45–54 | 40% bạc (muối tiêu) | 1: rãnh cười | ×1 | |
| senior | 55–69 | 82% bạc | 2: + chân chim, bọng mắt | ×1 | |
| elder | 70+ | trắng | 3: + nếp trán | ×0.97 | kính, gậy, áo len; dáng hơi khom (chưa có tư thế này) |

`ageLook(look, tuổi)` áp cột tóc và nếp nhăn cho nhân vật hư cấu. `ageScale(tuổi)` trả về cỡ người. Ảnh mẫu cả thang: `lab/out/age-ladder.png`.

## 2. Người thật: khai báo từng thời kỳ

Người thật có lịch sử ngoại hình (tóc bạc năm nào, mặc gì, đeo kính lúc nào), nên **không dùng thang mặc định**. Khai báo trong `episodes/<tập>/src/cast.ts`:

```ts
{
  id: "jensen", kind: "human", real: true, name: "Jensen Huang", role: "…",
  look: { /* ngoại hình ở năm video lấy làm hiện tại */ hairColor: SILVER, hairVolume: 1, wrinkles: 2, outfit: "leather", … },
  born: 1963,
  eras: [
    { label: "1993 · 30 tuổi", from: 1980, to: 1999, look: { outfit: "plain", color: "#5C7A99", hairColor: "#1B1B1B", hairVolume: 0.3, wrinkles: 0, prop: "none" } },
    { label: "2010 · 47 tuổi", from: 2000, to: 2017, look: { hairColor: greyHair("#1B1B1B", 0.35), hairVolume: 0.6, wrinkles: 1 } },
  ],
}
```

- `look` là ngoại hình **hiện tại** (năm video lấy làm "bây giờ"). Mỗi `era` chỉ ghi những gì khác.
- Trong cảnh: `const j = lookAt(jensenEntry, 1993)` rồi `<Character {...j} … />`. Năm không thuộc era nào thì dùng `look`.
- Trước khi khai báo, tìm ảnh thật của người đó ở từng mốc để kiểm: màu tóc, độ dày tóc, kính, kiểu trang phục. Ghi nguồn ảnh vào `research/` của tập.
- Đồ nhận diện chỉ xuất hiện từ khi nó có thật. Áo khoác da của Jensen thuộc những năm 2000 trở đi, nên cảnh năm 1993 không mặc ("the jacket came later" là một câu trong kịch bản).
- Render kiểm tra: `bash tools/render.sh lab AgeSheet --still --props='{"episode":"<tập>","id":"<id>"}'`, rồi chuyển ảnh sang `episodes/<tập>/out/characters/<id>-ages.png`.

## 3. Các núm chỉnh

| Thuộc tính | Giá trị | Ghi chú |
|---|---|---|
| `hairColor` | màu hex | bạc: `SILVER` `#C9CCCF`; trắng: `WHITE_HAIR` `#ECECEA`; muối tiêu: `greyHair(màu gốc, 0.3–0.5)` |
| `hairVolume` | 0..1 | độ phồng phần đỉnh, hiện chỉ cho kiểu `part73`/`part64` (+26 px ở mức 1). Người tóc dày, chải dựng: 0.8–1; tóc ép gọn thời trẻ: 0–0.3 |
| `wrinkles` | 0–3 | nét mảnh, mờ (độ mờ 0.38); nằm dưới tóc và kính |
| `scale` khi đặt `<Character>` | nhân thêm `ageScale(tuổi)` | trẻ con và tuổi teen nhỏ hơn; người lớn giữ 1 |

## 4. Quy tắc

1. **Giữ dáng nhận diện qua mọi độ tuổi**: cùng kiểu tóc (rẽ ngôi 7/3), cùng màu da, cùng khuôn mặt. Chỉ đổi màu tóc, độ phồng, nếp nhăn, trang phục.
2. **Mỗi cảnh hồi tưởng phải có nhãn năm** (`DateTag` hoặc thẻ "1993. San Jose."), vì hai phiên bản của cùng một người có thể đứng gần nhau trong vài giây.
3. **Hai phiên bản cùng khung** (ví dụ Jensen bây giờ cầm tấm giấy ăn năm xưa): phiên bản cũ phải khác hẳn ít nhất hai dấu hiệu (màu tóc + trang phục), và nên đặt trong khung ảnh, màn hình hoặc bóng nghĩ.
4. **Người thật: không làm già hay trẻ quá sự thật** để gây cười. Tuổi và ngoại hình theo ảnh thật; chi tiết tuổi tác không bao giờ thành câu đùa về người thật (mức đỏ trong `eli5-story-script/references/real-people.md`).
5. **Nếp nhăn ít thôi**: mức 2 đã đủ cho 55–69 tuổi. Mức 3 chỉ dùng cho người trên 70 hoặc khi kịch bản cần nhấn sự già đi.
6. **Trẻ con**: hiện vẫn dùng tỷ lệ đầu–thân của người lớn, chỉ thu nhỏ. Cảnh có trẻ con đứng cạnh người lớn thì kiểm ảnh tĩnh xem có đọc ra là trẻ không; nếu không thì thêm đạo cụ (ba lô, kem) hoặc cho đứng thấp hơn mép bàn.
7. Sau khi đổi ngoại hình của một nhân vật đã có cảnh, **render lại các đoạn đã xuất** có nhân vật đó (ví dụ `ep01-Open`) để video không lẫn hai kiểu.

## 5. Chưa làm

- Tư thế khom và gậy cho người già.
- Tỷ lệ đầu lớn hơn cho trẻ con.
- Lông mày bạc theo tóc (hiện lông mày luôn màu mực).
- `hairVolume` cho các kiểu tóc khác ngoài rẽ ngôi.
