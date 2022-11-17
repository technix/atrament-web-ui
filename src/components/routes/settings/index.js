import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import UISettings from 'src/components/ui/settings';

const Settings = () => {
  const { dispatch, sound, volume, fontsize } = useStoreon('sound', 'volume', 'fontsize');
  const setSound = useCallback(() => {
    dispatch('switch/sound');
    dispatch('settings/save');
  }, [ dispatch ]);
  const setVolume = useCallback((e) => {
    dispatch('set/volume', e.target.value);
    dispatch('settings/save');
  }, [ dispatch ]);
  const setFontsize = useCallback((e) => {
    dispatch('set/fontsize', e.target.value);
    dispatch('settings/save');
  }, [ dispatch ]);

  return (
    <UISettings
      sound={sound}
      setSound={setSound}
      volume={volume}
      setVolume={setVolume}
      fontsize={fontsize}
      setFontsize={setFontsize}
    />
  );
};

export default Settings;
