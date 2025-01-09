import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { InnoDataApiProxyService } from '@modules/api-gateway/modules/api-inno-data/services/api-proxy.service';
import { AccessLogService } from '@modules/api-gateway/services/access-log.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('api-gateway/innodata')
export class InnoDataApiProxyController {
  constructor(
    private readonly apiProxyService: InnoDataApiProxyService,
    private accessLogService: AccessLogService,
  ) {}

  @All('*')
  async proxy(@Req() request: Request, @Res() response: Response) {
    const proxyResponse = await this.apiProxyService.proxy(request);

    if (request['endpoint'] && request['apiUser']) {
      const instrumentParams = request['instrumentParams'] || {};

      this.accessLogService
        .logAccess(
          request['apiUser'],
          request['endpoint'],
          request,
          proxyResponse,
          instrumentParams,
        )
        .catch((error) => {
          console.error('Error logging access:', error);
        });
    }

    if (proxyResponse.headers) {
      Object.entries(proxyResponse.headers).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const headerValue = Array.isArray(value) ? value : String(value);
          response.setHeader(key, headerValue);
        }
      });
    }

    return response
      .status(Number(proxyResponse.status))
      .send(proxyResponse.data);
  }
}
