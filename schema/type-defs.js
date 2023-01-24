const { gql } = require('apollo-server');

// note to self: syntax highlighting doesn't come for free
// in the template literal below --> install the Apollo extension!!!
const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

`;

module.exports = { typeDefs };