const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};

const server = http.createServer(function(req, res) {
  let uri = url.parse(req.url).pathname;
  let fileName = path.join(process.cwd(), unescape(uri));
  console.log('Loading ' + uri);

  let stats;

  try {
    stats = fs.lstatSync(fileName);
  } catch (e) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
    return;
  }

  if (stats.isFile()) {
    const ext = path.extname(fileName).substring(1); // remove the dot
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {'Content-Type': mimeType});
    const fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    res.writeHead(302, {
      'Location': path.join(uri, 'index.html')
    });
    res.end();
  } else {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('500 Internal Server Error\n');
    res.end();
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
