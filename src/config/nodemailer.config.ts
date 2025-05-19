import { Configuration, Value } from '@itgorillaz/configify';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Configuration()
export class NodeMailerConfig {
  @Value('EMAIL_PROVIDER')
  @IsNotEmpty({ message: 'EMAIL_PROVIDER must not be empty' })
  emailProvider: string;

  @Value('SMTP_EMAIL')
  @IsNotEmpty({ message: 'SMTP_EMAIL must not be empty' })
  @IsEmail({}, { message: 'SMTP_EMAIL must be a valid email address' })
  smtpEmail: string;

  @Value('SMTP_PASSWORD')
  @IsNotEmpty({ message: 'SMTP_PASSWORD must not be empty' })
  smtpPassword: string;

  @Value('SMTP_SERVICE')
  @IsNotEmpty({ message: 'SMTP_SERVICE must not be empty' })
  smtpService: string;
}
