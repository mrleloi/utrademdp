import { BaseHttpService } from './base-http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InnoDataHttpService extends BaseHttpService {
  constructor(endpoint: string, timeout: number) {
    super(endpoint, timeout);
  }
}
