import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { instructions } from '@vite-pwa/assets-generator/api/instructions';
import { generateAssets } from '@vite-pwa/assets-generator/api/generate-assets';

import pwaAssetsConfig from './pwa-assets.config.js';

// Generates app icons (the same set as PWA assets generator used by vite-plugin-pwa)
// without the PWA itself (manifest, service worker).
// Used for standalone builds: Neutralino and Cordova use these icons.
export function generatePWAIcons() {
  let root;
  let publicDir;
  let outDir;

  return {
    name: 'generate-pwa-icons',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      publicDir = config.publicDir;
      outDir = path.resolve(root, config.build.outDir);
    },
    async closeBundle() {
      const { preset, images, headLinkOptions } = pwaAssetsConfig;
      const imageFile = path.resolve(root, Array.isArray(images) ? images[0] : images);
      // image name relative to publicDir defines the output folder for icons
      const imageName = path.relative(publicDir, imageFile);
      const assetsInstructions = await instructions({
        imageResolver: () => readFile(imageFile),
        imageName,
        preset,
        faviconPreset: headLinkOptions?.preset,
        // the same defaults as in vite-plugin-pwa
        htmlLinks: { xhtml: false, includeId: false },
        basePath: './',
        resolveSvgName: (name) => path.basename(name)
      });
      await generateAssets(
        assetsInstructions,
        true,
        path.dirname(path.resolve(outDir, imageName))
      );
    }
  };
}
