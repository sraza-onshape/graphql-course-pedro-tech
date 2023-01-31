import './App.css';
import {
  ApolloClient,  // each instance of this lets the client know you're connecting to an GQL API
  InMemoryCache,
  ApolloProvider,
  // useQuery - TODO[Zain] - use this below!!
} from '@apollo/client';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql", // the URL where the GQL API is running
  });
  // This is an example of how to make an GQL query from a front-end app like React! 
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of Users TBD</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
