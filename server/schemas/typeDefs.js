const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    transactions: [Transaction]
  }
  type Transaction {
    _id: ID
    title: String
    amount: Float
    date: String
    category: String
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user: [User]
    transactions: [Transaction]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addTransaction(
      title: String!
      amount: Float!
      date: String!
      category: String!
      description: String!) : Transaction
    deleteTransaction(transactionId: ID!): Transaction
  }
`;

module.exports = typeDefs;
