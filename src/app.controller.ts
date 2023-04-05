import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return '欢迎进入OPENAI，请在法律合法的情况下使用，如果有问题请联系骚风(QQ:3300626947)';
  }
}
