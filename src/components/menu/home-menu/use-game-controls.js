import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { useAtrament } from 'src/atrament/hooks';

const useGameControls = () => {
  const { atrament, resetBackground, gameStart, gameResume, throwAtramentError } = useAtrament();

  const newGame = useCallback(async () => {
    try {
      resetBackground();
      await gameStart();
      route('/game');
    } catch (e) {
      throwAtramentError(`START GAME ERROR: ${e}`);
      atrament.game.clear();
    }
  }, [ resetBackground, gameStart, throwAtramentError, atrament ]);

  const resumeGame = useCallback(async () => {
    try {
      resetBackground();
      await gameResume();
      route('/game');
    } catch(e) {
      throwAtramentError(`RESUME GAME ERROR: ${e}`);
      atrament.game.clear();
    }
  }, [ resetBackground, gameResume, throwAtramentError, atrament ]);

  const loadGame = useCallback(async (saveslot) => {
    try {
      resetBackground();
      await gameStart(saveslot);
      route('/game');
    } catch (e) {
      throwAtramentError(`LOAD GAME ERROR (saveslot ${saveslot}): ${e}`);
      atrament.game.clear();
    }
  }, [ resetBackground, gameStart, throwAtramentError, atrament ]);

  return { newGame, resumeGame, loadGame };
};

export default useGameControls;
