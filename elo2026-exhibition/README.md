# ELO 2026 Online Exhibition — (Un)Supervised

## Description
The ELO 2026 Online Exhibition (branded *ELOnline 2026: (Un)Supervised*) is the
online media art exhibition of the 2026 Electronic Literature Organization
conference. It is a React single-page application that presents a curated
gallery of electronic literature works, each described by structured ELMS
(Extended eLectronic Metadata Schema) records. The app pre-renders every route
to static HTML for SEO and fast first paint, then hydrates on the client. Visitors
can browse a gallery grid, run free-text searches, build shareable filtered
playlists, read per-work curatorial statements, artist biographies, accessibility
information, and citations (APA, MLA, Chicago, BibTeX), and watch traversal
videos of each work.

The exhibition software has a lineage within the field: it was originally created
by John Murray for the Electronic Literature Collection 4 (2022), updated by John
Murray and Dan Cox for the ELO 2024 online exhibition, extended with ELMS metadata
functionality by Dan Cox in 2025, and given search and playlist functionality by
Dan Cox in 2026.

## Year of Origin
2026

## Contributors
- Anastasia Salter, University of Central Florida (Conference Chair)
- John Murray, University of Central Florida (Conference Co-Chair; original exhibition software author)
- Lyle Skains, Bournemouth University (Exhibition Co-Chair; Editor)
- Daniel "Dan" Cox, Illinois State University (Exhibition Co-Chair; Editor; Developer — [@videlais](https://github.com/videlais))
- Richard Finch, University of Central Florida (Conference Committee)
- Alyssa Barrack, University of Central Florida (Conference Committee)
- Publisher: Electronic Literature Organization

## Original Platform or Environment
- React 19 single-page application built with Vite 8 and TypeScript
- Styling via SCSS/Sass and Bootstrap 5 / React-Bootstrap
- Server-side rendering + static pre-render pipeline (Node scripts) for SEO
- Citations rendered client-side via `@citation-js` with bundled CSL styles
- Data-driven from `src/json/works.json` (ELMS-format work records) and `src/json/about.json`
- Traversal videos encoded as 1080p H.264 (HandBrake x264 RF22)
- Production deploy target: Apache under base path `/mediaartsexhibits/elo2026/`
  (`.htaccess` routing config shipped in the deployable build)

## Source Materials
- [`/source/`](source/) — full source tree cloned from the original repository
  (excludes `.git`, `node_modules`, and build output). The video files under
  [`source/public/videos/mp4/`](source/public/videos/mp4/) are the original Git
  LFS **pointer stubs** (each records the original file's SHA-256 and byte size);
  the LFS filter has been removed from `source/.gitattributes` so this archive
  does not depend on Git LFS.
- **Large media (mirrored to this repository's GitHub Release, tag `elo2026-exhibition-media`):**
  - `elo2026-site-v0.11.0.zip` — the deployable static build of the site
    including all traversal videos and the Apache `.htaccess` routing config
    (~1.64 GB; SHA-256 `51efdef366812a18386d66957cb3f9111e295bc5dee78e7d8b8bc2e1d6515146`).
  - The 46 traversal videos (`01.mp4`, `03.mp4` … `48.mp4`) that the source tree
    references via LFS pointers, re-hosted as individual release assets.
- Original repository: https://github.com/videlais/elo2026-exhibition-preview
- Original release with traversal videos: `media-v1` — https://github.com/videlais/elo2026-exhibition-preview/releases/tag/media-v1
- Original deployable release: `v0.11.0` — https://github.com/videlais/elo2026-exhibition-preview/releases/tag/v0.11.0

## Licensing & Permissions
The original source repository does **not** include an explicit license file.
The exhibition and its software were produced for and published by the Electronic
Literature Organization, and this archive is maintained by the ELO. The bundled
third-party dependency [tagify](https://github.com/yairEO/tagify/blob/master/LICENSE)
carries its own license. Individual exhibited works remain under the rights of
their respective creators.

**Rights status of the exhibition software itself is unclear — needs review**
(no explicit license present in the upstream repository at time of archiving).

## Notes for Preservation
- The upstream repository stores traversal videos with **Git LFS** (`*.mp4`,
  `*.webm`). This archive intentionally does **not** use Git LFS: the real video
  binaries live in this repository's GitHub Release (`elo2026-exhibition-media`),
  and only lightweight LFS pointer stubs remain in the source tree as a manifest.
- The archived exhibition is hosted at https://eliterature.github.io/archives/elo26/.
  Traversal players resolve `/videos/mp4/` metadata paths directly to this
  repository's `elo2026-exhibition-media` release. Local images continue to use
  the configured application base path. No video download is needed.
- From `source/`, run `npm ci`, then
  `VITE_APP_BASE_PATH=/archives/elo26/ npm run build:full`.
  The repository-level Pages workflow builds and publishes the pre-rendered
  routes alongside the ELO24 gallery and existing conference archive search.
  It removes LFS pointer stubs and Apache-only configuration from the deployed
  copy; source preservation manifests are unchanged.
- Server rendering imports the router and route components from the same
  `react-router-dom` package so their contexts match. Pre-render errors fail the
  build rather than silently skipping routes.
- The deployable `elo2026-site-v0.11.0.zip` is built for the base path
  `/mediaartsexhibits/elo2026/`; to host it elsewhere it must be rebuilt with a
  different `VITE_APP_BASE_PATH`, or the `.htaccess` and internal links adjusted.
- Numbering gap: there is no `02.mp4` or `08.mp4` in the media set — this matches
  the upstream release and is not a missing-asset error.
- The ELMS work-record schema used by `works.json` is committed at
  `source/schema/elms-schema.json` for future validation or type generation.

## Related Links
- GitHub Pages archive: https://eliterature.github.io/archives/elo26/
- Live production site: https://projects.cah.ucf.edu/mediaartsexhibits/elo2026
- GitHub Pages preview: https://videlais.github.io/elo2026-exhibition-preview/
- Extended eLectronic Metadata Schema (ELMS), The NEXT: https://the-next.org/elms
- Electronic Literature Organization: https://eliterature.org
