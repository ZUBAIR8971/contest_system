import { MongooseId, QuestionType } from './common';

export interface IQuestion {
  _id?: MongooseId;
  contestId: MongooseId; // reference back to the Contest
  text: string; // the question prompt
  type: QuestionType; // one of the types above
  options: string[]; // possible answers (for true-false, use ['true','false'])
  correctAnswers: string[]; // for single-select: length=1; for multi-select: multiple; for true-false: ['true'] or ['false']
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
