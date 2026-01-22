import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { useAtrament } from 'src/atrament/hooks';

const useGameControls = () => {
  const { resetBackground, gameStart, gameResume } = useAtrament();

  const newGame = useCallback(async () => {
    resetBackground();
    await gameStart();
    route('/game');
  }, [ resetBackground, gameStart ]);

  const resumeGame = useCallback(async () => {
    resetBackground();
    await gameResume();
    route('/game');
  }, [ resetBackground, gameResume ]);

  const loadGame = useCallback(async (saveslot) => {
    resetBackground();
    await gameStart(saveslot);
    route('/game');
  }, [ resetBackground, gameStart ]);

  return { newGame, resumeGame, loadGame };
};

export default useGameControls;
