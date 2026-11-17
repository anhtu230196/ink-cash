#!/usr/bin/env python3
"""
Tạo giọng ElevenLabs cho một tập, theo từng file kịch bản trong script/<slug>.elevenlabs/*.txt.

  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed --dry-run       # xem file nào, bao nhiêu ký tự, còn bao nhiêu credit
  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed                  # mỗi file 1 bản
  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed --takes 3        # mỗi file đủ 3 bản (bản đã có không tạo lại)
  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed 02a 03 --takes 2 # chỉ vài file (khớp theo đầu tên file)
  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed --pick 02a=2     # chọn bản 2 → voice/02a_….mp3
  python3 tools/make_voice_elevenlabs.py episodes/ep01-megaspeed --status         # bảng các bản đã tạo / đã chọn

- Key: ELEVENLABS_API_KEY trong môi trường hoặc trong .env ở gốc dự án.
- Voice và thiết lập: mặc định theo channel/voice.md (Alex, eleven_v4, stability 0.45, similarity 0.75).
- Các bản tạo ra nằm ở episodes/<tập>/voice/takes/<stem>.tN.mp3; nhật ký (request id, ký tự) ở voice/takes/log.json.
- Bản chọn (--pick) chép ra episodes/<tập>/voice/<stem>.mp3 — đúng chỗ tools/split_voice.py đọc.
- Nối mạch: mỗi file gửi kèm previous_request_ids = request id của bản đã chọn (hoặc bản mới nhất) của file liền trước,
  nếu bản đó tạo trong vòng 2 giờ (giới hạn của ElevenLabs). API từ chối thì tự gửi lại không kèm.
"""
import argparse, json, os, shutil, sys, time, urllib.error, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = "https://api.elevenlabs.io/v1"
VOICE_ID = "yl2ZDV1MzN4HbQJbMihG"   # Alex - Upbeat, Energetic and Clear (channel/voice.md)
MODEL = "eleven_v4"
STITCH_WINDOW = 2 * 3600


def load_key() -> str:
    key = os.environ.get("ELEVENLABS_API_KEY")
    env = ROOT / ".env"
    if not key and env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        sys.exit("Thiếu ELEVENLABS_API_KEY (đặt trong .env ở gốc dự án).")
    return key


