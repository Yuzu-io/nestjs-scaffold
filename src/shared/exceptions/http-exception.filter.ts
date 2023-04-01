import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response 对象
    const request = ctx.getRequest<Request>(); // 获取请求上下文中的 Request 对象

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse() instanceof HttpException
          ? (exception.getResponse() as HttpException).message
          : exception.getResponse()
        : 'Internal server error';

    const error =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // 记录错误日志
    const now = Date.now();
    this.logger.error(`${exception}  ${Date.now() - now}ms`, exception.stack);

    // 设置错误信息
    const errorResponse = {
      code: status,
      message: message,
      error: error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(errorResponse);
  }
}
