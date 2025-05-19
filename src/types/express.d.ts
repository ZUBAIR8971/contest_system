import { IUser } from '@/common/interfaces';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
