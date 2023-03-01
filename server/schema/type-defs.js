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
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

    input CreateUserInput {
        # using an input is preferred to parameterizing mutation fields
        # --> allows you to do more than just passing a type

        # note: NO need to pass an ID
        name: String!
        username: String!
        age: Int
        nationality: Nationality = BRAZIL
    }

    input updateUsernameInput {
        id: ID!
        newUsername: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User! 
        updateUsername(input: updateUsernameInput!): User
        deleteUser(id: ID!): User!
    }

`;

module.exports = { typeDefs };