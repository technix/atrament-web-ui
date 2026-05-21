export function conditionalFonts(mode) {
  return {
    name: 'conditional-fonts',
    resolveId(id) {
      if (id === 'virtual:fonts') return '\0virtual:fonts';
    },
    load(id) {
      if (id === '\0virtual:fonts') {
        // If building for singlefile, emit an empty module (completely skipping the fonts)
        if (mode === 'singlefile' && !process.argv.includes('--embed-fonts')) {
          return `export const fontModules = {};`;
        }
        // Otherwise, inject the real glob literal for normal bundling
        return `export const fontModules = import.meta.glob('/resources/fonts/**/*.js', { import: 'default' });`;
      }
    }
  };
};
