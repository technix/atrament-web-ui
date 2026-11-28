import path from 'path';
import fs from 'fs';

function findFiles(startPath, filter, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  const files = fs.readdirSync(startPath);
  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findFiles(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  });
}

function removeEmptyDirs(dirPath, isRoot = true) {
  if (!fs.existsSync(dirPath)) return false;
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      removeEmptyDirs(fullPath, false);
    }
  });
  if (!isRoot && fs.readdirSync(dirPath).length === 0) {
    console.log(`Removing empty folder from bundle: ${dirPath}`);
    fs.rmdirSync(dirPath);
  }
}

export function removeInkFilesFromBuild() {
  return {
    name: 'remove-files-from-build',
    enforce: 'post',
    apply: 'build',
    writeBundle(options) {
      findFiles(options.dir, /\.ink$/, (item) => {
        console.log(`Removing Ink file from bundle: ${item}`);
        fs.unlinkSync(item);
      });
      removeEmptyDirs(options.dir);
    }
  };
}
