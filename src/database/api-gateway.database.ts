import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiAccessLog } from './entities/api_access_logs.entity';
import { ApiAccessLogInstrument } from './entities/api_access_log_instruments.entity';
import { ApiEndpoint } from './entities/api_endpoints.entity';
import { ApiGroup } from './entities/api_groups.entity';
import { ApiUser } from './entities/api_users.entity';
import { ApiUserPermission } from './entities/api_user_permissions.entity';
import { InstrumentType } from './entities/instrument_types.entity';
import { Instrument } from './entities/instrument.entity';
import { DataSource } from 'typeorm';
import { seedInstrumentTypes } from './seeds/instrument-types.seed';

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
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ApiGatewayDatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      console.log('Running database seeds...');
      await seedInstrumentTypes(this.dataSource);
      console.log('Database seeds completed successfully');
    } catch (error) {
      console.error('Error running database seeds:', error);
    }
  }
}
