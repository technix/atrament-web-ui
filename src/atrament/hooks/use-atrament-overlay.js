
import { useCallback } from 'preact/hooks';
import { OVERLAY_STORE_KEY, EMPTY_OVERLAY } from 'src/constants';
import getTagAttributes from 'src/utils/get-tag-attributes';
import getMarkupRegex from 'src/utils/get-markup-regex';
import { useAtrament } from "./use-atrament";
import { useAtramentState } from "./use-atrament-state";

const overlayTagRegex = getMarkupRegex('overlay', { single: true });
const titleTagRegex = getMarkupRegex('title');

export const useAtramentOverlay = () => {
  const { evaluateInkFunction, setStateKey } = useAtrament();
  const atramentState = useAtramentState([OVERLAY_STORE_KEY]);

  const setOverlayContent = useCallback((overlayName, content, displayType) => {
    const contentArray = `${content}`.split('\n');
    let firstLine = contentArray.shift();
    let options = {};
    const overlayTag = firstLine.match(overlayTagRegex.parser);
    if (overlayTag) {
      options = getTagAttributes(overlayTag[1].trim());
      firstLine = firstLine.replace(overlayTag[0], '');
    }
    let title = null;
    const titleTag = firstLine.match(titleTagRegex.parser);
    if (titleTag) {
      title = titleTag[2] || null;
      firstLine = firstLine.replace(titleTag[0], '');
    }
    setStateKey(OVERLAY_STORE_KEY, {
      current: overlayName,
      title,
      content: [firstLine, ...contentArray].join('\n'),
      display: displayType || null,
      options
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
    setStateKey(OVERLAY_STORE_KEY, EMPTY_OVERLAY);
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
    overlay: atramentState[OVERLAY_STORE_KEY]
  }
};
