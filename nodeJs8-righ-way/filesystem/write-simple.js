'use strict'
const fs = require('fs');
fs.writeFile(`target.txt`, `enviado por js`, (err) => {
  if (err) {
    throw err;
  }
  console.log('File saved!');
});
