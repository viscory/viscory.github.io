#!/bin/sh
errors=0
check() { if [ "$1" -eq 0 ]; then echo "  ✓ $2"; else echo "  ✗ $2"; errors=$((errors+1)); fi; }
echo "Validating dist/...\n"
[ -f dist/index.html ]; check $? "dist/index.html exists"
[ -f dist/main.js ]; check $? "dist/main.js exists"
[ -f dist/assets/headshot.jpg ]; check $? "dist/assets/headshot.jpg exists"
[ -f dist/assets/school-logo-1x.png ]; check $? "dist/assets/school-logo-1x.png exists"
[ -f dist/assets/unnamed.png ]; check $? "dist/assets/unnamed.png exists"
[ -f dist/.nojekyll ]; check $? "dist/.nojekyll exists"
for id in hero about experience skills projects education; do
  grep -q "id=\"$id\"" dist/index.html; check $? "Section #$id found"
done
echo "\n$errors failures"
exit $errors
