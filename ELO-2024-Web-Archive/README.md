# ELO 2024 Web Archive — (un)linked

## Description
Web archive of the ELO 2024 conference site, *(un)linked*, held in Orlando,
Florida (Virtual). Captured from the original site at
https://stars.library.ucf.edu/elo2024/ using ArchiveBox (SingleFile snapshots
for browsing/search, plus a full WARC/media mirror for preservation).

## Year of Origin
2024

## Contributors
Unknown — needs review (see the [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html) for organizers).

## Original Platform or Environment
Original conference website, hosted on a university digital library platform (STARS/bepress) (platform not yet fully identified — needs review).

## Source Materials
- `pages/` — SingleFile "cached page" snapshots of the crawled site, one per page, plus a `metadata.json` (original URL, capture timestamp, title) — added by the ArchiveBox export step.
- **Large archive data (raw WARC, wget mirror, media)** available via this repository's [GitHub Release](https://github.com/eliterature/archives/releases/tag/elo-2024-web-archive-raw) (tag `elo-2024-web-archive-raw`).
- Original site: https://stars.library.ucf.edu/elo2024/

## Licensing & Permissions
Rights status unclear — needs review.

## Notes for Preservation
- Captured via ArchiveBox with a same-domain, limited-depth (~1-2 hop) crawl.
- The source domain is a large university digital library (STARS); the crawl is scoped to the `elo2024` subsection only, not the whole library.
- SingleFile snapshots are self-contained rendered HTML (post-JavaScript DOM), chosen for fidelity on JS-heavy conference sites and for compatibility with the repo-wide Pagefind search index in `conference-archive-search/`.

## Related Links
- [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html)
- https://stars.library.ucf.edu/elo2024/
