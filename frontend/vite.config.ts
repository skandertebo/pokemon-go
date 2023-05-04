import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],

  server: {
    https: true,
    cors: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8000',
        secure: false
      }
    }
  }
});
