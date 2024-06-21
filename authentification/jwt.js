const jwt = require("jsonwebtoken");

//const user ={id:'asc', name : 'neagu'};
function generateToken(user){
    //console.log( process.env.JWT_SECRET );
    const token = jwt.sign( {_id:user._id, username:user.username, role:user.role, email:user.email, fullname: user.fullname} ,process.env.JWT_SECRET, {expiresIn: '24h'} );
    return token;
}

module.exports={generateToken}
