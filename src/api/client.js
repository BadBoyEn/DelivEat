// -- COMMENTO -- Client Axios centralizzato DEV/PROD con cookie
import axios from 'axios';

const IS_DEV  = import.meta.env.DEV;

// -- COMMENTO -- Raccogliamo possibili env usate nel progetto
const RAW_ENV_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '';

// -- COMMENTO -- In DEV usa proxy Vite su /api se non è definita alcuna ENV
// In PROD l'ENV è obbligatoria: niente fallback hard-coded
let baseURL = IS_DEV ? (RAW_ENV_URL || '/api') : RAW_ENV_URL;

// -- COMMENTO -- Normalizza: se l'URL di prod non termina con /api, aggiungilo
if (!IS_DEV && baseURL && !/\/api\/?$/.test(baseURL)) {
  baseURL = baseURL.replace(/\/+$/, '') + '/api';
}

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
