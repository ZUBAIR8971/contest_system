import { Injectable } from '@nestjs/common';
import { ContestRepository } from '../contest.repository';

@Injectable()
export class GetContestsListUseCase {
  constructor(private readonly contestRepository: ContestRepository) {}

  async execute() {
    return await this.contestRepository.find({});
  }
}
