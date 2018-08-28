const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

const inputFile = process.argv[2];
const outputTemp = `${inputFile}.tmp.json`;
const outputFile = `${inputFile}.json`;

const inklecate = path.resolve(__dirname, 'inklecate/inklecate_win.exe');

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
        console.log(`Converted to ${outputFile}`);
      });
    });
  });
});
