import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UfutureApiProxyController } from '@modules/api-gateway/modules/api-ufuture/controllers/api-proxy.controller';
import { UfutureAuthMiddleware } from '@modules/api-gateway/modules/api-ufuture/middleware/auth.middleware';
import { UfutureApiProxyService } from '@modules/api-gateway/modules/api-ufuture/services/api-proxy.service';
import { UFutureAuthService } from '@modules/api-gateway/modules/api-ufuture/services/auth.service';
import { TokenEncoderService } from '@modules/api-gateway/encoders/market-data-token.encoder';
import { MarketDataTokenDecoder } from '@modules/api-gateway/decoders/market-data-token.decoder';
import { TokenDecoderService } from '@modules/api-gateway/modules/api-ufuture/services/token-decoder.service';

@Module({
  controllers: [UfutureApiProxyController],
  providers: [
    UfutureApiProxyService,
    TokenDecoderService,
    MarketDataTokenDecoder,
    TokenEncoderService,
    UFutureAuthService,
  ],
})
export class ApiUfutureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UfutureAuthMiddleware).forRoutes(UfutureApiProxyController);
  }
}
