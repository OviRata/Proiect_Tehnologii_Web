const http = require('http');
const fs = require('fs');
const path = require('path');
const users = [];
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const {createServer}= require('node:http');
const {getBodyFromRequest}=require('./bodyParser.js');
const {generateToken} = require("./authentification/jwt");

const {verifyToken} = require("./authentification/verifyToken");
const formidable = require('formidable');
const jwt = require("jsonwebtoken");

const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const productController = require('./controllers/productController');


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
    console.log('got to login');
    const requestObject = await getBodyFromRequest(req);
    req.body=JSON.parse(requestObject);
    return loginController.handleLogin(req, res);


  }
  if(req.url==='/vendor/products' && req.method === 'POST') {
    return verifyToken(req, res, productController.createProduct );
  }
  else if(req.url==='/vendor/products' && req.method === 'GET') {
    return verifyToken(req, res, productController.getAllProductsOfUser );
  }
  else {
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
