import { h } from 'preact';
import style from './index.css';
import { useCallback } from 'preact/hooks';

import { fonts } from 'src/components/theme';

const SettingsFont = ({ font, setFont }) => {
  const handleFont = useCallback((e) => setFont(e.target.value), [ setFont ]);
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
