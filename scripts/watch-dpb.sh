#!/bin/bash
# Watch for DPB file changes and rebuild

DPB_DIR="src/lib/data/services/dpb"

echo "Watching $DPB_DIR for changes..."
echo "Press Ctrl+C to stop"

while true; do
  inotifywait -q -e modify,create "$DPB_DIR"/*.dpb
  echo ""
  echo "=== DPB change detected, rebuilding... ==="

  # Kill vite dev server
  pkill -f "vite" 2>/dev/null

  # Rebuild
  npm run rebuild:check

  echo "=== Restarting dev server... ==="
  npm run dev &

  # Small delay to let things settle
  sleep 1
done
