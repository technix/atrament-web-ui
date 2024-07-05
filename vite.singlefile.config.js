import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'path';

import atramentCfg from './atrament.config.json';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    VITE_SINGLEFILE: true,
  },
  plugins: [
    preact(),
    createHtmlPlugin({
      inject: {
        data: {
          title: atramentCfg.name,
          description: atramentCfg.description
        },
      },
    }),
    viteSingleFile()
  ],
  resolve: {
    alias: [
      { find: 'src', replacement: "/src" },
      { find: 'inkjs', replacement: '/node_modules/inkjs/dist/ink.mjs' }
    ],
  },
  server: {
    port: 8900
  },
  build: {
    outDir: 'singlefile',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.singlefile.html'),
      },
    },
  },
  publicDir: false,
  base: './',
  experimental: {
    renderBuiltUrl(filename, { type, hostType }) {
      if (type === 'asset') {
        if (hostType === 'html') {
          // apply "base: './'" to HTML template
          return `./${filename}`;
        }
        if (hostType === 'css') {
          // fix issue with CSS fonts
          return filename.replace('assets/','');
        }
      }
      return filename;
    },
  },
});
