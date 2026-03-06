import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { useTranslator, Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState, useAtramentSaves } from 'src/atrament/hooks';

import Block from 'src/components/ui/block';
import Break from 'src/components/ui/break';
import Header from 'src/components/ui/header';
import MenuButton from 'src/components/ui/menu-button';
import MenuListItem from 'src/components/ui/menu-list-item';

import LoadGameView from 'src/components/menu/elements/loadgame';

import SessionsList from './sessions';
import GameCover from './game-cover';
import useGameControls from './use-game-controls';

const MENU_MAIN = 0;
const MENU_LOAD = 1;

// Menu buttons

const ExitAppButton = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const exitApp = atrament.interfaces.platform.exitApp;
  if (!exitApp) {
    return <></>;
  }
  return (<MenuListItem
    accented
    key='menu-exit-button'
    onSelect={exitApp}
    hasConfirmation={true}
    confirmPrompt={translator.translate('main.confirm-exit')}
  >
    <Text id={'main.exit'} />
  </MenuListItem>);
};


const MainMenuSessions = ({ setVisibleMenu }) => {
  const { canResume } = useAtrament();
  const { newGame, resumeGame } = useGameControls();

  const startSessionCallback = useCallback(async (hasSaves) => {
    if (hasSaves) {
      if (await canResume()) {
        await resumeGame();
      } else {
        setVisibleMenu(MENU_LOAD);
      }
    } else {
      await newGame();
    }
  }, [ resumeGame, newGame, setVisibleMenu ])

  return <SessionsList startSessionCallback={startSessionCallback} />;
};

const MainMenuItems = ({ setVisibleMenu }) => {
  const [ canBeResumed, canBeLoaded ] = useAtramentSaves();
  const { newGame, resumeGame } = useGameControls();
  return (
    <>
      {canBeResumed ? <MenuButton key="continuegame" onClick={resumeGame}><Text id={'main.continue'} /></MenuButton> : ''}
      <MenuButton key="startgame" onClick={newGame}><Text id={'main.newgame'} /></MenuButton>
      {canBeLoaded ? <MenuButton key="loadgame" onClick={() => setVisibleMenu(MENU_LOAD)}><Text id={'main.loadgame'} /></MenuButton> : ''}
    </>
  );
}

// menu screens

const MainMenuScreen = ({ setVisibleMenu }) => {
  const { metadata } = useAtramentState(['metadata']);
  return (
    <>
      <GameCover />
      <Block align='end'>
        {
          metadata.sessions
            ? <MainMenuSessions setVisibleMenu={setVisibleMenu} />
            : <MainMenuItems setVisibleMenu={setVisibleMenu} />
        }
        {metadata.about ? <MenuButton key="about" onClick={() => route('/about')}><Text id={'main.about'} /></MenuButton> : ''}
        <ExitAppButton />
      </Block>
    </>
  );
};


const LoadMenuScreen = ({ setVisibleMenu }) => {
  const { loadGame } = useGameControls();
  return (
    <Block align='end'>
      <Header><h2><Text id={'main.loadgame'} /></h2></Header>
      <LoadGameView loadGame={loadGame} hasConfirmation />
      <Break />
      <MenuButton key='go-back' onClick={() => setVisibleMenu(MENU_MAIN)}><Text id={'main.menu'} /></MenuButton>
    </Block>
  );
};

const menuComponents = [ MainMenuScreen, LoadMenuScreen ];

const HomeMenuView = () => {
  const [ visibleMenu, setVisibleMenu ] = useState(MENU_MAIN);
  const MenuRenderer = menuComponents[visibleMenu];
  return <MenuRenderer setVisibleMenu={setVisibleMenu} />;
};

export default HomeMenuView;
