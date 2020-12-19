import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import UISettings from 'src/components/ui/settings';

const Settings = () => {
  const { dispatch, sound, volume } = useStoreon('sound', 'volume');
  const setSound = useCallback(() => {
    dispatch('switch/sound');
    dispatch('settings/save');
  }, []);
  const setVolume = useCallback((e) => {
    dispatch('set/volume', e.target.value);
    dispatch('settings/save');
  }, []);

  return (
    <UISettings
      sound={sound}
      setSound={setSound}
      volume={volume}
      setVolume={setVolume}
    />
  );
};

export default Settings;
