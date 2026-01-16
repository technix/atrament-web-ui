import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import style from './index.module.css';

import { useKeyboardHandler, useToggle } from 'src/hooks';

import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import VersionInfo from 'src/components/ui/version-info';
import { IconMenu } from 'src/components/ui/icons';

import DebuggerMenu from 'src/components/views/debugger';
import AboutMenu from 'src/components/views/about';

import MenuScreen from './menu';

const Menu = ({ isHomeScreen = false }) => {
  const [ isOpen, toggleMainMenu ] = useToggle(false);
  const [ isAboutMenuOpen, toggleAboutMenu, setAboutMenu ] = useToggle(false);

  const toggleMenu = useCallback(() => {
    toggleMainMenu();
    setAboutMenu(false);
  }, [ toggleMainMenu, setAboutMenu ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      toggleMenu();
      setAboutMenu(false);
    }
  }, [ toggleMenu, setAboutMenu ]);

  useKeyboardHandler(escHandler);

  if (isOpen) {
    return (
      <ContainerModal>
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
    );
  }
  return (
    <>
      <button class={style.menu_toggle} onClick={toggleMenu}><IconMenu /></button>
      <DebuggerMenu />
    </>
  );
};

export default Menu;

