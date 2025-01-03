import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserWhitelist } from './entities/whitelist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserWhitelist])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
