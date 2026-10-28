import { describe, expect, it } from "vitest";
import { assetUrl } from "../src/utils/assetUrl";
import works from "../src/json/works.json";

describe("archive asset URLs", () => {
  it("uses the release for every traversal video", () => {
    let videos = 0;
    for (const work of works) {
      const video = work.mediaFilesInformation.traversalVideo;
      if (!video) {
        expect(assetUrl(video)).toBe("");
        continue;
      }
      videos += 1;
      expect(assetUrl(video)).toBe(
        `https://github.com/eliterature/archives/releases/download/elo2026-exhibition-media/${video.split("/").pop()}`
      );
    }
    expect(videos).toBe(46);
  });

  it("keeps local images under the deployment base", () => {
    expect(assetUrl("/images/cover.png")).toBe(`${import.meta.env.BASE_URL}images/cover.png`);
  });

  it("preserves external and embedded assets and absent values", () => {
    for (const url of ["https://example.org/video.mp4", "data:image/png;base64,abc", "blob:video"]) {
      expect(assetUrl(url)).toBe(url);
    }
    expect(assetUrl(undefined)).toBe("");
  });
});
