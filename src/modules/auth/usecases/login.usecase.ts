import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtHelperService } from '@/libs/jwt-core/jwt-helper.service';
import { UserRepository } from '@/modules/user/user.repository';

import { LoginDto } from '../interfaces/auth.dtos';

@Injectable()
export class LoginUC {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtHelperService<{ email: string; sub: string }>,
  ) {}
  async execute(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({ email: loginDto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isVerified) throw new UnauthorizedException("User's email not verified");
    const accessToken = this.jwtService.generateToken({
      email: user.email,
      sub: user._id.toString(),
    });

    return { access: { token: accessToken } };
  }
}
