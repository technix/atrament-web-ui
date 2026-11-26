export default function getPWAConfig(atramentCfg) {
  let pwaConfig = {
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
      config: 'vite/pwa-assets.config.js'
    }
  };

  if (atramentCfg.game.zip) {
    const gamePath = atramentCfg.game.path.replace(/^(\.?\/)+|\/+$/g, '');
    // game folder is packed into zip and removed from the build,
    // so exclude its files but keep other public assets
    pwaConfig.includeAssets = [ ...pwaConfig.includeAssets, `!${gamePath}/**` ];
    // precache the zip itself
    pwaConfig.workbox.globPatterns = [ ...pwaConfig.workbox.globPatterns, atramentCfg.game.zip ];
    // generate service worker after zip is created
    pwaConfig.integration = { closeBundleOrder: 'post' };
  }

  return pwaConfig;
}
