import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UtradeHkAuthMiddleware } from '@modules/api-gateway/modules/api-utrade-hk/middleware/auth.middleware';
import { UtradeHkApiProxyController } from '@modules/api-gateway/modules/api-utrade-hk/controllers/api-proxy.controller';
import { UtradeHkApiProxyService } from '@modules/api-gateway/modules/api-utrade-hk/services/api-proxy.service';
import { TokenDecoderService } from '@modules/api-gateway/modules/api-inno-data/services/token-decoder.service';
import { MarketDataTokenDecoder } from '@modules/api-gateway/decoders/market-data-token.decoder';

@Module({
  controllers: [UtradeHkApiProxyController],
  providers: [
    UtradeHkApiProxyService,
    TokenDecoderService,
    MarketDataTokenDecoder,
  ],
})
export class ApiUtradeHkModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UtradeHkAuthMiddleware)
      .forRoutes(UtradeHkApiProxyController);
  }
}
