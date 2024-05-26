import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { createMemoryHistory } from 'history';

import AtramentContext from 'src/atrament/context';
import atramentInit from 'src/atrament/init';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import Loading from 'src/components/ui/loading';
import HomeRoute from 'src/components/routes/home';
import GameRoute from 'src/components/routes/game';
import AboutRoute from 'src/components/routes/about';

let atrament;

function App() {
  const [ loaded, isLoaded ] = useState(false);

  useEffect(() => {
    const startEngine = async () => {
      const atramentLib = await import(/* webpackChunkName: "atrament" */ "@atrament/web");
      atrament = atramentLib.default;
      // import inkjs
      const {Story} = await import(/* webpackChunkName: "inkjs" */ "inkjs/dist/ink-es2015");
      // initialize engine
      await atramentInit(atrament, Story);
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
      <AtramentContext.Provider value={atrament}>
        <ApplicationWrapper>
          <Router history={createMemoryHistory()} onChange={handleRoute}>
            <HomeRoute path="/" />
            <GameRoute path="/game" />
            <AboutRoute path="/about" />
          </Router>
        </ApplicationWrapper>
      </AtramentContext.Provider>
    );
  }
  return (<ApplicationWrapper><Loading /></ApplicationWrapper>);
}

export default App;
