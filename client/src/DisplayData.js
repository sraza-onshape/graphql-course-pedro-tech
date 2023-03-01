/** Example of cCreating a Barebones React component */
import { React, useState } from "react";
import { gql, useLazyQuery, useQuery } from '@apollo/client';

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

// THIS is an example of writing a query that takes in an input parameter!!
const QUERY_MOVIE = gql`
    # note: the name of the formal param below NEEDS to match what it is in your schema!!
    query GetMovieByName($name: String!) {
        # "note the $ sign!"
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

function DisplayData() {
    // note: the following is called a "state" - we use it to retrieve user-inputted values!
    const [movieSearched, setMovieSearched] = useState("");
    // note: the syntax we use here allows us to avoid a namespace conflict for the token "data"!!
    const { data: userData, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

    // Create movie state - this call lets us grab the input data using a gql hook - lazily!
    const [
        fetchMovie,
        { data: movieSearchedData, error: movieError }
    ] = useLazyQuery(QUERY_MOVIE);

    // note: this will put something to help keep users attention while API call execute
    if (loading) {
        return <h1>DATA IS LOADING...</h1>
    }

    // note: this will help us catch errors!!
    if (error) {
        console.log(error);
    }
    if (movieError) {
        console.log(movieError);
    }

    // note: the "key" property initialized below is purely to avoid React warnings 
    /**
     * this will showcase: 
     *      1) how to render our JSON in JSX
     *      2) how to render JSON "dynamically" (i.e. based on an event created by the user)
     */
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
            <div> {/* textbox to enter the name of a movie - btw, this is a JSX comment :) */}
                <input 
                    type="text" 
                    placeholder="Interstellar..."
                    onChange={(event) => {
                        setMovieSearched(event.target.value);
                    }}
                />
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            name: movieSearched,
                        }
                    });
                }}
                >
                    Fetch Data
                </button>
                <div>
                    { movieSearchedData && (
                        <div> 
                            <h1>MovieName: {movieSearchedData.movie.name}</h1>
                            <h4>MovieYear: {movieSearchedData.movie.yearOfPublication}</h4>{" "}
                        </div>
                    )}
                    {/* UI error handling */}
                    {movieError && <h5>There was an error fetching the movie you searched!</h5>}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;