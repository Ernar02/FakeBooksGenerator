import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import plugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [plugin(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../BooksApp.Server/wwwroot',
    emptyOutDir: true,
  },
  base: './',
});
