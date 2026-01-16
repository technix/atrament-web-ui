import { h } from 'preact';
import clsx from 'clsx';
import { Text } from '@eo-locale/preact';
import Toggle from 'src/components/ui/toggle';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const SettingsAnimation = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const handleAnimation = (e) => updateSettings('animation', e.target.checked);

  return (
    <div class={clsx('atrament-settings-animation')}>
      <Toggle enabled={atramentState.settings.animation} onChange={handleAnimation} name="settings-animation" />
      &nbsp;
      <label for="settings-animation"><Text id={'settings.animations'} /></label>
    </div>
  );
};

export default SettingsAnimation;
