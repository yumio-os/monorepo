import { resolve } from 'path';
// import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  root: resolve(__dirname), // Set the root to the directory containing vite.config.ts
  // plugins: [devtools(), solidPlugin()],
  plugins: [solidPlugin()],
  server: {
    port: 3001,
    watch: {
      usePolling: true, // Use polling to watch for changes in files
    },
  },
  build: {
    outDir: resolve(__dirname, '../../../dist/apps/webApp'), // Ensure the output directory is correctly set
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // Ensure Vite can find the index.html
    },
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
});
