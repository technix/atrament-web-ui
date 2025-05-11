import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import { fonts } from 'src/fonts';

const SettingsFont = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const handleFont = (e) => updateSettings('font', e.target.value);
  const font = atramentState.settings.font;
  return (
    <div class={clsx(style.settings_font_container, 'atrament-settings-font')}>
      <select onChange={handleFont} style={{'font-family': fonts[font]}}>
        {Object.entries(fonts).map(([k, v]) => (
          <option key={k} value={k} style={{'font-family': v}} selected={font === k}>{k}</option>
        ))}
      </select>
    </div>
  );
};

export default SettingsFont;
