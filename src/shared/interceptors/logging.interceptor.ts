import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 0,
          msg: '请求成功',
        };
      }),
    );
  }
}
