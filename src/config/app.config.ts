import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class AppConfig {
  @Value('PORT', { default: 3000 })
  port: number;
}
