import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import Toggle from '../toggle';

const SettingsAnimation = ({ animation, setAnimation }) => {
  const handleAnimation = useCallback((e) => setAnimation(e.target.checked), [ setAnimation ]);

  return (
    <div class={['atrament-settings-animation'].join(' ')}>
      <Toggle enabled={animation} onChange={handleAnimation} /> Animations
    </div>
  );
};

export default SettingsAnimation;
