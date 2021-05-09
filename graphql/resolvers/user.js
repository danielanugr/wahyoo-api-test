const { comparePassword } = require("../../api/helpers/bcrypt");
const { generateToken } = require("../../api/helpers/jwt");
const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../../database/models");

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { email, password } = args.input;
      return User.create({ email, password });
    },

    async login(root, args, context) {
      const { email, password } = args.input;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const token = generateToken({ id: user.id, email: user.email });
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError("Wrong email/password");
    },
  },
};
