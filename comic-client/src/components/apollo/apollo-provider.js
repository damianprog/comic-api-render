import React from 'react';
import App from '../../App';
import { ApolloClient } from 'apollo-client';
import { onError } from '@apollo/client/link/error';
import { from, InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const Provider = () => {
  const history = useHistory();

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

  const signoutLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      let unauthenticatedError = graphQLErrors.find(
        (error) => error.extensions.code === 'UNAUTHENTICATED'
      );

      if (unauthenticatedError) {
        history.push('/signout');
      }
    }
  });

  const client = new ApolloClient({
    link: from([signoutLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
