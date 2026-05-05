import { defineConfig } from 'vite'

export default defineConfig({
  base: '/calendar/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
