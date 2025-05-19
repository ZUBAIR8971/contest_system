import { MongooseId, RoleTypes } from './common';

export interface IUser {
  _id?: MongooseId;
  fullName: string;
  email: string;
  password: string;
  role: RoleTypes;
  isVerified?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PublicUser = Pick<IUser, '_id' | 'fullName' | 'email' | 'role' | 'createdAt'>;
