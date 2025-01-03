import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AppConstant } from 'src/shared/constants/app.constants';
import { HttpServices } from 'src/shared/http/http-services';
import {
  BatchPlaceLongTermOrderDTO,
  GetDailyTradeOverviewDTO,
  GetLongTermOrderDto,
  GetOrderEnstrustmentsDto,
  GetOrderTransactionsDto,
  GetStockFee,
  ManageBatchOrderDto,
} from './dtos/request.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
  ) {}

  async getOrderEnstrustments(
    getOrderEnstrustmentsDto: GetOrderEnstrustmentsDto,
  ) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.transactionQuery.getOrderEntrustment,
      this.request.headers,
      getOrderEnstrustmentsDto,
    );
    return response.datas;
  }

  async getOrdgetOrderTransactions(
    getOrderTransactionsDto: GetOrderTransactionsDto,
  ) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.transactionQuery.getOrderTransactions,
      this.request.headers,
      getOrderTransactionsDto,
    );
    return response.datas;
  }

  async manageBatchOrder(manageBatchOrderDto: ManageBatchOrderDto) {
    delete manageBatchOrderDto.orderData;
    const response = await this.httpService.kgi.postOrder(
      AppConstant.ApiUrl.kgi.orders.manageOrder,
      this.request.headers,
      manageBatchOrderDto,
    );
    return response;
  }

  async getDailyTradeSummary(
    getDailyTradeOverviewDTO: GetDailyTradeOverviewDTO,
  ) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.orders.dailyTradeOverview,
      this.request.headers,
      getDailyTradeOverviewDTO,
    );
    return response.datas;
  }

  async getLongTerm(getLongTermOrderDto: GetLongTermOrderDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.orders.longTermOrders,
      this.request.headers,
      getLongTermOrderDto,
    );
    return response.datas;
  }

  async batchPlaceLongTerm(
    batchPlaceLongTermOrderDTO: BatchPlaceLongTermOrderDTO,
  ) {
    delete batchPlaceLongTermOrderDTO.orderData;
    const response = await this.httpService.kgi.postOrder(
      AppConstant.ApiUrl.kgi.orders.placeLongTermOrders,
      this.request.headers,
      batchPlaceLongTermOrderDTO,
    );
    return response;
  }

  async getStockFee(getStockFee: GetStockFee) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.transactionQuery.stockFee,
      this.request.headers,
      getStockFee,
    );
    return response.datas;
  }
}
