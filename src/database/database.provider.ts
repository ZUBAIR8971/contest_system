import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseProvider implements OnModuleInit {
  private readonly logger = new Logger(DatabaseProvider.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.once('open', () => {
      this.logger.log('✅ Database connection established successfully!');
    });

    this.connection.on('error', (err) => {
      this.logger.error('❌ Database connection error:', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ Database connection lost!');
    });
  }
}
