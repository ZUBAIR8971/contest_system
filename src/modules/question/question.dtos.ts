// src/modules/question/interfaces/create-question.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';
import { QuestionType } from '@/common/interfaces';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What is the capital of France?',
    description: 'The question text',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    example: QuestionType.SINGLE_SELECT,
    enum: QuestionType,
    description: 'Question type: single-select, multi-select, or true-false',
  })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    example: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    description: 'List of possible answer options',
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];

  @ApiProperty({
    example: ['Paris'],
    description: 'List of correct answers (for multi-select, include all correct options)',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  correctAnswers: string[];
}
