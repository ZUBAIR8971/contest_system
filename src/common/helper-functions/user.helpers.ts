import { Request } from 'express';
import mongoose from 'mongoose';

import { UserDocument } from '@/modules/user/user.schema';

import { IUser, PublicUser } from '../interfaces';

export function mapIUserFromReqUser(reqUser: Exclude<Request['user'], undefined>): IUser {
  return {
    ...reqUser,
    _id: new mongoose.Types.ObjectId(reqUser._id),
  };
}

export function mapPublicUserFromIUser(user: IUser | UserDocument): PublicUser {
  return {
    email: user.email,
    role: user.role,
    _id: user._id,
    createdAt: user.createdAt,
    fullName: user.fullName,
  };
}
