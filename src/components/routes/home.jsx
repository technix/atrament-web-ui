import { h } from 'preact';
import { Text, useTranslator } from '@eo-locale/preact';
import { route } from 'preact-router';
import { useEffect, useState, useCallback } from 'preact/hooks';
import useAtrament from 'src/atrament/hooks';

import Block from '../ui/block';
import Container from '../ui/container';
import ContainerFlex from '../ui/container-flex';
import ContainerImage from '../ui/container-image';
import Header from '../ui/header';
import LinkMenu from '../ui/link-menu';

import Settings from 'src/components/settings';

const HomeRoute = () => {
  const translator = useTranslator();
  const { state, canResume, gameStart, gameResume, getAssetPath } = useAtrament();
  const { title, author, cover, background } = state.metadata;

  const [ canBeResumed, setResumeState ] = useState(false);
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
    if (background) {
      document.body.style.backgroundImage = `url(${getAssetPath(background)})`
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
  }, [ canResume, background, getAssetPath ]);

  const newGame = useCallback(async () => {
    await gameStart();
    route('/game');
  }, [ gameStart ]);

  const resumeGame = useCallback(async () => {
    await gameResume();
    route('/game');
  }, [ gameResume ]);

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