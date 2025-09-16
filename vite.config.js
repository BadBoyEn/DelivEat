// -- COMMENTO -- Config Vite: proxy solo in DEV, base corretta per deploy root
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // -- COMMENTO -- su Vercel/Netlify la app è alla root
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
    dedupe: ['react', 'react-dom'] // -- COMMENTO -- evita doppie copie in HMR
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      // -- COMMENTO -- In DEV chiamo /api → backend locale
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      // -- COMMENTO -- WebSocket (se usi socket.io in dev)
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  optimizeDeps: { include: ['react', 'react-dom'] } // -- COMMENTO -- prebundle esplicito
})
