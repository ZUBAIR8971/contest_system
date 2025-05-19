import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseConfig } from '@/config/database.config';

import { DatabaseProvider } from './database.provider';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigifyModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => ({ uri: databaseConfig.databaseUrl }),
    }),
  ],
  providers: [DatabaseProvider],
})
export class DatabaseModule {}
