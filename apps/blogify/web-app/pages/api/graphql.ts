import { ApolloServer } from 'apollo-server-micro';

import admin, { ServiceAccount } from 'firebase-admin';

import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/types';

import firebaseCert from '../../_certs/blogify-firebase-admin.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCert as ServiceAccount),
    databaseURL: process.env.NX_SERVER_DATABASE_URL,
  });
}

const apolloServer = new ApolloServer({ resolvers, typeDefs, context: {} });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
