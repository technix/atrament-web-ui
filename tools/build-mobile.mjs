import fs from 'node:fs';
import path from 'node:path';
import shell from 'shelljs';
import Docker from 'dockerode';
import Mustache from 'mustache';

/*
Example Android configuration in atrament.config.json:

  "platform": {
    "android": {
      "id": "demo.ink.atrament",
      "name": "Atrament Web UI demo",
      "description": "Atrament Web UI - shell for Ink games",
      "version": "1.0.0",
      "author": "Serhii Mozhaiskyi",
      "email": "sergei.mozhaisky@gmail.com",
      "website": "https://atrament.ink/"
    }
  }

  Additional keys:
  * "orientation": "landscape" (portrait by default)
  * "debug": true (if set, the app is built with debug support)

*/

// const UID = process.getuid();
// const GID = process.getgid();

// stop script in case of failures
shell.config.fatal = true;

const TARGET_PLATFORM = process.argv[2] || 'android';

const DEFAULT_ICON = 'pwa-512x512.png';
const DEFAULT_ORIENTATION = 'portrait';

const APP_DIR = 'build/.tmp_standalone';
const APP_WWW_DIR = `${APP_DIR}/resources`;
const BUILD_DIR = TARGET_PLATFORM === 'android' ? 'build/.cache_android_build' : 'build/ios';
const BUILD_WWW_DIR = `${BUILD_DIR}/www`;
const OUTPUT_DIR = 'build/android';

const TOOLS_DIR = 'tools/cordova';

const CORDOVA_PACKAGE_JSON = `${TOOLS_DIR}/package.json.template`;
const CORDOVA_CONFIG_XML = `${TOOLS_DIR}/config.xml.template`;
const CORDOVA_BUILD_SH = `${TOOLS_DIR}/build.sh`;
const CORDOVA_BUILD_JSON = `${TOOLS_DIR}/build.json`;

const DOCKER_BUILDER = 'frenzytechnix/atrament-android-builder';


// read Atrament config
const cfg = JSON.parse(fs.readFileSync('atrament.config.json', 'utf8'));

const mobileConfig = cfg.platform?.[TARGET_PLATFORM];

const CORDOVA_CONFIG = {
  id: mobileConfig?.id,
  name: mobileConfig?.name,
  version: mobileConfig?.version,
  description: mobileConfig?.description,
  author: mobileConfig?.author,
  email: mobileConfig?.email,
  website: mobileConfig?.website,
  icon: `www/${mobileConfig?.icon || DEFAULT_ICON}`,
  orientation: mobileConfig?.orientation || DEFAULT_ORIENTATION
};

const PACKAGETYPE = mobileConfig?.debug ? 'debug' : 'release';
let CLEARBUILD = "";

const docker = new Docker();

function prepareMobileBuild() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  } else {
    // check if package name was changed
    const existingConfig = JSON.parse(fs.readFileSync(`${BUILD_DIR}/package.json`, 'utf8'));
    if (existingConfig.name !== CORDOVA_CONFIG.id) {
      CLEARBUILD = 'clear'; // remove cached Android build
    }
  }
  if (!fs.existsSync(BUILD_WWW_DIR)) {
    fs.mkdirSync(BUILD_WWW_DIR);
  }
  console.log('>>> Move app files to build dir');
  shell.mv('-f', `${APP_WWW_DIR}/*`, `${BUILD_WWW_DIR}`);
  console.log('>>> Configuring Cordova project');
  const packageTemplate = fs.readFileSync(CORDOVA_PACKAGE_JSON, 'utf8');
  fs.writeFileSync(
    `${BUILD_DIR}/package.json`,
    Mustache.render(packageTemplate, CORDOVA_CONFIG)
  );
  const configTemplate = fs.readFileSync(CORDOVA_CONFIG_XML, 'utf8');
  fs.writeFileSync(
    `${BUILD_DIR}/config.xml`,
    Mustache.render(configTemplate, CORDOVA_CONFIG)
  );
  if (TARGET_PLATFORM === 'android') {
    shell.cp('-f', CORDOVA_BUILD_SH, BUILD_DIR);
    shell.cp('-f', CORDOVA_BUILD_JSON, BUILD_DIR);
  }
}

