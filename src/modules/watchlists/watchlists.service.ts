import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  GetWatchlistDto,
  SetWatchlistDto,
  SetWatchlistOptionDto,
} from './dtos/request.dto';
import { AppConstant } from 'src/shared/constants/app.constants';
import { Request } from 'express';
import { HttpServices } from 'src/shared/http/http-services';
import {
  convertJsonToXml,
  convertSimplifiedChineseToTraditionalChinese,
} from 'src/shared/helpers/converter.helpers';

@Injectable()
export class WatchlistsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private httpService: HttpServices,
  ) {}

  async getWatchlist(getWatchlistDto: GetWatchlistDto) {
    const response = await this.httpService.watchlist.get(
      AppConstant.ApiUrl.watchlists.getWatchlist,
      this.request.headers,
      getWatchlistDto,
    );
    response.headers['content-type'] = 'application/json; charset=utf-8';
    return response;
  }

  async setWatchlist(setWatchlistDto: SetWatchlistDto) {
    setWatchlistDto.xml.watchlists.forEach((watchlist, index) => {
      setWatchlistDto.xml.watchlists[index].name =
        convertSimplifiedChineseToTraditionalChinese(watchlist.name);
    });
    this.request.headers['content-type'] = 'application/xml; charset=utf-8';
    const { a, b, d, g, xml } = setWatchlistDto;
    const setWatchlistOptionDto: SetWatchlistOptionDto = { a, b, d, g };

    const response = await this.httpService.watchlist.post(
      AppConstant.ApiUrl.watchlists.setWatchlist,
      this.request.headers,
      convertJsonToXml(xml),
      setWatchlistOptionDto,
    );
    response.headers['content-type'] = 'application/json; charset=utf-8';
    return response;
  }
}
