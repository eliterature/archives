#!/usr/bin/env node
// Build a static, searchable copy of every cached page committed under the
// ELO-{year}-Web-Archive folders, then run Pagefind to index it.
//
// Usage: npm run build   (from this directory)
//
// Output: ./dist/ (gitignored) — a static site you can serve locally
// (e.g. `npx serve dist`) to search across every captured conference page
// and follow links straight to the archived copy.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parseSeedsCsv } from "../conference-archive-tools/scripts/lib/seeds.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const SEEDS_CSV = path.join(REPO_ROOT, "conference-archive-tools", "seeds.csv");
const DIST_DIR = path.join(SCRIPT_DIR, "dist");

const seeds = parseSeedsCsv(SEEDS_CSV);

fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST_DIR, "works"), { recursive: true });

const sites = [];

for (const seed of seeds) {
  const folderPath = path.join(REPO_ROOT, seed.folder);
  const metadataPath = path.join(folderPath, "metadata.json");
  if (!fs.existsSync(metadataPath)) continue; // not captured/exported yet

  const manifest = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const pages = [];

  for (const entry of manifest) {
    const srcPath = path.join(folderPath, entry.page);
    if (!fs.existsSync(srcPath)) continue;

    const slug = path.basename(path.dirname(entry.page));
    const outDir = path.join(DIST_DIR, "works", seed.folder, slug);
    fs.mkdirSync(outDir, { recursive: true });

    // The raw archived copy (SingleFile output) — served as-is for viewing.
    // Its markup is often messy/legacy (unquoted attributes, embedded base64
    // data URIs, etc.), so we don't ask Pagefind to crawl or annotate it
    // directly; instead we build a clean, purpose-made page (below) for
    // indexing/search, which links here for the full visual copy.
    fs.copyFileSync(srcPath, path.join(outDir, "archived.html"));

    const textPath = entry.text ? path.join(folderPath, entry.text) : null;
    const cleanText = textPath && fs.existsSync(textPath) ? fs.readFileSync(textPath, "utf8") : null;

    const html = renderIndexedPage({
      year: seed.year,
      siteTitle: seed.title,
      pageTitle: entry.title,
      originalUrl: entry.url,
      cleanText,
    });
    fs.writeFileSync(path.join(outDir, "index.html"), html);

    pages.push({ slug, title: entry.title, url: entry.url, href: `/works/${seed.folder}/${slug}/` });
  }

  if (pages.length === 0) continue;
  sites.push({ folder: seed.folder, year: seed.year, title: seed.title, location: seed.location, pages });
  fs.mkdirSync(path.join(DIST_DIR, "works", seed.folder), { recursive: true });
  fs.writeFileSync(
    path.join(DIST_DIR, "works", seed.folder, "index.html"),
    renderSiteIndex(seed, pages)
  );
}

fs.writeFileSync(path.join(DIST_DIR, "works", "index.html"), renderWorksIndex(sites));
fs.copyFileSync(path.join(SCRIPT_DIR, "src", "styles.css"), path.join(DIST_DIR, "styles.css"));
fs.writeFileSync(path.join(DIST_DIR, "index.html"), renderSearchPage());

const totalPages = sites.reduce((n, s) => n + s.pages.length, 0);
console.log(`Exported ${totalPages} cached page(s) across ${sites.length} site(s).`);

if (totalPages === 0) {
  console.log("No captured pages found yet — run the conference-archive-tools pipeline first. Skipping Pagefind indexing.");
  process.exit(0);
}

console.log("Running Pagefind...");
const pagefindBin = path.join(SCRIPT_DIR, "node_modules", ".bin", "pagefind");
execFileSync(pagefindBin, ["--site", "dist"], { cwd: SCRIPT_DIR, stdio: "inherit" });
console.log("Done. Serve dist/ with a static file server (e.g. `npx serve dist`) to search.");

