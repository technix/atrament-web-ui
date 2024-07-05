import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import fs from 'fs';

import atramentCfg from './atrament.config.json';

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
    removeInkFilesFromBuild(),
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
    outDir: 'build_singlefile'
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
