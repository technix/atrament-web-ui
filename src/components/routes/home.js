import { h } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState, useCallback } from 'preact/hooks';
import useAtrament from 'src/atrament/hooks';

import Block from '../ui/block';
import Container from '../ui/container';
import ContainerFlex from '../ui/container-flex';
import Header from '../ui/header';
import LinkMenu from '../ui/link-menu';

import Settings from 'src/components/settings';
import atrament from '@atrament/web';

const HomeRoute = () => {
  const { state, canResume, gameStart, gameResume } = useAtrament();

  const { title, author } = state.metadata;

  const registerErrorHandler = () => {
    // register error handler
    atrament.ink.story().onError = (error) => {
      atrament.state.setKey('ERROR', error);
    };
  };

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
    registerErrorHandler();
    route('/game');
  }, [ gameStart ]);

  const resumeGame = useCallback(async () => {
    await gameResume();
    registerErrorHandler();
    route('/game');
  }, [ gameResume ]);

  const aboutGame = () => route('/about');

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
          <LinkMenu key="about" onClick={aboutGame}>About</LinkMenu>
        </Block>
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;