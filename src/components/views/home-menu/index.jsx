import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Block from 'src/components/ui/block';
import Header from 'src/components/ui/header';
import LinkMenu from 'src/components/ui/link-menu';

import SessionsView from 'src/components/views/sessions';
import LoadGameView from 'src/components/views/loadgame';

import GameCover from './game-cover';


const HomeMenu = ({ canBeResumed, resumeGame, newGame, saveslots, openLoadGameMenu }) => (
  <>
    {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></LinkMenu> : ''}
    <LinkMenu key="startgame" onClick={newGame}><Text id={'main.newgame'} /></LinkMenu>
    {saveslots ? <LinkMenu key="loadgame" onClick={openLoadGameMenu}><Text id={'main.loadgame'} /></LinkMenu> : ''}
  </>
);

const MainMenu = ({ canBeResumed, openLoadGameMenu }) => {
  const { atrament, canResume, resetBackground, gameStart, gameResume } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { sessions, saves } = atramentState.metadata;

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
    <>
      <GameCover />
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

const LoadGameMenu = ({ closeLoadGameMenu }) => {
  const { gameStart, resetBackground } = useAtrament();
  const loadGame = useCallback(async (saveslot) => {
    resetBackground();
    await gameStart(saveslot);
    route('/game');
  }, [ resetBackground, gameStart ]);
  return (
    <Block align='end'>
      <Header><h2><Text id={'main.loadgame'} /></h2></Header>
      <LoadGameView loadGame={loadGame} />
      <div>&nbsp;<br />&nbsp;</div>
      <LinkMenu key="startgame" onClick={closeLoadGameMenu}><Text id={'main.menu'} /></LinkMenu>
    </Block>
  );
}


const HomeMenuView = ({ canBeResumed }) => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => setLoadGameMenuVisible(false);
  return (
    <>
      {loadGameMenuVisible
        ? <LoadGameMenu closeLoadGameMenu={closeLoadGameMenu} />
        : <MainMenu canBeResumed={canBeResumed} openLoadGameMenu={openLoadGameMenu} />
      }
    </>
  );
};

export default HomeMenuView;

