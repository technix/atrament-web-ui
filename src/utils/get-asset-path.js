let getAssetPathFn = () => {};

export function registerGetAssetPath(fn) {
  getAssetPathFn = fn;
}

export function getAssetPath(file) {
  return file ? getAssetPathFn(file) : null;
}
