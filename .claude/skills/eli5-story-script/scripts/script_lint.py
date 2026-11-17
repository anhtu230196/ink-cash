#!/usr/bin/env python3
"""Chấm kịch bản "Explained Like You're 5" và xuất lines.tsv cho make_voice.sh.

Dùng:
  script_lint.py <file.script.md>                       # chấm kịch bản đúng định dạng
  script_lint.py <file> --tsv out/lines.tsv --voice "N=Eddy (English (US))" --voice "Leo=Rocko (English (US))"
  script_lint.py <transcript.txt> --plain               # đo transcript thô (không có ký hiệu)
Tuỳ chọn: --wpm 150 · --strict (thoát mã 1 nếu còn cảnh báo)
Kịch bản tin nóng: thêm '# FORMAT: news' và '# QUESTION: ...' ở đầu file (bỏ kiểm cuộc cược và tỷ lệ 11 beat, đòi ≥ 1 dòng {YOU}).
"""
import argparse
import collections
import re
import statistics as st
import sys

TAG_RE = re.compile(r"\{(GAG|LOOP|BET|YOU|ANALOGY|FRAMED|DRAMATIZED|SRC:[^}]*)\}")
# Từ nguy hiểm trong miệng người thật (xem references/real-people.md, mức đỏ)
REAL_RISK_RE = re.compile(r"\b(spy|spies|spying|steal|stole|stolen|secret|secrets|smuggl\w*|brib\w*|affair|romance|lover|kiss\w*|recruit\w*|handler|confess\w*|illegal\w*|divert\w*|launder\w*|i knew|we knew|cover[- ]?up|beijing wants|ministry|mss)\b", re.I)
# Vùng đỏ cứng: không được nói ngay cả trong cảnh {DRAMATIZED}
REAL_HARD_RE = re.compile(r"\b(affair|romance|lover|kiss\w*|in love|confess\w*|i knew|we knew|i am a spy|i'm a spy)\b", re.I)
# Câu đóng khung sau cảnh {DRAMATIZED}: phải nêu phủ nhận / chưa bị truy tố / chưa được chứng minh
DENY_RE = re.compile(r"\b(den(y|ies|ied)|rejects?|calls? it false|says? (that's|it's|it is) false|not been charged|hasn't been charged|no charges?|unproven|not proven|disputes?|memo's version)\b", re.I)
ACRONYMS = {"GPU", "CEO", "CFO", "IPO", "USA", "NASA", "TSMC", "AMD", "ETF", "SEC", "FBI", "DOJ", "LLM", "API", "CPU", "RAM", "SUV", "NVDA"}
HEDGE_RE = re.compile(r"\b(reportedly|allegedly|according to|roughly how|here's how|imagine|picture|if the memo|memo says|photos show|might have|probably went)\b", re.I)
# Thẻ giọng ElevenLabs v4 như [sarcastic], [lower, conspiratorial]: giữ khi xuất TTS/TSV, bỏ khỏi bản đọc và số từ (xem skill elevenlabs-voice).
VOICE_RE = re.compile(r"\[[^\]\n]{1,60}\]")
SFX_VOICE_TAGS = {"gunshot", "applause", "clapping", "explosion", "music", "standing", "grinning", "pacing", "fart"}
NUM_RE = re.compile(r"(\$\s?\d|\d[\d,.]*\s*(%|percent|million|billion|trillion|thousand)|\b\d{2,}\b|\b(one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|million|billion|trillion)\s+(hundred|thousand|million|billion|trillion|percent|dollars|times)\b)", re.I)
SPEAKER_RE = re.compile(r"^([A-Za-z][\w .'\-]{0,30}):\s+(.*)$")
NARRATED = {"N", "CARD", "DATE"}

# Tỷ lệ beat của kịch bản mẫu (B01..B11)
TARGET_PCT = {"B01": 2, "B02": 8, "B03": 14, "B04": 6, "B05": 7, "B06": 9, "B07": 15, "B08": 16, "B09": 8, "B10": 12, "B11": 4}

OK, WARN = "✔", "⚠"


def words(s):
    return len(re.findall(r"[A-Za-z0-9$%'’\-]+", s))


def parse(path):
    meta, lines, beat = {}, [], ("B00", "PRE")
    for raw in open(path, encoding="utf-8"):
        s = raw.strip()
        if not s or s.startswith("<!--"):
            continue
        m = re.match(r"^#\s*(TITLE|RUNTIME|BET|FORMAT|QUESTION|REAL):\s*(.*)$", s)
        if m:
            meta[m.group(1)] = m.group(2)
            continue
        m = re.match(r"^##\s*(B\d+)\s*[·\-:|]?\s*(.*)$", s)
        if m:
            beat = (m.group(1), m.group(2).strip())
            continue
        if s.startswith("## "):
            beat = ("META", s[3:].strip())
            continue
        if beat[0] == "META" or s.startswith(">") or s.startswith("#"):
            continue
        m = SPEAKER_RE.match(s)
        if not m:
            continue
        who, text = m.group(1).strip(), m.group(2)
        if who == "CHAPTER":
            # Thẻ tên chương: chỉ hiện chữ trên màn hình, người dẫn KHÔNG đọc → không vào TTS, TSV, số từ, thời lượng.
            meta.setdefault("_chapters", {})[beat] = TAG_RE.sub("", text).strip()
            continue
        tags = TAG_RE.findall(text)
        voiced = re.sub(r"\s{2,}", " ", TAG_RE.sub("", text)).strip()
        vtags = [t[1:-1].strip().lower() for t in VOICE_RE.findall(voiced)]
        clean = re.sub(r"\s{2,}", " ", VOICE_RE.sub("", voiced)).strip()
        lines.append({"beat": beat, "who": who, "text": clean, "voiced": voiced, "vtags": vtags, "tags": tags, "w": words(clean)})
    return meta, lines


