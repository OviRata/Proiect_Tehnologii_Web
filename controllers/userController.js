const {sendJson} = require("../utilities");
const User = require('../db/model/User');
const {getBodyFromRequest} = require("../bodyParser");
const {generateToken} = require("../authentification/jwt");
const Notification = require('../db/model/Notification');

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


const getUserNotifications = async(req, res)=>{
  if(!req?.user?.username){
    return sendJson(res, 409, {error:"bad request"});
  }
  user = await User.findOne({ username: req.user.username });
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }

  const userID = user._id;

  const notifications = await Notification.find({userID:userID});

  sendJson(res,200, {notifications:notifications} );

}

const deleteUserNotification = async( req, res)=>{
  if(!req?.user?.username){
    return sendJson(res, 409, {error:"bad request"});
  }
  user = await User.findOne({ username: req.user.username });
  if(!user){
    return sendJson(res, 409, {error:"User not found"});
  }

  const notificationID = req.headers['notificationID'];
  const notification = await Notification.findOne({ _id: notificationID });
  if(!notification){
    return sendJson(res, 409, {error:"Notification with such id not found"});
  }

  const result = await Notification.deleteOne({_id:notificationID});

  sendJson(res, 200, {message:'Notification deleted successfully'});
}

module.exports={changeUserInfo, getUserNotifications, deleteUserNotification};
