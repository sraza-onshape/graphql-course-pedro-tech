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

function DisplayData() {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);

    // note: this will put something to help keep users attention while API call execute
    if (loading) {
        return <h1>DATA IS LOADING...</h1>
    }

    // note: this will help us catch errors!!
    if (error) {
        console.log(error);
    }
    // note: the "key" property initialized belowi s purely to avoid React warnings -->
    return (
        <div> 
            { data && data.users.map((user) => {
                return (
                    <div key={user.id}>
                        <h1>Name: {user.name}</h1>
                        <h2>Username: {user.username}</h2>
                        <p>Age: {user.age}</p>
                        <p>Nationality: {user.nationality}</p>
                    </div>
                );
            })} 
        </div>
    );
}

export default DisplayData;