/*
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuditService } from "../../audit/services/audit.services";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private auditService: AuditService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: async () => {
          const userId = this.extractUserId(request);
          const { ric, ticker, exchange, ...otherParams } = request.query;

          await this.auditService.logAccess({
            apiName: this.getApiName(request),
            userId,
            ric,
            ticker,
            exchange,
            params: otherParams
          });
        }
      })
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

  private getApiName(request: any): number {
    if (request.path.includes('inno-data')) return 1;
    if (request.path.includes('utrade-hk')) return 2;
    if (request.path.includes('utrade-sg')) return 3;
    if (request.path.includes('ufuture')) return 4;
    return 0;
  }
}*/
