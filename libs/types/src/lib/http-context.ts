import { IncomingMessage, ServerResponse } from 'http';

export interface HttpContext {
  req: IncomingMessage;
  res: ServerResponse;
}
