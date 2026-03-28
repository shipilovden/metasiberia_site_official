#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
OUTPUT_DIR=".deploy"
ARCHIVE_PATH="$OUTPUT_DIR/metasiberia-reg-ru-$TIMESTAMP.tar.gz"

mkdir -p "$OUTPUT_DIR"

tar \
  --exclude='.git' \
  --exclude='.secrets' \
  --exclude='.deploy' \
  --exclude='node_modules' \
  -czf "$ARCHIVE_PATH" \
  404.html \
  api \
  css \
  files \
  images \
  js \
  page62281087.html \
  page62442585.html \
  page63809043.html \
  page63810393.html \
  page63811825.html \
  page63813121.html \
  page64026745.html \
  page64026811.html \
  page64027043.html \
  page64103135.html \
  robots.txt \
  sitemap.xml \
  htaccess \
  readme.txt

echo "Archive created: $ARCHIVE_PATH"
echo "Production deploy target: REG.RU"
echo "This project deploys only to REG.RU."
