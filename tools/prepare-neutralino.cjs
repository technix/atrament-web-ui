const { spawn } = require('node:child_process');
const fs = require('node:fs');
const copy = require('recursive-copy');
const cfg = require('../atrament.config.json');

const TOOLS_DIR = 'tools/neutralino';
const BUILD_DIR = 'build/.tmp_neutralino';

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



function copyNeutralinoFiles() {
  console.log('>>> Copy Neutralino binaries to build dir');
  copy(TOOLS_DIR, BUILD_DIR, { overwrite: true })
    .then((results) => {
      console.info(`Copied ${results.length} files`);
    }).catch((error) => {
      console.error(`Copy failed: ${error}`);
    });
}


// 1. Create config file

if (!fs.existsSync(TOOLS_DIR)) {
  console.log(`>>> Create tools directory ${TOOLS_DIR}`);
  fs.mkdirSync(TOOLS_DIR);
}
console.log('>>> Generate neutralino.config.json');
fs.writeFileSync(
  `${TOOLS_DIR}/neutralino.config.json`,
  JSON.stringify(neutralinoConfig, undefined, "  ")
);

// 2. Download Neutralino binaries, if needed

if (!fs.existsSync(`${TOOLS_DIR}/bin`)) {
  console.log('>>> Download Neutralino binaries');
  const neu = spawn('npx', ['neu', 'update'], { cwd: TOOLS_DIR, shell: true });
  
  neu.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  neu.stderr.on('data', (data) => {
    console.error(`ERROR: ${data.toString()}`);
  });
  
  neu.on('close', (code) => {
    if (!fs.existsSync(`${TOOLS_DIR}/bin`)) {
      console.error("Failed to install Neutralino");
      process.exit(1);
    } else {
      copyNeutralinoFiles();
    }
  });
} else {
  copyNeutralinoFiles();
}
