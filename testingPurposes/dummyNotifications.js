const Notification = require("../database/model/Notification");


const createDummyNotifications=async ()=>{

  userID='667573fdd258f9f62ae436b2';
  content='Product: laleleNoi\n' +
    'wrong type of soil';

  const result = await Notification.create({userID:userID, content:content});

  userID='667573fdd258f9f62ae436b2';
  content='Product: IridariumNou\n' +
    'low humidity';

  const result2 = await Notification.create({userID:userID, content:content});


}



module.exports={createDummyNotifications};
