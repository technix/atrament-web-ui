// Application ID
// - uses page URL to make sure it's unique

export const applicationID = [
  'Atrament://',
  window.location.host,
  window.location.pathname
].join('');


// Ink file

export const gamePath = 'assets/game';
export const gameFile = 'intercept.ink.json';

//// Settings ////

// theme
export const gameDefaultTheme = 'light';

// font
export const gameDefaultFont = 'System';

// Font size range and step (percentage)
export const defaultFontSize = 100;
export const stepFontSize = 10;
export const minFontSize = defaultFontSize - ( stepFontSize * 3);
export const maxFontSize = defaultFontSize + ( stepFontSize * 5);

export const sampleFontsizeText = 'The quick brown fox jumps over the lazy dog. Jackdaws love my big sphinx of quartz.';
