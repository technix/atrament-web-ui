import { h } from 'preact';
import style from './index.module.css';

import { useCallback, useEffect, useState } from 'preact/hooks';

import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import { IconMenu } from 'src/components/ui/icons';

import Settings from 'src/components/views/settings';

const Menu = ({ showSaveAndQuit = false }) => {
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
          <CloseButton onClick={toggleMenu} />
          <Settings showSaveAndQuit={showSaveAndQuit} />
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.menu_toggle} onClick={toggleMenu}><IconMenu /></button>
  );
};

export default Menu;