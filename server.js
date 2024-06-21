const http = require('http');
const fs = require('fs');
const path = require('path');
const users = [];
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const {createServer}= require('node:http');
const {getBodyFromRequest}=require('./bodyParser.js');
const {generateToken} = require("./authentification/jwt");

const registerController = require('./controllers/registerController');

require('dotenv').config();



const mongoose = require('mongoose');
const connectDB = require('./db/dbConn');
const PORT = process.env.PORT || 3030;


const server=createServer( async (req,res)=> {
  //console.log(req.url!=='/register');
  if( req.url.toLowerCase().includes('login_register_logic.js') ){
    handleGetFileRequest(req, res);
    return;
  }
  else
  if ( req.url.toLowerCase().includes('login') && req.url !== '/login') {
    res.writeHead(302, {'Location': '/login'});
    res.end();
    return;
  } else if (req.url.toLowerCase().includes('register') && req.url!=='/register' ) {
    console.log('requested register, here');
    res.writeHead(302, {'Location': '/register'});
    res.end();
    return;
  }
  console.log(req.method);
  console.log(req.url);


  if ( req.url==='/register' && req.method === 'POST') {
    //register(req, res);

    const requestObject = await getBodyFromRequest(req);
    req.body=JSON.parse(requestObject);

    console.log(requestObject);
    console.log(typeof requestObject);

    // const token = generateToken();
    // console.log(token);

   return registerController.handleNewUser(req,res);
    //return sendJson(res, 200, { message: 'User registered successfully', status:200 });

  } else if (req.url === '/login' && req.method === 'POST') {
    //login(req, res);



  } else {
    console.log("requested simple file");
    handleGetFileRequest(req, res);
  }

}
);


connectDB();

mongoose.connection.once( 'open', ()=>{
  console.log('Connected to MongoDB');
  server.listen(PORT,"localhost");
} )
