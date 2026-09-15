#!/usr/bin/env bash
# Renders /og-card into public/brand/og.png at 1200x630.
# Requires a Chromium binary; set CHROME to override the default lookup.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-$HOME/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing}"
[ -x "$CHROME" ] || { echo "no chromium at: $CHROME (set CHROME=)"; exit 1; }

npm run build >/dev/null
python3 -m http.server 4399 --directory dist >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 1

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-color-profile=srgb --window-size=1200,630 \
  --screenshot=public/brand/og.png \
  "http://127.0.0.1:4399/og-card/" >/dev/null 2>&1

echo "wrote public/brand/og.png"
