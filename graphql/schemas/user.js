const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    balance: Int!
    transactions: [Transaction!]
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterRes
    login(input: LoginInput!): LoginRes
  }

  type RegisterRes {
    id: Int!
    email: String!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  type LoginRes {
    id: Int!
    email: String!
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
