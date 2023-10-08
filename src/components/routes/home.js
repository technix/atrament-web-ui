import { h } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState, useCallback } from 'preact/hooks';
import useAtrament from 'src/atrament/hooks';

import { Block, Container, ContainerFlex, Header, LinkMenu } from 'src/components/ui';
import Settings from 'src/components/screens/settings';


const HomeRoute = () => {
  const { state, canResume, gameStart, gameResume } = useAtrament();

  const { title, author } = state.metadata;

  const [ canBeResumed, setResumeState ] = useState(false);
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
  }, [ canResume ]);

  const newGame = useCallback(async () => {
    await gameStart();
    route('/game');
  }, [ gameStart ]);

  const resumeGame = useCallback(async () => {
    await gameResume();
    route('/game');
  }, [ gameResume ]);

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