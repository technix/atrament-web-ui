import { gameDefaultTheme } from 'src/constants';
import lightTheme from '../resources/themes/light.json';
import sepiaTheme from '../resources/themes/sepia.json';
import darkTheme from '../resources/themes/dark.json';

export const themes = {
  light: lightTheme.theme,
  sepia: sepiaTheme.theme,
  dark: darkTheme.theme
};

export function applyTheme(theme) {
  Object.entries(themes[theme] || themes[gameDefaultTheme]).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(`--${prop}`, value);
  });
}

