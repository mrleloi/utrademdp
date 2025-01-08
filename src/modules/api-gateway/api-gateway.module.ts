import { Module } from '@nestjs/common';
import { ApiGatewayDatabaseModule } from '../../database/api-gateway.database';
import { ConfigModule } from '@nestjs/config';
import { apiGatewayConfig } from '@config/api-gateway.config';
import { SharedModule } from '@shared/shared.module';
import { ApiInnoDataModule } from '@modules/api-gateway/modules/api-inno-data/inno-data.module';
import { ApiUfutureModule } from '@modules/api-gateway/modules/api-ufuture/ufuture.module';
import { ApiUtradeHkModule } from '@modules/api-gateway/modules/api-utrade-hk/utrade-hk.module';
import { ApiUtradeSgModule } from '@modules/api-gateway/modules/api-utrade-sg/utrade-sg.module';
import { ApiUserService } from '@modules/api-gateway/services/api-user.service';
import { InstrumentService } from '@modules/api-gateway/services/instrument.service';
import { AccessLogService } from '@modules/api-gateway/services/access-log.service';
import { PermissionService } from '@modules/api-gateway/services/permission.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiGatewayConfig],
      isGlobal: true,
    }),
    SharedModule,
    ApiGatewayDatabaseModule,
    ApiInnoDataModule,
    ApiUfutureModule,
    ApiUtradeHkModule,
    ApiUtradeSgModule,
  ],
  providers: [
    ApiUserService,
    InstrumentService,
    AccessLogService,
    PermissionService,
  ],
})
export class ApiGatewayModule {}
