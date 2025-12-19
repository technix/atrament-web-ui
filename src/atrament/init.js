
import { applicationID, gameFile, gamePath, defaultSettings, ERROR_STORE_KEY, STORYPATH_STORE_KEY } from 'src/constants';

import muteWhenInactive from 'src/utils/mute-when-inactive';

import { loadDefaultFont, loadDefaultTheme } from 'src/atrament/load-defaults';
import { registerSettingsHandlers } from 'src/atrament/settings-handlers'
import registerSceneProcessors from 'src/atrament/scene-processors';
import registerExternalFunctions from 'src/atrament/externals';

import onGameInit from 'src/atrament/on-game-init';
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
    settings: defaultSettings
  });
  atrament.on('game/initInkStory', () => onGameInit(atrament));
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
  // enable ink fallbacks for external functions
  if (metadata.allow_external_function_fallbacks) {
    atrament.ink.story().allowExternalFunctionFallbacks = true;
  }
  // register error handler
  atrament.ink.onError((error) => atrament.state.setKey(ERROR_STORE_KEY, error));
  // track story path for debugging
  if (metadata.debug) {
    atrament.on('game/continueStory', () => {
      // save current story path into game.$story_path for debugging purposes
      const path = atrament.ink.story().state.previousPathString;
      atrament.state.setSubkey('game', STORYPATH_STORE_KEY, path);
    });
  }
  // done
}
