import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import Toggle from 'src/components/ui/toggle';

import useAtrament from 'src/atrament/hooks';

const SettingsAnimation = () => {
  const { state, updateSettings } = useAtrament();
  const handleAnimation = (e) => updateSettings('animation', e.target.checked);

  return (
    <div class={['atrament-settings-animation'].join(' ')}>
      <Toggle enabled={state.settings.animation} onChange={handleAnimation} /> <Text id={'settings.animations'} />
    </div>
  );
};

export default SettingsAnimation;
