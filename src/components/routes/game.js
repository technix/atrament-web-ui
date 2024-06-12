import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Settings from 'src/components/settings';
import ErrorModal from 'src/components/ui/error-modal'

import Toolbar from 'src/components/views/toolbar';
import StoryView from 'src/components/views/story';
import OverlayView from 'src/components/views/overlay';

const GameRoute = () => {
  const { continueStory } = useAtrament();

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  return (
    <Container>
      <Settings />
      <ErrorModal />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;
