import fs from 'node:fs';
import { constructURL, isValidURL, download } from "google-fonts-helper";

const fontName = process.argv[2];
if (!fontName) {
  console.log(`Please provide Google font name.`);
  process.exit(1);
}

const fontUrl = constructURL({ families: { [fontName]: true } });
if (!isValidURL(fontUrl)) {
  console.log(`[!] ERROR: invalid Google font name "${fontName}"`);
  process.exit(1);
}

const fontDir = `./resources/fonts/${fontName}`.replace(/ /g, '-').toLowerCase();

if (fs.existsSync(fontDir)) {
  console.log(`Google font "${fontName}" is already downloaded.`);
  process.exit(1);
}

function createIndex() {
  fs.writeFileSync(
    `${fontDir}/index.js`,
    `import('./index.css');
export default { name: '${fontName}', fallback: 'sans-serif' };
`
  );
}


const downloader = download(fontUrl, {
  base64: false,
  overwriting: false,
  outputDir: fontDir,
  stylePath: 'index.css',
  fontsDir: '.',
  fontsPath: '.'
});

downloader.hook('download-font:done', (font) => {
  console.log('*', font.outputFont);
});

downloader.hook('download:start', () => {
  console.log('Downloading font file(s)...');
});

downloader.hook('download:complete', () => {
  console.log('Done.');
  createIndex();
});

await downloader.execute();
