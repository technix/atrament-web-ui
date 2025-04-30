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
      <Toggle enabled={atramentState.settings.fullscreen} onChange={handleFullscreen} name="settings-fullscreen" />
      &nbsp;
      <label for="settings-fullscreen"><Text id={'settings.fullscreen'} /></label>
    </div>
  );
};

export default SettingsFullscreen;
