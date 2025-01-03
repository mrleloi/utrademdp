import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { HttpServices } from 'src/shared/http/http-services';
import {
  GetBankBalanceInquiryDto,
  GetPurchasingPowerDto,
} from './dtos/request.dto';
import { AppConstant } from 'src/shared/constants/app.constants';

@Injectable()
export class PurchasingPowerService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
  ) {}

  async getPurchasingPower(getPurchasingPowerDto: GetPurchasingPowerDto) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.purchasingPower.accountStatement,
      this.request.headers,
      getPurchasingPowerDto,
    );
    return response.datas;
  }

  async getBankBalanceInquiry(
    getBankBalanceInquiryDto: GetBankBalanceInquiryDto,
  ) {
    const response = await this.httpService.kgi.post(
      AppConstant.ApiUrl.kgi.purchasingPower.accoutnBalanceInquiry,
      this.request.headers,
      getBankBalanceInquiryDto,
    );
    return response.datas;
  }
}
