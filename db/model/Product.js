const mongoose = require('mongoose');
const Schema=mongoose.Schema;


//  { productID:1, userID:2, name: "Iridarium", image: "./product-display/flowers/iridarium.jpg", price: "$10.00", soil:"clay", temperature:"27 °C",humidity:"80%", water:"5" , description: "Description of Product 1"  }

const productSchema = new Schema({
  productID:{type:String,unique:true},
  userID:{type:String,unique:true},
  name:{type:String,unique:true},
  image:{type:String,unique:true},
  price:{type:String,unique:true},
  soil:{type:String,unique:true},
  temperature:{type:String,unique:true},
  humidity:{type:String,unique:true},
  water:{type:String,unique:true},
  description:{type:String,unique:true}
})
