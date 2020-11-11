import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({ uri: '/api/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') ?? '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
});

export default client;
