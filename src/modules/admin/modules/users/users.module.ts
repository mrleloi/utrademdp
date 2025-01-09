import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminDatabaseModule } from '../../../../database/admin.database';

@Module({
  imports: [AdminDatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
