import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy `/api` requests to the backend to avoid CORS during local development
      '/api': {
        target: 'https://food-backend-rouge.vercel.app',
        changeOrigin: true,
        secure: true,
        // keep path as-is so /api/food -> https://food-backend-rouge.vercel.app/api/food
      },
    },
  },
})
