import { h } from 'preact';
import { useStore } from '@nanostores/preact';
import Atrament from 'src/atrament-context';

import { useContext, useEffect } from 'preact/hooks';
import { Container, ContainerText } from 'src/components/ui';

import Scenes from 'src/components/screens/scenes';
import Settings from 'src/components/screens/settings';

const GameRoute = () => {
  const atrament = useContext(Atrament);
  const gamestate = useStore(atrament.store());

  useEffect(() => {
    atrament.game.continueStory();
  }, [ atrament.game ]);

  return (
    <Container>
      <Settings />
      <ContainerText fontSize={gamestate.settings.fontSize}>
        <Scenes scenes={gamestate.scenes} />
      </ContainerText>
    </Container>
  );
};

export default GameRoute;
