import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { HttpServices } from '@shared/http/http.services';
import { API_IDS, ApiId } from '@shared/constants';

@Injectable()
export class ApiProxyService {
  constructor(protected readonly httpServices: HttpServices) {}

  async forward(request: Request, apiId: ApiId) {
    const service = this.httpServices.getServiceByApiId(apiId);
    const targetPath = this.getTargetPath(request.path, apiId);

    const config = {
      params: request.query,
      headers: request.headers,
      data: request.body,
    };

    return service.request(request.method, targetPath, config);
  }

  protected getTargetPath(originalPath: string, apiId: ApiId): string {
    const prefixToRemove = {
      [API_IDS.INNO_DATA]: '/api-gateway/innodata',
      [API_IDS.UTRADE_HK]: '/api-gateway/utradehk',
      [API_IDS.UTRADE_SG]: '/api-gateway/utradesg',
      [API_IDS.UFUTURE]: '/api-gateway/ufuture',
    };

    return originalPath.replace(prefixToRemove[apiId], '');
  }
}
