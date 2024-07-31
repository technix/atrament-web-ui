import { h } from 'preact';
import { Text, useTranslator } from '@eo-locale/preact';
import { route } from 'preact-router';
import { useEffect, useState, useCallback } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Block from '../ui/block';
import Container from '../ui/container';
import ContainerFlex from '../ui/container-flex';
import ContainerImage from '../ui/container-image';
import Header from '../ui/header';
import LinkMenu from '../ui/link-menu';

import Settings from 'src/components/settings';
import { setPageBackground } from 'src/utils/page-background';

const HomeRoute = () => {
  const translator = useTranslator();
  const { setStateSubkey, canResume, gameStart, gameResume, getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { title, author, cover, background } = atramentState.metadata;

  const resetBackground = useCallback(() => {
    setStateSubkey('game', 'background', null);
    setStateSubkey('game', 'background_page', null);
  }, [ setStateSubkey ]);

  const [ canBeResumed, setResumeState ] = useState(false);
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
    // reset game background
    resetBackground();
    // set page background
    setPageBackground(background, getAssetPath);
  }, [ resetBackground, canResume, background, getAssetPath ]);

  const newGame = useCallback(async () => {
    resetBackground();
    await gameStart();
    route('/game');
  }, [ resetBackground, gameStart ]);

  const resumeGame = useCallback(async () => {
    resetBackground();
    await gameResume();
    route('/game');
  }, [ resetBackground, gameResume ]);

  const aboutGame = () => route('/about');

  return (
    <Container>
      <ContainerFlex>
        <Settings />
        <Header>
          {cover ? <ContainerImage src={getAssetPath(cover)} /> : ''}
          <h1>{title ? title : translator.translate('default.title')}</h1>
          <p>{author ? author : translator.translate('default.author')}</p>
        </Header>
        <Block align='end'>
          {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></LinkMenu> : ''}
          <LinkMenu key="startgame" onClick={newGame}><Text id={'main.newgame'} /></LinkMenu>
          <LinkMenu key="about" onClick={aboutGame}><Text id={'main.about'} /></LinkMenu>
        </Block>
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;