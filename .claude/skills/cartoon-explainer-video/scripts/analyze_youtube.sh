#!/usr/bin/env bash
# Tải và đo một video YouTube làm mẫu tham khảo.
# Dùng: analyze_youtube.sh <youtube-url> <output-dir> [whisper-model]
# Kết quả: meta.txt, video.mp4, audio.wav, transcript/, frames/, sheet_*.jpg, cuts.txt, stats.txt
set -euo pipefail
URL="$1"; OUT="$2"; MODEL="${3:-small}"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:$PATH"
mkdir -p "$OUT" && cd "$OUT"

yt-dlp --skip-download --print "%(title)s|%(channel)s|%(duration)s|%(view_count)s|%(upload_date)s" "$URL" > meta.txt
yt-dlp --skip-download --print "%(description)s" "$URL" > description.txt
yt-dlp -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720]" --merge-output-format mp4 -o video.mp4 "$URL"
ffmpeg -loglevel error -y -i video.mp4 -vn -ac 1 -ar 16000 audio.wav

# Khung hình mỗi 15 s + lưới 4x3 để xem nhanh
mkdir -p frames
ffmpeg -loglevel error -y -i video.mp4 -vf "fps=1/15,scale=640:-1" frames/f_%03d.jpg
ffmpeg -loglevel error -y -pattern_type glob -i 'frames/f_*.jpg' -vf "scale=480:-1,tile=4x3" sheet_%d.jpg

# Nhịp dựng
ffmpeg -i video.mp4 -vf "select='gt(scene,0.3)',showinfo" -an -f null - 2>&1 \
  | grep -o "pts_time:[0-9.]*" | cut -d: -f2 > cuts.txt
DUR=$(cut -d'|' -f3 meta.txt)
BLACK=$(ffmpeg -i video.mp4 -vf "blackdetect=d=0.5:pix_th=0.05" -an -f null - 2>&1 | grep -c black_start || true)
LUFS=$(ffmpeg -i audio.wav -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness" | grep -o "\-*[0-9.]* LUFS" | tail -1)
{
  echo "duration_s: $DUR"
  echo "cuts: $(wc -l < cuts.txt)  avg_shot_s: $(awk -v d="$DUR" 'END{printf "%.2f", d/(NR+1)}' cuts.txt)"
  echo "black_cards: $BLACK"
  echo "loudness: $LUFS"
  echo "cuts_per_minute:"; awk '{c[int($1/60)]++} END{for(m in c) printf "  min %d: %d\n", m, c[m]}' cuts.txt | sort -t' ' -k2 -n
} > stats.txt

# Lời đọc
whisper audio.wav --model "$MODEL" --output_format all --output_dir transcript --fp16 False > whisper.log 2>&1
echo "words: $(wc -w < transcript/audio.txt)  wpm: $(awk -v d="$DUR" '{w+=NF} END{printf "%.0f", w/(d/60)}' transcript/audio.txt)" >> stats.txt
cat stats.txt
