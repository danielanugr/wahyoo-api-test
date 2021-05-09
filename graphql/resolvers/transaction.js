const { Transaction, User } = require("../../database/models");

const {
  AuthenticationError,
  ValidationError,
} = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createTransaction(_, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login first");
      }

      const { transactionType, amount } = args.input;

      let updatedUser;
      if (transactionType === "deposit") {
        updatedUser = await User.update(
          { balance: user.balance + amount },
          { where: { id: user.id }, returning: true }
        );
      } else if (transactionType === "withdraw" && user.balance > amount) {
        updatedUser = await User.update(
          { balance: user.balance - amount },
          { where: { id: user.id }, returning: true }
        );
      } else if (transactionType === "withdraw" && user.balance < amount) {
        throw new ValidationError("insufficent balance");
      } else {
        throw new ValidationError("invalid transaction type");
      }

      return Transaction.create({
        UserId: user.id,
        transactionType,
        amount,
        balance: updatedUser[1][0].dataValues.balance,
      });
    },
  },

  Query: {
    async getAllTransactions(_, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login first");
      }
      return Transaction.findAll({ where: { UserId: user.id } });
    },

    async getTransaction(_, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login first");
      }

      const { transactionId } = args;

      return Transaction.findByPk(transactionId);
    },
  },
};
