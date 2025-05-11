
import { applicationID, gameFile, gamePath } from 'src/constants';

import muteWhenInactive from 'src/utils/mute-when-inactive';

import { loadDefaultFont, loadDefaultTheme } from 'src/atrament/load-defaults';
import { registerSettingsHandlers } from 'src/atrament/settings-handlers'
import registerSceneProcessors from 'src/atrament/scene-processors';
import registerExternalFunctions from 'src/atrament/externals';

import onGameStart from 'src/atrament/on-game-start';

export default async function atramentInit(atrament, Story) {
  // show all events in console
  atrament.on('*', (event, message) => console.log(
    `%c Atrament > ${event} `, 'color: #111111; background-color: #7FDBFF;',
    message
  ));
  // handle settings
  registerSettingsHandlers(atrament);
  // initialize Atrament
  await atrament.init(Story, {
    applicationID,
    settings: {
      fullscreen: false,
      animation: true,
      mute: false,
      volume: 50,
      fontSize: 100
    }
  });
  atrament.on('game/start', () => onGameStart(atrament));
  // initialize game
  await atrament.game.init(gamePath, gameFile);
  await atrament.game.initInkStory();
  // load defaults
  loadDefaultTheme(atrament);
  loadDefaultFont(atrament);
  // register scene processors
  registerSceneProcessors(atrament);
  // register external functions
  registerExternalFunctions(atrament);
  // mute when tab is inactive
  muteWhenInactive(atrament);
  // set window title
  const metadata = atrament.state.get().metadata;
  if (metadata.title) {
    atrament.interfaces.platform.setTitle(metadata.title);
  }
  // track story path for debugging
  if (metadata.debug) {
    atrament.on('game/continueStory', () => {
      // save current story path into game.$story_path for debugging purposes
      const path = atrament.ink.story().state.previousPathString;
      atrament.state.setSubkey('game', '$story_path', path);
    });
  }
  // done
}
