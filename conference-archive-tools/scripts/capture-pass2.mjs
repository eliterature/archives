#!/usr/bin/env node
// Pass 2: capture the same-domain pages discovered by discover-links.mjs, one
// page at a time (no further recursive crawling), to reach a second hop depth.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { COLLECTION_DIR, BUILD_DIR, ensureDirs } from "./lib/paths.mjs";

ensureDirs();

const pass2Path = path.join(BUILD_DIR, "pass2-urls.json");
if (!fs.existsSync(pass2Path)) {
  console.error(`Missing ${pass2Path} — run discover-links.mjs first.`);
  process.exit(1);
}

const pass2 = JSON.parse(fs.readFileSync(pass2Path, "utf8"));

for (const [folder, urls] of Object.entries(pass2)) {
  for (const url of urls) {
    console.log(`\n==> [${folder}] pass 2: ${url}`);
    try {
      execFileSync("archivebox", ["add", url], { cwd: COLLECTION_DIR, stdio: "inherit" });
    } catch (err) {
      console.error(`    !! failed to capture ${url}: ${err.message}`);
    }
  }
}
