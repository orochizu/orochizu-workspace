import { HttpContext, ServerContext } from '@orochizu-workspace/types';
import { PrismaClient } from '@prisma/client';
import { firebaseAdmin } from '@orochizu-workspace/data-access/firebase/server';

export async function createContext(
  context: HttpContext,
  prisma: PrismaClient
): Promise<ServerContext> {
  const token = (context.req.headers.authorization as string) || '';
  let user: firebaseAdmin.auth.UserRecord | undefined;

  if (token) {
    try {
      const { email } = await firebaseAdmin.auth().verifyIdToken(token);

      user = await firebaseAdmin.auth().getUserByEmail(email);
    } catch (e) {
      user = undefined;
    }
  }
  return { ...context, state: { user }, prisma };
}
