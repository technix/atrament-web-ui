import { useContext, useCallback } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { AtramentContext } from 'src/context';
import { OVERLAY_STORE_KEY, ERROR_STORE_KEY, BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

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

export const useAtramentState = (keys = undefined) => {
  const atrament = useContext(AtramentContext);
  return useStore(atrament.store, { keys });
};

export const useAtramentOverlay = () => {
  const { evaluateInkFunction, setStateKey } = useAtrament();
  const atramentState = useAtramentState([OVERLAY_STORE_KEY]);

  const setOverlayContent = useCallback((overlayName, content, displayType) => {
    let textContent = `${content}`;
    const contentArray = content.split('\n');
    const firstLine = contentArray.shift();
    const title = firstLine.match(/\[title\](.+?)\[\/title\](.*)$/i);
    if (title) {
      textContent = [title[2], ...contentArray].join('\n');
    }
    setStateKey(OVERLAY_STORE_KEY, {
      current: overlayName,
      title: title ? title[1] : null,
      content: textContent,
      display: displayType || null
    });
  }, [ setStateKey ]);

  const refreshOverlay = useCallback(() => {
    const currentOverlay = atramentState[OVERLAY_STORE_KEY].current;
    if (currentOverlay) {
      // refresh active overlay
      const result = evaluateInkFunction(currentOverlay);
      setOverlayContent(currentOverlay, result.output, atramentState[OVERLAY_STORE_KEY].display);
    }
  }, [ atramentState, setOverlayContent, evaluateInkFunction ]);

  const closeOverlay = useCallback(() => {
    setStateKey(OVERLAY_STORE_KEY, {
      current: null,
      content: '',
      title: null,
      display: null
    });
  }, [ setStateKey ]);

  const execContentFunction = useCallback((inkFn, display) => {
    const result = evaluateInkFunction(inkFn);
    if (result.output) {
      setOverlayContent(inkFn, result.output, display === 'modal' ? 'modal' : 'overlay');
    } else {
      refreshOverlay();
    }
  }, [ evaluateInkFunction, refreshOverlay, setOverlayContent ]);

  return {
    refreshOverlay,
    closeOverlay,
    setOverlayContent,
    execContentFunction,
    overlay: {
      current: atramentState[OVERLAY_STORE_KEY].current,
      content: atramentState[OVERLAY_STORE_KEY].content.split('\n'),
      title: atramentState[OVERLAY_STORE_KEY].title,
      display: atramentState[OVERLAY_STORE_KEY].display
    }
  }
};
