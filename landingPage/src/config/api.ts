const DEFAULT_API_BASE_URL = "https://woundwann.de/v1";

declare const import.meta: {
  env?: Record<string, string | undefined>;
};

export const API_BASE_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : DEFAULT_API_BASE_URL;

export const getApiUrl = (path: string = ""): string => {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;

  const base = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${base}/${normalizedPath}`;
};






