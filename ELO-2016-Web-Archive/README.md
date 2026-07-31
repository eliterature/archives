# ELO 2016 Web Archive — Next Horizons

## Description
Web archive of the ELO 2016 conference site, *Next Horizons*, held in
Victoria, BC. Captured from the original site at
https://dtc-wsuv.org/projects/elo2016site/ using ArchiveBox (SingleFile
snapshots for browsing/search, plus a full WARC/media mirror for
preservation).

## Year of Origin
2016

## Contributors
Unknown — needs review (see the [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html) for organizers).

## Original Platform or Environment
Original conference website, hosted on Washington State University Vancouver's Digital Technology and Culture site (platform not yet fully identified — needs review).

## Source Materials
- `pages/` — SingleFile "cached page" snapshots of the crawled site, one per page, plus a `metadata.json` (original URL, capture timestamp, title) — added by the ArchiveBox export step.
- **Large archive data (raw WARC, wget mirror, media)** available via this repository's [GitHub Release](https://github.com/eliterature/archives/releases/tag/elo-2016-web-archive-raw) (tag `elo-2016-web-archive-raw`).
- Original site: https://dtc-wsuv.org/projects/elo2016site/

## Licensing & Permissions
Rights status unclear — needs review.

## Notes for Preservation
- Captured via ArchiveBox with a same-domain, limited-depth (~1-2 hop) crawl.
- The source domain (`dtc-wsuv.org`) also hosts the ELO 2008 archive; the crawl is scoped to the `projects/elo2016site` subsection only.
- SingleFile snapshots are self-contained rendered HTML (post-JavaScript DOM), chosen for fidelity on JS-heavy conference sites and for compatibility with the repo-wide Pagefind search index in `conference-archive-search/`.

## Related Links
- [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html)
- https://dtc-wsuv.org/projects/elo2016site/
