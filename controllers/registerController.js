const User = require('../db/model/User');
const bcrypt=require('bcrypt');
const {sendJson} = require("../utilities");


const handleNewUser=async (req,res)=>{
  username=req.body.username;
  fullName=req.body.fullName;
  role=req.body.role;
  email=req.body.email;
  password=req.body.password;

  console.log(username, fullName,role, email, password);
  if(!username || !password || !fullName || !role || !email )
    return sendJson(res, 409,{error:"Username, fullname, email and password are required"});

  const duplicateUsername = await User.findOne({username:username}).exec();
  const duplicateEmail = await User.findOne({email:email}).exec();

  if(duplicateUsername)return sendJson(res, 409,{error:"Username already exists"});
  if(duplicateEmail)return sendJson(res, 409,{error:"Email already exists"});

  try{
    const hashedPwd = await bcrypt.hash(password, 12);

    const result = await User.create({
      "username": username,
      "fullname": fullName,
      "role":role,
      "email": email,
      "passwordHash": hashedPwd,
    })

    console.log(result);

    return sendJson(res, 201,{message:"User created successfully"});
  }
  catch (err){
    return sendJson(res, 500,{error:err.message});
  }

}


module.exports={handleNewUser}
