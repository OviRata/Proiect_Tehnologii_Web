const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const users = [];
const {fileMap,whitelist_nocase, isWithinWhitePath} = require('./whitelist.js');
const {blackListed} = require('./blacklist.js');
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('./utilities.js');
const {createServer}= require('node:http');
const {getBodyFromRequest}=require('./bodyParser.js');
const {generateToken} = require("./authentification/jwt");
const {verifyToken} = require("./authentification/verifyToken");
const formidable = require('formidable');
const jwt = require("jsonwebtoken");
const emailController = require("./controllers/orderEmailController");
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const sensorController = require('./controllers/sensorController');

const adminController = require('./controllers/adminController');

require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./database/dbConn');
const PORT = process.env.PORT || 3030;

const {createDummyNotifications}= require('./testingPurposes/dummyNotifications');

createDummyNotifications();

const {registerAdmin}=require('./database/adminRegistering.js');

registerAdmin();

const replaceCase="/product-display/flowers/";

const server=createServer( async (req,res)=> {
  if (fileMap[req.url]) {
      res.writeHead(301, { 'Location': fileMap[req.url] });
      res.end();
      return;
  }
  const index = req.url.indexOf(replaceCase);
  if (index !== -1 && (!req.url.includes("productpages")|| req.url.substring(1).includes("/productpages"))) {
    const filePart = req.url.substring(index + replaceCase.length);
    const newUrl = path.join("/productpages"+replaceCase, filePart);
    console.log("WOWWW>"+newUrl);
    res.writeHead(301, { 'Location': newUrl});
    res.end();
    return;
  }
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

    const requestObject = await getBodyFromRequest(req);
    req.body=JSON.parse(requestObject);

    console.log(requestObject);
    console.log(typeof requestObject);
    return registerController.handleNewUser(req,res);

  } else if (req.url === '/login' && req.method === 'POST') {
    console.log('got to login');
    const requestObject = await getBodyFromRequest(req);
    req.body=JSON.parse(requestObject);
    return loginController.handleLogin(req, res);
  }
  else if(req.url==='/sendorderdetails' && req.method === 'POST') {
    const requestObject = await getBodyFromRequest(req);
    req.body=JSON.parse(requestObject);
    return verifyToken(req,res, emailController.handleOrderEmail);
  }
  else if(req.url==='/vendor/products' && req.method === 'POST') {
    return verifyToken(req, res, productController.createProduct );
  }
  else if(req.url==='/vendor/products' && req.method === 'GET') {
    return verifyToken(req, res, productController.getAllProductsOfUser );
  }
  else if(req.url==='/client/products' && req.method==='GET'){
    return verifyToken(req, res, productController.getAllProductsForSale );
  }
  else if(req.url==='/vendor/delete' && req.method==='DELETE') {
    return verifyToken(req, res, productController.deleteProduct );
  }
  else if( req.url==='/vendor/products/move/specific' && req.method==='PUT' ){
    return verifyToken(req, res, productController.moveSpecificFlowerStage );
  }
  else if(req.url==='/notlogged/products' && req.method==='GET'){
    return productController.getAllProductsForSaleNotLogged(req, res);
  }
  else if(req.url==='/user/change' && req.method==='PUT'){
    return verifyToken(req, res, userController.changeUserInfo );
  }
  else if( req.url==='/sensor/notifications' && req.method==='POST' ){
    return sensorController.getNotificationFromSensor(req, res);
  }
  else if( req.url==='/user/notifications' && (req.method==='GET' || req.method==='POST') ){
    return verifyToken( req, res, userController.getUserNotifications );
  }
  else if(req.url==='/user/notifications' && req.method==='DELETE'){
    return verifyToken( req, res, userController.deleteUserNotification );
  }
  else if(req.url==='/admin/users' && req.method==='GET'){
    return verifyToken(req, res, adminController.getAllUsers );
  }
  else if (req.url==='/admin/users' && req.method==='DELETE'){
    return verifyToken(req, res, adminController.deleteUser );
  }
  else {
    console.log("requested simple file");
    if(blackListed(req.url.toLowerCase())){
      return sendJson(res,403,{message: '[BLACKLIST] Forbidden request.'});
    }
    else if(whitelist_nocase.includes(req.url.toLowerCase()))
      handleGetFileRequest(req, res);
    else if(isWithinWhitePath(req.url))
      handleGetFileRequest(req,res);
    else return sendJson(res,403,{message: 'Forbidden request.'});
  }
}
);


connectDB();

mongoose.connection.once( 'open', ()=>{
  console.log('Connected to MongoDB');
  server.listen(PORT,"localhost");
} )
