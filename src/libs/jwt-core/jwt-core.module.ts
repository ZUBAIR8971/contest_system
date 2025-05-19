import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '@/config/jwt.config';

import { JwtHelperService } from './jwt-helper.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: JwtConfig) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: config.jwtExpiresIn },
      }),
      inject: [JwtConfig],
    }),
  ],
  providers: [JwtHelperService],
  exports: [JwtHelperService],
})
export class JwtCoreModule {}
