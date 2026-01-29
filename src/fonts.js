// font styles
import { gameDefaultFont, embedFonts, FONTS_SYSTEM, FONTS_EMOJI } from 'src/constants';
import { setCssProperty } from './utils/css-properties';

let fonts = { ...FONTS_SYSTEM };

(async () => {
  if (import.meta.env.MODE !== 'singlefile' || embedFonts) {
    // import font modules
    const extFonts = {};
    const modules = import.meta.glob('../resources/fonts/**/*.js', { import: 'default' });
    await Promise.all(
      Object.values(modules).map(
        (mod) => mod().then((fnt) => {
          if (fnt.name) {
            extFonts[fnt.name] = `${fnt.name}, ${fnt.fallback || 'serif'}, ${FONTS_EMOJI}`;
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

export const applyFont = (font) => setCssProperty('--font-face-game', fonts[font] || fonts[gameDefaultFont]);
export const applyInterfaceFont = (font) => setCssProperty('--font-face-ui', fonts[font] || FONTS_SYSTEM['System']);
