import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure base is just a slash
  base: '/',
  build: {
    // Increase chunk size limit to prevent minification drops
    chunkSizeWarningLimit: 1600,
  }
})