const jwt = require("jsonwebtoken");
const { User } = require("../../database/models");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY_JWT);
}

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { email } = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (err) {
    throw { message: err.message };
  }
};

module.exports = { generateToken, verifyToken };
