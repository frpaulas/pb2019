#!/usr/bin/env bash
# Check DPB files against JSON files and rebuild if JSON is older

set -e

SERVICES_DIR="$(dirname "$0")/../src/lib/data/services"
DPB_DIR="$SERVICES_DIR/dpb"
REBUILD_NEEDED=false

echo "🔍 Checking for outdated JSON files..."

# Check each DPB file
for dpb_file in "$DPB_DIR"/*.dpb; do
    if [ ! -f "$dpb_file" ]; then
        continue
    fi

    # Get the base name without extension
    basename=$(basename "$dpb_file" .dpb)
    json_file="$SERVICES_DIR/${basename}.json"

    # Check if JSON exists
    if [ ! -f "$json_file" ]; then
        echo "⚠️  Missing JSON for: $basename.dpb"
        REBUILD_NEEDED=true
        continue
    fi

    # Compare modification times
    if [ "$dpb_file" -nt "$json_file" ]; then
        echo "📝 Outdated: $basename.json (DPB is newer)"
        REBUILD_NEEDED=true
    fi
done

if [ "$REBUILD_NEEDED" = true ]; then
    echo ""
    echo "🔨 Running conversion script..."
    node "$(dirname "$0")/convert-raw-to-json.cjs" "$DPB_DIR/"

    echo ""
    echo "📖 Rebuilding service_pages.json..."
    node "$(dirname "$0")/build-service-pages.cjs"

    echo ""
    echo "✅ All files updated!"
else
    echo "✅ All JSON files are up to date!"
fi
