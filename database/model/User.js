const mongoose = require('mongoose');
const {model} = require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  fullname:{type:String,required:true},
  role:{type:String,required:true},
  passwordHash:{type:String,required:true},
  avatarImage:String
});


module.exports=mongoose.model('User',userSchema) ;
