const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

const inputDir = process.argv[2];
const inklecate = path.resolve(__dirname, 'inklecate/inklecate.exe');

glob(`${inputDir}/*.ink`, undefined, (er, files) => files.forEach((f) => convertFile(f)));


function convertFile(inputFile) {
  const outputTemp = `${inputFile}.tmp.json`;
  const outputFile = `${inputFile}.json`;
  const prc = spawn(inklecate, ['-o', outputTemp, inputFile]);

  prc.on('close', () => {
    fs.readFile(outputTemp, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      const outputFileContent = data.replace('\uFEFF', '');
      fs.writeFile(outputFile, outputFileContent, () => {
        fs.unlink(outputTemp, (ferr) => {
          if (ferr) {
            throw ferr;
          }
          console.log(`${inputFile}\t=>\t${outputFile}`);
        });
      });
    });
  });
}
