import { Controller, Post, Param, Body, Req } from '@nestjs/common';
import { StartSubmissionUC } from './usecases/start-submission.usecase';
import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { RolesAllowed } from '@/common/decorators/roles-allowed.decorator';
import { RoleTypes } from '@/common/interfaces';

@Controller('contests/:contestId/submissions')
export class SubmissionController {
  constructor(private readonly startSubmissionUC: StartSubmissionUC) {}

  @Post()
  @RolesAllowed(RoleTypes.USER, RoleTypes.VIP)
  @ApiOperation({ summary: 'Start a new contest submission (attempt)' })
  @ApiOkResponse({ description: 'Submission started successfully' })
  @ApiConflictResponse({ description: 'You have already submitted this contest' })
  @ApiNotFoundResponse({ description: 'Contest not found' })
  @ApiBadRequestResponse({ description: 'You do not have access to this contest' })
  async start(@Param('contestId') contestId: string, @Req() req: Request) {
    const user = req.user!;
    return this.startSubmissionUC.execute(user, contestId);
  }
}
