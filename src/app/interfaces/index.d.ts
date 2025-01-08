import { TUser } from '../modules/User/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
