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
    const extFonts = {};
    const modules = import.meta.glob('../resources/fonts/**/*.js');
    await Promise.all(
      Object.values(modules).map(
        (mod) => mod().then((fontmodule) => {
          const fnt = fontmodule.default;
          if (fnt.name) {
            extFonts[fnt.name] = `${fnt.name}, ${fnt.fallback || 'serif'}, ${emojiFonts}`;
          }
        })
      )
    );
    // add external fonts after the end of system fonts list
    Object.keys(extFonts).sort().forEach(fnt => (fonts[fnt] = extFonts[fnt]));
  }
})();

export {
  fonts
};

export function applyFont(font) {
  document.documentElement.style.setProperty('--font-game', fonts[font] || fonts[gameDefaultFont]);
}
