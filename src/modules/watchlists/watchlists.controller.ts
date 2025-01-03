import { Body, Controller, Get, Post, Query, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { WatchlistsService } from './watchlists.service';
import { WatchlistResponseDto } from './dtos/response.dto';
import { GetWatchlistDto, SetWatchlistDto } from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';

@ApiTags(AppRoutes.watchlists.tag)
@Controller({
  path: AppRoutes.watchlists.tag,
  scope: Scope.REQUEST,
})
export class WatchlistsController {
  constructor(private readonly watchlistService: WatchlistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Watchlists' })
  @ApiCommonOkResponse(WatchlistResponseDto)
  async getWatchlist(@Query() getWatchlistDto: GetWatchlistDto) {
    return await this.watchlistService.getWatchlist(getWatchlistDto);
  }

  @Post()
  @ApiOperation({ summary: 'Update Watchlist' })
  @ApiCommonOkResponse(WatchlistResponseDto)
  async setWatchlist(@Body() setWatchlistDto: SetWatchlistDto) {
    return await this.watchlistService.setWatchlist(setWatchlistDto);
  }
}
