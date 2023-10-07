import { h } from 'preact';
import style from './index.css';

import { useCallback, useEffect, useState } from 'preact/hooks';

import {
  Backdrop,
  Modal,
  CloseButton,
  SettingsSound,
  SettingsText,
  SettingsFont,
  SettingsTheme,
  SettingsAnimation,
  SettingsVersion
} from 'src/components/ui';

const Settings = () => {
  //
  const [ isOpen, openSettings ] = useState(false);
  const toggleSettings = useCallback(() => openSettings(!isOpen), [ isOpen ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      openSettings(false)
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    }
  }, [ escHandler ]);

  if (isOpen) {
    return (
      <div class={style.settings_container}>
        <Backdrop onClick={toggleSettings} />
        <Modal>
          <CloseButton onClick={toggleSettings} />
          <SettingsAnimation />
          <SettingsSound />
          <SettingsFont />
          <SettingsText />
          <SettingsTheme />
          <SettingsVersion />
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.settings_toggle} onClick={toggleSettings}>☰</button>
  );
};

export default Settings;