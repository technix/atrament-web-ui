import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { useTranslator, Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState, useAtramentSaves } from 'src/atrament/hooks';

import getSaveDescription from 'src/utils/get-save-description';

import MenuButton from 'src/components/ui/menu-button';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';
import MenuListItem from 'src/components/ui/menu-list-item';

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


const MenuQuitButton = () => {
  const translator = useTranslator();
  const onSelect = () => route('/');
  return (<MenuListItem
    key='main-menu-quit-button'
    onSelect={onSelect}
    hasConfirmation={true}
    confirmPrompt={translator.translate('game.confirm-quit')}
  >
    <Text id={'game.quit'} />
  </MenuListItem>);
};


const MenuLayout = ({ setActiveMenu, hasSaveButton, hasLoadButton, hasQuitGameButton }) => {
  const [ , canBeLoaded ] = useAtramentSaves();
  const openSaveMenu = useCallback(() => setActiveMenu(MENU_SAVE), [ setActiveMenu ]);
  const openLoadMenu = useCallback(() => setActiveMenu(MENU_LOAD), [ setActiveMenu ]);
  const openSettingsMenu = useCallback(() => setActiveMenu(MENU_SETTINGS), [ setActiveMenu ]);
  const displayButtons = [
    // Save game
    hasSaveButton && <MenuButton key='save-game' onClick={openSaveMenu}><Text id={'main.savegame'} /></MenuButton>,
    // Load game
    hasLoadButton && <MenuButton key='load-game' onClick={openLoadMenu} attributes={{ disabled: !canBeLoaded }}><Text id={'main.loadgame'} /></MenuButton>,
    // Settings
    (hasSaveButton || hasLoadButton) ? <MenuButton key='settings' onClick={openSettingsMenu}><Text id={'main.settings'} /></MenuButton> : <Settings />,
    // Quit game
    hasQuitGameButton && <><Break /><MenuQuitButton /></>
  ];
  return <>{displayButtons}</>;
}


const MenuScreen = ({ toggleMenu, isHomeScreen }) => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { saves, load_from_checkpoints } = atramentState.metadata;
  const [ activeMenu, setActiveMenu ] = useState(NO_MENU);

  const closeSubmenu = useCallback(() => setActiveMenu(NO_MENU), [ setActiveMenu ]);

  const hasSaveButton = !!saves && !isHomeScreen;
  const hasLoadButton = !!(saves || load_from_checkpoints) && !isHomeScreen;
  const hasQuitGameButton = !isHomeScreen;

  const loadGame = useCallback(async (saveslot) => {
    await atrament.game.restart(saveslot);
    closeSubmenu();
    toggleMenu();
  }, [ atrament, toggleMenu, closeSubmenu ]);

  const saveGame = useCallback(async (saveslot) => {
    const description = getSaveDescription(atrament);
    await atrament.game.saveGame(saveslot, description);
  }, [ atrament ]);

  const displayComponents = [
    activeMenu === MENU_SAVE && <SaveMenuLayout saveGame={saveGame} closeSubmenu={closeSubmenu} />,
    activeMenu === MENU_LOAD &&  <LoadMenuLayout loadGame={loadGame} closeSubmenu={closeSubmenu} />,
    activeMenu === MENU_SETTINGS && <SettingsMenuLayout closeSubmenu={closeSubmenu} />,
    activeMenu === NO_MENU && <MenuLayout setActiveMenu={setActiveMenu} hasSaveButton={hasSaveButton} hasLoadButton={hasLoadButton} hasQuitGameButton={hasQuitGameButton} />
  ];

  return <>{displayComponents}</>;
};

export default MenuScreen;
