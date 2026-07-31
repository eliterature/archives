# Conference Archive Tools

ArchiveBox capture pipeline for the 18 `ELO-{year}-Web-Archive` folders in this
repository. ArchiveBox itself must already be installed locally (this pipeline
assumes the `archivebox` CLI and `sqlite3` are on `PATH`).

## Pipeline

1. **`seeds.csv`** — the 18 conference sites/PDF to archive: `folder,year,title,location,url,type`.
2. **`scripts/capture-pass1.mjs`** — initializes the local ArchiveBox collection (at `../archivebox-collection/`, gitignored) and runs `archivebox add --depth=1 <url>` for every site (a bare `archivebox add <url>` for the one PDF entry). ArchiveBox's depth=1 already follows every link found on the seed page one hop, including cross-domain links.
3. **`scripts/discover-links.mjs`** — reads each captured page's `parse_dom_outlinks/urls.jsonl`, keeps only **same-site** links (same hostname *and* under the seed's own path prefix — several seeds share a hostname, e.g. `dtc-wsuv.org` hosts both ELO-2008 and ELO-2016) not already captured, caps them at `MAX_NEW_PAGES_PER_SITE` (default 20) per site, and writes `build/pass2-urls.json`.
4. **`scripts/capture-pass2.mjs`** — captures each URL in `build/pass2-urls.json` as a single page (no further crawling), reaching a second same-site hop.
5. **`scripts/export.mjs`** — queries the ArchiveBox SQLite index for every snapshot belonging to each seed (matched by hostname + path prefix, see `lib/paths.mjs`'s `matchesSeed`), copies its SingleFile snapshot into `<folder>/pages/<slug>/cached.html` (the canonical "cached page"), copies a clean-text extraction (`defuddle`/`trafilatura`/etc.) into `<folder>/pages/<slug>/content.txt` when available (used for search indexing — see `conference-archive-search/`), and writes `<folder>/metadata.json`.
6. **`scripts/package-raw.mjs`** — zips each seed's full raw snapshot folders (WARC, wget mirror, screenshots, etc.) into `build/<folder>-raw.zip`, ready to attach to a GitHub Release (tag `<folder-lowercased>-raw`, e.g. `elo-2025-web-archive-raw`) as referenced in that folder's README.

Run in order:

```sh
node scripts/capture-pass1.mjs
node scripts/discover-links.mjs
node scripts/capture-pass2.mjs
node scripts/export.mjs
node scripts/package-raw.mjs
```

Each site can take several minutes to tens of minutes to capture (headless
Chrome rendering, WARC recording, etc.) — running all 18 is a long process,
best done unattended rather than interactively.

To scope any of these scripts to a subset of seeds (e.g. for testing or
incremental runs), set `ARCHIVE_FOLDERS` to a comma-separated list of folder
names before running:

```sh
ARCHIVE_FOLDERS=ELO-2016-Web-Archive,ELO-2008-Web-Archive node scripts/capture-pass1.mjs
```

## After running

- Commit the newly populated `<folder>/pages/` and `<folder>/metadata.json` files.
- Manually create a GitHub Release per folder (tag `<folder-lowercased>-raw`) and upload the matching `build/<folder>-raw.zip`, then update that folder's README "Large archive data" line with the real release URL.
- Run the `conference-archive-search` build to regenerate the Pagefind index over the newly exported pages.

## Environment notes

- `UV_CACHE_DIR` should point at a writable directory (e.g. under `$TMPDIR`) if the default `~/.cache/uv` isn't writable in your shell.
- The ArchiveBox collection directory (`../archivebox-collection/`) is intentionally gitignored — it holds the full raw archive (which can be very large); only the exported `pages/` + `metadata.json` and the packaged raw zips are meant to leave this directory.
