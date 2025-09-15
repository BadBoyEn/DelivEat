import axios from 'axios';

const IS_DEV  = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;

// -- COMMENTO -- URL da env
const ENV_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '';

// -- COMMENTO -- Fallback hard-coded per PRODUCTION (Render)
const PROD_FALLBACK = 'https://deliveatbackend.onrender.com/api';

// -- COMMENTO -- In dev uso proxy /api
const baseURL = IS_DEV
  ? '/api'
  : (ENV_URL || PROD_FALLBACK);

const api = axios.create({
  baseURL,
  withCredentials: true, // -- COMMENTO -- cookie HttpOnly dal BE
  timeout: 15000,
});

// -- COMMENTO -- Interceptor richiesta: se esiste token del rider lo aggiungo (Bearer) per rotte rider
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
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
