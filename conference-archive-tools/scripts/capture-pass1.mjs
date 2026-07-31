#!/usr/bin/env node
// Pass 1: capture each seed's landing page (or the bare PDF), one hop deep for sites.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseSeedsCsv } from "./lib/seeds.mjs";
import { SEEDS_CSV, COLLECTION_DIR, ensureDirs, filterSeeds } from "./lib/paths.mjs";

ensureDirs();

if (!fs.existsSync(path.join(COLLECTION_DIR, "ArchiveBox.conf"))) {
  console.log(`Initializing ArchiveBox collection at ${COLLECTION_DIR}`);
  execFileSync("archivebox", ["init"], { cwd: COLLECTION_DIR, stdio: "inherit" });
}

const seeds = filterSeeds(parseSeedsCsv(SEEDS_CSV));

for (const seed of seeds) {
  const depthArgs = seed.type === "site" ? ["--depth=1"] : [];
  console.log(`\n==> [${seed.folder}] pass 1 (${seed.type}): ${seed.url}`);
  execFileSync("archivebox", ["add", ...depthArgs, seed.url], {
    cwd: COLLECTION_DIR,
    stdio: "inherit",
  });
}
