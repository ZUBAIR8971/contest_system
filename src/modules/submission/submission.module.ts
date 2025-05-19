import { Module } from '@nestjs/common';
import { SubmissionRepository } from './submission.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './submission.schema';
import { SubmissionController } from './submission.controller';
import { StartSubmissionUC } from './usecases/start-submission.usecase';
import { ContestModule } from '../contest/contest.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
    ContestModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionRepository, StartSubmissionUC],
  exports: [],
})
export class SubmissionModule {}
