import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist/',
  server: {
    host: '0.0.0.0',
    port: 3007,
    /*host: '0.0.0.0', (DOCKER)*/
  },
  plugins: [react()]
})
