import { Controller, Get, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import {
  AccountPositionDetailDto,
  AccountPositionDto,
} from '@modules/accounts/dtos/request.dto';
import { AppRoutes } from 'src/router/routes';
import {
  GetDailyExchangeRate,
  GetDailyPnLDetailDto,
  GetDailyPnLDto,
  GetRealizedDetailDto,
  GetRealizedDto,
  GetUnrealizedDto,
} from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  GetDailyExchangeRateResponse,
  GetDailyPnLResponse,
  GetDailyTradeOverviewDetailResponse,
  GetInventoryResponse,
  GetRealizedResponse,
  GetUnrealizedResponse,
  GetUsPositionDetail,
  RealizedDetailDto,
} from './dtos/response.dto';

@ApiTags(AppRoutes.portfolio.tag)
@Controller({
  path: AppRoutes.portfolio.tag,
  scope: Scope.REQUEST,
})
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(AppRoutes.portfolio.inventory)
  @ApiCommonOkResponse([GetInventoryResponse])
  @ApiOperation({
    summary: 'Get inventory infomation [23130005- 庫存查詢(CA)]',
  })
  async getInventory(@Query() accountPositionDto: AccountPositionDto) {
    return await this.portfolioService.getInventory(accountPositionDto);
  }

  @Get(AppRoutes.portfolio.inventoryDetail)
  @ApiCommonOkResponse([GetUsPositionDetail])
  @ApiOperation({ summary: 'Get US Position Detail [24003004- OLTSAPI0038]' })
  async getInventoryDetail(
    @Query() accountPositionDetailDto: AccountPositionDetailDto,
  ) {
    return await this.portfolioService.getUsPositionDetail(
      accountPositionDetailDto,
    );
  }

  @Get(AppRoutes.portfolio.realized)
  @ApiCommonOkResponse(GetRealizedResponse)
  @ApiOperation({
    summary: 'Get realized profits and losses [24100004- OLTSAPI0056]',
  })
  async getRealized(@Query() getRealizedDto: GetRealizedDto) {
    return await this.portfolioService.getRealizedPnL(getRealizedDto);
  }

  @Get(AppRoutes.portfolio.realizedDetail)
  @ApiCommonOkResponse([RealizedDetailDto])
  @ApiOperation({
    summary: 'Get realized profits and losses detail [24100006- OLTSAPI0057]',
  })
  async getRealizedPnLDetail(
    @Query() getRealizedDetailDto: GetRealizedDetailDto,
  ) {
    return await this.portfolioService.getRealizedPnLDetail(
      getRealizedDetailDto,
    );
  }

  @Get(AppRoutes.portfolio.unrealized)
  @ApiCommonOkResponse(GetUnrealizedResponse)
  @ApiOperation({
    summary: 'Get unrealized profits and losses [23603200- OLTSAPI0025]',
  })
  async getUnrealized(@Query() getUnrealizedDto: GetUnrealizedDto) {
    return await this.portfolioService.getUnrealizedPnL(getUnrealizedDto);
  }

  @Get(AppRoutes.portfolio.dailyPnL)
  @ApiCommonOkResponse(GetDailyPnLResponse)
  @ApiOperation({
    summary: 'Get daily profits and losses [24003000- OLTSAPI0036]',
  })
  async getDailyPnL(@Query() getDailyPnLDto: GetDailyPnLDto) {
    return await this.portfolioService.getDailyPnL(getDailyPnLDto);
  }

  @Get(AppRoutes.portfolio.dailyPnLDetail)
  @ApiCommonOkResponse([GetDailyTradeOverviewDetailResponse])
  @ApiOperation({
    summary: 'Get daily profits and losses detail [24003002- OLTSAPI0037]',
  })
  async getDailyPnLDetail(@Query() getDailyPnLDetailDto: GetDailyPnLDetailDto) {
    return await this.portfolioService.getDailyPnLDetail(getDailyPnLDetailDto);
  }

  @Get(AppRoutes.portfolio.dailyExchangeRate)
  @ApiCommonOkResponse([GetDailyExchangeRateResponse])
  @ApiOperation({ summary: 'Get daily exchange rate [20003200- OLTSAPI0022]' })
  async getDailyExchangeRate(
    @Query() getDailyExchangeRate: GetDailyExchangeRate,
  ) {
    return await this.portfolioService.getDailyExchangeRate(
      getDailyExchangeRate,
    );
  }
}
