// font styles
import { gameDefaultFont } from 'src/constants';

const emojiFonts = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const systemFonts = {
  System: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, ${emojiFonts}`,
  'Sans Serif': `"Trebuchet MS", "Lucida Grande", Arial, Helvetica, ${emojiFonts}`,
  Serif: `"Palatino", "Cambria", "Lucida Bright", "Georgia", "Times New Roman", ${emojiFonts}`,
  Monospaced: `"Monaco", "Consolas", "Lucida Console", "Courier New", ${emojiFonts}`
}

let fonts = systemFonts;

(async () => {
  if (import.meta.env.MODE !== 'singlefile') {
    // import font modules
    const modules = import.meta.glob('./**/*.js');
    await Promise.all(
      Object.values(modules).map(
        (mod) => mod().then((fontmodule) => {
          const fnt = fontmodule.default;
          if (fnt.name) {
            fonts[fnt.name] = `${fnt.name}, ${fnt.fallback || 'serif'}, ${emojiFonts}`;
          }
        })
      )
    );
  }
})();

export {
  fonts
};

export function applyFont(font) {
  document.documentElement.style.setProperty('--font-game', fonts[font] || fonts[gameDefaultFont]);
}
