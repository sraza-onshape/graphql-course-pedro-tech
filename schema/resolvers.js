const { MovieList, UserList } = require("../datasources/fake-data");
const lodash = require("lodash");

const resolvers = {
    // all the types 
    Query: {
        /** USER RESOLVERS */
        // use functions to declare how you'll get data for specific fields in this type
        users() {
            // JS goes here!! e.g. calls to retrieve db records
            return UserList;
        },
        // this is another example that uses arrow syntax AND has an argument
        user: (_, args) => {  // note: the first arg is parent
            const id = args.id;  // should be a User.ID
            // if you have a db --> use it here - but for now let's search via lodash
            const user = lodash.find(UserList, { id: Number(id) });
            return user;
        },

        /** RESOLVERS */
        movies: () => {
            // just like the users list resolver above!! reminds me of Django...
            return MovieList;
        },

        movie: (_, args) => {
            const name = args.name;
            const movie = lodash.find(MovieList, { name });
            return movie; 
        }
    },
};

module.exports = { resolvers };