const {sendJson} = require("../utilities");
const User = require('../db/model/User');
const {getBodyFromRequest} = require("../bodyParser");
const {generateToken} = require("../authentification/jwt");


const changeUserInfo = async (req, res) =>{
  if(!req?.user?.username){
    return sendJson(res, 409, {error:"bad request"});
  }
  user = await User.findOne({ username: req.user.username });
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }

  const requestObject = await getBodyFromRequest(req);
  req.body=JSON.parse(requestObject);

  user.username = req.body.username;
  user.fullname=req.body.fullname;
  user.email=req.body.email;

  console.log(user.username);
  console.log(user.fullname);
  console.log(user.email);


  user.save();
  let jwt = generateToken(user);
  return sendJson(res, 200, {message: "User info changed successfully", jwt:jwt});
}

module.exports={changeUserInfo};
