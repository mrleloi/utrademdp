import { Module } from '@nestjs/common';
import { InnoDataHttpService } from './services/inno-data.http';
import { MarketDataHttpService } from './services/market-data.http';

@Module({
  providers: [
    InnoDataHttpService,
    {
      provide: 'UTRADE_SG_HTTP',
      useFactory: () => new MarketDataHttpService(config.axios.utradeSgEndpoint),
    },
    {
      provide: 'UTRADE_HK_HTTP',
      useFactory: () => new MarketDataHttpService(config.axios.utradeHkEndpoint),
    },
    {
      provide: 'UFUTURE_HTTP',
      useFactory: () => new MarketDataHttpService(config.axios.ufutureEndpoint),
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