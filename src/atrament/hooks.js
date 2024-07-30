import { useContext, useCallback } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import AtramentContext from 'src/atrament/context';

export const useAtrament = () => {
  const atrament = useContext(AtramentContext);

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
      let result;
      try {
        result = atrament.ink.evaluateFunction(fn, args, true);
      } catch (e) {
        atrament.ink.story().onError(e.toString());
        result.error = e.toString();
      }
      return result;
    },
    [ atrament ]
  );

  const setInkVariable = useCallback(
    (name, value) => {
      try {
        atrament.ink.setVariable(name, value);
      } catch (e) {
        atrament.ink.story().onError(e.toString());
      }
    },
    [ atrament ]
  );
  
  const getInkVariable = useCallback(
    (name) => {
      let result;
      try {
        result = atrament.ink.getVariable(name);
      } catch (e) {
        atrament.ink.story().onError(e.toString());
      }
      return result;
    },
    [ atrament ]
  );

  return {
    atrament,
    canResume: atrament.game.canResume,
    gameStart: atrament.game.start,
    gameResume: atrament.game.resume,
    makeChoice: atrament.game.makeChoice,
    continueStory: atrament.game.continueStory,
    getAssetPath,
    updateSettings,
    setStateSubkey,
    evaluateInkFunction,
    setInkVariable,
    getInkVariable
  };
};

export const useAtramentState = () => {
  const atrament = useContext(AtramentContext);
  return useStore(atrament.store);
};

export const useAtramentOverlay = () => {
  const { evaluateInkFunction, setStateSubkey } = useAtrament();
  const atramentState = useAtramentState();

  const setOverlayContent = useCallback((overlayName, content) => {
    setStateSubkey('OVERLAY', 'activeOverlay', overlayName);
    let textContent = content;
    const contentArray = content.split('\n');
    const firstLine = contentArray.shift();
    const title = firstLine.match(/\[title\](.+?)\[\/title\]/i);
    if (title) {
      setStateSubkey('OVERLAY', 'title', title[1]);
      textContent = contentArray.join('\n');
    }
    setStateSubkey('OVERLAY', 'content', textContent);
  }, [ setStateSubkey ]);

  const refreshOverlay = useCallback(() => {
    const activeOverlay = atramentState.OVERLAY.activeOverlay;
    if (activeOverlay) {
      // refresh active overlay
      const result = evaluateInkFunction(activeOverlay);
      setOverlayContent(activeOverlay, result.output);
    }
  }, [ atramentState.OVERLAY.activeOverlay, setOverlayContent, evaluateInkFunction ]);

  const closeOverlay = useCallback(() => {
    setStateSubkey('OVERLAY', 'activeOverlay', null);
    setStateSubkey('OVERLAY', 'content', '');
    setStateSubkey('OVERLAY', 'title', null);
  }, [ setStateSubkey ]);

  return {
    refreshOverlay,
    closeOverlay,
    setOverlayContent,
    overlay: {
      active: atramentState.OVERLAY.activeOverlay,
      content: atramentState.OVERLAY.content.split('\n'),
      title: atramentState.OVERLAY.title,
    }
  }
};
