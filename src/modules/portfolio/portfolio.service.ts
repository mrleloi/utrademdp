import {
  AccountPositionDetailDto,
  AccountPositionDto,
} from '@modules/accounts/dtos/request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AppConstant } from 'src/shared/constants/app.constants';
import { HttpServices } from 'src/shared/http/http-services';
import {
  GetDailyExchangeRate,
  GetDailyPnLDetailDto,
  GetDailyPnLDto,
  GetRealizedDetailDto,
  GetRealizedDto,
  GetUnrealizedDto,
} from './dtos/request.dto';
import { MarketsService } from 'src/shared/markets/markets.service';
import {
  GetDailyTradeOverviewResponse,
  InventoryDto,
  RealizedDto,
  UnrealizedDto,
} from './dtos/response.dto';
import { ProdTypes } from 'src/shared/enums/app.enums';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
    private marketService: MarketsService,
  ) {}

  async getInventory(accountPositionDto: AccountPositionDto) {
    let { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.inventory,
      this.request.headers,
      accountPositionDto,
    );

    const stocks = datas.map((e: any) => `${e.SYMBOL}_${e.MARKET}`);
    let marketStatus = false,
      totalMarketCap = 0,
      totalProfits = 0,
      totalCost = 0,
      totalReturnRate = 0;

    if (stocks && stocks.length > 0) {
      const { status, data: currentPrices } =
        await this.marketService.getCurrentPrice(
          { token: this.request.headers['token'] },
          stocks.join(','),
        );
      marketStatus = status;

      datas = datas.map((element: InventoryDto) => {
        const currentPrice =
          currentPrices[`${element.SYMBOL}_${element.MARKET}`]['TRDPRC_1'];
        element['TRDPRC_1'] = currentPrice;
        if (element.PROD_TYPE == ProdTypes.EQTY) {
          totalMarketCap += element.QTY * currentPrice;
          totalProfits += element.QTY * (currentPrice - element.UNIT_COST);
          totalCost += element.COST_AMOUNT
            ? parseFloat(element.COST_AMOUNT)
            : 0;
        }
        return element;
      });
      totalReturnRate = totalCost ? (totalProfits * 100) / totalCost : 0;
    }

    return {
      totalMarketCap: marketStatus ? totalMarketCap : 'N/A',
      totalProfits: totalProfits ?? 'N/A',
      totalReturnRate: totalReturnRate ?? 'N/A',
      totalCost: totalCost ?? 'N/A',
      records: datas,
    };
  }

  async getUsPositionDetail(
    accountPositionDetailDto: AccountPositionDetailDto,
  ) {
    const { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.positionDetail,
      this.request.headers,
      accountPositionDetailDto,
    );
    return datas;
  }

  async getRealizedPnL(getRealizedDto: GetRealizedDto) {
    const { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.profitsAndLosses.releasePnL,
      this.request.headers,
      getRealizedDto,
    );

    let totalMarketCap = 0,
      totalProfits = 0,
      totalPurchaseAmount = 0;
    datas.forEach((element: RealizedDto) => {
      totalMarketCap += element.EXE_QTY * element.EXE_PRICE;
      totalProfits += element.PROFIT;
      totalPurchaseAmount += element.UNIT_COST;
    });

    const totalReturnRate = totalPurchaseAmount
      ? (totalProfits / totalPurchaseAmount) * 100
      : 0;

    return {
      totalMarketCap,
      totalProfits,
      totalPurchaseAmount,
      totalReturnRate,
      datas,
    };
  }

  async getRealizedPnLDetail(getRealizedDetailDto: GetRealizedDetailDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.profitsAndLosses.releasePnLDetail,
      this.request.headers,
      getRealizedDetailDto,
    );
    return response.datas;
  }

  async getUnrealizedPnL(getUnrealizedDto: GetUnrealizedDto) {
    const { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.inventory,
      this.request.headers,
      getUnrealizedDto,
    );

    let marketStatus = false,
      totalMarketCap = 0,
      totalProfits = 0,
      totalCost = 0,
      totalReturnRate = 0;

    const stocks = datas.map((e: any) => `${e.SYMBOL}_${e.MARKET}`);
    const { status, data: currentPrices } =
      await this.marketService.getCurrentPrice(
        { token: this.request.headers['token'] },
        stocks.join(','),
      );
    marketStatus = status;

    const updatedData = datas.map((element: UnrealizedDto) => {
      const currentPrice =
        currentPrices[`${element.SYMBOL}_${element.MARKET}`]['TRDPRC_1'];
      const currentPnL = element.QTY * (currentPrice - element.UNIT_COST);
      totalMarketCap += element.QTY * currentPrice;
      totalProfits += currentPnL;
      totalCost += parseFloat(element.COST_AMOUNT);
      element['TRDPRC_1'] = currentPrice;
      element['CURRENT_LOST_PORFIT'] = currentPnL;
      element['CURRENT_PROFIT_RATE'] =
        ((currentPrice - element.UNIT_COST) / element.UNIT_COST) * 100;
      element['ric'] =
        currentPrices[`${element.SYMBOL}_${element.MARKET}`]['ric'];
      return element;
    });
    totalReturnRate = totalCost
      ? ((totalMarketCap - totalCost) * 100) / totalCost
      : 0;

    return {
      totalMarketCap: marketStatus ? totalMarketCap : 'N/A',
      totalProfits: totalProfits ?? 'N/A',
      totalCost: totalCost ?? 'N/A',
      totalReturnRate: totalReturnRate ?? 'N/A',
      datas: updatedData,
    };
  }

  async getDailyPnL(getDailyPnLDto: GetDailyPnLDto) {
    const { datas } = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.dailyPnL,
      this.request.headers,
      getDailyPnLDto,
    );

    let totalCost = 0,
      totalProfits = 0,
      totalProfitsTWD = 0;
    datas.forEach((element: GetDailyTradeOverviewResponse) => {
      totalProfits += element.LOSS_PROFIT;
      totalProfitsTWD += element.LOSS_PROFIT_TWD;
      totalCost += parseFloat(element.COST_AMOUNT);
    });
    return {
      totalProfits,
      totalProfitRate: (totalProfits / totalCost) * 100,
      totalProfitsTWD,
      datas,
    };
  }

  async getDailyPnLDetail(getDailyPnLDetailDto: GetDailyPnLDetailDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.dailyPnLDetail,
      this.request.headers,
      getDailyPnLDetailDto,
    );
    return response.datas;
  }

  async getDailyExchangeRate(getDailyExchangeRate: GetDailyExchangeRate) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.positionQuery.dailyExchangeRate,
      this.request.headers,
      getDailyExchangeRate,
    );
    return response.datas;
  }
}
