import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_IDS, ApiId } from '@shared/constants';
import { InnoDataHttpService } from '@shared/http/services/inno-data.http';
import { UtradeApiHttpService } from '@shared/http/services/utrade-api.http';
import { BaseHttpService } from '@shared/http/services/base-http.service';

@Injectable()
export class HttpServices {
  public readonly innoData: InnoDataHttpService;
  public readonly utradeHk: UtradeApiHttpService;
  public readonly utradeSg: UtradeApiHttpService;
  public readonly ufuture: UtradeApiHttpService;

  constructor(configService: ConfigService) {
    const timeout = configService.get('app.axios.timeout');

    this.innoData = new InnoDataHttpService(
      configService.get(`apiGateway.apis.${API_IDS.INNO_DATA}.url`),
      timeout,
    );

    this.utradeHk = new UtradeApiHttpService(
      configService.get(`apiGateway.apis.${API_IDS.UTRADE_HK}.url`),
      timeout,
    );

    this.utradeSg = new UtradeApiHttpService(
      configService.get(`apiGateway.apis.${API_IDS.UTRADE_SG}.url`),
      timeout,
    );

    this.ufuture = new UtradeApiHttpService(
      configService.get(`apiGateway.apis.${API_IDS.UFUTURE}.url`),
      timeout,
    );
  }

  getServiceByApiId(apiId: ApiId): BaseHttpService {
    const services = {
      [API_IDS.INNO_DATA]: this.innoData,
      [API_IDS.UTRADE_HK]: this.utradeHk,
      [API_IDS.UTRADE_SG]: this.utradeSg,
      [API_IDS.UFUTURE]: this.ufuture,
    };
    return services[apiId];
  }
}
