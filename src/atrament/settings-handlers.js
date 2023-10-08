import { applyTheme, applyFont } from '../theme';

export function registerSettingsHandlers(atrament) {
  atrament.settings.defineHandler('theme', (oldV, value) => {
    applyTheme(value);
  });
  atrament.settings.defineHandler('font', (oldV, value) => {
    applyFont(value);
  });
  atrament.settings.defineHandler('animation', (oldV, value) => {
    document.documentElement.style.setProperty('--animation-type', value ? 'appear' : '');
  });
}
