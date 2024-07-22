import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';

import { themes } from 'src/themes';

const SettingButton = ({themeId, themeConfig, onClick }) =>  {
  const buttonStyle={
    color: themeConfig['--fg-color'],
    'background-color': themeConfig['--bg-color']
  }
  return (
    <button class={style.settings_theme_button} style={buttonStyle} onClick={onClick} data-theme-id={themeId}>
      <Text id={`themes.${themeId}`} defaultMessage={themeId} />
    </button>
  );
};

const SettingsTheme = () => {
  const { updateSettings } = useAtrament();
  const handleTheme = (e) => updateSettings('theme', e.target.attributes['data-theme-id'].value);
  return (
    <div class={[style.settings_theme_container, 'atrament-settings-theme'].join(' ')}>
      {Object.entries(themes).map(([k, v]) => {
        return <SettingButton key={k} themeId={k} themeConfig={v} onClick={handleTheme} />
      })}
    </div>
  );
};

export default SettingsTheme;
