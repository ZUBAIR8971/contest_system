import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { BcryptService } from '@/common/services/bcrypt.service';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationAuthenticationGuard } from './guards/authentication.guard';
import { RoleAuthorizationGuard } from './guards/role-authorization-guard';
import { PassportLocalStrategy } from './strategies/local.strategy';
import { LoginUC } from './usecases/login.usecase';
import { RegisterUserUC } from './usecases/register.usecase';

@Module({
  imports: [UserModule],

  providers: [
    RegisterUserUC,
    LoginUC,
    AuthService,
    PassportLocalStrategy,
    BcryptService,
    {
      provide: APP_GUARD,
      useClass: ApplicationAuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleAuthorizationGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
