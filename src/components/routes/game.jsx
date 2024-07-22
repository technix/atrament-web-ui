import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Settings from 'src/components/settings';
import ErrorModal from 'src/components/ui/error-modal'

import Toolbar from 'src/components/views/toolbar';
import StoryView from 'src/components/views/story';
import OverlayView from 'src/components/views/overlay';
import { setPageBackground } from 'src/utils/page-background';

const GameRoute = () => {
  const { state, continueStory, getAssetPath } = useAtrament();

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  let containerStyle;
  if (state.game.background) {
    containerStyle = {
      'background-image': `url(${getAssetPath(state.game.background)})`,
      'background-size': 'cover',
      'background-position': 'center' 
    }
  }

  const backgroundPage = state.game.background_page;
  useEffect(() => {
    setPageBackground(backgroundPage, getAssetPath);
  }, [ backgroundPage, getAssetPath ]);

  return (
    <Container style={containerStyle}>
      <Settings />
      <ErrorModal />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;
