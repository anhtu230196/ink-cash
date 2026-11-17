#!/usr/bin/env bash
# Mỗi nhân vật của một tập một ảnh PNG + một ảnh ghép.
#   bash tools/render-sheets.sh ep01-megaspeed            (cả dàn)
#   bash tools/render-sheets.sh ep01-megaspeed jensen alice
set -euo pipefail
source "$(dirname "$0")/_common.sh"
EP="${1:?episode folder, e.g. ep01-megaspeed}"; shift
CAST_FILE="episodes/$EP/src/cast.ts"; OUT="episodes/$EP/out/characters"
ALL=($(grep -o 'id: "[a-z0-9]*"' "$CAST_FILE" | cut -d'"' -f2))
IDS=("$@"); [ ${#IDS[@]} -eq 0 ] && IDS=("${ALL[@]}")
bundle
mkdir -p "$OUT"
for id in "${IDS[@]}"; do
  npx remotion still "$BUILD" CharacterSheets "$OUT/$id.png" --props="{\"episode\":\"$EP\",\"id\":\"$id\"}" --port=3917 --log=error "${BROWSER[@]}"
done
N=${#ALL[@]}; COLS=3; ROWS=$(( (N + COLS - 1) / COLS ))
LAYOUT=$(for i in $(seq 0 $((N-1))); do printf '%d_%d|' $(( (i % COLS) * 640 )) $(( (i / COLS) * 360 )); done); LAYOUT=${LAYOUT%|}
ffmpeg -loglevel error -y $(for id in "${ALL[@]}"; do printf -- '-i %s/%s.png ' "$OUT" "$id"; done) \
  -filter_complex "$(for i in $(seq 0 $((N-1))); do printf '[%d]scale=640:-1[s%d];' "$i" "$i"; done)$(for i in $(seq 0 $((N-1))); do printf '[s%d]' "$i"; done)xstack=inputs=$N:layout=$LAYOUT:fill=white" \
  "$OUT/_all.jpg"
echo "done: ${#IDS[@]} sheets → $OUT"
