const jwt = require("jsonwebtoken");

//const user ={id:'asc', name : 'neagu'};
function generateToken(user){
    //console.log( process.env.JWT_SECRET );
    const token = jwt.sign( {id:user.id, name:user.name, role:user.role} ,process.env.JWT_SECRET, {expiresIn: '24h'} );
    return token;
}

module.exports={generateToken}
