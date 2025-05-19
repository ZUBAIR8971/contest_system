import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsDateString, IsString } from 'class-validator';
import { ContestAccessLevel } from '@/common/interfaces';

export class CreateContestDto {
  @ApiProperty({ example: 'Math Marathon', description: 'Name of the contest' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'A fun fast-paced math challenge', description: 'Contest description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '2025-06-01T09:00:00.000Z',
    description: 'ISO date string for contest start',
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty({
    example: '2025-06-01T11:00:00.000Z',
    description: 'ISO date string for contest end',
  })
  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @ApiProperty({ example: '$500 Amazon Gift Card', description: 'Prize description' })
  @IsNotEmpty()
  @IsString()
  prize: string;

  @ApiProperty({
    example: ContestAccessLevel.NORMAL,
    enum: ContestAccessLevel,
    description: 'Who can enter: normal or vip',
  })
  @IsNotEmpty()
  @IsEnum(ContestAccessLevel)
  accessLevel: ContestAccessLevel;
}
