import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.onrender.com',
      'shipment-tracker-1b7s.onrender.com'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
