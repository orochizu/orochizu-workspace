import { useMemo } from 'react';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import nookies from 'nookies';
import { environment } from '@orochizu-workspace/environment';

let apolloClient: ApolloClient<unknown> = null;

const httpLink = createUploadLink({ uri: environment.api });

const authLink = setContext((_, { headers }) => {
  const token = nookies.get(undefined, environment.token);

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

function createApolloClient(): ApolloClient<unknown> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink]),
  });
}

export function initializeApollo(initialState = null): ApolloClient<unknown> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
