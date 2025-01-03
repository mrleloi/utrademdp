import { Body, Controller, Get, Post, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { CashService } from './cash.service';
import {
  AddCashDto,
  CashReportDto,
  DeleteCashDto,
  QueryCashDto,
  UnHoldRequestDto,
} from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  CashReportResponse,
  CashResponse,
  UnholdAMountResponse,
} from './dtos/response.dto';

@ApiTags(AppRoutes.cash.tag)
@Controller({
  path: AppRoutes.cash.tag,
  scope: Scope.REQUEST,
})
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Post()
  @ApiCommonOkResponse([CashResponse])
  @ApiOperation({
    summary: 'Withdrawal Request [24130009- 複委託出金申請(驗章)]',
  })
  async addCash(@Body() addCashDto: AddCashDto) {
    return await this.cashService.addCash(addCashDto);
  }

  @Get()
  @ApiCommonOkResponse([CashResponse])
  @ApiOperation({ summary: 'Withdrawal Query [50004002- OLTSAPI0047]' })
  async queryCash(@Query() queryCashDto: QueryCashDto) {
    return await this.cashService.cashQuery(queryCashDto);
  }

  @Post(AppRoutes.cash.delete)
  @ApiCommonOkResponse([CashResponse])
  @ApiOperation({
    summary: 'Withdrawal Delete [2413000A- 複委託出金刪除(驗章)]',
  })
  async deleteCash(@Body() deleteCashDto: DeleteCashDto) {
    return await this.cashService.deleteCash(deleteCashDto);
  }

  @Get(AppRoutes.cash.detail)
  @ApiCommonOkResponse([CashReportResponse])
  @ApiOperation({ summary: 'Withdrawal Detail [50004006- OLTSAPI0049]' })
  async getCashReport(@Query() cashReportDto: CashReportDto) {
    return await this.cashService.cashReport(cashReportDto);
  }

  @Get(AppRoutes.cash.unHold)
  @ApiCommonOkResponse([UnholdAMountResponse])
  @ApiOperation({ summary: 'Unhold Request [24130008- 複委託解圈申請(驗章)]' })
  async getUnHoldAmount(@Query() unHoldRequestDto: UnHoldRequestDto) {
    return await this.cashService.holdAmount(unHoldRequestDto);
  }
}
