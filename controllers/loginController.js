const User = require('../db/model/User');
const bcrypt=require('bcrypt');
const {sendJson} = require("../utilities");

const handleLogin = async (req, res) => {

  username=req.body.username;
  password=req.body.password;

  const user = await User.findOne({username:username}).exec();
  if(  )
}
