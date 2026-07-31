#!/usr/bin/env node
// Package: zip each seed's full raw ArchiveBox snapshot folders (WARC, wget
// mirror, screenshots, etc.) for manual upload as a GitHub Release asset.
// Run AFTER export.mjs. Produces conference-archive-tools/build/<folder>-raw.zip
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseSeedsCsv } from "./lib/seeds.mjs";
import { SEEDS_CSV, COLLECTION_DIR, BUILD_DIR, ensureDirs, matchesSeed, filterSeeds } from "./lib/paths.mjs";

ensureDirs();

const seeds = filterSeeds(parseSeedsCsv(SEEDS_CSV));
const allSnapshots = querySnapshots();

for (const seed of seeds) {
  const matches = allSnapshots.filter((s) => matchesSeed(seed.url, s.url));
  const snapshotDirs = matches.map((s) => findSnapshotDir(s.id)).filter(Boolean);

  if (snapshotDirs.length === 0) {
    console.log(`[${seed.folder}] no snapshots to package, skipping`);
    continue;
  }

  const zipPath = path.join(BUILD_DIR, `${seed.folder}-raw.zip`);
  fs.rmSync(zipPath, { force: true });

  // zip each snapshot dir in relative to the collection root so paths inside
  // the archive stay meaningful (archive/users/system/snapshots/.../<id>/...).
  for (const dir of snapshotDirs) {
    const relDir = path.relative(COLLECTION_DIR, dir);
    execFileSync("zip", ["-rq", zipPath, relDir], { cwd: COLLECTION_DIR, stdio: "inherit" });
  }
  console.log(`[${seed.folder}] packaged ${snapshotDirs.length} snapshot(s) -> ${zipPath}`);
}

function querySnapshots() {
  const dbPath = path.join(COLLECTION_DIR, "index.sqlite3");
  const json = execFileSync("sqlite3", ["-json", dbPath, "SELECT id, url FROM core_snapshot;"], {
    encoding: "utf8",
  });
  return json.trim() ? JSON.parse(json) : [];
}

function findSnapshotDir(snapshotId) {
  const snapshotsRoot = path.join(COLLECTION_DIR, "archive", "users", "system", "snapshots");
  const found = execFileSync("find", [snapshotsRoot, "-type", "d", "-name", snapshotId], {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);
  return found[0] ?? null;
}
