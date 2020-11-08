import { HttpContext, ServerContext } from '@orochizu-workspace/types';
import { auth } from 'firebase-admin';

export async function createContext(
  context: HttpContext
): Promise<ServerContext> {
  const token = (context.req.headers.authorization as string) || '';
  let user: auth.UserRecord | undefined;

  if (token) {
    try {
      const { email } = await auth().verifyIdToken(token);

      user = await auth().getUserByEmail(email);
    } catch (e) {
      user = undefined;
    }
  }
  return { ...context, state: { user } };
}