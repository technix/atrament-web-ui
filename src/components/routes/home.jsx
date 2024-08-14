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

import Menu from 'src/components/menu';
import { setPageBackground } from 'src/utils/page-background';
import SessionsView from '../views/sessions';
import LoadGameView from '../views/loadgame';


const HomeMenu = ({ canBeResumed, resumeGame, newGame, saveslots, openLoadGameMenu }) => (
  <>
    {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></LinkMenu> : ''}
    <LinkMenu key="startgame" onClick={newGame}><Text id={'main.newgame'} /></LinkMenu>
    {saveslots ? <LinkMenu key="loadgame" onClick={openLoadGameMenu}><Text id={'main.loadgame'} /></LinkMenu> : ''}
  </>
);

const MainMenu = ({ newGame, resumeGame, aboutGame, canBeResumed, openLoadGameMenu }) => {
  const translator = useTranslator();
  const { atrament, canResume, getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { title, author, cover, sessions, saveslots } = atramentState.metadata;
  return (
    <>
      <Header>
        {cover ? <ContainerImage src={getAssetPath(cover)} /> : ''}
        <h1>{title ? title : translator.translate('default.title')}</h1>
        <p>{author ? author : translator.translate('default.author')}</p>
      </Header>
      <Block align='end'>
        {sessions && !atrament.game.getSession() ?
          <SessionsView newGame={newGame} resumeGame={resumeGame} canResume={canResume} />
          :
          <HomeMenu newGame={newGame} resumeGame={resumeGame} canBeResumed={canBeResumed} saveslots={saveslots} openLoadGameMenu={openLoadGameMenu} />
        }
        <LinkMenu key="about" onClick={aboutGame}><Text id={'main.about'} /></LinkMenu>
      </Block>
    </>
  );
};

const LoadGameMenu = ({ loadGame, closeLoadGameMenu }) => {
  return (
    <>
      <Block align='end'>
        <Header><h2><Text id={'main.loadgame'} /></h2></Header>
        <LoadGameView loadGame={loadGame} />
        <LinkMenu key="startgame" onClick={closeLoadGameMenu}><Text id={'main.menu'} /></LinkMenu>
      </Block>
    </>
  );
}


const HomeRoute = () => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);

  const { setStateSubkey, canResume, gameStart, gameResume, getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background } = atramentState.metadata;

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

  const loadGame = useCallback(async (saveslot) => {
    resetBackground();
    await gameStart(saveslot);
    route('/game');
  }, [ resetBackground, gameStart ]);

  const resumeGame = useCallback(async () => {
    resetBackground();
    await gameResume();
    route('/game');
  }, [ resetBackground, gameResume ]);

  const aboutGame = () => route('/about');

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => setLoadGameMenuVisible(false);

  return (
    <Container>
      <ContainerFlex>
        <Menu />
        {loadGameMenuVisible
          ? <LoadGameMenu loadGame={loadGame} closeLoadGameMenu={closeLoadGameMenu} />
          : <MainMenu newGame={newGame} resumeGame={resumeGame} canBeResumed={canBeResumed} aboutGame={aboutGame} openLoadGameMenu={openLoadGameMenu} />
        }
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;