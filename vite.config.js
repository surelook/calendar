import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          gaId: process.env.VITE_GA_ID || '',
        },
      },
    }),
  ],
})