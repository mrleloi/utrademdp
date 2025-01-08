import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InnoDataAuthMiddleware } from '@modules/api-gateway/modules/api-inno-data/middleware/inno-auth.middleware';
import { InnoDataApiProxyController } from '@modules/api-gateway/modules/api-inno-data/controllers/api-proxy.controller';
import { InnoDataApiProxyService } from '@modules/api-gateway/modules/api-inno-data/services/api-proxy.service';
import { TokenDecoderService } from '@modules/api-gateway/modules/api-inno-data/services/token-decoder.service';
import { JwtTokenDecoder } from '@modules/api-gateway/decoders/jwt-token.decoder';
import { PermissionMiddleware } from '@modules/api-gateway/middleware/permission.middleware';
import { ApiUserService } from '@modules/api-gateway/services/api-user.service';
import { ApiGatewayDatabaseModule } from '../../../../database/api-gateway.database';
import { AccessLogService } from '@modules/api-gateway/services/access-log.service';
import { InstrumentService } from '@modules/api-gateway/services/instrument.service';
import { PermissionService } from '@modules/api-gateway/services/permission.service';

@Module({
  imports: [ApiGatewayDatabaseModule],
  controllers: [InnoDataApiProxyController],
  providers: [
    InnoDataApiProxyService,
    TokenDecoderService,
    JwtTokenDecoder,
    PermissionMiddleware,
    ApiUserService,
    AccessLogService,
    InstrumentService,
    PermissionService,
  ],
})
export class ApiInnoDataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InnoDataAuthMiddleware, PermissionMiddleware)
      .exclude({
        path: '/api-gateway/inno-data/auth/token',
        method: RequestMethod.ALL,
      })
      .forRoutes(InnoDataApiProxyController);
  }
}
