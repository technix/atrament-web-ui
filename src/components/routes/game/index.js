import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import UIGame from 'src/components/ui/game';
import { initEngine, makeChoice } from 'src/lib/atrament';

const Game = ({ matches }) => {
  const { scene, episode } = useStoreon('scene', 'episode');

  useEffect(() => {
    initEngine(matches.new);
  });

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

export default Game;
