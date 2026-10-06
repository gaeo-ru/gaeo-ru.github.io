#!/usr/bin/env bash
set -euo pipefail
queue=.github/indexnow-pending.json
if [ -z "$(git status --porcelain -- "$queue")" ]; then
  echo "IndexNow queue is unchanged."
  exit 0
fi
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A -- "$queue"
git commit -m "Persist pending IndexNow URLs [skip ci]"
git pull --rebase origin main
git push origin HEAD:main
