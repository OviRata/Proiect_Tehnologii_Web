const http = require('http');
const fs = require('fs');
const path = require('path');
const users = [];
const { connectDB } = require('./db.js');
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const { register, login } = require('./controllers/authBackEnd.js');
const {createServer}= require('node:http');
const server=createServer((req,res)=>{})


server.on("request",(req,res)=>{

  const method=req.method.toLowerCase();
  const urlPath=req.url.toLowerCase();


  if (urlPath === '/register' && method === 'post') {
    parseBody(req, (err, parsedBody) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
        return;
      }
      req.body = parsedBody;
      register(req, res);
  });}
  else if (urlPath === '/login' && method === 'post') {
    parseBody(req, (err, parsedBody) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
        return;
      }
      req.body = parsedBody;
      login(req, res);
    });
  }
  else{
    handleGetFileRequest(req,res);
  }
})
connectDB().then(() => {
  server.listen(3030, 'localhost', () => {
    console.log('Server is running on port 3030');
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
