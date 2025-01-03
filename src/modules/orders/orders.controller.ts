import { Body, Controller, Get, Post, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { OrdersService } from './orders.service';
import {
  BatchPlaceLongTermOrderDTO,
  GetDailyTradeOverviewDTO,
  GetLongTermOrderDto,
  GetOrderEnstrustmentsDto,
  GetOrderTransactionsDto,
  GetStockFee,
  ManageBatchOrderDto,
} from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  GetLongTermOrderResponse,
  GetOrderEntrustmentsResponse,
  GetOrderTransactionsResponse,
  GetStockFeeResponse,
  GetTradeOverviewResponse,
  OrderResponse,
  PlaceLongtermOrderResponse,
} from './dtos/response.dto';

@ApiTags(AppRoutes.orders.tag)
@Controller({
  path: AppRoutes.orders.tag,
  scope: Scope.REQUEST,
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(AppRoutes.orders.entrustments)
  @ApiCommonOkResponse([GetOrderEntrustmentsResponse])
  @ApiOperation({
    summary: 'Get list orders in tab 委託 [21110004- OLTSAPI0026]',
  })
  async getOrderEntrustments(
    @Query() getOrderEnstrustmentsDto: GetOrderEnstrustmentsDto,
  ) {
    return await this.ordersService.getOrderEnstrustments(
      getOrderEnstrustmentsDto,
    );
  }

  @Get(AppRoutes.orders.transactions)
  @ApiCommonOkResponse([GetOrderTransactionsResponse])
  @ApiOperation({
    summary: 'Get list orders in tab 成交 [21120004- OLTSAPI0031]',
  })
  async getOrderTransactions(
    @Query() getOrderTransactionsDto: GetOrderTransactionsDto,
  ) {
    return await this.ordersService.getOrdgetOrderTransactions(
      getOrderTransactionsDto,
    );
  }

  @Post(AppRoutes.orders.manage)
  @ApiCommonOkResponse(OrderResponse)
  @ApiOperation({ summary: 'Manage orders [30130004- 複委託下單(驗章)]' })
  async manageBatchOrder(@Body() manageBatchOrderDto: ManageBatchOrderDto) {
    return await this.ordersService.manageBatchOrder(manageBatchOrderDto);
  }

  @Get(AppRoutes.orders.dailyTrade)
  @ApiOperation({ summary: 'Get daily trade overview [21120006- OLTSAPI0058]' })
  @ApiCommonOkResponse([GetTradeOverviewResponse])
  async getDailyTradeOverview(
    @Query() getDailyTradeOverviewDTO: GetDailyTradeOverviewDTO,
  ) {
    return await this.ordersService.getDailyTradeSummary(
      getDailyTradeOverviewDTO,
    );
  }

  @Get(AppRoutes.orders.longTerm)
  @ApiCommonOkResponse([GetLongTermOrderResponse])
  @ApiOperation({
    summary: 'Get Long-term single order inquiry [21110006- OLTSAPI0054]',
  })
  async getLongTermOrders(@Query() getLongTermOrderDto: GetLongTermOrderDto) {
    return await this.ordersService.getLongTerm(getLongTermOrderDto);
  }

  @Post(AppRoutes.orders.longTerm)
  @ApiCommonOkResponse([PlaceLongtermOrderResponse])
  @ApiOperation({
    summary: 'Place Long-term order [3013000A- 複委託長效單下單II (驗章)]',
  })
  async batchPlaceLongTermOrders(
    @Body() batchPlaceLongTermOrderDTO: BatchPlaceLongTermOrderDTO,
  ) {
    return await this.ordersService.batchPlaceLongTerm(
      batchPlaceLongTermOrderDTO,
    );
  }

  @Get(AppRoutes.orders.fee)
  @ApiCommonOkResponse([GetStockFeeResponse])
  @ApiOperation({ summary: 'Get stock fee [24100002- OLTSAPI0055]' })
  async GetStockFee(@Query() getStockFee: GetStockFee) {
    return await this.ordersService.getStockFee(getStockFee);
  }
}
