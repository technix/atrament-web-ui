/* global __APP_VERSION__, __INK_SCRIPT__, __EMBED_FONTS__ */

import cfg from '../atrament.config.json';

export const appVersion = __APP_VERSION__;

export const embedFonts = __EMBED_FONTS__;

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


//// Internal constants ////

// error
export const ERROR_STORE_KEY = 'ERROR';

// overlay
export const OVERLAY_STORE_KEY = 'OVERLAY';

// toolbar
export const TOOLBAR_STORE_KEY = 'TOOLBAR';
export const TOOLBAR_DEFAULT = '__DEFAULT__';

// known global tags (for debugger)

export const KNOWN_GLOBAL_TAGS = [
  'title',
  'author',
  'theme',
  'font',
  'observe',
  'persist',
  'sessions',
  'autosave',
  'saves',
  'load_from_checkpoints',
  'continue_maximally',
  'single_scene',
  'scenes_align',
  'choices',
  'hypertext',
  'toolbar',
  'about',
  'cover',
  'background',
  'debug'
];