def api(key, method, path, body=None):
    req = urllib.request.Request(API + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        return r.read(), dict(r.headers)


def credits_left(key):
    try:
        d = json.loads(api(key, "GET", "/user/subscription")[0])
        return d["character_limit"] - d["character_count"], d
    except Exception as e:  # key không có quyền user_read
        return None, str(e)


def tts(key, text, settings, prev_ids):
    body = {"text": text, "model_id": MODEL, "voice_settings": settings}
    if prev_ids:
        body["previous_request_ids"] = prev_ids
    path = f"/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128"
    try:
        audio, hdr = api(key, "POST", path, body)
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")[:500]
        if prev_ids and e.code in (400, 422):
            print(f"    API từ chối previous_request_ids ({e.code}); gửi lại không kèm. {msg}")
            return tts(key, text, settings, None)
        raise SystemExit(f"Lỗi ElevenLabs {e.code}: {msg}")
    hdr = {k.lower(): v for k, v in hdr.items()}
    return audio, hdr.get("request-id"), hdr.get("character-cost") or hdr.get("x-character-count"), bool(prev_ids)


def duration(p):
    import subprocess
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                         capture_output=True, text=True).stdout.strip()
    return float(out) if out else 0.0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("episode", help="vd. episodes/ep01-megaspeed")
    ap.add_argument("only", nargs="*", help="chỉ các file có tên bắt đầu bằng chuỗi này (vd. 01 02a)")
    ap.add_argument("--takes", type=int, default=1, help="số bản mỗi file cần có (mặc định 1)")
    ap.add_argument("--stability", type=float, default=0.45)
    ap.add_argument("--similarity", type=float, default=0.75)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--pick", metavar="STEM=N", action="append", default=[])
    ap.add_argument("--status", action="store_true")
    ap.add_argument("--force", action="store_true", help="--pick: ghi đè voice/<stem>.mp3 đã có")
    a = ap.parse_args()

    ep = (ROOT / a.episode).resolve() if not Path(a.episode).is_absolute() else Path(a.episode)
    dirs = sorted((ep / "script").glob("*.elevenlabs"))
    if not dirs:
        sys.exit(f"Không thấy {ep}/script/*.elevenlabs/")
    files = sorted(dirs[0].glob("*.txt"))
    stems = [f.stem for f in files]
    takes_dir = ep / "voice" / "takes"
    log_path = takes_dir / "log.json"
    log = json.loads(log_path.read_text()) if log_path.exists() else {"takes": {}, "picked": {}}

    def match(prefix):
        hit = [s for s in stems if s.startswith(prefix)]
        if len(hit) != 1:
            sys.exit(f"'{prefix}' khớp {len(hit)} file: {hit}")
        return hit[0]

    def save_log():
        takes_dir.mkdir(parents=True, exist_ok=True)
        log_path.write_text(json.dumps(log, indent=2, ensure_ascii=False))

    if a.pick:
        for item in a.pick:
            pre, n = item.split("=")
            stem, n = match(pre), int(n)
            src = takes_dir / f"{stem}.t{n}.mp3"
            dst = ep / "voice" / f"{stem}.mp3"
            if not src.exists():
                sys.exit(f"Không có {src}")
            if dst.exists() and not a.force:
                sys.exit(f"{dst.name} đã có; thêm --force để ghi đè.")
            shutil.copy2(src, dst)
            log["picked"][stem] = n
            print(f"Chọn {src.name} → voice/{dst.name}")
        save_log()
        return

    if a.status:
        for s in stems:
            t = log["takes"].get(s, [])
            have = "voice/" + s + ".mp3" if (ep / "voice" / f"{s}.mp3").exists() else ""
            print(f"{s:38} bản: {len(t)}  chọn: {log['picked'].get(s, '-')}  {have}")
        return

    todo = [match(p) for p in a.only] if a.only else stems
    key = load_key()
    settings = {"stability": a.stability, "similarity_boost": a.similarity}

    plan = []
    for s in todo:
        text = (dirs[0] / f"{s}.txt").read_text().strip()
        need = max(0, a.takes - len(log["takes"].get(s, [])))
        plan.append((s, text, need))
    total = sum(len(t) * n for _, t, n in plan)
    left, _ = credits_left(key)
    print(f"Voice {VOICE_ID} · {MODEL} · stability {a.stability} · similarity {a.similarity}")
    for s, t, n in plan:
        print(f"  {s:38} {len(t):5} ký tự × {n} bản")
    print(f"Tổng ≈ {total:,} credit; còn {left:,} credit." if left is not None else f"Tổng ≈ {total:,} credit.")
    if left is not None and total > left:
        sys.exit("Không đủ credit.")
    if a.dry_run or total == 0:
        return

    for s, text, need in plan:
        for _ in range(need):
            prev_ids = None
            i = stems.index(s)
            if i > 0:
                prev = stems[i - 1]
                pt = log["takes"].get(prev, [])
                picked = log["picked"].get(prev)
                cand = next((t for t in pt if t["take"] == picked), pt[-1] if pt else None)
                if cand and cand.get("request_id") and time.time() - cand["time"] < STITCH_WINDOW:
                    prev_ids = [cand["request_id"]]
            n = len(log["takes"].get(s, [])) + 1
            print(f"→ {s} bản {n}{' (nối với ' + prev + ')' if prev_ids else ''} …", flush=True)
            audio, rid, cost, stitched = tts(key, text, settings, prev_ids)
            takes_dir.mkdir(parents=True, exist_ok=True)
            out = takes_dir / f"{s}.t{n}.mp3"
            out.write_bytes(audio)
            log["takes"].setdefault(s, []).append({"take": n, "request_id": rid, "time": time.time(),
                                                   "chars": len(text), "cost": cost, "stitched": stitched,
                                                   "settings": settings})
            save_log()
            print(f"    {out.relative_to(ROOT)}  {duration(out):.1f}s  credit: {cost or '?'}")
    left, _ = credits_left(key)
    if left is not None:
        print(f"Xong. Còn {left:,} credit.")
    print("Nghe các bản trong voice/takes/, rồi chọn: --pick <file>=<số bản>")


if __name__ == "__main__":
    main()
