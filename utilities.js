const fs = require('fs');
const path = require('path');
const { StringDecoder } = require('node:string_decoder');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}


const serveFile = (filePath, contentType, response) => {

  console.log(filePath+" for "+contentType);
  realFilePath = "";
  for(i=0; i<filePath.length; i++){

    if( filePath[i]=='?' ){
      break;
    }
    realFilePath=realFilePath+filePath[i];
  }
  //filePath=realFilePath;

  console.log("real file path: "+filePath);

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
function handleGetFileRequest(req,res)
{

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  ///works but [!] any modifications in file structure => :(
  console.log("before:"+filePath);
  const baseDir = path.join(__dirname, 'login+register');
  if(req.url==='/login_register_logic.js' || req.url.toLowerCase().includes('login_register_logic.js')) {
    filePath=path.join(baseDir,'login_register_logic.js');
    console.log("fp"+filePath);
  } else if(req.url==='/formValidation.js' || req.url.toLowerCase().includes('formValidation.js')) {
    filePath=path.join(baseDir,'formValidation.js');
    console.log("fp"+filePath);
  }
  else if (req.url === '/register' || req.url.toLowerCase().includes('register')) {
    filePath = path.join(baseDir, 'register.html');
  }
  else if (req.url === '/login'|| req.url.toLowerCase().includes('login')) {
    filePath = path.join(baseDir, 'login.html');
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
}
function parseBody(req) {
  return ((resolve, reject) => {
    let bodyRaw = '';
    req.on('data', chunk => bodyRaw += chunk);

    let body = {};

    req.on('end', () => {
      try {
        switch(req.headers['content-type']) {
          case 'application/x-www-form-urlencoded':
            for(const pair of bodyRaw.split('&')) {
              const [key, value] = pair.split('=', 2).map(decodeURIComponent);
              body[key] = value;
            }
            break;
          case 'application/json':
            body = JSON.parse(bodyRaw);
            break;
        }
      } catch {
        reject("Error parsing: " + bodyRaw);
      }

      resolve(body);
    });
  });
}
module.exports = { sendJson, serveFile, parseBody, handleGetFileRequest };
