#!/usr/bin/env bash
# Render một composition vào thư mục out/ của tập đó.
#   bash tools/render.sh ep01-megaspeed ep01-Intro            → episodes/ep01-megaspeed/out/ep01-Intro.mp4
#   bash tools/render.sh ep01-megaspeed ep01-Thumb --still     → .png (khung đầu)
# Composition không thuộc tập nào (Avatar, Banner, LookDev…): dùng "channel" hoặc "lab" làm tên thư mục.
set -euo pipefail
source "$(dirname "$0")/_common.sh"
EP="${1:?episode folder, e.g. ep01-megaspeed}"; COMP="${2:?composition id}"; shift 2
case "$EP" in channel) OUT=channel/art ;; lab) OUT=lab/out ;; *) OUT="episodes/$EP/out" ;; esac
mkdir -p "$OUT"
bundle
if [ "${1:-}" = "--still" ]; then shift
  npx remotion still "$BUILD" "$COMP" "$OUT/$COMP.png" --port=3917 --log=error "${BROWSER[@]}" "$@"
else
  npx remotion render "$BUILD" "$COMP" "$OUT/$COMP.mp4" --port=3917 "${BROWSER[@]}" "$@"
fi
echo "→ $OUT/$COMP"
