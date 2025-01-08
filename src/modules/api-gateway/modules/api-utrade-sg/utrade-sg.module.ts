import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UtradeSgApiProxyController } from '@modules/api-gateway/modules/api-utrade-sg/controllers/api-proxy.controller';
import { UtradeSgAuthMiddleware } from '@modules/api-gateway/modules/api-utrade-sg/middleware/auth.middleware';
import { UtradeSgApiProxyService } from '@modules/api-gateway/modules/api-utrade-sg/services/api-proxy.service';
import { TokenDecoderService } from '@modules/api-gateway/modules/api-inno-data/services/token-decoder.service';
import { MarketDataTokenDecoder } from '@modules/api-gateway/decoders/market-data-token.decoder';

@Module({
  controllers: [UtradeSgApiProxyController],
  providers: [
    UtradeSgApiProxyService,
    TokenDecoderService,
    MarketDataTokenDecoder,
  ],
})
export class ApiUtradeSgModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UtradeSgAuthMiddleware)
      .forRoutes(UtradeSgApiProxyController);
  }
}
