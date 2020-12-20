import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import connectGame from 'src/components/app/connectGame';

import UIGame from 'src/components/ui/game';

const Game = ({ matches, gameController }) => {
  const { scene, episode } = useStoreon('scene', 'episode');
  const makeChoice = useCallback((id) => gameController.makeChoice(id), []);

  useEffect(async () => {
    if (matches.new) {
      // new game; remove autosave
      await gameController.clearAutoSave();
    }
    await gameController.initAtrament();
    await gameController.initGame();
  }, []);

  if (!scene && !episode) {
    return;
  }

  return (
    <UIGame
      scene={scene}
      episode={episode}
      makeChoice={makeChoice}
    />
  );
};

export default connectGame(Game);
