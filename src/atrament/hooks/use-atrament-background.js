import { useEffect } from 'preact/hooks';
import { BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

import { useAtrament } from "./use-atrament";
import { useAtramentState } from "./use-atrament-state";

import { setBackground } from 'src/utils/background';
import preloadImages from 'src/utils/preload-images';

const imagePreloader = async (getAssetPath, image, callback) => {
  await preloadImages(getAssetPath, [image]);
  callback();
}

// main screen background

export const useAtramentAppBackground = () => {
  const { getAssetPath, resetBackground } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background } = atramentState.metadata;

  useEffect(() => {
    // reset game background
    resetBackground();
    // set page background
    setBackground(document.getElementById('atrament-app'), background, getAssetPath);
  }, [ resetBackground, background, getAssetPath ]);
}

// game screen background

export const useAtramentBackground = () => {
  const { getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['metadata', 'game']);
  const background = atramentState.game[BACKGROUND_STORE_KEY];
  const backgroundPage = atramentState.game[BACKGROUND_PAGE_STORE_KEY];

  useEffect(() => {
    imagePreloader(
      getAssetPath,
      background,
      () => setBackground(document.getElementsByClassName('atrament-container-game')[0], background, getAssetPath)
    );
  }, [ background, getAssetPath ]);

  useEffect(() => {
    imagePreloader(
      getAssetPath,
      backgroundPage,
      () => setBackground(document.getElementById('atrament-app'), backgroundPage, getAssetPath)
    );
  }, [ backgroundPage, getAssetPath ]);
};

