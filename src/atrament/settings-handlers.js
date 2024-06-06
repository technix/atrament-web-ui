import { applyTheme } from 'src/themes';
import { applyFont } from 'src/fonts';

export function registerSettingsHandlers(atrament) {
  atrament.settings.defineHandler('theme', (oldV, value) => {
    applyTheme(value);
  });
  atrament.settings.defineHandler('font', (oldV, value) => {
    applyFont(value);
  });
  atrament.settings.defineHandler('animation', (oldV, value) => {
    if (value) {
      document.documentElement.style.removeProperty('--animation-disabled');
    } else {
      document.documentElement.style.setProperty('--animation-disabled', '0s');
    }
    
  });
}
