const {sendJson} = require("../utilities");
const User = require('../database/model/User');
const {getBodyFromRequest} = require("../bodyParser");
const {generateToken} = require("../authentification/jwt");
const Notification = require('../database/model/Notification');

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
  const userType=user.role;

  const requestObject = await getBodyFromRequest(req);
  const preferences=JSON.parse(requestObject);
  const favList=preferences.favorites;
  if(favList.length===0){
    if(userType!=='client'){
      let notifications = await Notification.find({userID:userID});
      sendJson(res,200, {notifications:notifications} );
      return ;
    }
    let notifications=[];
    sendJson(res,200, {notifications:notifications} );
    return ;
  }
  else if(userType==='vendor'){
    let notifications = await Notification.find({userID:userID});
    sendJson(res,200, {notifications:notifications} );
    return ;
  }
  const productNameList = favList.filter(Boolean).map(item => item.productName).filter(Boolean);
  let notifications = await Notification.find({userID:userID});

  console.log("The notifs were>"+notifications);
  if(productNameList.length!== 0){
    notifications = notifications.filter(notification => {
      return productNameList.some(productName => notification.content.includes(productName));
    });
  }
  else if(userType==="client"){
    notifications=[];
  }
  console.log("The notifs are>"+notifications);
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

  const notificationID = req.headers['notificationid'];
  console.log(notificationID);
  console.log(req.headers);
  const notification = await Notification.findOne({ _id: notificationID });
  if(!notification){
    return sendJson(res, 409, {error:"Notification with such id not found"});
  }

  const result = await Notification.deleteOne({_id:notificationID});

  sendJson(res, 200, {message:'Notification deleted successfully'});
}

module.exports={changeUserInfo, getUserNotifications, deleteUserNotification};
