import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Settings from 'src/components/settings';
import Toolbar from 'src/components/ui/toolbar';
import ErrorModal from 'src/components/ui/error-modal'
import StoryView from 'src/components/views/story';

const GameRoute = () => {
  const { atrament, state, continueStory } = useAtrament();

  useEffect(() => {
    // register error handler
    atrament.ink.story().onError = (error) => {
      atrament.state.setKey('ERROR', error);
    };
    // continue ink story
    continueStory();
  }, [ atrament, continueStory ]);

  return (
    <Container>
      <Settings />
      <ErrorModal />
      <Toolbar>{state.metadata.title}</Toolbar>
      <StoryView />
    </Container>
  );
};

export default GameRoute;
