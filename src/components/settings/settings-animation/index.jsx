import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import Toggle from 'src/components/ui/toggle';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const SettingsAnimation = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const handleAnimation = (e) => updateSettings('animation', e.target.checked);

  return (
    <div class={['atrament-settings-animation'].join(' ')}>
      <Toggle enabled={atramentState.settings.animation} onChange={handleAnimation} /> <Text id={'settings.animations'} />
    </div>
  );
};

export default SettingsAnimation;
