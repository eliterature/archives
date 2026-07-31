#!/usr/bin/env node
// Pass 2 prep: for each seed, look at same-domain outlinks discovered on its
// pass-1 pages (via each snapshot's parse_dom_outlinks/urls.jsonl) that were
// NOT already captured, and write a capped list per seed for a follow-up
// single-page (`archivebox add`, no crawl) capture pass.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseSeedsCsv } from "./lib/seeds.mjs";
import { SEEDS_CSV, COLLECTION_DIR, BUILD_DIR, ensureDirs, domainOf, matchesSeed, filterSeeds } from "./lib/paths.mjs";

const MAX_NEW_PAGES_PER_SITE = Number(process.env.MAX_NEW_PAGES_PER_SITE ?? 20);

ensureDirs();

const seeds = filterSeeds(parseSeedsCsv(SEEDS_CSV).filter((s) => s.type === "site"));
const allSnapshots = querySnapshots();

const pass2 = {};

for (const seed of seeds) {
  const seedSnapshots = allSnapshots.filter((s) => matchesSeed(seed.url, s.url));
  const alreadyCaptured = new Set(seedSnapshots.map((s) => normalizeUrl(s.url)));

  const discovered = new Map();
  for (const snap of seedSnapshots) {
    const outlinksPath = findSnapshotFile(snap.id, "parse_dom_outlinks/urls.jsonl");
    if (!outlinksPath) continue;
    for (const line of fs.readFileSync(outlinksPath, "utf8").split("\n")) {
      if (!line.trim()) continue;
      let entry;
      try {
        entry = JSON.parse(line);
      } catch {
        continue;
      }
      if (!entry.url || !matchesSeed(seed.url, entry.url)) continue;
      const normalized = normalizeUrl(entry.url);
      if (alreadyCaptured.has(normalized) || discovered.has(normalized)) continue;
      discovered.set(normalized, entry.url);
    }
  }

  const capped = [...discovered.values()].slice(0, MAX_NEW_PAGES_PER_SITE);
  if (capped.length > 0) {
    pass2[seed.folder] = capped;
    console.log(`[${seed.folder}] ${capped.length} new same-domain page(s) queued for pass 2`);
  }
}

const outPath = path.join(BUILD_DIR, "pass2-urls.json");
fs.writeFileSync(outPath, JSON.stringify(pass2, null, 2));
console.log(`\nWrote ${outPath}`);

function querySnapshots() {
  const dbPath = path.join(COLLECTION_DIR, "index.sqlite3");
  const json = execFileSync("sqlite3", ["-json", dbPath, "SELECT id, url FROM core_snapshot;"], {
    encoding: "utf8",
  });
  return json.trim() ? JSON.parse(json) : [];
}

function findSnapshotFile(snapshotId, relativePath) {
  const snapshotsRoot = path.join(COLLECTION_DIR, "archive", "users", "system", "snapshots");
  const found = execFileSync(
    "find",
    [snapshotsRoot, "-type", "d", "-name", snapshotId],
    { encoding: "utf8" }
  )
    .trim()
    .split("\n")
    .filter(Boolean);
  if (found.length === 0) return null;
  const candidate = path.join(found[0], relativePath);
  return fs.existsSync(candidate) ? candidate : null;
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    // Treat http/https as equivalent so a page already captured under one
    // scheme isn't re-queued just because it was linked with the other.
    return `${u.hostname}${u.pathname}${u.search}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}
