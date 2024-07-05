
import { applicationID, gameFile, gamePath } from 'src/constants';

import muteWhenInactive from 'src/utils/mute-when-inactive';
import { registerGetAssetPath } from 'src/utils/get-asset-path';

import { loadDefaultFont, loadDefaultTheme } from 'src/atrament/load-defaults';
import { registerSettingsHandlers } from 'src/atrament/settings-handlers'
import registerSceneProcessors from 'src/atrament/scene-processors';

import onGameStart from 'src/atrament/on-game-start';

export default async function atramentInit(atrament, Story) {
  console.log(import.meta.env);
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
  // register getAssetPath function
  registerGetAssetPath(atrament.game.getAssetPath);
  // initialize game
  await atrament.game.init(gamePath, gameFile);
  await atrament.game.initInkStory();
  // load defaults
  loadDefaultTheme(atrament);
  loadDefaultFont(atrament);
  // register scene processors
  registerSceneProcessors(atrament);
  // mute when tab is inactive
  muteWhenInactive(atrament);
  // done
}
