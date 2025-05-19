import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class DatabaseConfig {
  @Value('DB_URL')
  @IsNotEmpty({ message: 'DB_URL must not be empty' })
  databaseUrl: string;
}
