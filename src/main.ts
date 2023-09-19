import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { resolve } from 'path';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  // 初始化 CLS 命名空间
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  app.use('/public', express.static(resolve('public')));

  // 全局管道，用于验证 DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只允许 DTO 中定义的属性传递到路由处理器
      transform: true, // 自动将传递的数据转换为 DTO 类型
      forbidNonWhitelisted: true, // 如果 DTO 中没有定义的属性被传递，抛出异常
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    // Swagger 配置
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
  }

  // 使用ws适配器
  app.useWebSocketAdapter(new WsAdapter(app))

  await app.listen(3000);
}
bootstrap();
