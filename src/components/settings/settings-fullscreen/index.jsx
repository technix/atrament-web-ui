import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import Toggle from 'src/components/ui/toggle';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const SettingsFullscreen = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const handleFullscreen = (e) => updateSettings('fullscreen', e.target.checked);

  return (
    <div class={['atrament-settings-fullscreen'].join(' ')}>
      <Toggle enabled={atramentState.settings.fullscreen} onChange={handleFullscreen} /> <Text id={'settings.fullscreen'} />
    </div>
  );
};

export default SettingsFullscreen;
