import { h } from 'preact';
import style from './index.css';
import { useStore } from '@nanostores/preact';

import { useCallback, useContext, useEffect, useState } from 'preact/hooks';

import {
  Backdrop,
  Modal,
  CloseButton,
  SettingsSound,
  SettingsText,
  SettingsFont,
  SettingsTheme,
  SettingsAnimation
} from 'src/components/ui';

import Atrament from 'src/atrament-context';

const Settings = () => {
  const atrament = useContext(Atrament);
  const { settings } = useStore(atrament.store());

  const setAnimation = useCallback((v) => {
    atrament.settings.set('animation', v);
    atrament.settings.save();
  }, [ atrament.settings ]);
  const setMute = useCallback(() => {
    atrament.settings.toggle('mute');
    atrament.settings.save();
  }, [ atrament.settings ]);
  const setVolume = useCallback((v) => {
    atrament.settings.set('volume', v);
    atrament.settings.save();
  }, [ atrament.settings ]);
  const setFontSize = useCallback((v) => {
    atrament.settings.set('fontSize', v);
    atrament.settings.save();
  }, [ atrament.settings ]);
  const setTheme = useCallback((v) => {
    atrament.settings.set('theme', v);
    atrament.settings.save();
  }, [ atrament.settings ]);
  const setFont = useCallback((v) => {
    atrament.settings.set('font', v);
    atrament.settings.save();
  }, [ atrament.settings ]);
    
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
          <SettingsAnimation animation={settings.animation} setAnimation={setAnimation} />
          <SettingsSound mute={settings.mute} volume={settings.volume} setMute={setMute} setVolume={setVolume} />
          <SettingsFont font={settings.font} setFont={setFont} />
          <SettingsText font={settings.font} fontSize={settings.fontSize} setFontSize={setFontSize} />          
          <SettingsTheme theme={settings.theme} setTheme={setTheme} />
          <div style={{width: '100%', 'text-align': "right", 'font-size': '0.8rem'}}>atrament {atrament.version}</div>
        </Modal>
      </div>
    );
  }
  return (
    <button class={style.settings_toggle} onClick={toggleSettings}>☰</button>
  );
};

export default Settings;