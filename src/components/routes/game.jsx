import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Menu from 'src/components/menu/main-menu';

import Toolbar from 'src/components/screens/game/toolbar';
import StoryView from 'src/components/screens/game/story';
import OverlayView from 'src/components/screens/game/overlay';
import ErrorScreen from 'src/components/screens/error';

import { setBackground } from 'src/utils/background';
import preloadImages from 'src/utils/preload-images';

const imagePreloader = async (getAssetPath, image, callback) => {
  await preloadImages(getAssetPath, [image]);
  callback();
}

const GameRoute = () => {
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

  return (
    <Container className='atrament-container-game'>
      <Menu />
      <ErrorScreen />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;
