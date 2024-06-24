import { h } from 'preact';
import style from './index.module.css';
import useAtrament from 'src/atrament/hooks';

import { fonts } from 'src/fonts';

const SettingsFont = () => {
  const { state, updateSettings } = useAtrament();
  const handleFont = (e) => updateSettings('font', e.target.value);
  const font = state.settings.font;
  return (
    <div class={[style.settings_font_container, 'atrament-settings-font'].join(' ')}>
      <select onChange={handleFont} style={{'font-family': fonts[font]}}>
        {Object.entries(fonts).map(([k, v]) => (
          <option key={k} value={k} style={{'font-family': v}} selected={font === k}>{k}</option>
        ))}
      </select>
    </div>
  );
};

export default SettingsFont;
