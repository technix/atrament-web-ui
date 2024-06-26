import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import Toggle from 'src/components/ui/toggle';

import useAtrament from 'src/atrament/hooks';

const SettingsFullscreen = () => {
  const { state, updateSettings } = useAtrament();
  const handleFullscreen = (e) => updateSettings('fullscreen', e.target.checked);

  return (
    <div class={['atrament-settings-fullscreen'].join(' ')}>
      <Toggle enabled={state.settings.fullscreen} onChange={handleFullscreen} /> <Text id={'settings.fullscreen'} />
    </div>
  );
};

export default SettingsFullscreen;
