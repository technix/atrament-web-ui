const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const copy = require('recursive-copy');
const cfg = require('../atrament.config.json');

const TOOLS_DIR = 'tools/neutralino';

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



// 1. Create config file

if (!fs.existsSync(TOOLS_DIR)) {
  fs.mkdirSync(TOOLS_DIR);
}
fs.writeFileSync(
  `${TOOLS_DIR}/neutralino.config.json`,
  JSON.stringify(neutralinoConfig, undefined, "  ")
);

// 2. Download Neutralino binaries, if needed

if (!fs.existsSync(`${TOOLS_DIR}/bin`)) {
  console.info(`Downloading Neutralino binaries...`);
  const res = spawnSync('npm', ['run', 'install-neutralino']);
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => item && console.log(item)
  );
}
if (!fs.existsSync(`${TOOLS_DIR}/bin`)) {
  console.error("Failed to install Neutralino");
  process.exit(1);
}

// 3. Copy Neutralino to builddir

copy(TOOLS_DIR, "build/.tmp_neutralino", { overwrite: true })
  .then((results) => {
    console.info(`Copied ${results.length} files`);
  }).catch((error) => {
    console.error(`Copy failed: ${error}`);
  });
