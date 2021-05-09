"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../../api/helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, {
        foreignKey: "UserId",
        as: "transactions",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "Email is already registered" },
        validate: {
          notNull: {
            args: true,
            msg: "Email cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty",
          },
          isEmail: {
            args: true,
            msg: "Invalid Email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Password field cannot be empty",
          },
          len: {
            args: [6],
            msg: "Password length minimal 6 character",
          },
        },
      },
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          user.balance = 500000;
        },
      },
      defaultScope: {
        rawAttributes: { exclude: ["password"] },
      },
    }
  );
  return User;
};