function copyAndroidPackages() {
  const builtPackages = [];
  const packageName = `${CORDOVA_CONFIG.id}-${PACKAGETYPE}`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  const APK_FILE = `${BUILD_DIR}/platforms/android/app/build/outputs/apk/${PACKAGETYPE}/app-${PACKAGETYPE}.apk`;
  const APK_OUTPUT = `${OUTPUT_DIR}/${packageName}.apk`;
  if (fs.existsSync(APK_FILE)) {
    console.log(`>>> Copying APK (standalone Android package) to ${OUTPUT_DIR}`);
    shell.cp('-f', APK_FILE, APK_OUTPUT);
    builtPackages.push(APK_OUTPUT);
  }
  const AAB_FILE = `${BUILD_DIR}/platforms/android/app/build/outputs/bundle/${PACKAGETYPE}/app-${PACKAGETYPE}.aab`;
  const AAB_OUTPUT = `${OUTPUT_DIR}/${packageName}.aab`;
  if (fs.existsSync(AAB_FILE)) {
    console.log(`>>> Copying AAB (bundle for Play Store) to ${OUTPUT_DIR}`);
    shell.cp('-f', AAB_FILE, AAB_OUTPUT);
    builtPackages.push(AAB_OUTPUT);
  }
  return builtPackages;
}

function cleanup() {
  shell.rm('-rf', APP_DIR);
  shell.rm('-rf', BUILD_WWW_DIR);
}


function runAndroidBuild() {
  let activeContainer;
  console.log('>>> Starting Cordova builder');
  const projectPath = path.resolve(process.cwd(), BUILD_DIR);
  const runner = docker.run(
    DOCKER_BUILDER,
    ['bash', '-c', '/app/build.sh'],
    process.stdout,
    {
      // User: `${UID}:${GID}`,
      Env: [
        // `GRADLE_USER_HOME=/tmp/.gradle`,
        `ORGNAME=${CORDOVA_CONFIG.author.replaceAll(' ', '_')}`,
        `PACKAGETYPE=${PACKAGETYPE}`,
        `CLEARBUILD=${CLEARBUILD}`
      ],
      HostConfig: {
        Binds: [`${projectPath}:/app`],
        AutoRemove: true
      }
    },
    (err, data) => {
      if (err) {
        console.log('>>> Android build failed.');
        throw err;
      }
      console.log(data);
      cleanup();
      if (data.StatusCode === 0) {
        const builtPackages = copyAndroidPackages();
        console.log(`>>> Android build successful.`);
        builtPackages.forEach(p => console.log(`* ${p}`));
      }
    }
  );

  runner.on('container', (container) => {
    activeContainer = container;
    console.log(`Docker container started: ${container.id}`);
  });

  process.on('SIGINT', async () => {
    if (activeContainer) {
      process.stdout.write('Stopping Docker container... ');
      try {
        await activeContainer.stop();
        console.log('Done.');
      } catch (err) {
        console.error(' Failed.', err?.message);
      }
    }
    process.exit(0);
  });
}

function followPullProgress(err, stream) {
  if (err) throw err;

  // Helper to process the stream and trigger callbacks
  docker.modem.followProgress(
    stream,
    onFinished,
    onProgress
  );

  function onProgress() {
    process.stdout.write('.');
  }

  function onFinished(pullError) {
    if (pullError) {
      console.error(' Pull failed:', pullError);
      throw pullError;
    } else {
      console.log(' Done.');
      // prepare project folder
      prepareMobileBuild();
      // run builder
      runAndroidBuild();
    }
  }
}


// ============================================================================================


// check for missing configuration keys
const missing_keys = Object.keys(CORDOVA_CONFIG).filter((k) => !CORDOVA_CONFIG[k]);
if (missing_keys.length > 0) {
  console.log("[!] ERROR: missing configuration options in atrament.config.json");
  missing_keys.forEach(k => console.log(`- platform.${TARGET_PLATFORM}.${k}`));
  process.exit(1);
}

if (TARGET_PLATFORM === 'ios') {
  console.log('>>> Preparing build.');
  // prepare Cordova project for iOS
  prepareMobileBuild();
  shell.pushd('-q', BUILD_DIR);
  shell.exec('npm install cordova');
  if (!fs.existsSync(`platforms/ios`)) {
    shell.exec('npx cordova platform add ios');
  }
  shell.popd('-q');
  shell.rm('-rf', APP_DIR);
  console.log(`>>> Cordova project for iOS created in ${BUILD_DIR} folder.`);
  console.log('>>> See Cordova documentation on building app for iOS: https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html');
  process.exit(0);
}

console.log('>>> Starting Android build.');
process.stdout.write(`>>> Pulling Docker image ${DOCKER_BUILDER} `);
docker.pull(`${DOCKER_BUILDER}:latest`, followPullProgress);

