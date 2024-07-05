import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Settings from 'src/components/settings';
import ErrorModal from 'src/components/ui/error-modal'

import Toolbar from 'src/components/views/toolbar';
import StoryView from 'src/components/views/story';
import OverlayView from 'src/components/views/overlay';

import { getAssetPath } from "src/utils/get-asset-path";

const GameRoute = () => {
  const { state, continueStory } = useAtrament();

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  let containerStyle = {};
  if (state.game.background) {
    containerStyle = {
      'background-image': `url(${getAssetPath(state.game.background)})`,
      'background-size': 'cover',
      'background-position': 'center' 
    }
  }

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
