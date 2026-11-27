import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['5173-if5a15w0s7tralk5p8hqi-c44aba8d.sg2.manus.computer'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
