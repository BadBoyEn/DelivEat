import axios from 'axios';

const IS_DEV  = import.meta.env.DEV;
const ENV_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '';

// -- COMMENTO -- Fallback hard-coded per PRODUCTION (Render)
const PROD_FALLBACK = 'https://deliveatbackend.onrender.com/api';

// -- COMMENTO -- In dev uso il proxy vite su /api, in prod ENV_URL o fallback
const baseURL = IS_DEV ? (ENV_URL || '/api') : (ENV_URL || PROD_FALLBACK);

// -- COMMENTO -- Istanza Axios condivisa con cookie
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

// -- COMMENTO -- Interceptor richiesta: opzionale bearer se presente in localStorage
api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

// -- COMMENTO -- Interceptor risposta: normalizza errori
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const msg = data?.error || data?.message || error?.message || 'Errore';
    return Promise.reject({ status, message: msg });
  }
);

export default api;
