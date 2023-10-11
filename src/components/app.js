import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { createMemoryHistory } from 'history';
import Atrament from 'src/atrament-context';

import { applicationID, gameFile, gamePath } from 'src/constants';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import Loading from 'src/components/ui/loading';
import HomeRoute from 'src/components/routes/home';
import GameRoute from 'src/components/routes/game';

import muteWhenInactive from 'src/utils/mute-when-inactive';
import handleTagBackground from 'src/utils/tag-background';

import { registerSettingsHandlers } from 'src/atrament/settings-handlers'
import { sceneAddUuid, sceneListImages } from 'src/atrament/scene-processors';
import { loadDefaultFont, loadDefaultTheme } from 'src/atrament/load-defaults';

import { loadAsar, inkLoader } from '../utils/asar';

let atrament;

function App() {
  const [ loaded, isLoaded ] = useState(false);

  useEffect(() => {
    const startEngine = async () => {
      const atramentLib = await import(/* webpackChunkName: "atrament" */ "@atrament/web");
      atrament = atramentLib.default;
      // import inkjs
      const {Story} = await import(/* webpackChunkName: "inkjs" */ "inkjs/dist/ink-es2015");
      // fix loader
      await loadAsar("assets/the-coiled-crown.atrament");
      atrament.defineInterfaces({
        loader: {
          load: inkLoader
        }
      });
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


      // initialize game
      atrament.game.init('.', 'the-coiled-crown.ink.json');
      await atrament.game.initInkStory();
      // load defaults
      loadDefaultTheme(atrament);
      loadDefaultFont(atrament);
      // register scene processors
      sceneAddUuid(atrament);
      sceneListImages(atrament);
      // mute when tab is inactive
      muteWhenInactive(atrament);
      // handle #BACKGROUND tag
      handleTagBackground(atrament);
      // done
      isLoaded(true);
    };
    // application is ready
    startEngine();
  }, []);

  const handleRoute = useCallback((route) => {
    if (route.url === '/' && route.previous) {
      // back from game screen
      atrament.game.clear();
    }
  }, []);

  if (loaded) {
    return (
      <Atrament.Provider value={atrament}>
        <ApplicationWrapper>
          <Router history={createMemoryHistory()} onChange={handleRoute}>
            <HomeRoute path="/" />
            <GameRoute path="/game" />
          </Router>
        </ApplicationWrapper>
      </Atrament.Provider>
    );
  }
  return (<ApplicationWrapper><Loading /></ApplicationWrapper>);
}

export default App;
