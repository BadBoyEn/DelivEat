import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE?.trim() ||
  '/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err.message || 'Errore';
    return Promise.reject({ status: err?.response?.status, message: msg });
  }
);

export default api;
