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
    uri: '/graphql',
    credentials: 'include',
  });

  const handleErrorsLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      const handledError = graphQLErrors.find((error) => {
        const errorCode = error.extensions.code;
        return (
          errorCode === 'UNAUTHENTICATED' || errorCode === 'BAD_USER_INPUT'
        );
      });

      if (handledError) {
        const handledErrorCode = handledError.extensions.code;

        if (handledErrorCode === 'UNAUTHENTICATED') {
          history.push('/signout');
        }
      } else {
        history.push('/error-page');
      }
    }
  });

  const client = new ApolloClient({
    link: from([handleErrorsLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
