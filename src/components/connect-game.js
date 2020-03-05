import { h } from 'preact';
import { connect, actions } from 'src/store';

import { initGame, clearSavedGame, makeChoice, renderScene } from 'src/game/engine';

function connectGame(WrappedComponent) {
  const wrapped = (props) => (
    <WrappedComponent
      gameActions={{
        initGame,
        clearSavedGame,
        makeChoice,
        renderScene
      }}
      {...props}
    />
  );
  return connect('scene,episode', actions)(wrapped);
}

export default connectGame;
