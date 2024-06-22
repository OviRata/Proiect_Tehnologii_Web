const jwt = require("jsonwebtoken");
const {sendJson} = require("../utilities");

function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null || token === 'null' || token === undefined) {
    return sendJson(res, 401, { message: "Unauthorized" });
  }

  const verifyResponse = jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return false;
    }
    req.user = payload;
    return true;
  });

  if (!verifyResponse) {
    sendJson(res, 403, { message: "Forbidden" });
    return;
  }

  next(req, res);
}

module.exports={verifyToken};
