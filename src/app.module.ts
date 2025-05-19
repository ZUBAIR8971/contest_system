import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

import { AppController } from './app.controller';
import { JwtCoreModule } from './libs/jwt-core/jwt-core.module';
import { ContestModule } from './modules/contest/contest.module';
import { QuestionModule } from './modules/question/question.module';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtCoreModule,
    ContestModule,
    QuestionModule,
    SubmissionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
