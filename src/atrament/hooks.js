import { useContext, useCallback } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { AtramentContext } from 'src/context';
import { OVERLAY_STORE_KEY } from 'src/constants';

export const useAtrament = () => {
  const atrament = useContext(AtramentContext);

  const inkErrorWrapper = useCallback((fn) => {
    try {
      return fn();
    } catch (e) {
      if (atrament.ink.story().onError) {
        atrament.ink.story().onError(e.toString());
      }
      return null;
    }
  }, [ atrament ]);

  const getAssetPath = useCallback(
    (file) => file ? atrament.game.getAssetPath(file) : null,
    [ atrament ]
  );

  const updateSettings = useCallback(
    (name, value) => {
      atrament.settings.set(name, value);
      atrament.settings.save();
    },
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
    atrament.state.setSubkey('game', 'background', null);
    atrament.state.setSubkey('game', 'background_page', null);
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
    setStateSubkey,
    evaluateInkFunction,
    setInkVariable,
    getInkVariable,
    resetBackground
  };
};

export const useAtramentState = (keys = undefined) => {
  const atrament = useContext(AtramentContext);
  return useStore(atrament.store, {keys});
};

export const useAtramentOverlay = () => {
  const { evaluateInkFunction, setStateSubkey } = useAtrament();
  const atramentState = useAtramentState([OVERLAY_STORE_KEY]);

  const setOverlayContent = useCallback((overlayName, content) => {
    setStateSubkey(OVERLAY_STORE_KEY, 'current', overlayName);
    let textContent = content;
    const contentArray = content.split('\n');
    const firstLine = contentArray.shift();
    const title = firstLine.match(/\[title\](.+?)\[\/title\]/i);
    if (title) {
      setStateSubkey(OVERLAY_STORE_KEY, 'title', title[1]);
      textContent = contentArray.join('\n');
    }
    setStateSubkey(OVERLAY_STORE_KEY, 'content', textContent);
  }, [ setStateSubkey ]);

  const refreshOverlay = useCallback(() => {
    const currentOverlay = atramentState[OVERLAY_STORE_KEY].current;
    if (currentOverlay) {
      // refresh active overlay
      const result = evaluateInkFunction(currentOverlay);
      setOverlayContent(currentOverlay, result.output);
    }
  }, [ atramentState, setOverlayContent, evaluateInkFunction ]);

  const closeOverlay = useCallback(() => {
    setStateSubkey(OVERLAY_STORE_KEY, 'current', null);
    setStateSubkey(OVERLAY_STORE_KEY, 'content', '');
    setStateSubkey(OVERLAY_STORE_KEY, 'title', null);
  }, [ setStateSubkey ]);

  return {
    refreshOverlay,
    closeOverlay,
    setOverlayContent,
    overlay: {
      current: atramentState[OVERLAY_STORE_KEY].current,
      content: atramentState[OVERLAY_STORE_KEY].content.split('\n'),
      title: atramentState[OVERLAY_STORE_KEY].title,
    }
  }
};
