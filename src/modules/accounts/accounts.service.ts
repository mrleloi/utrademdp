import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AppConstant } from 'src/shared/constants/app.constants';
import { HttpServices } from 'src/shared/http/http-services';
import {
  AccountCustomerDto,
  GetStatmenetDto,
  GetNonTradingDto,
  AccountPositionDto,
  GetTabRecordsDto,
} from './dtos/request.dto';
import { Request } from 'express';
import { pickProps } from 'src/shared/helpers/object.helpers';
import { GetOrderTransactionsDto } from '@modules/orders/dtos/request.dto';
import { MarketsService } from 'src/shared/markets/markets.service';
import { ProdTypes } from 'src/shared/enums/app.enums';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
    private marketService: MarketsService,
  ) {}

  async getAccountOverview(accountInfoDto: AccountPositionDto) {
    const { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.positionQuery,
      this.request.headers,
      accountInfoDto,
    );

    const stocks = datas.map((e) => `${e.SYMBOL}_${e.MARKET}`);
    let marketStatus = false,
      totalMarketCap = 0,
      totalProfits = 0,
      totalCost = 0;

    if (stocks.length > 0) {
      const { status, data: currentPrices } =
        await this.marketService.getCurrentPrice(
          { token: this.request.headers['token'] },
          stocks.join(','),
        );
      marketStatus = status;

      datas.forEach(
        ({ SYMBOL, MARKET, QTY, UNIT_COST, COST_AMOUNT, PROD_TYPE }) => {
          if (PROD_TYPE == ProdTypes.EQTY) {
            const currentPrice =
              currentPrices[`${SYMBOL}_${MARKET}`]['TRDPRC_1'];
            totalMarketCap += QTY * currentPrice;
            totalProfits += QTY * (currentPrice - UNIT_COST);
            totalCost += parseFloat(COST_AMOUNT);
          }
        },
      );
    }

    const totalReturnRate = totalCost ? (totalProfits * 100) / totalCost : 0;

    return {
      totalMarketCap: marketStatus ? totalMarketCap : 'N/A',
      totalProfits: totalProfits ?? 'N/A',
      totalReturnRate: totalReturnRate ?? 'N/A',
    };
  }

  async accountInfo(accountCustomerDto: AccountCustomerDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.account.queryCustomerById,
      this.request.headers,
      accountCustomerDto,
    );
    return response.datas;
  }

  async getMenu(getTabRecordsDto: GetTabRecordsDto) {
    const customerInfoResponse = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.inventory,
      this.request.headers,
      pickProps<AccountPositionDto>(getTabRecordsDto, [
        'CUSTOMER_ID',
        'ID',
        'IP',
        'SYSTEM_ID',
        'PROD_TYPE',
        'MARKET',
        'SETTLE_CURRENCY',
        'TRADE_KIND',
      ]),
    );

    if (customerInfoResponse['rtnCode'] == '0000' && getTabRecordsDto.SYMBOL) {
      customerInfoResponse['datas'] = customerInfoResponse.datas.filter(
        (data: any) => data['SYMBOL'] == getTabRecordsDto.SYMBOL,
      );
    }

    const orders = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.transactionQuery.getOrderEntrustment,
      this.request.headers,
      pickProps<GetOrderTransactionsDto>(getTabRecordsDto, [
        'CUSTOMER_ID',
        'ID',
        'IP',
        'SYSTEM_ID',
        'MARKET',
        'SYMBOL',
        'TRADE_DATES',
        'TRADE_DATEE',
        'TRADE_KIND',
      ]),
    );

    const trades = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.transactionQuery.getOrderTransactions,
      this.request.headers,
      pickProps<GetOrderTransactionsDto>(getTabRecordsDto, [
        'CUSTOMER_ID',
        'ID',
        'IP',
        'SYSTEM_ID',
        'MARKET',
        'SYMBOL',
        'TRADE_DATES',
        'TRADE_DATEE',
        'TRADE_KIND',
      ]),
    );

    return {
      inventories: customerInfoResponse.datas.length,
      orders: orders.datas.length,
      trades: trades.datas.length,
    };
  }

  async getStatement(getStatmenetDto: GetStatmenetDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.account.statement,
      this.request.headers,
      getStatmenetDto,
    );
    return response.datas;
  }

  async getNonTradingData(getNonTradingDto: GetNonTradingDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.account.nonTradingData,
      this.request.headers,
      getNonTradingDto,
    );
    return response.datas;
  }
}
