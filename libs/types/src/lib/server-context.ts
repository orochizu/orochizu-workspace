import { HttpContext } from './http-context';
import { auth } from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

interface State {
  user?: auth.UserRecord;
}

export interface ServerContext extends HttpContext {
  state: State;
  prisma: PrismaClient;
}
