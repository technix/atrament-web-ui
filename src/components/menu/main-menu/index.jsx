import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import style from './index.module.css';
import clsx from 'clsx';

import { CLOSE_OVERLAY_DELAY } from 'src/constants';

import { useKeyboardHandler, useToggle } from 'src/hooks';

import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import VersionInfo from 'src/components/ui/version-info';
import { IconMenu } from 'src/components/ui/icons';

import DebuggerMenu from 'src/components/screens/debugger';
import AboutMenu from 'src/components/menu/elements/about-atrament';

import MenuScreen from './menu';

const Menu = ({ isHomeScreen = false }) => {
  const [ isClosing, setIsClosing ] = useState(false);
  const [ isOpen, toggleMainMenu ] = useToggle(false);
  const [ isAboutMenuOpen, toggleAboutMenu, setAboutMenu ] = useToggle(false);

  const toggleMenu = useCallback((e) => {
    e?.stopPropagation();
    setIsClosing(isOpen);
    setTimeout(() => {
      toggleMainMenu();
      setAboutMenu(false);
    }, CLOSE_OVERLAY_DELAY);
  }, [ isOpen, toggleMainMenu, setAboutMenu ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      toggleMenu();
    }
  }, [ toggleMenu ]);

  useKeyboardHandler(escHandler);

  const containerClasses = clsx(
    'transparent animation_appear animation_appear_overlay',
    isClosing && 'animation_disappear'
  );

  return (
    <>
      <button class={style.menu_toggle} onClick={toggleMenu}><IconMenu /></button>
      <DebuggerMenu />
      {isOpen && <ContainerModal className={containerClasses}>
        <Backdrop onClick={toggleMenu} />
        <Modal>
          <div class={style.menu_content}>
            <CloseButton onClick={toggleMenu} />
            {isAboutMenuOpen
              ? <AboutMenu onClick={toggleAboutMenu} />
              : <>
                <MenuScreen isHomeScreen={isHomeScreen} toggleMenu={toggleMenu} />
                <VersionInfo onClick={toggleAboutMenu} />
              </>
            }
          </div>
        </Modal>
      </ContainerModal>
      }
    </>
  );
};

export default Menu;

