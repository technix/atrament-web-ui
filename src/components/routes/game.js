import { h } from 'preact';
import { useStore } from '@nanostores/preact';
import Atrament from 'src/atrament-context';

import { useCallback, useContext, useEffect } from 'preact/hooks';
import { Container, ContainerText } from 'src/components/ui';

import Scenes from 'src/components/screens/scenes';
import Choices from 'src/components/screens/choices';
import Settings from 'src/components/screens/settings';

const GameRoute = () => {
  const atrament = useContext(Atrament);
  const gamestate = useStore(atrament.store());

  const makeChoice = useCallback((id) => {
    atrament.game.makeChoice(id);
    atrament.game.continueStory();
  })

  useEffect(() => {
    atrament.game.continueStory();
  }, []);

  const currentScene = gamestate.scenes.slice(-1)[0];

  return (
    <Container>
      <Settings />
      <ContainerText fontSize={gamestate.settings.fontSize}>
        <Scenes scenes={gamestate.scenes} />
        <Choices choices={currentScene?.choices} handleClick={makeChoice} />
      </ContainerText>
    </Container>
  );
};

export default GameRoute;