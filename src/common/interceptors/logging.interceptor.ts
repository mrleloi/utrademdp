import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../modules/logging/services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap({
        next: async (response) => {
          // Extract user ID from token based on API type
          const userId = this.extractUserId(request);

          // Log the access
          await this.loggingService.logApiAccess({
            apiId: this.getApiId(request),
            userId,
            requestParams: {
              ...request.query,
              ...request.params,
            },
            responseStatus: response.statusCode || 200,
            responseTime: Date.now() - startTime,
          });
        },
        error: async (error) => {
          const userId = this.extractUserId(request);

          await this.loggingService.logApiAccess({
            apiId: this.getApiId(request),
            userId,
            requestParams: {
              ...request.query,
              ...request.params,
            },
            responseStatus: error.status || 500,
            responseTime: Date.now() - startTime,
          });
        },
      }),
    );
  }

  private extractUserId(request: any): string {
    if (request.decodedToken) {
      if (request.path.includes('inno-data')) {
        return request.decodedToken.username;
      } else {
        return request.decodedToken.parts?.userId || request.decodedToken.userId;
      }
    }
    return 'unknown';
  }

  private getApiId(request: any): number {
    if (request.path.includes('inno-data')) return 1;
    if (request.path.includes('utrade-hk')) return 2;
    if (request.path.includes('utrade-sg')) return 3;
    if (request.path.includes('ufuture')) return 4;
    return 0;
  }
}