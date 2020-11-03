import { ApolloServer } from 'apollo-server-micro';

import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/types';

const apolloServer = new ApolloServer({ resolvers, typeDefs });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
