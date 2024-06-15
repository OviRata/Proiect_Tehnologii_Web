const http = require('http');
const fs = require('fs');
const path = require('path');
const users = [];
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const { register, login } = require('./controllers/login+register.js');
const {createServer}= require('node:http');
const server=createServer((req,res)=>{})


server.on("request",(req,res)=>{

  if (path === '/register' && method === 'post') {
    register(req, res);
  } else if (path === '/login' && method === 'post') {
    login(req, res);
  }
  else{
    handleGetFileRequest(req,res);
  }
})
server.listen(8080,"localhost");
