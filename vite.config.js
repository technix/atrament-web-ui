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
  const isTemplateBuild = process.argv.includes('--template');
  const inkCompileFormat = atramentCfg.game.format || (mode === 'singlefile' ? 'js' : 'json');
  
  const atramentConfig = { ...atramentCfg, game: { ...atramentCfg.game } };
  atramentConfig.game.script = `${atramentConfig.game.source}.${inkCompileFormat}`;
  delete atramentConfig.game.source;

  if (isTemplateBuild) {
    console.log("### Building template for atrament-wizard\n");
    atramentConfig.name = "Atrament UI";
    atramentConfig.short_name = "atrament-web-ui-template";
    atramentConfig.description = "A game built with Atrament";
    atramentConfig.game.script = '%INK_SCRIPT%';
    atramentConfig.game.path = '.';
  }

  const neutralinoTemplate = mode === 'standalone'
    ? '<script src="./neutralino.js"></script><script>Neutralino.init();</script>'
    : '';

  const plugins = [
    preact(),
    createHtmlPlugin({
      inject: {
        data: {
          title: atramentConfig.name,
          description: atramentConfig.description,
          neutralino: neutralinoTemplate,
          atrament_language: atramentConfig.language,
          atrament_config_json: JSON.stringify(atramentConfig)
        },
      },
    }),
    watchInkFiles(inkCompileFormat),
    compileInk(inkCompileFormat),
    removeInkFilesFromBuild(),
  ]

  let buildDir = 'build/web';
  let rollupOptions = {
    output: {
      manualChunks: {
        inkjs: ['inkjs'],
        atrament: ['@atrament/web']
      }
    }
  };

  if (mode === 'singlefile') {
    plugins.push(viteSingleFile());
    buildDir = 'build/singlefile';
    rollupOptions = {};
    if (isTemplateBuild) {
      buildDir = 'build/atrament-wizard-template';
    }
  } else if (mode === 'standalone') {
    plugins.push(VitePWA(getPWAConfig(atramentConfig)));
    buildDir = 'build/.tmp_neutralino/resources';
  } else if (mode === 'production') {
    plugins.push(VitePWA(getPWAConfig(atramentConfig)));
    if (atramentConfig.game.zip) {
      const gameDir = `${buildDir}/${atramentConfig.game.path}`;
      plugins.push(zipPack({
        inDir: gameDir,
        outDir: buildDir,
        outFileName: atramentConfig.game.zip
      }));
      // delete game folder after zipping
      plugins.push(CleanBuild({
        outputDir: buildDir,
        patterns: [
          atramentConfig.game.path,
        ]
      }));
    }
  }

  return {
    plugins,
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __EMBED_FONTS__: process.argv.includes('--embed-fonts')
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
      outDir: buildDir,
      rollupOptions
    },
    publicDir: 'root',
    base: ''
  };
});
