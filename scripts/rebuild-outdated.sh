#!/usr/bin/env bash
# Check DPB files against JSON files and rebuild if JSON is older
# Also validate that all canticles are registered in ServiceRenderer

set -e

SERVICES_DIR="$(dirname "$0")/../src/lib/data/services"
DPB_DIR="$SERVICES_DIR/dpb"
REBUILD_NEEDED=false

echo "🔍 Checking canticle registration..."
"$(dirname "$0")/check-canticles.sh"

echo ""
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
    echo "✅ Service files updated!"
else
    echo "✅ All service JSON files are up to date!"
fi

# Check canticles
echo ""
echo "🔍 Checking for outdated canticles.json..."

CANTICLES_DIR="$(dirname "$0")/../src/lib/data/canticles"
CANTICLES_DPB_DIR="$CANTICLES_DIR/dpb"
CANTICLES_JSON="$CANTICLES_DIR/canticles.json"
CANTICLES_REBUILD_NEEDED=false

if [ ! -f "$CANTICLES_JSON" ]; then
    echo "⚠️  Missing canticles.json"
    CANTICLES_REBUILD_NEEDED=true
else
    for dpb_file in "$CANTICLES_DPB_DIR"/*.dpb; do
        if [ ! -f "$dpb_file" ]; then
            continue
        fi
        if [ "$dpb_file" -nt "$CANTICLES_JSON" ]; then
            basename=$(basename "$dpb_file" .dpb)
            echo "📝 Outdated: canticles.json ($basename.dpb is newer)"
            CANTICLES_REBUILD_NEEDED=true
            break
        fi
    done
fi

if [ "$CANTICLES_REBUILD_NEEDED" = true ]; then
    echo ""
    echo "🔨 Rebuilding canticles.json..."
    node "$(dirname "$0")/build-canticles-json.cjs"
    echo "✅ Canticles updated!"
else
    echo "✅ canticles.json is up to date!"
fi

# Check collects
echo ""
echo "🔍 Checking for outdated collects.json..."

COLLECTS_DIR="$(dirname "$0")/../src/lib/data/collects"
COLLECTS_DPB_DIR="$COLLECTS_DIR/dpb"
COLLECTS_JSON="$COLLECTS_DIR/collects.json"
COLLECTS_REBUILD_NEEDED=false

if [ ! -f "$COLLECTS_JSON" ]; then
    echo "⚠️  Missing collects.json"
    COLLECTS_REBUILD_NEEDED=true
else
    for dpb_file in "$COLLECTS_DPB_DIR"/*.dpb; do
        if [ ! -f "$dpb_file" ]; then
            continue
        fi
        if [ "$dpb_file" -nt "$COLLECTS_JSON" ]; then
            basename=$(basename "$dpb_file" .dpb)
            echo "📝 Outdated: collects.json ($basename.dpb is newer)"
            COLLECTS_REBUILD_NEEDED=true
            break
        fi
    done
fi

if [ "$COLLECTS_REBUILD_NEEDED" = true ]; then
    echo ""
    echo "🔨 Rebuilding collects.json..."
    node "$(dirname "$0")/build-collects-json.cjs"
    echo "✅ Collects updated!"
else
    echo "✅ collects.json is up to date!"
fi

# Check opening sentences
echo ""
echo "🔍 Checking for outdated opening_sentences.json..."

SENTENCES_DIR="$(dirname "$0")/../src/lib/data/opening_sentences"
SENTENCES_DPB_DIR="$SENTENCES_DIR/dpb"
SENTENCES_JSON="$SENTENCES_DIR/opening_sentences.json"
SENTENCES_REBUILD_NEEDED=false

if [ ! -f "$SENTENCES_JSON" ]; then
    echo "⚠️  Missing opening_sentences.json"
    SENTENCES_REBUILD_NEEDED=true
else
    for dpb_file in "$SENTENCES_DPB_DIR"/*.dpb; do
        if [ ! -f "$dpb_file" ]; then
            continue
        fi
        if [ "$dpb_file" -nt "$SENTENCES_JSON" ]; then
            basename=$(basename "$dpb_file" .dpb)
            echo "📝 Outdated: opening_sentences.json ($basename.dpb is newer)"
            SENTENCES_REBUILD_NEEDED=true
            break
        fi
    done
fi

if [ "$SENTENCES_REBUILD_NEEDED" = true ]; then
    echo ""
    echo "🔨 Rebuilding opening_sentences.json..."
    node "$(dirname "$0")/build-opening-sentences-json.cjs"
    echo "✅ Opening sentences updated!"
else
    echo "✅ opening_sentences.json is up to date!"
fi
