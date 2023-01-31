/** Example of cCreating a Barebones React component */
import React from "react";
import { useQuery, gql } from '@apollo/client';

// this is an example of a "gql statement" - use the schema definition language inside!
const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    } 
`;
 
const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`;

function DisplayData() {
    // note: the syntax we use here allows us to avoid a namespace conflict for the token "data"!!
    const { data: userData, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData} = useQuery(QUERY_ALL_MOVIES);

    // note: this will put something to help keep users attention while API call execute
    if (loading) {
        return <h1>DATA IS LOADING...</h1>
    }

    // note: this will help us catch errors!!
    if (error) {
        console.log(error);
    }

    // note: the "key" property initialized below is purely to avoid React warnings -->
    return (
        <div> 
            { userData && userData.users.map((user) => {
                return (
                    <div key={user.id}>
                        <h1>Name: {user.name}</h1>
                        <h2>Username: {user.username}</h2>
                        <p>Age: {user.age}</p>
                        <p>Nationality: {user.nationality}</p>    
                    </div>
                ); 
            })} 
            { movieData && movieData.movies.map((movie) => {
                return (
                    <div key={movie.id}>
                        <h1>Name: {movie.name}</h1>
                        <p>Year: {movie.yearOfPublication}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default DisplayData;

/**
 * 
 { movieData && movieData.movies.map((movie) => {
                return (
                    <div key={movie.id}>
                        <h1>Name: </h1>
                        <h2>Username: </h2>
                        <p>Age: </p>
                        <p>Nationality: </p>
                    </div>
                );
            })} 
 *  */