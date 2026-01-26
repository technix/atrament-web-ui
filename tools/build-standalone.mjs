import fs from 'node:fs';
import shell from 'shelljs';
import { zip } from 'zip-a-folder';
import { readdir } from 'node:fs/promises';

const TOOLS_DIR = 'tools/neutralino';
const BUILD_DIR = 'build/.tmp_neutralino';
const OUTPUT_DIR = 'build/standalone';

// stop script in case of failures
shell.config.fatal = true;

const cfg = JSON.parse(fs.readFileSync('atrament.config.json', 'utf8'));

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

async function makeArchives() {
  const files = await readdir('.');
  const appName = files[0];
  await zip('**/*-linux_*, **/*.neu', `${appName}-linux.zip`);
  await zip('**/*-mac_*, **/*.neu', `${appName}-mac.zip`);
  await zip('**/*-win_*, **/*.neu', `${appName}-windows.zip`);
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
  shell.pushd('-q', TOOLS_DIR);
  shell.exec('npx neu update');
  shell.popd('-q');

  if (!fs.existsSync(`${TOOLS_DIR}/bin`)) {
    console.error("Failed to install Neutralino");
    process.exit(1);
  }
}

// 3. Copy Neutralino files to build dir

console.log('>>> Copy Neutralino binaries to build dir');
shell.cp('-rf', `${TOOLS_DIR}/*`, BUILD_DIR);

// 4. Neutralino build
console.log('>>> Building Neutralino app');
shell.pushd('-q', BUILD_DIR);
shell.exec('neu build');
shell.popd('-q');
if (fs.existsSync(OUTPUT_DIR)) {
  shell.rm('-rf', OUTPUT_DIR);
}
shell.mkdir('-p', OUTPUT_DIR);
shell.mv(`${BUILD_DIR}/dist/*`, OUTPUT_DIR);
shell.rm('-rf', BUILD_DIR);

console.log('>>> Creaing archives');
shell.cd(OUTPUT_DIR);
makeArchives();

console.log('>>> Standalone build complete.');
