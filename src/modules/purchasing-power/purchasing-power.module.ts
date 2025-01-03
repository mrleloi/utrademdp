import { Module } from '@nestjs/common';
import { PurchasingPowerController } from './purchasing-power.controller';
import { PurchasingPowerService } from './purchasing-power.service';

@Module({
  controllers: [PurchasingPowerController],
  providers: [PurchasingPowerService],
})
export class PurchasingPowerModule {}
