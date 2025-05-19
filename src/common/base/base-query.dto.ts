// src/shared/query/dto/base-query.dto.ts
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  @IsString()
  search: string = '';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sortBy: string = 'createdAt';

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, -1])
  sortOrder: 1 | -1 = -1;
}
