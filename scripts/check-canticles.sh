#!/usr/bin/env bash
# Check that all canticle files have entries in ServiceRenderer.svelte's canticleMap

set -e

CANTICLE_DIR="$(dirname "$0")/../src/lib/canticle"
SERVICE_RENDERER="$(dirname "$0")/../src/lib/components/ServiceRenderer.svelte"

echo "🔍 Checking canticle coverage in ServiceRenderer..."

# Get all canticle files (excluding index files)
canticle_files=$(ls "$CANTICLE_DIR"/*.svelte 2>/dev/null | xargs -n1 basename | sed 's/\.svelte$//' | sort)

# Extract canticle map keys from ServiceRenderer.svelte
# This looks for lines like "canticle_name: CanticleComponent," in the canticleMap
map_keys=$(grep -A 100 "const canticleMap = {" "$SERVICE_RENDERER" | grep -B 100 "};" | grep -E "^\s+[a-z_]+:" | sed -E 's/^\s+([a-z_]+):.*/\1/' | sort | uniq)

missing_canticles=()
missing_count=0

echo ""
echo "📋 Canticle files found: $(echo "$canticle_files" | wc -l)"

# Check each canticle file
for canticle in $canticle_files; do
    # Check if this canticle is in the map
    if ! echo "$map_keys" | grep -q "^${canticle}$"; then
        echo "⚠️  Missing from canticleMap: $canticle"
        missing_canticles+=("$canticle")
        ((missing_count++))
    fi
done

echo ""

if [ $missing_count -eq 0 ]; then
    echo "✅ All canticles are registered in ServiceRenderer!"
    exit 0
else
    echo "❌ Found $missing_count missing canticle(s)"
    echo ""
    echo "To fix, add these imports to ServiceRenderer.svelte:"
    for canticle in "${missing_canticles[@]}"; do
        # Convert snake_case to PascalCase for component name
        component_name=$(echo "$canticle" | sed -r 's/(^|_)([a-z])/\U\2/g')
        echo "  import $component_name from '\$lib/canticle/${canticle}.svelte';"
    done
    echo ""
    echo "And add these entries to the canticleMap object:"
    for canticle in "${missing_canticles[@]}"; do
        component_name=$(echo "$canticle" | sed -r 's/(^|_)([a-z])/\U\2/g')
        echo "  $canticle: $component_name,"
    done
    exit 1
fi
