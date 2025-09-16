// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// -- COMMENTO -- Cambia qui se il repo ha un nome diverso
const REPO = 'DelivEat';

export default defineConfig(() => {
  const isGhPages = process.env.GH_PAGES === 'true';
  return {
    base: isGhPages ? `/${REPO}/` : '/',   // -- COMMENTO -- base giusta per /{repo}/
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '/api': { target: 'http://localhost:5000', changeOrigin: true, secure: false }
      }
    }
  };
});
