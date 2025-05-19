import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { IsPublic } from '@/common/decorators/is-public.decorator';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto, RegisterUserDto } from './interfaces/auth.dtos';
import { LoginUC } from './usecases/login.usecase';
import { RegisterUserUC } from './usecases/register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUC: RegisterUserUC,
    private readonly loginUserUC: LoginUC,
  ) {}

  @Post('register')
  @IsPublic()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ description: 'User registered successfully.' })
  @ApiBadRequestResponse({ description: '(contains list of error strings in message)' })
  @ApiConflictResponse({ description: 'User already exists with this email.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.registerUserUC.execute(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @IsPublic()
  @ApiOperation({ summary: 'Loggin registered and verified user' })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiOkResponse({ description: 'User logged in successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  login(@Body() loginDto: LoginDto) {
    return this.loginUserUC.execute(loginDto);
  }
}
