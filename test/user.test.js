const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
