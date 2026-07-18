# ELO 2024 Online Exhibition Gallery (ELO 24 Gallery)

## Description
The ELO 24 Gallery is the online media art exhibition gallery for the 2024
Electronic Literature Organization conference. It is a React web application
(bootstrapped with Create React App) that presents a curated collection of
electronic literature works, each with descriptive metadata, citations, cover
imagery, and traversal videos. Beyond flat gallery pages, the exhibition
includes an `archive` of self-contained interactive works — hypertexts, browser
games, WebAssembly (Godot) builds, audio pieces, and a virtual-reality
presentation with 360° panoramas and 3D models — preserving richer, runnable
versions of several exhibited pieces.

The application is a direct predecessor of the ELO 2026 exhibition software: the
same lineage of exhibition-gallery code (originating with the Electronic
Literature Collection 4) was used and extended here for the ELO 2024 online
exhibition before being carried forward.

## Year of Origin
2024

## Contributors
- John T. Murray ([@lucidbard](https://github.com/lucidbard), Many Realities Studio) — lead developer
- Dan Cox ([@videlais](https://github.com/videlais)) — developer
- pd ([@pdedgar1](https://github.com/pdedgar1)) — contributor
- Produced under Many Realities Studio for the Electronic Literature Organization

## Original Platform or Environment
- React 18 single-page application, bootstrapped with Create React App (`react-scripts` 5)
- TypeScript, SCSS/Sass, Bootstrap 5 / React-Bootstrap
- Citations rendered with `@citation-js` (CSL, BibTeX, DOI plugins)
- Deployment via an FTP-based publish script (`utils/deploy`, `promise-ftp`)
- Production deploy target: `https://projects.cah.ucf.edu/mediaartsexhibits/elo2024/`
- Archived interactive works additionally rely on: Godot (WebAssembly `index.wasm`
  + `index.pck`), glTF/`.glb`, `.fbx`, and Blender `.blend` 3D assets, plus
  360° video panoramas for the VR presentation

## Source Materials
- [`/source/`](source/) — full source tree cloned from the original repository
  (excludes `.git`, `node_modules`, and build output). Media files under
  `source/public/video/` and `source/public/archive/` are the original Git LFS
  **pointer stubs** (each records the file's SHA-256 and byte size); the LFS
  filters have been removed from `source/.gitattributes` so this archive does not
  depend on Git LFS.
- **Large media (mirrored to this repository's GitHub Release, tag `elo24-gallery-media`):**
  the ~11 GB of binaries that the source tree references via LFS pointers — the
  `ELO-ID*.mp4` traversal videos and the archived works' videos and 3D models
  (`.mp4`, `.glb`, `.pck`, `.blend`, `.fbx`). Each release asset is named after
  its original repository path (with `/` replaced by `__`) so it can be mapped
  back to the correct location in the source tree.
- Original repository (private): https://github.com/many-realities-studio/elo24-gallery

## Licensing & Permissions
The original repository ships only the default Create React App README and does
**not** include an explicit software license. The exhibition was produced for the
Electronic Literature Organization, and this archive is maintained by the ELO.
Individual exhibited works remain under the rights of their respective creators.

**Rights status of the exhibition software itself is unclear — needs review**
(no explicit license present in the upstream repository at time of archiving).

## Notes for Preservation
- **Security:** the upstream private repository contained committed secrets — a
  `.env` file (deployment `SERVER_HOST` / `SERVER_USER` / `PASSWORD`) and a
  `token.json` (OAuth `access_token` / `refresh_token`). These were **deliberately
  excluded** from this archive and should be treated as compromised: rotate the
  server credentials and revoke the OAuth tokens in the upstream repo's history.
- The upstream repository stores media with **Git LFS** (`*.mp4`, `*.webm`,
  `*.glb`, `*.pck`, `*.blend`, `*.fbx`). This archive does **not** use Git LFS:
  the real binaries live in this repository's GitHub Release
  (`elo24-gallery-media`), and only lightweight LFS pointer stubs remain in the
  source tree as a manifest of paths, SHA-256 hashes, and sizes.
- To run the app from source, restore the media binaries from the
  `elo24-gallery-media` release into their original paths (reverse the `__` → `/`
  naming), then `npm install` and `npm run build` (Node + npm required). A working
  `.env` with valid deploy/publish credentials must be re-supplied for the FTP
  deploy script.
- Some non-LFS binary assets (`.wav` audio, a `.mov`, a `.wasm`, a `.zip`) are
  retained directly in the source tree; all are under GitHub's 100 MB per-file limit.

## Related Links
- Live production site (ELO 2024 exhibition): https://projects.cah.ucf.edu/mediaartsexhibits/elo2024/
- Many Realities Studio: https://github.com/many-realities-studio
- Electronic Literature Organization: https://eliterature.org
