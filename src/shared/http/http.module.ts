import { Module } from '@nestjs/common';
import { InnoDataHttpService } from './services/inno-data.http';
import { UtradeApiHttpService } from './services/utrade-api.http';
import config from '@config/app.config';

@Module({
  providers: [
    InnoDataHttpService,
    {
      provide: 'UTRADE_SG_HTTP',
      useFactory: () => new UtradeApiHttpService(config.axios.utradeSgEndpoint),
    },
    {
      provide: 'UTRADE_HK_HTTP',
      useFactory: () => new UtradeApiHttpService(config.axios.utradeHkEndpoint),
    },
    {
      provide: 'UFUTURE_HTTP',
      useFactory: () => new UtradeApiHttpService(config.axios.ufutureEndpoint),
    },
  ],
  exports: [
    InnoDataHttpService,
    'UTRADE_SG_HTTP',
    'UTRADE_HK_HTTP',
    'UFUTURE_HTTP',
  ],
})
export class HttpModule {}
