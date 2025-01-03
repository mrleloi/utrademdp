import { Injectable } from '@nestjs/common';
import { HttpService } from './http.service';
import config from '@config/app.config';
import { HttpKGIService } from './kgi.http.service';

@Injectable()
export class HttpServices {
  public readonly watchlist: HttpService;
  public readonly kgi: HttpKGIService;
  public readonly trust: HttpKGIService;
  public readonly market: HttpService;

  constructor() {
    this.watchlist = new HttpService(config.axios.kgiWatchlistEndpoint);
    this.kgi = new HttpKGIService(config.axios.kgiBaseEndpoint);
    this.trust = new HttpKGIService(config.axios.kgiTrustEndpoint);
    this.market = new HttpService(config.axios.marketApiEndpoint);
  }
}
