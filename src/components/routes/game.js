import { h } from 'preact';

import useAtrament from 'src/atrament/hooks';

import { useEffect } from 'preact/hooks';
import { Container, ContainerText } from 'src/components/ui';

import Scenes from 'src/components/screens/scenes';
import Settings from 'src/components/screens/settings';

const GameRoute = () => {
  const { state, continueStory } = useAtrament();

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  return (
    <Container>
      <Settings />
      <ContainerText fontSize={state.settings.fontSize}>
        <Scenes scenes={state.scenes} />
      </ContainerText>
    </Container>
  );
};

export default GameRoute;
