import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class JwtConfig {
  @Value('JWT_SECRET')
  @IsNotEmpty({ message: 'JWT_SECRET must not be empty' })
  jwtSecret: string;

  @Value('JWT_EXPIRES_IN')
  @IsNotEmpty({ message: 'JWT_EXPIRES_IN must not be empty' })
  jwtExpiresIn: string;
}
