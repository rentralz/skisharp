#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

for candidate in /opt/homebrew/bin/python3.14 /opt/homebrew/bin/python3 python3; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" - <<'PY' >/dev/null 2>&1
import importlib.util
import sys
sys.exit(0 if importlib.util.find_spec("googleapiclient") else 1)
PY
  then
    exec "$candidate" scripts/gsc-report.py
  fi
done

echo "ERROR: No python interpreter with google-api-python-client found." >&2
echo "Install the dependency for a usable Python, then rerun this script." >&2
exit 1
