import { useContext, useCallback } from 'preact/hooks';
import { AtramentContext } from 'src/context';
import { ERROR_STORE_KEY, BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

export const useAtrament = () => {
  const atrament = useContext(AtramentContext);

  const inkErrorWrapper = useCallback((fn) => {
    try {
      return fn();
    } catch (e) {
      if (atrament.ink.story().onError) {
        atrament.ink.story().onError(e.toString());
      }
      console.error(e);
      return null;
    }
  }, [ atrament ]);

  const getAssetPath = useCallback(
    (file) => {
      if (!file) {
        return null;
      }
      const asset = `${file}`;
      if (asset.startsWith('http://') || asset.startsWith('https://')) {
        return asset;
      }
      return atrament.game.getAssetPath(asset);
    },
    [ atrament ]
  );

  const updateSettings = useCallback(
    (name, value) => {
      atrament.settings.set(name, value);
      atrament.settings.save();
    },
    [ atrament ]
  );

  const setStateKey = useCallback(
    (...args) => atrament.state.setKey(...args),
    [ atrament ]
  );

  const setStateSubkey = useCallback(
    (...args) => atrament.state.setSubkey(...args),
    [ atrament ]
  );

  const evaluateInkFunction = useCallback(
    (fn, args=[]) => {
      let result = {};
      try {
        result = atrament.ink.evaluateFunction(fn, args, true);
      } catch (e) {
        if (atrament.ink.story().onError) {
          atrament.ink.story().onError(e.toString());
        }
        result.error = e.toString();
      }
      return result;
    },
    [ atrament ]
  );

  const setInkVariable = useCallback(
    (...args) => inkErrorWrapper(() => atrament.ink.setVariable(...args)),
    [ atrament, inkErrorWrapper ]
  );

  const getInkVariable = useCallback(
    (...args) => inkErrorWrapper(() => atrament.ink.getVariable(...args)),
    [ atrament, inkErrorWrapper ]
  );

  const makeChoice = useCallback(
    (...args) => inkErrorWrapper(() => atrament.game.makeChoice(...args)),
    [ atrament, inkErrorWrapper ]
  );

  const continueStory = useCallback(
    (...args) => inkErrorWrapper(() => atrament.game.continueStory(...args)),
    [ atrament, inkErrorWrapper ]
  );

  const resetBackground = useCallback(() => {
    atrament.state.setSubkey('game', BACKGROUND_STORE_KEY, null);
    atrament.state.setSubkey('game', BACKGROUND_PAGE_STORE_KEY, null);
  }, [ atrament ]);

  const throwAtramentError = useCallback((message) => {
    atrament.state.setKey(ERROR_STORE_KEY, message);
  }, [ atrament ]);

  return {
    atrament,
    canResume: atrament.game.canResume,
    gameStart: atrament.game.start,
    gameResume: atrament.game.resume,
    makeChoice,
    continueStory,
    getAssetPath,
    updateSettings,
    setStateKey,
    setStateSubkey,
    evaluateInkFunction,
    setInkVariable,
    getInkVariable,
    resetBackground,
    throwAtramentError
  };
};
