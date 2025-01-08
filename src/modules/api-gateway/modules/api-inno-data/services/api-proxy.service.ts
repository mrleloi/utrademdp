import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { API_IDS } from '@shared/constants';
import { HttpServices } from '@shared/http/http.services';
import { ApiProxyService } from '@modules/api-gateway/services/api-proxy.service';

@Injectable()
export class InnoDataApiProxyService extends ApiProxyService {
  constructor(httpServices: HttpServices) {
    super(httpServices);
  }

  async proxy(request: Request) {
    return this.forward(request, API_IDS.INNO_DATA);
  }
}
