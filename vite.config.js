// -- COMMENTO -- Config Vite per GH-Pages su /<REPO>/
// -- COMMENTO -- Proxy /api solo in dev per il BE locale
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// -- COMMENTO -- CAMBIA QUI se il repo NON è "DelivEat"
const REPO = 'DelivEat';

export default defineConfig({
  base: `/DelivEat/`,
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: { port: 3000 },
});
