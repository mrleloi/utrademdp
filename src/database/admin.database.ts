import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ApiAccessLog } from './entities/api_access_logs.entity';
import { ApiAccessLogInstrument } from './entities/api_access_log_instruments.entity';
import { ApiEndpoint } from './entities/api_endpoints.entity';
import { ApiGroup } from './entities/api_groups.entity';
import { ApiUser } from './entities/api_users.entity';
import { ApiUserPermission } from './entities/api_user_permissions.entity';
import { InstrumentType } from './entities/instrument_types.entity';
import { Instrument } from './entities/instrument.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApiAccessLog,
      ApiAccessLogInstrument,
      ApiEndpoint,
      ApiGroup,
      ApiUser,
      ApiUserPermission,
      InstrumentType,
      Instrument,
      User,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class AdminDatabaseModule {}
