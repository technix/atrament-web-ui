import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import Atrament from 'src/atrament-context';

import { applicationID, gameFile, gamePath, gameDefaultTheme, gameDefaultFont } from 'src/constants';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import Loading from 'src/components/ui/loading';
import HomeRoute from 'src/components/routes/home';
import GameRoute from 'src/components/routes/game';

import { applyTheme, applyFont } from './theme';

let atrament;

function App() {
  const [ loaded, isLoaded ] = useState(false);

  useEffect(() => {
    const startEngine = async () => {
      const atramentLib = await import(/* webpackChunkName: "atrament" */ "@atrament/web");
      atrament = atramentLib.default;
      // import inkjs
      const {Story} = await import(/* webpackChunkName: "inkjs" */ "inkjs/dist/ink-es2015");
      // show all events in console
      atrament.on('*', (event, message) => console.log(
        `%c Atrament > ${event} `, 'color: #111111; background-color: #7FDBFF;',
        message
      ));
      // handle theme settings
      atrament.settings.defineHandler('theme', (oldV, value) => {
        applyTheme(value);
      });
      atrament.settings.defineHandler('font', (oldV, value) => {
        applyFont(value);
      });
      atrament.settings.defineHandler('animation', (oldV, value) => {
        document.documentElement.style.setProperty('--animation-type', value ? 'appear' : '');
      });

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
      atrament.game.init(gamePath, gameFile);
      await atrament.game.initInkStory();
      // set initial theme from game
      const defaultTheme = atrament.state().get().metadata.theme || gameDefaultTheme;
      if (!atrament.settings.get('theme')) {
        atrament.settings.set('theme', defaultTheme);
      }
      // set initial font from game
      const defaultFont = atrament.state().get().metadata.font || gameDefaultFont;
      if (!atrament.settings.get('font')) {
        atrament.settings.set('font', defaultFont);
      }
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
  });

  if (loaded) {
    return (
      <Atrament.Provider value={atrament}>
        <ApplicationWrapper>
          <Router history={createHashHistory()} onChange={handleRoute}>
            <HomeRoute path="/" />
            <GameRoute path="/game" />
          </Router>
        </ApplicationWrapper>
      </Atrament.Provider>
    );
  } else {
    return (<ApplicationWrapper><Loading /></ApplicationWrapper>);
  }
}

export default App;
