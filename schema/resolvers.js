const { UserList } = require("../datasources/fake-data");

const resolvers = {
    // all the types 
    Query: {
        // use functions to declare how you'll get data for specific fields in this type
        users() {
            // JS goes here!! e.g. calls to retrieve db records
            return UserList;
        },
    },
};

module.exports = { resolvers };