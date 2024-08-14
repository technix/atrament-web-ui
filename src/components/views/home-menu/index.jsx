import { h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Block from 'src/components/ui/block';
import LinkMenu from 'src/components/ui/link-menu';

import SessionsView from 'src/components/views/sessions';

import LoadGameMenu from './load-game';
import GameCover from './game-cover';

const MainMenu = ({ canBeResumed, openLoadGameMenu }) => {
  const { resetBackground, gameStart, gameResume } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { saves } = atramentState.metadata;

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
        {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></LinkMenu> : ''}
        <LinkMenu key="startgame" onClick={newGame}><Text id={'main.newgame'} /></LinkMenu>
        {saves ? <LinkMenu key="loadgame" onClick={openLoadGameMenu}><Text id={'main.loadgame'} /></LinkMenu> : ''}
        <LinkMenu key="about" onClick={aboutGame}><Text id={'main.about'} /></LinkMenu>
      </Block>
    </>
  );
};


export const SessionsMenuView = () => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const { atrament, canResume, resetBackground, gameStart, gameResume } = useAtrament();

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => {
    atrament.game.setSession();
    setLoadGameMenuVisible(false);
  }

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
      {loadGameMenuVisible
        ? <LoadGameMenu><LinkMenu key='go-back' onClick={closeLoadGameMenu}><Text id={'cancel'} /></LinkMenu></LoadGameMenu>
        : <>
          <GameCover />
          <Block align='end'>
            <SessionsView newGame={newGame} resumeGame={resumeGame} canResume={canResume} loadGame={openLoadGameMenu} />
            <LinkMenu key="about" onClick={aboutGame}><Text id={'main.about'} /></LinkMenu>
          </Block>
        </>
      }
    </>
  );
};


export const HomeMenuView = () => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const [ canBeResumed, setResumeState ] = useState(false);
  const { canResume } = useAtrament();

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => setLoadGameMenuVisible(false);
  

  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
  }, [ canResume ]);

  return (
    <>
      {loadGameMenuVisible
        ? <LoadGameMenu><LinkMenu key='go-back' onClick={closeLoadGameMenu}><Text id={'main.menu'} /></LinkMenu></LoadGameMenu>
        : <MainMenu canBeResumed={canBeResumed} openLoadGameMenu={openLoadGameMenu} />
      }
    </>
  );
};

