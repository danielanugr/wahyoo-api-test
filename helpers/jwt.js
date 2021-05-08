const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY_JWT);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY_JWT);
}

module.exports = { generateToken, verifyToken };
