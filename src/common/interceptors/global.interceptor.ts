import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { convertXmlToJson } from 'src/shared/helpers/converter.helpers';
import * as moment from 'moment';
import { AppConstant } from 'src/shared/constants/app.constants';
import { LoggerService } from '@modules/logger/logger.service';
import { MarketsService } from 'src/shared/markets/markets.service';
import { addingRicToResponse } from 'src/shared/helpers/response.helpers';

@Injectable()
export class GlobalInterceptor implements NestInterceptor<any> {
  constructor(
    private readonly logger: LoggerService,
    private readonly market: MarketsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const globalRequest = context.switchToHttp().getRequest();
    const globalResponse = context.switchToHttp().getResponse<Response>();

    const now = Date.now();
    const ip = globalRequest.headers['x-real-ip'];
    const { method, url, params, body } = globalRequest;

    return next.handle().pipe(
      map(async (res) => {
        if (res?.headers) {
          Object.keys(res.headers).forEach((key) => {
            globalResponse.setHeader(key, res.headers[key]);
          });
        }

        let response = res?.data ?? res;

        if (typeof response === 'string' && response.trim().startsWith('<')) {
          response = convertXmlToJson(response);
        }

        return {
          statusCode: HttpStatus.OK,
          responseTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data: await addingRicToResponse(
            this.market,
            globalRequest.headers['token'],
            response,
          ),
          errors: null,
        };
      }),
      tap(async (response) => {
        const responseTime = Date.now() - now;
        const logPayload = {
          params,
          body,
          response: await response,
        };

        for (const variable of AppConstant.secureVariable) {
          if (logPayload?.body[variable]) {
            logPayload.body[variable] = 'blind data';
          }
        }

        this.logger.log(
          url,
          `[${ip}] [${method}] [${responseTime}ms] ${url}`,
          logPayload,
        );
      }),
    );
  }
}
