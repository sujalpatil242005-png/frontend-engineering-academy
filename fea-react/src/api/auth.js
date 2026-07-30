const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export function signup({ email, password, name }) {
  return request('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name }) });
}

export function login({ email, password }) {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function fetchMe(token) {
  return request('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}

export function googleLoginUrl() {
  return `${API_BASE}/api/auth/google`;
}

export function githubLoginUrl() {
  return `${API_BASE}/api/auth/github`;
}
