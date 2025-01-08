import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from '@common/http-exception/http-exception.filter';
import { dbConfig } from '@config/database.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayModule } from '@modules/api-gateway/api-gateway.module';
// import { AdminModule } from '@modules/admin/admin.module';
import { SwaggerAPIModule } from '@modules/api-gateway-docs/swagger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ApiGatewayModule,
    // AdminModule,
    SwaggerAPIModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },*/
  ],
})
export class AppModule {}
