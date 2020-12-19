import { h } from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';

import { StoreContext } from 'storeon/preact';
import store from 'src/store';

import Home from 'src/components/routes/home';
import Game from 'src/components/routes/game';
import Settings from 'src/components/routes/settings';

import UIApp from 'src/components/ui/app';

function App() {
  function handleRoute(route) {
    if (route.current.props.url === '/game/new') {
      store.dispatch('game/reset');
    }
  }
  return (
    <StoreContext.Provider value={store}>
      <UIApp>
        <Router history={createHashHistory()} onChange={handleRoute}>
          <Home path="/" />
          <Game path="/game/:new?" />
          <Settings path="/settings" />
        </Router>
      </UIApp>
    </StoreContext.Provider>
  );
}

export default App;
