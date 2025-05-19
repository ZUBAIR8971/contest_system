import { Injectable, NotFoundException } from '@nestjs/common';
import { ContestRepository } from '../contest.repository';

@Injectable()
export class GetContestByIdUseCase {
  constructor(private readonly contestRepository: ContestRepository) {}

  async execute(contestId: string) {
    const contest = await this.contestRepository.findById(contestId);
    if (!contest) {
      throw new NotFoundException(`Contest with ID ${contestId} not found`);
    }
    return contest;
  }
}
