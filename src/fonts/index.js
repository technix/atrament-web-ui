// font styles
import { gameDefaultFont } from 'src/constants';

(async () => {
  if (import.meta.env.MODE !== 'singlefile') {
    await import('src/fonts/fira-sans/index.css');
    await import('src/fonts/lora/index.css');
    await import('src/fonts/merriweather/index.css');
    await import('src/fonts/opendyslexic/index.css');
  }
})();

const emojiFonts = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const systemFonts = {
  System: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, ${emojiFonts}`,
  'Sans Serif': `"Trebuchet MS", "Lucida Grande", Arial, Helvetica, ${emojiFonts}`,
  Serif: `"Palatino", "Cambria", "Lucida Bright", "Georgia", "Times New Roman", ${emojiFonts}`,
  Monospaced: `"Monaco", "Consolas", "Lucida Console", "Courier New", ${emojiFonts}`
}

const extraFonts = {
  'Fira Sans': `"Fira Sans", sans-serif, ${emojiFonts}`,
  Lora: `"Lora", serif, ${emojiFonts}`,
  Merriweather: `"Merriweather", serif, ${emojiFonts}`,
  OpenDyslexic: `"OpenDyslexic", serif, ${emojiFonts}`
};

export const fonts = import.meta.env.MODE === 'singlefile' ? systemFonts : { ...systemFonts, ...extraFonts };

export function applyFont(font) {
  document.documentElement.style.setProperty('--font-game', fonts[font] || fonts[gameDefaultFont]);
}
