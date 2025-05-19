import { RoleTypes } from '@/common/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user, must be between 6 and 20 characters',
  })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class RegisterUserDto {
  @ApiProperty({
    example: 'John Cina',
    description: 'This is the full name of user',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user, must be between 6 and 20 characters',
  })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    example: 'vip',
    description: 'The role of the user. Allowed values: admin, vip, user, guest',
    enum: RoleTypes,
  })
  @IsNotEmpty()
  @IsEnum(RoleTypes, { message: 'Role must be one of: admin, vip, user, guest' })
  role: RoleTypes;
}
