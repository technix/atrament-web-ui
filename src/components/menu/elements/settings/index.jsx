import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';

import { SETTINGS_SCREEN } from 'src/constants';

import Collapse from 'src/components/ui/collapse';

import SettingsFullscreen from './settings-fullscreen';
import SettingsSound from './settings-sound';
import SettingsText from './settings-text';
import SettingsFont from './settings-font';
import SettingsTheme from './settings-theme';
import SettingsAnimation from './settings-animation';

const settingsElements = {
  fullscreen: SettingsFullscreen,
  animation: SettingsAnimation,
  sound: SettingsSound,
  font: SettingsFont,
  text: SettingsText,
  theme: SettingsTheme
};

const renderItems = (items, translator) => items.map((item, index) => {
  if (typeof item === 'string') {
    const Element = settingsElements[item];
    return Element ? <Element key={item} /> : null;
  }
  if (item && Array.isArray(item.items)) {
    const content = renderItems(item.items, translator).filter(Boolean);
    if (content.length === 0) {
      return null;
    }
    return (
      <Collapse key={`group-${index}`} title={translator.translate(item.title || '')}>
        {content}
      </Collapse>
    );
  }
  return null;
});

const Settings = () => {
  const translator = useTranslator();
  return (
    <div class={style.settings_container}>
      {renderItems(SETTINGS_SCREEN, translator)}
    </div>
  );
};

export default Settings;
