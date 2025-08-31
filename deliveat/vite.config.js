import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// -- COMMENTO -- Configurazione Vite con alias @ → /src
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    strictPort: false,          // -- COMMENTO -- se la porta 3000 è occupata usa un’altra
    proxy: { '/api': 'http://localhost:5000' }
  },
  build: { outDir: 'dist' }
})
