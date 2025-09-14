import axios from 'axios';

const IS_DEV  = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;

// -- COMMENTO -- URL letto dalle env (build-time)
const ENV_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '';

// -- COMMENTO -- Fallback hard-coded per PRODUCTION (Render)
const PROD_FALLBACK = 'https://deliveatbackend.onrender.com/api';

// -- COMMENTO -- In dev uso proxy /api
const baseURL = IS_DEV ? '/api' : (ENV_URL || PROD_FALLBACK);

if (IS_PROD && !ENV_URL) {
  console.warn('[API] In produzione manca VITE_API_URL: baseURL=', baseURL);
}

// -- COMMENTO -- Creazione client
const api = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true, // -- COMMENTO -- necessario per i cookie HttpOnly (manager)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// -- COMMENTO -- Interceptor REQUEST: aggiunge Bearer token se presente (flusso RIDER)
api.interceptors.request.use(
  (config) => {
    const t = localStorage.getItem('token'); // -- COMMENTO -- token RIDER
    if (t && !config.headers?.Authorization) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${t}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -- COMMENTO -- Interceptor RESPONSE: normalizza l’errore in { status, message }
api.interceptors.response.use(
  (response) => response,
  (err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    const msg =
      data?.error ||
      data?.message ||
      err?.message ||
      'Errore';
    return Promise.reject({ status, message: msg });
  }
);

export default api;
