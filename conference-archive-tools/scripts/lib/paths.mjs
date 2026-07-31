import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

/** Shared paths/env used by all capture-pipeline scripts. */
// This file lives in <tools>/scripts/lib/, so go up two levels for <tools>.
export const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const TOOLS_DIR = path.resolve(SCRIPT_DIR, "..", "..");
export const REPO_ROOT = path.resolve(TOOLS_DIR, "..");
export const SEEDS_CSV = path.join(TOOLS_DIR, "seeds.csv");
export const COLLECTION_DIR =
  process.env.ARCHIVEBOX_COLLECTION_DIR ?? path.join(REPO_ROOT, "archivebox-collection");
export const BUILD_DIR = path.join(TOOLS_DIR, "build");

export function ensureDirs() {
  const uvCache = process.env.UV_CACHE_DIR ?? path.join(process.env.TMPDIR ?? "/tmp", "uv-cache");
  process.env.UV_CACHE_DIR = uvCache;
  fs.mkdirSync(uvCache, { recursive: true });
  fs.mkdirSync(COLLECTION_DIR, { recursive: true });
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

export function domainOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Several seeds share a hostname (e.g. dtc-wsuv.org hosts both the 2008 and
// 2016 sites; conference.eliterature.org hosts the 2013/2014/2017 archives),
// so "same site" must be scoped to hostname + the seed's own path prefix, not
// hostname alone.
export function scopePrefix(url) {
  const { pathname } = new URL(url);
  return pathname.endsWith("/") ? pathname : pathname.slice(0, pathname.lastIndexOf("/") + 1);
}

export function matchesSeed(seedUrl, candidateUrl) {
  let seed, candidate;
  try {
    seed = new URL(seedUrl);
    candidate = new URL(candidateUrl);
  } catch {
    return false;
  }
  return candidate.hostname === seed.hostname && candidate.pathname.startsWith(scopePrefix(seedUrl));
}

// Optional scoping for incremental/manual runs: set ARCHIVE_FOLDERS to a
// comma-separated list of folder names (e.g. "ELO-2016-Web-Archive,ELO-2008-Web-Archive")
// to limit a pipeline script to just those seeds. Unset/empty = all seeds.
export function filterSeeds(seeds) {
  const raw = process.env.ARCHIVE_FOLDERS;
  if (!raw) return seeds;
  const wanted = new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
  return seeds.filter((s) => wanted.has(s.folder));
}
