import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
// ass
  @Get()
  getData() {
    return this.appService.getData();
  }
}
