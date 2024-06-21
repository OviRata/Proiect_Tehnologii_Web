const User = require('../db/model/User');
const bcrypt=require('bcrypt');
const {sendJson} = require("../utilities");
const {generateToken} = require("../authentification/jwt");

const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');

const handleLogin = async (req, res) => {

  username=req.body.username;
  password=req.body.password;
  passwordHash = await bcrypt.hash(password, 12);

  const user = await User.findOne({username:username}).exec();
  //console.log(user.username);
  if( !user ){
    return sendJson(res, 409,{error:"User with given username doesn't exist."});
  }
  console.log(password);
  console.log(passwordHash);
  console.log(user.passwordHash);
  isGood=false;
  bcrypt.compare(password, user.passwordHash, function(err, result) {
    //return sendJson(res, 202, {message:"User found!"});
    if(result){
      console.log("password is good")
      localStorage.setItem("isGood", "1");
    }
    else{
      console.log("password is not good");
      localStorage.setItem("isGood", "0");
    }
  });
  console.log( localStorage.getItem("isGood") );
  if( localStorage.getItem("isGood")==="1" ){
    isGood=true;
  }
  else{
    isGood=false;
  }

  if(isGood){
    return sendJson(res, 202, {message:"User is found!", token:generateToken(user) } );
  }
  return sendJson(res, 409, {error:"The password is incorrect."});

}



module.exports={handleLogin}
