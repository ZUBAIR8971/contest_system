import { Injectable, Logger, ForbiddenException, BadRequestException } from '@nestjs/common';
import { IUser, RoleTypes } from '@/common/interfaces';
import { CreateContestDto } from '../contest.dto';
import { ContestRepository } from '../contest.repository';

@Injectable()
export class CreateContestUC {
  private readonly logger = new Logger(CreateContestUC.name);

  constructor(private readonly contestRepo: ContestRepository) {}

  async execute(user: IUser, dto: CreateContestDto) {
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);
    if (end <= start) {
      throw new BadRequestException('endTime must be after startTime');
    }

    const contestData = {
      name: dto.name,
      description: dto.description,
      startTime: start,
      endTime: end,
      prize: dto.prize,
      accessLevel: dto.accessLevel,
      questions: [],
      isDeleted: false,
    };

    const created = await this.contestRepo.create(contestData);
    this.logger.log(`Contest "${created.name}" created by ${user.email}`);

    return created;
  }
}
