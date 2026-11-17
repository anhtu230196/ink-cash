# Ink & Cash (@InkAndCash) — xưởng làm video

Một dự án Remotion duy nhất (một `node_modules`) cho mọi video. Đồ dùng chung nằm ở gốc, mỗi video một thư mục trong `episodes/`.

```
├── episodes/                 MỖI VIDEO MỘT THƯ MỤC  epNN-slug
│   ├── _template/            khung tập mới (tools/new-episode.sh copy từ đây)
│   ├── ep00-leo-coffee/      tập thử pipeline (đóng băng, không đăng)
│   └── ep01-megaspeed/
│       ├── README.md         thẻ tập: tiêu đề, dạng, trạng thái, checklist, số liệu sau đăng
│       ├── research/         sources.md ({SRC:n}), ghi chú nghiên cứu
│       ├── prompts/          prompt Gemini… riêng tập này
│       ├── script/           <slug>.script.md (bản gốc duy nhất) → .read.md, .elevenlabs/
│       ├── src/              code Remotion của tập: cast.ts, compositions.tsx, scenes/, dev/
│       ├── publish/          tiêu đề, mô tả, chương, thumbnail
│       └── out/              ảnh/video render của tập
├── public/<epNN-slug>/audio/ giọng đọc của từng tập (Remotion chỉ đọc file tĩnh trong public/)
├── kit/                      code dùng chung: Character, cast type, theme, ui, backgrounds, lipsync, look/cinematic
├── channel/                  nhận diện kênh: src/ (Avatar, Banner) + art/ (PNG đã xuất)
├── lab/                      thử nghiệm phong cách: CharacterSheet, LookDev → lab/out/
├── research/channels/        phân tích kênh tham khảo (paperbillions…)
├── src/                      điểm vào Remotion: Root.tsx + episodes.ts (danh sách tập)
└── tools/                    new-episode.sh, render.sh, render-sheets.sh
```

## Lệnh hay dùng
```bash
npm run studio                                   # mở Remotion Studio (mỗi tập là một thư mục bên trái)
npm run new -- 02 nvidia-resign                  # tạo episodes/ep02-nvidia-resign + đăng ký vào src/episodes.ts
npm run sheets -- ep01-megaspeed [jensen …]      # ảnh dàn nhân vật → episodes/ep01-megaspeed/out/characters/
npm run render -- ep01-megaspeed ep01-Full       # render → episodes/ep01-megaspeed/out/ep01-Full.mp4
npm run render -- channel Banner --still         # render ảnh kênh → channel/art/
npm run typecheck
```

## Quy ước
- Tên thư mục tập: `epNN-slug` (NN hai chữ số). Mọi composition id của tập bắt đầu bằng `epNN-`.
- Tập chỉ import từ `kit/` và từ chính nó, không import tập khác. Thứ gì tập sau cũng cần (nhân vật dẫn chuyện, khung thumbnail, thẻ chương…) thì chuyển lên `kit/`.
- Sửa `kit/` có thể đổi hình các tập cũ chưa render xong. Tập đã đăng mà cần giữ nguyên thì copy component cũ vào `src/` của tập đó (như ep00).
- Kịch bản: `script_lint.py episodes/<tập>/script/<slug>.script.md --read … --tts-dir …` (xem skill eli5-story-script).
