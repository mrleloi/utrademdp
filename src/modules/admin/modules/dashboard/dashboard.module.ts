import { Module } from '@nestjs/common';
import { AuthService } from '@modules/admin/modules/auth/services/auth.service';
import { AdminController } from '@modules/admin/modules/dashboard/controllers/admin.controller';
import { UsersService } from '@modules/admin/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDatabaseModule } from '../../../../database/admin.database';
import { AccessLogInstrumentsController } from '@modules/admin/modules/dashboard/controllers/access-log-instruments.controller';
import { AccessLogsController } from '@modules/admin/modules/dashboard/controllers/access-logs.controller';
import { ApiEndpointsController } from '@modules/admin/modules/dashboard/controllers/api-endpoints.controller';
import { ApiGroupsController } from '@modules/admin/modules/dashboard/controllers/api-groups.controller';
import { ApiUserPermissionsController } from '@modules/admin/modules/dashboard/controllers/api-user-permissions.controller';
import { ApiUsersController } from '@modules/admin/modules/dashboard/controllers/api-users.controller';
import { InstrumentTypesController } from '@modules/admin/modules/dashboard/controllers/instrument-types.controller';
import { AccessLogInstrumentsService } from '@modules/admin/modules/dashboard/services/access-log-instruments.service';
import { InstrumentService } from '@modules/api-gateway/services/instrument.service';
import { ApiEndpointsService } from '@modules/admin/modules/dashboard/services/api-endpoints.service';
import { ApiGroupsService } from '@modules/admin/modules/dashboard/services/api-groups.service';
import { ApiUserService } from '@modules/admin/modules/dashboard/services/api-user.service';
import { ApiUserPermissionsService } from '@modules/admin/modules/dashboard/services/api-user-permissions.service';
import { InstrumentTypesService } from '@modules/admin/modules/dashboard/services/instrument-types.service';
import { AccessLogsService } from '@modules/admin/modules/dashboard/services/access-logs.service';

@Module({
  imports: [AdminDatabaseModule],
  providers: [
    AuthService,
    UsersService,
    AccessLogInstrumentsService,
    AccessLogsService,
    ApiEndpointsService,
    ApiGroupsService,
    ApiUserService,
    ApiUserPermissionsService,
    InstrumentService,
    InstrumentTypesService,
    JwtService,
  ],
  controllers: [
    AdminController,
    AccessLogInstrumentsController,
    AccessLogsController,
    ApiEndpointsController,
    ApiGroupsController,
    ApiUserPermissionsController,
    ApiUsersController,
    InstrumentTypesController,
  ],
  exports: [AuthService],
})
export class DashboardModule {}
