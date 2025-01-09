import { Routes } from '@nestjs/core';
import { AdminModule } from '@modules/admin/admin.module';
import { AuthModule } from '@modules/admin/modules/auth/auth.module';
import { DashboardModule } from '@modules/admin/modules/dashboard/dashboard.module';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    module: AdminModule,
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'dashboard',
        module: DashboardModule,
      },
    ],
  },
];
