import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Menu from 'src/components/menu/main-menu';

import Toolbar from 'src/components/screens/game/toolbar';
import StoryView from 'src/components/screens/game/story';
import OverlayView from 'src/components/screens/game/overlay';
import ErrorScreen from 'src/components/screens/error';

import { setPageBackground } from 'src/utils/page-background';
import preloadImages from 'src/utils/preload-images';

const imagePreloader = async (getAssetPath, image, callback) => {
  await preloadImages(getAssetPath, [image]);
  callback();
}

const GameRoute = () => {
  const { getAssetPath } = useAtrament();
  const [ containerStyle, setContainerStyle ] = useState({});
  const atramentState = useAtramentState(['game']);

  const background = atramentState.game[BACKGROUND_STORE_KEY];
  const backgroundPage = atramentState.game[BACKGROUND_PAGE_STORE_KEY];

  useEffect(() => {
    if (background) {
      imagePreloader(
        getAssetPath,
        background,
        () => setContainerStyle({
          'background-image': `url(${getAssetPath(background)})`,
          'background-size': 'cover',
          'background-position': 'center'
        })
      );
    } else {
      setContainerStyle({});
    }
  }, [ background, setContainerStyle ]);

  useEffect(() => {
    imagePreloader(
      getAssetPath,
      backgroundPage,
      () => setPageBackground(backgroundPage, getAssetPath)
    );
  }, [ backgroundPage, getAssetPath ]);

  return (
    <Container style={containerStyle}>
      <Menu />
      <ErrorScreen />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;
