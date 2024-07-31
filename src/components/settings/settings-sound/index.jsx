import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';
import Toggle from 'src/components/ui/toggle';

import { IconVolumeLow, IconVolumeHigh } from 'src/components/ui/icons';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const SettingsSound = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const handleMute = (e) => updateSettings('mute', !e.target.checked);
  const handleVolume = (e) => updateSettings('volume', e.target.value);
  const { mute, volume } = atramentState.settings;

  return (
    <>
      <div class={[style.settings_sound, 'atrament-settings-sound'].join(' ')}>
        <Toggle enabled={!mute} onChange={handleMute} /> <Text id={'settings.sound'} />
      </div>
      <div class={style.settings_sound_container}>
        <div class={style.settings_sound_icon}><IconVolumeLow /></div>
        <div class={style.settings_sound_input_container}>
          <input
            class={style.settings_sound_volume}
            disabled={mute}
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolume}
          />
        </div>
        <div class={style.settings_sound_icon}><IconVolumeHigh /></div>
      </div>
    </>
  );
};

export default SettingsSound;
