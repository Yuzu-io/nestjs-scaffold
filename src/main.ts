import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // 全局管道，用于验证 DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只允许 DTO 中定义的属性传递到路由处理器
      transform: true, // 自动将传递的数据转换为 DTO 类型
      forbidNonWhitelisted: true, // 如果 DTO 中没有定义的属性被传递，抛出异常
    }),
  );

  await app.listen(3000);
}
bootstrap();
