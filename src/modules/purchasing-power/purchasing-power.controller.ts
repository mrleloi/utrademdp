import { Controller, Get, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { PurchasingPowerService } from './purchasing-power.service';
import {
  GetBankBalanceInquiryDto,
  GetPurchasingPowerDto,
} from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  GetBankBalanceInquiryResponse,
  GetPurchasingPowerResponse,
} from './dtos/response.dto';

@ApiTags(AppRoutes.purchasingPower.tag)
@Controller({
  path: AppRoutes.purchasingPower.tag,
  scope: Scope.REQUEST,
})
export class PurchasingPowerController {
  constructor(
    private readonly purchasingPowerService: PurchasingPowerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get purchasing power [24500006- OLTSAPI0060]' })
  @ApiCommonOkResponse([GetPurchasingPowerResponse])
  async getPurchasingPower(
    @Query() getPurchasingPowerDto: GetPurchasingPowerDto,
  ) {
    return await this.purchasingPowerService.getPurchasingPower(
      getPurchasingPowerDto,
    );
  }

  @Get(AppRoutes.purchasingPower.balanceInquiry)
  @ApiOperation({ summary: 'Get bank balance inquiry [24500008- OLTSAPI0061]' })
  @ApiCommonOkResponse([GetBankBalanceInquiryResponse])
  async getBankBalanceInquiry(
    @Query() getBankBalanceInquiryDto: GetBankBalanceInquiryDto,
  ) {
    return await this.purchasingPowerService.getBankBalanceInquiry(
      getBankBalanceInquiryDto,
    );
  }
}
