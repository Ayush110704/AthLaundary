// Central place for the backend base URL, used by every admin fetch call.
// Normalizes VITE_API_URL so it always ends in exactly one "/api",
// regardless of how it's set in .env (with or without a trailing slash,
// with or without "/api" already included).

const RAW_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const stripTrailingSlashes = (url) => url.replace(/\/+$/, '');

const normalizeApiBase = (url) => {
  const trimmed = stripTrailingSlashes(url);
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

export const API_BASE = normalizeApiBase(RAW_BASE);