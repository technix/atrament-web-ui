import { useAtramentState } from './use-atrament-state';
import { useAtrament } from './use-atrament';
import { RENDERER_STORE_KEY, RENDERER_DEFAULT } from 'src/constants';

export const useScreenRenderer = () => {
  const atramentState = useAtramentState(['scenes', 'game']);
  const { setStateSubkey } = useAtrament();

  const lastSceneIndex = atramentState.scenes.length - 1;
  const lastScene = atramentState.scenes[lastSceneIndex];

  const rendererTagValue = lastScene.tags.SCREEN; // Ink tag for renderer change
  const renderer = rendererTagValue === true ? RENDERER_DEFAULT : rendererTagValue;
  const currentScreenRenderer = atramentState.game[RENDERER_STORE_KEY] || RENDERER_DEFAULT;

  // if tag is set and if the renderer value is not the same
  if (rendererTagValue && renderer !== currentScreenRenderer) {
    setStateSubkey('game', RENDERER_STORE_KEY, renderer);
    return rendererTagValue;
  }

  return currentScreenRenderer;
};
