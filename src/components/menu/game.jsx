import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useToggle } from 'src/hooks';

import LinkMenu from 'src/components/ui/link-menu';
import LinkHome from 'src/components/ui/link-home';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/views/loadgame';
import SaveGameView from 'src/components/views/savegame';
import Settings from 'src/components/views/settings';

const Quit = () => <LinkHome onClick={() => route('/')}><Text id={'game.quit'} /></LinkHome>;

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
    return (<>
      <Header><h2><Text id={'main.savegame'} /></h2></Header>
      <SaveGameView saveGame={saveGame} />
      <Break />
      <LinkMenu key='go-back' onClick={toggleSaveMenu}><Text id={'cancel'} /></LinkMenu>
    </>);
  } else if (isLoadMenuOpen) {
    return (<>
      <Header><h2><Text id={'main.loadgame'} /></h2></Header>
      <LoadGameView loadGame={loadGame} hasConfirmation />
      <Break />
      <LinkMenu key='go-back' onClick={toggleLoadMenu}><Text id={'cancel'} /></LinkMenu>
    </>);
  } else if (isSettingsMenuOpen) {
    return (<>
      <Settings />
      <Break />
      <LinkMenu key='go-back' onClick={toggleSettingsMenu}><Text id={'back'} /></LinkMenu>
    </>);
  }

  return (<>
    {saves
      ? <LinkMenu key='save-game' onClick={toggleSaveMenu}><Text id={'main.savegame'} /></LinkMenu>
      : null
    }
    { (saves || load_from_checkpoints)
      ? <LinkMenu key='load-game' onClick={toggleLoadMenu}><Text id={'main.loadgame'} /></LinkMenu>
      : null
    }
    { (saves || load_from_checkpoints)
      ? <LinkMenu key='settings' onClick={toggleSettingsMenu}><Text id={'main.settings'} /></LinkMenu>
      : <Settings />
    }
    <Break />
    <Quit />
  </>);
};

export default MenuGameScreen;
