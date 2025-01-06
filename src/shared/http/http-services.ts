import { Injectable } from '@nestjs/common';
import config from '@config/app.config';
import { InnoDataHttpService } from './services/inno-data.http';
import { UtradeApiHttpService } from './services/utrade-api.http';

@Injectable()
export class HttpServices {
  public readonly innoData: InnoDataHttpService;
  public readonly utradeHk: UtradeApiHttpService;
  public readonly utradeSg: UtradeApiHttpService;
  public readonly ufuture: UtradeApiHttpService;

  constructor() {
    this.innoData = new InnoDataHttpService(config.axios.innoDataEndpoint);
    this.utradeHk = new UtradeApiHttpService(config.axios.utradeHkEndpoint);
    this.utradeSg = new UtradeApiHttpService(config.axios.utradeSgEndpoint);
    this.ufuture = new UtradeApiHttpService(config.axios.ufutureEndpoint);
  }
}
