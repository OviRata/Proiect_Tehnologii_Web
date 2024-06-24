const {sendJson} = require("../utilities");
const User = require("../database/model/User");
const getAllUsers = async (req, res) => {
  if(!req?.user?.username) {
    return sendJson(res, 409, {error: "Bad request"});
  }
  const user = await User.findOne({username:req.user.username});
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }

  if(user.role!=='admin'){
    return sendJson(res, 409, {error:"Unauthorized. Too small privileges"});
  }

  const users = await User.find();

  return sendJson(res, 200, {message:'all users retreived.', users:users});
}


const deleteUser = async (req, res) => {
  if(!req?.user?.username) {
    return sendJson(res, 409, {error:"Bad request"});
  }
  const user = await User.findOne({username:req.user.username});
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }
  if(user.role!=='admin'){
    return sendJson(res, 409, {error:"Not enough privileges"});
  }

  const deleteId = req.headers['deleteid'];

  const deleteUser = await User.findOne({_id:deleteId});
  if(!deleteUser){
    return sendJson(res, 409,{error:"No such user in database"} );
  }
  if(deleteUser.role==='admin'){
    return sendJson(res, 409, {error:"Attempted to delete admin."});
  }

  const result = await User.deleteOne({ _id:deleteId });
  return sendJson(res, 200, {message:"User deleted successfully"});
}



module.exports = {getAllUsers, deleteUser}
