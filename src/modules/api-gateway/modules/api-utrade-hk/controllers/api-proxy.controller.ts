import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';
import { UtradeHkApiProxyService } from '@modules/api-gateway/modules/api-utrade-hk/services/api-proxy.service';

@Controller('api-gateway/utrade-hk')
export class UtradeHkApiProxyController {
  constructor(private readonly apiProxyService: UtradeHkApiProxyService) {}

  @All('*')
  async proxy(@Req() request: Request) {
    return this.apiProxyService.proxy(request);
  }
}
