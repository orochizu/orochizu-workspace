import { ApolloServer } from 'apollo-server-micro';

import { PrismaClient } from '@prisma/client';

import { createContext } from '@orochizu-workspace/data-access/graphql/context';

import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/types';

import { HttpContext } from '@orochizu-workspace/types';

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
