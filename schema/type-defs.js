const { gql } = require('apollo-server');

// note to self: syntax highlighting doesn't come for free
// in the template literal below --> install the Apollo extension!!!
const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }

`;

module.exports = { typeDefs };