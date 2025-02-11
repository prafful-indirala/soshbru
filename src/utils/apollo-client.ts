import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { CachePersistor } from 'apollo3-cache-persist';

import config from '@/utils/config';
import storage from '@/utils/storage';

const cache = new InMemoryCache();
export const queueLink = new QueueLink();
const serializingLink = new SerializingLink();

// Create AsyncStorage wrapper for Apollo cache persistence
const asyncStorageWrapper = {
  getItem: async (key: string) => {
    const item = await storage.getItem(key);
    return item;
  },
  setItem: async (key: string, value: string) => {
    await storage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    await storage.removeItem(key);
  },
  clear: async () => {
    await storage.clear();
  },
};

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: error => !!error,
  },
});

export const apolloPersistor = new CachePersistor({
  cache,
  storage: asyncStorageWrapper,
  debug: true,
  maxSize: false,
  key: 'app-apollo-data',
  trigger: 'write',
});

const httpLink = createHttpLink({
  uri: config?.graphqlUri,
  fetch: async (uri, options) => {
    const token = await storage.getItem('token');
    // console.log('token', token);

    const myOptions: any = { ...options };
    myOptions.headers.Authorization = token;

    return fetch(uri, myOptions);
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Initialize Apollo Client
const client: any = new ApolloClient({
  link: from([
    apolloLogger,
    serializingLink,
    retryLink,
    queueLink,
    errorLink,
    httpLink,
  ]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      // fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
