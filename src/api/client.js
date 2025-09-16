// -- COMMENTO -- Istanza Axios SOLO per ambiente locale o URL esplicito via ENV
import axios from 'axios';

// -- COMMENTO -- Se vuoi forzare un URL, imposta VITE_API_URL nello .env, altrimenti usa '/api' (proxy Vite)
const ENV_URL = (import.meta.env.VITE_API_URL ?? '').trim();
const baseURL = ENV_URL || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,                 // -- COMMENTO -- cookie HttpOnly dal BE
  timeout: 15000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

// -- COMMENTO -- Normalizza errori
api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const msg = data?.error || data?.message || error?.message || 'Errore';
    return Promise.reject({ status, message: msg });
  }
);

export default api;
