const http = require('http');
const fs = require('fs');
const path = require('path');
const users = [];
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const { register, login } = require('./controllers/authBackEnd.js');
const {createServer}= require('node:http');
const server=createServer((req,res)=>{})



server.on("request",(req,res)=>{

  if (path.toString().toLowerCase().includes('login') && path!=='/login') {
    res.writeHead(302, { 'Location': '/login' });
    res.end();
    return;
  }
  else if(path.toString().toLowerCase().includes('register') && path!=='/register') {
    res.writeHead(302, { 'Location': '/register' });
    res.end();
    return;
  }

  if (path === '/register' && method === 'post') {
    register(req, res);
  } else if (path === '/login' && method === 'post') {
    login(req, res);
  }
  else{
    handleGetFileRequest(req,res);
  }
})
server.listen(3030,"localhost");