def report_script(meta, lines, wpm):
    warns = []
    out = []

    def check(cond, msg):
        out.append(f"  {OK if cond else WARN} {msg}")
        if not cond:
            warns.append(msg)

    total = sum(l["w"] for l in lines)
    minutes = total / wpm
    t = 0.0
    for l in lines:
        l["t"] = t
        t += l["w"] / wpm * 60
    fmt = lambda sec: f"{int(sec // 60)}:{int(sec % 60):02d}"

    print(f"{meta.get('TITLE', '(chưa có TITLE)')}")
    print(f"Tổng {total} từ ≈ {fmt(minutes * 60)} ở {wpm} từ/phút · {len(lines)} dòng đọc")

    out.append("\nĐộ dài")
    if "RUNTIME" in meta:
        target = float(meta["RUNTIME"])
        check(abs(minutes - target) / target <= 0.10, f"thời lượng {minutes:.1f}' so với đích {target:g}' (±10%)")
    else:
        check(False, "thiếu '# RUNTIME:'")
    # '# FORMAT: news' = video giải thích tin nóng (xem references/news-explainer.md): không có cuộc cược, không theo tỷ lệ 11 beat.
    news = meta.get("FORMAT", "").strip().lower().startswith("news")
    if news:
        check("QUESTION" in meta, "có dòng '# QUESTION:' (câu hỏi mà video phải trả lời)")
    else:
        check("BET" in meta, "có dòng '# BET:'")

    beats = collections.OrderedDict()
    for l in lines:
        beats.setdefault(l["beat"], []).append(l)
    out.append("\nBeat (từ · % · đích theo mẫu)")
    for (bid, name), ls in beats.items():
        w = sum(x["w"] for x in ls)
        pct = 100 * w / total if total else 0
        tgt = TARGET_PCT.get(bid)
        mark = ""
        if tgt is not None and minutes >= 8 and not news:
            mark = OK if abs(pct - tgt) <= max(3, tgt * 0.4) else WARN
            if mark == WARN:
                warns.append(f"beat {bid} lệch tỷ lệ")
        out.append(f"  {mark or ' '} {bid} {name[:34]:34s} {w:5d} · {pct:4.1f}% · {'' if tgt is None else str(tgt) + '%'}  (bắt đầu {fmt(ls[0]['t'])})")

    out.append("\nNhịp câu")
    wl = [l["w"] for l in lines]
    if wl:
        mean = st.mean(wl)
        short = 100 * sum(w <= 4 for w in wl) / len(wl)
        # mẫu: 8.5 từ/cảnh, 6.2 từ/dòng phụ đề, 9.9 từ/câu
        check(6 <= mean <= 10, f"trung bình {mean:.1f} từ/dòng (đích 6–10)")
        check(short >= 12, f"{short:.0f}% dòng ≤ 4 từ (đích ≥ 12%)")
        long_ = [l for l in lines if l["w"] > 16]
        check(not long_, f"{len(long_)} dòng > 16 từ")
        for l in long_[:8]:
            out.append(f"      {fmt(l['t'])} [{l['w']}] {l['who']}: {l['text'][:90]}")
    starters = collections.Counter(re.sub(r"[^a-z']", "", l["text"].split()[0].lower()) for l in lines if l["who"] in ("N", "CARD") and l["text"])
    causal = starters["so"] + starters["then"] + starters["but"]
    out.append(f"    câu mở đầu bằng So/Then/But: {causal} · top: {starters.most_common(6)}")
    andthen = [l for l in lines if re.match(r"^and then\b", l["text"], re.I)]
    check(not andthen, f"{len(andthen)} dòng mở bằng 'And then'")

    out.append("\nGiữ chân")
    def gaps(tag):
        ts = [l["t"] for l in lines if any(x == tag for x in l["tags"])]
        pts = [0.0] + ts + [minutes * 60]
        return ts, max(b - a for a, b in zip(pts, pts[1:]))
    gag_ts, gag_gap = gaps("GAG")
    check(len(gag_ts) >= minutes * 60 / 45 * 0.9, f"{len(gag_ts)} gag (đích ≥ {minutes * 60 / 45:.0f}, tức 1 mỗi ≤ 45 giây)")
    check(gag_gap <= 60, f"quãng dài nhất không có gag: {gag_gap:.0f} giây (đích ≤ 60)")
    loop_ts, loop_gap = gaps("LOOP")
    check(loop_gap <= 120, f"{len(loop_ts)} open loop, quãng dài nhất {loop_gap:.0f} giây (đích ≤ 120)")
    bet_ts = [l["t"] for l in lines if "BET" in l["tags"]]
    if news:
        you_ts = [l["t"] for l in lines if "YOU" in l["tags"]]
        check(bool(you_ts), f"{len(you_ts)} dòng {{YOU}} nối câu chuyện về ví của người xem (đích ≥ 1)")
    else:
        check(len(bet_ts) >= 3 or minutes < 8, f"{len(bet_ts)} lần gọi cuộc cược (đích ≥ 3)")
        check(bool(bet_ts) and bet_ts[0] <= 300, f"cuộc cược nêu lần đầu ở {fmt(bet_ts[0]) if bet_ts else '—'} (đích ≤ 5:00)")
    q = sum(l["text"].rstrip().endswith("?") for l in lines)
    check(q >= minutes, f"{q} câu hỏi ({q / minutes:.1f}/phút, đích ≥ 1)")

    out.append("\nHình & skit")
    cards = sum(l["who"] == "CARD" for l in lines)  # tên chương không hiện trên video (16/11/2026) nên không tính
    dates = sum(l["who"] == "DATE" for l in lines)
    check(cards >= 1.5 * minutes, f"{cards} thẻ chữ đen ({cards / minutes:.1f}/phút, đích ≥ 1.5)")
    check(dates >= 0.4 * minutes, f"{dates} thẻ ngày ({dates / minutes:.1f}/phút, đích ≥ 0.4)")
    speakers = collections.Counter(l["who"] for l in lines if l["who"] not in NARRATED)
    blocks, start = [], None  # khối thoại liên tiếp = một skit: (chỉ số đầu, chỉ số cuối)
    for i, l in enumerate(lines + [{"who": "N"}]):
        is_d = l["who"] not in NARRATED
        if is_d and start is None:
            start = i
        if not is_d and start is not None:
            blocks.append((start, i - 1))
            start = None
    skits = len(blocks)
    need = round(8 * minutes / 15)
    check(skits >= need, f"{skits} skit (đích ≥ {need})")
    # Cảnh đầy đủ (≥ 5 lượt, câu trọn vẹn) so với gag nhanh: xem craft.md mục 5
    scenes = [(a, b) for a, b in blocks if b - a + 1 >= 5]
    if skits:
        share = 100 * len(scenes) / skits
        check(share >= 60, f"{len(scenes)}/{skits} skit là cảnh đầy đủ ≥ 5 lượt ({share:.0f}%, đích ≥ 60%); còn lại là gag nhanh")
        turns = [lines[i]["w"] for a, b in blocks for i in range(a, b + 1)]
        avg = sum(turns) / len(turns)
        check(avg >= 5, f"trung bình {avg:.1f} từ mỗi lượt thoại (đích ≥ 5: câu trọn vẹn, không cụt lủn)")
        clipped = [(a, b) for a, b in scenes if sum(lines[i]["w"] <= 2 for i in range(a, b + 1)) > (b - a + 1) / 2]
        check(not clipped, f"{len(clipped)} cảnh có hơn nửa số lượt chỉ 1–2 từ")
        for a, b in clipped[:5]:
            out.append(f"      {fmt(lines[a]['t'])} {lines[a]['who']}: {lines[a]['text'][:70]}")
    long_d = [l for l in lines if l["who"] not in NARRATED and l["w"] > 18]
    check(not long_d, f"{len(long_d)} lượt thoại > 18 từ")
    out.append(f"    nhân vật: {dict(speakers)}")

    out.append("\nSự thật")
    num_lines = [l for l in lines if NUM_RE.search(l["text"]) and l["who"] in NARRATED]
    lo, hi, label = (2.5, 7, "2.5–7") if news else (1.5, 3.5, "1.5–3")
    check(lo * minutes <= len(num_lines) <= hi * minutes or minutes < 3, f"{len(num_lines)} dòng có con số ({len(num_lines) / minutes:.1f}/phút, đích {label})")
    nosrc = [l for l in num_lines if not any(x.startswith("SRC") or x == "ANALOGY" for x in l["tags"]) and l["who"] != "DATE"]
    check(not nosrc, f"{len(nosrc)} dòng có con số nhưng thiếu {{SRC:n}}")
    for l in nosrc[:8]:
        out.append(f"      {fmt(l['t'])} {l['text'][:90]}")

    # Người thật trong skit (references/real-people.md)
    real = {}
    for name in [x.strip() for x in meta.get("REAL", "").split(",") if x.strip()]:
        real[name.rstrip("!").strip()] = name.endswith("!")
    quote_cards = [l for l in lines if l["who"] == "CARD" and re.search(r"[\"“”]", l["text"]) and not any(x.startswith("SRC") for x in l["tags"])]
    if real or quote_cards:
        out.append(f"\nNgười thật trong skit · {', '.join(n + (' (bị cáo buộc)' if a else '') for n, a in real.items()) or '—'}")
        rl = [l for l in lines if l["who"] in real]
        out.append(f"    {len(rl)} lượt thoại của người thật")
        # Khung của mỗi khối thoại: {DRAMATIZED} (diễn lại cáo buộc, mức cam), {FRAMED}/câu rào (mức vàng), hoặc không có
        def frame_of(a):
            prev = [x for x in lines[max(0, a - 4):a] if x["who"] in NARRATED][-3:]
            if any("DRAMATIZED" in x["tags"] for x in prev):
                return "dram", next(x for x in prev if "DRAMATIZED" in x["tags"])
            if any("FRAMED" in x["tags"] or HEDGE_RE.search(x["text"]) for x in prev):
                return "framed", None
            return None, None
        frames = {(a, b): frame_of(a) for a, b in blocks}
        block_of = {i: (a, b) for a, b in blocks for i in range(a, b + 1)}
        dram = [(a, b) for (a, b), (k, _) in frames.items() if k == "dram"]
        out.append(f"    {len(dram)} cảnh diễn lại cáo buộc {{DRAMATIZED}} (tối đa 2 mỗi tập)")
        check(len(dram) <= 2, f"{len(dram)} cảnh {{DRAMATIZED}} (đích ≤ 2)")
        hard = [l for l in rl if REAL_HARD_RE.search(l["text"])]
        check(not hard, f"{len(hard)} lượt thoại của người thật thuộc vùng đỏ (đời tư, thú nhận)")
        for l in hard[:6]:
            out.append(f"      {fmt(l['t'])} {l['who']}: {l['text'][:80]}")
        risky = [l for i, l in enumerate(lines) if l["who"] in real and REAL_RISK_RE.search(l["text"]) and not REAL_HARD_RE.search(l["text"]) and frames.get(block_of.get(i), (None, None))[0] != "dram"]
        check(not risky, f"{len(risky)} lượt thoại của người thật chạm tới cáo buộc mà không nằm trong cảnh {{DRAMATIZED}}")
        for l in risky[:6]:
            out.append(f"      {fmt(l['t'])} {l['who']}: {l['text'][:80]}")
        unframed = [lines[a] for (a, b), (k, _) in frames.items() if k is None and any(real.get(lines[i]["who"]) for i in range(a, b + 1))]
        check(not unframed, f"{len(unframed)} cảnh có người bị cáo buộc mà không có câu khung {{FRAMED}} hoặc {{DRAMATIZED}} ngay trước")
        for l in unframed[:6]:
            out.append(f"      {fmt(l['t'])} {l['who']}: {l['text'][:80]}")
        nosrc_d = [fl for (a, b), (k, fl) in frames.items() if k == "dram" and not any(x.startswith("SRC") for x in fl["tags"])]
        check(not nosrc_d, f"{len(nosrc_d)} câu mở khung {{DRAMATIZED}} thiếu {{SRC:n}}")
        noclose = []
        for a, b in dram:
            after = [x for x in lines[b + 1:b + 10] if x["who"] in NARRATED][:6]
            if not any(DENY_RE.search(x["text"]) for x in after):
                noclose.append(lines[a])
        check(not noclose, f"{len(noclose)} cảnh {{DRAMATIZED}} không có câu đóng khung nêu phủ nhận trong 6 dòng người dẫn sau cảnh")
        for l in noclose[:6]:
            out.append(f"      {fmt(l['t'])} {l['who']}: {l['text'][:80]}")
        check(not quote_cards, f"{len(quote_cards)} thẻ chữ có ngoặc kép nhưng không có {{SRC:n}} (thẻ trích dẫn phải là lời thật có nguồn)")
        for l in quote_cards[:6]:
            out.append(f"      {fmt(l['t'])} {l['text'][:80]}")

    out.append("\nGiọng đọc (thẻ ElevenLabs, xem skill elevenlabs-voice)")
    narr = [l for l in lines if l["who"] in NARRATED]
    tagged = [l for l in narr if l["vtags"]]
    pct = 100 * len(tagged) / len(narr) if narr else 0
    check(pct <= 30, f"{len(tagged)} dòng người dẫn có thẻ giọng ({pct:.0f}%, đích ≤ 30%)")
    adjacent = [c for a, b, c in zip(narr, narr[1:], narr[2:]) if a["vtags"] and b["vtags"] and c["vtags"]]
    check(not adjacent, f"{len(adjacent)} chỗ có ba dòng người dẫn liền nhau đều có thẻ")
    # Tín hiệu cảm xúc = thẻ, "…", "—", "?", "!" hoặc một chữ IN HOA để nhấn (bảng điều khiển cảm xúc trong skill elevenlabs-voice)
    def expressive(l):
        return bool(l["vtags"] or re.search(r"[…—?!]|\.\.\.", l["voiced"]) or any(w not in ACRONYMS for w in re.findall(r"\b[A-Z]{3,}\b", l["text"])))
    dial = [l for l in lines if l["who"] not in NARRATED]
    if narr:
        e = 100 * sum(map(expressive, narr)) / len(narr)
        check(e >= 40, f"{e:.0f}% dòng người dẫn có tín hiệu cảm xúc (thẻ, …, —, ?, !, IN HOA; đích ≥ 40%)")
    if dial:
        punct = 100 * sum(bool(re.search(r"[…—?!]|\.\.\.", l["voiced"]) or re.search(r"\b[A-Z]{3,}\b", l["text"])) for l in dial) / len(dial)
        untagged = [l for l in dial if not l["vtags"]]
        check(not untagged, f"{len(untagged)} lượt thoại không có thẻ vai/cảm xúc")
        check(punct >= 50, f"{punct:.0f}% lượt thoại có dấu nhấn nhá ngoài thẻ (…, —, ?, !, IN HOA; đích ≥ 50%)")
    for l in adjacent[:5]:
        out.append(f"      {fmt(l['t'])} {l['voiced'][:90]}")
    sfx = [l for l in lines if any(any(w in SFX_VOICE_TAGS for w in re.findall(r"[a-z]+", t)) for t in l["vtags"])]
    check(not sfx, f"{len(sfx)} thẻ mô tả âm thanh/hành động (để tiếng động cho khâu dựng)")
    for l in sfx[:5]:
        out.append(f"      {fmt(l['t'])} {l['voiced'][:90]}")
    caps = [l for l in narr if sum(w not in ACRONYMS for w in re.findall(r"\b[A-Z]{3,}\b", l["text"])) >= 2]
    check(not caps, f"{len(caps)} dòng có ≥ 2 chữ IN HOA để nhấn (đích: tối đa 1 chữ mỗi đoạn)")
    if lines and any(l["vtags"] for l in lines):
        out.append(f"    thẻ đã dùng: {collections.Counter(t for l in lines for t in l['vtags']).most_common(10)}")

    sp = [l for l in lines if "SPONSOR" in l["beat"][1].upper()]
    if sp:
        pos = 100 * sp[0]["t"] / (minutes * 60)
        out.append("\nSponsor")
        check(25 <= pos <= 35, f"bắt đầu ở {pos:.0f}% (đích 25–35%)")
        check(re.match(r"^okay,? back to the video", sp[-1]["text"], re.I) is not None or any(re.match(r"^okay,? back to the video", l["text"], re.I) for l in sp), "có câu 'Okay, back to the video.'")

    print("\n".join(out))
    print(f"\n{'Không còn cảnh báo.' if not warns else f'{len(warns)} cảnh báo.'}")
    return warns


