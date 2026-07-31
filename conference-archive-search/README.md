# Conference Archive Search

A static, serverless full-text search UI over the cached pages committed in
the `ELO-{year}-Web-Archive` folders, powered by [Pagefind](https://pagefind.app/).

## How it works

`build.mjs`:

1. Reads `../conference-archive-tools/seeds.csv` for the list of conferences.
2. For each `ELO-{year}-Web-Archive/metadata.json` that exists (i.e. has
   already been captured/exported by the `conference-archive-tools` pipeline),
   for every page:
   - copies the raw `pages/<slug>/cached.html` (SingleFile snapshot) to
     `dist/works/<folder>/<slug>/archived.html` — served as-is for viewing
     the full archived copy (its legacy/malformed markup, e.g. unquoted
     attributes and huge inline base64 data URIs, is not something Pagefind
     should crawl or that's safe to re-parse/annotate);
   - builds a clean `dist/works/<folder>/<slug>/index.html` page from the
     exported `pages/<slug>/content.txt` clean-text extraction, tagged with
     Pagefind metadata/filter attributes (`site`, `year`, `title`) and a link
     to `archived.html` for the full visual copy — this is the page Pagefind
     actually indexes.
3. Generates a per-conference browse page (`dist/works/<folder>/index.html`)
   and a combined "browse all conferences" page (`dist/works/index.html`).
4. Writes the search UI (`dist/index.html`), then runs the Pagefind CLI to
   index everything under `dist/`.

Output lives in `dist/` (gitignored — fully regenerable from the committed
`pages/`/`metadata.json` files, so it isn't checked in).

## Usage

```sh
npm install
npm run build
npx serve dist   # or any other static file server
```

Then open the printed local URL to search across every archived conference
page. Search results link directly to the cached copy of each page.

## Notes

- Re-run `npm run build` any time new folders gain `pages/`/`metadata.json`
  (i.e. after running more of the `conference-archive-tools` capture
  pipeline) to pick up newly archived conferences.
- Not yet wired up to GitHub Pages — this repo's single Pages deployment slot
  is already used by `elo2026-exhibition`. For now, `dist/` is meant to be
  built and served locally, or deployed manually to any static host.
