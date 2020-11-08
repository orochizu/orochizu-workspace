import { NextApiRequest, NextApiResponse } from 'next';

export interface HttpContext {
  req: NextApiRequest;
  res: NextApiResponse;
}
