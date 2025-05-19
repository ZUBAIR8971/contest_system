import { MongooseId, SubmissionStatus } from './common';

export interface ISubmission {
  _id?: MongooseId;
  userId: MongooseId;
  contestId: MongooseId;
  status: SubmissionStatus;
  score?: number; // set when status = SUBMITTED
  startedAt: Date;
  submittedAt?: Date; // set when status = SUBMITTED
  createdAt?: Date;
  updatedAt?: Date;
}
