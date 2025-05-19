import { Injectable } from '@nestjs/common';

import { BcryptService } from '@/common/services/bcrypt.service';

import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userRepo.findOne({ email: email });
    if (!user) return null;
    const passwordMatched = await this.bcryptService.comparePassword(password, user.password);
    if (!passwordMatched) return null;
    return user;
  }
}
