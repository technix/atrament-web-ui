import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import zipPack from "vite-plugin-zip-pack";
import CleanBuild from 'vite-plugin-clean-build';

import { compileInk, watchInkFiles } from './vite/ink-compiler-plugin';
import { removeInkFilesFromBuild } from './vite/remove-ink-files-plugin';
import getPWAConfig from './vite/pwa-config';

import atramentCfg from './atrament.config.json';

export default defineConfig(({ mode }) => {
  const inkCompileFormat = atramentCfg.game.format || (mode === 'singlefile' ? 'js' : 'json');

  const plugins = [
    preact(),
    createHtmlPlugin({
      inject: {
        data: {
          title: atramentCfg.name,
          description: atramentCfg.description
        },
      },
    }),
    watchInkFiles(inkCompileFormat),
    compileInk(inkCompileFormat),
    removeInkFilesFromBuild(),
  ]

  let buildDir = 'build';

  if (mode === 'singlefile') {
    plugins.push(viteSingleFile());
    buildDir = 'build_singlefile';
  } else if (mode === 'production') {
    plugins.push(VitePWA(getPWAConfig(atramentCfg)));
    if (atramentCfg.game.zip) {
      const gameDir = `build/${atramentCfg.game.path}`;
      plugins.push(zipPack({
        inDir: gameDir,
        outDir: 'build',
        outFileName: atramentCfg.game.zip
      }));
      // delete game folder after zipping
      plugins.push(CleanBuild({
        outputDir: 'build',
        patterns: [
          atramentCfg.game.path,
        ]
      }));
    }
  }

  return {
    plugins,
    define: {
      __INK_SCRIPT__: JSON.stringify(`${atramentCfg.game.source}.${inkCompileFormat}`),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
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
      outDir: buildDir
    },
    publicDir: 'root',
    base: ''
  };
});
