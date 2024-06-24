const User = require('./model/User');
const bcrypt = require('bcrypt');

const registerAdmin = async ()=>{


  let username='adiaAdmin';
  let parola='cerealeLapte';
  let passwordHash = await bcrypt.hash(parola, 12);
  user = await User.findOne({username:username})
  if(!user){
    const result = await User.create({username:username, passwordHash:passwordHash, role:'admin', fullname:'Adia Romanescu', email:'adia@gmail.com' });
  }
  else{
    console.log('admin already registered');
  }
}



module.exports = {registerAdmin};





