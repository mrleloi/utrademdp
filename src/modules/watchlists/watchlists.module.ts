import { Module } from '@nestjs/common';
import { WatchlistsController } from './watchlists.controller';
import { WatchlistsService } from './watchlists.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [WatchlistsController],
  providers: [WatchlistsService],
})
export class WatchlistsModule {}
