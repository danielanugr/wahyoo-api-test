"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Users, { foreignKey: UserId });
    }
  }
  Transaction.init(
    {
      UserId: DataTypes.INTEGER,
      transactionType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["deposit", "withdraw"],
        validate: {
          notNull: {
            args: true,
            msg: "Transaction Type cannot be empty!",
          },
          notEmpty: {
            args: true,
            msg: "Transaction type cannot be empty!",
          },
          isIn: {
            args: [["deposit", "withdraw"]],
            msg: "Invalid transaction type",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Balance cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "Transaction amount cannot be empty",
          },
        },
      },
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
