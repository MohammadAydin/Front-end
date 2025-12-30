const DEFAULT_API_BASE_URL = "https://staging.woundwann.de/v1";

export const API_BASE_URL =
    typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.VITE_API_BASE_URL
        ? import.meta.env.VITE_API_BASE_URL
        : DEFAULT_API_BASE_URL;

export const getApiUrl = (path = "") => {
    if (!path) return API_BASE_URL;
    if (/^https?:\/\//i.test(path)) return path;

    const base = API_BASE_URL.replace(/\/+$/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return `${base}/${normalizedPath}`;
};







