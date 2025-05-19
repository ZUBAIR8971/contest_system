import { Controller, Get } from '@nestjs/common';

import { IsPublic } from './common/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @IsPublic()
  getHello(): string {
    return 'Application is running ';
  }
}
