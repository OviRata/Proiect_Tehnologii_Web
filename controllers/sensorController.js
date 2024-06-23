const {getBodyFromRequest} = require("../bodyParser");
const {sendJson} = require("../utilities");
const User = require("../db/model/User");

const Notification = require("../db/model/Notification");
const {sendJson} = require("../utilities");

const getNotificationFromSensor = async (req, res)=>{

  const requestObject = await getBodyFromRequest(req);
  req.body=JSON.parse(requestObject);

  if( !req?.body?.userID || !req?.body?.content ){
    return sendJson(res, 409, 'Bad request');
  }

  const userID = req.body.userID;
  const content = req.body.content;

  const result = await Notification.create({
    'userID':userID,
    'content':content
  });

  return sendJson(res, 200, {message:'notification received successfully'} );

}


module.exports={getNotificationFromSensor}
