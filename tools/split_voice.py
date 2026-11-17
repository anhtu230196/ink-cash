#!/usr/bin/env python3
"""
Cắt một file giọng ElevenLabs (một đoạn kịch bản) thành từng câu theo lines.tsv.

  python3 -I tools/split_voice.py episodes/ep01-megaspeed 01_open b01
  python3 -I tools/split_voice.py episodes/ep01-megaspeed 02a_the-man-with-the-keys b02_001-b02_037   (một khoảng câu, khi một chương chia thành nhiều file a/b)

- Đọc   episodes/<tập>/voice/<stem>.mp3 và các dòng có id bắt đầu bằng <prefix>_ trong episodes/<tập>/lines.tsv
- Chạy Whisper (word timestamps) để tìm từ cuối của mỗi câu, rồi cắt ở giữa khoảng lặng gần nhất sau từ đó.
  Các điểm cắt nối liền nhau, nên ghép các file lại = đúng file gốc (giữ nguyên nhịp của ElevenLabs).
- Ghi   public/<tập>/audio/<id>.wav (48 kHz) và cập nhật episodes/<tập>/src/timing.json (gộp, không xoá id khác).
- In bảng kiểm: id, thời điểm, các từ Whisper nghe được quanh mỗi điểm cắt.
"""
import difflib, json, os, re, subprocess, sys, tempfile

def norm(w: str) -> str:
    return re.sub(r"[^a-z0-9]", "", w.lower())

def last_word(text: str) -> str:
    text = re.sub(r"\[[^\]]*\]", " ", text)
    toks = [norm(t) for t in text.split()]
    toks = [t for t in toks if t]
    return toks[-1] if toks else ""

def silences(path: str):
    out = subprocess.run(["ffmpeg", "-i", path, "-af", "silencedetect=noise=-38dB:d=0.2", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", out)]
    return list(zip(starts, ends))

def duration(path: str) -> float:
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                                capture_output=True, text=True).stdout.strip())

