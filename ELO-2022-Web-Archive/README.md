# ELO 2022 Web Archive — Education and Electronic Literature

## Description
Web archive of the ELO 2022 conference site, *Education and Electronic
Literature*, held in Lake Como, Italy and online. Captured from the original
site at https://www.elo2022.com/ using ArchiveBox (SingleFile snapshots for
browsing/search, plus a full WARC/media mirror for preservation).

## Year of Origin
2022

## Contributors
Unknown — needs review (see the [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html) for organizers).

## Original Platform or Environment
Original conference website (platform not yet identified — needs review).

## Source Materials
- `pages/` — SingleFile "cached page" snapshots of the crawled site, one per page, plus a `metadata.json` (original URL, capture timestamp, title) — added by the ArchiveBox export step.
- **Large archive data (raw WARC, wget mirror, media)** available via this repository's [GitHub Release](https://github.com/eliterature/archives/releases/tag/elo-2022-web-archive-raw) (tag `elo-2022-web-archive-raw`). This archive exceeds GitHub's 2GB per-file asset limit, so it is split into two parts: `ELO-2022-Web-Archive-raw.zip.partaa` and `ELO-2022-Web-Archive-raw.zip.partab`. To reassemble: `cat ELO-2022-Web-Archive-raw.zip.partaa ELO-2022-Web-Archive-raw.zip.partab > ELO-2022-Web-Archive-raw.zip`, then unzip.
- Original site: https://www.elo2022.com/

## Licensing & Permissions
Rights status unclear — needs review.

## Notes for Preservation
- Captured via ArchiveBox with a same-domain, limited-depth (~1-2 hop) crawl.
- SingleFile snapshots are self-contained rendered HTML (post-JavaScript DOM), chosen for fidelity on JS-heavy conference sites and for compatibility with the repo-wide Pagefind search index in `conference-archive-search/`.

## Related Links
- [ELO Conference Archive index](https://conference.eliterature.org/archive/index.html)
- https://www.elo2022.com/
