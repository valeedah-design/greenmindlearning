import axios from "axios";

// Base URL for the FastAPI backend. Same env var the public site uses.
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const TOKEN_KEY = "gml_admin_token";

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Attach the admin's token to every request (harmless on public GETs, required on writes).
api.interceptors.request.use((config) => {
  let token = "";
  try {
    token = localStorage.getItem(TOKEN_KEY) || "";
  } catch (e) {
    // localStorage may be unavailable (private mode, etc.) — fail open, just skip the header.
  }
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Turn a relative "/uploads/xxx.png" path from the backend into a full URL for <img src>.
export function fileUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${BACKEND_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Upload a single file to POST /api/uploads and return its relative url.
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url;
}

export function getErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  return err?.response?.data?.detail || err?.message || fallback;
}

export default api;
