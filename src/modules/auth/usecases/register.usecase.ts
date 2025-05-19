import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';

import { RoleTypes } from '@/common/interfaces';
import { BcryptService } from '@/common/services/bcrypt.service';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';

import { AuthService } from '../auth.service';
import { RegisterUserDto } from '../interfaces/auth.dtos';
import { Types } from 'mongoose';

@Injectable()
export class RegisterUserUC {
  private logger: Logger = new Logger(RegisterUserUC.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  async execute(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userRepo.findOne({ email: registerUserDto.email });
    if (existingUser) throw new ConflictException('User already exists with this email');

    const hashedPassword = await this.bcryptService.hashPassword(registerUserDto.password);

    const newUser = await this.userRepo.create({
      fullName: registerUserDto.fullName,
      email: registerUserDto.email,
      password: hashedPassword,
      role: registerUserDto.role,
      isVerified: true, // for the time being, when we'll implement email service we will handle this
    });

    return { message: 'User Created Successfully' };
  }
}
