import { Types } from 'mongoose';

export enum RoleTypes {
  ADMIN = 'admin',
  VIP = 'vip',
  USER = 'user',
  GUEST = 'guest', // may be in future we save guest
}

export enum ContestAccessLevel {
  NORMAL = 'normal',
  VIP = 'vip',
}

export enum QuestionType {
  SINGLE_SELECT = 'single-select',
  MULTI_SELECT = 'multi-select',
  TRUE_FALSE = 'true-false',
}

export enum SubmissionStatus {
  IN_PROGRESS = 'in-progress',
  SUBMITTED = 'submitted',
}

export type MongooseId = Types.ObjectId;
