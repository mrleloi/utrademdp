import { SharedModule } from '../../shared/shared.module';
import { AdminDatabaseModule } from '../../database/admin.database';
import { AuthModule } from '@modules/admin/modules/auth/auth.module';
import { DashboardModule } from '@modules/admin/modules/dashboard/dashboard.module';
import { Module } from '@nestjs/common';
import { LoggerModule } from '@modules/logger/logger.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/admin/guards/jwt-auth.guard';

@Module({
  imports: [
    SharedModule,
    AdminDatabaseModule,
    LoggerModule,
    AuthModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthModule, DashboardModule],
})
export class AdminModule {}
