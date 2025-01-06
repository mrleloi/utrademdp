import { BaseHttpService } from './base-http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InnoDataHttpService extends BaseHttpService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async getQuote(token: string, ric: string): Promise<any> {
    return this.get('/quote', {
      headers: { Authorization: `Bearer ${token}` },
      params: { ric },
    });
  }
}