import { Injectable } from '@nestjs/common';

import { JwtHelperService } from '@/libs/jwt-core/jwt-helper.service';

@Injectable()
export class UserService {
  constructor(private readonly jwtInvitationService: JwtHelperService<{ email: string }>) {}

  generateInvitationToken(user: { email: string }): string {
    return this.jwtInvitationService.generateToken(user);
  }

  verifyInvitationToken(token: string) {
    return this.jwtInvitationService.verifyToken(token);
  }
}
