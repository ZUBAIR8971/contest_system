import { MongooseIdValidationPipe } from '@/common/pipes/mongoose-id.validation.pipe';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateQuestionDto } from './question.dtos';
import { CreateQuestionUC } from './usecases/create-question.usecase';

@Controller('contests/:contestId/questions')
export class QuestionController {
  constructor(private readonly createQuestionUC: CreateQuestionUC) {}

  @Post('')
  @ApiOperation({ summary: 'Add a question to a contest' })
  @ApiOkResponse({ description: 'Question created successfully.' })
  createQuestion(
    @Param('contestId', MongooseIdValidationPipe) contestId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.createQuestionUC.execute(contestId, dto);
  }
}
