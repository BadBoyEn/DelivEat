// -- COMMENTO -- Istanza Axios unica, SENZA Render, baseURL '/api' (proxy in dev)
import axios from 'axios';

const ENV_URL = (import.meta.env.VITE_API_URL ?? '').trim();
// -- COMMENTO -- In prod GH-Pages non c'è BE: lascia vuoto VITE_API_URL
const baseURL = ENV_URL || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

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
