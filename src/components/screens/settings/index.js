import { h } from 'preact';
import style from './index.css';
import { useStore } from '@nanostores/preact';

import { useCallback, useContext, useEffect, useState } from 'preact/hooks';

import {
  SettingsBackdrop,
  SettingsModal,
  SettingsCloseButton,
  SettingsSound,
  SettingsSpeech,
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
  });
  const setMute = useCallback(() => {
    atrament.settings.toggle('mute');
    atrament.settings.save();
  });
  const setVolume = useCallback((v) => {
    atrament.settings.set('volume', v);
    atrament.settings.save();
  });
  const setFontSize = useCallback((v) => {
    atrament.settings.set('fontSize', v);
    atrament.settings.save();
  });
  const setTheme = useCallback((v) => {
    atrament.settings.set('theme', v);
    atrament.settings.save();
  });
  const setFont = useCallback((v) => {
    atrament.settings.set('font', v);
    atrament.settings.save();
  });
  const setSpeech = useCallback((v) => {
    atrament.settings.toggle('speech');
    atrament.settings.save();
  });
  const setVoice = useCallback((v) => {
    atrament.settings.set('voice', v);
    atrament.settings.save();
  });


  //
  const [ isOpen, openSettings ] = useState(false);
  const toggleSettings = useCallback(() => openSettings(!isOpen));

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      openSettings(false)
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    }
  }, [ escHandler ]);

  if (isOpen) {
    return (
      <div class={style.settings_container}>
        <SettingsBackdrop onClick={toggleSettings} />
        <SettingsModal>
          <SettingsCloseButton onClick={toggleSettings} />
          <SettingsAnimation animation={settings.animation} setAnimation={setAnimation} />
          <SettingsSound mute={settings.mute} volume={settings.volume} setMute={setMute} setVolume={setVolume} />
          <SettingsFont font={settings.font} setFont={setFont} />
          <SettingsText font={settings.font} fontSize={settings.fontSize} setFontSize={setFontSize} />          
          <SettingsTheme theme={settings.theme} setTheme={setTheme} />
          <SettingsSpeech speech_synthesis={settings.speech} speech_synthesis_voice={settings.voice} setSpeech={setSpeech} setVoice={setVoice} />
          <div style={{width: '100%', 'text-align': "right", 'font-size': '0.8rem'}}>atrament {atrament.version}</div>
        </SettingsModal>
      </div>
    );
  } else {
    return (
      <button class={style.settings_toggle} onClick={toggleSettings}>☰</button>
    );
  }
};

export default Settings;