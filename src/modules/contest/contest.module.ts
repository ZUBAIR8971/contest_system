import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contest, ContestSchema } from './contest.schema';
import { ContestRepository } from './contest.repository';
import { ContestController } from './contest.controller';
import { CreateContestUC } from './usecases/create-contest.usecase';
import { GetContestsListUseCase } from './usecases/get-contest-list.usecase';
import { GetContestByIdUseCase } from './usecases/get-contest-by-id.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contest.name, schema: ContestSchema }])],
  controllers: [ContestController],
  providers: [ContestRepository, CreateContestUC, GetContestsListUseCase, GetContestByIdUseCase],
  exports: [ContestRepository],
})
export class ContestModule {}
