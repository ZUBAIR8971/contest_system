import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PipelineStage } from 'mongoose';

import { BaseRepository } from '@/common/base/base.repository';
import { QueryOptions } from '@/common/base/query-options.interface';
import { IUser } from '@/common/interfaces';

import { User, UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument, IUser> {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {
    super(userModel);
  }

  async findWithPipeline<T>(pipeline: PipelineStage[]): Promise<T[]> {
    return this.userModel.aggregate<T>(pipeline).exec();
  }

  async findAll(options: Required<QueryOptions>): Promise<UserDocument[]> {
    const filter: FilterQuery<UserDocument> = { ...options.filters };

    if (options.search) {
      filter.$text = { $search: options.search };
    }

    return this.userModel
      .find(filter, options.search ? { score: { $meta: 'textScore' } } : undefined)
      .sort(
        options.search
          ? { score: { $meta: 'textScore' } }
          : { [options.sortBy]: options.sortOrder },
      )
      .skip(options.skip)
      .limit(options.limit);
  }
}
