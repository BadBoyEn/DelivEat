// -- COMMENTO -- Istanza Axios unica e robusta
import axios from 'axios';

const isGhPages = /\.github\.io$/i.test(window.location.hostname);

// -- COMMENTO -- Se definisci VITE_API_URL la uso sempre (es. http://127.0.0.1:4000/api)
//               Altrimenti: su GH Pages vado diretto a http://127.0.0.1:4000/api
//               In dev (vite) uso il proxy '/api'
const ENV_URL = (import.meta.env.VITE_API_URL ?? '').trim();
const baseURL = isGhPages
  ? (ENV_URL || 'http://127.0.0.1:4000/api')
  : (ENV_URL || '/api');

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 12000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

// -- COMMENTO -- Fallback auth via Bearer token (cookie spesso bloccati su GH Pages)
const TOKEN_KEY = 'deliveat_token';

export const getAuthToken = () => {
  try { return localStorage.getItem(TOKEN_KEY) || null; } catch { return null; }
};
export const setAuthToken = (t) => {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
};
export const clearAuthToken = () => setAuthToken(null);

// -- COMMENTO -- Allego Authorization: Bearer se presente
api.interceptors.request.use((config) => {
  const t = getAuthToken();
  if (t && !config.headers?.Authorization) {
    config.headers = { ...config.headers, Authorization: `Bearer ${t}` };
  }
  return config;
});

// -- COMMENTO -- Normalizza errori + catturo token dal body (se il BE lo rimanda)
api.interceptors.response.use(
  (res) => {
    if (res?.data?.token) setAuthToken(res.data.token);
    return res;
  },
  (error) => {
    const status = error?.response?.status ?? 0;
    const data = error?.response?.data ?? {};
    const msg = data?.error || data?.message || error?.message || 'Errore di rete';
    // if (status === 401) clearAuthToken(); // opzionale
    return Promise.reject({ status, message: msg });
  }
);

// -- COMMENTO -- Ping al backend con URL corretto in base al contesto
export async function checkBackend(timeoutMs = 1500) {
  const healthUrl = (() => {
    if (ENV_URL) return `${ENV_URL.replace(/\/+$/,'')}/health`;
    return isGhPages ? 'http://127.0.0.1:4000/api/health' : '/api/health';
  })();

  try {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(healthUrl, { credentials: 'include', signal: ctrl.signal });
    clearTimeout(id);
    return { online: res.ok, reason: res.ok ? 'ok' : `http ${res.status}` };
  } catch (e) {
    return { online: false, reason: e?.name === 'AbortError' ? 'timeout' : 'network' };
  }
}

export { isGhPages };
export default api;
