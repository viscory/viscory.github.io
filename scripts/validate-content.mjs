#!/usr/bin/env node
// Validates that experience .md files match expected bullet counts from RESUME.md
// Usage: node scripts/validate-content.mjs

import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const expDir = join(repoRoot, "src", "content", "experience");

// Expected bullet counts per company (from RESUME.md)
const EXPECTED = {
  "premialab.md": 8,
  "kmon.md": 6,
  "reap.md": 2,
  "bnp.md": 4,
  "kmon-old.md": null, // skip if exists
};

let errors = 0;

for (const [file, expected] of Object.entries(EXPECTED)) {
  if (expected === null) continue;
  const path = join(expDir, file);
  const content = readFileSync(path, "utf-8");
  const bullets = content
    .split("\n")
    .filter((l) => l.trim().startsWith("- "))
    .filter((l) => !l.trim().startsWith("---")); // exclude frontmatter
  if (bullets.length !== expected) {
    console.error(
      `  ✗ ${file}: expected ${expected} bullets, got ${bullets.length}`,
    );
    errors++;
  } else {
    console.log(`  ✓ ${file}: ${bullets.length} bullets`);
  }
}

if (errors) {
  console.error(`\n❌ ${errors} file(s) have wrong bullet counts`);
  process.exit(1);
} else {
  console.log("\n✅ All content files match expected bullet counts");
}
