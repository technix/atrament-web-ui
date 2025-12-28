/* global __APP_VERSION__, __EMBED_FONTS__ */

const cfg = window.$atramentConfig;

export const appVersion = __APP_VERSION__;

export const embedFonts = __EMBED_FONTS__;

// Ink file
export const gamePath = import.meta.env.MODE === 'production' && cfg.game?.zip
  ? cfg.game?.zip // only for production build, not available for "development" and "singlefile"
  : cfg.game?.path;
export const gameFile = cfg.game.script;

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
export const minFontSize = defaultFontSize - (stepFontSize * 3);
export const maxFontSize = defaultFontSize + (stepFontSize * 5);

// volume
export const defaultVolume = 50;

//// Internal constants ////

// error
export const ERROR_STORE_KEY = 'ERROR';

// overlay
export const OVERLAY_STORE_KEY = 'OVERLAY';

// toolbar
export const TOOLBAR_STORE_KEY = 'TOOLBAR';
export const TOOLBAR_DEFAULT = '__DEFAULT__';

// story path
export const STORYPATH_STORE_KEY = '$story_path';

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
  'debug',
  'allow_external_function_fallbacks'
];

// fonts

export const FONTS_EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const FONTS_SYSTEM = {
  System: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, system-ui, sans-serif, ${FONTS_EMOJI}`,
  'Sans Serif': `"Trebuchet MS", "Lucida Grande", Arial, Helvetica, sans-serif, ${FONTS_EMOJI}`,
  Serif: `"Palatino", "Cambria", "Lucida Bright", "Georgia", "Times New Roman", serif, ${FONTS_EMOJI}`,
  Monospaced: `"Monaco", "Consolas", "Lucida Console", "Courier New", monospaced, ${FONTS_EMOJI}`
};

//////////// delayed actions /////////////////

// delay before scene loader animation
export const LOADER_DELAY = 300;

// delay between choice selection
export const SINGLE_CHOICE_DELAY = 150;
export const MULTI_CHOICE_DELAY = 350;

// story scroll into view
export const SCROLL_INTO_VIEW_DELAY = 100;
export const SCROLL_INTO_VIEW_DURATION = 300;
