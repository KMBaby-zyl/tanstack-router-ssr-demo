import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    // TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  ssr: {
    // SSR 特定配置
    noExternal: ['react-router-dom', '@tanstack/react-router'],
  },
}) 