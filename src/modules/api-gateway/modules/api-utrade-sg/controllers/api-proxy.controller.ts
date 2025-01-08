import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';
import { UtradeSgApiProxyService } from '@modules/api-gateway/modules/api-utrade-sg/services/api-proxy.service';

@Controller('api-gateway/utrade-sg')
export class UtradeSgApiProxyController {
  constructor(private readonly apiProxyService: UtradeSgApiProxyService) {}

  @All('*')
  async proxy(@Req() request: Request) {
    return this.apiProxyService.proxy(request);
  }
}
