import { gameDefaultTheme } from 'src/constants';

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
  Object.entries(themes[theme] || themes[gameDefaultTheme]).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(`--${prop}`, value);
  });
}

