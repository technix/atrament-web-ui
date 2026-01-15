import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { BACKGROUND_STORE_KEY, BACKGROUND_PAGE_STORE_KEY } from 'src/constants';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Menu from 'src/components/menu';

import Toolbar from 'src/components/views/toolbar';
import StoryView from 'src/components/views/story';
import OverlayView from 'src/components/views/overlay';
import StoryError from 'src/components/views/story-error';
import { setPageBackground } from 'src/utils/page-background';

const GameRoute = () => {
  const { getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['game']);

  const background = atramentState.game[BACKGROUND_STORE_KEY];
  const backgroundPage = atramentState.game[BACKGROUND_PAGE_STORE_KEY];

  let containerStyle;
  if (background) {
    containerStyle = {
      'background-image': `url(${getAssetPath(background)})`,
      'background-size': 'cover',
      'background-position': 'center'
    }
  }

  useEffect(() => {
    setPageBackground(backgroundPage, getAssetPath);
  }, [ backgroundPage, getAssetPath ]);

  return (
    <Container style={containerStyle}>
      <Menu />
      <StoryError />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;
