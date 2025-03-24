const fs = require('node:fs');
const cfg = require('../atrament.config.json');

const neutralinoConfig = {
  $schema: "https://raw.githubusercontent.com/neutralinojs/neutralinojs/main/schemas/neutralino.config.schema.json",
  applicationId: cfg.short_name || "atrament.neutralino.ui",
  version: cfg.version || "1.0.0",
  defaultMode: "window",
  port: 0,
  documentRoot: "/resources/",
  url: "/",
  enableServer: true,
  enableNativeAPI: true,
  tokenSecurity: "one-time",
  logging: {
    enabled: false
  },
  nativeAllowList: [
    "app.*",
    "storage.*",
    "window.*"
  ],
  modes: {
    window: {
      title: cfg.name || "Atrament UI",
      width: 600,
      height: 800,
      minWidth: 400,
      minHeight: 600,
      center: true,
      fullScreen: false,
      alwaysOnTop: false,
      icon: "/resources/pwa-512x512.png",
      enableInspector: false,
      borderless: false,
      maximize: true,
      hidden: false,
      resizable: true,
      exitProcessOnClose: true
    },
    browser: {
      nativeBlockList: [
        "filesystem.*"
      ]
    }
  },
  cli: {
    binaryName: cfg.name ?  cfg.name.replace(/ /g, '_') : "Atrament_UI",
    resourcesPath: "/resources/",
    extensionsPath: "/extensions/",
    clientLibrary: "/resources/neutralino.js"
  }
};

fs.writeFileSync(
  "build/.tmp_neutralino/neutralino.config.json",
  JSON.stringify(neutralinoConfig, undefined, "  ")
);
