// -- CENTRALIZZAZIONE API --
import axios from 'axios';

// Usa Vite env se presente, altrimenti usa il proxy /api (vite.config.js)
const baseURL =
  import.meta.env.VITE_API_BASE?.trim() ||
  '/api'; // con proxy: '/api' -> http://localhost:5000

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// -- ALLEGA IL TOKEN SE PRESENTE IN AUTOMATICO --
api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

// -- LOG CON ERRORI --
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err.message ||
      'Errore';
    return Promise.reject({ status: err?.response?.status, message: msg });
  }
);

export default api;
