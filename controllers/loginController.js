const User = require('../db/model/User');
const bcrypt=require('bcrypt');
const {sendJson} = require("../utilities");
const {generateToken} = require("../authentification/jwt");


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

  const match = bcrypt.compare(password, user.passwordHash);

  if(match){
    return sendJson(res, 202, {message:"User is found!", token:generateToken(user) } );
  }
  else {
    return sendJson(res, 409, {error: "The password is incorrect."});
  }
}



module.exports={handleLogin}
