import cfg from '../atrament.config.json';

// Ink file

export const gamePath = cfg.game.path;
export const gameFile = cfg.game.script;

// Application ID
// - uses page URL to make sure it's unique

export const applicationID = [
  'Atrament://',
  window.location.host,
  window.location.pathname,
  gamePath,
  gameFile
].join('');

//// Settings ////

// theme
export const gameDefaultTheme = cfg.theme;

// font
export const gameDefaultFont = cfg.font;

// Font size range and step (percentage)
export const defaultFontSize = 100;
export const stepFontSize = 10;
export const minFontSize = defaultFontSize - ( stepFontSize * 3);
export const maxFontSize = defaultFontSize + ( stepFontSize * 5);

export const sampleFontsizeText = 'The quick brown fox jumps over the lazy dog. Jackdaws love my big sphinx of quartz.';
