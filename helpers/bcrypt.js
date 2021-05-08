const bcrypt = require("bcryptjs");

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashedPasword) {
  return bcrypt.compareSync(password, hashedPasword);
}

module.exports = { hashPassword, comparePassword };
