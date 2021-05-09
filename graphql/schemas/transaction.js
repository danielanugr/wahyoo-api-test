const { gql } = require("apollo-server-express");

module.exports = gql`
  type Transaction {
    id: Int!
    transactionType: String!
    amount: Int!
    balance: Int
    createdAt: String
  }

  extend type Query {
    getAllTransactions: [Transaction!]
    getTransaction(transactionId: Int!): Transaction
  }

  extend type Mutation {
    createTransaction(input: transactionInput): createTransactionRes
  }

  input transactionInput {
    transactionType: String!
    amount: Int!
  }

  type createTransactionRes {
    id: Int!
    transactionType: String!
    amount: Int!
    balance: Int!
    createdAt: String!
  }
`;
