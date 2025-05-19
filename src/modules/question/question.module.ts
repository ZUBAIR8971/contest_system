import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { QuestionRepository } from './question.repository';
import { ContestModule } from '../contest/contest.module';
import { CreateQuestionUC } from './usecases/create-question.usecase';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    ContestModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionRepository, CreateQuestionUC],
})
export class QuestionModule {}
