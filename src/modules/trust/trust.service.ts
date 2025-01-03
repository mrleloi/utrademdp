import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AppConstant } from 'src/shared/constants/app.constants';
import { HttpServices } from 'src/shared/http/http-services';
import { GetTrustAccountsDto } from './dtos/request.dto';
import { Request } from 'express';

@Injectable()
export class TrustService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
  ) {}

  async getAccounts(getTrustAccountsDto: GetTrustAccountsDto) {
    getTrustAccountsDto.id = getTrustAccountsDto.id.replace('@', '');
    const response = await this.httpService.trust.postTrust(
      AppConstant.ApiUrl.kgi.trust.accounts,
      this.request.headers,
      getTrustAccountsDto,
    );
    return response;
  }
}
