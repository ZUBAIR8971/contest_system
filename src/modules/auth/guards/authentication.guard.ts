import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtHelperService } from '@/libs/jwt-core/jwt-helper.service';
import { UserRepository } from '@/modules/user/user.repository';

@Injectable()
export class ApplicationAuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtHelperService<{ email: string; sub: string }>,
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    const { sub } = this.jwtService.verifyToken(token);
    const user = await this.userRepository.findOne({ _id: sub });
    if (!user) throw new UnauthorizedException();
    request['user'] = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
