import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const useGameControls = () => {
  const { resetBackground, gameStart, gameResume, continueStory } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);

  const newGame = useCallback(async () => {
    resetBackground();
    await gameStart();
    continueStory();
    route('/game');
  }, [ resetBackground, gameStart, continueStory ]);

  const resumeGame = useCallback(async () => {
    resetBackground();
    await gameResume();
    if (metadata.continue_maximally !== false) {
      continueStory();
    }
    route('/game');
  }, [ resetBackground, gameResume, continueStory, metadata ]);

  const loadGame = useCallback(async (saveslot) => {
    resetBackground();
    await gameStart(saveslot);
    if (metadata.continue_maximally !== false) {
      continueStory();
    }
    route('/game');
  }, [ resetBackground, gameStart, continueStory, metadata ]);

  return { newGame, resumeGame, loadGame };
};

export default useGameControls;
