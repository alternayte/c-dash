import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const isDev = process.env.NODE_ENV === 'development';
const httpLink = new HttpLink({
  uri: isDev ? 'http://localhost:3001/graphql' : 'https://api.atmosbot.com/graphql',
});
let splitLink = null;

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: isDev ? 'ws://localhost:3001/graphql' : 'wss://api.atmosbot.com/graphql',
    })
  );

  splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );
}

export const client = new ApolloClient({
  ssrMode: !isBrowser,
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      CandleOHLCV: {
        merge: true,
      },
      CandleResults: {
        merge: true,
      },
      CandleSubscriptionResult: {
        merge: true,
      },
    },
  }),
});
