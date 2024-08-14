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

const useGameControls = () => {
  const { resetBackground, gameStart, gameResume } = useAtrament();
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
  return { newGame, resumeGame };
};

const AboutGame = () => (<LinkMenu key="about" onClick={() => route('/about')}><Text id={'main.about'} /></LinkMenu>);

const MainMenu = ({ canBeResumed, canBeLoaded, openLoadGameMenu }) => {
  const { newGame, resumeGame } = useGameControls();
  return (
    <>
      <GameCover />
      <Block align='end'>
        {canBeResumed ? <LinkMenu key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></LinkMenu> : ''}
        <LinkMenu key="startgame" onClick={newGame}><Text id={'main.newgame'} /></LinkMenu>
        {canBeLoaded ? <LinkMenu key="loadgame" onClick={openLoadGameMenu}><Text id={'main.loadgame'} /></LinkMenu> : ''}
        <AboutGame />
      </Block>
    </>
  );
};


export const SessionsMenuView = () => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const { atrament, canResume } = useAtrament();
  const { newGame, resumeGame } = useGameControls();

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => {
    atrament.game.setSession();
    setLoadGameMenuVisible(false);
  }

  return (
    <>
      {loadGameMenuVisible
        ? <LoadGameMenu><LinkMenu key='go-back' onClick={closeLoadGameMenu}><Text id={'cancel'} /></LinkMenu></LoadGameMenu>
        : <>
          <GameCover />
          <Block align='end'>
            <SessionsView newGame={newGame} resumeGame={resumeGame} canResume={canResume} loadGame={openLoadGameMenu} />
            <AboutGame />
          </Block>
        </>
      }
    </>
  );
};


export const HomeMenuView = () => {
  const [ loadGameMenuVisible, setLoadGameMenuVisible ] = useState(false);
  const [ canBeResumed, setResumeState ] = useState(false);
  const [ canBeLoaded, setLoadedState ] = useState(false);
  const { atrament, canResume } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);

  const openLoadGameMenu = () => setLoadGameMenuVisible(true);
  const closeLoadGameMenu = () => setLoadGameMenuVisible(false);
  
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
      const existingSaves = await atrament.game.listSaves();
      const saves = existingSaves.filter(
        (s) => {
          if (metadata.load_from_checkpoints && s.type === atrament.game.SAVE_CHECKPOINT) {
            return true;
          }
          return s.type === atrament.game.SAVE_GAME;
        }
      );
      if (saves.length) {
        setLoadedState(true);
      }
    }
    initHome();
  }, [ atrament.game, canResume, metadata, setLoadedState ]);

  return (
    <>
      {loadGameMenuVisible
        ? <LoadGameMenu><LinkMenu key='go-back' onClick={closeLoadGameMenu}><Text id={'main.menu'} /></LinkMenu></LoadGameMenu>
        : <MainMenu canBeResumed={canBeResumed} canBeLoaded={canBeLoaded} openLoadGameMenu={openLoadGameMenu} />
      }
    </>
  );
};

