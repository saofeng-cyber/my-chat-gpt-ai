import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { HttpExceptionFilter } from './common/filter';
import { ResponseDataInterceptor } from './common/response';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('openai');
  // 全局使用管道：这里使用的是内置，也可以使用自定义管道，在下文
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // 过滤不需要的dto
      transform: true, // 自动转换所需要的数据类型
      forbidNonWhitelisted: false, // 与所需参数不一致就停止请求
    }),
  );
  app.useGlobalInterceptors(new ResponseDataInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
  console.log(await app.getUrl());
}
bootstrap();
