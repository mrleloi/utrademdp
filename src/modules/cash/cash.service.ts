import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AppConstant } from 'src/shared/constants/app.constants';
import { HttpServices } from 'src/shared/http/http-services';
import {
  AddCashDto,
  CashReportDto,
  DeleteCashDto,
  QueryCashDto,
  UnHoldRequestDto,
} from './dtos/request.dto';

@Injectable()
export class CashService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
  ) {}

  async addCash(addCashDto: AddCashDto) {
    delete addCashDto.orderData;
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.cash.add,
      this.request.headers,
      addCashDto,
    );
    return response;
  }

  async cashQuery(queryCashDto: QueryCashDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.cash.query,
      this.request.headers,
      queryCashDto,
    );
    return response.datas;
  }

  async deleteCash(deleteCashDto: DeleteCashDto) {
    delete deleteCashDto.orderData;
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.cash.delete,
      this.request.headers,
      deleteCashDto,
    );
    return response;
  }

  async cashReport(cashReportDto: CashReportDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.cash.detail,
      this.request.headers,
      cashReportDto,
    );
    return response.datas;
  }

  async holdAmount(unHoldRequestDto: UnHoldRequestDto) {
    delete unHoldRequestDto.orderData;
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.cash.holdAmount,
      this.request.headers,
      unHoldRequestDto,
    );
    return response.datas;
  }
}
