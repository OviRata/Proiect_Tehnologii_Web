const users = []; // [! to modify> add DB]
const {sendJson,serveFile,parseBody,handleGetFileRequest} = require('../utilities.js');

 function register(req, res) {

   function f(body, err){
    if (err) {
      return sendJson(res, 400, { error: 'Invalid JSON format' });
    }
    console.log(body);
    const { username, password } = body;
    if (!username || !password) {
      return sendJson(res, 400, { error: 'Username and password are required' });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return sendJson(res, 400, { error: 'User already exists' });
    }

    users.push({ username, password });
    console.log('successfull register');
    return sendJson(res, 200, { message: 'User registered successfully' });
  }

  f( (parseBody(req)) );
}

function login(req, res) {
  parseBody(req, (err, body) => {
    if (err) {
      return sendJson(res, 400, { error: 'Invalid JSON format' });
    }
    const { username, password } = body;
    if (!username || !password) {
      return sendJson(res, 400, { error: 'Username and password are required' });
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return sendJson(res, 400, { error: 'Invalid username or password' });
    }

    return sendJson(res, 200, { message: 'Login successful' });
  });
}

module.exports = { register, login };
