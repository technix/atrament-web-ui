import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useToggle } from 'src/hooks';

import MenuButton from 'src/components/ui/menu-button';
import MenuButtonAccent from 'src/components/ui/menu-button-accent';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/views/loadgame';
import SaveGameView from 'src/components/views/savegame';
import Settings from 'src/components/views/settings';


const SaveMenuLayout = ({ saveGame, toggleSaveMenu }) => (
  <>
    <Header><h2><Text id={'main.savegame'} /></h2></Header>
    <SaveGameView saveGame={saveGame} />
    <Break />
    <MenuButton key='go-back' onClick={toggleSaveMenu}><Text id={'cancel'} /></MenuButton>
  </>
);

const LoadMenuLayout = ({ loadGame, toggleLoadMenu }) => (
  <>
    <Header><h2><Text id={'main.loadgame'} /></h2></Header>
    <LoadGameView loadGame={loadGame} hasConfirmation />
    <Break />
    <MenuButton key='go-back' onClick={toggleLoadMenu}><Text id={'cancel'} /></MenuButton>
  </>
);

const SettingsMenuLayout = ({ toggleSettingsMenu }) => (
  <>
    <Settings />
    <Break />
    <MenuButton key='go-back' onClick={toggleSettingsMenu}><Text id={'back'} /></MenuButton>
  </>
);


const Quit = () => <MenuButtonAccent onClick={() => route('/')}><Text id={'game.quit'} /></MenuButtonAccent>;

const MenuGameScreen = ({ toggleMenu }) => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { saves, load_from_checkpoints } = atramentState.metadata;

  const [ isSaveMenuOpen, toggleSaveMenu ] = useToggle(false);
  const [ isLoadMenuOpen, toggleLoadMenu ] = useToggle(false);
  const [ isSettingsMenuOpen, toggleSettingsMenu ] = useToggle(false);
  
  const loadGame = useCallback(async (saveslot) => {
    await atrament.game.restart(saveslot);
    toggleLoadMenu();
    toggleMenu();
  }, [ atrament, toggleMenu, toggleLoadMenu ]);

  const saveGame = useCallback(async (saveslot) => {
    await atrament.game.saveGame(saveslot);
  }, [ atrament ]);

  if (isSaveMenuOpen) {
    return <SaveMenuLayout saveGame={saveGame} toggleSaveMenu={toggleSaveMenu} />;
  } else if (isLoadMenuOpen) {
    return <LoadMenuLayout loadGame={loadGame} toggleLoadMenu={toggleLoadMenu} />
  } else if (isSettingsMenuOpen) {
    return <SettingsMenuLayout toggleSettingsMenu={toggleSettingsMenu} />;
  }

  return (<>
    {saves
      ? <MenuButton key='save-game' onClick={toggleSaveMenu}><Text id={'main.savegame'} /></MenuButton>
      : null
    }
    { (saves || load_from_checkpoints)
      ? <MenuButton key='load-game' onClick={toggleLoadMenu}><Text id={'main.loadgame'} /></MenuButton>
      : null
    }
    { (saves || load_from_checkpoints)
      ? <MenuButton key='settings' onClick={toggleSettingsMenu}><Text id={'main.settings'} /></MenuButton>
      : <Settings />
    }
    <Break />
    <Quit />
  </>);
};

export default MenuGameScreen;
