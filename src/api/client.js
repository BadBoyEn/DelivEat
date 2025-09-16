// -- COMMENTO -- Istanza Axios unica e robusta
import axios from 'axios';

const isGhPages = /\.github\.io$/.test(window.location.hostname);

// -- COMMENTO -- In locale usiamo il proxy '/api'; su GH-Pages evitiamo di chiamare il BE
const ENV_URL = (import.meta.env.VITE_API_URL ?? '').trim();
const baseURL = isGhPages ? '' : (ENV_URL || '/api');

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 12000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

// -- COMMENTO -- Normalizza errori (non far crashare i componenti)
api.interceptors.response.use(
  r => r,
  (error) => {
    const status = error?.response?.status ?? 0;
    const data = error?.response?.data ?? {};
    const msg = data?.error || data?.message || error?.message || 'Errore di rete';
    return Promise.reject({ status, message: msg });
  }
);

// -- COMMENTO -- Ping al backend. Su GH-Pages ritorna subito offline.
export async function checkBackend(timeoutMs = 1500) {
  if (isGhPages) return { online: false, reason: 'static-gh-pages' };
  try {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch('/api/health', { credentials: 'include', signal: ctrl.signal });
    clearTimeout(id);
    return { online: res.ok, reason: res.ok ? 'ok' : `http ${res.status}` };
  } catch (e) {
    return { online: false, reason: e?.name === 'AbortError' ? 'timeout' : 'network' };
  }
}

export { isGhPages };
export default api;
