import { BaseHttpService } from './base-http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtradeApiHttpService extends BaseHttpService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async getMarketData(token: string, params: any): Promise<any> {
    return this.get('/data', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
  }
}
