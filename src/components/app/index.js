import { h } from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';

import { StoreContext } from 'storeon/preact';
import store from 'src/store';

import Home from 'src/components/routes/home';
import Game from 'src/components/routes/game';

import UIApp from './app-wrapper';

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
        </Router>
      </UIApp>
    </StoreContext.Provider>
  );
}

export default App;
