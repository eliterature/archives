import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createRouteEntries, removePointers } from "./prepare-exhibitions.mjs";

test("creates direct route entry points without overwriting the home page", async t => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "elo-pages-routes-"));
  t.after(() => rm(directory, { recursive: true }));
  const shell = '<base href="/archives/elo24/"><div id="root"></div>';
  await writeFile(path.join(directory, "index.html"), shell);
  await createRouteEntries(directory, ["about", "index", "a-work"]);
  for (const route of ["", "about", "index", "a-work"]) {
    assert.equal(await readFile(path.join(directory, route, "index.html"), "utf8"), shell);
  }
});

test("removes LFS stubs and Apache configuration but preserves real assets", async t => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "elo-pages-media-"));
  t.after(() => rm(directory, { recursive: true }));
  const nested = path.join(directory, "videos");
  await mkdir(nested);
  await writeFile(path.join(nested, "01.mp4"), "version https://git-lfs.github.com/spec/v1\noid sha256:abc\nsize 100\n");
  await writeFile(path.join(directory, ".htaccess"), "RewriteEngine On");
  await writeFile(path.join(nested, "real.mp4"), Buffer.from([0, 1, 2, 3]));
  assert.equal(await removePointers(directory), 4);
  assert.deepEqual(await readdir(directory), ["videos"]);
  assert.deepEqual(await readdir(nested), ["real.mp4"]);
});
