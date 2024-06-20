const fs = require('fs');
const path = require('path');

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
  const baseDir = path.join(__dirname, 'login+register');
  if(req.url==='/login_register_logic.js' || req.url.toLowerCase().includes('login_register_logic.js')) {
    filePath=path.join(baseDir,'login_register_logic.js');
  } else if (req.url === '/register' || req.url.toLowerCase().includes('register')) {
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
function parseBody(req, callback) {
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();
    callback(JSON.parse(buffer));
  });
}
module.exports = { sendJson, serveFile, parseBody, handleGetFileRequest };
