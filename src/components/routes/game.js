import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Settings from 'src/components/settings';
import Toolbar from 'src/components/ui/toolbar';

import StoryView from 'src/components/views/story';

const GameRoute = () => {
  const { state, continueStory } = useAtrament();

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  return (
    <Container>
      <Settings />
      <Toolbar>{state.metadata.title}</Toolbar>
      <StoryView />
    </Container>
  );
};

export default GameRoute;
