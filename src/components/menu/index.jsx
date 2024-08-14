import { h } from 'preact';
import style from './index.module.css';

import { useCallback, useEffect, useState } from 'preact/hooks';

import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import { Tab, Tabs } from 'src/components/ui/tabs';
import CloseButton from 'src/components/ui/close-button';
import { IconMenu } from 'src/components/ui/icons';

import { useAtrament } from 'src/atrament/hooks';
import LoadGameView from 'src/components/views/loadgame';
import SaveGameView from 'src/components/views/savegame';
import Settings from 'src/components/views/settings';

const Menu = ({ showSaveAndQuit = false }) => {
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

  const loadGame = useCallback(async (saveslot) => {
    await atrament.game.restart(saveslot);
    toggleMenu();
  }, [ atrament, toggleMenu ]);

  const saveGame = useCallback(async (saveslot) => {
    await atrament.game.saveGame(saveslot);
  }, [ atrament ]);

  if (isOpen) {
    return (
      <div class={style.menu_container}>
        <Backdrop onClick={toggleMenu} />
        <Modal>
          <CloseButton onClick={toggleMenu} />
          <Tabs>
            <Tab title="Save">
              <SaveGameView saveGame={saveGame} />
            </Tab>
            <Tab title="Load">
              <LoadGameView loadGame={loadGame} hasConfirmation />
            </Tab>
            <Tab title="Settings">
              <Settings showSaveAndQuit={showSaveAndQuit} />
            </Tab>
          </Tabs>
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.menu_toggle} onClick={toggleMenu}><IconMenu /></button>
  );
};

export default Menu;