import { GAME_DEFAULT_THEME, GAME_DEFAULT_FONT } from 'src/constants';
import { applyInterfaceFont } from 'src/fonts';

export function loadDefaultTheme(atrament) {
  // set initial theme from game
  const defaultTheme = atrament.state.get().metadata.theme || GAME_DEFAULT_THEME;
  if (!atrament.settings.get('theme')) {
    atrament.settings.set('theme', defaultTheme);
  }
}

export function loadDefaultFont(atrament) {
  // set initial font from game
  const defaultFont = atrament.state.get().metadata.font || GAME_DEFAULT_FONT;
  if (!atrament.settings.get('font')) {
    atrament.settings.set('font', defaultFont);
  }
  // set game interface font
  applyInterfaceFont(GAME_DEFAULT_FONT);
}