def main():
    ep_dir, stem, prefix = sys.argv[1].rstrip("/"), sys.argv[2], sys.argv[3]
    ep = os.path.basename(ep_dir)
    root = os.path.abspath(os.path.join(ep_dir, "..", ".."))
    src = os.path.join(ep_dir, "voice", f"{stem}.mp3")
    lines = []
    with open(os.path.join(ep_dir, "lines.tsv"), encoding="utf-8") as f:
        for row in f:
            parts = row.rstrip("\n").split("\t")
            if len(parts) < 3:
                continue
            if "-" in prefix:
                lo, hi = prefix.split("-")
                if lo <= parts[0] <= hi:
                    lines.append((parts[0], parts[2]))
            elif parts[0].startswith(prefix + "_"):
                lines.append((parts[0], parts[2]))
    if not lines:
        sys.exit(f"Không có dòng nào với prefix {prefix}_ trong lines.tsv")

    tmp = tempfile.mkdtemp()
    whisper = os.path.expanduser("~/.local/bin/whisper")
    subprocess.run([whisper, src, "--model", "small", "--language", "en", "--word_timestamps", "True",
                    "--output_format", "json", "--output_dir", tmp, "--fp16", "False"],
                   check=True, capture_output=True)
    data = json.load(open(os.path.join(tmp, f"{stem}.json")))
    words = [(norm(w["word"]), w["start"], w["end"], w["word"].strip()) for s in data["segments"] for w in s["words"]]
    sil = silences(src)
    total = duration(src)

    cuts = [0.0]
    wi = 0
    for idx, (lid, text) in enumerate(lines[:-1]):
        target = last_word(text)
        n = len([t for t in re.sub(r"\[[^\]]*\]", " ", text).split() if norm(t)])
        # mọi chỗ khớp từ cuối trong cửa sổ phía trước; Whisper hay tách/gộp từ ("wait list", "95 %"), nên so cả cặp từ liền nhau
        NUM = {"zero": "0", "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10"}
        def hit(k):
            if words[k][0] == target or words[k][0] == NUM.get(target): return True
            if k > wi and words[k - 1][0] + words[k][0] == target: return True
            # "$33 million" ↔ "33 million dollars"
            if target == "dollars" and words[k][0] in ("million", "billion", "trillion") and k > 0 and "$" in words[k - 1][3]: return True
            if target == "percent" and "%" in words[k][3]: return True
            # tên riêng Whisper viết lệch ("Megaspede" ↔ "Megaspeed"): giống ≥ 80 %
            return len(target) >= 6 and difflib.SequenceMatcher(None, words[k][0], target).ratio() >= 0.8
        hits = [k for k in range(wi, min(len(words), wi + int(n * 1.6) + 4)) if hit(k)]
        # từ cuối lặp lại trong câu ("China? By China? For China?") → chọn chỗ gần vị trí dự kiến (wi + số từ - 1)
        j = min(hits, key=lambda k: abs(k - (wi + n - 1))) if hits else None
        if j is None:
            # Whisper hay bỏ sót câu thì thầm: tìm 2 từ đầu của câu kế tiếp, cắt ở khoảng lặng ngay trước nó
            nxt_text = lines[idx + 1][1]
            first = [norm(x) for x in re.sub(r"\[[^\]]*\]", " ", nxt_text).split() if norm(x)][:2]
            k0 = next((k for k in range(wi, min(len(words) - 1, wi + int(n * 2.5) + 12))
                       if len(first) == 2 and words[k][0] == first[0] and words[k + 1][0] == first[1]), None)
            if k0 is not None and words[k0][1] > cuts[-1] + 0.5:
                st = words[k0][1]
                before = [(a, b) for a, b in sil if a < st + 0.6 and a > cuts[-1]]  # Whisper hay báo từ đầu sớm
                cut = (before[-1][0] + before[-1][1]) / 2 if before else st - 0.1
                print(f"!! {lid}: không thấy từ cuối '{target}', cắt trước câu sau ('{' '.join(first)}') ở {cut:.2f}s")
                cuts.append(round(cut, 3))
                wi = k0
                continue
            print(f"!! {lid}: không thấy từ cuối '{target}' trong Whisper, chia theo tỉ lệ ký tự")
            done = sum(len(t) for _, t in lines[: idx + 1]); allc = sum(len(t) for _, t in lines)
            cuts.append(round(total * done / allc, 3))
            continue
        w_end = words[j][2]
        nxt = words[j + 1][1] if j + 1 < len(words) else total
        cand = [(a, b) for a, b in sil if b > w_end - 0.15 and a < nxt + 0.6]
        # câu sau nói liền (không ngắt): đừng lấy khoảng lặng nằm sau từ đầu của câu sau ("chip. The …")
        if cand and cand[0][0] > nxt + 0.05 and j + 2 < len(words) and cand[0][0] > words[j + 1][2]:
            cand = []
        cut = (cand[0][0] + cand[0][1]) / 2 if cand else (w_end + nxt) / 2
        cut = max(cut, cuts[-1] + 0.2)
        cuts.append(round(cut, 3))
        wi = j + 1
    cuts.append(total)

    out_dir = os.path.join(root, "public", ep, "audio")
    os.makedirs(out_dir, exist_ok=True)
    tpath = os.path.join(ep_dir, "src", "timing.json")
    timing = json.load(open(tpath)) if os.path.exists(tpath) else {}
    for i, (lid, text) in enumerate(lines):
        a, b = cuts[i], cuts[i + 1]
        dst = os.path.join(out_dir, f"{lid}.wav")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-af",
                        f"atrim=start={a}:end={b},asetpts=PTS-STARTPTS", "-ar", "48000", dst], check=True)
        timing[lid] = round(duration(dst), 4)
        heard = " ".join(w[3] for w in words if a <= (w[1] + w[2]) / 2 < b)  # theo điểm giữa từ, Whisper hay báo đầu từ sớm
        print(f"{lid}  {a:6.2f}-{b:6.2f}  {heard}")
    json.dump(timing, open(tpath, "w"), indent=1)
    print(f"→ {len(lines)} file trong public/{ep}/audio/, timing.json có {len(timing)} id")

if __name__ == "__main__":
    main()
