
import { Story } from 'inkjs';
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('atrament.config.json', 'utf8'));

const storyFile = `root/${cfg.game.path}/${cfg.game.source}.json`;

if (!fs.existsSync(storyFile)) {
  console.log(`>>> Can't find Ink story ${storyFile}`);
  process.exit(0);
}

const storyContent = fs.readFileSync(storyFile, 'utf8');

const storyVisits = {};


function playGame(storyContent) {
  const story = new Story(storyContent);
  const storyContinues = true;
  while (storyContinues) {
    const choices = continueStory(story);
    if (!choices.length) {
      break;
    }
    const selected = Math.floor(Math.random() * choices.length);
    story.ChooseChoiceIndex(choices[selected].id);
  }
  parseStoryState(story.state);
}

function continueStory(story) {
  while (story.canContinue) {
    story.Continue();
  }
  const choices = [];
  story.currentChoices.forEach((choice, id) => choices.push({id}));
  return choices;
}

function parseStoryState(state) {
  for (let item of state._visitCounts) {
    const knot = item[0];
    const visits = item[1];
    if (storyVisits[knot]) {
      storyVisits[knot].plays++;
      storyVisits[knot].total += visits;
    } else {
      storyVisits[knot] = { 
        plays: 1,
        total: visits
      }
    }
  }
}

const numPlays = 1000;
for (let i = 0; i < numPlays; i++) {
  playGame(storyContent);
}

Object.values(storyVisits).forEach(data => {
  data.percent = Math.floor((data.plays / numPlays) * 100);
});
console.log(storyVisits);
