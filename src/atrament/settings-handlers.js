import { applyTheme } from 'src/themes';
import { applyFont } from 'src/fonts';
import { setCssProperty, removeCssProperty } from 'src/utils/css-properties';

export function registerSettingsHandlers(atrament) {
  const handlers = {
    theme:
      (oldV, value) => applyTheme(value),
    font:
      (oldV, value) => applyFont(value),
    fontSize:
      (oldV, value) => setCssProperty('--font-size-game', `${value}%`),
    animation:
      (oldV, value) => (value ? removeCssProperty('--animation-disabled') : setCssProperty('--animation-disabled', '0s')),
    fullscreen:
      (oldV, value) => {
        atrament.interfaces.platform.setFullscreen(value, (v) => {
          atrament.settings.set('fullscreen', v);
          atrament.settings.save();
        });
      }
  };

  Object.entries(handlers).forEach(([ name, callback ]) => atrament.settings.defineHandler(name, callback));
}
