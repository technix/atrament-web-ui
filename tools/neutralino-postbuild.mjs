import { zip } from 'zip-a-folder';
import { readdir } from 'node:fs/promises';

async function main() {
  const files = await readdir('.');
  const appName = files[0];
  await zip('**/*-linux_*, **/*.neu', `${appName}-linux.zip`);
  await zip('**/*-mac_*, **/*.neu', `${appName}-mac.zip`);
  await zip('**/*-win_*, **/*.neu', `${appName}-windows.zip`);
}

main();
console.log('>>> Standalone build complete.');
