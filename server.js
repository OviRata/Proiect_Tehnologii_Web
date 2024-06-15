const http = require('http');
const fs = require('fs');
const path = require('path');

const serveFile = (filePath, contentType, response) => {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        fs.readFile('./404.html', (errorAux, contentAux) =>{
          if (errorAux) {
            response.end('404 - Not Found','utf-8');
          }
          else{
            response.end(contentAux,'utf-8');
          }
        })
      } else {
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
};


const {createServer}= require('node:http');
const server=createServer((req,res)=>{})
server.on("request",(req,res)=>{

  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  serveFile(filePath, contentType, res);
})
server.listen(8080,"localhost");
