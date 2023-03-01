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

    User: {
        favoriteMovies: () => {
            // this is just hardcoded - the point is to show you can write resovlers for any type you created!
            return MovieList.filter(
                // is this the greatest decade of movie history?
                movie => movie.yearOfPublication >= 2000 && movie.yearOfPublication < 2010
            );
        },
    },

    // all the functions related to changing data
    Mutation: {
        createUser: (_, args) => {
            // NOTE[Zain]: if you have a db - place the "insert logic" in this func!
            const user = args.input;
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId + 1
            UserList.push(user);  // this updates our in-memory collection of users
            return user;
        },

        updateUsername: (_, args) => {
            const { id, newUsername } = args.input;
            let updatedUser = null;
            UserList.forEach(user => {
                if (user.id == id) {
                    user.username = newUsername;
                    updatedUser = user;
                }
            });
            return updatedUser;
        },

        deleteUser: (_, args) => {
            let user = null;
            const deletedUserInArray = lodash.remove(UserList, user => user.id === Number(args.id));
            if (deletedUserInArray.length > 0) {
                user = deletedUserInArray[0];
            }
            return user;
        }
    }
};

module.exports = { resolvers };