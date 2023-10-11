import { Filesystem } from '../lib/browser-asar';

let asarFs;

export async function loadAsar(filepath) {
  const fetchAsar = await fetch(filepath);
  const asarContent = await fetchAsar.arrayBuffer();
  const buf = new Uint8Array(asarContent);
  try {
    asarFs = Filesystem(buf);
  } catch (e) {
    throw new Error(`INVALID ASAR ${e.message}`);
  }
}

export async function inkLoader(path) {
  return asarFs ? asarFs.readFileSync(path, true) : '';
}

export function getAssetPath(path) {
  const content = asarFs.readFileSync(path);
  const fileContent = new Blob([content]);
  return URL.createObjectURL(fileContent);
}
