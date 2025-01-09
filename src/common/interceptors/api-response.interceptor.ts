import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export interface Response<T> {
  statusCode: number;
  responseTime: string;
  data: T;
  errors: string | null;
}

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          responseTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data: data,
          errors: null,
        };
      }),
    );
  }
}
