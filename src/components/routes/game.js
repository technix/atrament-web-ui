import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import Container from '../ui/container';
import ContainerText from '../ui/container-text';
import ContainerChoices from '../ui/container-choices';
import ContainerScenes from '../ui/container-scenes';

import Settings from 'src/components/settings';

const GameRoute = () => {
  const { state, continueStory } = useAtrament();
  const [ isReady, setReady ] = useState(false);

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);

  const lastSceneIndex = state.scenes.length - 1;

  return (
    <Container>
      <Settings />
      <ContainerText fontSize={state.settings.fontSize}>
        <ContainerScenes scenes={state.scenes} setReady={setReady} />
        <ContainerChoices currentScene={state.scenes[lastSceneIndex]} isReady={isReady} readyHandler={setReady} />
      </ContainerText>
    </Container>
  );
};

export default GameRoute;
