const mongoose = require('mongoose');
const Schema=mongoose.Schema;


//  { productID:1, userID:2, name: "Iridarium", image: "./product-display/flowers/iridarium.jpg", price: "$10.00", soil:"clay", temperature:"27 °C",humidity:"80%", water:"5" , description: "Description of Product 1"  }

const productSchema = new Schema({
  userID:{type:String,required:true},
  name:{type:String,required:true},
  imageName:{type:String,required:true},
  price:{type:String,required:true},
  soil:{type:String,required:true},
  temperature:{type:String,required:true},
  humidity:{type:String,required:true},
  water:{type:String,required:true},
  stage:{type:String,required:true},
  description:{type:String}
})

module.exports = mongoose.model('Product',productSchema) ;
