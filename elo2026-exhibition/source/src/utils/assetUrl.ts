export function assetUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const localPath = path.replace(/^\/+/, "");
  if (/^videos\/mp4\/[^/]+\.mp4$/.test(localPath)) {
    const filename = localPath.slice("videos/mp4/".length);
    return `https://github.com/eliterature/archives/releases/download/elo2026-exhibition-media/${filename}`;
  }
  const base = import.meta.env.BASE_URL;
  return base + localPath;
}
