import fs from 'node:fs';
import shell from 'shelljs';
import Docker from 'dockerode';

// stop script in case of failures
shell.config.fatal = true;

const cfg = JSON.parse(fs.readFileSync('atrament.config.json', 'utf8'));

const APP_DIR = 'build/.tmp_standalone';
const BUILD_DIR = 'build/.tmp_android_build';
const BUILD_WWW_DIR = 'build/.tmp_android_build/www';
const OUTPUT_DIR = 'build/android';

const DOCKER_BUILDER = 'frenzytechnix/atrament-android-builder';

const docker = new Docker();

function prepareAndroidBuild() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  }
  if (!fs.existsSync(BUILD_WWW_DIR)) {
    fs.mkdirSync(BUILD_WWW_DIR);
  }
  console.log('>>> Copy app files to build dir');
  shell.mv('-rf', `${APP_DIR}/*`, `${BUILD_WWW_DIR}`);
  console.log('>>> Configure Android project');
  // TODO: create configuration files
}

function cleanup() {
  shell.rm('-rf', APP_DIR);
  shell.rm('-rf', BUILD_DIR);
}


function runAndroidBuild() {
  docker.run(
    DOCKER_BUILDER,
    ['bash', '-c', 'uname -a'],
    process.stdout,
    {
      HostConfig: {
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

  function onFinished(err) {
    if (err) {
      console.error(' Pull failed:', err);
      throw err;
    } else {
      console.log(' Done.');
      // run builder
      runAndroidBuild();
    }
  }
}

console.log('>>> Starting Android build.');
process.stdout.write(`>>> Pulling Docker image ${DOCKER_BUILDER} `);
docker.pull(`${DOCKER_BUILDER}:latest`, followPullProgress);

