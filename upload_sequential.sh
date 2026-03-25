#!/bin/bash

# Talksy Sequential Upload Script
# This script commits and pushes each file individually with a 1-minute delay.

FILES=$(find . -type f -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/.next/*' | sed 's|^./||')

for FILE in $FILES; do
    echo "Processing $FILE..."
    git add "$FILE"
    git commit -m "Upload: $FILE"
    git push origin main
    echo "Wait 1 minute before next file..."
    sleep 60
done

echo "✅ All files uploaded sequentially."
