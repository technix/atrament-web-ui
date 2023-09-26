import { h } from 'preact';
import style from './index.css';
import { useCallback } from 'preact/hooks';

import { themes } from 'src/components/theme';

const SettingButton = ({themeId, themeConfig, onClick }) =>  {
  const buttonStyle={
    color: themeConfig['--fg-color'],
    'background-color': themeConfig['--bg-color']
  }
  return (<button class={style.settings_theme_button} style={buttonStyle} onClick={onClick} data-theme-id={themeId}>{themeId}</button>);
};

const SettingsTheme = ({ setTheme }) => {
  const handleTheme = useCallback((e) => setTheme(e.target.attributes['data-theme-id'].value), [ setTheme ]);
  return (
    <div class={[style.settings_theme_container, 'atrament-settings-theme'].join(' ')}>
      {Object.entries(themes).map(([k, v]) => {
        return <SettingButton key={k} themeId={k} themeConfig={v} onClick={handleTheme} />
      })}
    </div>
  );
};

export default SettingsTheme;
