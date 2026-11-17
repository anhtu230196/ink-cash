#!/usr/bin/env python3
"""Join an episode's rendered sections into one video and mix music + sound effects under the voice.

    python3 -I tools/mix_episode.py episodes/ep01-megaspeed            # → out/<ep>_full.mp4 (+ out/mix/ stems)

Reads episodes/<ep>/mix.json:
  sections   [[name, beat, first, last], …]   name → out/<prefix>-<name>_final.mp4, lines <beat>_<first…last>
  prefix     composition prefix, e.g. "ep01"
  beds       [{file, from, to}]                chapter music, back to back
  overrides  [{file, from, to}]                music that replaces the bed for a while (skits); the bed resumes where it was
  ambience   [{file, from, to}]                background sound (diner, crowd, server hum) — ducked with the music
  spots      [{file, at, [lufs]}]              one-shot sound effects (not ducked)
  levels     {bed, override, ambience, spot}   target loudness (LUFS) of each file before ducking; voice sits at -15
  duck       {threshold, ratio, attack, release}
  master     {I, TP}

Time refs: a number (seconds), "b03_029@start+1.2", "b02_010@end", a section name ("B03" = its start), or "END".
Every file is loudness-matched to its level first, so a quiet recording and a loud one land at the same level.
The music bus is side-chain compressed by the voice: it dips under speech and comes back up in pauses.
"""
import json, os, re, shutil, subprocess, sys, tempfile

def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        sys.exit(f"command failed: {' '.join(cmd[:8])} …\n{p.stderr[-2000:]}")
    return p

def probe(path, entries, stream=None):
    cmd = ["ffprobe", "-v", "error"] + (["-select_streams", stream] if stream else []) + ["-show_entries", entries, "-of", "csv=p=0", path]
    return run(cmd).stdout.strip().strip(",")

def loudness(path, extra=None):
    cmd = ["ffmpeg", "-nostats", "-i", path] + (extra or []) + ["-af", "ebur128=peak=true", "-f", "null", "-"]
    err = run(cmd).stderr
    I = re.findall(r"^\s+I:\s+(-?[\d.]+|-inf) LUFS", err, re.M)
    P = re.findall(r"^\s+Peak:\s+(-?[\d.]+|-inf) dBFS", err, re.M)
    return float(I[-1]) if I and I[-1] != "-inf" else -70.0, float(P[-1]) if P and P[-1] != "-inf" else -70.0

