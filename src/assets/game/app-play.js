const fs = require('fs');
const inquirer = require('inquirer'); // eslint-disable-line import/no-extraneous-dependencies
const Atrament = require('../build/atrament');

const gameConfig = {
  episodes: [
    process.argv[2]
  ]
};

// Promise-based file loader, return file contents when resolved
function fileLoader(filename) {
  return new Promise((resolve) => {
    fs.readFile(filename, (err, data) => {
      resolve(data);
    });
  });
}

const atrament = new Atrament(gameConfig);

atrament.on('loadStory', fileLoader);
atrament.on('loadGame', fileLoader);
atrament.on('saveGame', (p) => new Promise((resolve) => {
  fs.writeFile(p.id, JSON.stringify(p.data), () => {
    console.log('Game saved');
    resolve();
  });
}));
atrament.on('error', (e) => console.error(e));

// register observers
atrament.registerObservers({
  forceful: (...params) => { console.log(params); },
  evasive: (...params) => { console.log(params); }
});

// register fjunctions
atrament.registerFunctions({
  raise: (...params) => { console.log('RAISE CALLED', params); }
});


atrament.registerCommand('IMG', (url) => `<img src="${url}">`);
atrament.registerCommand(
  'CLEAR',
  (params, episode) => { episode.reset(); return false; },
  ['episode']
);

/*
setTimeout(() => {
  atrament.saveGame('savefile.json');
}, 2000);
*/

// atrament.loadGame('save.json').then(renderScene);

atrament.startGame().then(renderScene);

function renderScene() {
  const scene = atrament.renderScene();
  console.log(scene.text.join(''));
  if (!scene.choices.length) {
    gameOver();
    return;
  }
  const choices = scene.choices.map(
    (t) => ({name: t.choice, value: t.id})
  );
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: ' ',
      choices
    }
  ]).then((v) => {
    atrament.makeChoice(v.choice)
      .then(renderScene)
      .catch(gameOver);
  });
}

function gameOver() {
  console.log('END.');
}
