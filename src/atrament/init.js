
import { applicationID, gameFile, gamePath } from 'src/constants';

import muteWhenInactive from 'src/utils/mute-when-inactive';
import handleTagBackground from 'src/utils/tag-background';
import { registerGetAssetPath } from 'src/utils/get-asset-path';

import { loadDefaultFont, loadDefaultTheme } from 'src/atrament/load-defaults';
import { registerSettingsHandlers } from 'src/atrament/settings-handlers'
import { sceneListImages } from 'src/atrament/scene-processors';

import onGameStart from 'src/atrament/on-game-start';

export default async function atramentInit(atrament, Story) {
  // show all events in console
  atrament.on('*', (event, message) => console.log(
    `%c Atrament > ${event} `, 'color: #111111; background-color: #7FDBFF;',
    message
  ));
  // handle theme settings
  registerSettingsHandlers(atrament);
  // initialize Atrament
  await atrament.init(Story, {
    applicationID,
    settings: {
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
  sceneListImages(atrament);
  // mute when tab is inactive
  muteWhenInactive(atrament);
  // handle #BACKGROUND tag
  handleTagBackground(atrament);
  // done
}
