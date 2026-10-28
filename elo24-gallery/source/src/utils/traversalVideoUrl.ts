const releaseUrl = "https://github.com/eliterature/archives/releases/download/elo24-gallery-media";

export function traversalVideoUrl(id: string | number, format: "mp4" | "webm"): string {
  // The upstream WebM for work 51 was named with an MP4 suffix.
  const suffix = format === "webm" && String(id) !== "51" ? "WEBM" : "MP4";
  return `${releaseUrl}/public__video__${format}__ELO-ID${id}-${suffix}.${format}`;
}
