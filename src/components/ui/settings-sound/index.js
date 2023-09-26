import { h } from 'preact';
import style from './index.css';
import { useCallback } from 'preact/hooks';
import Toggle from '../toggle';

const SettingsSound = ({ mute, volume, setMute, setVolume }) => {
  const handleMute = useCallback((e) => setMute(!e.target.checked), [ setMute ]);
  const handleVolume = useCallback((e) => setVolume(e.target.value), [ setVolume ]);

  return (
    <>
      <div class={[style.settings_sound, 'atrament-settings-sound'].join(' ')}>
        <Toggle enabled={!mute} onChange={handleMute} /> Sound
      </div>
      <div class={style.settings_sound_container}>
        <div class={style.settings_sound_icon}>&#128265;</div>
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
        <div class={style.settings_sound_icon}>&#128266;</div>
      </div>
    </>
  );
};

export default SettingsSound;
