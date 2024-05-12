const  { spawn } = require('node:child_process');
const cfg = require('./atrament.config.json');

const process = spawn('node',
  [
    'node_modules/inkjs/dist/inkjs-compiler.js',
    `src/${cfg.game.path}/${cfg.game.source}`,
    '-o',
    `src/${cfg.game.path}/${cfg.game.script}`
  ]
);

process.stdout.on('data', (data) => {
  console.log(data.toString());
});

process.stderr.on('data', (data) => {
  console.error(data.toString());
});
