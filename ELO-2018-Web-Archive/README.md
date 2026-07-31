# ELO 2018 Web Archive — MIND THE GAP!

## Description
Web archive of the ELO 2018 conference site, *MIND THE GAP!*, held in
Montreal, Canada. Captured from the original site at
https://sites.grenadine.uqam.ca/sites/nt2/en/elo2018 using ArchiveBox
(SingleFile snapshots for browsing/search, plus a full WARC/media mirror for
preservation).

## Year of Origin
2018

## Contributors
Unknown — needs review (see the [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html) for organizers).

## Original Platform or Environment
Original conference website, hosted on UQAM's Grenadine conference platform (platform not yet fully identified — needs review).

## Source Materials
- `pages/` — SingleFile "cached page" snapshots of the crawled site, one per page, plus a `metadata.json` (original URL, capture timestamp, title) — added by the ArchiveBox export step.
- **Large archive data (raw WARC, wget mirror, media)** available via this repository's [GitHub Release](https://github.com/eliterature/archives/releases/tag/elo-2018-web-archive-raw) (tag `elo-2018-web-archive-raw`).
- Original site: https://sites.grenadine.uqam.ca/sites/nt2/en/elo2018

## Licensing & Permissions
Rights status unclear — needs review.

## Notes for Preservation
- Captured via ArchiveBox with a same-domain, limited-depth (~1-2 hop) crawl.
- The source domain is a shared conference-hosting platform (Grenadine); the crawl is scoped to the `elo2018` subsection only.
- SingleFile snapshots are self-contained rendered HTML (post-JavaScript DOM), chosen for fidelity on JS-heavy conference sites and for compatibility with the repo-wide Pagefind search index in `conference-archive-search/`.

## Related Links
- [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html)
- https://sites.grenadine.uqam.ca/sites/nt2/en/elo2018
