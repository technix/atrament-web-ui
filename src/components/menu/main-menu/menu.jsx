import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import MenuButton from 'src/components/ui/menu-button';
import MenuButtonAccent from 'src/components/ui/menu-button-accent';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/menu/elements/loadgame';
import SaveGameView from 'src/components/menu/elements/savegame';
import Settings from 'src/components/menu/elements/settings';

const NO_MENU = 0;
const MENU_SAVE = 1;
const MENU_LOAD = 2;
const MENU_SETTINGS = 3;


const SaveMenuLayout = ({ saveGame, closeSubmenu }) => (
  <>
    <Header><h2><Text id={'main.savegame'} /></h2></Header>
    <SaveGameView saveGame={saveGame} />
    <Break />
    <MenuButton key='go-back' onClick={closeSubmenu}><Text id={'cancel'} /></MenuButton>
  </>
);


const LoadMenuLayout = ({ loadGame, closeSubmenu }) => (
  <>
    <Header><h2><Text id={'main.loadgame'} /></h2></Header>
    <LoadGameView loadGame={loadGame} hasConfirmation />
    <Break />
    <MenuButton key='go-back' onClick={closeSubmenu}><Text id={'cancel'} /></MenuButton>
  </>
);


const SettingsMenuLayout = ({ closeSubmenu }) => (
  <>
    <Settings />
    <Break />
    <MenuButton key='go-back' onClick={closeSubmenu}><Text id={'back'} /></MenuButton>
  </>
);


const MenuLayout = ({ setActiveMenu, hasSaveButton, hasLoadButton, hasQuitGameButton }) => {
  const openSaveMenu = useCallback(() => setActiveMenu(MENU_SAVE), [ setActiveMenu ]);
  const openLoadMenu = useCallback(() => setActiveMenu(MENU_LOAD), [ setActiveMenu ]);
  const openSettingsMenu = useCallback(() => setActiveMenu(MENU_SETTINGS), [ setActiveMenu ]);
  const displayButtons = [
    // Save game
    hasSaveButton && <MenuButton key='save-game' onClick={openSaveMenu}><Text id={'main.savegame'} /></MenuButton>,
    // Load game
    hasLoadButton && <MenuButton key='load-game' onClick={openLoadMenu}><Text id={'main.loadgame'} /></MenuButton>,
    // Settings
    (hasSaveButton || hasLoadButton) ? <MenuButton key='settings' onClick={openSettingsMenu}><Text id={'main.settings'} /></MenuButton> : <Settings />,
    // Quit game
    hasQuitGameButton && <><Break /><MenuButtonAccent onClick={() => route('/')}><Text id={'game.quit'} /></MenuButtonAccent></>
  ];
  return <>{displayButtons}</>;
}


const MenuScreen = ({ toggleMenu, isHomeScreen }) => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { saves, load_from_checkpoints } = atramentState.metadata;
  const [ activeMenu, setActiveMenu ] = useState(NO_MENU);

  const closeSubmenu = useCallback(() => setActiveMenu(NO_MENU), [ setActiveMenu ]);
  
  const exitApp = atrament.interfaces.platform.exitApp;
  const hasSaveButton = !!saves && !isHomeScreen;
  const hasLoadButton = !!(saves || load_from_checkpoints) && !isHomeScreen;
  const hasQuitGameButton = !isHomeScreen;
  const hasExitAppButton = isHomeScreen && exitApp;

  const loadGame = useCallback(async (saveslot) => {
    await atrament.game.restart(saveslot);
    closeSubmenu();
    toggleMenu();
  }, [ atrament, toggleMenu, closeSubmenu ]);

  const saveGame = useCallback(async (saveslot) => {
    await atrament.game.saveGame(saveslot);
  }, [ atrament ]);

  const displayComponents = [
    activeMenu === MENU_SAVE && <SaveMenuLayout saveGame={saveGame} closeSubmenu={closeSubmenu} />,
    activeMenu === MENU_LOAD &&  <LoadMenuLayout loadGame={loadGame} closeSubmenu={closeSubmenu} />,
    activeMenu === MENU_SETTINGS && <SettingsMenuLayout closeSubmenu={closeSubmenu} />,
    activeMenu === NO_MENU && <MenuLayout setActiveMenu={setActiveMenu} hasSaveButton={hasSaveButton} hasLoadButton={hasLoadButton} hasQuitGameButton={hasQuitGameButton} />,
    hasExitAppButton && (<><Break /><MenuButtonAccent onClick={exitApp}><Text id={'main.exit'} /></MenuButtonAccent></>)
  ];

  return <>{displayComponents}</>;
};

export default MenuScreen;
