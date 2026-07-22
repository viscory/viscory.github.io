#!/bin/sh
# Validates the built output
errors=0
check() { if [ "$1" -eq 0 ]; then echo "  ✓ $2"; else echo "  ✗ $2"; errors=$((errors+1)); fi; }

echo "Validating...\n"

# Files exist
[ -f public/main.js ]; check $? "public/main.js exists"
[ -f public/index.html ]; check $? "public/index.html exists"
[ -f assets/headshot.jpg ]; check $? "assets/headshot.jpg exists"

# Sections in HTML
for id in hero about experience skills projects education; do
  grep -q "id=\"$id\"" public/index.html; check $? "Section #$id found"
done

echo "\n$errors failures"
exit $errors
