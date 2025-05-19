import { MongooseId } from './common';

export interface IUserAnswer {
  _id?: MongooseId;
  submissionId: MongooseId;
  questionId: MongooseId;
  selectedOptions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
