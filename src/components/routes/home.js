import { h } from 'preact';
import { route } from 'preact-router';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import Atrament from 'src/atrament-context';

import { Block, Container, ContainerFlex, Header, LinkMenu } from 'src/components/ui';
import Settings from 'src/components/screens/settings';

const HomeRoute = () => {
  const atrament = useContext(Atrament);
  const gamestate = useStore(atrament.store());

  const { title, author } = gamestate.metadata;

  const [ canBeResumed, setResumeState ] = useState(false);
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await atrament.game.canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
  }, []);

  const newGame = useCallback(async () => {
    await atrament.game.start();
    route('/game');
  });

  const resumeGame = useCallback(async () => {
    await atrament.game.resume();
    route('/game');
  });

  return (
    <Container>
      <ContainerFlex>
        <Settings />
        <Header>
          <h1>{title ? title : "Atrament UI"}</h1>
          <p>{author ? `by ${author}` : "Test application"}</p>
        </Header>
        <Block align='end'>
          {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}>Continue</LinkMenu> : ''}
          <LinkMenu key="startgame" onClick={newGame}>New game</LinkMenu>
        </Block>
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;