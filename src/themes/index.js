import { gameDefaultTheme } from 'src/constants';
import lightTheme from './light.json';
import sepiaTheme from './sepia.json';
import darkTheme from './dark.json';

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

