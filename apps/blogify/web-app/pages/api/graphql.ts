import { ApolloServer } from 'apollo-server-micro';

import admin, { ServiceAccount } from 'firebase-admin';

import { PrismaClient } from '@prisma/client';

import { createContext } from '@orochizu-workspace/data-access/graphql/context';

import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/types';

import firebaseCert from '../../_certs/blogify-firebase-admin.json';
import { HttpContext } from '@orochizu-workspace/types';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCert as ServiceAccount),
    databaseURL: process.env.NX_SERVER_DATABASE_URL,
  });
}

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context: (ctx: HttpContext) => createContext(ctx, prisma),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
