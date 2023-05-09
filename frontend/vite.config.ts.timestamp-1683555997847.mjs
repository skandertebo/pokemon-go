// vite.config.ts
import { defineConfig } from "file:///C:/Users/Asus/pokemon-go/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Asus/pokemon-go/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mkcert from "file:///C:/Users/Asus/pokemon-go/frontend/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { VitePWA } from "file:///C:/Users/Asus/pokemon-go/frontend/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      injectRegister: "script",
      workbox: {
        globPatterns: ["**/*"],
        maximumFileSizeToCacheInBytes: 5e8
      },
      strategies: "generateSW",
      includeAssets: ["**/*"],
      manifest: {
        name: "Pokemon Go",
        short_name: "PokeGo",
        description: "Pokemon Go Clone PWA",
        theme_color: "#F0F3D1",
        icons: [
          {
            src: "/images/pokeball.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "images/pokeball.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  server: {
    https: true,
    port: 3e3,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://127.0.0.1:8000",
        secure: false
      },
      "/.well-known/mercure": {
        target: "http://localhost:8080",
        rewrite: (path) => path.replace(/^\/\.well-known\/mercure\//, ""),
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBc3VzXFxcXHBva2Vtb24tZ29cXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFzdXNcXFxccG9rZW1vbi1nb1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQXN1cy9wb2tlbW9uLWdvL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JztcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBta2NlcnQoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgaW5qZWN0UmVnaXN0ZXI6ICdzY3JpcHQnLFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyonXSxcclxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNTAwMDAwMDAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cmF0ZWdpZXM6ICdnZW5lcmF0ZVNXJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWycqKi8qJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ1Bva2Vtb24gR28nLFxyXG4gICAgICAgIHNob3J0X25hbWU6ICdQb2tlR28nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUG9rZW1vbiBHbyBDbG9uZSBQV0EnLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI0YwRjNEMScsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnL2ltYWdlcy9wb2tlYmFsbC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3Bva2ViYWxsLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaHR0cHM6IHRydWUsXHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly8xMjcuMC4wLjE6ODAwMCcsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICAnLy53ZWxsLWtub3duL21lcmN1cmUnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvXFwud2VsbC1rbm93blxcL21lcmN1cmVcXC8vLCAnJyksXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUixTQUFTLG9CQUFvQjtBQUM1VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLE1BQU07QUFBQSxRQUNyQiwrQkFBK0I7QUFBQSxNQUNqQztBQUFBLE1BQ0EsWUFBWTtBQUFBLE1BQ1osZUFBZSxDQUFDLE1BQU07QUFBQSxNQUN0QixVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLHdCQUF3QjtBQUFBLFFBQ3RCLFFBQVE7QUFBQSxRQUNSLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSw4QkFBOEIsRUFBRTtBQUFBLFFBQ2hFLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
