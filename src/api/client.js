import axios from 'axios';

const baseURL =
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '/api';

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
    // -- COMMENTO -- token salvato dal login RIDER (se lo usi con localStorage)
    const t = localStorage.getItem('token');
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

    // -- COMMENTO -- ritorna un errore 
    return Promise.reject({ status, message: msg });
  }
);

export default api;
