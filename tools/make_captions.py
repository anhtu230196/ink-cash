#!/usr/bin/env python3
"""Build YouTube captions (.srt) and chapter timestamps for an episode from the same timeline the mixer uses.

    python3 -I tools/make_captions.py episodes/ep01-megaspeed

Reads mix.json (section order), out/<prefix>-<Section>_final.mp4 (exact frame counts), src/timing.json (line
durations) and lines.tsv (text). Writes publish/captions.en.srt and prints the start of every beat (bNN) as
YouTube chapter stamps. Emotion tags like [deadpan] are stripped from the captions.
"""
import json, os, re, subprocess, sys


def frames_of(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_packets",
                          "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout.strip()
    return int(out.split(",")[0])


def stamp(t, srt=True):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    if srt:
        return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def wrap(text, width=42):
    """At most two lines, split near the middle on a space."""
    if len(text) <= width:
        return [text]
    mid = len(text) // 2
    spaces = [i for i, c in enumerate(text) if c == " "]
    cut = min(spaces, key=lambda i: abs(i - mid)) if spaces else mid
    return [text[:cut].strip(), text[cut:].strip()]


def chunks(text, limit=84):
    """Split a long line into caption-sized pieces on sentence/comma boundaries, weighted by length."""
    if len(text) <= limit:
        return [text]
    parts = re.split(r"(?<=[.?!…,:;—])\s+", text)
    out, cur = [], ""
    for p in parts:
        if cur and len(cur) + 1 + len(p) > limit:
            out.append(cur)
            cur = p
        else:
            cur = f"{cur} {p}".strip()
    if cur:
        out.append(cur)
    return out


def main():
    ep = sys.argv[1].rstrip("/")
    spec = json.load(open(os.path.join(ep, "mix.json")))
    timing = json.load(open(os.path.join(ep, "src", "timing.json")))
    text = {}
    for row in open(os.path.join(ep, "lines.tsv"), encoding="utf-8"):
        cols = row.rstrip("\n").split("\t")
        if len(cols) >= 3:
            text[cols[0]] = cols[2]

    cues, chapters, total = [], [], 0.0
    for name, beat, lo, hi in spec["sections"]:
        if lo == 1:
            chapters.append((beat, total))
        acc = 0.0
        for i in range(lo, hi + 1):
            lid = f"{beat}_{i:03d}"
            st = total + round(acc * 30) / 30
            dur = timing[lid]
            t = re.sub(r"\[[^\]]*\]\s*", "", text.get(lid, "")).strip()
            pieces = chunks(t)
            n = sum(len(p) for p in pieces) or 1
            s0 = st
            for p in pieces:
                d = dur * len(p) / n
                cues.append((s0, s0 + d, p))
                s0 += d
            acc += dur
        total += frames_of(os.path.join(ep, "out", f"{spec['prefix']}-{name}_final.mp4")) / 30

    # rounding to video frames can make a cue start a few ms before the previous one ends
    cues = [(a, min(b, cues[k + 1][0]) if k + 1 < len(cues) else b, t) for k, (a, b, t) in enumerate(cues)]
    os.makedirs(os.path.join(ep, "publish"), exist_ok=True)
    path = os.path.join(ep, "publish", "captions.en.srt")
    with open(path, "w", encoding="utf-8") as f:
        for k, (a, b, t) in enumerate(cues, 1):
            f.write(f"{k}\n{stamp(a)} --> {stamp(b)}\n" + "\n".join(wrap(t)) + "\n\n")
    print(f"wrote {path}: {len(cues)} cues, total {stamp(total, False)}")
    for beat, t in chapters:
        print(f"{beat}\t{stamp(t, False)}\t{t:.2f}s")


if __name__ == "__main__":
    main()
