'use strict';
require('fs').createReadStream(process.arv[2])
 .on(`data`, chunk => process.stdout.write(chunk))
 .on(`error`, => process.stderr.write(`ERROR: ${err.message}\n`));
