import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/api-proxy': 'http://127.0.0.1:5000',
      '/ws-proxy': { target: 'ws://127.0.0.1:5000', ws: true },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
