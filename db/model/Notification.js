const mongoose = require('mongoose');
const Schema=mongoose.Schema;

//  { productID:1, userID:2, name: "Iridarium", image: "./product-display/flowers/iridarium.jpg", price: "$10.00", soil:"clay", temperature:"27 °C",humidity:"80%", water:"5" , description: "Description of Product 1"  }

const notificationSchema = new Schema({
  userID:{type:String,required:true},
  content:{type:String,required:true}
},
{timestamps:true}
)

module.exports = mongoose.model('Notification',notificationSchema) ;
