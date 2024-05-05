import { gameDefaultTheme, gameDefaultFont } from 'src/constants';

export function loadDefaultTheme(atrament) {
  // set initial theme from game
  const defaultTheme = atrament.state.get().metadata.theme || gameDefaultTheme;
  if (!atrament.settings.get('theme')) {
    atrament.settings.set('theme', defaultTheme);
  }
}

export function loadDefaultFont(atrament) {
  // set initial font from game
  const defaultFont = atrament.state.get().metadata.font || gameDefaultFont;
  if (!atrament.settings.get('font')) {
    atrament.settings.set('font', defaultFont);
  }
}
