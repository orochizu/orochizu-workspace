import { HttpContext } from './http-context';
import { auth } from 'firebase-admin';

interface State {
  user?: auth.UserRecord;
}

export interface ServerContext extends HttpContext {
  state: State;
}
