import { Module } from '@nestjs/common';
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
import { ConfigModule } from "@nestjs/config";
import { TokenDecoderController } from "@modules/controllers/token-decoder.controller";
import { UTradeTokenController } from "@modules/controllers/utrade-token.controller";
import { UFutureTokenController } from "@modules/controllers/ufuture-token.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
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
      load: [() => ({
        INNOVATION_JWT_PRIVATE_KEY: 'qwertyuiopasdfghjklzxcvbnm790876',
        INNOVATION_JWT_ISSUER: 'etwebapi',
        INNOVATION_JWT_AUDIENCE: 'labci',
        UTRADE_HK_SECRET_KEY: 'We1XqPHsmbivlvFw+HUjLr1CsO3F5zdl=='
      })]
    })
  ],
  controllers: [AppController, TokenDecoderController, UTradeTokenController,
    UFutureTokenController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
})
export class AppModule {}
