import { BaseRepository } from '@/common/base/base.repository';
import { Injectable } from '@nestjs/common';
import { Submission, SubmissionDocument, SubmissionModel } from './submission.schema';
import { ISubmission } from '@/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubmissionRepository extends BaseRepository<SubmissionDocument, ISubmission> {
  constructor(@InjectModel(Submission.name) private readonly submissionModel: SubmissionModel) {
    super(submissionModel);
  }
}
