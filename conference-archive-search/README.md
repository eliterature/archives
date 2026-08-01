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

## Deploying to GitHub Pages

Deployed automatically via [`.github/workflows/deploy-search.yml`](../.github/workflows/deploy-search.yml)
on every push to `main` that touches this folder or any `ELO-*-Web-Archive/`
folder (or manually via the Actions tab). It builds this site with
`BASE_PATH=/archives/` (since it's hosted as a project site at
https://eliterature.github.io/archives/) and deploys `dist/` with
`actions/deploy-pages`.

All generated links/assets are prefixed with `BASE_PATH` (an env var, default
`/`), so the same build works both locally (`npx serve dist` at the root) and
under a GitHub Pages project subpath:

```sh
BASE_PATH=/archives/ npm run build
```

This repo's GitHub Pages source must be set to "GitHub Actions" (Settings →
Pages → Build and deployment → Source) for the workflow's deploy step to
succeed.