def main():
    ep_dir = os.path.abspath(sys.argv[1].rstrip("/"))
    ep = os.path.basename(ep_dir)
    root = os.path.abspath(os.path.join(ep_dir, "..", ".."))
    spec = json.load(open(os.path.join(ep_dir, "mix.json")))
    timing = json.load(open(os.path.join(ep_dir, "src", "timing.json")))
    pub = os.path.join(root, "public", ep)
    out_dir = os.path.join(ep_dir, "out")
    mix_dir = os.path.join(out_dir, "mix")
    os.makedirs(mix_dir, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="mix_")
    lv = spec["levels"]

    # ---- timeline: section starts (video frames) + line starts inside each section ----
    sec_start, line_at, total = {}, {}, 0.0
    files = []
    for name, beat, lo, hi in spec["sections"]:
        f = os.path.join(out_dir, f"{spec['prefix']}-{name}_final.mp4")
        frames = int(probe(f, "stream=nb_frames", "v:0"))
        dur = frames / 30
        sec_start[name] = total
        acc = 0.0
        for i in range(lo, hi + 1):
            lid = f"{beat}_{i:03d}"
            st = total + round(acc * 30) / 30
            line_at[lid] = (st, st + timing[lid])
            acc += timing[lid]
        files.append((f, dur))
        total += dur

    def T(ref):
        if isinstance(ref, (int, float)):
            return float(ref)
        m = re.match(r"^([A-Za-z0-9_]+?)(?:@(start|end))?([+-][\d.]+)?$", ref)
        if not m:
            sys.exit(f"bad time ref {ref}")
        key, edge, off = m.group(1), m.group(2) or "start", float(m.group(3) or 0)
        if key == "END":
            base = total
        elif key in sec_start:
            base = sec_start[key]
        elif key in line_at:
            base = line_at[key][0 if edge == "start" else 1]
        else:
            sys.exit(f"unknown time ref {ref}")
        return max(0.0, min(total, base + off))

    # ---- voice: each section's audio, cut/padded to its exact video length, back to back ----
    voice = os.path.join(mix_dir, "voice.wav")
    parts = []
    for k, (f, dur) in enumerate(files):
        p = os.path.join(tmp, f"v{k:02d}.wav")
        n = round(dur * 48000)  # sample-exact: the AAC priming offset makes time-based trims come out ~60 ms short
        run(["ffmpeg", "-y", "-v", "error", "-i", f, "-vn", "-af", f"aresample=48000,asetpts=N/SR/TB,apad=whole_len={n},atrim=end_sample={n}", "-ac", "2", p])
        parts.append(p)
    lst = os.path.join(tmp, "voice.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c:a", "pcm_s16le", voice])

    # ---- gains: match every source file to its target loudness ----
    gain_cache = {}
    def gain(path, target):
        if path not in gain_cache:
            gain_cache[path] = loudness(path)[0]
        return target - gain_cache[path]

    xf = spec.get("crossfade", 1.5)

    def piece(src, t0, t1, target, seek=0.0, fade=xf, name="p"):
        """Render src from `seek`, looping, as a clip covering [t0 - fade/2, t1 + fade/2]; returns (wav, start)."""
        a = max(0.0, t0 - fade / 2)
        b = min(total, t1 + fade / 2)
        d = b - a
        if d <= 0.05:
            return None
        g = gain(src, target)
        out = os.path.join(tmp, f"{name}_{len(os.listdir(tmp)):03d}.wav")
        fi = min(fade, d / 2)
        flt = f"volume={g:.2f}dB,afade=t=in:d={fi:.2f},afade=t=out:st={d - fi:.3f}:d={fi:.2f}"
        run(["ffmpeg", "-y", "-v", "error", "-stream_loop", "-1", "-ss", f"{seek:.3f}", "-i", src, "-t", f"{d:.3f}",
             "-af", flt, "-ar", "48000", "-ac", "2", out])
        return out, a

    # ---- music: beds with overrides cut in; the bed keeps its own clock while muted ----
    music_parts = []
    ovs = sorted(((T(o["from"]), T(o["to"]), o) for o in spec.get("overrides", [])), key=lambda x: x[0])
    for bed in spec["beds"]:
        src = os.path.join(pub, bed["file"])
        blen = float(probe(src, "format=duration"))
        b0, b1 = T(bed["from"]), T(bed["to"])
        cur = b0
        for o0, o1, _ in ovs:
            if o1 <= cur or o0 >= b1:
                continue
            if o0 > cur:
                music_parts.append(piece(src, cur, o0, lv["bed"], seek=(cur - b0) % blen, name="bed"))
            cur = max(cur, o1)
        if cur < b1:
            music_parts.append(piece(src, cur, b1, lv["bed"], seek=(cur - b0) % blen, name="bed"))
    for o0, o1, o in ovs:
        music_parts.append(piece(os.path.join(pub, o["file"]), o0, o1, lv["override"], name="ov"))
    for a in spec.get("ambience", []):
        music_parts.append(piece(os.path.join(pub, a["file"]), T(a["from"]), T(a["to"]), a.get("lufs", lv["ambience"]), fade=a.get("fade", 2.0), name="amb"))
    music_parts = [p for p in music_parts if p]

    spot_parts = []
    for s in spec.get("spots", []):
        src = os.path.join(pub, s["file"])
        t = T(s["at"])
        g = gain(src, s.get("lufs", lv["spot"]))
        out = os.path.join(tmp, f"spot_{len(spot_parts):03d}.wav")
        run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={g:.2f}dB,afade=t=out:st={max(0, float(probe(src, 'format=duration')) - 0.15):.2f}:d=0.15",
             "-ar", "48000", "-ac", "2", out])
        spot_parts.append((out, t))

    def stem(parts, path, level=0):
        if not parts:
            run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i", f"anullsrc=r=48000:cl=stereo", "-t", f"{total:.3f}", path])
            return
        # mix in batches so the filter graph stays small
        batch, k = [], 0
        for i in range(0, len(parts), 24):
            chunk = parts[i:i + 24]
            cmd = ["ffmpeg", "-y", "-v", "error"]
            for p, _ in chunk:
                cmd += ["-i", p]
            fl = "".join(f"[{j}:a]adelay={int(t * 1000)}:all=1[d{j}];" for j, (_, t) in enumerate(chunk))
            fl += "".join(f"[d{j}]" for j in range(len(chunk))) + f"amix=inputs={len(chunk)}:normalize=0:duration=longest,apad,atrim=0:{total:.4f}[o]"
            out = os.path.join(tmp, f"stem_{os.path.basename(path)}_L{level}_{k}.wav")
            run(cmd + ["-filter_complex", fl, "-map", "[o]", "-c:a", "pcm_f32le", out])
            batch.append((out, 0.0)); k += 1
        if len(batch) == 1:
            os.replace(batch[0][0], path)
        else:
            stem(batch, path, level + 1)

    music = os.path.join(mix_dir, "music_raw.wav")
    sfx = os.path.join(mix_dir, "sfx.wav")
    stem(music_parts, music)
    stem(spot_parts, sfx)

    # ---- duck the music under the voice, sum, master ----
    dk = spec["duck"]
    ducked = os.path.join(mix_dir, "music_ducked.wav")
    run(["ffmpeg", "-y", "-v", "error", "-i", music, "-i", voice, "-filter_complex",
         f"[1:a]aformat=channel_layouts=stereo[k];[0:a][k]sidechaincompress=threshold={dk['threshold']}:ratio={dk['ratio']}:attack={dk['attack']}:release={dk['release']}:makeup=1,apad,atrim=0:{total:.4f}[o]",
         "-map", "[o]", "-c:a", "pcm_f32le", ducked])
    premix = os.path.join(mix_dir, "premix.wav")
    run(["ffmpeg", "-y", "-v", "error", "-i", voice, "-i", ducked, "-i", sfx, "-filter_complex",
         "[0:a][1:a][2:a]amix=inputs=3:normalize=0:duration=first[o]", "-map", "[o]", "-c:a", "pcm_f32le", premix])
    ms = spec["master"]
    err = run(["ffmpeg", "-nostats", "-i", premix, "-af", f"loudnorm=I={ms['I']}:TP={ms['TP']}:LRA=11:print_format=json", "-f", "null", "-"]).stderr
    m = json.loads(err[err.rindex("{"):err.rindex("}") + 1])
    norm = (f"loudnorm=I={ms['I']}:TP={ms['TP']}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
            f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    final_audio = os.path.join(mix_dir, "final.wav")
    run(["ffmpeg", "-y", "-v", "error", "-i", premix, "-af", f"{norm},aresample=48000", "-c:a", "pcm_s16le", final_audio])

    # ---- video: sections back to back (stream copy), new audio ----
    # Video only, as MPEG-TS: an .mp4's container duration includes its (slightly longer) audio, which would leave
    # gaps and drop frames at every join. TS segments join frame-exact.
    ts = []
    for k, (f, _) in enumerate(files):
        p = os.path.join(tmp, f"s{k:02d}.ts")
        run(["ffmpeg", "-y", "-v", "error", "-i", f, "-an", "-c:v", "copy", "-bsf:v", "h264_mp4toannexb", "-f", "mpegts", p])
        ts.append(p)
    vl = os.path.join(tmp, "video.txt")
    open(vl, "w").write("".join(f"file '{p}'\n" for p in ts))
    full = os.path.join(out_dir, f"{ep}_full.mp4")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", vl, "-i", final_audio, "-map", "0:v", "-map", "1:a",
         "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-t", f"{total:.3f}", full])
    want = sum(round(d * 30) for _, d in files)
    got = int(probe(full, "stream=nb_frames", "v:0"))
    if got != want:
        sys.exit(f"frame count after join is {got}, expected {want} — the sections did not join cleanly")

    shutil.rmtree(tmp, ignore_errors=True)

    # ---- report ----
    vI, _ = loudness(voice)
    mI, _ = loudness(ducked)
    mrI, _ = loudness(music)
    sI, _ = loudness(sfx)
    fI, fP = loudness(final_audio)
    print(f"sections {len(files)} · {total:.1f}s ({total / 60:.1f} min) · music pieces {len(music_parts)} · sfx {len(spot_parts)}")
    print(f"voice {vI:.1f} LUFS · music before duck {mrI:.1f} · music after duck {mI:.1f} ({vI - mI:.1f} dB under the voice) · sfx {sI:.1f}")
    print(f"final {fI:.1f} LUFS, peak {fP:.1f} dBFS → {full}")

if __name__ == "__main__":
    main()
