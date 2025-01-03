import { Injectable } from '@nestjs/common';
import { HttpServices } from '../http/http-services';
import { AppConstant } from '../constants/app.constants';

@Injectable()
export class MarketsService {
  constructor(private httpServices: HttpServices) {}

  async getCurrentPrice(
    headers: any,
    rics: string,
  ): Promise<{ status: boolean; data: any }> {
    rics = removeDuplicates(rics);
    let status = false;
    const response = await this.httpServices.market.post(
      AppConstant.ApiUrl.markets.simpleQuote,
      headers,
      { rics, type: 'symbol' },
    );
    if (response.data.status == 0) {
      const data = {};
      Object.entries(response.data.data).forEach(([key, value]: any) => {
        if (value['TRDPRC_1']) {
          status = true;
        }
        data[key] = { ...value, TRDPRC_1: value['TRDPRC_1'] ?? 0 };
      });
      return { status, data };
    } else {
      return {
        status,
        data: rics.split(',').reduce((acc, item) => {
          acc[item] = {
            TRDPRC_1: 0,
          };
          return acc;
        }, {}),
      };
    }
  }

  async getRicsFormSymbols(headers: any, symbols: string[]) {
    const response = await this.httpServices.market.get(
      AppConstant.ApiUrl.markets.mics,
      headers,
      { symbols: symbols.join(',') },
    );
    return response.data;
  }
}

function removeDuplicates(input: string) {
  return [...new Set(input.split(','))].join(',');
}
