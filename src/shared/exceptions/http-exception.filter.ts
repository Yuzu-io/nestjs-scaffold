import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response 对象
    const status = exception.getStatus(); // 获取异常状态码
    // 设置错误信息
    const errorResponse = {
      code: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
