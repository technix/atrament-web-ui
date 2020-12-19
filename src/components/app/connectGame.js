import { h } from 'preact';
import GameController from 'src/lib/gamecontroller';

let gameControllerInstance;

export default function connectGame(WrappedComponent) {
  if (!gameControllerInstance) {
    gameControllerInstance = new GameController();
  }

  const wrapped = (props) => (
    <WrappedComponent
      gameController={gameControllerInstance}
      {...props}
    />
  );
  return wrapped;
}
