import { BaseRepository } from '@/common/base/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { IQuestion } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument, QuestionModel } from './question.schema';

@Injectable()
export class QuestionRepository extends BaseRepository<QuestionDocument, IQuestion> {
  constructor(@InjectModel(Question.name) private readonly questionModel: QuestionModel) {
    super(questionModel);
  }
}
