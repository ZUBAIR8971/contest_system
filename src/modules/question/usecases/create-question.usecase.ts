// src/modules/question/usecases/create-question.usecase.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ContestRepository } from '@/modules/contest/contest.repository';
import { QuestionRepository } from '../question.repository';
import { CreateQuestionDto } from '../question.dtos';
import { Types } from 'mongoose';

@Injectable()
export class CreateQuestionUC {
  private logger = new Logger(CreateQuestionUC.name);

  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly contestRepo: ContestRepository,
  ) {}

  async execute(contestId: string, dto: CreateQuestionDto) {
    const contest = await this.contestRepo.findById(contestId);
    if (!contest || contest.isDeleted) {
      throw new NotFoundException('Contest not found');
    }

    const question = await this.questionRepo.create({
      contestId: new Types.ObjectId(contestId),
      text: dto.text,
      type: dto.type,
      options: dto.options,
      correctAnswers: dto.correctAnswers,
      isDeleted: false,
    });

    await this.contestRepo.update(new Types.ObjectId(contestId), {
      $push: { questions: question._id },
    });
    this.logger.log(`Question created for contest ${contestId}`);
    return question;
  }
}
