import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { Router } from 'preact-router';
import { createMemoryHistory } from 'history';

import { useAtrament } from 'src/atrament/hooks';

import HomeRoute from 'src/components/routes/home';
import GameRoute from 'src/components/routes/game';
import AboutRoute from 'src/components/routes/about';

export default function AppRouter() {
  const { atrament } = useAtrament();

  const handleRoute = useCallback((route) => {
    if (route.url === '/' && route.previous) {
      // back from game screen
      atrament.game.clear();
    }
  }, [ atrament.game ]);

  return (
    <Router history={createMemoryHistory()} onChange={handleRoute}>
      <HomeRoute path="/" />
      <GameRoute path="/game" />
      <AboutRoute path="/about" />
    </Router>
  );
}
