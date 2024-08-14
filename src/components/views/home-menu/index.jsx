import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { Text, useTranslator } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Block from 'src/components/ui/block';
import ContainerImage from 'src/components/ui/container-image';
import Header from 'src/components/ui/header';
import LinkMenu from 'src/components/ui/link-menu';

import SessionsView from 'src/components/views/sessions';
import LoadGameView from 'src/components/views/loadgame';


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
  const { title, author, cover, sessions, saves } = atramentState.metadata;
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
          <HomeMenu newGame={newGame} resumeGame={resumeGame} canBeResumed={canBeResumed} saveslots={saves} openLoadGameMenu={openLoadGameMenu} />
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
        <div>&nbsp;<br />&nbsp;</div>
        <LinkMenu key="startgame" onClick={closeLoadGameMenu}><Text id={'main.menu'} /></LinkMenu>
      </Block>
    </>
  );
}



const HomeMenuView = ({ canBeResumed, resetBackground }) => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const { gameStart, gameResume } = useAtrament();

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => setLoadGameMenuVisible(false);

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

  return (
    <>
      {loadGameMenuVisible
        ? <LoadGameMenu loadGame={loadGame} closeLoadGameMenu={closeLoadGameMenu} />
        : <MainMenu newGame={newGame} resumeGame={resumeGame} canBeResumed={canBeResumed} aboutGame={aboutGame} openLoadGameMenu={openLoadGameMenu} />
      }
    </>
  );
};

export default HomeMenuView;

