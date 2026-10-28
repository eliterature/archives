import { traversalVideoUrl } from "./traversalVideoUrl";
import works from "../json/works.json";

test("links every work to its archived MP4 and WebM release assets", () => {
  for (const work of works) {
    expect(traversalVideoUrl(work.id, "mp4")).toBe(
      `https://github.com/eliterature/archives/releases/download/elo24-gallery-media/public__video__mp4__ELO-ID${work.id}-MP4.mp4`
    );
    const suffix = String(work.id) === "51" ? "MP4" : "WEBM";
    expect(traversalVideoUrl(work.id, "webm")).toBe(
      `https://github.com/eliterature/archives/releases/download/elo24-gallery-media/public__video__webm__ELO-ID${work.id}-${suffix}.webm`
    );
  }
});
