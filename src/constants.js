import cfg from '../atrament.config.json';

// Ink file
export const gamePath = cfg.game.path;
export const gameFile = __INK_SCRIPT__;

// Application ID
// - uses page URL to make sure it's unique

export const applicationID = [
  'Atrament://',
  window.location.host,
  window.location.pathname,
  gamePath,
  '/',
  gameFile
].join('');

//// Settings ////

// i18n
export const appLanguage = cfg.language || 'en';
export const appLocale = cfg.locale || 'en-US';

// theme
export const gameDefaultTheme = cfg.theme;

// font
export const gameDefaultFont = cfg.font;

// Font size range and step (percentage)
export const defaultFontSize = 100;
export const stepFontSize = 10;
export const minFontSize = defaultFontSize - ( stepFontSize * 3);
export const maxFontSize = defaultFontSize + ( stepFontSize * 5);
