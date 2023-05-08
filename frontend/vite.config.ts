import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: 500000000
      },
      strategies: 'generateSW',
      includeAssets: ['**/*'],
      manifest: {
        name: 'Pokemon Go',
        short_name: 'PokeGo',
        description: 'Pokemon Go Clone PWA',
        theme_color: '#F0F3D1',
        icons: [
          {
            src: '/images/pokeball.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/pokeball.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],

  server: {
    https: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8000',
        secure: false
      },
      '/.well-known/mercure': {
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/\.well-known\/mercure\//, ''),
        secure: false
      }
    }
  }
});
