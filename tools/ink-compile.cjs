/* 
  Compiles Ink to JSON, using Inklecate compiler for host OS.
  To enforce using JS compiler from InkJS, add this line to attrament.config.json:
    "inkjscompiler": true
*/

const  { spawn, spawnSync } = require('node:child_process');
const os = require('node:os');
const fs = require('node:fs');

const cfg = require('../atrament.config.json');

if (!cfg.game.source) {
  process.exit(0);
}

const format = process.argv[2] || 'json';

const inputFile = `root/${cfg.game.path}/${cfg.game.source}`;
const outputFile = `root/${cfg.game.path}/${cfg.game.source}.${format}`;

function removeOldCompiledScript(name) {
  if (fs.existsSync(name)) {
    fs.unlinkSync(name);
  }
}

function checkInstallInklecate(compiler) {
  if (!fs.existsSync(compiler)) {
    // let's try to install inklecate
    console.log("Inklecate compiler is not found, installing from GitHub...");
    const res = spawnSync('node', ['tools/install-inklecate.cjs']);
    [ res.stdout.toString(), res.stderr.toString() ].forEach(
      (item) => item && console.log(item)
    );
  }
  if (!fs.existsSync(compiler)) {
    console.error("Failed to install Inklecate");
    process.exit(1);
  }
}

const runInklecate = (cmd, ...args) => {
  console.log('>>>', cmd, args.join(' '));

  const inkCompilerProcess = spawn(cmd, args);

  inkCompilerProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  inkCompilerProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  inkCompilerProcess.on('close', () => {
    if (format === 'js') {
      // convert json output to JS
      const content = fs.readFileSync(outputFile, { encoding: 'utf8', flag: 'r' });
      const output = `var storyContent = ${content};`;
      fs.writeFileSync(outputFile, output);
    }
  });
}

const inklecateRun = {
  js: ['node', 'node_modules/inkjs/dist/inkjs-compiler.js', inputFile, '-o', outputFile],
  win32: ['tools/inklecate/inklecate.exe', '-o', outputFile, inputFile],
  linux: ['tools/inklecate/inklecate', '-o', outputFile, inputFile],
  darwin: ['tools/inklecate/inklecate', '-o', outputFile, inputFile]
}

let env = 'js';
if (!cfg.inkjscompiler) {
  env = os.platform();
  if (!['win32', 'linux', 'darwin'].includes(env)) {
    console.log(`Unsupported OS (${env}), falling back to JS compiler.`);
    env = 'js';
  } else {
    // check if compiler is installed
    checkInstallInklecate(inklecateRun[env][0]);
    // ensure Ink compiler is executable
    fs.chmodSync(inklecateRun[env][0], '755');
  }
}

// clean old compiles
removeOldCompiledScript(`${inputFile}.js`);
removeOldCompiledScript(`${inputFile}.json`);
// run compiler
runInklecate(...inklecateRun[env]);
