import { BaseRepository } from '@/common/base/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Contest, ContestDocument, ContestModel } from './contest.schema';
import { IContest } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContestRepository extends BaseRepository<ContestDocument, IContest> {
  constructor(@InjectModel(Contest.name) private readonly contestModel: ContestModel) {
    super(contestModel);
  }
}
