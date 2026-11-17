#!/usr/bin/env bash
# Sinh giọng tạm bằng macOS `say` cho một tập.
# Dùng: make_voice.sh episodes/epNN-slug [tốc độ từ/phút, mặc định 185]   (chạy từ gốc dự án)
# Đọc   episodes/epNN-slug/lines.tsv   (id <TAB> tên giọng <TAB> câu)
# Ghi   public/epNN-slug/audio/<id>.wav  và  episodes/epNN-slug/src/timing.json  (id → giây)
set -euo pipefail
EP_DIR="${1%/}"; RATE="${2:-185}"
EP="$(basename "$EP_DIR")"; ROOT="$(cd "$EP_DIR/../.." && pwd)"
AUDIO="$ROOT/public/$EP/audio"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$AUDIO" "$EP_DIR/src"
JSON="$EP_DIR/src/timing.json"
echo '{' > "$JSON"
first=1
while IFS=$'\t' read -r id voice text || [ -n "${id:-}" ]; do
  [ -z "${id:-}" ] && continue
  case "$id" in \#*) continue;; esac
  text="$(printf '%s' "$text" | sed -E 's/\[[^]]*\]//g; s/  +/ /g; s/^ //')"   # bỏ thẻ giọng ElevenLabs như [sarcastic]
  say -v "$voice" -r "$RATE" -o "$TMP/$id.aiff" "$text"
  ffmpeg -loglevel error -y -i "$TMP/$id.aiff" -ar 48000 -af "apad=pad_dur=0.05" "$AUDIO/$id.wav"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO/$id.wav")
  [ $first = 1 ] || echo ',' >> "$JSON"; first=0
  printf '"%s": %s' "$id" "$dur" >> "$JSON"
  printf '%-6s %6.2fs  %s\n' "$id" "$dur" "$text"
done < "$EP_DIR/lines.tsv"
echo '}' >> "$JSON"
