import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { WatchlistsModule } from './modules/watchlists/watchlists.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/http-exception/http-exception.filter';
import { GlobalInterceptor } from '@common/interceptors/global.interceptor';
import { LoggerModule } from './modules/logger/logger.module';
import { dbConfig } from '@config/database.config';
import { SearchModule } from './modules/search/search.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PurchasingPowerModule } from './modules/purchasing-power/purchasing-power.module';
import { CashModule } from './modules/cash/cash.module';
import { TrustModule } from './modules/trust/trust.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { InnoAuthService } from './services/inno-auth.service';
import { RedisService } from './services/redis.service';
import { TokenDecoderController } from './controllers/token-decoder.controller';
import { UTradeTokenController } from './controllers/utrade-token.controller';
import { UFutureTokenController } from './controllers/ufuture-token.controller';
import { TokenValidationMiddleware } from '@common/middleware/token.middleware';
import { InnoAuthController } from './controllers/inno-auth.controller';
import { TokenDecoderService } from './services/token/token-decoder.service';
import { SwaggerAPIModule } from '@modules/api-docs/swagger.module';
import { ProxyModule } from '@modules/proxy/proxy.module';
import { AuditInterceptor } from "@common/interceptors/audit.interceptor";
import { LoggingInterceptor } from "@common/interceptors/logging.interceptor";

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    SwaggerAPIModule,
    ProxyModule,
    WatchlistsModule,
    LoggerModule,
    SearchModule,
    AccountsModule,
    PortfolioModule,
    OrdersModule,
    PurchasingPowerModule,
    CashModule,
    TrustModule,
    EncryptionModule,
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          INNOVATION_JWT_PRIVATE_KEY: 'qwertyuiopasdfghjklzxcvbnm790876',
          INNOVATION_JWT_ISSUER: 'etwebapi',
          INNOVATION_JWT_AUDIENCE: 'labci',
          UTRADE_HK_SECRET_KEY: 'We1XqPHsmbivlvFw+HUjLr1CsO3F5zdl==',
        }),
      ],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
    }),
  ],
  controllers: [
    AppController,
    TokenDecoderController,
    UTradeTokenController,
    UFutureTokenController,
  ],
  providers: [
    AppService,
    InnoAuthService,
    RedisService,
    TokenDecoderService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenValidationMiddleware)
      .forRoutes(
        InnoAuthController,
        UFutureTokenController,
        UTradeTokenController,
      );
  }
}
