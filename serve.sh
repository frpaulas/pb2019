#!/bin/bash
# Simple HTTP server for the Prayer Book build
# Usage: ./serve.sh [port]

PORT=${1:-8080}

echo "Starting Prayer Book server on http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

cd build && python3 -m http.server $PORT