// --- helpers -----------------------------------------------------------

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// The defuddle/trafilatura clean-text extraction sometimes preserves HTML
// entities as literal text (e.g. "&amp;") rather than decoding them; decode
// the common ones first so our own escapeHtml() doesn't double-encode them.
function decodeCommonEntities(value) {
  return String(value ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

// Build a clean, purpose-made page for Pagefind indexing: uses ArchiveBox's
// extracted clean-text content (defuddle/trafilatura) rather than the raw
// archived HTML, whose legacy/malformed markup (unquoted attributes, huge
// inline base64 data URIs, etc.) is unreliable to safely re-parse or trust
// Pagefind's attribute-sourced metadata/filter extraction against.
function renderIndexedPage({ year, siteTitle, pageTitle, originalUrl, cleanText }) {
  const siteLabel = `${year} \u2014 ${siteTitle}`;
  const paragraphs = (cleanText || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(decodeCommonEntities(p))}</p>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(pageTitle)}</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body data-pagefind-body
      data-pagefind-meta="title[data-pf-title], year[data-pf-year], site[data-pf-site]"
      data-pagefind-filter="site[data-pf-site], year[data-pf-year]"
      data-pf-title="${escapeAttr(pageTitle)}"
      data-pf-year="${escapeAttr(year)}"
      data-pf-site="${escapeAttr(siteLabel)}">
<header class="page-header"><a href="/">&larr; Archive search</a></header>
<main class="container">
<p class="meta">Archived copy from <strong>${escapeHtml(siteLabel)}</strong>.
Original: <a href="${escapeAttr(originalUrl)}" rel="noopener noreferrer">${escapeHtml(originalUrl)}</a>.
<a href="archived.html">View full archived copy</a>.</p>
<h1>${escapeHtml(pageTitle)}</h1>
${paragraphs || "<p><em>No extracted text available for this page.</em></p>"}
</main>
</body>
</html>`;
}

function renderSiteIndex(seed, pages) {
  const rows = pages
    .map((p) => `<li><a href="${escapeAttr(p.href)}">${escapeHtml(p.title || p.url)}</a></li>`)
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(seed.year)} \u2014 ${escapeHtml(seed.title)} \u2014 ELO Conference Archive</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body data-pagefind-ignore>
<header class="page-header"><a href="/">&larr; Archive search</a></header>
<main class="container">
<h1>${escapeHtml(seed.year)} \u2014 ${escapeHtml(seed.title)}</h1>
<p class="meta">${escapeHtml(seed.location || "")}</p>
<ul class="page-list">
${rows}
</ul>
</main>
</body>
</html>`;
}

function renderWorksIndex(sites) {
  const rows = sites
    .map(
      (s) =>
        `<li><a href="/works/${escapeAttr(s.folder)}/">${escapeHtml(s.year)} \u2014 ${escapeHtml(s.title)}</a> <span class="meta">(${s.pages.length} page${s.pages.length === 1 ? "" : "s"})</span></li>`
    )
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Browse all conferences \u2014 ELO Conference Archive</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body data-pagefind-ignore>
<header class="page-header"><a href="/">&larr; Archive search</a></header>
<main class="container">
<h1>Browse all conferences</h1>
<ul class="site-list">
${rows}
</ul>
</main>
</body>
</html>`;
}

function renderSearchPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ELO Conference Archive Search</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/styles.css">
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
</head>
<body>
<main class="container">
<h1>ELO Conference Archive Search</h1>
<p class="intro">
  Full-text search across every cached page captured from past
  <a href="https://conference.eliterature.org/archive/index.html" rel="noopener noreferrer">Electronic Literature Organization conference</a>
  websites. Results link to the archived copy of each page.
  See the <a href="/works/">full list of archived conferences</a>.
</p>
<div id="search"></div>
</main>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    new PagefindUI({
      element: "#search",
      showSubResults: true,
      showImages: false,
      excerptLength: 20,
    });
  });
</script>
</body>
</html>`;
}
