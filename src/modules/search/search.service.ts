/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchHistory } from './entities/search.entity';
import { TradeableSearchHistory } from './entities/tradeable-search.entity';
import { DataSource, Repository } from 'typeorm';
import { AddTradeableSearchDto, CreateSearchDto } from './dtos/request.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchHistory)
    private searchRepository: Repository<SearchHistory>,
    @InjectRepository(TradeableSearchHistory)
    private tradeableSearchRepository: Repository<TradeableSearchHistory>,
    private dataSource: DataSource,
  ) {}

  async findByUserId(user_id: string): Promise<SearchHistory[]> {
    return await this.searchRepository.findBy({ user_id });
  }

  async createSearch(createSearchDto: CreateSearchDto) {
    return await this.dataSource.transaction(async (manager) => {
      await manager.delete(SearchHistory, {
        user_id: createSearchDto.user_id,
        ric: createSearchDto.ric,
      });

      const search = this.searchRepository.create(createSearchDto);
      const savedSearch = await manager.save(search);
      const searchHistoryCount = await manager.count(SearchHistory, {
        where: { user_id: createSearchDto.user_id },
      });

      if (searchHistoryCount > 10) {
        const subQuery = manager
          .createQueryBuilder()
          .select('sh.id')
          .from(SearchHistory, 'sh')
          .where('sh.user_id = :user_id', { user_id: createSearchDto.user_id })
          .orderBy('sh.created_at', 'DESC')
          .offset(10)
          .getQuery();

        await manager
          .createQueryBuilder()
          .delete()
          .from(SearchHistory)
          .where(`id IN (${subQuery})`)
          .setParameters({ user_id: createSearchDto.user_id })
          .execute();
      }

      return savedSearch;
    });
  }

  async deleteSearchHistoryByUserId(user_id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(SearchHistory)
      .where('user_id = :user_id', { user_id: user_id })
      .execute();
  }

  async findTradeableSearchByUserId(
    user_id: string,
  ): Promise<TradeableSearchHistory[]> {
    return await this.tradeableSearchRepository.findBy({ user_id });
  }

  async createTradeableSearch(addTradeableSearchDto: AddTradeableSearchDto) {
    return await this.dataSource.transaction(async (manager) => {
      await manager.delete(TradeableSearchHistory, {
        user_id: addTradeableSearchDto.user_id,
        product: addTradeableSearchDto.product,
      });

      const search = this.tradeableSearchRepository.create(
        addTradeableSearchDto,
      );
      const savedSearch = await manager.save(search);
      const searchHistoryCount = await manager.count(TradeableSearchHistory, {
        where: { user_id: addTradeableSearchDto.user_id },
      });

      if (searchHistoryCount > 10) {
        const subQuery = manager
          .createQueryBuilder()
          .select('sh.id')
          .from(TradeableSearchHistory, 'sh')
          .where('sh.user_id = :user_id', {
            user_id: addTradeableSearchDto.user_id,
          })
          .orderBy('sh.created_at', 'DESC')
          .offset(10)
          .getQuery();

        await manager
          .createQueryBuilder()
          .delete()
          .from(TradeableSearchHistory)
          .where(`id IN (${subQuery})`)
          .setParameters({ user_id: addTradeableSearchDto.user_id })
          .execute();
      }

      return savedSearch;
    });
  }

  async deleteTradeableSearchHistoryByUserId(user_id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(TradeableSearchHistory)
      .where('user_id = :user_id', { user_id: user_id })
      .execute();
  }
}
*/
