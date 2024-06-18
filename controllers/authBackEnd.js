const { createUser, findUserByEmail } = require('../userModel.js');
const {findUserByUsername} = require("../userModel");


async function register(req, res) {
  try {
    console.log("trying to register");
    const { username, email, password } = req.body;
    console.log("Data> ", username, email, password);

    const userExists = await findUserByEmail(email);
    if (userExists) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      console.log("email exists");
      res.end(JSON.stringify({ message: 'Email already exists' }));
      return;
    }

    const result = await createUser(username, email, password);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    console.log("Created");
    res.end(JSON.stringify({ message: 'User created', userId: result.insertedId }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    console.log("internal error");
    res.end(JSON.stringify({ message: 'Internal server error', error }));
  }
}

async function login(req, res) {
  try {
    let {username, password} = req.body;
    let user;
    if(username.contains("@")){
      user = await findUserByEmail(username);
    }
    else user=await findUserByUsername(username);
    console.log("ok");
    if (!user) {
      res.writeHead(401, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Invalid email or password'}));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.writeHead(401, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Invalid email or password'}));
      return;
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Login successful', userId: user._id}));
  } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Internal server error', error}));
  }
}

module.exports = { register, login };
