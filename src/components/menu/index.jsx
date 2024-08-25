import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import style from './index.module.css';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import { IconMenu } from 'src/components/ui/icons';
import LinkMenu from 'src/components/ui/link-menu';
import LinkHome from 'src/components/ui/link-home';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/views/loadgame';
import SaveGameView from 'src/components/views/savegame';
import Settings from 'src/components/views/settings';


const Quit = () => <LinkHome onClick={() => route('/')}><Text id={'game.quit'} /></LinkHome>;

const MenuHomeScreen = () => (<Settings />);

const MenuGameScreen = ({ toggleMenu }) => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { saves, load_from_checkpoints } = atramentState.metadata;

  const [ isSaveMenuOpen, openSaveMenu ] = useState(false);
  const [ isLoadMenuOpen, openLoadMenu ] = useState(false);
  const [ isSettingsMenuOpen, openSettingsMenu ] = useState(false);

  const toggleSaveMenu = useCallback(() => openSaveMenu(!isSaveMenuOpen), [ isSaveMenuOpen ]);
  const toggleLoadMenu = useCallback(() => openLoadMenu(!isLoadMenuOpen), [ isLoadMenuOpen ]);
  const toggleSettingsMenu = useCallback(() => openSettingsMenu(!isSettingsMenuOpen), [ isSettingsMenuOpen ]);

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


const Menu = ({ isHomeScreen = false }) => {
  const { atrament } = useAtrament();
  const [ isOpen, openMenu ] = useState(false);

  const toggleMenu = useCallback(() => openMenu(!isOpen), [ isOpen ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      toggleMenu();
    }
  }, [ toggleMenu ]);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    }
  }, [ escHandler ]);

  if (isOpen) {
    return (
      <div class={style.menu_container}>
        <Backdrop onClick={toggleMenu} />
        <Modal>
          <div class={style.menu_content}>
            <CloseButton onClick={toggleMenu} />
            {isHomeScreen ? <MenuHomeScreen /> : <MenuGameScreen toggleMenu={toggleMenu} />}
            <div class={style.atrament_version}>atrament {atrament.version}</div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.menu_toggle} onClick={toggleMenu}><IconMenu /></button>
  );
};

export default Menu;

