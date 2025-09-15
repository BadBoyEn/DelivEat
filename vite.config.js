import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DelivEat/',                 // -- COMMENTO -- ok se ti serve per deploy (es. GitHub Pages). In dev non incide
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  },
  server: {
    port: 3000,
    strictPort: true,                 // -- COMMENTO -- resta SEMPRE 3000 (coerente con whitelist CORS del BE)
    proxy: {
      // -- COMMENTO -- Proxy API: inoltra e permette i cookie (withCredentials)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,           // -- COMMENTO -- setta Origin = target (aiuta CORS)
        secure: false                 // -- COMMENTO -- ok in http locale
      },

      // -- COMMENTO -- Proxy WebSocket per Socket.IO
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,                     // -- COMMENTO -- abilita WebSocket
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: { 
    outDir: 'dist',
    sourcemap: true                   // -- COMMENTO -- abilita mappe sorgenti in build prod → stack leggibili
  }
})