def report_plain(path, wpm):
    flat = re.sub(r"\s+", " ", re.sub(r"\[music\]", " ", open(path, encoding="utf-8").read(), flags=re.I))
    sents = [s.strip() for s in re.split(r"(?<=[.?!])\s+", flat) if s.strip()]
    wl = [words(s) for s in sents]
    total = sum(wl)
    minutes = total / wpm
    print(f"{total} từ · {len(sents)} câu · ≈ {minutes:.1f} phút ở {wpm} từ/phút")
    print(f"từ/câu: trung bình {st.mean(wl):.1f}, trung vị {st.median(wl):.0f}, p90 {sorted(wl)[int(len(wl) * .9)]}, max {max(wl)}")
    print(f"câu ≤ 4 từ: {100 * sum(w <= 4 for w in wl) / len(wl):.0f}% · câu ≥ 15 từ: {sum(w >= 15 for w in wl)}")
    q = sum(s.endswith("?") for s in sents)
    print(f"câu hỏi: {q} ({q / minutes:.1f}/phút)")
    n = len(NUM_RE.findall(flat))
    print(f"con số: ~{n} ({n / minutes:.1f}/phút)")
    st_ = collections.Counter(re.sub(r"[^a-z']", "", s.split()[0].lower()) for s in sents)
    print(f"câu mở đầu: {st_.most_common(12)}")
    return []


