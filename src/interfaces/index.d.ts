/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from 'jsonwebtoken';

//must use interface not to overwrite express d ts file
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
