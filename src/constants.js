/* global __APP_VERSION__, __EMBED_FONTS__ */

const cfg = window.$atramentConfig;

export const APP_VERSION = __APP_VERSION__;

export const EMBED_FONTS = __EMBED_FONTS__;

// Ink file
export const GAME_PATH = import.meta.env.MODE === 'production' && cfg.game?.zip
  ? cfg.game?.zip // only for production build, not available for "development" and "singlefile"
  : cfg.game?.path;
export const GAME_FILE = cfg.game.script;

// Application ID
// - uses page URL to make sure it's unique

export const APP_ID = [
  'Atrament://',
  window.location.host,
  window.location.pathname,
  GAME_PATH,
  '/',
  GAME_FILE
].join('');

//// Settings ////

// i18n
export const APP_LANGUAGE = cfg.language || 'en';
export const APP_LOCALE = cfg.locale || 'en-US';

// theme
export const GAME_DEFAULT_THEME = cfg.theme;

// font
export const GAME_DEFAULT_FONT = cfg.font;

// Font size range and step (percentage)
export const DEFAULT_FONT_SIZE = 100;
export const FONT_SIZE_STEP = 10;
export const FONT_SIZE_MIN = DEFAULT_FONT_SIZE - (FONT_SIZE_STEP * 3);
export const FONT_SIZE_MAX = DEFAULT_FONT_SIZE + (FONT_SIZE_STEP * 5);

// volume
export const DEFAULT_VOLUME = 50;

// Atrament settings
export const ATRAMENT_SETTINGS = {
  fullscreen: false,
  animation: true,
  mute: false,
  volume: DEFAULT_VOLUME,
  fontSize: DEFAULT_FONT_SIZE
};

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

// background
export const BACKGROUND_STORE_KEY = 'background';
export const BACKGROUND_PAGE_STORE_KEY = 'background_page';

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

export const KNOWN_SCENE_TAGS = [
  'IMAGE',
  'BACKGROUND',
  'PAGE_BACKGROUND',
  'CLEAR',
  'AUDIO',
  'AUDIOLOOP',
  'PLAY_SOUND',
  'STOP_SOUND',
  'PLAY_MUSIC',
  'STOP_MUSIC',
  'CHECKPOINT',
  'SAVEGAME',
  'RESTART',
  'RESTART_FROM_CHECKPOINT',
  'CLASS',
  'SHUFFLE_CHOICES',
  'PROMPT',
  'HYPERTEXT',
  'CHOICES',
  'AUTO_CHOICE'
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

// close overlay delay
export const CLOSE_OVERLAY_DELAY = 200;

