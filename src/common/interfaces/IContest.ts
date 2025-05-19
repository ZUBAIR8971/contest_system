import { MongooseId, ContestAccessLevel } from './common';

export interface IContest {
  _id?: MongooseId;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  prize: string;
  accessLevel: ContestAccessLevel;
  questions?: MongooseId[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
