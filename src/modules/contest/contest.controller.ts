import { Controller, Get, Post, Param, Body, NotImplementedException, Req } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { RolesAllowed } from '@/common/decorators/roles-allowed.decorator';
import { IUser, RoleTypes } from '@/common/interfaces';
import { CreateContestUC } from './usecases/create-contest.usecase';
import { CreateContestDto } from './contest.dto';
import { Request } from 'express';
import { IsPublic } from '@/common/decorators/is-public.decorator';
import { GetContestsListUseCase } from './usecases/get-contest-list.usecase';
import { GetContestByIdUseCase } from './usecases/get-contest-by-id.usecase';
import { MongooseIdValidationPipe } from '@/common/pipes/mongoose-id.validation.pipe';

@Controller('contests')
export class ContestController {
  constructor(
    private readonly createContestUC: CreateContestUC,
    private readonly getContestsListUC: GetContestsListUseCase,
    private readonly getContestByIdUC: GetContestByIdUseCase,
  ) {}
  @Get('')
  @IsPublic()
  @ApiOperation({ summary: 'List all contests (basic info)' })
  @ApiOkResponse({ description: 'Array of contest summaries.' })
  getPublic() {
    return this.getContestsListUC.execute();
  }

  @Get(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Get a single contest (basic info)' })
  @ApiOkResponse({ description: 'Contest summary.' })
  getPublicById(@Param('id', MongooseIdValidationPipe) id: string) {
    return this.getContestByIdUC.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contest' })
  @ApiOkResponse({ description: 'Contest created.' })
  @RolesAllowed(RoleTypes.ADMIN)
  async create(@Body() dto: CreateContestDto, @Req() req: Request) {
    const user: IUser = req.user!;
    return this.createContestUC.execute(user, dto);
  }
}
