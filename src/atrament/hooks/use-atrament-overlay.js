
import { useCallback } from 'preact/hooks';
import { OVERLAY_STORE_KEY } from 'src/constants';
import { useAtrament } from "./use-atrament";
import { useAtramentState } from "./use-atrament-state";

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
