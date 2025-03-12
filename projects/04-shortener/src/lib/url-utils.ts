// Save URLs to localStorage
export function saveUrl(
  urls: Array<{ original: string; shortened: string; createdAt: number }>
) {
  if (typeof window !== "undefined") {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }
}

// Get URLs from localStorage
export function getUrls(): Array<{
  original: string;
  shortened: string;
  createdAt: number;
}> {
  if (typeof window !== "undefined") {
    const storedUrls = localStorage.getItem("shortUrls");
    return storedUrls ? JSON.parse(storedUrls) : [];
  }
  return [];
}
