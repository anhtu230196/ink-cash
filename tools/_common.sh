# Sourced by the other tools. Moves to the project root and sets up the Chrome workaround.
cd "$(dirname "${BASH_SOURCE[0]}")/.."
# Chrome headless của Remotion bị treo trên máy này (13/11/2026) → dùng Google Chrome cài sẵn nếu có.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BROWSER=(); [ -x "$CHROME" ] && BROWSER=(--browser-executable="$CHROME")
BUILD=.cache/build
bundle() { npx remotion bundle src/index.ts --out-dir="$BUILD" --log=error >/dev/null; }
