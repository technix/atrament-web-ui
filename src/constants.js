/* global __APP_VERSION__, __INK_SCRIPT__*/

import cfg from '../atrament.config.json';

export const appVersion = __APP_VERSION__;

// Ink file
export const gamePath = import.meta.env.MODE === 'production' && cfg.game?.zip
  ? cfg.game?.zip // only for production build, not available for "development" and "singlefile"
  : cfg.game?.path;
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
