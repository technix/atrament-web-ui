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
      "website": "https://atrament.ink/",
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

const DEFAULT_ICON = 'maskable-icon-512x512.png';
const DEFAULT_ORIENTATION = 'portrait';

const APP_DIR = 'build/.tmp_standalone';
const APP_WWW_DIR = `${APP_DIR}/resources`;
const BUILD_DIR = 'build/.cache_android_build';
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

const androidConfig = cfg.platform?.android;

const CORDOVA_CONFIG = {
  id: androidConfig?.id,
  name: androidConfig?.name,
  version: androidConfig?.version,
  description: androidConfig?.description,
  author: androidConfig?.author,
  email: androidConfig?.email,
  website: androidConfig?.website,
  icon: androidConfig?.icon || `www/${DEFAULT_ICON}`,
  orientation: androidConfig?.orientation || DEFAULT_ORIENTATION
};

const missing_keys = Object.keys(CORDOVA_CONFIG).filter((k) => !CORDOVA_CONFIG[k]);
if (missing_keys.length > 0) {
  console.log("[!] ERROR: missing Android configuration options in atrament.config.json");
  missing_keys.forEach(k => console.log(`- platform.android.${k}`));
  process.exit(1);
}

const BUILDTYPE = androidConfig?.debug ? 'debug' : 'release';


const docker = new Docker();

function prepareAndroidBuild() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  }
  if (!fs.existsSync(BUILD_WWW_DIR)) {
    fs.mkdirSync(BUILD_WWW_DIR);
  }
  console.log('>>> Copy app files to build dir');
  shell.mv('-f', `${APP_WWW_DIR}/*`, `${BUILD_WWW_DIR}`);
  console.log('>>> Configure Android project');
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
  shell.cp('-f', CORDOVA_BUILD_SH, BUILD_DIR);
  shell.cp('-f', CORDOVA_BUILD_JSON, BUILD_DIR);
}

function copyAndroidPackages() {
  const builtPackages = [];
  const packageName = `${CORDOVA_CONFIG.name}-${BUILDTYPE}`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  const APK_FILE = `${BUILD_DIR}/platforms/android/app/build/outputs/apk/${BUILDTYPE}/app-${BUILDTYPE}.apk`;
  const APK_OUTPUT = `${OUTPUT_DIR}/${packageName}.apk`;
  if (fs.existsSync(APK_FILE)) {
    console.log(`>>> Copying APK (standalone Android package) to ${OUTPUT_DIR}`);
    shell.cp('-f', APK_FILE, APK_OUTPUT);
    builtPackages.push(APK_OUTPUT);
  }
  const AAB_FILE = `${BUILD_DIR}/platforms/android/app/build/outputs/bundle/${BUILDTYPE}/app-${BUILDTYPE}.aab`;
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
  const projectPath = path.resolve(process.cwd(), BUILD_DIR);
  docker.run(
    DOCKER_BUILDER,
    ['bash', '-c', '/app/build.sh'],
    process.stdout,
    {
      // User: `${UID}:${GID}`,
      Env: [
        // `GRADLE_USER_HOME=/tmp/.gradle`,
        `ORGNAME=${CORDOVA_CONFIG.author.replaceAll(' ', '_')}`,
        `BUILDCONFIG=${BUILDTYPE}`
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
      const builtPackages = copyAndroidPackages();
      cleanup();
      console.log(`>>> Android build successful.`);
      builtPackages.forEach(p => console.log(`* ${p}`));
    }
  );
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
      prepareAndroidBuild();
      // run builder
      runAndroidBuild();
    }
  }
}

console.log('>>> Starting Android build.');
process.stdout.write(`>>> Pulling Docker image ${DOCKER_BUILDER} `);
docker.pull(`${DOCKER_BUILDER}:latest`, followPullProgress);

