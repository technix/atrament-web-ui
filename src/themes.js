import { GAME_DEFAULT_THEME } from 'src/constants';
import { setCssProperty } from './utils/css-properties';

// import theme modules
const themes = {};

const allThemes = {};
const modules = import.meta.glob('../resources/themes/*.json', { eager: true });
Object.values(modules).map(({ default: theme }) => {
  if (theme) {
    allThemes[theme.name] = theme.theme;
  }
});
// add internal themes, if they are present
['light', 'sepia', 'dark'].forEach((t) => {
  if (allThemes[t]) {
    themes[t] = allThemes[t];
    delete allThemes[t];
  }
});
// add the rest of the themes
Object.keys(allThemes).sort().forEach(t => (themes[t] = allThemes[t]));

export { themes };

export function applyTheme(theme) {
  if (!theme || !themes[theme]) {
    return;
  }
  Object.entries(themes[theme] || themes[GAME_DEFAULT_THEME])
    .forEach(([prop, value]) => setCssProperty(`--${prop}`, value));
  setThemeColorMeta(themes[theme]['bg-color']);
}

// browser UI / PWA title bar color follows the theme background
function setThemeColorMeta(color) {
  if (!color) {
    return;
  }
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = color;
}

