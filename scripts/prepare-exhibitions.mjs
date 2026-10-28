import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function removePointers(directory) {
  let bytes = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      bytes += await removePointers(filename);
      continue;
    }
    const { size } = await stat(filename);
    const isPointer = size < 1024 &&
      (await readFile(filename, "utf8")).startsWith("version https://git-lfs.github.com/spec/v1\n");
    if (isPointer || entry.name === ".htaccess") {
      await rm(filename);
    } else {
      bytes += size;
    }
  }
  return bytes;
}

export async function createRouteEntries(buildDir, routes) {
  const shell = await readFile(path.join(buildDir, "index.html"), "utf8");
  for (const route of routes) {
    const directory = path.join(buildDir, route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), shell);
  }
}

async function main() {
  const destination = path.join(root, "conference-archive-search/dist");
  // Require the existing search build, rather than accidentally replacing it.
  await stat(path.join(destination, "index.html"));
  const gallery = path.join(destination, "elo24");
  const exhibition = path.join(destination, "elo26");
  for (const [source, target] of [
    ["elo24-gallery/source/build", gallery],
    ["elo2026-exhibition/source/build", exhibition],
  ]) {
    await rm(target, { recursive: true, force: true });
    await cp(path.join(root, source), target, { recursive: true });
  }

  const works24 = JSON.parse(await readFile(path.join(root, "elo24-gallery/source/src/json/works.json"), "utf8"));
  await createRouteEntries(gallery, ["about", "index", "filters", ...works24.map(work => work.slug)]);

  const works26 = JSON.parse(await readFile(path.join(root, "elo2026-exhibition/source/src/json/works.json"), "utf8"));
  for (const route of ["", "about", "search", "playlist", ...works26.map(work => `work/${work.workInformation.workId}`)]) {
    await stat(path.join(exhibition, route, "index.html"));
  }

  const bytes = await removePointers(destination);
  if (bytes >= 1_000_000_000) {
    throw new Error(`Pages artifact exceeds the 1 GB site limit: ${bytes} bytes`);
  }
  console.log(`Pages artifact ready: ${(bytes / 1_000_000).toFixed(1)} MB; ELO24 and ELO26 routes verified.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
