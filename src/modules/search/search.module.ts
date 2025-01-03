import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistory } from './entities/search.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TradeableSearchHistory } from './entities/tradeable-search.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchHistory]),
    TypeOrmModule.forFeature([TradeableSearchHistory]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
