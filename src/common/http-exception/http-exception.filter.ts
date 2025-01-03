import { LoggerService } from '@modules/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { AppConstant } from 'src/shared/constants/app.constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const { method, url, params, body } = request;
    const ip = request.headers['x-real-ip'];

    let status: any = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const resObj: any = exceptionResponse;
        message = resObj.message || message;
      }
    }

    const responseData = {
      statusCode: status,
      responseTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      data: null,
      errors: message,
    };
    response.status(status).json(responseData);

    const logPayload = {
      params,
      body,
      response: responseData,
      error: exception.stack,
    };
    for (const variable of AppConstant.secureVariable) {
      if (logPayload?.body[variable]) {
        logPayload.body[variable] = 'blind data';
      }
    }
    this.logger.error(
      url,
      `[${ip}] [${method}] [0ms] ${url}`,
      logPayload ?? {},
    );
  }
}
