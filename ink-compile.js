const  { spawn } = require('node:child_process');
const cfg = require('./atrament.config.json');

if (!cfg.game.source) {
  process.exit(0);
}

const inputFile = `src/${cfg.game.path}/${cfg.game.source}`;
const outputFile = `src/${cfg.game.path}/${cfg.game.script}`;

console.log(`${inputFile} => ${outputFile}`);

const inkCompilerProcess = spawn('node',
  [
    'node_modules/inkjs/dist/inkjs-compiler.js',
    inputFile,
    '-o',
    outputFile
  ]
);

inkCompilerProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

inkCompilerProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});
