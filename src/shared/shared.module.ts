import { Global, Module } from '@nestjs/common';
import { HttpServices } from './http/http-services';
import { MarketsService } from './markets/markets.service';

@Global()
@Module({
  providers: [HttpServices, MarketsService],
  exports: [HttpServices, MarketsService],
})
export class SharedModule {}
