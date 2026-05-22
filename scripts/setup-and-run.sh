#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Installing dependencies..."
npm install

echo "Starting backend and frontend..."
npm run dev
