import React from 'react';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client';
import GetUser from "./GetUser";
import SetUser from "./SetUser";

const client = new ApolloClient({
    uri: 'http://localhost:5555/graphql',
    cache: new InMemoryCache()
});

function App() {
  return (
      <ApolloProvider client={client}>
        <GetUser/>
        <SetUser/>
      </ApolloProvider>
  );
}

export default App;
