import { Module } from '@nestjs/common';
import { TrustService } from './trust.service';
import { TrustController } from './trust.controller';

@Module({
  controllers: [TrustController],
  providers: [TrustService],
})
export class TrustModule {}
