import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { AppRoutes } from 'src/router/routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTradeableSearchDto, CreateSearchDto } from './dtos/request.dto';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import {
  DeleteSearchHistoryResponse,
  DeleteTradeableSearchHistoryResponse,
  SearchHistoryResponse,
  TradeableSearchHistoryResponse,
} from './dtos/response.dto';
import { SearchHistory } from './entities/search.entity';
import { TradeableSearchHistory } from './entities/tradeable-search.entity';

@ApiTags(AppRoutes.search.tag)
@Controller({ path: AppRoutes.search.tag })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':user_id')
  @ApiOperation({ summary: 'Get search history by user id' })
  @ApiCommonOkResponse([SearchHistoryResponse])
  async GetSearchByUserId(@Param('user_id') user_id: string) {
    const users = await this.searchService.findByUserId(user_id);
    return users;
  }

  @Post()
  @ApiOperation({ summary: 'Add search history' })
  @ApiCommonOkResponse(SearchHistoryResponse)
  async createSearch(
    @Body() createSearchDto: CreateSearchDto,
  ): Promise<SearchHistory> {
    const response = await this.searchService.createSearch(createSearchDto);
    return response;
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'Delete search history by user id' })
  @ApiCommonOkResponse(DeleteSearchHistoryResponse)
  async deleteSearchHistory(@Param('user_id') user_id: string) {
    await this.searchService.deleteSearchHistoryByUserId(user_id);
    return { message: `Search history for user ${user_id} has been deleted.` };
  }

  @Get(`${AppRoutes.search.tradeable}/:user_id`)
  @ApiOperation({ summary: 'Get tradeable search history by user id' })
  @ApiCommonOkResponse([TradeableSearchHistoryResponse])
  async GetTradeableSearchByUserId(@Param('user_id') user_id: string) {
    const users = await this.searchService.findTradeableSearchByUserId(user_id);
    return users;
  }

  @Post(AppRoutes.search.tradeable)
  @ApiOperation({ summary: 'Add tradeable search history' })
  @ApiCommonOkResponse(TradeableSearchHistoryResponse)
  async addTradeableSearch(
    @Body() addTradeableSearchDto: AddTradeableSearchDto,
  ): Promise<TradeableSearchHistory> {
    const response = await this.searchService.createTradeableSearch(
      addTradeableSearchDto,
    );
    return response;
  }

  @Delete(`${AppRoutes.search.tradeable}/:user_id`)
  @ApiOperation({ summary: 'Delete tradeable search history by user id' })
  @ApiCommonOkResponse(DeleteTradeableSearchHistoryResponse)
  async deleteTradeableSearchHistory(@Param('user_id') user_id: string) {
    await this.searchService.deleteTradeableSearchHistoryByUserId(user_id);
    return { message: `Search history for user ${user_id} has been deleted.` };
  }
}
