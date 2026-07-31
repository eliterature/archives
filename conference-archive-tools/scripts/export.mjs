#!/usr/bin/env node
// Export: copy each seed's captured SingleFile snapshots into its
// ELO-{year}-Web-Archive/pages/ folder as the committed "cached page", plus a
// metadata.json manifest (url, title, capture id) for the search-index build.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseSeedsCsv } from "./lib/seeds.mjs";
import { SEEDS_CSV, COLLECTION_DIR, REPO_ROOT, ensureDirs, matchesSeed, filterSeeds } from "./lib/paths.mjs";

ensureDirs();

const seeds = filterSeeds(parseSeedsCsv(SEEDS_CSV));
const allSnapshots = querySnapshots();

for (const seed of seeds) {
  const matches = dedupeByUrl(allSnapshots.filter((s) => matchesSeed(seed.url, s.url)));

  const pagesDir = path.join(REPO_ROOT, seed.folder, "pages");
  fs.mkdirSync(pagesDir, { recursive: true });

  const manifest = [];
  for (const snap of matches) {
    const snapshotDir = findSnapshotDir(snap.id);
    if (!snapshotDir) continue;

    const cachedSource = pickCachedSource(snapshotDir);
    if (!cachedSource) {
      console.warn(`[${seed.folder}] no cached HTML found for ${snap.url} (${snap.id}), skipping`);
      continue;
    }

    const slug = slugify(snap.url);
    const pageDir = path.join(pagesDir, slug);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.copyFileSync(cachedSource, path.join(pageDir, "cached.html"));

    const textSource = pickCleanTextSource(snapshotDir);
    let hasText = false;
    if (textSource) {
      fs.copyFileSync(textSource, path.join(pageDir, "content.txt"));
      hasText = true;
    }

    manifest.push({
      url: snap.url,
      title: snap.title || snap.url,
      archiveboxId: snap.id,
      page: `pages/${slug}/cached.html`,
      ...(hasText ? { text: `pages/${slug}/content.txt` } : {}),
    });
    console.log(`[${seed.folder}] exported ${snap.url} -> pages/${slug}/cached.html`);
  }

  if (manifest.length > 0) {
    fs.writeFileSync(
      path.join(REPO_ROOT, seed.folder, "metadata.json"),
      JSON.stringify(manifest, null, 2)
    );
  }
}

function querySnapshots() {
  const dbPath = path.join(COLLECTION_DIR, "index.sqlite3");
  const json = execFileSync(
    "sqlite3",
    ["-json", dbPath, "SELECT id, url, title FROM core_snapshot;"],
    { encoding: "utf8" }
  );
  return json.trim() ? JSON.parse(json) : [];
}

function dedupeByUrl(snapshots) {
  const seen = new Map();
  for (const s of snapshots) {
    const key = normalizeUrl(s.url);
    if (!seen.has(key)) seen.set(key, s);
  }
  return [...seen.values()];
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    // Treat http/https as equivalent so the same page isn't exported twice
    // just because it was captured under both schemes.
    return `${u.hostname}${u.pathname}${u.search}`.replace(/\/$/, "");
  } catch {
    return url;
  }
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

// Prefer SingleFile (post-JS rendered, self-contained) for visual/text fidelity;
// fall back to other extractors if SingleFile didn't succeed for this page.
function pickCachedSource(snapshotDir) {
  const candidates = [
    "singlefile/singlefile.html",
    "dom/output.html",
    "mercury/content.html",
    "defuddle/content.html",
  ];
  for (const rel of candidates) {
    const full = path.join(snapshotDir, rel);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

// Clean, extracted plain-text article content (no nav/markup soup) — used by
// conference-archive-search for search indexing instead of the raw SingleFile
// HTML, which is unreliable to safely re-parse/annotate.
function pickCleanTextSource(snapshotDir) {
  const candidates = [
    "defuddle/content.txt",
    "trafilatura/content.txt",
    "readability/content.txt",
    "mercury/content.txt",
  ];
  for (const rel of candidates) {
    const full = path.join(snapshotDir, rel);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function slugify(url) {
  const u = new URL(url);
  const raw = (u.pathname + u.search).replace(/^\/|\/$/g, "");
  const slug = (raw || "index")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "index";
}
