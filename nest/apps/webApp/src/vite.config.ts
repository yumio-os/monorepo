import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  root: resolve(__dirname), // Set the root to the directory containing vite.config.ts
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
      input: {
        kiosk: resolve(__dirname, 'kiosk.html'),
      },
      output: {
        // This config only affects JS chunks:
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-com-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    target: 'esnext',
  },
  resolve: { alias: { '@': resolve(__dirname) } },
});