# ---------------------------------------------------------------- TTS text

_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
_ORD = {"one": "first", "two": "second", "three": "third", "five": "fifth", "eight": "eighth", "nine": "ninth", "twelve": "twelfth"}
_MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December"

# Chữ viết tắt / mã sản phẩm hay bị giọng đọc AI đọc sai. Thêm vào đây khi gặp từ mới.
# Luôn áp dụng: chữ viết tắt dễ bị đọc sai ("US" thành "us").
TTS_REPLACE = [
    (r"\bUS\b", "U.S."),
    (r"\bFT\b", "Financial Times"),
]
# Chỉ áp dụng khi bật --spell-numbers: mã sản phẩm có chữ số.
# Mặc định để nguyên số: ElevenLabs v4 đọc đúng ngày, năm, tiền, %, số lớn (Tú chốt 13/11/2026).
NUMBER_REPLACE = [
    (r"\bH100s?\b", lambda m: "H one hundred" + ("s" if m.group(0).endswith("s") else "")),
    (r"\bH200\b", "H two hundred"),
    (r"\bH20\b", "H twenty"),
    (r"\b401\(k\)", "four-oh-one-k"),
    (r"\bS&P\b", "S and P"),
]
SPELL_NUMBERS = False


def num_words(n):
    if n < 20:
        return _ONES[n]
    if n < 100:
        return _TENS[n // 10] + ("" if n % 10 == 0 else "-" + _ONES[n % 10])
    if n < 1000:
        return _ONES[n // 100] + " hundred" + ("" if n % 100 == 0 else " " + num_words(n % 100))
    for div, name in ((10**12, "trillion"), (10**9, "billion"), (10**6, "million"), (1000, "thousand")):
        if n >= div:
            return num_words(n // div) + " " + name + ("" if n % div == 0 else " " + num_words(n % div))


def year_words(y):
    if 2000 <= y <= 2009:
        return "two thousand" + ("" if y == 2000 else " " + _ONES[y - 2000])
    hi, lo = divmod(y, 100)
    if lo == 0:
        return num_words(hi) + " hundred"
    return num_words(hi) + " " + ("oh " + _ONES[lo] if lo < 10 else num_words(lo))


def ordinal_words(n):
    w = num_words(n)
    last = re.split(r"[ -]", w)[-1]
    o = _ORD.get(last) or (last[:-1] + "ieth" if last.endswith("y") else last + "th")
    return w[: len(w) - len(last)] + o


def _decimal(m):
    return num_words(int(m.group(1))) + " point " + " ".join(_ONES[int(d)] for d in m.group(2))


def tts_normalize(text):
    """Chuẩn bị câu cho giọng đọc AI. Mặc định chỉ sửa chữ viết tắt dễ đọc sai và giữ nguyên chữ số.
    Với --spell-numbers (dự phòng khi một giọng đọc sai số): viết số, ngày, tiền, % thành chữ."""
    t = text
    for pat, rep in TTS_REPLACE:
        t = re.sub(pat, rep, t)
    if not SPELL_NUMBERS:
        return re.sub(r"\s{2,}", " ", t).strip()
    for pat, rep in NUMBER_REPLACE:
        t = re.sub(pat, rep, t)
    t = re.sub(rf"\b({_MONTHS}) (\d{{1,2}}) (to|and|-|–) (\d{{1,2}})\b", lambda m: f"{m.group(1)} {ordinal_words(int(m.group(2)))} {'to' if m.group(3) in '-–' else m.group(3)} {ordinal_words(int(m.group(4)))}", t)
    t = re.sub(rf"\b({_MONTHS}) (\d{{1,2}}), (\d{{4}})\b", lambda m: f"{m.group(1)} {ordinal_words(int(m.group(2)))}, {year_words(int(m.group(3)))}", t)
    t = re.sub(rf"\b({_MONTHS}) (\d{{1,2}})\b(?!,? \d)", lambda m: f"{m.group(1)} {ordinal_words(int(m.group(2)))}", t)
    t = re.sub(r"\$(\d+(?:\.\d+)?)\s*(thousand|million|billion|trillion)\b", lambda m: f"{m.group(1)} {m.group(2)} dollars", t)
    t = re.sub(r"\$(\d{1,3}(?:,\d{3})+|\d+)\b", lambda m: f"{m.group(1)} dollars", t)
    t = re.sub(r"\b(\d+)\.(\d+)\b", _decimal, t)
    t = re.sub(r"\b(\d+)\s?%", lambda m: num_words(int(m.group(1))) + " percent", t)
    t = re.sub(r"(?<![\d,])(?<!\d,)\b(1[1-9]\d\d|20\d\d)\b(?!,\d)(?!\d)", lambda m: year_words(int(m.group(1))), t)
    t = re.sub(r"\b\d{1,3}(?:,\d{3})+\b", lambda m: num_words(int(m.group(0).replace(",", ""))), t)
    t = re.sub(r"\b\d+\b", lambda m: num_words(int(m.group(0))), t)
    t = re.sub(r"\s{2,}", " ", t).strip()
    return t[:1].upper() + t[1:]


def _paragraphs(lines):
    """Gom dòng của một beat thành đoạn: tách ở thẻ ngày, quanh khối thoại, sau câu treo, sau thẻ chữ, và tối đa 6 câu."""
    paras, cur, cur_dialog = [], [], None
    for l in lines:
        is_d = l["who"] not in NARRATED
        if cur and (l["who"] == "DATE" or is_d != cur_dialog):
            paras.append((cur_dialog, cur))
            cur = []
        cur_dialog = is_d
        cur.append(l)
        if not is_d and ("LOOP" in l["tags"] or l["who"] == "CARD" or len(cur) >= 6):
            paras.append((cur_dialog, cur))
            cur = []
    if cur:
        paras.append((cur_dialog, cur))
    return paras


def _beats(lines):
    beats = collections.OrderedDict()
    for l in lines:
        beats.setdefault(l["beat"], []).append(l)
    return beats


def export_read(meta, lines, path, wpm):
    """Bản đọc duyệt: chữ sạch, không thẻ/nguồn/ghi chú hình; thoại ghi tên người nói; câu lên thẻ chữ in đậm."""
    total = sum(l["w"] for l in lines)
    t, out = 0.0, []
    out.append(f"# {meta.get('TITLE', 'Untitled')}\n")
    out.append(f"*{total} từ · khoảng {total / wpm:.0f} phút ở {wpm:.0f} từ/phút · **in đậm** = câu hiện trên thẻ chữ đen · *nghiêng* = thẻ năm/địa điểm*\n")
    for i, ((bid, name), ls) in enumerate(_beats(lines).items(), 1):
        out.append(f"\n## {i}. {name.title()}  ·  {int(t // 60)}:{int(t % 60):02d}\n")
        chap = meta.get("_chapters", {}).get((bid, name))
        if chap:
            out.append(f"`Thẻ chương (chỉ hiện chữ, không đọc): {chap}`\n")
        for is_d, para in _paragraphs(ls):
            if is_d:
                out.append("\n".join(f"> **{l['who']}:** {l['text']}  " for l in para) + "\n")
                continue
            parts = []
            for l in para:
                if l["who"] == "DATE":
                    out.append(f"*{l['text']}*\n")
                elif l["who"] == "CARD":
                    parts.append(f"**{l['text']}**")
                else:
                    parts.append(l["text"])
            if parts:
                out.append(" ".join(parts) + "\n")
        t += sum(l["w"] for l in ls) / wpm * 60
    open(path, "w", encoding="utf-8").write("\n".join(out))
    print(f"Đã ghi bản đọc duyệt vào {path}")


def _balance(blocks, max_chars):
    """Chia các đoạn của một phần thành ít file nhất có thể (mỗi file ≤ max_chars), các file dài xấp xỉ nhau.
    Tránh kiểu chia tham lam để lại một file đuôi chỉ có một câu: tạo giọng riêng một câu làm đứt mạch ngữ điệu."""
    import math
    total = sum(len(b) for b in blocks) + 2 * (len(blocks) - 1)
    k = max(1, math.ceil(total / max_chars))
    while True:
        target = total / k
        chunks, cur = [], ""
        for b in blocks:
            nxt = f"{cur}\n\n{b}" if cur else b
            closer_without = abs(len(cur) - target) < abs(len(nxt) - target)
            if cur and (len(nxt) > max_chars or (len(chunks) < k - 1 and closer_without)):
                chunks.append(cur)
                cur = b
            else:
                cur = nxt
        chunks.append(cur)
        if len(chunks) <= k or k >= len(blocks):
            return chunks
        k += 1


def _channel_voice(outdir):
    """Đọc giọng người dẫn và bảng thiết lập từ channel/voice.md (tìm ngược lên từ thư mục xuất)."""
    import os
    d = os.path.abspath(outdir)
    while d != os.path.dirname(d):
        p = os.path.join(d, "channel", "voice.md")
        if os.path.exists(p):
            txt = open(p, encoding="utf-8").read()
            voice = re.search(r"^\|\s*Người dẫn chính\s*\|\s*([^|]+?)\s*\|\s*`?([A-Za-z0-9]+)`?\s*\|", txt, re.M)
            settings = [l for l in txt.splitlines() if re.match(r"^\|\s*(Model|Stability|Similarity|Clone strength)\s*\|", l)]
            return p, voice, settings
        d = os.path.dirname(d)
    return None, None, []


def export_tts_dir(meta, lines, outdir, max_chars):
    """File .txt cho ElevenLabs: mỗi phần 1 file (chia đều nếu > max_chars), chữ viết tắt dễ đọc sai đã sửa (số giữ nguyên, trừ khi --spell-numbers),
    thẻ giọng giữ nguyên, thoại trong ngoặc kép không có nhãn người nói; kèm HUONG-DAN.md theo skill elevenlabs-voice."""
    import os
    os.makedirs(outdir, exist_ok=True)
    for f in os.listdir(outdir):
        if re.match(r"^\d\d[a-z]?_.*\.txt$", f):
            os.remove(os.path.join(outdir, f))
    files, dialog_rows = [], []
    for i, ((bid, name), ls) in enumerate(_beats(lines).items(), 1):
        slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:30]
        blocks = []
        for is_d, para in _paragraphs(ls):
            texts = []
            for l in para:
                s = tts_normalize(l["voiced"])
                if is_d:
                    m = re.match(r"^((?:\[[^\]\n]{1,60}\]\s*)*)(.*)$", s)
                    s = f"{m.group(1)}“{m.group(2)}”"  # thẻ giọng đứng ngoài ngoặc kép
                    dialog_rows.append((i, l["who"], l["voiced"]))
                texts.append(s)
            blocks.append("\n".join(texts))
        chunks = _balance(blocks, max_chars)
        for j, c in enumerate(chunks):
            suffix = "" if len(chunks) == 1 else "abcdefghij"[j]
            fname = f"{i:02d}{suffix}_{slug}.txt"
            open(os.path.join(outdir, fname), "w", encoding="utf-8").write(c + "\n")
            files.append((fname, len(c)))

    # Đường dẫn của tập: episodes/<tập>/script/<slug>.elevenlabs → episodes/<tập>, public/<tập>/audio
    ep_dir = os.path.dirname(os.path.dirname(os.path.abspath(outdir)))
    ep = os.path.basename(ep_dir)
    root = os.path.dirname(os.path.dirname(ep_dir))
    rel = lambda p: os.path.relpath(p, root)
    takes_dir, audio_dir = os.path.join(ep_dir, "voice"), os.path.join(root, "public", ep, "audio")
    vpath, voice, settings = _channel_voice(outdir)
    total = sum(n for _, n in files)

    g = [f"# Thu giọng ElevenLabs — {meta.get('TITLE', '')}\n"]
    g.append("Theo skill `elevenlabs-voice`. File này do `script_lint.py --tts-dir` sinh ra: muốn sửa câu, thẻ hay nhịp thì sửa kịch bản gốc rồi xuất lại, đừng sửa tay các file `.txt`.\n")
    g.append("## 1. Giọng và thiết lập\n")
    if voice:
        g.append(f"Một voice cho cả kênh: **{voice.group(1)}** (`{voice.group(2)}`). Mọi vai, kể cả vai nữ và trẻ em, đều do voice này đọc bằng thẻ vai đã viết sẵn trong file.\n")
    else:
        g.append("Chưa có `channel/voice.md`, tức là chưa chọn giọng: làm mục 2 của skill `elevenlabs-voice` trước.\n")
    if settings:
        g.append("| | Người dẫn | Nhân vật |\n|---|---|---|")
        g += settings
        g.append(f"\nNguồn: `{rel(vpath)}`. Giữ đúng một bộ thiết lập cho cả tập; câu nào nhạt thì tạo lại câu đó, đừng đổi thiết lập giữa chừng.\n")
    g.append("## 2. Tạo giọng (theo đoạn, không theo từng câu)\n")
    g.append("1. Tạo **theo thứ tự** bảng dưới: mỗi file là một lượt.")
    g.append("2. Mỗi file tạo **2–3 lần**, chọn bản hay nhất. Ghép câu hay từ nhiều bản cũng được, miễn là cắt ở chỗ nghỉ.")
    g.append("3. Qua API: `model_id: \"eleven_v4\"`, `voice_settings` như mục 1, truyền `previous_request_ids` (tối đa 3) của file liền trước để các phần nối liền mạch.")
    g.append(f"4. Bản đã chọn lưu thành `{rel(takes_dir)}/<tên file>.mp3`, trùng tên file chữ (vd. `{files[0][0].replace('.txt', '.mp3')}`).")
    g.append(f"5. Xong hết thì báo Claude để cắt thành từng câu vào `{rel(audio_dir)}/<mã câu>.wav` cho Remotion (theo `lines.tsv`). Bước này chưa có script; xem skill `elevenlabs-voice`, mục 5.4.\n")
    g.append("| # | File | Ký tự | Bản chọn |\n|---|---|---|---|")
    g += [f"| {k} | `{f}` | {n} | |" for k, (f, n) in enumerate(files, 1)]
    g.append(f"\nTổng **{total:,}** ký tự cho một lượt. Tạo 2–3 lần mỗi file thì dự trù khoảng **{2 * total:,}–{3 * total:,}** credit (credit tính cả ký tự trong thẻ).\n")
    g.append("## 3. Nghe soát (tai nghe, trước khi dựng)\n")
    g += [
        "- [ ] Tên riêng và chữ viết tắt đọc đúng. Sai thì thêm vào Pronunciation Dictionary hoặc `TTS_REPLACE` trong linter, không viết sai chính tả trong kịch bản.",
        "- [ ] Không có thẻ nào bị đọc thành chữ, không có tiếng động lạ.",
        "- [ ] Câu chốt có khoảng lặng trước và đọc khô; không cười trước punchline.",
        "- [ ] Không có ba câu liền nhau cùng một giai điệu.",
        "- [ ] Các file nghe như cùng một người: cùng độ cao, cùng độ vang.",
        "- [ ] Không nuốt chữ, không dồn nhanh ở cuối đoạn dài.",
        "- [ ] Nhắm mắt vẫn phân biệt được các vai với nhau và với lời dẫn. Vai nữ, trẻ em giữ cùng chất giọng giữa các câu (bảng dưới).",
        f"- [ ] Thẻ nào ăn, thẻ nào hỏng, từ nào phải sửa cách đọc: ghi vào `{rel(vpath) if vpath else 'channel/voice.md'}`.\n",
    ]
    if dialog_rows:
        g.append("## 4. Lời thoại nhân vật (để nghe so từng vai)\n\n| Phần | Nhân vật | Câu |\n|---|---|---|")
        g += [f"| {i:02d} | {who} | {text} |" for i, who, text in dialog_rows]
    open(os.path.join(outdir, "HUONG-DAN.md"), "w", encoding="utf-8").write("\n".join(g) + "\n")
    print(f"Đã ghi {len(files)} file cho ElevenLabs vào {outdir} (ngắn nhất {min(n for _, n in files)}, dài nhất {max(n for _, n in files)} ký tự) + HUONG-DAN.md")


def export_tsv(lines, path, voices, default_voice):
    n = 0
    with open(path, "w", encoding="utf-8") as f:
        counters = collections.Counter()
        for l in lines:
            bid = l["beat"][0].lower()
            counters[bid] += 1
            voice = voices.get("N", default_voice) if l["who"] in NARRATED else voices.get(l["who"], default_voice)
            text = tts_normalize(l["voiced"]).replace("\t", " ")
            f.write(f"{bid}_{counters[bid]:03d}\t{voice}\t{text}\n")
            n += 1
    print(f"\nĐã ghi {n} dòng vào {path}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--plain", action="store_true")
    ap.add_argument("--wpm", type=float, default=150)
    ap.add_argument("--strict", action="store_true")
    ap.add_argument("--tsv")
    ap.add_argument("--voice", action="append", default=[], help='"Tên=Giọng", ví dụ "N=Eddy (English (US))"')
    ap.add_argument("--default-voice", default="Samantha")
    ap.add_argument("--read", help="ghi bản đọc duyệt (.md)")
    ap.add_argument("--tts-dir", help="ghi các file .txt cho ElevenLabs vào thư mục này")
    ap.add_argument("--tts-max-chars", type=int, default=2400)
    ap.add_argument("--spell-numbers", action="store_true", help="viết số, ngày, tiền, %% thành chữ trong file TTS (mặc định giữ chữ số)")
    a = ap.parse_args()
    global SPELL_NUMBERS
    SPELL_NUMBERS = a.spell_numbers
    if a.plain:
        warns = report_plain(a.file, a.wpm)
    else:
        meta, lines = parse(a.file)
        if not lines:
            sys.exit("Không tìm thấy dòng nào dạng 'N:', 'CARD:', 'DATE:' hoặc 'Tên:'. Transcript thô thì dùng --plain.")
        warns = report_script(meta, lines, a.wpm)
        if a.tsv:
            voices = dict(v.split("=", 1) for v in a.voice)
            export_tsv(lines, a.tsv, voices, a.default_voice)
        if a.read:
            export_read(meta, lines, a.read, a.wpm)
        if a.tts_dir:
            export_tts_dir(meta, lines, a.tts_dir, a.tts_max_chars)
    sys.exit(1 if a.strict and warns else 0)


if __name__ == "__main__":
    main()
