import { h } from 'preact';
import { connect, actions } from '_src_/store';

import { initGame, clearSavedGame, makeChoice, renderScene } from '_src_/game/engine';

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
