import { h } from 'preact';
import style from './index.module.css';

import { useCallback, useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';

import Backdrop from '../ui/backdrop';
import Modal from '../ui/modal';
import CloseButton from '../ui/close-button';

import Collapse from '../ui/collapse';

import SettingsFullscreen from './settings-fullscreen';
import SettingsSound from './settings-sound';
import SettingsText from './settings-text';
import SettingsFont from './settings-font';
import SettingsTheme from './settings-theme';
import SettingsAnimation from './settings-animation';
import SettingsVersion from './settings-version';

import SaveAndQuit from './button-save-and-quit';

import { IconMenu } from '../ui/icons';

const Settings = () => {
  //
  const translator = useTranslator();
  const [ isOpen, openSettings ] = useState(false);
  const toggleSettings = useCallback(() => openSettings(!isOpen), [ isOpen ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      toggleSettings();
    }
  }, [ toggleSettings ]);

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
          <SettingsFullscreen />
          <SettingsAnimation />
          <SettingsSound />
          <Collapse title={translator.translate('settings.appearance')}>
            <SettingsFont />
            <SettingsText />
            <SettingsTheme />
          </Collapse>
          <SaveAndQuit />
          <SettingsVersion />
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.settings_toggle} onClick={toggleSettings}><IconMenu /></button>
  );
};

export default Settings;