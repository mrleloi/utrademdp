import { Controller, Get, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { AccountsService } from './accounts.service';
import {
  AccountCustomerDto,
  AccountPositionDto,
  GetNonTradingDto,
  GetStatmenetDto,
  GetTabRecordsDto,
} from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  GetAccountInfoResponse,
  GetAccountOverviewResponse,
  GetNonTradingResponse,
  GetStatementResponse,
  GetTabRecordResponse,
} from './dtos/response.dto';

@ApiTags(AppRoutes.accounts.tag)
@Controller({
  path: AppRoutes.accounts.tag,
  scope: Scope.REQUEST,
})
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get(AppRoutes.accounts.overview)
  @ApiOperation({
    summary:
      'Get account info, us market cap, unrealized P&L [23603200- OLTSAPI0025]',
  })
  @ApiCommonOkResponse(GetAccountOverviewResponse)
  async getCommonAccountInfo(@Query() accountInfoDto: AccountPositionDto) {
    return await this.accountsService.getAccountOverview(accountInfoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list account infomation [25900000- OLTSAPI0024]',
  })
  @ApiCommonOkResponse([GetAccountInfoResponse])
  async getAccounts(@Query() accountCustomerDto: AccountCustomerDto) {
    return await this.accountsService.accountInfo(accountCustomerDto);
  }

  @Get(AppRoutes.accounts.tabs)
  @ApiOperation({
    summary:
      'Get no. of records in menu account page 委託(orders) 成交(trades) [23603200- OLTSAPI0025, 21110004- OLTSAPI0026, 21120004- OLTSAPI0031]',
  })
  @ApiCommonOkResponse(GetTabRecordResponse)
  async getMenu(@Query() getTabRecordsDto: GetTabRecordsDto) {
    return await this.accountsService.getMenu(getTabRecordsDto);
  }

  @Get(AppRoutes.accounts.statement)
  @ApiOperation({ summary: 'Get statement of account [22003200- OLTSAPI0027]' })
  @ApiCommonOkResponse([GetStatementResponse])
  async getStatement(@Query() getStatmenetDto: GetStatmenetDto) {
    return await this.accountsService.getStatement(getStatmenetDto);
  }

  @Get(AppRoutes.accounts.nonTrading)
  @ApiOperation({ summary: 'Get non trading data [22003202- OLTSAPI0028]' })
  @ApiCommonOkResponse([GetNonTradingResponse])
  async getNonTradingData(@Query() getNonTradingDto: GetNonTradingDto) {
    return await this.accountsService.getNonTradingData(getNonTradingDto);
  }
}
