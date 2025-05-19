import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ContestRepository } from '@/modules/contest/contest.repository';
import { SubmissionRepository } from '../submission.repository';
import { ContestAccessLevel, IUser, RoleTypes, SubmissionStatus } from '@/common/interfaces';
import { Types } from 'mongoose';

@Injectable()
export class StartSubmissionUC {
  private logger = new Logger(StartSubmissionUC.name);

  constructor(
    private readonly contestRepo: ContestRepository,
    private readonly submissionRepo: SubmissionRepository,
  ) {}

  async execute(user: IUser, contestId: string) {
    const contest = await this.contestRepo.findById(contestId);
    if (!contest || contest.isDeleted) {
      throw new NotFoundException('Contest not found');
    }

    if (contest.accessLevel === ContestAccessLevel.VIP && user.role !== RoleTypes.ADMIN)
      throw new BadRequestException('Contest is VIP only');

    const existing = await this.submissionRepo.findOne({
      userId: user._id,
      contestId,
      status: 'submitted',
    });
    if (existing) {
      throw new ConflictException('You have already submitted this contest');
    }

    const inProgress = await this.submissionRepo.findOne({
      userId: user._id,
      contestId,
      status: SubmissionStatus.IN_PROGRESS,
    });

    if (inProgress) {
      return { message: 'You already have an active submission', submission: inProgress };
    }

    const submission = await this.submissionRepo.create({
      userId: user._id!,
      contestId: new Types.ObjectId(contestId),
      status: SubmissionStatus.IN_PROGRESS,
      startedAt: new Date(),
    });

    this.logger.log(`Submission started by ${user.email} for contest ${contestId}`);

    return {
      message: 'Submission started successfully',
      submission,
    };
  }
}
