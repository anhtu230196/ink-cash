#!/usr/bin/env python3
"""
Tìm và tải sound effect từ Freesound.org cho một tập, kèm ghi nguồn theo giấy phép.

  python3 tools/freesound.py search "cash register"                 # 10 kết quả: id, tên, giấy phép, độ dài, lượt tải
  python3 tools/freesound.py search "rubber stamp" --max 3 --n 5    # chỉ tiếng ≤ 3 giây
  python3 tools/freesound.py get episodes/ep01-megaspeed 12345 stamp  # tải id 12345 → public/ep01-megaspeed/sfx/stamp.mp3
  python3 tools/freesound.py get episodes/ep01-megaspeed 584304 bed-coffee --folder music   # nhạc nền → public/<tập>/music/

- Key: FREESOUND_API_KEY trong môi trường hoặc .env ở gốc dự án (tạo ở https://freesound.org/apiv2/apply/).
- Chỉ lấy giấy phép dùng được cho video kiếm tiền: CC0 và CC-BY (bỏ CC-BY-NC và Sampling+).
- Tải bản preview chất lượng cao (mp3 ~128 kbps). Bản gốc (wav) cần OAuth2, chưa làm.
- Mỗi lần get ghi thêm một dòng vào episodes/<tập>/publish/sfx-credits.md; dán phần CC-BY vào mô tả video.
"""
import argparse, json, os, re, sys, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = "https://freesound.org/apiv2"
OK_LICENSES = 'license:("Creative Commons 0" OR "Attribution")'   # không có NonCommercial
FIELDS = "id,name,username,license,duration,num_downloads,avg_rating,previews,url,tags"


def key():
    k = os.environ.get("FREESOUND_API_KEY")
    env = ROOT / ".env"
    if not k and env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("FREESOUND_API_KEY="):
                k = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not k:
        sys.exit("Thiếu FREESOUND_API_KEY trong .env (tạo ở https://freesound.org/apiv2/apply/).")
    return k


def get_json(path, params):
    params["token"] = key()
    url = f"{API}{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


def lic_short(url):
    return "CC0" if "zero" in url else "CC-BY" if "/by/" in url else url


def lic_full(url):
    v = re.search(r"/(\d\.\d)/", url)
    v = v.group(1) if v else ""
    return f"CC0 {v}".strip() if "zero" in url else f"CC BY {v} ({url})".replace("  ", " ")


def search(a):
    flt = OK_LICENSES
    if a.max:
        flt += f" duration:[0 TO {a.max}]"
    d = get_json("/search/text/", {"query": a.query, "filter": flt, "fields": FIELDS,
                                   "sort": a.sort, "page_size": a.n})
    print(f"{d['count']} kết quả cho '{a.query}'")
    for s in d["results"]:
        print(f"{s['id']:>8}  {lic_short(s['license']):5}  {s['duration']:6.1f}s  ↓{s['num_downloads']:<6} "
              f"★{s.get('avg_rating') or 0:.1f}  {s['name'][:50]}  — {s['username']}")
        print(f"          nghe: {s['previews']['preview-hq-mp3']}")


def fetch(a):
    s = get_json(f"/sounds/{a.id}/", {"fields": FIELDS})
    lic = lic_short(s["license"])
    if lic not in ("CC0", "CC-BY"):
        sys.exit(f"Giấy phép {s['license']} không dùng được cho video kiếm tiền.")
    ep = (ROOT / a.episode).resolve()
    out = ROOT / "public" / ep.name / a.folder / f"{a.name}.mp3"
    out.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(s["previews"]["preview-hq-mp3"], out)
    credits = ep / "publish" / "sfx-credits.md"
    credits.parent.mkdir(parents=True, exist_ok=True)
    if not credits.exists():
        credits.write_text("# Sound effect (Freesound.org)\n\nCC-BY phải ghi nguồn trong mô tả video; CC0 ghi cho đủ.\n\n")
    line = f"- `{a.folder}/{a.name}.mp3` — \"{s['name']}\" by {s['username']} (https://freesound.org/s/{s['id']}/), {lic_full(s['license'])}\n"
    if line not in credits.read_text():
        with credits.open("a") as f:
            f.write(line)
    print(f"{out.relative_to(ROOT)}  {s['duration']:.1f}s  {lic}  \"{s['name']}\" by {s['username']}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--n", type=int, default=10)
    s.add_argument("--max", type=float, help="độ dài tối đa (giây)")
    s.add_argument("--sort", default="score", help="score | downloads_desc | rating_desc | duration_asc")
    g = sub.add_parser("get")
    g.add_argument("episode")
    g.add_argument("id", type=int)
    g.add_argument("name", help="tên file lưu, không đuôi (vd. stamp)")
    g.add_argument("--folder", default="sfx", help="thư mục con trong public/<tập>/ (sfx | music)")
    a = ap.parse_args()
    search(a) if a.cmd == "search" else fetch(a)


if __name__ == "__main__":
    main()
