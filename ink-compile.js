const  { spawn } = require('node:child_process');
const cfg = require('./atrament.config.json');

const inputFile = `src/${cfg.game.path}/${cfg.game.source}`;
const outputFile = `src/${cfg.game.path}/${cfg.game.script}`;

console.log(`${inputFile} => ${outputFile}`);

const process = spawn('node',
  [
    'node_modules/inkjs/dist/inkjs-compiler.js',
    inputFile,
    '-o',
    outputFile
  ]
);

process.stdout.on('data', (data) => {
  console.log(data.toString());
});

process.stderr.on('data', (data) => {
  console.error(data.toString());
});
