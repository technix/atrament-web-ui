import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';

import atramentCfg from './atrament.config.json';

function watchInkFiles() {
  return {
    name: 'watch-ink-files-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ink')) {
        const res = spawnSync('node', ['ink-compile.cjs']);
        [ res.stdout.toString(), res.stderr.toString() ].forEach(
          (item) => item && console.log(item)
        );
        server.hot.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
  }
}

function findFiles(startPath, filter, callback) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findFiles(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  });
}

function removeInkFilesFromBuild() {
  return {
    name: 'remove-files-from-build',
    enforce: 'post',
    apply: 'build',
    writeBundle(options) {
      findFiles(options.dir, /\.ink$/, (item) => {
        console.log(`Removing Ink file from bundle: ${item}`);
        fs.unlinkSync(item);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/!(*.ink)'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
      },
      manifest: {
        name: atramentCfg.name,
        short_name: atramentCfg.short_name,
        description: atramentCfg.description,
        start_url: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#fff",
        theme_color: "#673ab8",
        icons: [
          {
            src: "./pwa-192x192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "./pwa-512x512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      },
      pwaAssets: {
        config: 'pwa-assets.config.js'
      }
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: atramentCfg.name,
          description: atramentCfg.description
        },
      },
    }),
    watchInkFiles(),
    removeInkFilesFromBuild()
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
    outDir: 'build'
  },
  publicDir: 'root',
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
