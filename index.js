const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

/**
 * typeDefs: 
 *      basically ---> all the GQL schema you make
 * resolvers:
 *      functions you write to pull data into your "schema" format
 */
const server = new ApolloServer({ typeDefs, resolvers });

// note to self --> .then() tells us a promise is being returned, 
// then we want to invoke a method on it
server.listen().then(( { url } ) => {
    console.log(`YOUR API IS RUNNING AT: ${url}!!!`);
});