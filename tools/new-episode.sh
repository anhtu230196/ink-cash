#!/usr/bin/env bash
# Tạo tập mới từ episodes/_template và đăng ký nó vào src/episodes.ts.
#   bash tools/new-episode.sh 02 nvidia-resign
# → episodes/ep02-nvidia-resign/ , public/ep02-nvidia-resign/audio/ , composition ids "ep02-…"
set -euo pipefail
source "$(dirname "$0")/_common.sh"
NUM="${1:?số tập, ví dụ 02}"; SLUG="${2:?slug, ví dụ nvidia-resign}"
ID="ep${NUM}-${SLUG}"; DIR="episodes/$ID"; PFX="ep${NUM}"; VAR="Ep${NUM}"
[ -e "$DIR" ] && { echo "đã có $DIR"; exit 1; }
cp -R episodes/_template "$DIR"
mkdir -p "public/$ID/audio"
find "$DIR" -type f \( -name '*.md' -o -name '*.ts' -o -name '*.tsx' \) -exec sed -i '' \
  -e "s/__ID__/$ID/g" -e "s/__PFX__/$PFX/g" -e "s/__SLUG__/$SLUG/g" -e "s/__DATE__/$(date +%Y-%m-%d)/g" {} +
mv "$DIR/script/__SLUG__.script.md" "$DIR/script/$SLUG.script.md"
python3 - "$ID" "$VAR" <<'PY'
import sys
ep, var = sys.argv[1], sys.argv[2]
p = "src/episodes.ts"; s = open(p).read()
s = s.replace("// @new-episode-import",
  f'import {{ Compositions as {var} }} from "../episodes/{ep}/src/compositions";\n'
  f'import {{ CAST as {var}Cast }} from "../episodes/{ep}/src/cast";\n// @new-episode-import')
s = s.replace("  // @new-episode-entry", f'  {{ id: "{ep}", Compositions: {var} }},\n  // @new-episode-entry')
s = s.replace("  // @new-episode-cast", f'  "{ep}": {var}Cast,\n  // @new-episode-cast')
open(p, "w").write(s)
PY
echo "Tạo xong $DIR — mở $DIR/README.md"
